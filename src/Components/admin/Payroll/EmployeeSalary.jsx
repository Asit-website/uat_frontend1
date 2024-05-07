import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import moreVert from "../../images/more_vert.png";
import { useEffect, useState } from "react";
import upload2 from "../../images/upload_2.png"
import frames from "../../images/Frame 1000010647.png"
import bxsearch from "../../images/bx-search.png"
import crosss from "../../images/crosss.png"
import talent from '../../images/talent.svg';
import { useNavigate } from "react-router-dom";
const EmployeeSalary = ({
    pop,
    setPop
    //   pop1,
    //   setPop1,
    //   pop,
    //   setPop,
    //   setAlert,
    //   isHr = false,
}) => {
    const { user, getUsers } = useMain();

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const ans = await getUsers();
        setData(ans?.data);
    }

    const navigate = useNavigate();

    


    return (
        <>
            <div className="employee-dash h-full">
                <AdminSidebar pop={pop} setPop={setPop} />
                <div className="tm">
                    <AdminNavbar user={user} />

                    <div className="em ">

                        <div className="flex-col emWraping">

                            {/* first  */}
                            <div className="hrmDasTxtFir2">
                                <h2>Manage Employee Salary</h2>
                            </div>
                            <div className="employee_sal_card">
                                <div className="emp_selo">
                                    <h3 className="somoi">Employee</h3>
                                    <form className="max-w-md mx-auto">
                                        <label
                                            htmlFor="default-search"
                                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                        >
                                            Search
                                        </label>
                                        <div className="relative">
                                            <div className="absolute sonit inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg
                                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type="search"
                                                id="default-search"
                                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Search Employee"
                                                required=""
                                            />

                                        </div>
                                    </form>

                                </div>
                                <div className="relative overflow-x-auto sklin">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="sipi">
                                                <th scope="col" className="px-6 py-3">
                                                    Employee ID
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Employee Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Payroll Type
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Salary
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Net Salary
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data?.map((val, index) => {
                                                    return <tr key={index} className="bg-white opos border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 oklo font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            {index + 1}
                                                        </th>
                                                        <td className="px-6 py-4">{val?.fullName}</td>
                                                        <td className="px-6 py-4">Monthly Payslip</td>
                                                        <td className="px-6 py-4">₹ 0</td>
                                                        <td className="px-6 py-4">₹ 0</td>
                                                        <td onClick={() => {
                                                            navigate(`/adminDash/setAll/${index+1}`);
                                                        }} className="px-6 py-4">
                                                            <img src={talent} alt="" />
                                                        </td>
                                                    </tr>
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                                <div className="prev_next">

                                    <div className="next">
                                        <button>
                                            <span>Prev</span>
                                            <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z" fill="#666D76" />
                                            </svg>

                                        </button>
                                    </div>

                                    <div className="on1">
                                        <p>1</p>
                                    </div>

                                    <div className="next">
                                        <button><span>Next</span>
                                            <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z" fill="#666D76" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeSalary;
