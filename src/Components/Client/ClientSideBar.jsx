import react from "react"
import { NavLink, useNavigate } from "react-router-dom";
import saka from "../../Components/images/saka.svg";
import gridDas from "../../Components/images/gridDas.svg";
import anal from "../../Components/images/anal.svg";
import analytics from "../../Components/images/analytics.svg";
import shop from "../../Components/images/ShoppingBagOpen-d.png";





const ClientSideBar = () => {

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
                className="fixed top-0 olo left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 sidebars"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto  sidebars sidebars1">

                    <ul className="allNavItem">
                        <div className="adDasWrap">
                            <NavLink to="#">
                                <div
                                    className={`${window.location.pathname === "/employeeDash" ? "hh" : ""
                                        } side-dash-box silom `}
                                >
                                    <div className="dash-wrap">
                                        <img
                                            src={`${window.location.pathname === "/employeeDash"
                                                ? saka
                                                : gridDas
                                                }`}
                                            alt="gridDas"
                                        />
                                        <p
                                            className={` semo ${window.location.pathname === "/employeeDash"
                                                ? "fan"
                                                : ""
                                                }`}
                                        >
                                            Dashboard
                                        </p>
                                    </div>

                                </div>
                            </NavLink>
                        </div>

                        {/* <div className="adDasWrap">
                            <NavLink to="#">
                                <div
                                    className={` side-dash-box silom`}
                                >
                                    <div className="dash-wrap">
                                        <img
                                            src={`${window.location.pathname ===
                                                "/employeeDash/HRM/taskClients" ||
                                                window.location.pathname ===
                                                "/employeeDash/HRM/taskProjects"
                                                ? analytics
                                                : anal
                                                }`}
                                            alt="dasg"
                                        />
                                        <p
                                            className={`${window.location.pathname === "/employeeDash"
                                                ? "fan"
                                                : ""
                                                }`}
                                        >
                                            MyProjects
                                        </p>
                                    </div>

                                </div>
                            </NavLink>
                        </div> */}

                        {/* <div className="adDasWrap">
                            <NavLink to="#">
                                <div
                                    className={`${window.location.pathname === "/employeeDash" ? "hh" : ""
                                        } side-dash-box silom`}
                                >
                                    <div className="dash-wrap">
                                    <img src={shop} alt="" />
                                        <p
                                            className={`${window.location.pathname === "/employeeDash"
                                                ? "fan"
                                                : ""
                                                }`}
                                        >
                                            MySelf
                                        </p>
                                    </div>

                                </div>
                            </NavLink>
                        </div> */}

                    </ul>
                </div>


            </aside>

            <div className="p-0 sm:ml-64"></div>
        </>
    )

}


export default ClientSideBar