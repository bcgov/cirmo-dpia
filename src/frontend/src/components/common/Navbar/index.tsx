import { ReactElement, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useRovingTabIndex } from '../../../hooks/useRovingTabIndex';
import { INavbarPages } from './interfaces';

function NavBar({
  pages,
  CSSclass = 'navbar-container wrapper',
  rovingTabIndex = false,
}: INavbarPages): ReactElement {
  const menuBar = useRef(null);
  const [menuBarCurrentRefState, setMenuBarCurrentRefState] = useState(
    menuBar.current,
  );

  // This change came up when the Sidebar was collapsed and not visible by default.
  // So, every time you change the reference - a new value and current element value be sent to the react hook
  // Tech comment - change state value triggers hook to re-render, useRovingTabIndex in this case
  useEffect(() => {
    setMenuBarCurrentRefState(menuBar.current);
  }, [menuBar]);

  useRovingTabIndex({
    currentRef: menuBarCurrentRefState,
    disabled: !rovingTabIndex,
  });

  const currentPath = window.location.pathname;
  return (
    <nav className={CSSclass}>
      <ul className="navbar" ref={menuBar}>
        {pages
          .filter((page) => page.enable)
          .map((page, index) => {
            return (
              <li key={page.id}>
                {page.isDivider ? (
                  <hr />
                ) : (
                  <NavLink
                    id={page.navId}
                    role="navItem"
                    aria-label={page.label}
                    tabIndex={rovingTabIndex && index > 0 ? -1 : 0}
                    className={`bcgovbtn bcgovbtn__tertiary bcgovbtn__tertiary--dark ${
                      page.link === currentPath ? 'active' : ''
                    }`}
                    to={page.link}
                  >
                    {page.label}
                  </NavLink>
                )}
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

export default NavBar;
