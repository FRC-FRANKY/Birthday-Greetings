import { useMemo, useState } from 'react';
import { Heart, Sparkles, Cake, Gift, Flame } from 'lucide-react';

const confettiColors = ['#f16b9a', '#ffbf69', '#9b8af4', '#79d8c6', '#f7df74', '#ffffff'];

export default function BirthdayApp() {
  const [message, setMessage] = useState('');
  const [surpriseOpened, setSurpriseOpened] = useState(false);
  const confetti = useMemo(() => Array.from({ length: 42 }, (_, index) => ({
    id: index,
    left: `${(index * 37 + 11) % 100}%`,
    color: confettiColors[index % confettiColors.length],
    duration: `${5 + ((index * 13) % 70) / 10}s`,
    delay: `${-((index * 17) % 120) / 10}s`,
    rotation: `${(index * 43) % 180}deg`,
  })), []);

  function openSurprise() {
    setSurpriseOpened(true);
    setMessage('💌 A little reminder: You are loved more than you know. Keep shining, keep dreaming, and never forget how special you are. 💖');
  }

  function makeWish() {
    setMessage('🕯️ Close your eyes, take a deep breath, and make a wish. May this next trip around the sun bring you closer to every beautiful thing you dream of. ✨');
  }

  return (
    <main className="app-shell">
      <div className="confetti" aria-hidden="true">
        {confetti.map((piece) => <span key={piece.id} style={{ left: piece.left, background: piece.color, '--duration': piece.duration, '--delay': piece.delay, transform: `rotate(${piece.rotation})` }} />)}
      </div>
      <section className="birthday-card" aria-labelledby="birthday-title">
        <div className="eyebrow"><Sparkles size={15} /> A little celebration <Sparkles size={15} /></div>
        <div className="cake-illustration" aria-hidden="true"><Cake size={76} strokeWidth={1.5} /></div>
        <h1 id="birthday-title">Happy Birthday,<br /><span>Love!</span></h1>
        <p className="subtitle">Today is all about celebrating the wonderful person you are.</p>
        <div className="divider" aria-hidden="true"><Heart size={18} /></div>
        <p className="birthday-wish">May your day be filled with belly laughs, sweet surprises, beautiful memories, 
          and all the love your heart can hold. You deserve a year that feels as magical as you make life for the people around you.</p>
        <div className="button-row">
          <button className="button button-primary" onClick={openSurprise}><Gift size={18} /> {surpriseOpened ? 'Surprise opened!' : 'Open your surprise'}</button>
          <button className="button button-secondary" onClick={makeWish}><Flame size={18} /> Make a birthday wish</button>
        </div>
        {message && <div className="surprise-message" role="status" aria-live="polite">{message}</div>}
        <p className="footer">MADE WITH <Heart className="footer-heart" size={13} fill="currentColor" /> JUST FOR YOU</p>
      </section>
    </main>
  );
}
