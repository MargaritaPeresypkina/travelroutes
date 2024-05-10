import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import style from "../../css/Header.module.css";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className={`${style.header} ${scrolled ? style.scrolled : ""}`}>
      <NavLink to="/" className={style.logo}>
        <h1>RouteMate</h1>
      </NavLink>
      <nav className={style.nav}>
        <ul className={style.navList}>
          <li className={style.navItem}>
           
            <NavLink to="/" className={`${style.navLink} ${location.pathname === "/" ? style.activeLink : ""}`}>
              Главная
            </NavLink>
          </li>
          <li className={style.navItem}>
            <NavLink to="/routes" className={`${style.navLink} ${location.pathname === "/routes" ? style.activeLink : ""}`}>
              Маршруты
            </NavLink>
          </li>
          <li className={style.navItem}>
            <NavLink to="/profile" className={`${style.navLink} ${location.pathname === "/profile" ? style.activeLink : ""}`}>
              Профиль
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default React.memo(Header);
