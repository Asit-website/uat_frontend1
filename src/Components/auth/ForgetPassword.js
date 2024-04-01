import React, { useState } from 'react';
import photo from "../images/Photo.png";
import kushel from "../images/kushel.png";
import path from '../images/path.png';
import { useNavigate } from 'react-router-dom';
import { useMain } from '../../hooks/useMain';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { forgetPassword } = useMain();
  const [value, setValue] = useState({
    employeeCode: '',
    email: '',
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);
    let ans = await forgetPassword(value);
    console.log(ans);
    if (ans.success) {
      localStorage.setItem('kds-reset-email', ans.email);
      navigate("/forget1");
    }
  };

  return (
    <div className="auth">
      <div className="login-page">
        <div className="login-page1">
          <img className="path6" src={path} alt="path" />
          <img className="kushel-logo" src={kushel} alt="" />
          <img src={photo} alt="photo" />
        </div>
        <div className="login-page2">
          <h2>Forgot Password</h2>
          <p className="mt-4">
            This is a secure system and you will need to provide your login
            details to access the site.
          </p>
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <div className=" flex flex-col mt-4 ">
                <label className="custom-field one">
                  <input required type="text" placeholder=" " onChange={handleChange} name="employeeCode" value={value.employeeCode} />
                  <span className="placeholder">Employee Code</span>
                </label>
                <label className="custom-field one">
                  <input required type="email" placeholder=" " onChange={handleChange} name="email" value={value.email} />
                  <span className="placeholder">Email Id</span>
                </label>
              </div>
              <button type='submit'>Next</button>
              <div className="sign-information">
                <p>Powered by <a target='_blank' href="https://www.kusheldigi.com/"><span>KusheldigiSolutions</span></a> </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword