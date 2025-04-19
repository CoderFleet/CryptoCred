import Head from 'next/head';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShieldCheck } from 'lucide-react';

const Home: React.FC = () => {
  // GSAP refs
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const howItWorksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Animate hero card
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, {y: 80, opacity: 0}, {y: 0, opacity: 1, duration: 1, ease: 'power3.out'});
    }
    // Animate cards
    if (cardsRef.current) {
      gsap.fromTo(cardsRef.current,
        {y: 60, opacity: 0, scale: 0.95},
        {y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.5}
      );
    }
    // Animate How It Works steps
    if (howItWorksRef.current) {
      gsap.fromTo(howItWorksRef.current,
        {y: 60, opacity: 0, scale: 0.95},
        {y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 1.1}
      );
    }
  }, []);
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Head>
        <title>CryptoCred – Blockchain Academic Credentials</title>
        <meta name="description" content="Decentralized platform for storing and verifying academic certificates on blockchain." />
      </Head>
      <main className="min-h-screen flex flex-col relative overflow-hidden" style={{background: 'linear-gradient(135deg, #000 0%, #111 60%, #000 100%)', minHeight: '100vh'}}>
  {/* Neon edge glow */}
  <div className="pointer-events-none absolute inset-0 z-30" style={{boxShadow:'0 0 90px 12px #00d1ff, 0 0 160px 18px #ff2d7a inset, 0 0 120px 12px #00ffae inset', opacity: 0.18}} />
  {/* Animated gradient background overlay */}
  <div className="pointer-events-none absolute inset-0 z-0" style={{background: 'radial-gradient(ellipse at 70% 20%, rgba(0,209,255,0.10) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,45,122,0.07) 0%, transparent 60%)'}} />
  {/* Subtle animated particles */}
  <div className="pointer-events-none absolute inset-0 z-0 animate-pulse" style={{background: 'radial-gradient(circle at 40% 60%, rgba(0,255,174,0.025) 0.5vw, transparent 1vw), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.018) 0.7vw, transparent 1.2vw)'}} />
  {/* Blockchain mesh SVG overlay */}
  <svg className="pointer-events-none absolute inset-0 w-full h-full z-10 opacity-25" width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{mixBlendMode:'screen'}}>
    <defs>
      <linearGradient id="meshLine" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00d1ff" stopOpacity="0.12" />
        <stop offset="0.5" stopColor="#00ffae" stopOpacity="0.10" />
        <stop offset="1" stopColor="#ff2d7a" stopOpacity="0.10" />
      </linearGradient>
    </defs>
    {/* Hex mesh */}
    {[...Array(18)].map((_,i)=>
      <polyline key={i} points={Array.from({length:11},(_,j)=>`${j*144},${i*50+((j%2)*25)}`).join(' ')} stroke="url(#meshLine)" strokeWidth="1.2" fill="none" />
    )}
    {/* Accent color nodes */}
    {[...Array(30)].map((_,i)=>{
      const colors = ["#00d1ff","#00ffae","#ff2d7a"];
      return <circle key={i} cx={Math.random()*1440} cy={Math.random()*900} r={Math.random()*3+2} fill={colors[i%3]} opacity="0.13" />
    })}
  </svg>
        <nav className="flex justify-between items-center px-8 py-5 bg-gradient-to-r from-[#0a0a0a] via-[#181818] to-[#0a0a0a] border-b border-[#A7C7E7]/30 rounded-b-2xl shadow-lg mx-4 mt-4 backdrop-blur-lg" style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.37)'}}>
  <div className="flex items-center gap-2">
    <span className="inline-flex items-center gap-2">
      <span className="text-2xl md:text-3xl font-extrabold tracking-wide font-mono bg-gradient-to-r from-[#A7C7E7] via-[#B9F6CA] to-[#6A8CAF] text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(167,199,231,0.18)]">CryptoCred</span>
      <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#A7C7E7] via-[#B9F6CA] to-white p-1 shadow border border-[#A7C7E7] ml-1">
        <ShieldCheck className="w-6 h-6 text-black/70" />
      </span>
    </span>
  </div>
  <div className="space-x-6 flex items-center">
    <a href="/features" className="text-[#A7C7E7] hover:text-[#B9F6CA] font-medium transition-colors">Features</a>
    <a href="#how-it-works" className="text-[#A7C7E7] hover:text-[#B9F6CA] font-medium transition-colors" onClick={e => {
      e.preventDefault();
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }}>How It Works</a>
    <a href="/contact" className="text-[#A7C7E7] hover:text-[#B9F6CA] font-medium transition-colors">Contact</a>
    <a href="/sign-in" className="text-[#A7C7E7] hover:text-[#B9F6CA] font-medium transition-colors">Sign In</a>
  </div>
