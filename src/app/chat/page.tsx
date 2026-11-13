'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Send, Headphones, Sparkles, Clock, CheckCheck } from 'lucide-react';
import BottomNav from '@/components/navigation/BottomNav';
import MobileStatusBar from '@/components/shared/MobileStatusBar';

const INITIAL_MESSAGES = [
  { id: 1, from: 'bot', text: 'Halo! Selamat datang di Customer Care WUSDelivery 👋', time: '14.50' },
  { id: 2, from: 'bot', text: 'Ada yang bisa kami bantu terkait pesanan, ongkir, atau promo hari ini?', time: '14.50' },
];

const SUGGESTIONS = [
  'Lacak Pesanan Saya 🛵',
  'Metode Pembayaran 💳',
  'Tarif Ongkir 🏷️',
  'Promo Hari Ini 🎁',
  'Hubungi Kurir 📞',
];

const AUTO_REPLIES: Record<string, string> = {
  'pesanan': 'Untuk memantau pesananmu secara real-time, silakan buka menu "Pesanan" untuk live tracking kurir langsung di peta.',
  'bayar': 'Kami melayani pembayaran Cash (Tunai saat pesanan sampai) dan dompet digital WusPay dengan diskon ekstra.',
  'ongkir': 'Tarif ongkir hemat mulai dari Rp 5.000 untuk pengantaran dalam kota dengan garansi makanan sampai hangat.',
  'promo': 'Ada diskon hingga 50% di menu Promo Spesial! Cek halaman Promo untuk klaim kupon diskonmu sekarang.',
  'kurir': 'Kurir kami bernama Rizky Priyatno (Plat AD 5009 NH) siap mengantarkan pesananmu dengan aman.',
  'default': 'Terima kasih telah menghubungi Customer Care WUSDelivery! Pesanmu telah diterima dan tim kami siap membantumu. 😊',
};

let messageCounter = 10;

function generateId() {
  messageCounter += 1;
  return messageCounter;
}

function getCurrentTime() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const text = (typeof textToSend === 'string' ? textToSend : input).trim();
    if (!text) return;

    const userMsg = {
      id: generateId(),
      from: 'user',
      text,
      time: getCurrentTime(),
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
          id: generateId(),
          from: 'bot',
          text: reply,
          time: getCurrentTime(),
        },
      ]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-24 md:pb-12 select-none">
      <MobileStatusBar />

      {/* ── MOBILE HEADER (Hidden on desktop) ── */}
      <div className="md:hidden bg-white px-5 pt-3 pb-3 flex items-center justify-between border-b border-gray-100 shadow-2xs">
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
            Online 24 Jam
          </p>
        </div>
        <div className="w-9" />
      </div>

      {/* ── DESKTOP & MOBILE CHAT CONTAINER ── */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 md:py-8 flex-1 flex flex-col">
        {/* Chat Card Box */}
        <div className="bg-white rounded-3xl border border-gray-150 shadow-sm flex flex-col flex-1 h-[720px] overflow-hidden">
          {/* Card Header (Visible on Desktop) */}
          <div className="hidden md:flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#FAFAFC]">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-100 text-[#193CA5] flex items-center justify-center shadow-xs">
                <Headphones size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-extrabold text-[#111827]">Customer Care WUSDelivery</h2>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                  <Clock size={12} /> Siap melayani 24 Jam setiap hari
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="text-xs font-bold text-gray-500 hover:text-gray-800 bg-white border border-gray-200 px-3.5 py-1.5 rounded-xl transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>

          {/* Messages Stream Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 bg-[#F8FAFC]/50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex items-end gap-2.5 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.from === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#193CA5] flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs mb-1">
                    <Headphones size={15} />
                  </div>
                )}

                {/* Message Bubble with Generous Internal Spacing */}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] md:max-w-[68%] px-5 py-4 rounded-2xl shadow-xs transition-all ${
                    msg.from === 'user'
                      ? 'bg-[#193CA5] text-white rounded-br-xs font-medium'
                      : 'bg-white text-gray-800 border border-gray-150 rounded-bl-xs'
                  }`}
                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                >
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 text-[10px] mt-2 pt-1 border-t ${
                      msg.from === 'user'
                        ? 'text-white/75 border-white/10'
                        : 'text-gray-400 border-gray-100'
                    }`}
                  >
                    <span>{msg.time}</span>
                    {msg.from === 'user' && <CheckCheck size={12} className="text-blue-200" />}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Pills */}
          <div className="px-4 sm:px-6 py-2.5 bg-white border-t border-gray-100 overflow-x-auto no-scrollbar flex items-center gap-2">
            <span className="text-[11px] font-bold text-gray-400 shrink-0 flex items-center gap-1">
              <Sparkles size={12} className="text-[#193CA5]" /> Saran:
            </span>
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="shrink-0 bg-gray-50 hover:bg-blue-50 hover:text-[#193CA5] border border-gray-200/80 rounded-full px-3.5 py-1.5 text-xs font-semibold text-gray-600 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Bar with Generous Internal Padding (NEVER Collides) */}
          <div className="p-4 sm:p-5 md:p-6 bg-white border-t border-gray-150">
            <div className="flex items-center gap-3 bg-[#F1F5F9] border border-gray-200/70 focus-within:border-[#193CA5] focus-within:bg-white rounded-2xl px-4 sm:px-5 py-3 transition-all shadow-inner">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ketik pertanyaan atau keluhan Anda di sini..."
                className="flex-1 text-xs sm:text-sm outline-none bg-transparent text-gray-800 placeholder:text-gray-400 font-medium"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-[#193CA5] hover:bg-[#15328A] text-white flex items-center justify-center active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-[#193CA5]/25 shrink-0"
                title="Kirim pesan"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ── MOBILE BOTTOM NAV ── */}
      <BottomNav />
    </div>
  );
}
