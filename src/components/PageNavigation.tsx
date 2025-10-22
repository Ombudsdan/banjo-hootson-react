export type INavigationTab = {
  key: string;
  title: string;
  isDisabled?: boolean;
};

type Props = {
  tabs: INavigationTab[];
  activeKey?: string;
  onSelect?: (tab: INavigationTab) => void;
};

export default function PageNavigation({ tabs, activeKey, onSelect }: Props) {
  return (
    <nav className="page-navigation" aria-label="Page Tabs">
      <ul className="page-navigation__list">
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;
          const cls = [
            "page-navigation__item",
            isActive ? "page-navigation__item--active" : "",
            tab.isDisabled ? "page-navigation__item--disabled" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <li key={tab.key} className={cls}>
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
