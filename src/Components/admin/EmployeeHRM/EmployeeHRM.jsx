import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import chevron from "../../images/chevron_right.png";
import ac1 from "../../images/ac1.png";
import ac2 from "../../images/ac2.png";
import ac3 from "../../images/ac3.png";
import ac4 from "../../images/ac4.png";
import timer from "../../images/timer.png";
import MagnifyingGlass from "../../images/MagnifyingGlass.png"
import calendarMonth from "../../images/calendar_month.png"
import "./hrm.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

var tc3;
var tc4;

const EmployeeHRM = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {
  const { user, getUsers, getActiveUsersCount, postActivity, getTotalLeavesCount, fetchAnnoucement, getHoliday } = useMain();

  const [counts, setCounts] = useState({
    activeEmployees: 0,
    leaveRequest: 0,
    employeesLeaves: 0,
    totalEmployees: 0
  });
  const [loadFlag, setLoadFlag] = useState(true);

  const [totalLeave, setTotalLeave] = useState(0);

  const [announce, setAnnounce] = useState([]);

  const [holiday, setHoliday] = useState([]);


  const getData = async () => {
    setLoadFlag(true);
    const ans = await getUsers();
    const ans1 = await getActiveUsersCount();

    const ans2 = await getTotalLeavesCount();
    setTotalLeave(ans2.totalLeave);

    // console.log(ans1);
    setCounts({
      ...counts, totalEmployees: ans.data.length, activeEmployees: ans1.data
    });
    setLoadFlag(false);
    console.log(counts)
    // console.log(counts);
    // console.log(ans1);
  };

  var [clock, setClock] = useState(0);
  var [breakClock, setBreakClock] = useState(0);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleVisibilityChange = () => {
    if (!document.hidden) {
      initializeTimer();
    }
  };

  useEffect(() => {
    initializeTimer();
  }, []);

  const initializeTimer = () => {
    let t = localStorage.getItem('clock-in');
    let t1 = localStorage.getItem('clock-status');
    let t2 = localStorage.getItem('break-seconds');
    clearInterval(tc3);
    clearInterval(tc4);

    if (t1) {
      if (t2) {
        setBreakClock(t2);
      }

      if (t1 !== "out") {
        let t5 = Math.floor((new Date().getTime() - t) / 1000);
        setClock(t5);

        tc4 = setInterval(() => {
          setClock(++t5);
        }, 1000);

        if (t1 === 'resume') {
          tc3 = setInterval(() => {
            setBreakClock(++t2);
          }, 1000);
        }
      }
      else {
        let t7 = localStorage.getItem('clock-out-time');
        let t5 = Math.floor((t7 - t) / 1000);
        setClock(t5);
      }
    }
  };

  const clockIn = async () => {
    let t = localStorage.getItem('clock-status');
    // console.log(t);



    if (!t) {
      let ans = await postActivity({ clockIn: localStorage.getItem('clock-in') ? localStorage.getItem("clock-in") : new Date().getTime(), clockOut: 0, late: 0, date1: new Date().toLocaleDateString('en-GB'), overtime: 0, total: 0, message: '' });

      localStorage.setItem('clock-in', new Date().getTime());
      localStorage.setItem('clock-status', 'break');
      tc4 = setInterval(() => {
        setClock(++clock);
      }, 1000);
    }
    else {
      if (t === 'break') {
        localStorage.setItem('break-time', new Date().getTime());
        localStorage.setItem('clock-status', 'resume');
        clearInterval(tc3);
        let t3 = localStorage.getItem('break-seconds');

        tc3 = setInterval(() => {
          setBreakClock(++t3);
        }, 1000);
      }
      else if (t === 'resume') {
        let t1 = localStorage.getItem('break-time');
        if (t1) {
          let t2 = localStorage.getItem('break-seconds');
          if (t2) {
            localStorage.setItem('break-seconds', Math.floor((new Date() - t1) / 1000) + Number(t2));
          }
          else {
            localStorage.setItem('break-seconds', Math.floor((new Date() - t1) / 1000));
          }
        }
        localStorage.setItem('clock-status', 'break');
        clearInterval(tc3);
      }
      else if (t === "out") {
        let ans = await postActivity({ clockIn: localStorage.getItem('clock-in'), clockOut: 0, late: 0, date1: new Date().toLocaleDateString('en-GB'), overtime: 0, total: 0, message: '' });

        localStorage.setItem('clock-in', new Date().getTime());
        localStorage.setItem('clock-status', 'break');
        localStorage.removeItem('clock-out-time');
        localStorage.removeItem('break-seconds');
        localStorage.removeItem('break-time');

        let t8 = 0;
        tc4 = setInterval(() => {
          setClock(++t8);
        }, 1000);
        // clearInterval(tc3);
        // clearInterval(tc4);
      }
    }
    setMount(!mount);
    getData();

  };

  const clockOut = async () => {
    localStorage.setItem('clock-status', 'out');
    localStorage.setItem('clock-out-time', new Date().getTime());
    clearInterval(tc3);
    clearInterval(tc4);
    setMount(!mount);

    let ans = await postActivity({ clockIn: localStorage.getItem('clock-in'), clockOut: localStorage.getItem('clock-out-time'), late: breakClock, date1: new Date().toLocaleDateString('en-GB'), overtime: (((clock) - (32400)) > 0 ? ((clock) - 32400) : 0), total: clock, message: '' });

    localStorage.removeItem("clock-in");
    localStorage.removeItem("clock-status");
    localStorage.removeItem("clock-out-time");
    setClock(0);

    getData();
  };

  useEffect(() => {
    getData();

  }, []);

  const getAnnoucement = async () => {
    const ans = await fetchAnnoucement();
    setAnnounce(ans?.data);
  }

  const getHolidays = async () => {
    const ans = await getHoliday();
    setHoliday(ans?.data);
  }

  useEffect(() => {
    getAnnoucement();
    getHolidays();
  }, []);



  return (
    <>
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

          {loadFlag ? 'Loading ..' : <div className="em">
            <div className="flex-col">
              <div className="hrmDasTxtFir">
                <p className="hrmHed">Dashboard</p>
                <div className="hrDsPa">
                  <p className="hrFirDs">Dashboard</p>
                  <span>
                    <img src={chevron} alt="" />
                  </span>
                  <span className="html">HRM</span>
                </div>
              </div>

              <main className="attend-ctiveWrap">
                {/* left side */}
                <div className="hrmActLeft">

                  {/* first  */}
                  <div className="hrLefFir">
                    <NavLink to={`/adminDash/HRM/activeEmployee`}>
                      <div className="sinActDat">
                        <img className="firImg" src={ac1} alt="" />

                        <div className="titWrap">
                          <p className="t1">{'Active'}</p>
                          <p className="t2">{'Employees'}</p>
                        </div>

                        <p className="hrmlRNu">{counts?.activeEmployees}</p>
                      </div>
                    </NavLink>

                    <NavLink to={`/adminDash/HRM/leaveRequest`}>
                      <div className="sinActDat">
                        <img className="firImg" src={ac2} alt="" />

                        <div className="titWrap">
                          <p className="t1">{'Leave'}</p>
                          <p className="t2">{'Requests'}</p>
                        </div>

                        <p className="hrmlRNu">{totalLeave}</p>
                      </div>
                    </NavLink>

                    <NavLink to={`/adminDash/HRM/LeaveEmployee`}>
                      <div className="sinActDat">
                        <img className="firImg" src={ac3} alt="" />

                        <div className="titWrap">
                          <p className="t1">{'Employees on'}</p>
                          <p className="t2">{'Leave'}</p>
                        </div>

                        <p className="hrmlRNu">{counts?.employeesLeaves}</p>
                      </div>
                    </NavLink>

                    <NavLink to={`/adminDash/HRM/totalEmployee`}>
                      <div className="sinActDat">
                        <img className="firImg" src={ac4} alt="" />

                        <div className="titWrap">
                          <p className="t1">{'Total'}</p>
                          <p className="t2">{'Employees'}</p>
                        </div>

                        <p className="hrmlRNu">{counts?.totalEmployees}</p>
                      </div>
                    </NavLink>
                  </div>

                  {/* second  */}
                  <NavLink to="/adminDash/announcement"><div className="hrLefThi">

                    <h2>Announcement Lists</h2>

                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs uppercase textALLtITL ">
                          <tr  >
                            <th scope="col" className="px-6 py-3 taskTitl">
                              TITLE
                            </th>
                            <th scope="col" className="px-2 py-3 taskTitl">
                              START DATE
                            </th>
                            <th scope="col" className="px-6 py-3 taskTitl">
                              END DATE
                            </th>

                            <th scope="col" className="px-6 py-3 taskTitl">
                              DESCRIPTION
                            </th>

                          </tr>
                        </thead>
                        <tbody>
                          {
                            announce?.map((val, index) => {
                              return (
                                <tr key={index} className="bg-white border-b  ">
                                  <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                                    {val?.title}
                                  </th>
                                  <td className="px-2 py-4 taskAns">
                                    {val?.startDate}
                                  </td>
                                  <td className="px-6 py-4 taskAns">
                                    {val?.endDate}
                                  </td>
                                  <td className="px-6 py-4 taskAns">
                                    {val?.description}
                                  </td>

                                </tr>
                              )
                            })
                          }

                        </tbody>
                      </table>
                    </div>


                  </div></NavLink>

                  <NavLink to="/adminDash/HRM/holiday"><div className="hrLefThi">

                    <h2>Holiday Lists</h2>

                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs uppercase textALLtITL ">
                          <tr  >
                            <th scope="col" className="px-6 py-3 taskTitl">
                              OCCASION
                            </th>
                            <th scope="col" className="px-2 py-3 taskTitl">
                              START DATE
                            </th>
                            <th scope="col" className="px-6 py-3 taskTitl">
                              END DATE
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            holiday?.map((val, index) => {
                              return (
                                <tr key={index} className="bg-white border-b  ">
                                  <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                                    {val?.holidayName}
                                  </th>
                                  <td className="px-2 py-4 taskAns">
                                    {val?.startDate}
                                  </td>
                                  <td className="px-6 py-4 taskAns">
                                    {val?.endDate}
                                  </td>
                                </tr>
                              )
                            })
                          }

                        </tbody>
                      </table>
                    </div>


                  </div></NavLink>
                </div>

                {/* right side */}
                <div className="hrmActRight">


                  {/* first  */}
                  <div className="markAttWrap">
                    {/* top */}
                    <div className="markAtt">
                      <p>Mark Attandance</p>
                      <img src={timer} alt="" />
                    </div>

                    <hr />

                    <div className="myOficeWrap">
                      <p className="myOfText">My Office Time: 10:00 to 19:00</p>

                      <div className="oficTime">

                        {/* single */}
                        <div className="ofSin">
                          <div className="singlTime">
                            <p>{Math.floor(clock / 3600)}</p>
                          </div>

                          <p className="day">Hours</p>
                        </div>

                        {/* single */}
                        <div className="ofSin">
                          <div className="singlTime">
                            <p>{Math.floor((clock % 3600) / 60)}</p>
                          </div>

                          <p className="day">Minutes</p>
                        </div>

                        {/* single */}
                        <div className="ofSin">
                          <div className="singlTime">
                            <p>{clock % 60}</p>
                          </div>

                          <p className="day">Seconds</p>
                        </div>
                      </div>

                      <div className="clockINOUTBtn">
                        {(mount || !mount) && <button className="clockIN cursor-pointer" onClick={clockIn}>
                          <span>{!localStorage.getItem('clock-status') ? 'Clock In' : localStorage.getItem('clock-status') === 'break' ? 'Break' : localStorage.getItem('clock-status') === 'resume' ? 'Resume' : localStorage.getItem('clock-status') === 'out' ? 'Clock In' : null}</span>
                        </button>}

                        {(mount || !mount) && <button className="clockOUT cursor-pointer" disabled={!localStorage.getItem('clock-status') || localStorage.getItem('clock-status') === 'out'} onClick={clockOut}>
                          <span>Clock Out</span>
                        </button>}
                      </div>
                    </div>
                  </div>

                  {/* second  */}
                  <div className="timeSheetWrap">
                    <div className="tScONT">
                      <p className="time">Timesheets</p>

                      <div className="caleMagnify">
                        <img src={calendarMonth} alt="" />
                        <img src={MagnifyingGlass} alt="" />
                        <span>Search..</span>
                      </div>
                    </div>

                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs uppercase textALLtITL ">
                          <tr >
                            <th scope="col" className="px-6 py-3 taskTitl">
                              NAME
                            </th>
                            <th scope="col" className="px-6 py-3 taskTitl">
                              DATE
                            </th>
                            <th scope="col" className="px-6 py-3 taskTitl">
                              TASKS
                            </th>

                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                              Surbhi Rajwanshi
                            </th>
                            <td className="px-6 py-4 taskAns">
                              JAN 22,2024
                            </td>
                            <td className="px-6 py-4 taskAns">
                              Skimoil, Madfish
                            </td>

                          </tr>
                          <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                              Surbhi Rajwanshi
                            </th>
                            <td className="px-6 py-4 taskAns">
                              JAN 22,2024
                            </td>
                            <td className="px-6 py-4 taskAns">
                              Skimoil, Madfish
                            </td>

                          </tr>
                          <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                              Surbhi Rajwanshi
                            </th>
                            <td className="px-6 py-4 taskAns">
                              JAN 22,2024
                            </td>
                            <td className="px-6 py-4 taskAns">
                              Skimoil, Madfish
                            </td>

                          </tr>
                          <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                              Surbhi Rajwanshi
                            </th>
                            <td className="px-6 py-4 taskAns">
                              JAN 22,2024
                            </td>
                            <td className="px-6 py-4 taskAns">
                              Skimoil, Madfish
                            </td>

                          </tr>
                          <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                              Surbhi Rajwanshi
                            </th>
                            <td className="px-6 py-4 taskAns">
                              JAN 22,2024
                            </td>
                            <td className="px-6 py-4 taskAns">
                              Skimoil, Madfish
                            </td>

                          </tr>
                          <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                              Surbhi Rajwanshi
                            </th>
                            <td className="px-6 py-4 taskAns">
                              JAN 22,2024
                            </td>
                            <td className="px-6 py-4 taskAns">
                              Skimoil, Madfish
                            </td>

                          </tr>
                          <tr className="bg-white border-b  ">
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap taskAns ">
                              Surbhi Rajwanshi
                            </th>
                            <td className="px-6 py-4 taskAns">
                              JAN 22,2024
                            </td>
                            <td className="px-6 py-4 taskAns">
                              Skimoil, Madfish
                            </td>

                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
};

export default EmployeeHRM;
