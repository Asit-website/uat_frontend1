import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import chevron from "../../images/chevron_right.png";
import { useMain } from "../../../hooks/useMain";

import "./award.css";
import "./resignation.css";

import plusIcon from "../../images/plusIcon.png";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import toast from "react-hot-toast";



const HRMsystemSetup = ({ setAlert, pop, setPop }) => {
  const { user, createResignation, getResignation, deleteResignation, updateResignation, allEmployee } = useMain();
  const [popup1, setPopup1] = useState(false);

  const [employee, setEmployee] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [data, setData] = useState([]);

  const [formdata, setFormdata] = useState({
    Employee: "",
    noticeDate: "",
    resignationDate: "",
    description: ""
  })

  const fetchEmployee = async () => {
    const ans = await allEmployee();
    setEmployee(ans?.emp);

  }

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  const getData = async () => {
    const ans = await getResignation();
    setData(ans?.data);
  }

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        Employee: editData.Employee,
        noticeDate: editData.noticeDate,
        resignationDate: editData.resignationDate,
        description: editData.description
      })
    }
  }, [editData])

  const submitHandler = async () => {
    try {
      if (onEdit) {
        await updateResignation({ ...formdata });
        toast.success("update successfully");
        setRefreshFlag(!refreshFlag);
      }
      else {
        await createResignation({ ...formdata });
        toast.success("Successfuly Created");
        setRefreshFlag(!refreshFlag);
      }
      setPopup1(false);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProject = async (id) => {

    confirmAlert({
      title: 'Are you sure to delete this data?',
      message: 'All related data to this will be deleted',
      buttons: [
        {
          label: 'Yes, Go Ahead!',
          style: {
            background: "#FF5449"
          },
          onClick: async () => {
            await deleteResignation(id);
            toast.success("delete Successfully");
            setRefreshFlag(!refreshFlag);
            getData();
          }
        },
        {
          label: 'Cancel',

          onClick: () => null
        }
      ]
    });

  };

  useEffect(() => {
    fetchEmployee();
    getData();
  }, [refreshFlag])


  return (
    <>
      <div className="employee-dash h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm awardtm">
          <AdminNavbar user={user} setAlert={setAlert} />

          <div className="em">
            <div className="flex-col">
              <div className="admin-main adminmain">
                <div className="plusSection">
                  <div className="adminFirt">
                    <h2 className="hrmShed">Manage Resignation</h2>

                    <div className="hrmDoHe">
                      <p>Dashboard</p>
                      <img src={chevron} alt="" />
                      <span>Resignation</span>
                    </div>
                  </div>


                  <img
                    onClick={() => {
                      setPopup1(true);
                    }}
                    className="plusiCON"
                    src={plusIcon}
                    alt=""
                  />
                </div>

                <div>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-black uppercase  dark:text-black">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            EMPLOYEE NAME
                          </th>
                          <th scope="col" class="px-6 py-3">
                            RESIGNATION DATE
                          </th>
                          <th scope="col" class="px-6 py-3">
                            LAST WORKING DAY
                          </th>
                          <th scope="col" class="px-6 py-3">
                            REASON
                          </th>
                          <th scope="col" class="px-6 py-3">
                            ACTION
                          </th>
                        </tr>
                      </thead>

                      <tbody>

                        {
                          data?.length > 0 ?
                            data?.map((item, index) => (
                              <tr key={index} class="bg-white">
                                <td class="px-6 py-4">
                                  {item?.Employee}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.resignationDate}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.noticeDate}
                                </td>
                                <td class="px-6 py-4">
                                  {item?.description}
                                </td>
                                <td class="px-6 py-4">
                                  <div className='flex items-center sk'>
                                    <i onClick={() => {
                                      setOnEdit(true);
                                      setEditData(item);
                                      setPopup1(true)
                                    }} className="fa-solid fa-pen-to-square"></i>
                                    <i onClick={() => {
                                      deleteProject(item?._id)
                                    }} className="fa-solid fa-trash"></i>
                                  </div>
                                </td>


                              </tr>
                            ))
                            :
                            <div className='noEntries'>

                              <span >No entries found</span>
                            </div>

                        }





                      </tbody>
                    </table>
                  </div>

                </div>


                <>
                  {/* Main modal */}

                </>

              </div>
            </div>
          </div>
        </div>

        {popup1 && (
          <div className="allPopupWrap">
            <div className="popup1 awardpopup">
              <h2>Create New Resignation</h2>
              <label onClick={() => {
                setPopup1(false);
                setOnEdit(false);
                setEditData({});
                setFormdata({
                  Employee: "",
                  noticeDate: "",
                  resignationDate: "",
                  description: ""
                })
              }} className="cross-icon"></label>

              <hr />

              {/* <div className="award-popup-label"> */}
              <form onSubmit={() => {
                submitHandler();
                setPopup1(false);
              }}>
                <div className="award-popup-label">
                  <label htmlFor="Employee" className="Resig-employ">
                    <p>Employee</p>
                    <select onChange={changeHandler} value={formdata?.Employee} name="Employee" id="Employee">
                      {
                        employee?.map((val, index) => {
                          return <option key={index} value={val?.fullName}>{val?.fullName}</option>
                        })
                      }
                    </select>
                  </label>
                </div>
                <div className="award-popup-label">
                  <label htmlFor="noticeDate">
                    <p>Notice-Date</p>
                    <input
                      type="date"
                      name="noticeDate"
                      value={formdata?.noticeDate}
                      onChange={changeHandler}
                      id="noticeDate"
                    />
                  </label>
                  <label htmlFor="resignationDate">
                    <p>Resignation Date</p>
                    <input
                      type="date"
                      name="resignationDate"
                      value={formdata?.resignationDate}
                      id="resignationDate"
                      onChange={changeHandler}
                    />
                  </label>
                </div>
                <div className="award-popup-label award-popup-textarea">
                  <label htmlFor="description">
                    <p>Description</p>
                    <textarea onChange={changeHandler} value={formdata?.description} id="description" name="description" rows="8" cols="50" placeholder="Enter Description"></textarea>
                  </label>
                </div>
                {/* <div/> */}

                <hr />

                <div className="btnWrap Award-popup-btn mt-5">
                  <button onClick={() => {
                    setPopup1(false);
                    setOnEdit(false);
                    setEditData({});
                    setFormdata({
                      Employee: "",
                      noticeDate: "",
                      resignationDate: "",
                      description: ""
                    })
                  }} className="cencel awd-cancel">
                    <span>Cancel</span>
                  </button>

                  <button className="create awd-create">
                    <span>{onEdit ? "Update" : "Create"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default HRMsystemSetup;
