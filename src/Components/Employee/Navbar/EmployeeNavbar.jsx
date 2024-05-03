import React, { useState } from "react";
import lok from "../../images/lok.png";
import bottom from "../../images/bottom.png";
import bell from "../../images/bell.png";
import OutsideClickHandler from "react-outside-click-handler";
import { NavLink, useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import LogoutPop from "../Popup/LogoutPop";
import { useEffect } from "react";
import { useMain } from "../../../hooks/useMain";
import kushel1 from "../../images/kushel1.png";
var tc;
var tc2;

const EmployeeNavbar = ({ user, setAlert, pop1, setPop1 }) => {
  let todayDate = new Date().toLocaleDateString('en-GB');
  const [pass, setPass] = useState(false);
  const [pass1, setPass1] = useState(false);

  const navigate = useNavigate();

  const stylePeer1 = {
    display: pass1 ? "block" : "none",
  };

  const bottomta = () => {
    setPass1(true);
    document.getElementById("fg").style.display = "none";
    document.getElementById("sg").style.display = "block";
  };

  const bottomta1 = () => {
    setPass1(false);
    document.getElementById("fg").style.display = "block";
    document.getElementById("sg").style.display = "none";
  };

  const updateUser = () => {
    document.getElementById("ty").classList.toggle("tys");
  };

  const handleLogout = () => {
    localStorage.removeItem("hrms_token");
    localStorage.removeItem("hrms_user");
    window.location.href = "/login";
    setAlert("success", "logout successfully");
  };

  const [startTs, setStartTs] = useState("");
  // var [percentageDone, setPercentageDone] = useState(0);
  // var [progressTimer, setProgressTimer] = useState(0);
  var [timer, setTimer] = useState(0);
  var [breakTimer, setBreakTimer] = useState(0);
  const [isPunched, setIsPunched] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // var [overTimeTimer, setOverTimeTimer] = useState(0);

  const [punchLog, setPunchLog] = useState({});
  const [punchFlag, setPunchFlag] = useState(false);
  const [statistics, setStatistics] = useState([]);
  const [message, setMessage] = useState("");

  const { postActivity, getStatisticsByUser, getActivitiesByUser  } = useMain();

  // const [value, setValue] = useState(user);


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await getActivitiesByUser(todayDate, "", "", 0, 10, "");
    console.log(data);

    if (data.data.length > 0) {
      let isLoggedOut = data.data[0].activity[data.data[0].activity.length - 1].message !== "";

      if (!isLoggedOut) {
        setIsLoggedOut(false);
        let timerFlag = -1;
        let breakFlag = -1;
        let bt = JSON.parse(localStorage.getItem("kds_jf832hif839"));

        if (bt) {
          if (bt.date === todayDate) {
            console.log(bt.time);
            timerFlag = bt.time;
            setTimer(Number(bt.time));
          }
        }
        let bt1 = JSON.parse(localStorage.getItem("kds_jf832hif838"));
        if (bt1) {
          if (bt1.date === todayDate) {
            breakFlag = bt1.time;
            setBreakTimer(Number(bt1.time));
          }
        }

        let lastActivity =
          data.data[0].activity[data.data[0].activity.length - 1];
        // console.log(lastActivity);
        if (lastActivity.type === "PUNCH_IN") {
          setIsPunched(true);
          punchBtn("Clock In", timerFlag);
        } else if (lastActivity.type === "PUNCH_OUT") {
          setIsPunched(false);
          punchBtn("Clock Out", breakFlag);
        }
      } else {
        setIsLoggedOut(true);
      }
    }
  };

  const getStatistics = async () => {
    const ans = await getStatisticsByUser();

    setStatistics(ans.data);
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const punchBtn = async (type, flag = -1) => {
    if (!isLoggedOut) {
      setPass(!pass);

      if (type === "Clock In") {
        setIsPunched(true);
        setAlert("success", "You have been loggedIn successfully!");
        clearInterval(tc2);

        if (startTs === "") {
          setStartTs(new Date().getTime());
        }

        tc = setInterval(() => {
          if (flag && flag !== -1) {
            setTimer(++flag);
            localStorage.setItem(
              "kds_jf832hif839",
              JSON.stringify({
                date: todayDate,
                time: flag,
              })
            );
          } else {
            setTimer(++timer);
            localStorage.setItem(
              "kds_jf832hif839",
              JSON.stringify({
                date: todayDate,
                time: timer,
              })
            );
          }
        }, 1000);

        let status = "ONLINE";
        let activity = {
          type: "PUNCH_IN",
          ts: new Date().getTime(),
          message,
        };

        let tempActivity = localStorage.getItem("tempActivity");
        if (tempActivity) {
          tempActivity = JSON.parse(tempActivity);
          if (!tempActivity[new Date().getDate()]) {
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
          date: todayDate,
          activity,
          breaks: breakTimer,
          // overtime: overTimeTimer,
          hours: timer,
          status,
        });

        console.log(ans);
      } else {
        setIsPunched(false);
        clearInterval(tc);

        tc2 = setInterval(() => {
          if (flag && flag !== -1) {
            setBreakTimer(++flag);
            localStorage.setItem(
              "kds_jf832hif838",
              JSON.stringify({
                date: todayDate,
                time: flag,
              })
            );
          } else {
            setBreakTimer(++breakTimer);
            localStorage.setItem(
              "kds_jf832hif838",
              JSON.stringify({
                date: todayDate,
                time: breakTimer,
              })
            );
          }
        }, 1000);

        let status = "OFFLINE";
        let activity = {
          type: "PUNCH_OUT",
          ts: new Date().getTime(),
          message,
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
          date: todayDate,
          activity,
          breaks: breakTimer,
          // overtime: overTimeTimer,
          hours: timer,
          status,
        });
        console.log(ans);
      }
    } else {
      // alert("you have been logged out. Please login next working day!");
      setAlert("success", "you have been logged out. Please login next working day!");
    }
  };

  // ===============logic for good morning, good afternoon and evening accorroding to time====
  let myDate = new Date();
  let hours = myDate.getHours();
  let greet;

  if (hours < 12) greet = "Morning";
  else if (hours >= 12 && hours <= 17) greet = "Afternoon";
  else if (hours >= 17 && hours <= 24) greet = "Evening";

  return (
    <>
      <div className="Employee-nav w-full">
        <div className="logo ">
          <img src={kushel1} alt="" />
        </div>
        <NavLink to="/employeeDash">
        <div className="second-logo flex items-center">
          {/* <img src={thir} alt="" />
          <p className="ml-2">
            Good {greet} {user?.fullName}
          </p> */}
        </div>
        </NavLink>
        <div  className="third-logo ">
          <input style={{visibility:"hidden"}}  type="search" placeholder="Search" />
        </div>

        {/* <div className="fourth-logo ">
          {!isPunched ? (
            <button
              onClick={() => {
                punchBtn("Clock In");
              }}
            >
              Clock In
            </button>
          ) : (
            <div className="clock-nav flex">
              <div className="sat">
                <h3>
                  {new Date()
                    .toLocaleDateString("en-GB", { weekday: "short" })
                    .slice(0, 2)}
                </h3>
                <p>DAY</p>
              </div>
              <div className="hrs">
                <h3>{("0" + Math.floor(timer / 60 / 60)).slice(-2)}</h3>
                <p>HOURS</p>
              </div>
              <h3 className="puts">:</h3>
              <div className="min">
                <h3>{("0" + Math.floor(timer / 60)).slice(-2)}</h3>
                <p>MIN</p>
              </div>
              <h3 className="puts">:</h3>
              <div className="sec">
                <h3>{("0" + (timer % 60)).slice(-2)}</h3>
                <p>SEC</p>
              </div>

              <div className="bottomji">
                <i
                  id="fg"
                  onClick={bottomta}
                  className="fa-solid fa-chevron-down char cursor-pointer"
                ></i>
                <i
                  id="sg"
                  onClick={bottomta1}
                  className="fa-solid fa-chevron-up char char1 cursor-pointer"
                ></i>
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setPass1(false);
                    document.getElementById("sg").style.display = "none";
                    document.getElementById("fg").style.display = "block";
                  }}
                >
                  <div style={stylePeer1} className="brake">
                    <div
                      onClick={() => {
                        punchBtn("Clock Out");
                      }}
                      className="flex items-center bt cursor-pointer"
                    >
                      <img className="brakes" src={brake} alt="" />
                      <p className="bring">Brake</p>
                    </div>
                    <hr />
                    <div
                      onClick={() => {
                        setPop1(true);
                      }}
                      className="logout flex items-center cursor-pointer"
                    >
                      <img className="logouts" src={logout} alt="logout" />
                      <p className="out">Clock Out</p>
                    </div>
                  </div>
                </OutsideClickHandler>
              </div>
            </div>
          )}
        </div> */}

        {/* <div style={stylePeer}>
          <CircularProgressbar
            value={percentageDone}
            text={`${("0" + Math.floor(timer / 60)).slice(-2)}:${(
              "0" +
              (timer % 60)
            ).slice(-2)} hrs`}
            styles={buildStyles({
              strokeLinecap: "round",
              pathTransitionDuration: 0.5,
              pathColor: `#EC7165`,
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
          <div className="flex items-center justify-center ">
            <p className="mr-1">HOURS</p>
            <p className="ml-1">MIN</p>
          </div>
        </div> */}

        <div onClick={()=>navigate("/hrDash/notification")} className="fifth-logo ">
          <img src={bell} alt="" />
        </div>

        <OutsideClickHandler
          onOutsideClick={() => {
            document.getElementById("ty").classList.remove("tys") &&
              document.getElementById("ty").classList.add("kys");
          }}
        >
          <div className="relative cursor-pointer" onClick={updateUser}>

            <div className="sixth-logo flex items-center relative ">
              <img className="john" src={user?.profileImage ? user?.profileImage : lok} alt="lok" />
              <p className="ml-2.5">{user?.fullName}</p>
              <img className="ml-2.5 bottom" src={bottom} alt="bottom" />
            </div>

            <div id="ty" className="bg-white w-40 absolute user-profile hidden">
              <p onClick={handleLogout} className=" text-center">
                Logout
              </p>
              <NavLink to="/employeeDash/update">
                <p className=" text-center">Edit Profile</p>
              </NavLink>
            </div>

          </div>
        </OutsideClickHandler>
      </div>

      {pop1 && (
        <LogoutPop
          setPop1={setPop1}
          setMessage={setMessage}
          punchBtn={punchBtn}
          setIsLoggedOut={setIsLoggedOut}
          setAlert={setAlert}
        />
      )}
    </>
  );
};

export default EmployeeNavbar;
