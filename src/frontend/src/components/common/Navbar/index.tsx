import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { INavbarPages } from './interfaces';

function NavBar({ pages }: INavbarPages): ReactElement {
  return (
    <nav className="navbar-container wrapper">
      <ul className="navbar">
        {pages.map((page) => {
          return page.link === '/pia-list' ? (
            <li key={page.id}>
              <NavLink
                className="bcgovbtn bcgovbtn__tertiary bcgovbtn__tertiary--dark"
                to={page.link}
                end
              >
                {page.label}
              </NavLink>
            </li>
          ) : (
            <li key={page.id}>
              <NavLink
                className="bcgovbtn bcgovbtn__secondary--dark"
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
