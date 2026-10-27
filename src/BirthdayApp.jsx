import { useEffect, useMemo, useState } from 'react';
import { Heart, Sparkles, Cake, Gift, Flame, Zap } from 'lucide-react';

const colors = ['#2563eb', '#14b8a6', '#f59e0b', '#60a5fa', '#e2e8f0', '#ffffff'];

function birthdayTarget(now) {
  const target = new Date(now.getFullYear(), 9, 28, 0, 0, 0, 0);
  if (now.getMonth() > 9 || (now.getMonth() === 9 && now.getDate() > 28)) {
    target.setFullYear(target.getFullYear() + 1);
  }
  return target;
}

export default function BirthdayApp() {
  const [message, setMessage] = useState('');
  const [surpriseOpened, setSurpriseOpened] = useState(false);
  const [now, setNow] = useState(() => new Date());

  const confetti = useMemo(() => Array.from({ length: 42 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 11) % 100}%`,
    color: colors[i % colors.length],
    duration: `${5 + ((i * 13) % 70) / 10}s`,
    delay: `${-((i * 17) % 120) / 10}s`,
  })), []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const isBirthday = now.getMonth() === 9 && now.getDate() === 28;
  const target = birthdayTarget(now);
  const remaining = Math.max(0, target.getTime() - now.getTime());
  const time = {
    Days: Math.floor(remaining / 86400000),
    Hours: Math.floor((remaining % 86400000) / 3600000),
    Minutes: Math.floor((remaining % 3600000) / 60000),
    Seconds: Math.floor((remaining % 60000) / 1000),
  };

  function openSurprise() {
    setSurpriseOpened(true);
    setMessage('💌 A little reminder: You are loved more than you know. Keep shining, keep dreaming, and never forget how special you are. 💙');
  }

  function makeWish() {
    setMessage('🕯️ Close your eyes, take a deep breath, and make a wish. May this next trip around the sun bring you closer to every beautiful thing you dream of. ✨');
  }

  return (
    <main className={`app-shell${isBirthday ? ' birthday-live' : ''}`}>
      <div className="confetti" aria-hidden="true">
        {confetti.map((piece) => <span key={piece.id} style={{ left: piece.left, background: piece.color, '--duration': piece.duration, '--delay': piece.delay }} />)}
        {isBirthday && Array.from({ length: 180 }, (_, i) => (
          <span className="burst-piece" key={`burst-${i}`} style={{
            left: `${(i * 47 + 13) % 100}%`,
            background: colors[i % colors.length],
            '--burst-duration': `${3 + ((i * 17) % 40) / 10}s`,
            '--drift': `${((i * 61) % 360) - 180}px`,
            '--spin': `${((i * 113) % 1440) - 720}deg`,
            animationDelay: `${(i % 12) / 10}s`,
          }} />
        ))}
      </div>

      <section className="birthday-card" aria-labelledby="birthday-title">
        <div className="eyebrow"><Sparkles size={15} /> {isBirthday ? "It's my special day!" : 'A little celebration'} <Sparkles size={15} /></div>
        <div className="cake-illustration" aria-hidden="true"><Cake size={76} strokeWidth={1.5} /></div>
        <h1 id="birthday-title">{isBirthday ? <>Happy <span>23rd Birthday!</span></> : <>The countdown to<br /><span>my birthday!</span></>}</h1>
        <p className="subtitle">{isBirthday
          ? "It's October 28! Here's to 23 years of memories, growth, and new adventures. 🎉"
          : 'One more sleep until October 28 — let the birthday celebration begin.'}</p>

        {!isBirthday && <div className="countdown" aria-label="Time until my birthday" aria-live="polite">
          {Object.entries(time).map(([unit, value]) => <div className="countdown-unit" key={unit}>
            <span className="countdown-number">{String(value).padStart(2, '0')}</span>
            <span className="countdown-label">{unit}</span>
          </div>)}
        </div>}

        <div className="divider" aria-hidden="true"><Heart size={18} /></div>
        <p className="birthday-wish">May your day be filled with belly laughs, sweet surprises, beautiful memories, and all the love your heart can hold. You deserve a year full of growth, confidence, and exciting new adventures.</p>
        <div className="button-row">
          <button className="button button-primary" onClick={openSurprise}><Gift size={18} /> {surpriseOpened ? 'Surprise opened!' : 'Open your surprise'}</button>
          <button className="button button-secondary" onClick={makeWish}><Flame size={18} /> Make a birthday wish</button>
        </div>
        {message && <div className="surprise-message" role="status" aria-live="polite">{message}</div>}
        <p className="footer">LEVEL 23 UNLOCKING <Zap className="footer-zap" size={14} fill="currentColor" /></p>
      </section>
    </main>
  );
}