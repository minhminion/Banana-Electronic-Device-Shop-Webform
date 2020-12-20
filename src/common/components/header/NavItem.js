import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const NavItem = [
  {
    menuTitle: "Trang chủ",
    to: "/",
    subMenu: [],
  },
  {
    menuTitle: "Cửa hàng",
    to: "/shop",
    subMenu: [],
  },
  {
    menuTitle: "Combo",
    to: "/combo",
    subMenu: [],
  },
  {
    menuTitle: "Liên hệ",
    to: "/contact",
    subMenu: [],
  },
];

export const createNav = (sidebarMenu) =>
  NavItem.map((menu) => (
    <li key={menu.menuTitle}>
      {menu.subMenu && menu.subMenu.length ? (
        <Link to={process.env.PUBLIC_URL + menu.to}>
          {menu.menuTitle}
          {sidebarMenu ? (
            <span>
              <i className="fa fa-angle-right"></i>
            </span>
          ) : (
            <i className="fa fa-angle-down" />
          )}
        </Link>
      ) : (
        <Link to={process.env.PUBLIC_URL + menu.to}>{menu.menuTitle}</Link>
      )}
      {menu.subMenu && menu.subMenu.length ? (
        <ul className="mega-menu mega-menu-padding">
          {menu.subMenu.map((subMenu) => (
            <li key={subMenu.subTitle}>
              <ul>
                <li className="mega-menu-title">
                  <Link to={process.env.PUBLIC_URL + subMenu.to}>
                    {subMenu.subTitle}
                  </Link>
                </li>
                {subMenu.item && subMenu.item.length
                  ? subMenu.item.map((item) => (
                      <li key={item.title}>
                        <Link to={process.env.PUBLIC_URL + item.to}>
                          {item.title}
                        </Link>
                      </li>
                    ))
                  : null}
              </ul>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  ));

export const createNavMobile = () => (
  <ul>
    {NavItem.map((menu) => (
      <Fragment key={menu.menuTitle}>
        {menu.subMenu && menu.subMenu.length ? (
          <li className="menu-item-has-children">
            <Link to={process.env.PUBLIC_URL + menu.to}>{menu.menuTitle}</Link>
            <ul className="sub-menu">
              {menu.subMenu.map((subMenu) => (
                <li className="menu-item-has-children" key={subMenu.subTitle}>
                  <Link to={process.env.PUBLIC_URL + subMenu.to}>
                    {subMenu.subTitle}
                  </Link>
                  <ul className="sub-menu">
                    {subMenu.item &&
                      subMenu.item.map((item) => (
                        <li key={item.title}>
                          <Link to={process.env.PUBLIC_URL + item.to}>
                            {item.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li key={menu.menuTitle}>
            <Link to={process.env.PUBLIC_URL + menu.to}>{menu.menuTitle}</Link>
          </li>
        )}
      </Fragment>
    ))}
  </ul>
);
