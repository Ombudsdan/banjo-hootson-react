import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AuthController } from 'controllers';
import { useBackdrop, useIsMobile } from 'hooks';
import { getElementFromContentRef, setInert } from 'utils';

export default function NavMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const navContentRef = useRef<HTMLUListElement | null>(null);
  const location = useLocation();
  const { openBackdrop, closeBackdrop, addBackdropClickListener, removeBackdropClickListener } = useBackdrop();
  const isMobile = useIsMobile();

  const setOverlayInert = useCallback((isInert: boolean) => setInert(['main', 'footer'], isInert), []);

  const focusFirstLinkOrButton = useCallback((hasOpened: boolean) => {
    if (hasOpened) {
      getElementFromContentRef(navContentRef, 'a')?.focus();
    } else {
      getElementFromContentRef(menuButtonRef)?.focus();
    }
  }, []);

  // TODO - Probably overkill to use useCallback for these toggle functions
  const toggleMobile = useCallback(
    (state?: boolean) => {
      setMobileOpen(prev => {
        const next = state ?? !prev;
        if (!next) setDropdownOpen(false);
        setTimeout(() => {
          setOverlayInert(next);
          focusFirstLinkOrButton(next);
        });
        return next;
      });
    },
    [setOverlayInert, focusFirstLinkOrButton]
  );

  const toggleDropdown = useCallback(() => setDropdownOpen(v => !v), []);

  const navigate = useCallback((to: string) => (window.location.href = to), []);

  const onNavigate = useCallback(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setOverlayInert(false);
  }, [setOverlayInert]);

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    if (!dropdownOpen) return;
    document.addEventListener('mousedown', handleClickOutsideOfDropdown);
    return () => document.removeEventListener('mousedown', handleClickOutsideOfDropdown);
  }, [dropdownOpen]);

  useEffect(() => {
    const unsub = AuthController.onAuthTokenChange(token => setIsAuthenticated(!!token));
    return () => unsub();
  }, []);

  // Close menus on route changes (NavigationStart/Skipped equivalent)
  useEffect(() => closeNavMenu, [location.key]);

  // Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => closeNavMenu(mobileOpen && e.key === 'Escape');
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  // Register backdrop click listener to close mobile nav
  useEffect(() => {
    addBackdropClickListener(closeNavMenu);
    return () => removeBackdropClickListener(closeNavMenu);
  }, [addBackdropClickListener, removeBackdropClickListener]);

  useEffect(() => (mobileOpen ? openBackdrop() : closeBackdrop()), [mobileOpen, openBackdrop, closeBackdrop]);

  function closeNavMenu(shouldClose: boolean = true) {
    if (shouldClose) {
      setDropdownOpen(false);
      setMobileOpen(false);
      setOverlayInert(false);
      menuButtonRef.current?.focus();
    }
  }

  function handleClickOutsideOfDropdown(event: MouseEvent) {
    const dropdown = getElementFromContentRef(navContentRef, '.nav__dropdown');
    // Only close on desktop (not mobile)
    if (dropdown && !dropdown.contains(event.target as Node) && !isMobile) {
      setDropdownOpen(false);
    }
  }

  return (
    <>
      <nav className={`nav ${mobileOpen ? 'nav--mobile-open' : ''}`} role="navigation" aria-label="Main">
        <div className="nav__inner">
          <Link className="nav__brand" to="/" onClick={onNavigate}>
            Banjo Hootson
          </Link>

          <button
            className="nav__toggle"
            type="button"
            onClick={() => toggleMobile()}
            ref={menuButtonRef}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="nav-menu"
          >
            {/* Using text icon to avoid external icon deps */}☰
          </button>

          <ul className={`nav__list ${mobileOpen ? 'nav__list--open' : ''}`} id="nav-menu" ref={navContentRef}>
            <li className="nav__item nav__item--has-dropdown">
              <button
                className="nav__link nav__dropdown-toggle"
                type="button"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-controls="birthdays-menu"
              >
                Plushie Birthdays
                <span className={`nav__caret ${dropdownOpen ? 'nav__caret--open' : ''}`} aria-hidden>
                  ▾
                </span>
              </button>
              <ul className={`nav__dropdown ${dropdownOpen ? 'nav__dropdown--open' : ''}`} id="birthdays-menu">
                <li className="nav__item">
                  <NavLink className="nav__link" to="/calendar" onClick={onNavigate}>
                    Birthday Calendar
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink className="nav__link" to="/calendar/submit" onClick={onNavigate}>
                    Submit a Birthday
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav__item">
              <NavLink className="nav__link" to="/about" onClick={onNavigate}>
                About
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink className="nav__link" to="/contact" onClick={onNavigate}>
                Contact
              </NavLink>
            </li>

            <li className="nav__spacer" aria-hidden="true" />

            <li className="nav__item">
              <button
                type="button"
                className="button button--main"
                onClick={() => {
                  navigate(isAuthenticated ? '/dashboard' : '/login');
                  onNavigate();
                }}
              >
                {isAuthenticated ? 'My Account' : 'Sign In'}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
