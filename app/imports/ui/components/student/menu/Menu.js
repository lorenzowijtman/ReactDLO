import React from 'react';
import { NavLink } from 'react-router-dom';
import { randomColorWord } from '../../../../util/randomColors';

import './menu.scss';

const Menu = () => (
  <aside className="sidebar sidebar--student">
    <div className="sidebar__logo sidebar__logo--student" />
    <div className="menu menu--student">
      
      <span className="menu__title menu__title--student">{randomColorWord('Menu')}</span>
      <nav className="main-menu">
        <ul className="menu__list menu__list--student">
          <li>
            <NavLink className="menu__item menu__item--assignments menu__item--student menu__item--student--assignment" activeClassName="menu__item--active menu__item--active--student menu__item--active--student--assignments" to="/student/lessen">Mijn lessen</NavLink>
            {/* <Link to="/student/lessen">Mijn lessen</Link> */}
          </li>
          {/* <li className="menu-item">
            <Link to="/student">Mijn toetsen</Link>
          </li> */}
          <li>
            <NavLink className="menu__item menu__item--results menu__item--student menu__item--student--results" activeClassName="menu__item--active  menu__item--active--student menu__item--active--results menu__item--active--student--results" to="/student/resultaten">Mijn resultaten</NavLink>
            {/* <Link to="/student/resultaten">Mijn resultaten</Link> */}
          </li>
          <li>
            <NavLink className="menu__item menu__item--settings menu__item--student menu__item--student--settings" activeClassName="menu__item--active  menu__item--active--student menu__item--active--settings menu__item--active--student--settings" to="/student/instellingen">Instellingen</NavLink>
          </li>
          {/* <li className="menu-item">
            <Link to="/student">Mijn cursussen</Link>
          </li> */}
        </ul>
      </nav>
    </div>
  </aside>
);

export default Menu;
