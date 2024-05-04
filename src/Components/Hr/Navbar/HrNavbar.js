import React, { useEffect } from "react";
import kushel1 from "../../images/kushel1.png";
import notification from "../../images/notifications.png"
import chatbot from "../../images/chat_bubble_outline.png"
import lok from "../../images/lok.png";
import bottom from "../../images/bottom.png";
import { NavLink, useNavigate } from "react-router-dom";


const HrNavbar = ({ setAlert}) => {
  
  let user = JSON?.parse(localStorage.getItem("hrms_user"));

  const updateUser = () => {
    document.getElementById("ty").classList.toggle("tys");
  };

  // const {user} = useMain();
  const handleLogout = () => {
    localStorage.removeItem("hrms_token");
    localStorage.removeItem("hrms_user");
    localStorage.removeItem("clock-in");
    localStorage.removeItem("clock-status");
    localStorage.removeItem("clock-out-time");
    localStorage.removeItem("clockOutTime");
    localStorage.removeItem("clockInTime");
    localStorage.removeItem("breakInTime");
    localStorage.removeItem("breakOutTime");
    localStorage.removeItem("clock-in-date");
    localStorage.removeItem("break-seconds");
    localStorage.removeItem("break-time");
   

    window.location.href = "/login";
    setAlert("success", "logout successfully");
  };

  const navigate = useNavigate();

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


        <div className="logo-namewrap">

          <div className="logo ">
            <img src={kushel1} alt="" />
          </div>

          <NavLink to="/adminDash">

            <div className="second-logo flex items-center">

              {/* <img src={thir} alt="" /> */}


              {/* <p className="">Hi, {user?.fullName == null ? ("Shubham Gupta") : user?.fullName}!</p>

              <span><img src={arrowDown} alt="" /></span> */}

            </div>

          </NavLink>

        </div>


        <div className="navProfiIcons">

          <img onClick={()=> navigate("/hrDash/notification4")} src={notification} alt="" />

          <img onClick={() => navigate("/hrDash/notification3")} src={chatbot} alt="" />

          {/* navitem  */}
          <div className="relative cursor-pointer" onClick={updateUser}>

            <div className="sixth-logo flex items-center relative ">
              <img className="john" src={user?.profileImage ? user?.profileImage : lok} alt="lok" />
              <p className="ml-2.5">{user?.fullName ? user?.fullName : null}</p>
              <img className="ml-2.5 bottom" src={bottom} alt="bottom" />
            </div>

            <div id="ty" className="bg-white w-40 absolute user-profile hidden">
              <p onClick={handleLogout} className=" text-center">
                Logout
              </p>
              <NavLink to="/adminDash/profile"><p className=" text-center">
                Edit Profile
              </p></NavLink>
              {/* <NavLink to="/employeeDash/update">
                <p className=" text-center">Edit Profile</p>
              </NavLink> */}
            </div>

          </div>

        </div>




      </div>
    </>
  );
};

export default HrNavbar;
