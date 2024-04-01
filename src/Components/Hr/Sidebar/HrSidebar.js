import React from 'react';
import dots from "../../images/dots.png";
import lokia from "../../images/lokia.png";
import chakka from "../../images/chakka.png";
import kushel1 from "../../images/kushel1.png";
// import Managment from "../Management/Managment";
import { NavLink } from 'react-router-dom';
import enevelope from '../../images/enevelop.png';
import document from '../../images/document.png';
import cal from '../../images/cal.png';
import cal1 from '../../images/cal1.png';
import cal2 from '../../images/cal2.png';
import cal3 from '../../images/cal3.png';
import gharta from '../../images/gharta.png';
const HrSidebar = () => {
  return (
    <>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 sidebars"
        aria-label="Sidebar"
      >
        {/* <div className="logobar">
          <img src={kushel1} alt="" />
        </div> */}
        <div className="h-full px-3 py-4 overflow-y-auto  sidebars sidebars1">
          <ul className="space-y-2 font-medium sight">
            <NavLink to="/hrDash">
              <li className="most">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <img width={16} src={dots} alt="dots" />
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
            </NavLink>
            <NavLink to="/hrDash/EmployeeMan">
              <li className="most">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <img width={16} src={lokia} alt="dots" />
                  <span className="ml-3">Employees</span>
                </a>
              </li>
            </NavLink>
            <NavLink to="/hrDash/payroll">
              <li className="most">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <img width={16} src={gharta} alt="gharta" />
                  <span className="ml-3">Payroll</span>
                </a>
              </li>
            </NavLink>
            <NavLink to="#!">
              <li className="most">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <img width={16} src={enevelope} alt="dots" />
                  <span className="ml-3">Requests</span>
                </a>
              </li>
            </NavLink>
            <NavLink to="#!">
              <li className="most">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <img width={16} src={document} alt="dots" />
                  <span className="ml-3">Documents</span>
                </a>
              </li>
            </NavLink>

            <NavLink to="#!"><li className="most">
              <button
                type="button"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <img width={16} src={cal1} alt="lokia" />
                <span
                  className="flex-1 ml-2 text-left whitespace-nowrap"
                  sidebar-toggle-item
                >
                  Calender
                </span>
                <img width={20} height={20} src={cal} alt="" />
              </button>
              <ul id="dropdown-example" className="hidden py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li></NavLink>

            <NavLink to="#!"><li className="most">
              <button
                type="button"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <img width={16} src={cal3} alt="lokia" />
                <span
                  className="flex-1 ml-2 text-left whitespace-nowrap"
                  sidebar-toggle-item
                >
                  Messages
                </span>
                <img width={20} height={20} src={cal2} alt="sokia" />
              </button>
              <ul id="dropdown-example" className="hidden py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li></NavLink>

            <div className="red-box">
              <div className="white-box">
                <img src={chakka} alt="chakka" />
                <div className="black-box">
                  <h3>Need Help?</h3>
                  <p>Our support team is ready for you</p>
                  <button>Get Help</button>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </aside>

      <div className="p-0 sm:ml-64"></div>
    </>
  )
}

export default HrSidebar