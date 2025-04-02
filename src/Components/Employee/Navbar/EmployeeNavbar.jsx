import React, { useState, useEffect } from "react";
import lok from "../../images/lok.png";
import bottom from "../../images/bottom.png";
import notifications from "../../images/notifications.png";
import OutsideClickHandler from "react-outside-click-handler";
import { NavLink, useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import LogoutPop from "../Popup/LogoutPop";
import { useMain } from "../../../hooks/useMain";
import kushel1 from "../../images/kushel1.png";
import redcancel from "../../images/redcancel.png";
import notifyy from "../../images/notifyy.png";
import toast from "react-hot-toast";

var tc;
var tc2;

const EmployeeNavbar = ({ setAlert, pop1, setPop1 }) => {
  const {
    postActivity,
    getActivitiesByUser,
    fetchUserNotify,
    deleteNotification, markedNotification
  } = useMain();

  let todayDate = new Date().toLocaleDateString("en-GB");
  const [pass, setPass] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
    setUser(hrms_user);
  }, []);

  const updateUser = () => {
    document.getElementById("ty").classList.toggle("tys");
  };

  const handleLogout = () => {
    localStorage.clear()
    toast.success("logout successfully")
    navigate('/login')
  };

  const [startTs, setStartTs] = useState("");
  var [timer, setTimer] = useState(0);
  var [breakTimer, setBreakTimer] = useState(0);
  const [isPunched, setIsPunched] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const [punchFlag, setPunchFlag] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await getActivitiesByUser(todayDate, "", "", 0, 10, "");
    // console.log(data);

    if (data.data.length > 0) {
      let isLoggedOut =
        data.data[0].activity[data.data[0].activity.length - 1].message !== "";

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

        // console.log(ans);
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
        // console.log(ans);
      }
    } else {
      // alert("you have been logged out. Please login next working day!");
      setAlert(
        "success",
        "you have been logged out. Please login next working day!"
      );
    }
  };

  // ===============logic for good morning, good afternoon and evening accorroding to time====
  let myDate = new Date();
  let hours = myDate.getHours();
  let greet;

  if (hours < 12) greet = "Morning";
  else if (hours >= 12 && hours <= 17) greet = "Afternoon";
  else if (hours >= 17 && hours <= 24) greet = "Evening";

  const [allNotication, setAllNotification] = useState([]);
  const [currLoad, setCurrLoad] = useState(1);
  const [actNotify, setActNotify] = useState([]);
  const [loading, setLoading] = useState()

  const [shownotify, setShownotify] = useState(false);

  const fetchNotification = async () => {
    const ans = await fetchUserNotify();
    if (ans?.status) {
      let notifications = ans?.notifications;
      const unreadNotifications = notifications.filter(notification => !notification.IsRead);

      let reversedNotifications = unreadNotifications?.slice()?.reverse();
      setAllNotification(reversedNotifications);
    }
  };

  const markAllRead = async () => {
    setLoading(true)
    const promises = allNotication.map((e) => markedNotification(e?._id));
    await Promise.all(promises);
    await fetchNotification();
    setLoading(false)
  }

  const markedReadNotification = async (id) => {
    setLoading(id);
    const ans = await markedNotification(id);
    if (ans.status === 200) {
      fetchNotification(); // Refetch notifications after marking one as read
      toast.success("Marked Read");
    }
    setLoading(null);
  };

  const unreadNotifications = allNotication.filter(notification => !notification.IsRead);
  const unreadCount = unreadNotifications.length;

  useEffect(() => {
    fetchNotification();
  }, []);

  useEffect(() => {
    // Avoid infinite loop by checking if there's a need to update `actNotify`
    if (unreadNotifications.length > 0 && currLoad * 10 <= unreadNotifications.length) {
      const num = currLoad * 10;
      const nNotify = unreadNotifications.slice(0, num);
      setActNotify(nNotify);
    }
  }, [currLoad]); // This effect now triggers only when necessary

  const loadMoreNotifications = () => {
    if (currLoad * 10 < unreadNotifications.length) {
      setCurrLoad(currLoad + 1);
    }
  };

  return (
    <>
      <div className="Employee-nav w-full">
        {/* <div className="logo ">
          <img src={kushel1} alt="" />
        </div> */}
        <NavLink to="/employeeDash">
          <div className="logo">
            <img src={kushel1} alt="" />
          </div>
        </NavLink>
        <NavLink to="/employeeDash">
          <div className="second-logo flex items-center"></div>
        </NavLink>
        <div className="third-logo ">
          <input
            style={{ visibility: "hidden" }}
            type="search"
            placeholder="Search"
          />
        </div>

        <OutsideClickHandler
          onOutsideClick={() => {
            document.getElementById("ty").classList.remove("tys") &&
              document.getElementById("ty").classList.add("kys");
          }}
        >
          <div className="relative cursor-pointer flex items-center gap-4" >
            <div className="relative inline-block cursor-auto" onClick={() => setShownotify(!shownotify)}>
              <img src={notifications} alt="Notification" className="h-7 w-7" />
              {unreadCount > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-5 flex items-center justify-center cursor-pointer">
                  {unreadCount}
                </div>
              )}
            </div>
            <div className="sixth-logo flex items-center relative " onClick={updateUser}>
              <img
                className="john"
                src={user?.profileImage ? user?.profileImage : lok}
                alt="lok"
              />
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

      {/* this is notification sidebar  */}

      {shownotify && (
        <div className="notifySidwrap">
          <div className="notifcont">
            <nav>
              <div>

                <h2>Notifications</h2>
                {unreadCount > 0 &&
                  <button onClick={markAllRead} className="text-xs bg-red-500 px-2 py-1 rounded text-white">Mark all Read</button>
                }
              </div>
              <img
                onClick={() => {
                  setShownotify(false);
                }}
                src={redcancel}
                alt=""
              />
            </nav>

            <hr />

            <div className="allnotiftcont">
              {allNotication.length > 0 ? (
                <div className="allnotiftwrap">
                  {allNotication?.map((item, index) => (
                    <div key={index}>
                      <div className="flex flex-row justify-between items-center">
                        <div className="singlnotify">
                          <h2>{item?.title}</h2>
                          <p>{item?.description}</p>
                          <p>Date : {new Date(parseInt(item?.date)).toLocaleDateString()}</p>
                        </div>
                        {item.IsRead === false && (
                          <button
                            onClick={() => markedReadNotification(item._id)}
                            className="bg-red-500 px-2 py-1 text-white rounded"
                            disabled={loading}
                          >
                            {loading === item?._id ? 'Loading...' : 'Mark as Read'}
                          </button>
                        )}
                      </div>
                      <hr />
                    </div>
                  ))}
                  {/* <button onClick={loadMoreNotifications} className="lodmorebtns">
                    <span>Load More...</span>
                  </button> */}
                </div>
              ) : (
                <div className="nonotify">
                  <img src={notifyy} alt="" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeNavbar;
