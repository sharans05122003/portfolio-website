import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Check, Terminal, Mail, Phone, MapPin, Trash2, ArrowRight } from 'lucide-react';
import { ContactMessage } from '../types';
import { PERSONAL_INFO } from '../data';

export default function Contact() {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Terminal State
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);

  // Load and seed local storage messages
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_messages');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      // Seed default welcoming message
      const defaultMsg: ContactMessage = {
        id: 'seed-1',
        name: 'System Orchestrator',
        email: 'daemon@vance.dev',
        subject: 'Welcome to the Mailbox console',
        message: 'Thank you for exploring my portfolio. Submit your contact details in the form to the left, and watch this system-level mailbox terminal intercepts and logs your connection in real-time!',
        date: new Date().toLocaleTimeString(),
      };
      localStorage.setItem('portfolio_messages', JSON.stringify([defaultMsg]));
      setMessages([defaultMsg]);
      setActiveMessageId('seed-1');
    }
  }, []);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!name.trim()) errors.name = 'Please provide your full name.';
    if (!email.trim()) {
      errors.email = 'An email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please provide a valid email format.';
    }
    if (!subject.trim()) errors.subject = 'A subject is required.';
    if (!message.trim()) {
      errors.message = 'Please write a brief message.';
    } else if (message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: `msg-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const updated = [newMessage, ...messages];
      localStorage.setItem('portfolio_messages', JSON.stringify(updated));
      setMessages(updated);
      setActiveMessageId(newMessage.id);

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      // Auto clear success state after 4 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);

    }, 1500);
  };

  const handleClearInbox = () => {
    const defaultMsg: ContactMessage = {
      id: 'seed-1',
      name: 'System Orchestrator',
      email: 'daemon@vance.dev',
      subject: 'Inbox Flush Complete',
      message: 'Inbox successfully cleared. Local Storage cache is reset.',
      date: new Date().toLocaleTimeString(),
    };
    localStorage.setItem('portfolio_messages', JSON.stringify([defaultMsg]));
    setMessages([defaultMsg]);
    setActiveMessageId('seed-1');
  };

  const selectedMsgDetails = messages.find(m => m.id === activeMessageId) || null;

  return (
    <section
      id="contact"
      className="py-24 bg-[#F8FAFC] dark:bg-[#0A0A0B] border-t border-slate-100 dark:border-zinc-900/40 relative transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm uppercase tracking-widest italic font-medium block mb-2">My Portal</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-zinc-50 tracking-tight">
            Initiate Contact
          </h2>
          <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-4 mb-6 mx-auto" />
          <p className="font-sans text-slate-600 dark:text-zinc-300 max-w-xl mx-auto">
            Ready to kick off a new project, consult on full-stack architecture, or just share code feedback? Fill out the portal.
          </p>
        </div>

        {/* Form and Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Form Column (Col Span 6) */}
          <div className="lg:col-span-6 p-8 rounded-[2rem] bg-white dark:bg-zinc-900/40 border border-slate-200/60 dark:border-zinc-800/50 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-150/40 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-zinc-50">Send Message</h3>
                  <p className="font-sans text-xs text-slate-400 dark:text-zinc-500">Immediate response queue</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="font-sans font-medium text-xs text-slate-600 dark:text-zinc-400">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                      }}
                      placeholder="e.g. Jane Doe"
                      className={`w-full px-4 py-3 rounded-xl font-sans text-sm bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 border transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-650 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.name ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 dark:border-zinc-800/85'
                      }`}
                    />
                    {formErrors.name && (
                      <span className="font-sans text-[11px] text-rose-500 font-medium">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="font-sans font-medium text-xs text-slate-600 dark:text-zinc-400">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                      }}
                      placeholder="jane@example.com"
                      className={`w-full px-4 py-3 rounded-xl font-sans text-sm bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 border transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-650 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.email ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 dark:border-zinc-800/85'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="font-sans text-[11px] text-rose-500 font-medium">{formErrors.email}</span>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-subject" className="font-sans font-medium text-xs text-slate-600 dark:text-zinc-400">
                    Subject Heading
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (formErrors.subject) setFormErrors({ ...formErrors, subject: '' });
                    }}
                    placeholder="Project inquiry or collaboration request"
                    className={`w-full px-4 py-3 rounded-xl font-sans text-sm bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 border transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-650 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      formErrors.subject ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 dark:border-zinc-800/85'
                    }`}
                  />
                  {formErrors.subject && (
                    <span className="font-sans text-[11px] text-rose-500 font-medium">{formErrors.subject}</span>
                  )}
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="font-sans font-medium text-xs text-slate-600 dark:text-zinc-400">
                    Core Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                    }}
                    placeholder="Hi Sharan, we would love to consult with you regarding..."
                    className={`w-full px-4 py-3 rounded-xl font-sans text-sm bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 border transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-650 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none ${
                      formErrors.message ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 dark:border-zinc-800/85'
                    }`}
                  />
                  {formErrors.message && (
                    <span className="font-sans text-[11px] text-rose-500 font-medium">{formErrors.message}</span>
                  )}
                </div>

                {/* Submit Action Block */}
                <div className="pt-2">
                  <motion.button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full py-3.5 rounded-xl font-sans font-bold text-sm text-white transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isSuccess
                        ? 'bg-emerald-600 hover:bg-emerald-500'
                        : 'bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 dark:disabled:bg-zinc-800'
                    }`}
                  >
                    {isSuccess ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        Message Saved Successfully!
                      </>
                    ) : isSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Routing Connection...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Transmit Message
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
            
            {/* Quick Directory Contacts */}
            <div className="pt-8 mt-6 border-t border-slate-150 dark:border-zinc-800/80 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="font-sans text-xs text-slate-500 dark:text-zinc-400 font-medium">{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-500" />
                <span className="font-sans text-xs text-slate-500 dark:text-zinc-400 font-medium text-indigo-600 dark:text-indigo-400">{PERSONAL_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Mailbox Inbox Terminal (Col Span 6) */}
          <div className="lg:col-span-6 rounded-[2rem] bg-zinc-950 text-zinc-100 border border-zinc-850 shadow-xl overflow-hidden flex flex-col justify-between">
            {/* Terminal Header */}
            <div className="bg-zinc-900 px-5 py-3.5 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 ml-3">
                  <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="font-mono text-xs text-zinc-400 font-semibold tracking-wide">
                    {PERSONAL_INFO.email}:~/.mailbox-logs
                  </span>
                </div>
              </div>

              {/* Reset Inbox button */}
              <button
                id="flush-terminal-btn"
                onClick={handleClearInbox}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Flush and Clear Local Inbox"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Terminal Grid (Logs on top/left, Active Viewer below/right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 flex-grow min-h-[360px]">
              
              {/* Messages Side Rail (Log entries) */}
              <div className="md:col-span-5 border-r border-zinc-900 overflow-y-auto max-h-[190px] md:max-h-[380px] p-2 space-y-1 bg-zinc-950/60">
                <div className="px-3 py-1 text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                  Connection Logs
                </div>
                <div className="space-y-1">
                  {messages.map((msg) => (
                    <button
                      key={msg.id}
                      id={`inbox-msg-tab-${msg.id}`}
                      onClick={() => setActiveMessageId(msg.id)}
                      className={`w-full text-left p-2.5 rounded-xl font-mono text-xs flex flex-col gap-1 transition-colors cursor-pointer ${
                        activeMessageId === msg.id
                          ? 'bg-zinc-900 text-indigo-400 border border-zinc-800'
                          : 'text-zinc-400 hover:bg-zinc-900/40 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="truncate max-w-[80px] font-bold text-zinc-200">
                          {msg.name.split(' ')[0]}
                        </span>
                        <span className="text-[9px] text-zinc-500">{msg.date}</span>
                      </div>
                      <span className="truncate w-full text-[10px] text-zinc-500">
                        {msg.subject}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Details Printout Box */}
              <div className="md:col-span-7 p-5 overflow-y-auto max-h-[220px] md:max-h-[380px] bg-zinc-950 font-mono text-xs leading-relaxed flex flex-col justify-between">
                
                {/* Print content */}
                {selectedMsgDetails ? (
                  <div className="space-y-4">
                    <div className="space-y-1.5 text-zinc-400 border-b border-zinc-900 pb-3">
                      <div>
                        <span className="text-zinc-600">FROM:</span>{' '}
                        <span className="text-indigo-400 font-semibold">{selectedMsgDetails.name}</span>{' '}
                        <span className="text-zinc-600">&lt;{selectedMsgDetails.email}&gt;</span>
                      </div>
                      <div>
                        <span className="text-zinc-600">SUBJ:</span>{' '}
                        <span className="text-zinc-200 font-bold">{selectedMsgDetails.subject}</span>
                      </div>
                      <div>
                        <span className="text-zinc-600">TIME:</span>{' '}
                        <span className="text-zinc-500">{selectedMsgDetails.date}</span>
                      </div>
                    </div>

                    <div className="text-zinc-300 bg-zinc-900/30 p-3 rounded-xl border border-zinc-900/50 min-h-[90px] whitespace-pre-line text-[11px]">
                      {selectedMsgDetails.message}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-zinc-600">
                    No active message logged.
                  </div>
                )}

                {/* Simulated CLI cursor at the bottom of panel */}
                <div className="pt-4 border-t border-zinc-900/80 text-[10px] text-zinc-600 flex items-center gap-1">
                  <span>{PERSONAL_INFO.email.split('@')[0]}:~# cat selected_message.json</span>
                  <span className="w-1.5 h-3.5 bg-indigo-500 animate-pulse inline-block" />
                </div>
              </div>

            </div>

            {/* Simulated server uptime tag */}
            <div className="bg-zinc-900 px-5 py-2.5 border-t border-zinc-800 text-[10px] font-mono text-zinc-500 flex items-center justify-between">
              <span>ESTABLISHED SSL CONNECTION: AES-256</span>
              <span>INBOX: {messages.length} MSG(S)</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
