import React, { useState, useEffect } from "react";
import EmployeeNavbar from "../Navbar/EmployeeNavbar";
import EmployeeSidebar from "../Sidebar/EmployeeSidebar";
import punjabi from "../../images/punjabi.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import goals from "../../images/goals.png";
import arrow from "../../images/arrow.png";
import { NavLink } from "react-router-dom";
import timer1 from "../../images/timer.png";

var tc;
var tc2;
var tc3;
var tc4;

const EmployeeDash = ({ setAlert, pop1, setPop1 }) => {
  // =================punch in punch out concept==========
  const { user, postActivity, getStatisticsByUser, postLeave, getLeaveTypes, postNotification, postAttendence } = useMain();

  const [startTs, setStartTs] = useState("");
  var [percentageDone, setPercentageDone] = useState(0);

  var [timer, setTimer] = useState(0);

  var [month, setMonth] = useState(0);

  var [progressTimer, setProgressTimer] = useState(0);

  var [breakTimer, setBreakTimer] = useState(0);

  var [overTimeTimer, setOverTimeTimer] = useState(0);

  const [punchLog, setPunchLog] = useState({});
  const [punchFlag, setPunchFlag] = useState(false);
  const [statistics, setStatistics] = useState([]);

  // =================Popup==============
  const [open, setOpen] = useState(0);
  const [popup1, setPopup1] = useState(false);

  // ==============other===========================
  const [value, onChange] = useState(new Date());
  const [gen, setGen] = useState([]);
  const [flag, setFlag] = useState();

  const getStatistics = async () => {
    const ans = await getStatisticsByUser();
    // console.log(ans);
    setStatistics(ans.data);
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const punchBtn = async (e) => {
    if (e.target.innerText === "Punch In") {
      e.target.innerText = "Punch Out";
      clearInterval(tc2);

      if (startTs === "") {
        setStartTs(new Date().getTime());
      }

      tc = setInterval(() => {
        if (progressTimer === 480) {
          setOverTimeTimer(++overTimeTimer);
        } else {
          setTimer(++timer);
          setProgressTimer(++progressTimer);
          setPercentageDone((progressTimer / 480) * 100);
        }
      }, 60 * 1000);
      // }, 5 * 1000);

      let status = "ONLINE";
      let date = `${new Date().getDate()}/${new Date().getMonth() + 1
        }/${new Date().getFullYear()}`;
      // console.log(date);
      let activity = {
        type: "PUNCH_IN",
        ts: new Date().getTime(),
      };

      let tempActivity = localStorage.getItem("tempActivity");
      if (tempActivity) {
        tempActivity = JSON.parse(tempActivity);
        if (!tempActivity[new Date().getDate()]) {
          // new day
          localStorage.removeItem("tempActivity");
          tempActivity = { [new Date().getDate()]: [] };
        }
      } else {
        tempActivity = { [new Date().getDate()]: [] };
      }

      tempActivity[new Date().getDate()].push(activity);
      localStorage.setItem("tempActivity", JSON.stringify(tempActivity));

      setPunchFlag(!punchFlag);

      const ans = await postActivity({
        date,
        activity,
        breaks: breakTimer,
        overtime: overTimeTimer,
        hours: timer,
        status,
      });
      console.log(ans);
    } else {
      e.target.innerText = "Punch In";
      clearInterval(tc);

      tc2 = setInterval(() => {
        setBreakTimer(++breakTimer);
      }, 60 * 1000);

      let status = "OFFLINE";
      let date = `${new Date().getDate()}/${new Date().getMonth() + 1
        }/${new Date().getFullYear()}`;
      let activity = {
        type: "PUNCH_OUT",
        ts: new Date().getTime(),
      };

      let tempActivity = JSON.parse(localStorage.getItem("tempActivity"));
      if (!tempActivity[new Date().getDate()]) {
        localStorage.removeItem("tempActivity");
      } else {
        tempActivity[new Date().getDate()].push(activity);
      }
      localStorage.setItem("tempActivity", JSON.stringify(tempActivity));

      setPunchFlag(!punchFlag);

      const ans = await postActivity({
        date,
        activity,
        breaks: breakTimer,
        overtime: overTimeTimer,
        hours: timer,
        status,
      });
      console.log(ans);
    }
  };

  // ==========to get user data================
  useEffect(() => {
    // getData();
  }, []);

  // const getData = async () => { };

  var [clock, setClock] = useState(0);
  var [breakClock, setBreakClock] = useState(0);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
    let t = localStorage.getItem("clock-in");
    let t1 = localStorage.getItem("clock-status");
    let t2 = localStorage.getItem("break-seconds");
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

        if (t1 === "resume") {
          tc3 = setInterval(() => {
            setBreakClock(++t2);
          }, 1000);
        }
      } else {
        let t7 = localStorage.getItem("clock-out-time");
        let t5 = Math.floor((t7 - t) / 1000);
        setClock(t5);
      }
    }
  };

  const clockIn = async () => {

    let t = localStorage.getItem("clock-status");
    localStorage.setItem('clockInTime', new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));


    if (!t) {
      let ans = await postActivity({
        clockIn: localStorage.getItem("clock-in") ? localStorage.getItem("clock-in") : new Date().getTime(),
        clockOut: 0,
        late: 0,
        date1: new Date().toLocaleDateString("en-GB"),
        overtime: 0,
        total: 0,
        message: "",
      });

      localStorage.setItem("clock-in", new Date().getTime());
      localStorage.setItem("clock-status", "break");

      // for setting todat date 
      const today = new Date();
    const currentDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    localStorage.setItem("clock-in-date" , currentDate);
    
      localStorage.setItem('breakInTime', new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));


      tc4 = setInterval(() => {
        setClock(++clock);
      }, 1000);
    } else {
      if (t === "break") {
        localStorage.setItem("break-time", new Date().getTime());
        localStorage.setItem("clock-status", "resume");

      localStorage.setItem('breakOutTime', new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));

        let t3 = localStorage.getItem("break-seconds");

        tc3 = setInterval(() => {
          setBreakClock(++t3);
        }, 1000);
      } else if (t === "resume") {
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

        localStorage.setItem("clock-in", new Date().getTime());
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
  };

  const clockOut = async () => {
    
    localStorage.setItem("clock-status", "out");
    localStorage.setItem("clock-out-time", new Date().getTime());
    localStorage.setItem('clockOutTime', new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));

    clearInterval(tc3);
    clearInterval(tc4);
    setMount(!mount);
    setClock(0);

     const breakIn = localStorage.getItem("breakInTime");
     const breakOut = localStorage.getItem("breakOutTime");

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Construct Date objects using the current year
  const date1 = new Date(`${currentYear} 01 01 ${breakIn}`);
  const date2 = new Date(`${currentYear} 01 01 ${breakOut}`);
  
   // Calculate the difference in milliseconds
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
      date1: new Date().toLocaleDateString("en-GB"),
      overtime: clock - 32400 > 0 ? clock - 32400 : 0,
      total: clock,
      message: "",
    });

    let user = localStorage.getItem("hrms_user");
    const userDetail = JSON.parse(user);

    const id = userDetail?._id;

   const clockInDate =  localStorage.getItem('clock-in-date');

     // for setting todat date 
     const today = new Date();
     const currentDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

     // Check if the current date is the same as the clock-in date
