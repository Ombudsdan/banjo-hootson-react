import { generateClassName } from 'utils';

// TODO - This is going in the bin, don't bother refactoring it.

/**
 * Simple tabbed page navigation component.
 * - Highlights the active tab by `activeKey` and invokes `onSelect` when a tab is clicked.
 */
export default function PageNavigation({ tabs, activeKey, onSelect }: IPageNavigation) {
  return (
    <nav className="page-navigation" aria-label="Page Tabs">
      <ul className="page-navigation__list">
        {tabs.map(tab => {
          const isActive = tab.key === activeKey;
          const className = generateClassName([
            'page-navigation__item',
            isActive && 'page-navigation__item--active',
            tab.isDisabled && 'page-navigation__item--disabled'
          ]);

          return (
            <li key={tab.key} className={className}>
              <button
                type="button"
                className="page-navigation__button"
                aria-current={isActive ? 'page' : undefined}
                disabled={!!tab.isDisabled}
                onClick={() => onSelect?.(tab)}
              >
                {tab.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Props for {@link PageNavigation} */
interface IPageNavigation {
  tabs: IPageNavigationTab[];
  activeKey?: string;
  onSelect?: (tab: IPageNavigationTab) => void;
}

/** Props for a single tab inside {@link PageNavigation} */
export interface IPageNavigationTab {
  key: string;
  title: string;
  isDisabled?: boolean;
}
