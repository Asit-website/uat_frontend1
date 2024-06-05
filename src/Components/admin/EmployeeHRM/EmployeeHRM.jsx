import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import ac1 from "../../images/ac1.png";
import ac2 from "../../images/ac2.png";
import ac3 from "../../images/ac3.png";
import ac4 from "../../images/ac4.png";
import clock2 from '../../images/clock2.png';
import timeLog from '../../images/timeLog.png';
import "./hrm.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import refresh from "../../images/bx-refresh.png"
import annouce from "../../images/annouce.png"
import holi from "../../images/holid.png"
import taskA from "../../images/taskAs.png"
import sites from '../../images/sites.svg';
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
  const { user, getUsers, getActiveUsersCount, postActivity, getTotalLeavesCount, fetchAnnoucement, getHoliday, postAttendence } = useMain();

  const user2 = JSON.parse(localStorage.getItem("hrms_user"));

  const [counts, setCounts] = useState({
    activeEmployees: 0,
    leaveRequest: 0,
    employeesLeaves: 0,
    totalEmployees: 0
  });

  const [loadFlag, setLoadFlag] = useState(true);

  const [loading , setLoading] = useState(false);
  const [clockoutLoading , setClockOutLoading] = useState(false);

  const [totalLeave, setTotalLeave] = useState(0);

  const [announce, setAnnounce] = useState([]);

  const [holiday, setHoliday] = useState([]);

  const [task, setTask] = useState([
    {
      name: "Chirag",
      assignDate: "31/05/2023",
      endDate: "31/05/2023",
      task: "Madfish"
    },
    {
      name: "Chirag",
      assignDate: "31/05/2023",
      endDate: "31/05/2023",
      task: "Madfish"
    },
    {
      name: "Chirag",
      assignDate: "31/05/2023",
      endDate: "31/05/2023",
      task: "Madfish"
    },
    {
      name: "Chirag",
      assignDate: "31/05/2023",
      endDate: "31/05/2023",
      task: "Madfish"
    },
  ])

  const getData = async () => {
    setLoadFlag(true);
    const ans = await getUsers();
    const ans1 = await getActiveUsersCount();

    const ans2 = await getTotalLeavesCount();
    setTotalLeave(ans2.totalLeave);

    setCounts({
      ...counts, totalEmployees: ans.data.length, activeEmployees: ans1.data
    });
    setLoadFlag(false);

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

    setLoading(true);

    let t = localStorage.getItem("clock-status");

    localStorage.setItem("date1", new Date().toLocaleDateString("en-GB"));


    if (!t) {
       localStorage.setItem('clockInTime', new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));

      let ans = await postActivity({
        clockIn: localStorage.getItem("clock-in") ? localStorage.getItem("clock-in") : new Date().getTime(),
        clockOut: 0,
        late: 0,
        date1: localStorage.getItem("date1"),
        overtime: 0,
        total: 0,
        message: "",
      });

      localStorage.setItem("clock-in", new Date().getTime());
      localStorage.setItem("clock-status", "break");

     
      let currentDate = new Date().toLocaleDateString("en-GB");
      localStorage.setItem("clock-in-date", currentDate);


      tc4 = setInterval(() => {
        setClock(++clock);
      }, 1000);
    } else {
      if (t === "break") {

        localStorage.setItem('breakInTime', new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));

        localStorage.setItem("break-time", new Date().getTime());
        localStorage.setItem("clock-status", "resume");

    
        let t3 = localStorage.getItem("break-seconds");

        tc3 = setInterval(() => {
          setBreakClock(++t3);
        }, 1000);
      } else if (t === "resume") {

        localStorage.setItem('breakOutTime', new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));

        let t1 = localStorage.getItem("break-time");
        if (t1) {
          let t2 = localStorage.getItem("break-seconds");
          if (t2) {
            localStorage.setItem(
              "break-seconds",
              Math.floor((new Date() - t1) / 1000) + Number(t2)
            );
          } else {
            localStorage.setItem(
              "break-seconds",
              Math.floor((new Date() - t1) / 1000)
            );
          }
        }
        localStorage.setItem("clock-status", "break");
        clearInterval(tc3);
      } else if (t === "out") {
        let ans = await postActivity({
          clockIn: localStorage.getItem("clock-in"),
          clockOut: 0,
          late: 0,
          date1: new Date().toLocaleDateString("en-GB"),
          overtime: 0,
          total: 0,
          message: "",
        });

        // localStorage.setItem("clock-in", new Date().getTime());
        localStorage.setItem("clock-status", "break");
        localStorage.removeItem("clock-out-time");
        localStorage.removeItem("break-seconds");
        localStorage.removeItem("break-time");

        let t8 = 0;
        tc4 = setInterval(() => {
          setClock(++t8);
        }, 1000);

      }
    }
    setMount(!mount);
    setLoading(false);
  };

  
  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes, seconds] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return new Date(`${new Date().toDateString()} ${hours}:${minutes}:${seconds}`);
  };


  const clockOut = async () => {

    setClockOutLoading(true);

    localStorage.setItem("clock-status", "out");
    localStorage.setItem("clock-out-time", new Date().getTime());
    localStorage.setItem('clockOutTime', new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));

    clearInterval(tc3);
    clearInterval(tc4);
    setMount(!mount);
    setClock(0);

    const breakIn = localStorage.getItem("breakInTime");
    const breakOut = localStorage.getItem("breakOutTime");

  // Convert breakIn and breakOut to Date objects
