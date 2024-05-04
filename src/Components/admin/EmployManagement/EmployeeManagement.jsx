import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import React, { useState, useEffect } from "react";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
// import chevron from "../../images/chevron_right.png";
// import inbox from "../../images/move_to_inbox.png"
// import outbox from "../../images/outbox.png"
// import personAdd from "../../images/person_add.png"
import f from "../../images/f.png";
import deleted from "../../images/deletedd.svg";
import "./employeManage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import actions from "../../images/actions.png"
import happy from "../../images/bx-happy-heart-eyes.png"
import edit22 from "../../images/edit22.png"
import pp from "../../images/pp.png"
import OutsideClickHandler from "react-outside-click-handler";
import toast from "react-hot-toast";


const EmployeeManagement = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {

  const navigate = useNavigate();

  let todayDate = new Date().toLocaleDateString('en-GB');

  const { user, getUsers, getActivitiesByUser, deleteUser,getDepartments,getDesignations } = useMain();

  const [data, setData] = useState([]);

  const [allData , setAllData] = useState([]);

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [currView, setCurrView] = useState(-1);

  const [filters , setFilters] = useState({
    department:"Department",
    designation:"Designation"
  })

  const [department,setDepartment] = useState([]);

  const [designation,setDesignation] = useState([]);

  const fetchDesig = async()=>{
      const ans = await getDesignations();
      setDesignation(ans?.data);
  }
  

  const getData = async () => {
    const ans = await getUsers();
    setAllData(ans?.data);
    setData(ans.data);
  };

  const getDep = async () =>{
    const ans = await getDepartments();
    setDepartment(ans?.data);
    console.log(ans);
  }

  const getData1 = async (date) => {
    const data = await getActivitiesByUser(date, '', '', 0, 10, '');
    console.log(data.data[0]);
  };

  const deleteUser1 = async (id) => {

    confirmAlert({
      title: 'Are you sure you want to delete this item?',
      buttons: [
        {
          label: 'Delete',
          style: {
            background: "#DD3409"
          },
          onClick: async () => {
            await deleteUser(id);
            toast.success("delete Successfully");
            setRefreshFlag(!refreshFlag);
            getData();
          }
        },
        {
          label: 'Cancel',
          style:{
            background:"none",
            border:"1px solid #0B56E4",
            color:"#0B56E4",
          },
          onClick: () => null
        }
      ]
    });

  };

  const  filterHandler = (e)=>{
    const {name , value} = e.target;

     setFilters((prev)=>({
      ...prev ,
      [name]: value
     }))
  }
  
  useEffect(() => {
    getData();
    fetchDesig();
    getDep();
  }, [refreshFlag]);

  useEffect(() => {
    getData1(todayDate);
  }, []);

  useEffect(()=>{


    const completeData = [...allData];

    if(filters.department !== "Department" && filters.designation === "Designation" ){
         const filterData = completeData.filter((data)=> data.department === filters.department);

          setData(filterData);
          
    }
     else if(filters.department === "Department" && filters.designation !== "Designation"){
      const filterData = completeData.filter((data)=> data.designation === filters.designation);

      setData(filterData);
     }
     else if(filters.department !== "Department" && filters.designation !== "Designation") {
      const filterData = completeData.filter((data)=> (data.designation === filters.designation) && (data.department === filters.department));

      setData(filterData);
     }
     else{
       setData([...allData]);
     }

  },[filters.department , filters.designation])


  return (
    <>
      <div className="employee-dash h-full">
        {isHr ? <HrSidebar /> : <AdminSidebar pop={pop} setPop={setPop} />}
        <div className="tm">
          {isHr ? (
            <HrNavbar
              user={user}
              setAlert={setAlert}
              pop1={pop1}
              setPop1={setPop1}
            />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">
            <div className="flex-col">

              {/* first  */}
             
              <div className="hrmsFri">

                <h2>Employee Management</h2>
                
                {/* right  */}
                <div className="hrFRi">
                 <NavLink to="/adminDash/EmployeeMan"><button className="ddBtn">
                    <img src={pp} alt="" />
                    <span>Add Employee</span>
                  </button></NavLink>
                  <img src={f} alt="" />
                </div>

              </div>

              {/* filter section  */}
              <section className="fiterWrap">

                <h3>Filter by</h3>

                <p className="line" />

                <select name="department" onChange={filterHandler} id="">
                  <option value="Department">Department</option>
                  {
                     department?.map((val,index)=>{
                      return <option key={index} value={val?.name}>{val?.name}</option>
                     })
                  }
                </select>

                <p className="line" />

                <select name="designation" onChange={filterHandler} id="">
                  <option value="Designation">Designation</option>
                  {
                     designation?.map((val,index)=>{
                      return <option key={index} value={val?.name}>{val?.name}</option>
                     })
                  }
                </select>

                <p className="line" />


                <select name="" id="">
                  <option value="Employee Type">Employee Type</option>
                </select>


                <p className="line" />

              </section>


              {/* second */}

              <p className="totalRecord">Total Records {data?.length}</p>

              <main className="creteEmpWrap2">

                <div className="EllWrap">

                  <div className="allEtOL">
                    <p className="hhj">All Employee</p>

                    <div className="deletwrP">
                      <img src={deleted} alt="" />
                      <span>Delete</span>
                    </div>
                  </div>

                </div>

                <div className="relative  overflow-x-auto w-full">

                  <table className="w-full table1 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                    <thead className="text-xs uppercase textALLtITL ">
                      <tr>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          <input type="checkbox" className="checkboxes" />

                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          EMPLOYEE NAME
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          EMAIL
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          DEPARTMENT
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          DESIGNATION
                        </th>
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          DATE OF JOIN
                        </th>

                        <th scope="col" className="px-6 py-3 taskTitl ">
                          ACTION
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        data?.map((item, index) => (
                          <tr key={index} className="bg-white border-b">
                            <th scope="col" className="px-6 py-3 taskTitl ">
                              <input type="checkbox" className="checkboxes" />

                            </th>
                            <th scope="row" className="px-6 py-4   "><span className="index cursor-pointer">{index + 1}</span> </th>
                            <td className="px-6 py-4 taskAns">{item?.fullName}</td>
                            <td className="px-6 py-4 taskAns">{item?.email}</td>
                            <td className="px-6 py-4 taskAns">{item?.department}</td>
                            <td className="px-6 py-4 taskAns">{item?.designation}</td>
                            <td className="px-6 py-4 taskAns">{item?.joiningDate}</td>

                            <OutsideClickHandler
                              onOutsideClick={()=>{
                                if (index == currView) {
                                  setCurrView(-1);
                                } 
                              }}
                            >
                            <div className="viewOnwWRAP">

                              <td onClick={() => {
                                if (index == currView) {
                                  setCurrView(-1);
                                }
                                else {
                                  setCurrView(index)
                                }
                              }} className="px-6 py-4 taskAns cursor-pointer"><img src={actions} alt="" /></td>


                              {
                                index == currView &&

                                <div className=" viewOne">
                                  {/* first  */}
                                  <div onClick={()=>navigate("/adminDash/EmployeeDetails" , {state:item?._id})} className="subView">
                                    <img src={happy} alt="" />
                                    <p>View </p>
                                  </div>

                                  <br />

                                  {/* second */}
                                  <div onClick={() => {
                                    navigate(`/adminDash/EmployeeMan/${item._id}`);
                                  }} className="subView">
                                    <img src={edit22} alt="" />
                                    <p>Edit </p>
                                  </div>

                                  <br />

                                  {/* third */}
                                  <div onClick={() => {
                                    deleteUser1(item?._id);
                                  }} className="subView">
                                    <img src={deleted} alt="" />
                                    <p className="deel">Delete </p>
                                  </div>
                                </div>

                              }
                            </div>
                            </OutsideClickHandler>
                          </tr>
                        ))
                      }



                    </tbody>

                  </table>
                </div>

              </main>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeManagement;
