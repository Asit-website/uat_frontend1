import React, { useState } from "react";
import lokia from "../../images/lokia.png";
import calling from "../../images/calling.png";
import chakka from "../../images/chakka.png";
import { NavLink, useNavigate } from "react-router-dom";
import chart from "../../images/ChartPieSlice.png"
import shopping from "../../images/ShoppingBagOpen-d.png"
import identify from "../../images/IdentificationBadge-d.png"
import userP from "../../images/userProfile.png"
import usepp from "../../images/userPp.png"
import user3d from "../../images/UsersThree-d.png"
import chatd from "../../images/ChatsTeardrop-d.png"

const EmployeeSidebar = () => {

  const leadItem = [
    {
      title:"Lead Dashboard" , 
      link:"/employeeDash/leadDash",
    },
    {
      title:"My Lead" , 
      link:"/employeeDash/myLead",
    },
  
  ]

   const [openLead , setOpenLead] = useState(false);

   const navigate = useNavigate();

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
      
        <div className="h-full px-3 py-4 overflow-y-auto  sidebars sidebars1">

          <ul className="allNavItem">

            <NavLink to="/employeeDash"><li className="dashNW">
              <img src={chart} alt="" />
              <a
                href="#"
                className=" "
              >
                <span  className="">Dashboard</span>
              </a>

            </li>
            </NavLink>


           
           <li className="mostwrap">

            <h2 onClick={()=>setOpenLead((prev)=>!prev)} className="leadHead"> <img src={shopping} alt="" /> <span> Lead Management</span></h2>

            {
              openLead && 
               <div className="leadWrapp2">
{

                  leadItem?.map((item ,index)=>(
                    <p key={index} className="leadHead2" onClick={()=>navigate(item?.link)}>{item.title}</p>
                  ))

                }
             
               </div>
 
            }

           </li>

           
           <NavLink to="/"><li className="indefy">
              <img src={identify} alt="" />
              <a
                href="#"
                className=" "
              >
                <span  className="">Payroll Management</span>
              </a>

            </li>
            </NavLink>


           <NavLink to="/employeeDash/update"><li className="indefy">
              <img src={userP} alt="" />
              <a
                href="#"
                className=" "
              >
                <span  className="">User Profile</span>
              </a>

            </li>
            </NavLink>

           <NavLink to="/"><li className="indefy">
              <img src={usepp} alt="" />
              <a
                href="#"
                className=" "
              >
                <span  className="">Account</span>
              </a>

            </li>
            </NavLink>

           <NavLink to="/"><li className="indefy">
              <img src={user3d} alt="" />
              <a
                href="#"
                className=" "
              >
                <span  className="">Corporate</span>
              </a>

            </li>
            </NavLink>

           <NavLink to="/"><li className="indefy">
              <img src={chatd} alt="" />
              <a
                href="#"
                className=" "
              >
                <span  className="">Social</span>
              </a>

            </li>
            </NavLink>



           {/* <li className="most">
              <button
                type="button"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <img width={16} src={lokia} alt="lokia" />
                <span
                  className="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item
                >
                  Requests
                </span>
                <svg
                  sidebar-toggle-item
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-example" className="hidden py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100  dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100  dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100  dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li>

            <li className="most">
              <button
                type="button"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <img width={16} src={calling} alt="lokia" />

                <span
                  className="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item
                >
                  Inbox
                </span>

                <svg
                  sidebar-toggle-item
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>

              </button>

              <ul id="dropdown-example" className="hidden py-2 space-y-2">

                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100  dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100  dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100  dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>

              </ul>

            </li> */}

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

      <div className="p-0 sm:ml-64">

      </div>
    </>
  );
};

export default EmployeeSidebar;
