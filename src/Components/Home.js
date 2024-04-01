import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("hrms_token");
    let user = localStorage.getItem("hrms_user");
    if (token && user) {
      if (JSON.parse(user).role === "EMPLOYEE") {
        navigate("/employeeDash");
      } else if (JSON.parse(user).role === "HR") {
        navigate("/hrDash");
      } else {
        navigate("/adminDash");
      }
    } else {
      navigate("/login");
    }
  }, []);
  return <>Home</>;
};

export default Home;
