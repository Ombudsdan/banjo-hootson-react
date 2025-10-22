import { PropsWithChildren } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashboardCard({
  icon,
  description,
  isLocked,
  onClick,
  children,
}: IDashboardCard) {
  const cls = `dashboard-card${isLocked ? " dashboard-card--locked" : ""}`;
  return (
    <button
      type="button"
      className={cls}
      onClick={onClick}
      disabled={!!isLocked}
    >
      {icon && (
        <FontAwesomeIcon
          className="dashboard-card__icon"
          icon={icon}
          title={description || "Feature Icon"}
        />
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

interface IDashboardCard extends PropsWithChildren {
  icon?: IconDefinition;
  description?: string;
  isLocked?: boolean;
  onClick?: () => void;
}
