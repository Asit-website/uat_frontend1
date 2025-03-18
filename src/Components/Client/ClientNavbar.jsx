import React, { useState, useEffect } from "react";
import lok from "../../../src/Components//images/lok.png";
import bottom from "../../../src/Components/images/bottom.png";
import notification from "../../../src/Components/images/notifications.png";
// import OutsideClickHandler from "react-outside-click-handler";
import { NavLink, useNavigate } from "react-router-dom";
// import "react-circular-progressbar/dist/styles.css";
// import LogoutPop from "../Popup/LogoutPop";
// import { useMain } from "../../../hooks/useMain";
import kushel1 from "../../../src/Components/images/kushel1.png"
import toast from "react-hot-toast";
// import kushel1 from "../../../";

// import redcancel from "../../images/redcancel.png";
// import notifyy from "../../images/notifyy.png";




const ClientNavbar = ({setAlert}) => {
  const navigate = useNavigate();
  const data = true
  const [shownotify, setShownotify] = useState(false);
  const updateUser = () => {
    document.getElementById("ty").classList.toggle("tys");
  };

  const user = JSON.parse(localStorage.getItem("hrms_user"));
  const fullName = user.Name;
  console.log(fullName,user)

  const handleLogout = () => {
    localStorage.removeItem("hrms_token");
    localStorage.removeItem("hrms_user");
    navigate('/login')
    setAlert("success", "logout successfully");
    toast.success("logout successfully")

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
            <div className="second-logo flex items-center">
            </div>
          </NavLink>
        </div>


        <div className="navProfiIcons">

          {/* <img onClick={
            () => {
              setShownotify(true);
            }

          } src={notification} alt="" /> */}

          {/* navitem  */}
          <div className="relative cursor-pointer" onClick={updateUser}>

            <div className="sixth-logo flex items-center relative ">
              <img className="john" src={lok} alt="lok" />
              <p className="ml-2.5">{fullName}</p>
              <img className="ml-2.5 bottom" src={bottom} alt="bottom" />
            </div>

            <div id="ty" className="bg-white w-40 absolute user-profile hidden right-0">
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
      </div>
    </>
  )
}


export default ClientNavbar