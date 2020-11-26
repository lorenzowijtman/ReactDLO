import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => (
  <aside className="sidebar sidebar--admin">
    <div className="sidebar__logo" />
    <div className="menu menu--admin">
      <span className="menu__title">Menu</span>
      <nav className="main-menu">
        <ul className="menu__list">
          <li>
            <NavLink exact={true} className="menu__item menu__item--dashboard" activeClassName="menu__item--active menu__item--active--dashboard" to="/admin">Dashboard</NavLink>
          </li>
          <li>
            <NavLink className="menu__item menu__item--assignments" activeClassName="menu__item--active menu__item--active--assignments" to="/admin/lessen">Lessen</NavLink>
          </li>
          <li>
            <NavLink className="menu__item menu__item--results" activeClassName="menu__item--active menu__item--active--results" to="/admin/resultaten">Resultaten</NavLink>
          </li>
          <li>
            <NavLink className="menu__item menu__item--settings" activeClassName="menu__item--active menu__item--active--settings" to="/admin/instellingen">Instellingen</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
);

export default Menu;
