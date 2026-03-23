interface CardDeckIconProps {
  className?: string;
}

export function CardDeckIcon({ className = "w-6 h-6" }: CardDeckIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0 2px 8px rgba(212, 175, 55, 0.6))' }}
    >
      {/* Back card - offset */}
      <rect
        x="3"
        y="2"
        width="15"
        height="19"
        rx="2"
        fill="#B8935F"
        opacity="0.5"
      />
      {/* Middle card - offset */}
      <rect
        x="4"
        y="3"
        width="15"
        height="19"
        rx="2"
        fill="#D4AF37"
        opacity="0.75"
      />
      {/* Front card - main */}
      <rect
        x="5"
        y="4"
        width="15"
        height="19"
        rx="2.5"
        fill="url(#goldGradient)"
        stroke="#B8935F"
        strokeWidth="2"
      />
      {/* Card shine/highlight */}
      <rect
        x="6"
        y="5"
        width="6"
        height="8"
        rx="1"
        fill="white"
        opacity="0.15"
      />
      {/* Card suit - Spade */}
      <path
        d="M12.5 11c0-1.8 1.8-3.5 1.8-3.5s1.8 1.7 1.8 3.5c0 1.2-0.6 1.8-1.2 2.1v1.4h-1.2v-1.4c-0.6-0.3-1.2-0.9-1.2-2.1z"
        fill="#2B210F"
        opacity="0.6"
      />
      {/* Corner decoration - top left A */}
      <text
        x="7.5"
        y="9"
        fontSize="4.5"
        fontWeight="bold"
        fill="#2B210F"
        opacity="0.7"
      >
        A
      </text>
      {/* Corner decoration - bottom right K */}
      <text
        x="15.5"
        y="20.5"
        fontSize="4.5"
        fontWeight="bold"
        fill="#2B210F"
        opacity="0.7"
      >
        K
      </text>
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4E5B7" />
          <stop offset="50%" stopColor="#E6C36A" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
    </svg>
  );
}