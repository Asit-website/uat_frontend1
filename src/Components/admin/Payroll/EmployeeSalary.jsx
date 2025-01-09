import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import { useEffect, useState } from "react";
import talent from "../../images/talent.svg";
import { useNavigate } from "react-router-dom";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";

const EmployeeSalary = ({ pop, setPop }) => {
  const { user, getUsers } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const ans = await getUsers();
    console.log(ans?.data);
    setData(ans?.data);
  };

  const navigate = useNavigate();

  const [searchtext, setSearchTxt] = useState("");

  const filteredData = data
    ?.filter((x) => x?.designation !== "CEO" && x?._id !== user?._id)
    ?.filter((x) =>
      x?.fullName?.toLowerCase()?.includes(searchtext?.toLowerCase())
    );

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 20;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData?.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(filteredData?.length / entriesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on new search
  }, [searchtext]);

  return (
    <>
      <div className="employee-dash h-full">
        {role === "EMPLOYEE" ? (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        ) : (
          <AdminSidebar pop={pop} setPop={setPop} />
        )}
        <div className="tm">
          {role === "EMPLOYEE" ? (
            <EmployeeNavbar />
          ) : (
            <AdminNavbar user={user} />
          )}

          <div className="em ">
            <div className="flex-col emWraping">
              {/* first */}
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
                        onChange={(e) => setSearchTxt(e.target.value)}
                        value={searchtext}
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
                      {currentEntries?.map((val, index) => {
                        return (
                          <tr
                            key={index}
                            className="bg-white opos border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 oklo font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              #KDS{val?.employeeCode}
                            </th>
                            <td className="px-6 py-4">{val?.fullName}</td>
                            <td className="px-6 py-4">Monthly Payslip</td>
                            <td className="px-6 py-4">₹{val?.salary}</td>
                            <td className="px-6 py-4">₹{val?.netSalary}</td>
                            <td
                              onClick={() => {
                                navigate(`/adminDash/setAll/${val?._id}`, {
                                  state: val?._id,
                                });
                              }}
                              className="px-6 py-4"
                            >
                              <img src={talent} alt="" />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

               {totalPages > 1 && (
                 <div className="pagination navbuttons flex justify-between items-center mt-4">
                 <button
                   onClick={handlePrevPage}
                   disabled={currentPage === 1}
                   className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                 >
                   Previous
                 </button>

                 <span className="px-4">{currentPage}</span>
                 <button
                   onClick={handleNextPage}
                   disabled={currentPage === totalPages}
                   className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                 >
                   Next
                 </button>
               </div>
               )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeSalary;
