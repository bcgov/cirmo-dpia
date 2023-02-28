import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { INavbarPages } from './interfaces';

function NavBar({
  pages,
  CSSclass = 'navbar-container wrapper',
}: INavbarPages): ReactElement {
  const currentPath = window.location.pathname;
  return (
    <nav className={CSSclass}>
      <ul className="navbar">
        {pages
          .filter((page) => page.enable)
          .map((page) => {
            return (
              <li key={page.id}>
                {page.isDivider ? (
                  <hr />
                ) : (
                  <NavLink
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
