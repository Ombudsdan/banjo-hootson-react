import { useBackdrop } from "hooks";

export default function BackdropOutlet({ onClick }: { onClick?: () => void }) {
  const { open, _listeners } = useBackdrop() as any;

  if (!open) return null;

  const handleClick = () => {
    if (_listeners && _listeners.size > 0) {
      _listeners.forEach((callback: () => void) => callback());
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className="backdrop"
      role="presentation"
      aria-hidden="true"
      tabIndex={-1}
      onClick={handleClick}
    />
  );
}
