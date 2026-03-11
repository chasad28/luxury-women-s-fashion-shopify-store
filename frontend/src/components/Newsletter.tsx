import { useState } from 'react';
import { useSubscribeEmail } from '../hooks/useQueries';
import { useIntersectionObserver } from '../lib/useIntersectionObserver';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { mutateAsync, isPending } = useSubscribeEmail();
  const { ref, isVisible } = useIntersectionObserver();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    try {
      await mutateAsync(email);
      setSuccess(true);
      setEmail('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('already subscribed')) {
        setErrorMsg('This email is already part of our circle.');
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-noir px-4">
      <div className={`max-w-xl mx-auto text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <p className="font-sans text-[10px] tracking-widest-luxury uppercase text-gold mb-4">
          Exclusive Access
        </p>
        <h2 className="font-serif text-3xl lg:text-4xl text-ivory mb-4">
          Join the Circle<br />
          <em>of Elegance</em>
        </h2>
        <p className="font-sans text-sm text-ivory/60 leading-relaxed mb-8 font-light">
          Become a member of our exclusive circle and receive{' '}
          <span className="text-gold">15% off your first order</span>, along with early access to new collections and private events.
        </p>

        {success ? (
          <div className="py-6 border border-gold/40 px-8">
            <p className="font-serif text-lg text-gold italic">Welcome to the circle ✦</p>
            <p className="font-sans text-xs text-ivory/50 mt-2 tracking-wide">
              Your exclusive offer has been sent to your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 bg-transparent border border-ivory/20 text-ivory placeholder:text-ivory/30 font-sans text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-3.5 bg-gold text-ivory font-sans text-xs tracking-widest-luxury uppercase hover:bg-gold/90 transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {isPending ? 'Joining...' : 'Subscribe'}
            </button>
          </form>
        )}

        {errorMsg && (
          <p className="font-sans text-xs text-destructive mt-3">{errorMsg}</p>
        )}

        <p className="font-sans text-[10px] text-ivory/30 mt-4 tracking-wide">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