</nav>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-28 md:py-36">
  {/* Central glassy card */}
  <div ref={heroRef} className="relative bg-black/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_0_rgba(0,209,255,0.10)] px-12 py-16 mb-14 max-w-2xl w-full border-4 border-[#111] bg-clip-padding flex flex-col items-center before:absolute before:inset-0 before:rounded-[2.5rem] before:pointer-events-none before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-30 after:absolute after:inset-0 after:rounded-[2.5rem] after:pointer-events-none after:bg-gradient-to-t after:from-white/10 after:to-transparent after:opacity-50" style={{boxShadow:'0 8px 40px 0 rgba(0,209,255,0.10), 0 1.5px 32px 0 rgba(255,45,122,0.08)'}}>
    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide font-mono bg-gradient-to-r from-[#FFD700] via-[#FFB800] to-[#FFEF8E] text-transparent bg-clip-text drop-shadow-[0_0_18px_rgba(255,215,0,0.36)]" style={{letterSpacing: '0.045em'}}>CryptoCred</h1>
    {/* <p className="text-lg md:text-2xl text-[#e0e0ff] mb-3 font-light tracking-wider" style={{textShadow:'0 1px 8px #000'}}>Decentralized Academic Certificate Storage &amp; Verification</p> */}
    <p className="text-base md:text-lg text-[#B9F6CA] mb-8 font-normal tracking-wide">Empowering trust, privacy, and instant verification for your credentials.</p>
    <a href="/sign-up" className="inline-block px-8 py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-[#A7C7E7] via-[#B9F6CA] to-[#6A8CAF] text-black shadow-lg hover:from-[#B9F6CA] hover:to-[#A7C7E7] transition-all duration-300 border border-[#A7C7E7]/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#A7C7E7]">Get Started Free</a>
  </div>
</div>

{/* Project Overview Section */}
<section className="w-full max-w-4xl mx-auto mb-16 px-4 py-10 bg-black/80 rounded-3xl shadow-xl border border-[#A7C7E7]/20 text-center backdrop-blur-lg">
  <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#FFD700] via-[#A7C7E7] to-[#B9F6CA] text-transparent bg-clip-text drop-shadow">Empowering Trust in Academic Credentials</h2>
  <p className="text-lg md:text-xl text-[#e0e0ff] mb-4 font-light max-w-3xl mx-auto">CryptoCred is a decentralized platform for storing, issuing, and verifying academic certificates using blockchain and IPFS. Students, institutes, and recruiters connect directly—no middlemen, no fraud, just instant trust and global recognition.</p>
  <div className="flex flex-wrap gap-4 justify-center mt-4">
    <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#A7C7E7]/10 text-[#A7C7E7] font-semibold text-sm">On-chain Verification</span>
    <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#B9F6CA]/10 text-[#B9F6CA] font-semibold text-sm">IPFS Storage</span>
    <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#FFD700]/10 text-[#FFD700] font-semibold text-sm">NFT Credentials</span>
    <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#6A8CAF]/10 text-[#6A8CAF] font-semibold text-sm">Role-based Security</span>
  </div>
</section>

  {/* Why Choose CryptoCred Section */}
  <section className="w-full max-w-6xl mx-auto mt-4 mb-20 px-2">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#A7C7E7] via-[#B9F6CA] to-[#6A8CAF] text-transparent bg-clip-text drop-shadow-[0_0_12px_rgba(167,199,231,0.18)]">Why Choose CryptoCred?</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* Feature 1 */}
      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-7 flex flex-col items-center shadow-lg border border-[#A7C7E7]/20 hover:-translate-y-2 hover:shadow-[0_8px_32px_0_rgba(167,199,231,0.18)] transition-all duration-300">
        <span className="text-4xl mb-3" style={{color:'#A7C7E7'}}>🔒</span>
        <h3 className="font-bold text-lg mb-2 text-[#A7C7E7]">Blockchain Security</h3>
        <p className="text-[#e0e0ff] text-center text-base font-light">All credentials are cryptographically secured and tamper-proof, leveraging the power of blockchain.</p>
      </div>
      {/* Feature 2 */}
      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-7 flex flex-col items-center shadow-lg border border-[#B9F6CA]/20 hover:-translate-y-2 hover:shadow-[0_8px_32px_0_rgba(185,246,202,0.18)] transition-all duration-300">
        <span className="text-4xl mb-3" style={{color:'#B9F6CA'}}>⚡</span>
        <h3 className="font-bold text-lg mb-2 text-[#B9F6CA]">Instant Verification</h3>
        <p className="text-[#e0e0ff] text-center text-base font-light">Verify certificates in seconds from anywhere in the world—no paperwork, no waiting.</p>
      </div>
      {/* Feature 3 */}
      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-7 flex flex-col items-center shadow-lg border border-[#6A8CAF]/20 hover:-translate-y-2 hover:shadow-[0_8px_32px_0_rgba(106,140,175,0.18)] transition-all duration-300">
        <span className="text-4xl mb-3" style={{color:'#6A8CAF'}}>🛡️</span>
        <h3 className="font-bold text-lg mb-2 text-[#6A8CAF]">Privacy First</h3>
        <p className="text-[#e0e0ff] text-center text-base font-light">Only you control access to your credentials. Share with confidence, revoke at any time.</p>
      </div>
      {/* Feature 4 */}
      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-7 flex flex-col items-center shadow-lg border border-[#FFD700]/20 hover:-translate-y-2 hover:shadow-[0_8px_32px_0_rgba(255,215,0,0.13)] transition-all duration-300">
        <span className="text-4xl mb-3" style={{color:'#FFD700'}}>🌐</span>
        <h3 className="font-bold text-lg mb-2 text-[#FFD700]">Global Recognition</h3>
        <p className="text-[#e0e0ff] text-center text-base font-light">Your achievements are verifiable and recognized worldwide, opening doors to new opportunities.</p>
      </div>
    </div>
  </section>

{/* User Flows Section */}
<section className="w-full max-w-6xl mx-auto mb-20 px-2">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-[#A7C7E7] via-[#B9F6CA] to-[#6A8CAF] text-transparent bg-clip-text drop-shadow">How CryptoCred Works for Everyone</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Student Card */}
    <div className="bg-black/80 rounded-2xl p-8 flex flex-col items-center shadow-lg border border-[#A7C7E7]/20">
      <span className="text-4xl mb-3" style={{color:'#B9F6CA'}}>🎓</span>
      <h3 className="font-bold text-xl mb-2 text-[#B9F6CA]">For Students</h3>
      <ul className="text-[#e0e0ff] text-left text-base font-light mb-4 space-y-2">
        <li>Sign up & connect wallet</li>
        <li>Upload certificates (PDFs)</li>
        <li>Get on-chain proof (NFT/hash)</li>
        <li>Share verifiable profile</li>
      </ul>
      <a href="/sign-up" className="mt-auto px-6 py-2 rounded-lg bg-gradient-to-r from-[#A7C7E7] to-[#B9F6CA] text-black font-bold shadow hover:from-[#B9F6CA] hover:to-[#A7C7E7] transition">Try as Student</a>
    </div>
    {/* Institute Card */}
    <div className="bg-black/80 rounded-2xl p-8 flex flex-col items-center shadow-lg border border-[#FFD700]/20">
      <span className="text-4xl mb-3" style={{color:'#FFD700'}}>🏫</span>
      <h3 className="font-bold text-xl mb-2 text-[#FFD700]">For Institutes</h3>
      <ul className="text-[#e0e0ff] text-left text-base font-light mb-4 space-y-2">
        <li>Register & verify role</li>
        <li>Issue certificates (batch upload)</li>
        <li>Sign on-chain as authority</li>
        <li>Students receive credentials</li>
      </ul>
      <a href="#" className="mt-auto px-6 py-2 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#A7C7E7] text-black font-bold shadow hover:from-[#A7C7E7] hover:to-[#FFD700] transition">Institute Demo</a>
    </div>
    {/* Recruiter Card */}
    <div className="bg-black/80 rounded-2xl p-8 flex flex-col items-center shadow-lg border border-[#6A8CAF]/20">
      <span className="text-4xl mb-3" style={{color:'#6A8CAF'}}>💼</span>
      <h3 className="font-bold text-xl mb-2 text-[#6A8CAF]">For Recruiters</h3>
      <ul className="text-[#e0e0ff] text-left text-base font-light mb-4 space-y-2">
        <li>Visit public profile</li>
        <li>Verify via blockchain + IPFS</li>
        <li>Scan QR or check hash</li>
        <li>Contact verified talent</li>
      </ul>
      <a href="#how-it-works" className="mt-auto px-6 py-2 rounded-lg bg-gradient-to-r from-[#6A8CAF] to-[#B9F6CA] text-black font-bold shadow hover:from-[#B9F6CA] hover:to-[#6A8CAF] transition">See Verification</a>
    </div>
  </div>
</section>

        {/* How It Works Section */}
        <section className="flex flex-col items-center justify-center px-4 py-20">
  <h2 id="how-it-works" className="text-3xl md:text-4xl font-bold mb-16 bg-gradient-to-r from-[#A7C7E7] via-[#B9F6CA] to-[#6A8CAF] text-transparent bg-clip-text drop-shadow-[0_0_12px_rgba(167,199,231,0.18)]">How It Works</h2>
  <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto relative">
    {/* Timeline connector */}
    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-2 z-0" style={{transform: 'translateY(-50%)'}}>
      <div className="w-full h-full bg-gradient-to-r from-[#A7C7E7]/60 via-[#B9F6CA]/40 to-[#6A8CAF]/60 rounded-full blur-[2px]" />
    </div>
    {[
      {
        icon: '🏛️',
        title: 'Institute Issues',
        desc: 'Institutes issue tamper-proof certificates on blockchain.'
      },
      {
        icon: '🎓',
        title: 'Student Stores',
        desc: 'Students securely store and manage their credentials.'
      },
      {
        icon: '💼',
        title: 'Recruiter Verifies',
        desc: 'Recruiters instantly verify authenticity with a click.'
      }
    ].map((step, i) => (
      <div
        key={step.title}
        ref={el => { howItWorksRef.current[i] = el!; }}
        className="relative z-10 flex flex-col items-center text-center mx-0 md:mx-8 mb-16 md:mb-0 w-full md:w-auto group"
      >
        <div className="flex flex-col items-center">
          {/* Glowing icon circle */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-[#A7C7E7] via-[#B9F6CA] to-[#6A8CAF] border-4 border-[#A7C7E7] shadow-[0_0_24px_4px_#A7C7E7,0_0_12px_2px_#B9F6CA] transform transition-transform duration-300 group-hover:scale-125">
            <span className="text-3xl md:text-4xl" style={{filter:'drop-shadow(0 0 10px #A7C7E788)'}}>{step.icon}</span>
          </div>
          {/* Step number */}
          <div className="text-lg font-bold mb-1 bg-gradient-to-r from-[#A7C7E7] via-[#B9F6CA] to-[#6A8CAF] text-transparent bg-clip-text">Step {i+1}</div>
          {/* Step title */}
          <div className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide font-mono">{step.title}</div>
          {/* Step desc */}
          <div className="text-base md:text-lg font-light text-[#e0e0e0] max-w-xs">{step.desc}</div>
        </div>
        {/* Connector line for mobile */}
        {i < 2 && <div className="block md:hidden w-1 h-14 mx-auto bg-gradient-to-b from-[#A7C7E7]/60 via-[#B9F6CA]/40 to-[#6A8CAF]/60 rounded-full my-4" />}
        {i < 2 && <div className="block md:hidden w-1 h-14 mx-auto bg-gradient-to-b from-[#FFD700]/60 via-[#00d1ff]/40 to-[#ff2d7a]/60 rounded-full my-4" />}
      </div>
    ))}
  </div>
</section>

      
<section className="w-full max-w-5xl mx-auto mb-20 px-2">
  <h2 className="text-4xl md:text-5xl font-extrabold text-left mb-4 bg-gradient-to-r from-[#A7C7E7] via-[#B9F6CA] to-[#FFD700] text-transparent bg-clip-text drop-shadow tracking-tight">Roadmap</h2>
  <div className="w-24 h-1 bg-gradient-to-r from-[#A7C7E7] via-[#B9F6CA] to-[#FFD700] rounded-full mb-8 ml-1"></div>
  <ol className="relative border-l-4 border-[#A7C7E7]/40 ml-4">
    <li className="mb-12 ml-8">
      <div className="absolute -left-9 flex items-center justify-center w-10 h-10 bg-[#A7C7E7] rounded-full ring-4 ring-white font-bold text-black text-2xl shadow">✓</div>
      <div className="bg-[#0a0a0a]/80 rounded-xl shadow-lg border border-[#A7C7E7]/20 p-6 min-h-[120px] flex flex-col justify-start p-3">
        <h3 className="font-extrabold text-xl md:text-2xl mb-1 bg-gradient-to-r from-[#A7C7E7] to-[#B9F6CA] text-transparent bg-clip-text">Phase 1: Ideation & Planning</h3>
        <ul className="list-disc ml-6 text-[#e0e0ff] text-base md:text-lg font-light space-y-1">
          <li>Finalize user flows</li>
          <li>Design DB schema & contracts</li>
          <li>Wireframes & structure</li>
        </ul>
      </div>
    </li>
    <li className="mb-12 ml-8">
      <div className="absolute -left-9 flex items-center justify-center w-10 h-10 bg-[#B9F6CA] rounded-full ring-4 ring-white font-bold text-black text-2xl shadow">✓</div>
      <div className="bg-[#0a0a0a]/80 rounded-xl shadow-lg border border-[#B9F6CA]/20 p-6 min-h-[120px] flex flex-col justify-start p-3">
        <h3 className="font-extrabold text-xl md:text-2xl mb-1 bg-gradient-to-r from-[#B9F6CA] to-[#6A8CAF] text-transparent bg-clip-text">Phase 2: Core Features</h3>
        <ul className="list-disc ml-6 text-[#e0e0ff] text-base md:text-lg font-light space-y-1">
          <li>Smart contracts: ERC721, role-based issue/verify</li>
          <li>API endpoints: upload, verify, dashboard</li>
          <li>Wallet auth & upload flow</li>
        </ul>
      </div>
    </li>
    <li className="mb-12 ml-8">
      <div className="absolute -left-9 flex items-center justify-center w-10 h-10 bg-[#FFD700] rounded-full ring-4 ring-white font-bold text-black text-2xl shadow">⏳</div>
      <div className="bg-[#0a0a0a]/80 rounded-xl shadow-lg border border-[#FFD700]/20 p-6 min-h-[120px] flex flex-col justify-start p-3">
        <h3 className="font-extrabold text-xl md:text-2xl mb-1 bg-gradient-to-r from-[#FFD700] to-[#B9F6CA] text-transparent bg-clip-text">Phase 3: Decentralization & Polishing</h3>
        <ul className="list-disc ml-6 text-[#e0e0ff] text-base md:text-lg font-light space-y-1">
          <li>Integrate IPFS, on-chain hash linking</li>
          <li>Deploy to testnet</li>
          <li>Verification page & hash matching</li>
        </ul>
      </div>
    </li>
    <li className="mb-12 ml-8">
      <div className="absolute -left-9 flex items-center justify-center w-10 h-10 bg-[#6A8CAF] rounded-full ring-4 ring-white font-bold text-black text-2xl shadow">🚀</div>
      <div className="bg-[#0a0a0a]/80 rounded-xl shadow-lg border border-[#6A8CAF]/20 p-6 min-h-[120px] flex flex-col justify-start p-3">
        <h3 className="font-extrabold text-xl md:text-2xl mb-1 bg-gradient-to-r from-[#6A8CAF] to-[#B9F6CA] text-transparent bg-clip-text">Phase 4: Launch MVP</h3>
        <ul className="list-disc ml-6 text-[#e0e0ff] text-base md:text-lg font-light space-y-1">
          <li>Final deploy & docs</li>
          <li>Test with demo users</li>
          <li>Build walkthrough for judges</li>
        </ul>
      </div>
    </li>
    <li className="ml-8">
      <div className="absolute -left-9 flex items-center justify-center w-10 h-10 bg-[#A7C7E7]/40 rounded-full ring-4 ring-white font-bold text-black text-2xl shadow">✨</div>
      <div className="bg-[#0a0a0a]/80 rounded-xl shadow-lg border border-[#A7C7E7]/20 p-6 min-h-[120px] flex flex-col justify-start p-3">
        <h3 className="font-extrabold text-xl md:text-2xl mb-1 bg-gradient-to-r from-[#A7C7E7] to-[#FFD700] text-transparent bg-clip-text">Bonus: Scale & Integrations</h3>
        <ul className="list-disc ml-6 text-[#e0e0ff] text-base md:text-lg font-light space-y-1">
          <li>ENS, job portal, verifiable badges, Telegram bot, admin dashboard</li>
        </ul>
      </div>
    </li>
  </ol>
</section>

{/* Enhanced Footer with Socials */}
<footer className="w-full mt-12 border-t border-[#A7C7E7]/15 bg-transparent py-4 px-0 relative overflow-hidden">
  <div className="pointer-events-none absolute inset-0 z-0" style={{background: 'linear-gradient(90deg, rgba(167,199,231,0.07) 0%, transparent 18%, transparent 82%, rgba(167,199,231,0.07) 100%)'}} />
  <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center px-4">
    <span className="font-extrabold text-xl tracking-wide font-mono text-[#A7C7E7]">CryptoCred</span>
    <div className="text-xs text-[#6A8CAF] mt-1">&copy; {currentYear} CryptoCred. All rights reserved.</div>
    <div className="flex gap-4 justify-center mt-2">
      <a href="https://github.com/yourrepo" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] text-[#A7C7E7] text-xl"><i className="fa-brands fa-github"></i>GitHub</a>
      <a href="https://x.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] text-[#A7C7E7] text-xl"><i className="fa-brands fa-x-twitter"></i>X</a>
      <a href="https://discord.com/invite/yourlink" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] text-[#A7C7E7] text-xl"><i className="fa-brands fa-discord"></i>Discord</a>
      <a href="mailto:contact@cryptocred.xyz" className="hover:text-[#FFD700] text-[#A7C7E7] text-xl"><i className="fa-solid fa-envelope"></i>Email</a>
    </div>
  </div>
</footer>

    </main>
    </>
  );
};

export default Home;
