import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { INavbarPages } from './interfaces';

function NavBar({ pages }: INavbarPages): ReactElement {
  return (
    <nav className="navbar-container ">
      <ul className="navbar ms-auto">
        {pages.map((page) => {
          return page.link === '/' ? (
            <li key={page.id}>
              <NavLink to={page.link} end>
                {page.label}
              </NavLink>
            </li>
          ) : (
            <li key={page.id}>
              <NavLink className="bcgovbtn bcgovbtn__secondary nav-link-button" to={page.link}>
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