const date1 = parseTime(breakIn);
const date2 = parseTime(breakOut);

const differenceMs = date2.getTime() - date1.getTime();

// Convert the difference to a readable format
const hours = Math.floor(differenceMs / (1000 * 60 * 60));
const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((differenceMs % (1000 * 60)) / 1000);

const differenceText = `${hours}:${minutes}:${seconds}`;

   

    let ans = await postActivity({
      clockIn: localStorage.getItem("clock-in"),
      clockOut: localStorage.getItem("clock-out-time"),
      late: breakClock,
      date1: localStorage.getItem("date1"),
      overtime: clock - 32400 > 0 ? clock - 32400 : 0,
      total: clock,
      message: "",
    });

    const userDataString = localStorage.getItem("hrms_user");

    const userData = JSON.parse(userDataString);

    const clockInDate = localStorage.getItem('clock-in-date');

    const attendence = await postAttendence({
      clockInDetail: localStorage.getItem("clockInTime"), breakTime: differenceText, clockOutDetail: localStorage.getItem("clockOutTime"),
      id: userData?._id,
      clockInDate: clockInDate
    });

    localStorage.removeItem("clock-in");
    localStorage.removeItem("clock-status");
    localStorage.removeItem("clock-out-time");
    localStorage.removeItem("clockOutTime");
    localStorage.removeItem("clockInTime");
    localStorage.removeItem("breakInTime");
    localStorage.removeItem("breakOutTime");
    localStorage.removeItem("clock-in-date");
    localStorage.removeItem("break-time");
    localStorage.removeItem("break-seconds");
    localStorage.removeItem("date1");


    setClockOutLoading(false);

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

          {loadFlag ? 'Loading ..'
            :
            <div className="em emm">

              <div className="flex-col">

                <div className="firstD">

                  {/* left side */}
                  <div className="dFirLef">
                    <h2>Hi {user2?.fullName}</h2>
                    <p>Real-time insights and performance overview</p>
                  </div>

                  {/* right side  */}
                  <button onClick={() => {
                    window.location.href = "/adminDash/HRM";
                  }} className="refreBtn">Refresh <span><img src={refresh} alt="" /></span></button>

                </div>


                {/* second boxes  */}
                <div className="hrLefFir">

                  <NavLink className="skm" to={`/adminDash/HRM/activeEmployee`}>
                    <div className="sinActDat colorChange1 ">

                      <img className="firImg" src={ac1} alt="" />

                      <div className="titWrap">
                        <h3>Active Employee</h3>
                        <p className="hrmlRNu">{counts?.activeEmployees}</p>
                      </div>

                    </div>
                  </NavLink>

                  <NavLink className="skm" to={`/adminDash/HRM/leaveRequest`}>
                    <div className="sinActDat colorChange2">
                      <img className="firImg" src={ac2} alt="" />

                      <div className="titWrap">
                        <h3>Leave Request</h3>
                        <p className="hrmlRNu">{totalLeave}</p>

                      </div>

                    </div>
                  </NavLink>

                  <NavLink className="skm" to={`/adminDash/HRM/LeaveEmployee`}>
                    <div className="sinActDat colorChange3">
                      <img className="firImg" src={ac3} alt="" />

                      <div className="titWrap">
                        <h3>Employee on Leave</h3>

                        <p className="hrmlRNu">{counts?.employeesLeaves}</p>
                      </div>

                    </div>
                  </NavLink>

                  <NavLink className="skm" to={`/adminDash/HRM/totalEmployee`}>
                    <div className="sinActDat colorChange4">
                      <img className="firImg" src={ac4} alt="" />

                      <div className="titWrap">
                        <h3>Total Employee</h3>

                        <p className="hrmlRNu">{counts?.totalEmployees}</p>
                      </div>

                    </div>
                  </NavLink>

                </div>


                <main className="attend-ctiveWrap">

                  {/* left side */}
                  <div className="hrmActLeft">

                    {/* second  */}
                    <NavLink to="/adminDash/announcement"><div className="hrLefThi">

                      <h2 className="headind"> <img src={annouce} alt="" /> <span>Announcement Lists</span></h2>

                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs uppercase textALLtITL ">
                            <tr  >
                              <th scope="col" className="px-3  py-3 taskTitl">
                                TITLE
                              </th>
                              <th scope="col" className="px-3  py-3 taskTitl">
                                START DATE
                              </th>
                              <th scope="col" className="px-3 py-3 taskTitl">
                                END DATE
                              </th>

                              <th scope="col" className="px-3 py-3 taskTitl">
                                DESCRIPTION
                              </th>

                            </tr>
                          </thead>
                          <tbody>
                            {
                              announce?.map((val, index) => {
                                return (
                                  <tr key={index} className="bg-white border-b  ">
                                    <th scope="row" className="px-3 py-4 font-medium tasklo  whitespace-nowrap taskAns taskans11">
                                      {val?.title}
                                    </th>
                                    <td className="px-3 py-4 taskAns lolo taskans11">
                                      {val?.startDate}
                                    </td>
                                    <td className="px-3 py-4 taskAns lolo taskans11">
                                      {val?.endDate}
                                    </td>
                                    <td className="px-3 py-4 taskAns taskans11">
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

                    {/* third  */}
                    <NavLink to="/adminDash/announcement"><div className="hrLefThi">

                      <h2 className="headind"> <img src={taskA} alt="" /> <span>Task Assign</span></h2>

                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs uppercase textALLtITL ">
                            <tr  >
                              <th scope="col" className="px-2  py-3 taskTitl">
                                Name
                              </th>
                              <th scope="col" className="px-3  py-3 taskTitl">
                                Assign Date
                              </th>
                              <th scope="col" className="px-3 py-3 taskTitl">
                                END DATE
                              </th>

                              <th scope="col" className="px-3 py-3 taskTitl">
                                Tasks
                              </th>

                            </tr>
                          </thead>
                          <tbody>
                            {
                              task?.map((val, index) => {
                                return (
                                  <tr key={index} className="bg-white border-b  ">
                                    <th scope="row" className="px-2 py-4 font-medium tasklo whitespace-nowrap taskAns ">
                                      {val?.name}
                                    </th>
                                    <td className="px-2 py-4 taskAns">
                                      {val?.assignDate}
                                    </td>
                                    <td className="px-2 py-4 taskAns">
                                      {val?.endDate}
                                    </td>
                                    <td className="px-2 py-4 taskAns">
                                      {val?.task}
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
                        <img src={sites} alt="" />
                        <p>Mark Attandance</p>
                      </div>

                      <hr />

                      <div className="myOficeWrap">
                        {/* <p className="myOfText">My Office Time: 10:00 to 19:00</p> */}

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
                          <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.5 1.5V0H12.5V1.5H6.5ZM8.75 12.675H10.25V6.925H8.75V12.675ZM9.5 20.975C8.26667 20.975 7.10417 20.7375 6.0125 20.2625C4.92083 19.7875 3.96667 19.1417 3.15 18.325C2.33333 17.5083 1.6875 16.5542 1.2125 15.4625C0.7375 14.3708 0.5 13.2083 0.5 11.975C0.5 10.7417 0.7375 9.57917 1.2125 8.4875C1.6875 7.39583 2.33333 6.44167 3.15 5.625C3.96667 4.80833 4.92083 4.1625 6.0125 3.6875C7.10417 3.2125 8.26667 2.975 9.5 2.975C10.6167 2.975 11.6667 3.1625 12.65 3.5375C13.6333 3.9125 14.5083 4.43333 15.275 5.1L16.55 3.825L17.6 4.875L16.325 6.15C16.925 6.81667 17.4375 7.625 17.8625 8.575C18.2875 9.525 18.5 10.6583 18.5 11.975C18.5 13.2083 18.2625 14.3708 17.7875 15.4625C17.3125 16.5542 16.6667 17.5083 15.85 18.325C15.0333 19.1417 14.0792 19.7875 12.9875 20.2625C11.8958 20.7375 10.7333 20.975 9.5 20.975ZM9.5 19.475C11.5833 19.475 13.3542 18.7458 14.8125 17.2875C16.2708 15.8292 17 14.0583 17 11.975C17 9.89167 16.2708 8.12083 14.8125 6.6625C13.3542 5.20417 11.5833 4.475 9.5 4.475C7.41667 4.475 5.64583 5.20417 4.1875 6.6625C2.72917 8.12083 2 9.89167 2 11.975C2 14.0583 2.72917 15.8292 4.1875 17.2875C5.64583 18.7458 7.41667 19.475 9.5 19.475Z" fill="white" />
                            </svg>
                            {
                              loading ?
                              <span class="loader"></span>
                              :
                            <span>{!localStorage.getItem('clock-status') ? 'Check-in' : localStorage.getItem('clock-status') === 'break' ? 'Break' : localStorage.getItem('clock-status') === 'resume' ? 'Resume' : localStorage.getItem('clock-status') === 'out' ? 'Check-in' : null}</span>

                            }
                          </button>}

                          {(mount || !mount) && <button className="clockOUT cursor-pointer" disabled={!localStorage.getItem('clock-status') || localStorage.getItem('clock-status') === 'out'} onClick={clockOut}>
                          <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.5 1.5V0H12.5V1.5H6.5ZM8.75 12.675H10.25V6.925H8.75V12.675ZM9.5 20.975C8.26667 20.975 7.10417 20.7375 6.0125 20.2625C4.92083 19.7875 3.96667 19.1417 3.15 18.325C2.33333 17.5083 1.6875 16.5542 1.2125 15.4625C0.7375 14.3708 0.5 13.2083 0.5 11.975C0.5 10.7417 0.7375 9.57917 1.2125 8.4875C1.6875 7.39583 2.33333 6.44167 3.15 5.625C3.96667 4.80833 4.92083 4.1625 6.0125 3.6875C7.10417 3.2125 8.26667 2.975 9.5 2.975C10.6167 2.975 11.6667 3.1625 12.65 3.5375C13.6333 3.9125 14.5083 4.43333 15.275 5.1L16.55 3.825L17.6 4.875L16.325 6.15C16.925 6.81667 17.4375 7.625 17.8625 8.575C18.2875 9.525 18.5 10.6583 18.5 11.975C18.5 13.2083 18.2625 14.3708 17.7875 15.4625C17.3125 16.5542 16.6667 17.5083 15.85 18.325C15.0333 19.1417 14.0792 19.7875 12.9875 20.2625C11.8958 20.7375 10.7333 20.975 9.5 20.975ZM9.5 19.475C11.5833 19.475 13.3542 18.7458 14.8125 17.2875C16.2708 15.8292 17 14.0583 17 11.975C17 9.89167 16.2708 8.12083 14.8125 6.6625C13.3542 5.20417 11.5833 4.475 9.5 4.475C7.41667 4.475 5.64583 5.20417 4.1875 6.6625C2.72917 8.12083 2 9.89167 2 11.975C2 14.0583 2.72917 15.8292 4.1875 17.2875C5.64583 18.7458 7.41667 19.475 9.5 19.475Z" fill="white" />
                            </svg>
                            {
                              clockoutLoading?
                              <span class="loader2"></span>:
                            <span>Check-out</span>
                            }
                          </button>}
                        </div>
                      </div>
                    </div>

                    <div>
                        <a
                          href="#"
                          className="block serad max-w-2xl p-5 bg-white border timeWrap border-gray-200 rounded-lg shadow hover:bg-gray-100   "
                        >

                           <div className="timeLogWrap">
                            <img src={timeLog} alt="" />
                      <h5 className="mb-3 text-xl  text-gray-900 dark:text-white">   Time Log </h5>
                           </div>

                          <hr />

                          <h5 className="todayText">
                            Today
                          </h5>

                          <hr />

                          <div className="time_emp_desh_flex">

                            <div className="time_emp_desh">
                              <h5 className="mb-1 mt-3 text-xl  tracking-tight text-gray-900 -">{`${Math.floor(
                                clock / 3600
                              )
                                .toString()
                                .padStart(2, "0")}:${Math.floor(
                                (clock % 3600) / 60
                              )
                                .toString()
                                .padStart(2, "0")}`}</h5>
                              <p>Scheduled</p>
                            </div>

                            <div className="time_emp_desh">
                              <h5 className="mb-1 mt-3 text-xl  tracking-tight text-gray-900 ">{`${Math.floor(
                                (clock - breakClock) / 3600
                              )
                                .toString()
                                .padStart(2, "0")}:${Math.floor(
                                ((clock - breakClock) % 3600) / 60
                              )
                                .toString()
                                .padStart(2, "0")}`}</h5>
                              <p>Worked</p>
                            </div>

                            <div className="time_emp_desh">
                              <h5 className="mb-1 mt-3 text-xl  tracking-tight text-gray-900 ">{`${Math.floor(
                                breakClock / 3600
                              )
                                .toString()
                                .padStart(2, "0")}:${Math.floor(
                                (breakClock % 3600) / 60
                              )
                                .toString()
                                .padStart(2, "0")}`}</h5>
                              <p>Break</p>
                            </div>

                            <div className="time_emp_desh">
                              <h5 className="mb-1 mt-3 text-xl  tracking-tight text-gray-900 ">{`${Math.floor(
                                (32400 - clock) / 3600
                              )
                                .toString()
                                .padStart(2, "0")}:${Math.floor(
                                ((32400 - clock) % 3600) / 60
                              )
                                .toString()
                                .padStart(2, "0")}`}</h5>
                              <p>balance</p>
                            </div>
                          </div>

                          <hr />

                          <h5 className="thisMonText">
                            This month
                          </h5>

                          <hr />

                          <div className="time_emp_desh_flex2">
                            
                              <img src={clock2} alt="" />

                            <div className="time_emp_desh">
                              <h6 className="timeEmptext">
                                168 hrs
                              </h6>
                              {/* <p>{`${Math.floor((32400 - clock) / 3600)
                                .toString()
                                .padStart(2, "0")}:${Math.floor(
                                ((32400 - clock) % 3600) / 60
                              )
                                .toString()
                                .padStart(2, "0")}`}</p> */}
                            </div>
                            
                          </div>
                        </a>
                      </div>

                    {/* second  */}

                    <NavLink to="/adminDash/HRM/holiday"><div className="hrLefThi">

                      <h2 className="holiHead"> <img src={holi} alt="" /> <span>Holiday Lists</span></h2>

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
                                    <th scope="row" className="px-6 py-4 font-medium tasklo whitespace-nowrap taskAns ">
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


                    </div>
                    </NavLink>
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


// THIS IS THE PREVIOUS CODE FOR TIMESHEET ACCORDING TO PREVIOUS FIGMA FILE 

{/* <div className="timeSheetWrap">
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
                  </div> */}
