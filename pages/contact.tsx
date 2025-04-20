import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#181818] to-[#0a0a0a] flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full bg-black/80 border border-[#A7C7E7] rounded-3xl shadow-lg p-8 backdrop-blur-md">
          <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-[#A7C7E7] via-[#B9F6CA] to-[#6A8CAF] text-transparent bg-clip-text mb-4">Contact Us</h1>
          <p className="text-[#A7C7E7] text-center mb-8">We'd love to hear from you! Fill out the form below and we'll get back to you soon.</p>
          <form className="space-y-6">   
            
            <div>
              <label className="block text-[#A7C7E7] mb-2 font-medium">Name</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg bg-[#181818] border border-[#A7C7E7] text-white focus:outline-none focus:ring-2 focus:ring-[#A7C7E7]" placeholder="Your Name" required />
            </div>
            <div>
              <label className="block text-[#A7C7E7] mb-2 font-medium">Email</label>
              <input type="email" className="w-full px-4 py-2 rounded-lg bg-[#181818] border border-[#A7C7E7] text-white focus:outline-none focus:ring-2 focus:ring-[#A7C7E7]" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-[#A7C7E7] mb-2 font-medium">Message</label>
              <textarea className="w-full px-4 py-2 rounded-lg bg-[#181818] border border-[#A7C7E7] text-white focus:outline-none focus:ring-2 focus:ring-[#A7C7E7]" rows={5} placeholder="Type your message here..." required />
            </div>
            <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-[#A7C7E7] to-[#B9F6CA] text-black font-bold text-lg shadow hover:from-[#B9F6CA] hover:to-[#A7C7E7] transition-all">Send Message</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
