import React, { useState, useRef } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useMain } from '../../hooks/useMain';

const ForgetPassword1 = ({ setAlert }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { forgetPassword1, loading } = useMain();
  const [value, setValue] = useState({
    n1: '',
    n2: '',
    n3: '',
    n4: '',
  });

  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const newValue = { ...value, [e.target.name]: e.target.value };
    setValue(newValue);
    if (e.target.value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !value[`n${index + 1}`] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = value.n1 + value.n2 + value.n3 + value.n4;
    let ans = await forgetPassword1({ email: location.state.email, otp });

    if (ans.success) {
      setAlert('success', ans.message);
      navigate('/forget2', { state: { email: location.state.email, otp } });
    } else {
      setAlert('error', ans.message);
    }
  };

  return (
    <div className="auth">
      <div className="login-page">
        <div className="login-page2">
          <h2>Forgot Password</h2>
          <p className="mt-4">
            This is a secure system and you will need to provide your login details to access the site.
          </p>
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between otp-verify">
                {['n1', 'n2', 'n3', 'n4'].map((name, index) => (
                  <input
                    key={name}
                    required
                    className="otp"
                    type="text"
                    maxLength="1"
                    name={name}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    value={value[name]}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>

              <button type="submit" disabled={loading} className="yui flex justify-center items-center p-2 bg-blue-500 text-white rounded-lg w-full transition-all duration-300 ease-in-out">
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Next'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword1;
