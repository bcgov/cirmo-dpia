import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { INavbarPages } from './interfaces';

function NavBar({ pages }: INavbarPages): ReactElement {
  return (
    <nav className="navbar-container ">
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
          <ul className={page.id % 2 === 0 ? ' navbar ms-auto' : 'navbar'}>
            <li key={page.id}>
              <NavLink to={page.link}>{page.label}</NavLink>
            </li>
          </ul>
        );
      })}
    </nav>
  );
}

export default NavBar;
