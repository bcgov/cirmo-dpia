import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { INavbarPages } from './interfaces';

function NavBar({ pages }: INavbarPages): ReactElement {
  const currentPath = window.location.pathname;

  return (
    <nav className="navbar-container wrapper">
      <ul className="navbar">
        {pages.map((page) => {
          return page.link === '/pia-list' ? (
            <li key={page.id}>
              <NavLink
                className={`bcgovbtn bcgovbtn__tertiary bcgovbtn__tertiary--dark ${
                  page.link === currentPath && 'active'
                }`}
                to={page.link}
                end
              >
                {page.label}
              </NavLink>
            </li>
          ) : (
            <li key={page.id}>
              <NavLink
                className={`bcgovbtn bcgovbtn__tertiary bcgovbtn__tertiary--dark ${
                  page.link === currentPath ? 'active' : ''
                }`}
                to={page.link}
              >
                {page.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
