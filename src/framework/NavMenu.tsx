import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { onAuthTokenChange } from "@/auth/firebase";

export function NavMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const navContentRef = useRef<HTMLUListElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const inertOverlayElements = useMemo<HTMLElement[]>(() => {
    const selectors = ["main", "footer"];
    return selectors
      .map((s) => document.querySelector(s))
      .filter((el): el is HTMLElement => el !== null);
  }, []);

  useEffect(() => {
    const unsub = onAuthTokenChange((token) => setIsAuthenticated(!!token));
    return () => unsub();
  }, []);

  const setOverlayInert = useCallback(
    (inert: boolean) => {
      inertOverlayElements.forEach((el) => {
        if (inert) el.setAttribute("inert", "");
        else el.removeAttribute("inert");
        el.setAttribute("aria-hidden", inert ? "true" : "false");
      });
    },
    [inertOverlayElements]
  );

  const focusFirstLinkOrButton = useCallback((opened: boolean) => {
    if (opened) {
      const firstLink = navContentRef.current?.querySelector(
        "a"
      ) as HTMLElement | null;
      if (firstLink) firstLink.focus();
    } else {
      menuButtonRef.current?.focus();
    }
  }, []);

  const toggleMobile = (state?: boolean) => {
    setMobileOpen((prev) => {
      const next = state ?? !prev;
      if (!next) setDropdownOpen(false);
      // Side effects after state update
      setTimeout(() => {
        setOverlayInert(next);
        focusFirstLinkOrButton(next);
      });
      return next;
    });
  };

  const toggleDropdown = () => setDropdownOpen((v) => !v);
  const onNavigate = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setOverlayInert(false);
  };

  // Close menus on route changes (NavigationStart/Skipped equivalent)
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setOverlayInert(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  // Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        if (mobileOpen) {
          setMobileOpen(false);
          setOverlayInert(false);
          menuButtonRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, setOverlayInert]);

  return (
    <>
      <nav className="nav" role="navigation" aria-label="Main">
        <div className="nav__inner">
          <Link className="nav__brand" to="/" onClick={onNavigate}>
            Banjo Hootson
          </Link>

          <button
            className="nav__toggle"
            type="button"
            onClick={() => toggleMobile()}
            ref={menuButtonRef}
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="nav-menu"
          >
            {/* Using text icon to avoid external icon deps */}☰
          </button>

          <ul
            className={`nav__list ${mobileOpen ? "nav__list--open" : ""}`}
            id="nav-menu"
            ref={navContentRef}
          >
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
                <span
                  className={`nav__caret ${
                    dropdownOpen ? "nav__caret--open" : ""
                  }`}
                  aria-hidden
                >
                  ▾
                </span>
              </button>
              <ul
                className={`nav__dropdown ${
                  dropdownOpen ? "nav__dropdown--open" : ""
                }`}
                id="birthdays-menu"
              >
                <li className="nav__item">
                  <NavLink
                    className="nav__link"
                    to="/calendar"
                    onClick={onNavigate}
                  >
                    Birthday Calendar
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    className="nav__link"
                    to="/calendar/submit"
                    onClick={onNavigate}
                  >
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
                  navigate(isAuthenticated ? "/dashboard" : "/login");
                  onNavigate();
                }}
              >
                {isAuthenticated ? "My Account" : "Sign In"}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`backdrop ${mobileOpen ? "backdrop--visible" : ""}`}
        onClick={() => toggleMobile(false)}
        onKeyDown={(e) => e.key === "Escape" && toggleMobile(false)}
        tabIndex={0}
      />
    </>
  );
}
