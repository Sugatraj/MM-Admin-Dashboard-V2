import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrip,
  faStore,
  faQrcode,
  faLock,
  faUsers,
  faHandshake,
  faSearch,
  faTicket,
  faUser,
  faChevronDown,
  faSignOut,
  faEllipsis,
  faUserShield,
  faList
} from "@fortawesome/free-solid-svg-icons";

// Import your logo images
import logoLight from "../assets/images/logo/logo.svg";
import logoDark from "../assets/images/logo/logo-dark.svg";
import logoIcon from "../assets/images/logo/logo-icon.svg";

const menuData = {
  MENU: [
    // {
    //   title: 'Dashboard',
    //   icon: faGrip,
    //   items: [
    //     { name: 'eCommerce', path: '/', id: 'ecommerce' },
    //     { name: 'Analytics', path: '/analytics', id: 'analytics', pro: true },
    //     { name: 'Marketing', path: '/marketing', id: 'marketing', pro: true },
    //     { name: 'CRM', path: '/crm', id: 'crm', pro: true },
    //     { name: 'Stocks', path: '/stocks', id: 'stocks', pro: true, new: true },
    //     { name: 'SaaS', path: '/saas', id: 'saas', pro: true, new: true }
    //   ]
    // },
    {
      title: "Dashboard",
      path: "/dashboard",
      id: "dashboard",
      icon: faGrip,
    },
    {
      title: "Outlets",
      path: "/outlets",
      id: "outlets",
      icon: faStore,
    },
    {
      title: "QR Templates",
      path: "/qr-templates",
      id: "qr-templates",
      icon: faQrcode,
    },
    {
      title: "Access Control",
      icon: faLock,
      items: [
        { name: "Roles", path: "/roles", icon: faUserShield },
        { name: "Functionalities", path: "/functionalities",  icon: faList },
      ],
    },
    {
      title: "Owners",
      path: "/owners",
      id: "owners",
      icon: faUsers,
    },
    {
      title: "Partners",
      path: "/partners",
      id: "partners",
      icon: faHandshake,
    },
    {
      title: "Search",
      path: "/search",
      id: "search",
      icon: faSearch,
    },
    {
      title: "Customers",
      path: "/customer",
      id: "customer",
      icon: faUser,
    },
    {
      title: "Tickets",
      path: "/tickets",
      id: "tickets",
      icon: faTicket,
    },
    {
      title: "My Profile",
      path: "/profile",
      id: "profile",
      icon: faUser,
    },
  ],
  //   Support: [
  //     {
  //       title: "Chat",
  //       path: "/chat",
  //       id: "chat",
  //       icon: faComments,
  //     },
  //     {
  //       title: "Email",
  //       icon: faEnvelope,
  //       items: [
  //         { name: "Inbox", path: "/inbox", id: "inbox", pro: true },
  //         {
  //           name: "Details",
  //           path: "/inbox-details",
  //           id: "inboxDetails",
  //           pro: true,
  //         },
  //       ],
  //     },
  //   ],
  //   Others: [
  //     {
  //       title: "Charts",
  //       icon: faChartPie,
  //       items: [
  //         { name: "Line Chart", path: "/line-chart", id: "lineChart", pro: true },
  //         { name: "Bar Chart", path: "/bar-chart", id: "barChart", pro: true },
  //         { name: "Pie Chart", path: "/pie-chart", id: "pieChart", pro: true },
  //       ],
  //     },
  //   ],
};

