import React, { useState } from 'react';
import photo from "../images/Photo.png";
import kushel from "../images/kushel.png";
import path from '../images/path.png';
import { useMain } from '../../hooks/useMain';
import { useNavigate } from 'react-router-dom';

const ForgetPassword2 = ({ setAlert }) => {
  const { forgetPassword2 } = useMain();
  // const { user, changePassword1 } = useMain();
  const [value, setValue] = useState({
    password: '',
    password1: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(value);

    if (value.password === value.password1) {
      const ans = await forgetPassword2({ email: localStorage.getItem('kds-reset-email'), password: value.password });

      if (ans.success) {
        localStorage.removeItem('hrms_token');
        localStorage.removeItem('hrms_user');
        localStorage.removeItem('kds-reset-email');
        alert("password changed successfully");
        navigate('/login');
      }
    }
    else {
      setAlert("error", "Password and confirm password must be same");
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
          <h2>Create new password</h2>
          <p className="mt-4">
            This is a secure system and you will need to provide your login
            details to access the site.
          </p>
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <div className=" flex flex-col mt-4 ">
                {/* <label htmlFor='oldPassword' className="custom-field one">
              <input type="text"
                          name="oldPassword"
                          onChange={handleChange}
                          value={value.oldPassword}
                          id="oldPassword"
                          className=" block w-full"
                          required
                          placeholder=" " />
              <span className="placeholder">Old Password</span>
            </label> */}
                <label htmlFor='password' className="custom-field one">
                  <input type="text"
                    name="password"
                    onChange={handleChange}
                    value={value.password}
                    id="password"
                    className=" block w-full"
                    required
                    placeholder=" " />
                  <span className="placeholder">New Password</span>
                </label>

                <label htmlFor='password1' className="custom-field one">
                  <input type="text"
                    name="password1"
                    onChange={handleChange}
                    value={value.password1}
                    id="password1"
                    className=" block w-full"
                    required
                    placeholder=" " />
                  <span className="placeholder">Confirm Password</span>
                </label>

              </div>
              <button type='submit'>Sign In</button>
              <div className="sign-information">
                <p>Powered by <a target='_blank' href="https://www.kusheldigi.com/"> <span>KusheldigiSolutions</span></a> </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword2