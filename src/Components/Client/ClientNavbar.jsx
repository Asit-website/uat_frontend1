import React, { useState, useEffect } from "react";
import lok from "../../../src/Components//images/lok.png";
import bottom from "../../../src/Components/images/bottom.png";
import notification from "../../../src/Components/images/notifications.png";
import redcancel from "../../../src/Components/images/redcancel.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useMain } from "../../hooks/useMain";
import kushel1 from "../../../src/Components/images/kushel1.png";
import toast from "react-hot-toast";

const ClientNavbar = ({ setAlert }) => {
  const { getClientNotification, markedNotification } = useMain();
  const navigate = useNavigate();

  const data = true
  const [shownotify, setShownotify] = useState(false);
  const [allNotification, setNotifications] = useState([]);
  const [loading, setLoading] = useState();


  const updateUser = () => {
    document.getElementById("ty").classList.toggle("tys");
  };


  const user = JSON.parse(localStorage.getItem("hrms_user"));
  const fullName = user?.Name;

  const handleLogout = () => {
    localStorage.removeItem("hrms_token");
    localStorage.removeItem("hrms_user");
    navigate('/login');
    toast.success("Logout successfully");
  };

  const getAllNotifications = async () => {
    try {
      const response = await getClientNotification(user?._id);
      if (response.status === 200) {
        let notifications = response?.notifications;
        const unreadNotifications = notifications.filter(notification => !notification.IsRead);
        let reversedNotifications = unreadNotifications?.slice()?.reverse();

        setNotifications(reversedNotifications);
        // console.log(reversedNotifications)
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const markAllRead = async () => {
    setLoading(true)
    const promises = allNotification.map((e) => markedNotification(e?._id));
    await Promise.all(promises);
    await getAllNotifications();
    setLoading(false)
  }




  const markedReadNotification = async (id) => {
    setLoading(id);
    const ans = await markedNotification(id);
    if (ans.status === 200) {
      getAllNotifications();
      toast.success("Marked Read");
    }
    setLoading(null);
  };

  const unreadNotifications = allNotification.filter(notification => !notification.IsRead);
  const unreadCount = unreadNotifications.length;

  useEffect(() => {
    getAllNotifications();
  }, []);

  // Effect for debugging shownotify state changes
  // useEffect(() => {
  //   // console.log('Notification visible:', shownotify);
  //   getAllNotifications();

  // }, [allNotification]);



  return (
    <>
      <div className="Employee-nav w-full">
        <div className="logo-namewrap">
          <NavLink to="/client">
            <div className="logo">
              <img src={kushel1} alt="Logo" />
            </div>
          </NavLink>

          <NavLink to="/adminDash/HRM">
            <div className="second-logo flex items-center">
              {/* Additional logo can go here */}
            </div>
          </NavLink>
        </div>

        <div className="navProfiIcons">
          {/* Notification Icon */}
          <div className="relative inline-block cursor-pointer" onClick={() => setShownotify(prevState => !prevState)}>
            <img src={notification} alt="Notification" className="h-7 w-7" />
            {unreadCount > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-5 flex items-center justify-center cursor-pointer">
                  {unreadCount}
                </div>
              )}
          </div>


          {/* User Profile */}
          <div className="relative cursor-pointer" onClick={updateUser}>
            <div className="sixth-logo flex items-center relative">
              <img className="john" src={lok} alt="Profile" />
              <p className="ml-2.5">{fullName}</p>
              <img className="ml-2.5 bottom" src={bottom} alt="Dropdown" />
            </div>

            <div id="ty" className="bg-white w-40 absolute user-profile hidden">
              <p className=" text-center" onClick={() => handleLogout()}>
                Logout
              </p>
              {/* <NavLink to="/adminDash/profile"><p className=" text-center">
                Edit Profile
              </p></NavLink>
              <NavLink to="/adminDash/mySelf"><p className=" text-center">
                My Profile
              </p></NavLink> */}

            </div>
          </div>
        </div>

        {/* Notification Panel */}
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
                <img onClick={() => setShownotify(false)} src={redcancel} alt="Close" />
              </nav>

              <hr />

              <div className="allnotiftcont">

                {allNotification.length > 0 ? (
                  <div className="allnotiftwrap">
                    {!loading ? (
                      allNotification.map((item) => {
                        const { _id, title, description, date, IsRead } = item;
                        return (
                          <div key={_id}>
                            <div className="flex flex-row justify-between items-center">
                              <div className="singlnotify">
                                <h2 className="text-xl">{title}</h2>
                                <p><strong>{description}</strong></p>
                                <p>Date: {new Date(parseInt(date)).toLocaleDateString()}</p>
                              </div>
                              {!IsRead && (
                                <button
                                  onClick={() => markedReadNotification(_id)}
                                  className="bg-red-500 px-2 py-1 text-white rounded"
                                  disabled={loading}
                                >
                                  {loading ? 'Loading...' : 'Mark as Read'}
                                </button>
                              )}
                            </div>
                            <hr />
                          </div>
                        );
                      })
                    ) : (
                      <div>Loading notifications...</div>  // Optional loading message if the list is being processed
                    )}
                  </div>
                ) : (
                  <div className="nonotify">No notifications available</div>
                )}

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ClientNavbar;

