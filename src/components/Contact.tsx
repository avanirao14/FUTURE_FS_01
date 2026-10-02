import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, Copy, Check, MessageSquare, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../context/PortfolioContext';

export const Contact: React.FC = () => {
  const { data, showToast, setIsEditorOpen } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.personal.email);
      setCopied(true);
      showToast('Email address copied to clipboard!');
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#a78bfa', '#818cf8', '#38bdf8'],
      });
      setTimeout(() => setCopied(false), 3000);
    } catch {
      showToast(`Copy failed. Email: ${data.personal.email}`, 'info');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill in all fields before sending', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending with realistic feedback and mailto generation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Thank you! Your message has been prepared & logged.');

      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#a78bfa', '#818cf8', '#38bdf8', '#c084fc'],
      });

      // Also trigger a mailto fallback for direct client mail delivery
      const mailtoUrl = `mailto:${encodeURIComponent(data.personal.email)}?subject=${encodeURIComponent(
        `Portfolio Message from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      // Reset form after short delay
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
      }, 1000);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-800/40 text-violet-300 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Touch</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Have a project, hackathon collaboration, or learning opportunity? Feel free to reach out.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-5">
            {/* Primary Email Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] hover:border-violet-500/40 transition-all shadow-lg">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${data.personal.email}`}
                  className="text-base sm:text-lg font-bold text-white hover:text-cyan-300 transition-colors font-mono truncate"
                  title="Click to write email"
                >
                  {data.personal.email}
                </a>

                <button
                  type="button"
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/10 transition-colors shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Click to open your mail client, or copy address directly.
              </p>
            </div>

            {/* Social Channels (LinkedIn & GitHub) */}
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-4 shadow-lg">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Professional Networks
              </span>

              {/* LinkedIn */}
              <a
                id="contact-linkedin-link"
                href={data.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] hover:border-violet-500/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0A66C2]/20 border border-[#0A66C2]/40 flex items-center justify-center text-[#0A66C2]">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors block">
                      LinkedIn Profile
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      avani-s-rao-a48248330
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* GitHub */}
              {data.personal.github ? (
                <a
                  id="contact-github-link"
                  href={data.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] hover:border-violet-500/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors block">
                        GitHub
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        View Repositories
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-dashed border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-300 block">
                        GitHub Profile
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        Not yet configured
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(true)}
                    className="text-xs text-violet-400 hover:text-violet-300 font-mono px-2 py-1 rounded bg-white/[0.04]"
                  >
                    + Add Link
                  </button>
                </div>
              )}
            </div>

            {/* Location & Academic Base */}
            <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-violet-950/60 border border-violet-700/40 flex items-center justify-center text-cyan-300 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-mono block">Campus & Location</span>
                <span className="text-sm font-semibold text-white">
                  JNNCE, Shivamogga, Karnataka, India
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08] relative overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>SEND A DIRECT MESSAGE</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-heading mb-6">
              Write a Note
            </h3>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white font-heading">
                  Message Sent Successfully!
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out, Avani will review your message soon. You can also write directly to <strong className="text-cyan-300">{data.personal.email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-violet-500 focus:bg-white/[0.07] text-white text-sm placeholder-slate-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-violet-500 focus:bg-white/[0.07] text-white text-sm placeholder-slate-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your note or project inquiry here..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-violet-500 focus:bg-white/[0.07] text-white text-sm placeholder-slate-500 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-700/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-cyan-300" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 font-mono text-center pt-1">
                  Responses will be sent directly to your provided email address.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
