import React, { useState } from 'react';

const App = () => {
  const [activity, setActivity] = useState(null);
  const [filters, setFilters] = useState({ vibe: '', buget: '', timp: '' });

  const fetchActivity = async (isRandom = false) => {
    const url = isRandom 
      ? 'https://back-ul-tau.onrender.com/random' 
      : `https://back-ul-tau.onrender.com/get-activity?vibe=${filters.vibe}&buget=${filters.buget}&timp=${filters.timp}`;
    
    const res = await fetch(url);
    const data = await res.json();
    setActivity(data);
  };

  const shareWhatsApp = () => {
    const text = `Plan de ieșeală: ${activity.text}! Te bagi? 🚀`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-black mb-8 text-[#FF5F1F] tracking-tighter">HAI PE AFARĂ</h1>
      
      <div className="w-full max-w-sm space-y-4 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 backdrop-blur-md">
        <select onChange={(e) => setFilters({...filters, vibe: e.target.value})} className="w-full bg-black border border-[#00D9FF] p-4 rounded-xl">
          <option value="">Alege Vibe-ul</option>
          <option value="Chill/Explorare">Chill/Explorare</option>
          <option value="Activ/Sport">Activ/Sport</option>
          <option value="Caterincă/Random">Caterincă/Random</option>
        </select>

        <select onChange={(e) => setFilters({...filters, buget: e.target.value})} className="w-full bg-black border border-[#00D9FF] p-4 rounded-xl">
          <option value="">Buget</option>
          <option value="Sărac Lipit (0 lei)">Sărac Lipit (0 lei)</option>
          <option value="Merge cinzeci de lei">50 lei</option>
          <option value="Bogați (100+ lei)">100+ lei</option>
        </select>

        <button onClick={() => fetchActivity(false)} className="w-full bg-[#FF5F1F] text-black font-bold py-4 rounded-xl active:scale-95 transition">GĂSEȘTE IDEE</button>
        <button onClick={() => fetchActivity(true)} className="w-full border border-white/20 py-2 rounded-xl text-sm opacity-60 italic text-[#00D9FF]">Sunt Indecis</button>
      </div>

      {activity && (
        <div className="mt-8 p-6 border-2 border-[#00D9FF] rounded-3xl animate-pulse w-full max-w-sm">
          <p className="text-xl text-center mb-4">{activity.text}</p>
          <button onClick={shareWhatsApp} className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold">Trimite pe WhatsApp 🚀</button>
        </div>
      )}
    </div>
  );
};

export default App;