import { PropsWithChildren, useMemo } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateClassName } from 'utils';

/**
 * Focusable dashboard card used to present a feature entry point.
 * - Supports an icon, description and child content.
 * - When `isLocked` is true, the button is disabled and styled as locked.
 */
export default function DashboardCard({ icon, description, isLocked, onClick, children }: IDashboardCard) {
  const className = useMemo(() => {
    return generateClassName(['dashboard-card', isLocked && `dashboard-card--locked`]);
  }, [isLocked]);

  return (
    <button type="button" className={className} onClick={onClick} disabled={!!isLocked}>
      {icon && <FontAwesomeIcon className="dashboard-card__icon" icon={icon} title={description || 'Feature Icon'} />}
      <div className="dashboard-card__content">
        {children}
        {description && <p className="dashboard-card__description">{description}</p>}
      </div>
    </button>
  );
}

/** Props for {@link DashboardCard} */
interface IDashboardCard extends PropsWithChildren {
  icon?: IconDefinition;
  description?: string;
  isLocked?: boolean;
  onClick?: () => void;
}
