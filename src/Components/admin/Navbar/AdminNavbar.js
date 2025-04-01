import React, { useEffect, useState } from "react";
import kushel1 from "../../images/kushel1.png";
import notification from "../../images/notifications.png";
import lok from "../../images/lok.png";
import bottom from "../../images/bottom.png";
import { NavLink } from "react-router-dom";
import { useMain } from '../../../hooks/useMain';
import notifyy from "../../images/notifyy.png";
import redcancel from "../../images/redcancel.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminNavbar = ({ setAlert }) => {
  const navigate = useNavigate();
  const { fetchUserNotifyHR, markedNotification } = useMain();
  const [loading, setLoading] = useState();

  const [user, setUser] = useState({});
  const [allNotication, setAllNotification] = useState([]);
  const [currLoad, setCurrLoad] = useState(1);
  const [actNotify, setActNotify] = useState([]);
  const [shownotify, setShownotify] = useState(false);

  const updateUser = () => {
    document.getElementById("ty").classList.toggle("tys");
  };

  // const {user} = useMain();
  const handleLogout = () => {
    // Clear user data from localStorage and redirect to login
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate('/login');
  };

  useEffect(() => {
    const hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
    setUser(hrms_user);
  }, []);

  let myDate = new Date();
  let hours = myDate.getHours();
  let greet = hours < 12 ? "Morning" : hours <= 17 ? "Afternoon" : "Evening";

  const fetchNotification = async () => {
    const ans = await fetchUserNotifyHR();
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
  }, [ currLoad]); // This effect now triggers only when necessary

  const loadMoreNotifications = () => {
    if (currLoad * 10 < unreadNotifications.length) {
      setCurrLoad(currLoad + 1);
    }
  };

  return (
    <>
      <div className="Employee-nav w-full">
        <div className="logo-namewrap">
          <NavLink to="/adminDash/HRM">
            <div className="logo">
              <img src={kushel1} alt="" />
            </div>
          </NavLink>
          <NavLink to="/adminDash/HRM">
            <div className="second-logo flex items-center"></div>
          </NavLink>
        </div>

        <div className="navProfiIcons">
          <div className="relative inline-block cursor-auto" onClick={() => setShownotify(!shownotify)}>
            <img src={notification} alt="Notification" className="h-7 w-7" />
            
            {unreadCount>0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-5 flex items-center justify-center cursor-pointer">
              {unreadCount}
            </div>
            )}
          </div>

          <div className="relative cursor-pointer" onClick={updateUser}>
            <div className="sixth-logo flex items-center relative">
              <img className="john" src={user?.profileImage ? user?.profileImage : lok} alt="lok" />
              <p className="ml-2.5">{user?.fullName}</p>
              <img className="ml-2.5 bottom" src={bottom} alt="bottom" />
            </div>
            <div id="ty" className="bg-white w-40 absolute user-profile hidden">
              <p onClick={handleLogout} className="text-center">Logout</p>
              <NavLink to="/adminDash/profile"><p className="text-center">Edit Profile</p></NavLink>
              <NavLink to="/adminDash/mySelf"><p className="text-center">My Profile</p></NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Sidebar */}
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
              <img onClick={() => setShownotify(false)} src={redcancel} alt="" />
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
                            {loading===item?._id ? 'Loading...' : 'Mark as Read'}
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

export default AdminNavbar;