const Sidebar = ({ sidebarToggle = false }) => {
  const [selected, setSelected] = useState("Dashboard");
  const [page, setPage] = useState("ecommerce");
  const navigate = useNavigate();

  const MenuGroup = ({ title, items }) => (
    <div>
      <h3 className="mb-4 text-xs leading-[20px] text-gray-400 uppercase">
        <span
          className={`menu-group-title ${sidebarToggle ? "lg:hidden" : ""}`}
        >
          {title}
        </span>
        <FontAwesomeIcon
          icon={faEllipsis}
          className={`menu-group-icon mx-auto fill-current ${
            sidebarToggle ? "lg:block hidden" : "hidden"
          }`}
        />
      </h3>
      <ul className="mb-6 flex flex-col gap-4">
        {items.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );

  const MenuItem = ({ item }) => {
    const isActive = selected === item.title;
    const hasDropdown = !!item.items;

    return (
      <li>
        <Link
          to={item.path || "#"}
          onClick={(e) => {
            if (!item.path || hasDropdown) e.preventDefault();
            setSelected(selected === item.title ? "" : item.title);
          }}
          className={`menu-item group ${
            isActive ? "menu-item-active" : "menu-item-inactive"
          }`}
        >
          <FontAwesomeIcon
            icon={item.icon}
            className={`menu-item-icon ${
              isActive ? "menu-item-icon-active" : "menu-item-icon-inactive"
            }`}
          />

          <span
            className={`menu-item-text ${sidebarToggle ? "lg:hidden" : ""}`}
          >
            {item.title}
          </span>

          {hasDropdown && (
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`menu-item-arrow ${
                isActive ? "menu-item-arrow-active" : "menu-item-arrow-inactive"
              } ${sidebarToggle ? "lg:hidden" : ""}`}
            />
          )}
        </Link>

        {hasDropdown && (
          <div
            className={`translate transform overflow-hidden ${
              isActive ? "block" : "hidden"
            }`}
          >
            <ul
              className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${
                sidebarToggle ? "lg:hidden" : "flex"
              }`}
            >
              {item.items.map((subItem, idx) => (
                <li key={idx}>
                  <Link
                    to={subItem.path}
                    className={`menu-dropdown-item group ${
                      page === subItem.id
                        ? "menu-dropdown-item-active"
                        : "menu-dropdown-item-inactive"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`menu-item-icon ${
                        isActive
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    />
                    {subItem.name}
                    {(subItem.pro || subItem.new) && (
                      <span className="absolute right-3 flex items-center gap-1">
                        {subItem.new && (
                          <span className="menu-dropdown-badge">New</span>
                        )}
                        {subItem.pro && (
                          <span className="menu-dropdown-badge">Pro</span>
                        )}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    );
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside
      className={`sidebar fixed top-0 left-0 z-9999 flex h-screen w-[290px] flex-col overflow-y-auto 
                      border-r border-gray-200 bg-white px-5 transition-all duration-300 relative
                      ${
                        sidebarToggle
                          ? "translate-x-0 lg:w-[90px]"
                          : "-translate-x-full"
                      } 
                      lg:static lg:translate-x-0 dark:border-gray-800 dark:bg-black`}
    >
      {/* Sidebar Header */}
      <div
        className={`sidebar-header flex items-center gap-2 pt-8 pb-7 ${
          sidebarToggle ? "justify-center" : "justify-between"
        }`}
      >
        <Link to="/">
          <span className={`logo ${sidebarToggle ? "hidden" : ""}`}>
            <img className="dark:hidden" src={logoLight} alt="Logo" />
            <img className="hidden dark:block" src={logoDark} alt="Logo" />
          </span>
          <img
            className={`logo-icon ${sidebarToggle ? "lg:block" : "hidden"}`}
            src={logoIcon}
            alt="Logo"
          />
        </Link>
      </div>

      {/* Sidebar Content */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav>
          {Object.entries(menuData).map(([groupName, items], idx) => (
            <MenuGroup key={idx} title={groupName} items={items} />
          ))}
        </nav>
      </div>

      {/* Move the Logout Button to be fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-white border-t border-gray-200 dark:bg-black dark:border-gray-800">
        <button
          onClick={handleLogout}
          className={`w-full inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-error-500 hover:text-error-600 transition rounded-lg ${
            sidebarToggle ? "justify-center" : "justify-start"
          }`}
        >
          <FontAwesomeIcon icon={faSignOut} className="w-5 h-5" />
          <span className={`${sidebarToggle ? "lg:hidden" : ""}`}>
            Sign out
          </span>
        </button>
      </div>

      {/* Promo Box */}
      {/* <div
        className={`mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center 
                      dark:bg-white/[0.03] ${sidebarToggle ? "lg:hidden" : ""}`}
      >
        <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
          #1 Tailwind CSS Dashboard
        </h3>
        <p className="text-theme-sm mb-4 text-gray-500 dark:text-gray-400">
          Leading Tailwind CSS Admin Template with 400+ UI Component and Pages.
        </p>
        <a
          href="https://tailadmin.com/pricing"
          target="_blank"
          rel="nofollow"
          className="bg-brand-500 text-theme-sm hover:bg-brand-600 flex items-center justify-center 
                    rounded-lg p-3 font-medium text-white"
        >
          Purchase Plan
        </a>
      </div> */}
    </aside>
  );
};

export default Sidebar;
