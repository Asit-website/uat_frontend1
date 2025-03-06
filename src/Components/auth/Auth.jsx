import React, { useState, useEffect } from "react";
import kushel from "../images/kushel.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useMain } from "../../hooks/useMain";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import frame from "../images/Frame.png";

const Auth = (props) => {
  const { login, clientLogin, setUser } = useMain();
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    email: "",
    password: "",
    employeeCode: ""
  });

  const [tab, setTab] = useState(0);
  const [showpassword, setShowpass] = useState(false);


  // Function to set styles for the buttons
  const setButtonStyles = (activeButtonId) => {
    const buttons = ["btn1", "btn2", "btn3"];
    buttons.forEach((btnId) => {
      const button = document.getElementById(btnId);
      if (btnId === activeButtonId) {
        button.style.border = "none";
        button.style.background = "#0b60ff";
        button.style.color = "white";
      } else {
        button.style.border = "1px solid #B3CBF7";
        button.style.background = "none";
        button.style.color = "#49515C";
      }
    });
  };


  useEffect(() => {
    setButtonStyles("btn2");
    setTab(2)

    const user = localStorage.getItem("hrms_user");
    const role = JSON.parse(localStorage.getItem("hrms_token"));  // Assuming it's a JSON string

    if (user && location.pathname === '/login') {
      if (role && role.role) {  // Make sure role and role.role are defined
        if (role.role === "Client") navigate('/client');
        else if (role.role === "HR") navigate('/hrDash');
        else if (role.role === "EMPLOYEE") navigate("/employeeDash");
        else navigate("/adminDash/HRM");  // Default redirect for other roles
      }
    }
  }, [location.pathname, navigate]);

  const adminLogin = (e) => {
    e.preventDefault();
    setTab(1);
    setButtonStyles("btn1");
  };

  const userLogin = (e) => {
    e.preventDefault();
    setTab(2);
    setButtonStyles("btn2");
  };

  const clientsLogin = (e) => {
    e.preventDefault();
    setTab(3);
    setButtonStyles("btn3");
  };


  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tab === 3) {
      const ans = await clientLogin(value.email, value.password);
      console.log("Client Login Response: ", ans);
      console.log(ans?.data?.client);

      if (ans.status) {
        setUser(ans.user);
        localStorage.setItem("hrms_user", JSON.stringify(ans?.data?.client));
        // localStorage.setItem("hrms_permission", JSON.stringify(ans?.user?.PermissionRole || {}));
        localStorage.setItem(
          "hrms_token",
          JSON.stringify({
            token: ans?.data?.token,
            role: ans?.data?.client?.Role
          })
        );
        // alert("success")
      }
      if (ans.data.client.Role === "Client") {
        navigate("/client");
      }

    }

    else {
      let ans = await login(value);
      console.log("ans ", ans?.PermissionRole);

      if (ans.success) {
        setUser(ans.user);
        localStorage.setItem("hrms_user", JSON.stringify(ans?.user));
        localStorage.setItem("hrms_permission", JSON.stringify(ans?.user?.PermissionRole || {}));
        localStorage.setItem(
          "hrms_token",
          JSON.stringify({
            token: ans.token,
            role: ans?.user?.role
          })
        );

        props.setAlert("success", ans.message);

        if (ans.user.role === "HR") {
          navigate("/hrDash");
        } else if (ans.user.role === "EMPLOYEE") {
          navigate("/employeeDash");
        } else {
          navigate("/adminDash/HRM");
        }

      } else {
        props.setAlert("error", ans.message);
      }
    }


  };

  return (
    <div className="auth4">
      <div className="login-pageMain3">
        <div className="login-page2">
          <div className="login_new_div">
            <img className="kushel-logo2" src={kushel} alt="Kushel Logo" />
            <div className="singWrap">
              <h2 className="singin">Sign in </h2>
              <p className="access">to access HRMS Dashboard</p>
            </div>

            <div className="login-buttons flex justify-between gap-2">
              <button id="btn1" onClick={adminLogin} className="admin_login">Admin</button>
              <button id="btn2" onClick={userLogin} className="user_login">Employee</button>
              <button id="btn3" onClick={clientsLogin} className="user_login">Client</button>
            </div>

            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mt-4">
                  <label className="custom-field one">
                    <input
                      required
                      name={tab === 1 || tab === 3 ? "email" : "employeeCode"}
                      onChange={handleChange}
                      value={tab === 1 || tab === 3 ? value.email : value.employeeCode}
                      type={tab === 1 || tab === 3 ? "email" : "text"}
                      placeholder=" "
                    />
                    <span className="placeholder">{tab === 1 || tab === 3 ? "Email" : "Employee Code"}</span>
                  </label>

                  <div className="w-full relative">
                    <label className="custom-field w-full one">
                      <input
                        required
                        name="password"
                        onChange={handleChange}
                        value={value.password}
                        type={showpassword ? 'text' : 'password'}
                        placeholder=" "
                      />
                      <span className="placeholder">Password</span>
                    </label>

                    <span className="showpassicon">
                      {showpassword ? <FaEye onClick={() => setShowpass(false)} /> : <FaEyeSlash onClick={() => setShowpass(true)} />}
                    </span>
                  </div>

                  <div className="formgotPassWidht">
                    <NavLink to="/forget">
                      <p className="forget">Forgot password?</p>
                    </NavLink>
                  </div>
                </div>

                <button className="yui">Log in</button>
              </form>
            </div>
          </div>
        </div>

        <div className="login-page1">
          <img src={frame} alt="frame" />
        </div>
      </div>
    </div>
  );
};

export default Auth;