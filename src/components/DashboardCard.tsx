import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  icon?: React.ReactNode;
  description?: string;
  isLocked?: boolean;
  onClick?: () => void;
}>;

export default function DashboardCard({
  icon,
  description,
  isLocked,
  onClick,
  children,
}: Props) {
  const cls = `dashboard-card${isLocked ? " dashboard-card--locked" : ""}`;
  return (
    <button
      type="button"
      className={cls}
      onClick={onClick}
      disabled={!!isLocked}
    >
      {icon && (
        <div className="dashboard-card__icon" aria-hidden>
          {icon}
        </div>
      )}
      <div className="dashboard-card__content">
        {children}
        {description && (
          <p className="dashboard-card__description">{description}</p>
        )}
      </div>
    </button>
  );
}
