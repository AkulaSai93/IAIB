/** Two rounded rectangles rotated -35deg. */
export default function LogoMark({ className = "nk-logo" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <g transform="rotate(-35 12 12)" fill="#000000">
        <rect x="4" y="3.5" width="6.5" height="17" rx="3.25" />
        <rect x="13.5" y="3.5" width="6.5" height="17" rx="3.25" />
      </g>
    </svg>
  );
}
