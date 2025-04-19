import React from "react";

const features = [
  {
    title: "Decentralized Storage",
    desc: "Your certificates are stored securely on the blockchain, ensuring tamper-proof records accessible anytime, anywhere.",
    icon: "🔗",
  },
  {
    title: "Instant Verification",
    desc: "Employers and institutions can instantly verify the authenticity of your credentials with a single click.",
    icon: "⚡",
  },
  {
    title: "Privacy First",
    desc: "You control who sees your documents. Share access securely and revoke it anytime.",
    icon: "🔒",
  },
  {
    title: "User-Friendly Interface",
    desc: "A modern, glassy UI designed for ease of use on all devices.",
    icon: "💎",
  },
  {
    title: "Multi-format Support",
    desc: "Upload and manage certificates in PDF, JPG, PNG, DOCX, XLSX, and more.",
    icon: "📁",
  },
  {
    title: "Trusted by Institutions",
    desc: "Adopted by leading universities and employers for secure, reliable credential management.",
    icon: "🛡️",
  },
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a0a0a] via-[#181818] to-[#0a0a0a] relative">
      {/* Background image overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80"
          alt="abstract tech background"
          className="w-full h-full object-cover opacity-30 blur-sm"
          style={{filter: 'brightness(0.7)'}}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/90 via-[#181818]/80 to-[#0a0a0a]/95" />
      </div>
      <main className="flex-1 container mx-auto px-4 py-16 relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-wide font-mono bg-gradient-to-r from-[#A7C7E7] via-[#B9F6CA] to-[#6A8CAF] text-transparent bg-clip-text drop-shadow-[0_0_18px_rgba(167,199,231,0.18)] text-center">Features</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-black/80 border border-[#A7C7E7] rounded-3xl shadow-lg p-8 flex flex-col items-center text-center backdrop-blur-md hover:scale-105 transition-transform duration-300"
            >
              <span className="text-4xl mb-4 select-none" aria-hidden>{f.icon}</span>
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#A7C7E7] to-[#B9F6CA] text-transparent bg-clip-text">
                {f.title}
              </h2>
              <p className="text-[#A7C7E7] text-base font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FeaturesPage;
