import React from 'react';

interface WUSLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'blue' | 'white';
  layout?: 'vertical' | 'horizontal';
  showSubtitle?: boolean;
  className?: string;
}

export default function WUSLogo({
  size = 'md',
  variant = 'blue',
  layout = 'vertical',
  showSubtitle = true,
  className = '',
}: WUSLogoProps) {
  const isWhite = variant === 'white';
  const primaryColor = isWhite ? '#FFFFFF' : '#193CA5';

  if (layout === 'horizontal') {
    return (
      <div className={`flex items-center gap-2 select-none ${className}`}>
        {/* Motorcycle Courier Icon */}
        <div className="shrink-0">
          <svg width="34" height="26" viewBox="0 0 160 85" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Speed lines */}
            <g stroke={primaryColor} strokeWidth="3" strokeLinecap="round" opacity={0.7}>
              <line x1="8" y1="28" x2="32" y2="28" />
              <line x1="14" y1="36" x2="42" y2="36" />
              <line x1="4" y1="44" x2="30" y2="44" />
            </g>
            {/* Courier on Bike */}
            <g fill={primaryColor} stroke={primaryColor}>
              <circle cx="85" cy="18" r="9" />
              <path d="M78 26C84 25 92 27 96 32L92 46C86 46 76 43 72 37L78 26Z" />
              <rect x="60" y="23" width="17" height="21" rx="3" transform="rotate(-12 60 23)" />
              <path d="M88 32L102 38L99 43L86 37Z" />
              <path d="M68 47C76 45 92 44 104 46L110 52C102 54 84 57 70 56L68 47Z" />
              <circle cx="58" cy="62" r="12" stroke={primaryColor} strokeWidth="4" fill="none" />
              <circle cx="58" cy="62" r="4.5" />
              <circle cx="114" cy="62" r="12" stroke={primaryColor} strokeWidth="4" fill="none" />
              <circle cx="114" cy="62" r="4.5" />
              <line x1="35" y1="75" x2="135" y2="75" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        {/* Text Lockup */}
        <div className="flex flex-col leading-none">
          <span
            className="font-black tracking-wider text-base"
            style={{ color: primaryColor, fontFamily: 'system-ui, sans-serif' }}
          >
            WUS
          </span>
          {showSubtitle && (
            <span
              className="text-[7.5px] font-extrabold tracking-widest px-1.5 py-0.5 rounded-full mt-0.5 text-center"
              style={{
                backgroundColor: primaryColor,
                color: isWhite ? '#193CA5' : '#FFFFFF',
              }}
            >
              DELIVERY
            </span>
          )}
        </div>
      </div>
    );
  }

  // Vertical Stacked Mode (For Splash, Sign-In, Sign-Up)
  const scaleMap = {
    sm: { width: 56, height: 42 },
    md: { width: 90, height: 68 },
    lg: { width: 130, height: 98 },
    xl: { width: 170, height: 128 },
  };

  const { width, height } = scaleMap[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Speed lines */}
        <g stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" opacity={isWhite ? 0.8 : 0.65}>
          <line x1="8" y1="28" x2="32" y2="28" />
          <line x1="14" y1="36" x2="42" y2="36" />
          <line x1="4" y1="44" x2="30" y2="44" />
          <line x1="18" y1="52" x2="38" y2="52" />
        </g>

        {/* Courier on Motorcycle */}
        <g fill={primaryColor} stroke={primaryColor}>
          <circle cx="85" cy="18" r="9" />
          <path
            d="M89 16C92 17 93 20 92 22H86"
            stroke={isWhite ? '#193CA5' : '#FFFFFF'}
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M78 26C84 25 92 27 96 32L92 46C86 46 76 43 72 37L78 26Z" />
          <rect x="60" y="23" width="17" height="21" rx="3" transform="rotate(-12 60 23)" />
          <line x1="57" y1="30" x2="45" y2="30" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
          <line x1="55" y1="37" x2="40" y2="37" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
          <path d="M88 32L102 38L99 43L86 37Z" />
          <path d="M98 34L108 36L106 39L97 37Z" />
          <path d="M102 28L108 36" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M68 47C76 45 92 44 104 46L110 52C102 54 84 57 70 56L68 47Z" />
          <path d="M100 48L112 62" stroke={primaryColor} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="58" cy="62" r="12" stroke={primaryColor} strokeWidth="4" fill="none" />
          <circle cx="58" cy="62" r="4.5" />
          <circle cx="114" cy="62" r="12" stroke={primaryColor} strokeWidth="4" fill="none" />
          <circle cx="114" cy="62" r="4.5" />
          <line x1="35" y1="75" x2="135" y2="75" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* WUS text */}
        <g fill={primaryColor}>
          <path d="M36 83L43 83L49 101L55 83L62 83L54 105L45 105L40 91L34 105L26 105L36 83Z" />
          <path d="M68 83L77 83L77 97C77 101 81 103 86 103C91 103 94 101 94 97L94 83L103 83L103 97C103 106 96 110 86 110C76 110 68 106 68 97L68 83Z" />
          <path d="M110 88C110 85 113 83 118 83C124 83 128 85 130 89L122 92C121 90 120 89 118 89C116 89 115 90 115 91C115 93 117 94 122 95C129 97 133 99 133 104C133 108 128 111 120 111C113 111 108 108 107 103L115 100C116 103 118 104 120 104C123 104 125 103 125 101C125 99 123 98 119 97C112 95 110 93 110 88Z" />
        </g>

        {/* DELIVERY Banner */}
        {showSubtitle && (
          <g>
            <rect x="42" y="112" width="76" height="14" rx="7" fill={isWhite ? '#FFFFFF' : '#193CA5'} />
            <text
              x="80"
              y="122.5"
              textAnchor="middle"
              fill={isWhite ? '#193CA5' : '#FFFFFF'}
              fontSize="7.5"
              fontWeight="900"
              letterSpacing="2.5"
              fontFamily="system-ui, sans-serif"
            >
              DELIVERY
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
