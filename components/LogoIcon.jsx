const LogoIcon = () => (
  <svg viewBox="0 0 120 110" width="120" height="110" xmlns="http://www.w3.org/2000/svg">
    {/* The Stylized 'L' */}
    <path
      d="M 20 0 L 20 45 L 55 45 L 45 30 L 35 30 L 35 0 Z"
      fill="#fff"
    />
    {/* Thin Center Vertical Line */}
    <rect x="62" y="15" width="2" height="65" fill="#a0a0a0" />
    {/* The 'V' */}
    <path
      d="M 72 45 L 92 85 L 112 45 L 102 45 L 92 68 L 82 45 Z"
      fill="#fff"
    />
    {/* LUXE VERVE Text */}
    <text
      x="63"
      y="105"
      textAnchor="middle"
      fontFamily="'Inter', sans-serif"
      fontSize="13"
      letterSpacing="4"
      fontWeight="600"
      fill="#fff"
    >
      LUXE VERVE
    </text>
  </svg>
);

export default LogoIcon;
