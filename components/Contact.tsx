'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import styles from './Contact.module.css';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'your.email@example.com', // update this
    href: 'mailto:your.email@example.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 7845074566',
    href: 'tel:+917845074566',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Namakkal, Tamil Nadu, India',
    href: null,
  },
];

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('idle');
      }
    } catch {
      setStatus('idle');
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />

      <div className={styles.header}>
        <h2 className={styles.title}>
          Let's <span className={styles.gradientText}>Connect</span>
        </h2>
        <p className={styles.subtitle}>
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.infoList}>
          {contactInfo.map(({ icon: Icon, label, value, href }) => {
            const Wrapper = href ? 'a' : 'div';
            return (
              <Wrapper
                key={label}
                {...(href ? { href } : {})}
                className={styles.card}
              >
                <div className={styles.iconBox}>
                  <Icon size={20} color="#ffffff" />
                </div>
                <div>
                  <p className={styles.label}>{label}</p>
                  <p className={styles.value}>{value}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={styles.input}
          />
          <input
            type="email"
            required
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={styles.input}
          />
          <textarea
            required
            rows={4}
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${styles.input} ${styles.textarea}`}
          />
          <button type="submit" disabled={status === 'sending'} className={styles.submitBtn}>
            {status === 'sent' ? (
              <>
                <CheckCircle2 size={18} /> Message Sent!
              </>
            ) : status === 'sending' ? (
              'Sending...'
            ) : (
              <>
                <Send size={18} /> Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}