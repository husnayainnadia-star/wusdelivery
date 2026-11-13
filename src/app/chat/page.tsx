'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Send } from 'lucide-react';
import BottomNav from '@/components/navigation/BottomNav';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const INITIAL_MESSAGES = [
  { id: 1, from: 'bot', text: 'Halo! Selamat datang di Customer Care WUSDelivery 👋', time: '14.50' },
  { id: 2, from: 'bot', text: 'Ada yang bisa kami bantu terkait pesanan atau layanan hari ini?', time: '14.50' },
];

const SUGGESTIONS = [
  'Lacak Pesanan 🛵',
  'Metode Pembayaran 💳',
  'Tarif Ongkir 🏷️',
  'Promo Hari Ini 🎁',
];

const AUTO_REPLIES: Record<string, string> = {
  'pesanan': 'Untuk memantau pesananmu secara live, silakan buka menu "Pesanan" di navigasi bawah untuk live tracking kurir di peta.',
  'bayar': 'Kami melayani pembayaran Cash (Tunai saat pesanan sampai) dan dompet digital WusPay.',
  'ongkir': 'Tarif ongkir hemat mulai dari Rp 5.000 untuk pengantaran dalam kota Surakarta.',
  'promo': 'Gunakan diskon hingga 50% di menu promo spesial hari ini!',
  'kurir': 'Kurir kami bernama Rizky Priyatno (AD 5009 NH) siap mengantarkan pesananmu dengan aman.',
  'default': 'Terima kasih telah menghubungi WUSDelivery! Tim CS kami siap membantumu secepatnya. 😊',
};

let msgCounter = 10;
function getNewId() {
  msgCounter += 1;
  return msgCounter;
}

function getTimeNow() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const text = (typeof textToSend === 'string' ? textToSend : input).trim();
    if (!text) return;

    const userMsg = {
      id: getNewId(),
      from: 'user',
      text,
      time: getTimeNow(),
    };
    setMessages(m => [...m, userMsg]);

    const lower = text.toLowerCase();
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
          id: getNewId(),
          from: 'bot',
          text: reply,
          time: getTimeNow(),
        },
      ]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative pb-32 select-none">
      {/* ── STATUS BAR ── */}
      <MobileStatusBar variant="dark" />

      {/* ── HEADER ── */}
      <div className="bg-white px-5 pt-2 pb-3 flex items-center justify-between border-b border-gray-100 shadow-2xs">
        <button
          onClick={() => router.push('/')}
          className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-extrabold text-[#111827]">Customer Care</h1>
          <p className="text-[10px] text-emerald-600 font-semibold flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </p>
        </div>
        <div className="w-9" />
      </div>

      {/* ── MESSAGES CONTAINER (Generous Padding, No Text Collision) ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-3.5">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                msg.from === 'user'
                  ? 'bg-[#193CA5] text-white rounded-br-xs font-medium'
                  : 'bg-white text-gray-800 border border-gray-150 rounded-bl-xs'
              }`}
              style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
            >
              <p>{msg.text}</p>
              <p
                className={`text-[9px] mt-1.5 pt-1 text-right border-t ${
                  msg.from === 'user' ? 'text-white/70 border-white/10' : 'text-gray-400 border-gray-100'
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* ── QUICK SUGGESTION CHIPS ── */}
      <div className="fixed bottom-26 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-4 py-1.5 bg-transparent overflow-x-auto no-scrollbar flex items-center gap-2 z-30">
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            onClick={() => handleSend(s)}
            className="shrink-0 bg-white/95 hover:bg-white text-gray-700 border border-gray-200 shadow-2xs rounded-full px-3 py-1 text-[11px] font-semibold transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            {s}
          </button>
        ))}
      </div>

      {/* ── FIXED INPUT BAR ── */}
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-150 z-40 px-4 py-2.5 shadow-xs">
        <div className="flex items-center gap-2 bg-[#F1F5F9] border border-gray-200/80 focus-within:border-[#193CA5] focus-within:bg-white rounded-full px-4 py-2 transition-all">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ketik pesan..."
            className="flex-1 text-xs outline-none bg-transparent text-gray-800 placeholder:text-gray-400 font-medium"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="w-8 h-8 rounded-full bg-[#193CA5] hover:bg-[#15328A] text-white flex items-center justify-center active:scale-95 disabled:opacity-40 transition-all shadow-xs shrink-0 cursor-pointer"
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
