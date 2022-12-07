import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { INavbarPages } from './interfaces';

function NavBar({ pages }: INavbarPages): ReactElement {
  return (
    <nav className="navbar-container wrapper">
      {pages.map((page) => {
        return page.link === '/' ? (
          <ul className="navbar">
            <li key={page.id}>
              <NavLink to={page.link} end>
                {page.label}
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="navbar">
            <li key={page.id}>
              <NavLink
                className="bcgovbtn bcgovbtn__secondary--dark"
                to={page.link}
              >
                {page.label}
              </NavLink>
            </li>
          </ul>
        );
      })}
    </nav>
  );
}

export default NavBar;