if (clockInDate === currentDate) {
  const attendence = await postAttendence({ clockInDetail: localStorage.getItem("clockInTime"), breakTime:differenceText , clockOutDetail: localStorage.getItem("clockOutTime"), id , clockInDate:currentDate });
} else {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  let yesterdayDate, yesterdayMonth, yesterdayYear;
  
  // Check if today is the 1st day of the month
  if (today.getDate() === 1) {
      // If today is the 1st, yesterday should be the last day of the previous month
      yesterday.setDate(0); // Set to the last day of the previous month
      yesterdayDate = yesterday.getDate();
      yesterdayMonth = yesterday.getMonth() + 1; // Adding 1 because getMonth() returns 0-based index
      yesterdayYear = yesterday.getFullYear();
  } else {
      // If today is not the 1st, simply get yesterday's date, month, and year
      yesterdayDate = yesterday.getDate();
      yesterdayMonth = yesterday.getMonth() + 1; // Adding 1 because getMonth() returns 0-based index
      yesterdayYear = yesterday.getFullYear();
  }
  
  const yesterdayFormatted = `${yesterdayDate}-${yesterdayMonth}-${yesterdayYear}`;
  console.log("Yesterday's date:", yesterdayFormatted);


  const attendence = await postAttendence({ clockInDetail: localStorage.getItem("clockInTime"), breakTime:differenceText , clockOutDetail: localStorage.getItem("clockOutTime"), id , clockInDate:yesterdayFormatted });
}

    localStorage.removeItem("clock-in");
    localStorage.removeItem("clock-status");
    localStorage.removeItem("clock-out-time");
    localStorage.removeItem("clockOutTime");
    localStorage.removeItem("clockInTime");
    localStorage.removeItem("breakInTime");
    localStorage.removeItem("breakOutTime");
    localStorage.removeItem("clock-in-date");
   
  };

  const [star1, setStar1] = useState(false);

  const styleThing = {
    display: star1 ? "block" : "none",
  };

  const [formdata, setFormdata] = useState({
    employeeName: "", leaveType: "", start: "", end: "", reason: ""
  })

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  const submitHandler = async (e) => {
    e.preventDefault();

    const startDate = new Date(formdata.start);
    const endDate = new Date(formdata.end);
    const timeDifference = Math.abs(endDate - startDate);
    const daysGap = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const ans = await postLeave({ type: formdata.leaveType, from: formdata.start, to: formdata.end, days: daysGap, reason: formdata.reason });

    const notify = await postNotification(daysGap, formdata.employeeName);

    if (ans.success) {
      alert("Successfuly applied");
      setStar1(false);
    }
    setFormdata({
      employeeName: "",
      leaveType: "",
      start: "",
      end: "",
      reason: ""
    })
  }

  const [leaveType, setLeaveType] = useState([]);

  const fetchLeaveType = async () => {
    const resp = await getLeaveTypes();
    if (resp.success) {
      setLeaveType(resp?.data);
    }
  }

  useEffect(() => {
    fetchLeaveType();
  }, [])

  return (
    <>
      <div className="employee-dash h-full">
        <EmployeeSidebar />
        <div className="tm">
          <EmployeeNavbar
            user={user}
            setAlert={setAlert}
            postActivity={postActivity}
            getStatisticsByUser={getStatisticsByUser}
            pop1={pop1}
            setPop1={setPop1}
          />

          <div className="em">
            <div className="flex-col">
              <div className="bedge">
                <div className="first-bedge w-full ">

                  <div className="attend-ctiveWrapempp">
                    <div className="celeberation w-full">
                      <div className="cel-head">
                        <h3>Today's celebrations</h3>
                        <p>See all</p>
                      </div>
                      <div className="cel-card">

                        <div className="cel-box">
                          <div className="cel-boxing">
                            <div className="cel-boxing1">
                              <img src={punjabi} alt="" />
                            </div>

                            <div className="cel-boxing2 ml-4 mt-4">
                              <h2>Steve wills</h2>
                              <p>Assistant manager</p>
                              <button>Wish Birthday</button>
                            </div>
                          </div>

                        </div>
                        <div className="cel-box ml-5">
                          <div className="cel-boxing">
                            <div className="cel-boxing1">
                              <img src={punjabi} alt="" />
                            </div>
                            <div className="cel-boxing2 ml-4 mt-4">
                              <h2>Steve wills</h2>
                              <p>Assistant manager</p>
                              <button>Wish Birthday</button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="hrmActRight55">
                      <div className="markAttWrap55">
                        <div className="markAtt55">
                          <p>Mark Attandance</p>
                          <img src={timer1} alt="" />
                        </div>

                        <hr />

                        <div className="myOficeWrap55">
                          <p className="myOfText55">
                            My Office Time: 10:00 to 19:00
                          </p>

                          <div className="oficTime55">
                            <div className="ofSin55">
                              <div className="singlTime55">
                                <p>{Math.floor(clock / 3600)}</p>
                              </div>
                              <p className="day55">Hours</p>
                            </div>

                            <div className="ofSin55">
                              <div className="singlTime55">
                                <p>{Math.floor((clock % 3600) / 60)}</p>
                              </div>
                              <p className="day55">Minutes</p>
                            </div>

                            <div className="ofSin55">
                              <div className="singlTime55">
                                <p>{clock % 60}</p>
                              </div>

                              <p className="day55">Seconds</p>
                            </div>
                          </div>

                          <div className="clockINOUTBtn55">
                            {(mount || !mount) && (
                              <button className="clockIN55" onClick={clockIn}>
                                <span>
                                  {!localStorage.getItem("clock-status")
                                    ? "Clock In"
                                    : localStorage.getItem("clock-status") ===
                                      "break"
                                      ? "Break"
                                      : localStorage.getItem("clock-status") ===
                                        "resume"
                                        ? "Resume"
                                        : localStorage.getItem("clock-status") ===
                                          "out"
                                          ? "Clock In"
                                          : null}
                                </span>
                              </button>
                            )}

                            {(mount || !mount) && (
                              <button
                                className="clockOUT55"
                                disabled={
                                  !localStorage.getItem("clock-status") ||
                                  localStorage.getItem("clock-status") === "out"
                                }
                                onClick={clockOut}
                              >
                                <span>Clock Out</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="metting_div_surbhi">
                    <div className="second-bedge w-full ">

                      <div className="calend falend">
                        <div className="calend-head">
                          <h2>Meetings & more</h2>
                          <img src={goals} alt="goals" />
                        </div>
                        <hr />
                        <div className="cals-dent relative">
                          <NavLink to="/employeeDash/atten">
                            <img width={12} src={arrow} alt="arrow" />
                          </NavLink>
                          <Calendar onChange={onChange} value={value} />
                        </div>

                      </div>

                    </div>

                    <div >
                      <a
                        href="#"
                        className="block serad max-w-2xl p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                      >
                        <h5 className="mb-3 text-xl  tracking-tight text-gray-900 dark:text-white">
                          Time Log
                        </h5>

                        <hr />
                        <h5 className="mb-3 mt-3 text-xl  tracking-tight text-gray-900 dark:text-white">
                          Today
                        </h5>
                        <hr />

                        <div className="time_emp_desh_flex">
                          <div className="time_emp_desh">
                            <h5 className="mb-1 mt-3 text-xl  tracking-tight text-gray-900 dark:text-white">{`${Math.floor(
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
                            <h5 className="mb-1 mt-3 text-xl  tracking-tight text-gray-900 dark:text-white">{`${Math.floor(
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
                            <h5 className="mb-1 mt-3 text-xl  tracking-tight text-gray-900 dark:text-white">{`${Math.floor(
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
                            <h5 className="mb-1 mt-3 text-xl  tracking-tight text-gray-900 dark:text-white">{`${Math.floor(
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

                        <h5 className="mb-3 mt-3 text-xl  tracking-tight text-gray-900 dark:text-white">
                          This month
                        </h5>

                        <hr />

                        <div className="time_emp_desh_flex2">
                          <div className="time_emp_desh">
                            <div className="mt-5">
                              <svg
                                width="50"
                                height="50"
                                viewBox="0 0 50 50"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="50"
                                  height="50"
                                  rx="4"
                                  fill="#0B60FF"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="time_emp_desh">
                            <h5 className=" mt-5 text-xl font-bold  tracking-tight text-gray-900 dark:text-white">
                              168 h
                            </h5>
                            <p>{`${Math.floor(
                              (32400 - clock) / 3600
                            )
                              .toString()
                              .padStart(2, "0")}:${Math.floor(
                                ((32400 - clock) % 3600) / 60
                              )
                                .toString()
                                .padStart(2, "0")}`}</p>
                          </div>
                        </div>


                      </a>
                    </div>

                  </div>

                  <div className="hrLefThi22">
                    <div className="leaves_request_emp">
                      <h2>Leaves</h2>
                      <button
                        data-modal-target="authentication-modal"
                        data-modal-toggle="authentication-modal"
                        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                        onClick={() => {
                          setStar1(!star1);
                        }}
                      >
                        create leave
                      </button>
                      {/* <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-4  mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => {
                          setStar1(!star1);
                        }}
                      >
                        create leave
                      </button> */}
                    </div>

                    <hr />

                    <div className="leave_setion_emp">
                      <div className="totel_leave_allowance1">
                        <div>
                          <h5 className="mb-1 text-xl  tracking-tight text-gray-900 dark:text-white">
                            15
                          </h5>
                          <p>Total leave allowance</p>
                        </div>
                        <div>
                          <p>
                            {" "}
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="18"
                                height="18"
                                rx="2"
                                fill="#019AFF"
                              />
                            </svg>
                            <span> casual - 07</span>
                          </p>
                          <p>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="18"
                                height="18"
                                rx="2"
                                fill="#46C35F"
                              />
                            </svg>
                            <span>Sick - 08</span>{" "}
                          </p>
                        </div>
                      </div>
                      <div className="totel_leave_allowance1">
                        <div>
                          <h5 className="mb-1 text-xl  tracking-tight text-gray-900 dark:text-white">
                            15
                          </h5>
                          <p>Total leave taken</p>
                        </div>
                        <div>
                          <p>
                            {" "}
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="18"
                                height="18"
                                rx="2"
                                fill="#019AFF"
                              />
                            </svg>
                            <span> casual - 07</span>
                          </p>
                          <p>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="18"
                                height="18"
                                rx="2"
                                fill="#46C35F"
                              />
                            </svg>
                            <span>Sick - 08</span>{" "}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="leave_setion_emp">
                      <div className="totel_leave_allowance1">
                        <div>
                          <h5 className="mb-1 text-xl  tracking-tight text-gray-900 dark:text-white">
                            15
                          </h5>
                          <p>Total leave available</p>
                        </div>
                        <div>
                          <p>
                            {" "}
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="18"
                                height="18"
                                rx="2"
                                fill="#019AFF"
                              />
                            </svg>
                            <span> casual - 07</span>
                          </p>
                          <p>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="18"
                                height="18"
                                rx="2"
                                fill="#46C35F"
                              />
                            </svg>
                            <span>Sick - 08</span>{" "}
                          </p>
                        </div>
                      </div>
                      <div className="totel_leave_allowance1">
                        <div>
                          <h5 className="mb-1 text-xl  tracking-tight text-gray-900 dark:text-white">
                            15
                          </h5>
                          <p>Total request pending</p>
                        </div>
                        <div>
                          <p>
                            {" "}
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="18"
                                height="18"
                                rx="2"
                                fill="#019AFF"
                              />
                            </svg>
                            <span> casual - 07</span>
                          </p>
                          <p>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="18"
                                height="18"
                                rx="2"
                                fill="#46C35F"
                              />
                            </svg>
                            <span>Sick - 08</span>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hrLefThi">
                    <h2>Announcement Lists</h2>

                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs uppercase textALLtITL ">
                          <tr>
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
                          <tr className="bg-white border-b  ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium  whitespace-nowrap taskAns "
                            >
                              WORK FROM HOME
                            </th>
                            <td className="px-2 py-4 taskAns">JAN 22,2024</td>
                            <td className="px-6 py-4 taskAns">JAN 22,2024</td>
                            <td className="px-6 py-4 taskAns">
                              AYODHYA RAM MANDIR
                            </td>
                          </tr>

                          <tr className="bg-white border-b  ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium  whitespace-nowrap taskAns "
                            >
                              WORK FROM HOME
                            </th>
                            <td className="px-2 py-4 taskAns">JAN 22,2024</td>
                            <td className="px-6 py-4 taskAns">JAN 22,2024</td>
                            <td className="px-6 py-4 taskAns">
                              AYODHYA RAM MANDIR
                            </td>
                          </tr>

                          <tr className="bg-white border-b  ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium  whitespace-nowrap taskAns "
                            >
                              WORK FROM HOME
                            </th>
                            <td className="px-2 py-4 taskAns">JAN 22,2024</td>
                            <td className="px-6 py-4 taskAns">JAN 22,2024</td>
                            <td className="px-6 py-4 taskAns">
                              AYODHYA RAM MANDIR
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* =============================== */}
                <>
                  {/* Modal toggle */}
                  {/* <button
                   data-modal-target="default-modal"
                   data-modal-toggle="default-modal"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                   type="button"
                    >
                    Toggle modal
                     </button> */}
                  {/* Main modal */}
                  {/* <div
                    style={styleThing}
                    className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                  >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        // Modal content 
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      // Modal header 
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Terms of Service
                          </h3>
                          <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="default-modal"
                          >
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                        </div>
                        // Modal body 
                        <div className="p-4 md:p-5 space-y-4">
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European
                            Union enacts new consumer privacy laws for its
                            citizens, companies around the world are updating
                            their terms of service agreements to comply.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection
                            Regulation (G.D.P.R.) goes into effect on May 25 and
                            is meant to ensure a common set of data rights in
                            the European Union. It requires organizations to
                            notify users as soon as possible of high-risk data
                            breaches that could personally affect them.
                          </p>
                        </div>
                        // Modal footer 
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                          <button
                            data-modal-hide="default-modal"
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            I accept
                          </button>
                          <button
                            onClick={() => setStar1(false)}
                            data-modal-hide="default-modal"
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/*----------  */}
                  {/* <!-- Modal toggle --> */}
                  {/* <button
                    data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    Toggle modal
                  </button> */}

                  {/* <!-- Main modal --> */}
                  <div
                    style={styleThing}
                    id="authentication-modal"
                    tabindex="-1"
                    aria-hidden="true"
                    class="user_class hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center mt-10 md:inset-0 h-[calc(100%-1rem)] max-h-full"
                  >
                    <div class="relative p-4 w-full max-w-md max-h-full">
                      {/* <!-- Modal content --> */}
                      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Create Leave Request
                          </h3>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div class="p-4 md:p-5">

                          <form className="space-y-4" action="#">

                            <div class="mt-2 user_class_input">
                              <label
                                for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >

                                Employee Name

                              </label>

                              <input
                                value={formdata.employeeName}
                                onChange={changeHandler}

                                type="text"
                                name="employeeName"
                                id="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Enter the name"
                                required
                              />
                            </div>

                            <div class="mt-2 user_class_input">
                              <label
                                for="text"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Leave type
                              </label>


                              <select name="leaveType" onChange={changeHandler} value={formdata.leaveType} required>
                                {
                                  leaveType.map((item, index) => (
                                    <option value={item?.name} key={index}>{item?.name}</option>
                                  ))
                                }
                              </select>
                            </div>

                            <div className="flex justify-between w-full">
                              <div class="user_class_input w-full mt-2 ">
                                <label
                                  for="text"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Start
                                </label>
                                <input
                                  value={formdata.start}
                                  onChange={changeHandler}
                                  type="date"
                                  name="start"
                                  id="text"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                  required
                                />
                              </div>
                              <div class="user_class_input w-full ml-2  mt-2">
                                <label
                                  for="text"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  End
                                </label>
                                <input
                                  value={formdata.end}
                                  onChange={changeHandler}
                                  type="date"
                                  name="end"
                                  id="text"
                                  class="black bg-indigo-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                  required
                                />
                              </div>

                            </div>

                            <div class="user_class_input">
                              <label
                                for="message"
                                class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Reason
                              </label>
                              <textarea
                                required
                                name="reason"
                                onChange={changeHandler}
                                value={formdata.reason}
                                id="message"
                                rows="4"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your reason..."
                              ></textarea>
                            </div>

                            <button
                              onClick={(e) => {

                                e.preventDefault();

                                submitHandler(e);
                              }}
                              type="button"
                              class="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              send
                            </button>

                            <button
                              onClick={() => setStar1(false)}
                              type="button"
                              class="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Cancel
                            </button>

                          </form>

                        </div>
                      </div>
                    </div>
                  </div>
                </>


              </div>
            </div>
          </div>
          {popup1 && (
            <div className="hrmsystemsetup-leftmenu">
              <div className="hrmsystemsetup-container">
                <h1> Hlo Dinesh </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeDash;
