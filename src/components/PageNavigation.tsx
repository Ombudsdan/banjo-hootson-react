import { useMemo } from "react";
import { generateClassName } from "utils";

export default function PageNavigation({
  tabs,
  activeKey,
  onSelect,
}: IPageNavigation) {
  return (
    <nav className="page-navigation" aria-label="Page Tabs">
      <ul className="page-navigation__list">
        {tabs.map((tab) => {
          const isActive = useMemo(
            () => tab.key === activeKey,
            [tab.key, activeKey]
          );

          const className = useMemo(() => {
            return generateClassName([
              "page-navigation__item",
              isActive && "page-navigation__item--active",
              tab.isDisabled && "page-navigation__item--disabled",
            ]);
          }, [isActive, tab.isDisabled]);

          return (
            <li key={tab.key} className={className}>
              <button
                type="button"
                className="page-navigation__button"
                aria-current={isActive ? "page" : undefined}
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

export interface INavigationTab {
  key: string;
  title: string;
  isDisabled?: boolean;
}

interface IPageNavigation {
  tabs: INavigationTab[];
  activeKey?: string;
  onSelect?: (tab: INavigationTab) => void;
}
