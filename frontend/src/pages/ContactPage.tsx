import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="min-h-screen pt-20 lg:pt-24">
      <div className="bg-beige py-14 lg:py-20 text-center px-4">
        <p className="font-sans text-[10px] tracking-widest-luxury uppercase text-gold mb-3">Get in Touch</p>
        <h1 className="font-serif text-3xl lg:text-5xl text-noir">Contact Us</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16 lg:py-20">
        {sent ? (
          <div className="text-center py-12 border border-gold/30">
            <p className="font-serif text-2xl text-gold italic mb-3">Thank you ✦</p>
            <p className="font-sans text-sm text-noir/60">We will be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-sans text-[10px] tracking-luxury uppercase text-noir/60 block mb-1.5">Your Name</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-transparent border border-noir/20 font-sans text-sm text-noir focus:outline-none focus:border-gold transition-colors"
                placeholder="Isabelle Martin"
              />
            </div>
            <div>
              <label className="font-sans text-[10px] tracking-luxury uppercase text-noir/60 block mb-1.5">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3 bg-transparent border border-noir/20 font-sans text-sm text-noir focus:outline-none focus:border-gold transition-colors"
                placeholder="isabelle@example.com"
              />
            </div>
            <div>
              <label className="font-sans text-[10px] tracking-luxury uppercase text-noir/60 block mb-1.5">Message</label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 bg-transparent border border-noir/20 font-sans text-sm text-noir focus:outline-none focus:border-gold transition-colors resize-none"
                placeholder="How may we assist you?"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-noir text-ivory font-sans text-xs tracking-widest-luxury uppercase hover:bg-charcoal transition-colors"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
