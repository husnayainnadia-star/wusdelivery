import React from 'react';

interface WUSLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
}

export default function WUSLogo({ size = 'md', variant = 'default' }: WUSLogoProps) {
  const sizes = { sm: { box: 'px-2 py-1', text: 'text-sm', sub: 'text-[8px]' }, md: { box: 'px-3 py-1.5', text: 'text-base', sub: 'text-[9px]' }, lg: { box: 'px-4 py-2', text: 'text-xl', sub: 'text-xs' } };
  const s = sizes[size];
  const bg = variant === 'white' ? 'bg-white' : 'bg-[#193CA5]';
  const textColor = variant === 'white' ? 'text-[#193CA5]' : 'text-white';
  const subColor = variant === 'white' ? 'text-[#193CA5]/70' : 'text-white/70';

  return (
    <div className={`${bg} rounded-xl ${s.box} flex flex-col items-center leading-none shadow-sm`}>
      <span className={`${textColor} ${s.text} font-black tracking-widest`}>WUS</span>
      <span className={`${subColor} ${s.sub} font-bold tracking-wider`}>DELIVERY</span>
    </div>
  );
}
