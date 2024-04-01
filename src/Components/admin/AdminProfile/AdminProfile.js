import React, { useState, useEffect } from 'react'
import AdminSidebar from '../Sidebar/AdminSidebar';
import AdminNavbar from '../Navbar/AdminNavbar';
import { useMain } from '../../../hooks/useMain'
import { useNavigate } from 'react-router-dom';
// import UpdateProfile from '../../Employee/Profile/UpdateProfile';
const AdminProfile = ({ pop, setPop, setAlert }) => {
  const { user, updateProfile } = useMain();
  const [value, setValue] = useState(user);

  const navigate = useNavigate();

  useEffect(() => {
    // setValue(user);
    let user1 = JSON.parse(localStorage.getItem("hrms_user"));
    setValue(user1);
  }, []);


  const handleChange = (e) => {
    if (e.target.name === "image") {
      setValue({ ...value, [e.target.name]: e.target.files[0] });
    } else {
      setValue({ ...value, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ans = await updateProfile(value);
    if (ans.success) {
      setAlert("success", ans.message);
      setValue(ans.data);
      navigate("/adminDash");

    } else {
      setAlert("error", ans.message);
    }
  };
  return (
    <>
      <div className="employee-dash h-full">
        <AdminSidebar pop={pop} setPop={setPop} />
        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />
          <div className="em">
            <div className="flex-col">
              <form className="updateUser" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="fullName" className="block mb-1 ">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    value={value?.fullName}
                    id="fullName"
                    className=" block w-full"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-1 ">
                    Company Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={value?.email}
                    id="email"
                    className=" block w-full"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="mobile" className="block mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    onChange={handleChange}
                    value={value?.mobile}
                    id="mobile"
                    className=" block w-full"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block m-auto"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProfile