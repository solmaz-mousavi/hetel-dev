import React from "react";
import "./adminPanelSidebar.css";
import { NavLink } from "react-router-dom";

export default function AdminPanelSidebar() {
  return (
    <div className="admin-panel__navbar-container">
      <ul className="admin-panel__navbar">
        <li className="admin-panel__navbar-item">
          <NavLink
            to="/aseman-hotel/adminPanel/users"
            className={(link) => (link.isActive ? "active" : "")}
          >
            کاربران
          </NavLink>
        </li>

        <li className="admin-panel__navbar-item">
          <NavLink
            to="/aseman-hotel/adminPanel/rooms"
            className={(link) => (link.isActive ? "active" : "")}
          >
            اتاقها
          </NavLink>
        </li>

        <li className="admin-panel__navbar-item">
          <NavLink
            to="/aseman-hotel/adminPanel/roomReservations"
            className={(link) => (link.isActive ? "active" : "")}
          >
            سفارشات اتاق
          </NavLink>
        </li>

        <li className="admin-panel__navbar-item">
          <NavLink
            to="/aseman-hotel/adminPanel/foods"
            className={(link) => (link.isActive ? "active" : "")}
          >
            غذاها
          </NavLink>
        </li>

        <li className="admin-panel__navbar-item">
          <NavLink
            to="/aseman-hotel/adminPanel/foodReservations"
            className={(link) => (link.isActive ? "active" : "")}
          >
            سفارشات غذا
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
