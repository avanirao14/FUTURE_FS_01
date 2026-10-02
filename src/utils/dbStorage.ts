import { PortfolioData } from '../types';

const DB_NAME = 'AvaniPortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'portfolio_store';
const KEY_NAME = 'current_portfolio';
const LOCAL_STORAGE_KEY = 'avani_portfolio_data_v1';

/**
 * Opens or initializes the IndexedDB database
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Saves the entire portfolio data safely to IndexedDB with localStorage fallback
 */
export async function savePortfolioToStorage(data: PortfolioData): Promise<void> {
  // 1. Try to save full data to IndexedDB (supports high capacity for videos, PDFs, images)
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(data, KEY_NAME);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });
  } catch (err) {
    console.warn('IndexedDB save failed, proceeding with localStorage fallback:', err);
  }

  // 2. Also save to localStorage as fast cache / secondary fallback
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // If localStorage quota exceeded due to large video/PDF, save lightweight metadata copy
    try {
      const lightweightData = {
        ...data,
        projects: data.projects.map((p) => ({
          ...p,
          // If video or image exceeds quota in localStorage, preserve metadata
          videoUrl: p.videoUrl && p.videoUrl.length > 500000 ? '' : p.videoUrl,
        })),
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lightweightData));
    } catch {
      // Ignored if completely full; IndexedDB holds the authoritative data
    }
  }
}

/**
 * Loads portfolio data from IndexedDB, falling back to localStorage
 */
export async function loadPortfolioFromStorage(): Promise<PortfolioData | null> {
  // 1. Check IndexedDB first
  try {
    const db = await openDB();
    const data = await new Promise<PortfolioData | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY_NAME);

      req.onsuccess = () => {
        resolve(req.result || null);
      };
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });

    if (data && data.personal && data.personal.name) {
      return data;
    }
  } catch (err) {
    console.warn('IndexedDB load error, reading from localStorage:', err);
  }

  // 2. Fallback to localStorage
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.personal) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('LocalStorage parse error:', e);
  }

  return null;
}

/**
 * Resets storage to initial state
 */
export async function clearPortfolioStorage(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(KEY_NAME);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });
  } catch (e) {
    console.warn('Failed to clear IndexedDB:', e);
  }

  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear localStorage:', e);
  }
}
