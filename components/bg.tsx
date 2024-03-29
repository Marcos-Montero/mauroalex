export const Bg = ({ className }: { className: string }) => (
  <svg
    className={className}
    id="patternId"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="a"
        patternUnits="userSpaceOnUse"
        width="45"
        height="51.96"
        patternTransform="scale(2) rotate(0)"
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="hsla(0, 0%, 100%, 0)"
        />
        <path
          d="M52.48 44.47a15 15 0 01-14.96 0 15 15 0 00-7.48 12.96M7.48 44.42a15 15 0 01-14.96 0M15 57.44c0-5.35-2.9-10.35-7.52-13.02a15 15 0 017.48-12.97M7.48 18.5a14.97 14.97 0 01-14.98-.03m15.02-.03A15 15 0 0115 5.47a15 15 0 00-4.4-10.62m23.8.05A15 15 0 0030 5.53a15 15 0 017.48 12.96 14.9 14.9 0 0015.02-.03m-22.5 13a15.13 15.13 0 017.52 13.01m-7.56-39a15 15 0 01-14.96 0M7.48 18.5a15 15 0 017.48 12.96 15 15 0 0015.04 0 15 15 0 017.48-12.96"
          strokeWidth="1"
          stroke="hsla(360, 10%, 24%, 0.37)"
          fill="none"
        />
      </pattern>
    </defs>
    <rect
      width="800%"
      height="800%"
      transform="translate(0,0)"
      fill="url(#a)"
    />
  </svg>
);
