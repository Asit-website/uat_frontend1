import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import chevron from "../../images/chevron_right.png";
import "./hrm.css";
import "./leaveReq.css";
import "./markAttendance.css";
import { NavLink } from "react-router-dom";
import moreVert from "../../images/more_vert.png";
import { useEffect, useState } from "react";

const MarkAttendance = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {
  const { user, getAllActivities, getUsers, getDepartments, allEmployee , getAllActivities2 } = useMain();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState({});
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);


  const getData = async () => {
    const ans1 = await allEmployee();
    setUsers(ans1.emp);
    let ans = await getAllActivities();
    console.log("ans 2 ", ans);
    setData(ans.data);
    const ans2 = await getDepartments();

    setDepartments(ans2.data);
  };

  var [selectedOption, setSelectedOption] = useState("daily");
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [userId, setuserId] = useState('');
  const [department, setDepartment] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    selectedOption = event.target.value;
    handleSubmit();
  };

  const handleSubmit = async () => {

     let monthUpdate ;

    if(month){
       const regex = /-(\d+)/;
       const match = month.match(regex);

       if (match) {
         monthUpdate = match[1];
       }
    }

    let ans = await getAllActivities2(selectedOption, date, monthUpdate, userId);
    console.log('ans ',ans);
  
  };

  const handleDownload = async () => {

  };

  const handleShare = async () => {

  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>Hello Dinesh</h1>
      <div className="employee-dash h-full">
        {isHr ? <HrSidebar /> : <AdminSidebar pop={pop} setPop={setPop} />}
        <div className="tm">
          {isHr ? (
            <HrNavbar
              user={user}
              setAlert={setAlert}
              pop1={pop1}
              setPop1={setPop1}
            />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">
            <div className="flex-col emWraping">
              {/* first  */}
              <div className="hrmDasTxtFir">
                <p className="hrmHed">Dashboard</p>

                <div className="hrDsPa">
                  <p className="hrFirDs">Dashboard</p>{" "}
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  <NavLink to={`/adminDash/HRM`}>
                    <span className="hrFirDs">Leave Management</span>
                  </NavLink>
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  <span className="thml">Mark Attendance</span>
                </div>
              </div>


              <div className="marSecond">
                <div className="mAdSlE">
                  <p className="tText">Type</p>
                  <label htmlFor="monthly">
                    <input
                      type="radio"
                      id="monthly"
                      value="monthly"
                      checked={selectedOption === "monthly"}
                      onChange={handleOptionChange}
                    />
                    <span>Monthly</span>
                  </label>

                  <label htmlFor="daily">
                    <input
                      type="radio"
                      id="daily"
                      value="daily"
                      checked={selectedOption === "daily"}
                      onChange={handleOptionChange}
                    />
                    <span>Daily</span>
                  </label>
                </div>

                <div className="maDSrIGH">
                  {selectedOption === "daily" && (
                    <>
                      <div name="" id="">
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={date}
                          onChange={(e) => { setDate(e.target.value) }}
                          className="daate_mate_btn"
                        />
                      </div>

                      <select onChange={(e) => { setDepartment(e.target.value); }}>
                        <option value="">Select Department</option>
                        <option value="">All</option>
                        {departments?.map((e, index) => {
                          return (
                            <option value={e?._id} key={index}>{e?.name}</option>
                          );
                        })}
                      </select>

                      <div className="resSeBtn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer"
                          onClick={handleSubmit}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer"
                          onClick={handleDownload}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer"
                          onClick={handleShare}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                          />
                        </svg>
                      </div>
                    </>
                  )}
                  {selectedOption === "monthly" && (
                    <>
                      {/* <h2>Monthly</h2> */}
                      <div>
                        <input
                          type="month"
                          name="month"
                          id="month"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                          className="daate_mate_btn"
                        />
                      </div>

                      {/* <select name="" id="">
                        <option value="Select Branch">Select Branch</option>
                      </select> */}

                      <select value={userId} onChange={(e) => { setuserId(e.target.value); }}>
                        <option value="Select Employee"> Select Employee </option>
                        {users?.map((e, index) => {
                          return (
                            <option key={index} value={e._id}> {e?.fullName} </option>
                          );
                        })}
                      </select>

                      <div>
                        <input
                          id="all"
                          type="radio"
                          name="all"
                          value="all"
                          checked={selectedOption === "all"}
                          onChange={handleOptionChange}
                        />
                        All
                      </div>

                      {/* <select name="" id="">
                        <option value="Select Branch"> All </option>
                      </select> */}

                      <div className="resSeBtn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                          onClick={handleSubmit}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                          onClick={handleDownload}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                          onClick={handleShare}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                          />
                        </svg>
                      </div>
                    </>
                  )}

                  {selectedOption === "all" && (
                    <>
                      <select value={userId} onChange={(e) => { setuserId(e.target.value); }}>
                        <option value=""> Select Employee </option>
                        {users?.map((e, index) => {
                          return (
                            <option key={index} value={e._id}> {e?.fullName} </option>
                          );
                        })}
                      </select>

                      <div>
                        <input
                          id="all"
                          type="radio"
                          name="all"
                          value="all"
                          checked={selectedOption === "all"}
                          onChange={handleOptionChange}
                        />{" "}
                        All
                      </div>

                      <div className="resSeBtn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                          onClick={handleSubmit}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                          onClick={handleDownload}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                          onClick={handleShare}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                          />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <main className="MarkAtMain">

                <div className="marknav">
                  <div className="marNavLef">
                    <select name="" id="">
                      <option value="">10</option>
                    </select>

                    <span>entries per page</span>
                  </div>

                </div>

                {/* this is do shwo all empplye  */}
                {selectedOption === "daily" && (
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 currentText">
                            Employee
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Department
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            clock In
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            clock out
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Break
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Overtime
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index} className="bg-white ">
                            <td className="px-6 py-4 itemANs">
                              {item?.user?.fullName}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {item?.user?.department}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {
                                new Date(item.Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </td>
                            <td className="px-6 py-4 itemANs">{Number(item.clockIn) === 0 ? "Absent" : Number(item.clockIn) > 21600 ? 'Present' : 'Half Day'}</td>

                            <td className="px-6 py-4 itemANs">
                              {item?.clockIn}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {item?.clockOut}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {/* {Number(item.clockOut) !== 0
                                ? `${Math.floor(item.late / 3600)
                                  .toString()
                                  .padStart(2, "0")}:${Math.floor(
                                    (item.late % 3600) / 60
                                  )
                                    .toString()
                                    .padStart(2, "0")}:${Math.floor(
                                      item.late % 60
                                    )
                                      .toString()
                                      .padStart(2, "0")}`
                                : " - "} */}
                              {item?.breakTime ? item?.breakTime : "No break"}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {Number(item.clockOut) !== 0
                                ? `${Math.floor(item.overtime / 3600)
                                  .toString()
                                  .padStart(2, "0")}:${Math.floor(
                                    (item.overtime % 3600) / 60
                                  )
                                    .toString()
                                    .padStart(2, "0")}:${Math.floor(
                                      item.overtime % 60
                                    )
                                      .toString()
                                      .padStart(2, "0")}`
                                : " - "}
                            </td>
                            <td className="px-6 py-4 ">
                              <img src={moreVert} alt="" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {selectedOption === "monthly" && (
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 currentText">
                            Employee Name
                          </th>
                          {/* <th scope="col" className="px-6 py-3 currentText">
                           Branch
                          </th> */}
                          <th scope="col" className="px-6 py-3 currentText">
                            Department
                          </th>

                          <th scope="col" className="px-6 py-3 currentText">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            clock In
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            clock out
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Break
                          </th>
                          {/* <th scope="col" className="px-6 py-3 currentText">
                            Total Time
                          </th> */}
                          <th scope="col" className="px-6 py-3 currentText">
                            OverTime
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {data?.map((item, index) => (
                          <tr key={index} className="bg-white ">
                            <td className="px-6 py-4 itemANs">
                              {item?.user?.fullName}
                            </td>

                            <td className="px-6 py-4 itemANs">
                              {item?.user?.department}
                            </td>

                            <td className="px-6 py-4 itemANs">
                              {/* {new Date(Number(item?.date)).toLocaleDateString(
                                "en-GB"
                              )} */}
                              {
                                new Date(item.Date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </td>

                            <td className="px-6 py-4 itemANs">
                              {Number(item.clockIn) === 0 ? "Absent" : Number(item.clockIn) > 21600 ? 'Present' : 'Half Day'}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {/* {Number(item.clockIn) === 0 ? ' - ' : new Date(
                                Number(item.clockIn)
                              ).toLocaleTimeString("en-GB")} */}
                              {item?.clockIn}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {/* {Number(item.clockOut) !== 0
                                ? new Date(
                                  Number(item.clockOut)
                                ).toLocaleTimeString("en-GB")
                                : " - "} */}
                              {item?.clockOut}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {/* {Number(item.clockOut) !== 0
                                ? `${Math.floor(item.late / 3600)
                                  .toString()
                                  .padStart(2, "0")}:${Math.floor(
                                    (item.late % 3600) / 60
                                  )
                                    .toString()
                                    .padStart(2, "0")}:${Math.floor(
                                      item.late % 60
                                    )
                                      .toString()
                                      .padStart(2, "0")}`
                                : " - "} */}
                                 {item?.breakTime ? item?.breakTime : "No break"}
                            
                            </td>
                            {/* <td className="px-6 py-4 itemANs">
                              {Number(item.total) !== 0
                                ? `${Math.floor(item.total / 3600)
                                  .toString()
                                  .padStart(2, "0")}:${Math.floor(
                                    (item.total % 3600) / 60
                                  )
                                    .toString()
                                    .padStart(2, "0")}:${Math.floor(
                                      item.total % 60
                                    )
                                      .toString()
                                      .padStart(2, "0")}`
                                : " - "}
                                
                            </td> */}
                            <td className="px-6 py-4 itemANs">
                              {Number(item.clockOut) !== 0
                                ? `${Math.floor(item.overtime / 3600)
                                  .toString()
                                  .padStart(2, "0")}:${Math.floor(
                                    (item.overtime % 3600) / 60
                                  )
                                    .toString()
                                    .padStart(2, "0")}:${Math.floor(
                                      item.overtime % 60
                                    )
                                      .toString()
                                      .padStart(2, "0")}`
                                : " - "}
                            </td>
                            <td className="px-6 py-4 ">
                              <img src={moreVert} alt="" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {selectedOption === "all" && (
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 currentText">
                            Employee
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Branch
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Department
                          </th>

                          <th scope="col" className="px-6 py-3 currentText">
                            Designation
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Total working days
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Present
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            Absent
                          </th>
                          <th scope="col" className="px-6 py-3 currentText">
                            action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {data1 && Object.keys(data1).length > 0 && Object.keys(data1).map((item, index) => (
                          <tr key={index} className="bg-white ">
                            <td className="px-6 py-4 itemANs">
                              {data1[item]?.user?.fullName}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {''}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {data1[item]?.user?.department}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {data1[item]?.user?.designation}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {data1[item]?.workingDays}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {data1[item]?.presentCount}
                            </td>
                            <td className="px-6 py-4 itemANs">
                              {data1[item]?.absentCount}
                            </td>

                            <td className="px-6 py-4 ">
                              <img src={moreVert} alt="" />
                            </td>
                          </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>
                )}

              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkAttendance;
