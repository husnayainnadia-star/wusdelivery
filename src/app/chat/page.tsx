'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Send } from 'lucide-react';
import BottomNav from '@/components/navigation/BottomNav';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const INITIAL_MESSAGES = [
  { id: 1, from: 'bot', text: 'Halo! Selamat datang di WUSDelivery Support 👋', time: '14.50' },
  { id: 2, from: 'bot', text: 'Ada yang bisa kami bantu terkait pesanan atau layanan hari ini?', time: '14.50' },
];

const AUTO_REPLIES: Record<string, string> = {
  'pesanan': 'Untuk memantau pesananmu, silakan buka menu "Pesanan" di navigasi bawah untuk live tracking kurir.',
  'bayar': 'Kami melayani pembayaran Cash (Tunai) dan dompet digital WusPay.',
  'ongkir': 'Tarif ongkir hemat mulai dari Rp 5.000 untuk pengantaran dalam kota.',
  'promo': 'Gunakan diskon hingga 50% di menu promo spesial hari ini!',
  'kurir': 'Kurir kami bernama Rizky Priyatno (AD 5009 NH) siap mengantarkan pesananmu dengan aman.',
  'default': 'Terima kasih telah menghubungi WUSDelivery! Tim CS kami siap membantumu secepatnya. 😊',
};

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now(),
      from: 'user',
      text: input,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(m => [...m, userMsg]);

    const lower = input.toLowerCase();
    let reply = AUTO_REPLIES.default;
    for (const key of Object.keys(AUTO_REPLIES)) {
      if (lower.includes(key)) {
        reply = AUTO_REPLIES[key];
        break;
      }
    }
    setInput('');
    setTimeout(() => {
      setMessages(m => [
        ...m,
        {
          id: Date.now() + 1,
          from: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-28 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" className="page-px px-5" />

      {/* ── HEADER ── */}
      <div className="bg-white page-px px-5 pt-2 pb-3.5 flex items-center justify-between border-b border-gray-100">
        <button
          onClick={() => router.push('/')}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-extrabold text-[#171717]">Customer Care</h1>
          <p className="text-[10px] text-emerald-600 font-semibold flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </p>
        </div>
        <div className="w-9" />
      </div>

      {/* ── MESSAGES ── */}
      <div className="flex-1 min-h-0 overflow-y-auto py-4 space-y-3.5" style={{ padding: '16px 20px' }}>
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[78%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                msg.from === 'user'
                  ? 'bg-[#193CA5] text-white rounded-br-xs font-medium'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-xs'
              }`}
            >
              {msg.text}
              <p
                className={`text-[9px] mt-1.5 text-right ${
                  msg.from === 'user' ? 'text-white/70' : 'text-gray-400'
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── INPUT BAR ── */}
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 z-40" style={{ padding: '12px 20px' }}>
        <div className="flex items-center gap-2 bg-[#F1F5F9] rounded-full px-4 py-2.5">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ketik pesan..."
            className="flex-1 text-xs outline-none bg-transparent text-gray-700 placeholder:text-gray-400 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-8 h-8 rounded-full bg-[#193CA5] hover:bg-[#15328A] text-white flex items-center justify-center active:scale-95 disabled:opacity-40 transition-all shadow-xs"
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav />
    </div>
  );
}
