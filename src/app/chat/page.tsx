'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import BottomNav from '@/components/navigation/BottomNav';

const INITIAL_MESSAGES = [
  { id: 1, from: 'bot', text: 'Halo! Selamat datang di WUSDelivery Support 👋', time: '14.50' },
  { id: 2, from: 'bot', text: 'Ada yang bisa kami bantu hari ini?', time: '14.50' },
];

const AUTO_REPLIES: Record<string, string> = {
  'pesanan': 'Untuk masalah pesanan, silakan kunjungi halaman "Pesanan Saya" di menu bawah.',
  'bayar': 'Kami menerima pembayaran via Cash dan WusPay. WusPay saat ini dalam mode demo.',
  'ongkir': 'Biaya pengiriman dimulai dari Rp3.000 tergantung jarak.',
  'promo': 'Cek halaman Promo untuk melihat semua diskon yang tersedia!',
  'default': 'Terima kasih atas pesanmu! Tim support kami akan segera membalas dalam waktu 5-10 menit. 😊',
};

export default function ChatPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), from: 'user', text: input, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(m => [...m, userMsg]);

    const lower = input.toLowerCase();
    let reply = AUTO_REPLIES.default;
    for (const key of Object.keys(AUTO_REPLIES)) {
      if (lower.includes(key)) { reply = AUTO_REPLIES[key]; break; }
    }
    setInput('');
    setTimeout(() => {
      setMessages(m => [...m, { id: Date.now() + 1, from: 'bot', text: reply, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }]);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#F5F6FA] flex flex-col">
      {/* Header */}
      <div className="bg-[#193CA5] px-4 pt-12 pb-4 flex items-center gap-3 rounded-b-3xl shrink-0">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🤖</div>
        <div>
          <p className="text-white font-bold text-sm">WUS Support</p>
          <p className="text-white/70 text-[10px]">⚠️ Mode Demo — Balasan otomatis</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-36 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
              msg.from === 'user' ? 'bg-[#193CA5] text-white rounded-br-sm' : 'bg-white text-[#171717] rounded-bl-sm shadow-sm'
            }`}>
              {msg.text}
              <p className={`text-[9px] mt-1 ${msg.from === 'user' ? 'text-white/60 text-right' : 'text-gray-400'}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3" style={{ maxWidth: 430, margin: '0 auto' }}>
        <div className="flex items-center gap-3 bg-[#F5F6FA] rounded-2xl px-4 py-2.5">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ketik pesan..." className="flex-1 text-sm outline-none bg-transparent text-gray-700" />
          <button onClick={handleSend}
            className="w-8 h-8 bg-[#193CA5] rounded-xl flex items-center justify-center shrink-0">
            <Send size={14} className="text-white" />
          </button>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
