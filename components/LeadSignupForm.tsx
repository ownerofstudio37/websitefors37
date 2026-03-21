"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Mail, CheckCircle } from "lucide-react";

/**
 * LeadSignupForm
 * Newsletter subscription section shown in the site footer area.
 * Skips rendering on admin routes.
 */
export default function LeadSignupForm() {
  const pathname = usePathname();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  if (pathname.startsWith("/admin") || pathname.startsWith("/setup-admin")) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          service_interest: 'newsletter_subscription',
          source: 'newsletter-footer',
          message: 'Subscribed to newsletter via footer form',
        }),
      });
      if (!res.ok) throw new Error('Subscribe failed');
      setDone(true);
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'newsletter_subscribe', { source: 'footer' });
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-label="Newsletter Signup"
      className="mt-20 mx-auto max-w-4xl rounded-lg border border-amber-200 bg-amber-50/60 backdrop-blur-sm p-6 shadow-sm"
    >
      <div className="md:flex md:items-center md:gap-10">
        <div className="mb-5 md:mb-0 md:flex-1">
          <h2 className="text-2xl font-semibold tracking-tight text-amber-800 flex items-center gap-2 mb-2">
            <Mail className="w-6 h-6 text-amber-600" />
            Studio37 Newsletter
          </h2>
          <p className="text-sm text-amber-700 leading-relaxed">
            Be the first to hear about mini sessions, seasonal promotions, and exclusive photography tips. One email at a time—unsubscribe anytime.
          </p>
        </div>

        <div className="md:flex-1">
          {done ? (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-green-800 font-medium text-sm">You're subscribed! Welcome to the community.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="First name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                disabled={submitting}
                className="flex-1 px-4 py-2.5 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white disabled:opacity-50 text-sm"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={submitting}
                className="flex-1 px-4 py-2.5 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white disabled:opacity-50 text-sm"
              />
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-2.5 rounded-lg transition disabled:opacity-50 whitespace-nowrap text-sm"
              >
                {submitting ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          )}
          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
          {!done && (
            <p className="mt-2 text-xs text-amber-600">No spam, ever. Unsubscribe with one click.</p>
          )}
        </div>
      </div>
    </section>
  );
}
