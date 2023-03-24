import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { INavbarPages } from './interfaces';

function NavBar({
  pages,
  CSSclass = 'navbar-container wrapper',
  isMenu,
}: INavbarPages): ReactElement {
  const currentPath = window.location.pathname;
  return (
    <nav className={CSSclass}>
      <ul tabIndex={0} role={isMenu ? 'menubar' : ''} className="navbar">
        {pages
          .filter((page) => page.enable)
          .map((page) => {
            return (
              <li role={isMenu ? 'none' : ''} key={page.id}>
                {page.isDivider ? (
                  <hr />
                ) : (
                  <NavLink
                    id={page.navId}
                    role={isMenu ? 'menuitem' : ''}
                    tabIndex={isMenu ? -1 : 0}
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
