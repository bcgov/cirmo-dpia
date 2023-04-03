import { ReactElement, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useRovingTabIndex } from '../../../hooks/useRovingTabIndex';
import { INavbarPages } from './interfaces';

function NavBar({
  pages,
  CSSclass = 'navbar-container wrapper',
  rovingTabIndex = false,
}: INavbarPages): ReactElement {
  const menuBar = useRef(null);

  useRovingTabIndex({ ref: menuBar, disabled: !rovingTabIndex });

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
