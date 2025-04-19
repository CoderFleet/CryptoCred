import Head from 'next/head';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

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
        <nav className="flex justify-between items-center px-8 py-5 bg-white/10 backdrop-blur-lg border-b border-[#635985]/30 rounded-b-2xl shadow-lg mx-4 mt-4" style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.37)'}}>
          <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#FFD700] via-[#FFB800] to-[#FFEF8E] text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,215,0,0.22)]">CryptoCred</div>
          <div className="space-x-6 flex items-center">
             <a href="#features" className="text-white font-medium hover:underline">Features</a>
             <a href="#roles" className="text-white font-medium hover:underline">How It Works</a>
             <a href="#contact" className="text-white font-medium hover:underline">Contact</a>
             <a href="/sign-in" className="text-white font-medium hover:underline">Sign In</a>
           </div>
        </nav>
        <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-28 md:py-36">
  {/* Central glassy card */}
  <div ref={heroRef} className="relative bg-black/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_0_rgba(0,209,255,0.10)] px-12 py-16 mb-14 max-w-2xl w-full border-4 border-[#111] bg-clip-padding flex flex-col items-center before:absolute before:inset-0 before:rounded-[2.5rem] before:pointer-events-none before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-30 after:absolute after:inset-0 after:rounded-[2.5rem] after:pointer-events-none after:bg-gradient-to-t after:from-white/10 after:to-transparent after:opacity-50" style={{boxShadow:'0 8px 40px 0 rgba(0,209,255,0.10), 0 1.5px 32px 0 rgba(255,45,122,0.08)'}}>
    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide font-mono bg-gradient-to-r from-[#FFD700] via-[#FFB800] to-[#FFEF8E] text-transparent bg-clip-text drop-shadow-[0_0_18px_rgba(255,215,0,0.36)]" style={{letterSpacing: '0.045em'}}>CryptoCred</h1>
    <p className="text-lg md:text-2xl text-[#e0e0ff] mb-8 font-light tracking-wider" style={{textShadow:'0 1px 8px #000'}}>Decentralized Academic Certificate Storage &amp; Verification</p>
    <a href="#get-started" className="inline-block px-10 py-3 rounded-2xl font-bold text-lg text-white shadow-xl relative bg-gradient-to-r from-[#000] to-[#111] border-2 border-[#00d1ff] transition-all duration-300 hover:from-[#111] hover:to-[#000] hover:shadow-[0_0_32px_6px_#00d1ff,0_0_24px_4px_#00ffae,0_0_16px_2px_#ff2d7a] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-[#00d1ff]/30 before:via-[#00ffae]/30 before:to-[#ff2d7a]/40 before:blur before:opacity-80 before:animate-pulse overflow-hidden transition-all duration-300">Get Started</a>
  </div>
  {/* Three glassy cards below */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl mx-auto mt-16 mb-10">
    {[{
      icon: '🎓',
      title: 'For Students',
      desc: 'Upload, store, and share your academic credentials securely on-chain.',
    },{
      icon: '🏛️',
      title: 'For Institutes',
      desc: 'Issue and sign certificates as NFTs or hashed records, verifiable by anyone.',
    },{
      icon: '🧑‍💼',
      title: 'For Recruiters',
      desc: 'Easily verify the authenticity of certificates using blockchain and IPFS.',
    }].map((card, i) => (
      <div
        key={card.title}
        ref={el => { cardsRef.current[i] = el!; }}
        className="relative group bg-black/90 border-2 border-[#111] rounded-3xl shadow-[0_8px_32px_0_rgba(0,209,255,0.07)] backdrop-blur-2xl p-10 text-white flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_36px_8px_#00d1ff,0_0_24px_4px_#00ffae,0_0_16px_2px_#ff2d7a] hover:border-transparent before:absolute before:inset-0 before:rounded-3xl before:pointer-events-none before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-20 after:absolute after:inset-0 after:rounded-3xl after:pointer-events-none after:bg-gradient-to-t after:from-white/10 after:to-transparent after:opacity-30 group-hover:before:opacity-40 group-hover:after:opacity-60"
        style={{boxShadow:'0 8px 32px 0 rgba(0,209,255,0.07), 0 1.5px 32px 0 rgba(255,45,122,0.05)'}}
      >
        <span className="text-4xl mb-3 transition-colors duration-300 group-hover:text-[#00d1ff] group-hover:drop-shadow-[0_0_12px_#00d1ff]">{card.icon}</span>
        <h3 className="font-semibold text-xl mb-2 tracking-wide text-white/90 group-hover:text-[#00ffae] transition-colors duration-300 font-mono">{card.title}</h3>
        <p className="text-[#e0e0e0] text-center text-base md:text-lg font-light group-hover:text-[#ff2d7a] transition-colors duration-300">{card.desc}</p>
      </div>
    ))}
  </div>
</section>

        {/* How It Works Section */}
        <section className="flex flex-col items-center justify-center px-4 py-20">
  <h2 className="text-3xl md:text-4xl font-bold mb-16 bg-gradient-to-r from-[#FFD700] via-[#FFB800] to-[#FFEF8E] text-transparent bg-clip-text drop-shadow-[0_0_12px_rgba(255,215,0,0.24)]">How It Works</h2>
  <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto relative">
    {/* Timeline connector */}
    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-2 z-0" style={{transform: 'translateY(-50%)'}}>
      <div className="w-full h-full bg-gradient-to-r from-[#FFD700]/60 via-[#00d1ff]/40 to-[#ff2d7a]/60 rounded-full blur-[2px]" />
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
        className="relative z-10 flex flex-col items-center text-center mx-0 md:mx-8 mb-16 md:mb-0 w-full md:w-auto"
      >
        <div className="flex flex-col items-center">
          {/* Glowing icon circle */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-black/90 border-4 border-[#FFD700] shadow-[0_0_24px_4px_#FFD700,0_0_12px_2px_#00d1ff]">
            <span className="text-4xl" style={{filter:'drop-shadow(0 0 10px #FFD70088)'}}>{step.icon}</span>
          </div>
          {/* Step number */}
          <div className="text-lg font-bold mb-1 bg-gradient-to-r from-[#FFD700] via-[#FFB800] to-[#FFEF8E] text-transparent bg-clip-text">Step {i+1}</div>
          {/* Step title */}
          <div className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide font-mono">{step.title}</div>
          {/* Step desc */}
          <div className="text-base md:text-lg font-light text-[#e0e0e0] max-w-xs">{step.desc}</div>
        </div>
        {/* Connector line for mobile */}
        {i < 2 && <div className="block md:hidden w-1 h-14 mx-auto bg-gradient-to-b from-[#FFD700]/60 via-[#00d1ff]/40 to-[#ff2d7a]/60 rounded-full my-4" />}
      </div>
    ))}
  </div>
</section>

         <footer className="py-8 bg-white/10 backdrop-blur-lg border-t border-[#635985]/30 text-center mt-8 rounded-t-2xl shadow-lg mx-4 mb-4" id="contact" style={{boxShadow:'0 -8px 32px 0 rgba(31, 38, 135, 0.27)'}}>
           <div className="text-white font-semibold"> 2023 CryptoCred. All rights reserved.</div>
         </footer>
      </main>
    </>
  );
};

export default Home;
