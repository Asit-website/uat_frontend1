import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import chevron from "../../images/chevron_right.png";
import "./hrm.css";
import "./leaveReq.css";
import { NavLink } from "react-router-dom";
import write from "../../images/write.png";
import del from "../../images/del.png";
import write2 from "../../images/write2.png";
import { useEffect, useState } from "react";

const LeaveRequest = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {

  const [star1, setStar1] = useState(false);


  const styleThing = {
    display: star1 ? "block" : "none",
  };

  const { user, getUserLeaves , deleteLeave , updateLeave , acceptLeave , rejectLeave , postNotifyLeavereq } = useMain();

  const [data, setData] = useState([]);

  const getData=async()=>{
    let ans = await getUserLeaves();
    setData(ans.data);
  };

  useEffect(()=>{
    getData();

  },[]);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return formattedDate;
  };


  const [formdata , setFormdata] = useState({
    employeeName:"" , leaveType:"" , start:"" , end:"" , reason:"" , id:""
  })

  const changeHandler = (e)=>{
    const {name ,value} = e.target;

    setFormdata((prev)=>({
      ...prev ,
      [name]:value
    }))
  }

   const deleteLeaveRequest = async(leaveId)=>{
    let ans = await deleteLeave(leaveId);
       getData();
   }

   const [showPlay , setShowPlay] = useState(-1);

   const submitHandler = async()=>{
    const startDate = new Date(formdata.start);
    const endDate = new Date(formdata.end);
    const timeDifference = Math.abs(endDate - startDate);
    const daysGap = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  const ans = await updateLeave({ employeeName: formdata.employeeName ,  id:formdata.id ,  type: formdata.leaveType, from: formdata.start, to: formdata.end, days: daysGap, reason: formdata.reason});

   if(ans.success){
    alert("Successfuly updated");
    setStar1(false);
    getUserLeaves();
   }

   }

   const rejectHandler = async(form)=>{
    const {user} = form;

    const userName = user.fullName;
  
   const ans = await rejectLeave(form);

    const notify = await postNotifyLeavereq(userName , "Rejected");
    console.log("notify ",notify);

    if(ans?.status){
      alert("Successfuly reject the leave");
      setShowPlay(-1);
    }
  }
  
  const acceptHandler = async(form)=>{    
    const {user} = form;
    const userName = user.fullName;
    
    const ans = await acceptLeave(form);


    const notify = await postNotifyLeavereq(userName , "Accepted");

    console.log("notify ",notify);

    if(ans?.status){
      
      alert("Successfuly Accepted the leave");
      setShowPlay(-1);
    }
   }



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
              <div className="hrmDasTxtFir">
                <p className="hrmHed">Dashboard</p>

                <div className="hrDsPa">
                  <p className="hrFirDs">Dashboard</p>{" "}
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  <NavLink to={`/adminDash/HRM`}>
                    <span className="hrFirDs">Leave Management</span>
                  </NavLink>
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  <span className="thml">manage Leave</span>
                </div>
              </div>

              {/* second  */}
              <main className="leaveReqWrap">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase textALLtITL ">
                      <tr>
                        <th scope="col" className="px-3 py-3 Uppercase">
                          <div className="flex items-center checkbox_ss ">
                            {/* <input
                              disabled=""
                              id="disabled-checkbox"
                              type="checkbox"
                              defaultValue=""
                              className=" text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            /> */}
                            <label htmlFor="disabled-checkbox">EMPLOYEE</label>
                          </div>
                        </th>
                        <th scope="col" className="px-3 py-3 uppercase">
                          LEAVE TYPES
                        </th>
                        <th scope="col" className="px-3 py-3 uppercase">
                          APPLIED ON
                        </th>
                      
                        <th scope="col" className="px-3 py-3 uppercase">
                          START DATE
                        </th>
                        <th scope="col" className="px-3 py-3 uppercase">
                          END DATE
                        </th>
                        {/* <th scope="col" className="px-3 py-3 uppercase">
                          STATUS
                        </th> */}
                        <th scope="col" className="px-3 py-3 uppercase">
                          TOTAL DAYS
                        </th>
                        <th scope="col" className="px-3 py-3 uppercase">
                          LEAVE REASON
                        </th>
                        <th scope="col" className="px-3 py-3 uppercase">
                          STATUS
                        </th>
                        <th scope="col" className="px-3 py-3 uppercase">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data?.map((e,index)=>{
                        return (
                          <tr key={index} className="bg-white border-b">
                          <th
                            scope="row"
                            className="px-3 py-4 font-medium  whitespace-nowrap taskAns "
                          >
                            <div className="flex items-center checkbox_ss ">
                             
                              <label htmlFor="disabled-checkbox">
                                {e?.user?.fullName}
                              </label>
                            </div>
                          </th>
                          <td className="px-3 py-4 taskAns">{e?.leaveType}</td>
                          <td className="px-3 py-4 taskAns">{formatDate(e?.appliedOn)}</td>
                          <td className="px-3 py-4 taskAns">  {e?.from}</td>
                          <td className="px-3 py-4 taskAns"> {e?.to} </td>
                          <td className="px-3 py-4 taskAns"> {e?.days} </td>
                          
                          <td className="px-3 py-4 taskAns">{e?.reason}</td>
  
                          <td className="px-3 py-4 taskAns">
                            <div className="ACTIVITYsss">{e?.status}</div>
                          </td>

                          <td className="px-6 py-4  flex items-center hiii_gap">
                            
                             <div className="relative">

                           
                              <button
                               onClick={()=>{
                                 if(showPlay === index){
                                  setShowPlay(-1);
                                 }
                                 else {
                                setShowPlay(index);
                                 }
                               }}

                                id="dropdownMenuIconButton2222"
                                data-dropdown-toggle="dropdownDots2222"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                                  />
                                </svg>
                              </button>

                               <div style={{ gap:"5px" }} className={`absolute ${showPlay === index ? "showPlay":"hidenPlay"}`}>

                                  <p onClick={
                                    ()=>{
                                      acceptHandler(e);
                                    }
                                  } style={{backgroundColor:"green" , color:"white", padding:"4px" , cursor:"pointer"  }} >Accept </p>
                                  <p onClick={()=>{
                                    rejectHandler(e);
                                  }} style={{backgroundColor:"red" , color:"white", padding:"4px"  , cursor:"pointer" }} >Reject</p>

                               </div>

                              </div>

                              <button
                                onClick={()=>{
                                  setFormdata((prev)=>({
                                    ...prev ,
                                    
                                      reason: e.reason , 
                                      leaveType: e.leaveType ,
                                      employeeName: e?.user?.fullName , 
                                      start: e.from , 
                                      end: e.to , 
                                      id: e._id
                                    
                                  }))
                                  setStar1((prev)=>!prev);
                                }}
                                id="dropdownMenuIconButton2222"
                                data-dropdown-toggle="dropdownDots2222"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                  />
                                </svg>
                              </button>

                              <button
                               onClick={()=>deleteLeaveRequest(e?._id)}
                                id="dropdownMenuIconButton2222"
                                data-dropdown-toggle="dropdownDots2222"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </button>
  
                              <div
                                id="dropdownDots2222"
                                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                              >
                                <ul
                                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                  aria-labelledby="dropdownMenuIconButton2222"
                                >
                                  <li>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Dashboard
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Settings
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Earnings
                                    </a>
                                  </li>
                                </ul>
                                <div className="py-2">
                                  <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                  >
                                    Separated link
                                  </a>
                                </div>
                              </div>
                            
                          </td>

                        </tr>
                        )
                      })}
               

                      {/* <tr className="bg-white border-b  ">
                        <th scope="row" className="px-3 py-4 font-medium  whitespace-nowrap taskAns ">
                          <div className="flex items-center checkbox_ss ">
                            <input
                              disabled=""
                              id="disabled-checkbox"
                              type="checkbox"
                              defaultValue=""
                              className=" text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="disabled-checkbox"

                            >
                              Surbhi Rajwanshi
                            </label>
                          </div>
                        </th>
                        <td className="px-3 py-4 taskAns">
                          JAN25, 2024
                        </td>
                        <td className="px-3 py-4 taskAns">
                          Two Days
                        </td>
                        <td className="px-3 py-4 taskAns">
                          Sick Leave
                        </td>
                        <td className="px-3 py-4 taskAns">
                          ----
                        </td>
                        <td className="px-3 py-4 taskAns">
                          Sick Leave
                        </td>
                        <td className="px-3 py-4 taskAns">
                          <button
                            type="button"
                            className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                          >
                            Yellow
                          </button>

                        </td>
                        <td className="px-3 py-4 taskAns">
                          <div className="ACTIVITYsss">
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.66536 13.9998H10.332V12.3332H3.66536V13.9998ZM3.66536 10.6665H10.332V8.99984H3.66536V10.6665ZM1.9987 17.3332C1.54036 17.3332 1.148 17.17 0.821615 16.8436C0.495226 16.5172 0.332031 16.1248 0.332031 15.6665V2.33317C0.332031 1.87484 0.495226 1.48248 0.821615 1.15609C1.148 0.829698 1.54036 0.666504 1.9987 0.666504H8.66536L13.6654 5.6665V15.6665C13.6654 16.1248 13.5022 16.5172 13.1758 16.8436C12.8494 17.17 12.457 17.3332 11.9987 17.3332H1.9987ZM7.83203 6.49984V2.33317H1.9987V15.6665H11.9987V6.49984H7.83203Z" fill="#293240" />
                            </svg>
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.49967 13.6668C7.23579 13.6668 6.99967 13.5904 6.79134 13.4377C6.58301 13.2849 6.43023 13.0904 6.33301 12.8543L4.41634 7.8335H0.833008V6.16683H5.58301L7.49967 11.2502L11.333 1.146C11.4302 0.909885 11.583 0.715441 11.7913 0.562663C11.9997 0.409885 12.2358 0.333496 12.4997 0.333496C12.7636 0.333496 12.9997 0.409885 13.208 0.562663C13.4163 0.715441 13.5691 0.909885 13.6663 1.146L15.583 6.16683H19.1663V7.8335H14.4163L12.4997 2.75016L8.66634 12.8543C8.56912 13.0904 8.41634 13.2849 8.20801 13.4377C7.99968 13.5904 7.76356 13.6668 7.49967 13.6668Z" fill="#293240" />
                            </svg></div>
                        </td>

                        <td className="px-6 py-4  flex items-center hiii_gap">
                          <>
                            <button
                              id="dropdownMenuIconButton2222"
                              data-dropdown-toggle="dropdownDots2222"
                              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                              type="button"
                            >
                              <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 4 15"
                              >
                                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                              </svg>
                            </button>
                            <div
                              id="dropdownDots2222"
                              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                            >
                              <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconButton2222"
                              >
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Dashboard
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Settings
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Earnings
                                  </a>
                                </li>
                              </ul>
                              <div className="py-2">
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                  Separated link
                                </a>
                              </div>
                            </div>
                          </>

                        </td>

                      </tr>
                      <tr className="bg-white border-b  ">
                        <th scope="row" className="px-3 py-4 font-medium  whitespace-nowrap taskAns ">
                          <div className="flex items-center checkbox_ss ">
                            <input
                              disabled=""
                              id="disabled-checkbox"
                              type="checkbox"
                              defaultValue=""
                              className=" text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="disabled-checkbox"

                            >
                              Surbhi Rajwanshi
                            </label>
                          </div>
                        </th>
                        <td className="px-3 py-4 taskAns">
                          JAN25, 2024
                        </td>
                        <td className="px-3 py-4 taskAns">
                          Two Days
                        </td>
                        <td className="px-3 py-4 taskAns">
                          Sick Leave
                        </td>
                        <td className="px-3 py-4 taskAns">
                          ----
                        </td>
                        <td className="px-3 py-4 taskAns">
                          Sick Leave
                        </td>
                        <td className="px-3 py-4 taskAns">
                          <button
                            type="button"
                            className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                          >
                            Yellow
                          </button>

                        </td>
                        <td className="px-3 py-4 taskAns">
                          <div className="ACTIVITYsss">
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.66536 13.9998H10.332V12.3332H3.66536V13.9998ZM3.66536 10.6665H10.332V8.99984H3.66536V10.6665ZM1.9987 17.3332C1.54036 17.3332 1.148 17.17 0.821615 16.8436C0.495226 16.5172 0.332031 16.1248 0.332031 15.6665V2.33317C0.332031 1.87484 0.495226 1.48248 0.821615 1.15609C1.148 0.829698 1.54036 0.666504 1.9987 0.666504H8.66536L13.6654 5.6665V15.6665C13.6654 16.1248 13.5022 16.5172 13.1758 16.8436C12.8494 17.17 12.457 17.3332 11.9987 17.3332H1.9987ZM7.83203 6.49984V2.33317H1.9987V15.6665H11.9987V6.49984H7.83203Z" fill="#293240" />
                            </svg>
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.49967 13.6668C7.23579 13.6668 6.99967 13.5904 6.79134 13.4377C6.58301 13.2849 6.43023 13.0904 6.33301 12.8543L4.41634 7.8335H0.833008V6.16683H5.58301L7.49967 11.2502L11.333 1.146C11.4302 0.909885 11.583 0.715441 11.7913 0.562663C11.9997 0.409885 12.2358 0.333496 12.4997 0.333496C12.7636 0.333496 12.9997 0.409885 13.208 0.562663C13.4163 0.715441 13.5691 0.909885 13.6663 1.146L15.583 6.16683H19.1663V7.8335H14.4163L12.4997 2.75016L8.66634 12.8543C8.56912 13.0904 8.41634 13.2849 8.20801 13.4377C7.99968 13.5904 7.76356 13.6668 7.49967 13.6668Z" fill="#293240" />
                            </svg></div>
                        </td>

                        <td className="px-6 py-4  flex items-center hiii_gap">
                          <>
                            <button
                              id="dropdownMenuIconButton2222"
                              data-dropdown-toggle="dropdownDots2222"
                              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                              type="button"
                            >
                              <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 4 15"
                              >
                                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                              </svg>
                            </button>
                          
                            <div
                              id="dropdownDots2222"
                              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                            >
                              <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconButton2222"
                              >
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Dashboard
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Settings
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Earnings
                                  </a>
                                </li>
                              </ul>
                              <div className="py-2">
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                  Separated link
                                </a>
                              </div>
                            </div>
                          </>

                        </td>

                      </tr>
                      <tr className="bg-white border-b  ">
                        <th scope="row" className="px-3 py-4 font-medium  whitespace-nowrap taskAns ">
                          <div className="flex items-center checkbox_ss ">
                            <input
                              disabled=""
                              id="disabled-checkbox"
                              type="checkbox"
                              defaultValue=""
                              className=" text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="disabled-checkbox"

                            >
                              Surbhi Rajwanshi
                            </label>
                          </div>
                        </th>
                        <td className="px-3 py-4 taskAns">
                          JAN25, 2024
                        </td>
                        <td className="px-3 py-4 taskAns">
                          Two Days
                        </td>
                        <td className="px-3 py-4 taskAns">
                          Sick Leave
                        </td>
                        <td className="px-3 py-4 taskAns">
                          ----
                        </td>
                        <td className="px-3 py-4 taskAns">
                          Sick Leave
                        </td>
                        <td className="px-3 py-4 taskAns">
                          <button
                            type="button"
                            className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                          >
                            Yellow
                          </button>

                        </td>
                        <td className="px-3 py-4 taskAns">
                          <div className="ACTIVITYsss">
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.66536 13.9998H10.332V12.3332H3.66536V13.9998ZM3.66536 10.6665H10.332V8.99984H3.66536V10.6665ZM1.9987 17.3332C1.54036 17.3332 1.148 17.17 0.821615 16.8436C0.495226 16.5172 0.332031 16.1248 0.332031 15.6665V2.33317C0.332031 1.87484 0.495226 1.48248 0.821615 1.15609C1.148 0.829698 1.54036 0.666504 1.9987 0.666504H8.66536L13.6654 5.6665V15.6665C13.6654 16.1248 13.5022 16.5172 13.1758 16.8436C12.8494 17.17 12.457 17.3332 11.9987 17.3332H1.9987ZM7.83203 6.49984V2.33317H1.9987V15.6665H11.9987V6.49984H7.83203Z" fill="#293240" />
                            </svg>
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.49967 13.6668C7.23579 13.6668 6.99967 13.5904 6.79134 13.4377C6.58301 13.2849 6.43023 13.0904 6.33301 12.8543L4.41634 7.8335H0.833008V6.16683H5.58301L7.49967 11.2502L11.333 1.146C11.4302 0.909885 11.583 0.715441 11.7913 0.562663C11.9997 0.409885 12.2358 0.333496 12.4997 0.333496C12.7636 0.333496 12.9997 0.409885 13.208 0.562663C13.4163 0.715441 13.5691 0.909885 13.6663 1.146L15.583 6.16683H19.1663V7.8335H14.4163L12.4997 2.75016L8.66634 12.8543C8.56912 13.0904 8.41634 13.2849 8.20801 13.4377C7.99968 13.5904 7.76356 13.6668 7.49967 13.6668Z" fill="#293240" />
                            </svg></div>
                        </td>

                        <td className="px-6 py-4  flex items-center hiii_gap">
                          <>
                            <button
                              id="dropdownMenuIconButton2222"
                              data-dropdown-toggle="dropdownDots2222"
                              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                              type="button"
                            >
                              <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 4 15"
                              >
                                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                              </svg>
                            </button>
                            
                            <div
                              id="dropdownDots2222"
                              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                            >
                              <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconButton2222"
                              >
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Dashboard
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Settings
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Earnings
                                  </a>
                                </li>
                              </ul>
                              <div className="py-2">
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                  Separated link
                                </a>
                              </div>
                            </div>
                          </>

                        </td>

                      </tr>
                      <tr className="bg-white border-b  ">
                        <th scope="row" className="px-3 py-4 font-medium  whitespace-nowrap taskAns ">
                          <div className="flex items-center checkbox_ss ">
                            <input
                              disabled=""
                              id="disabled-checkbox"
                              type="checkbox"
                              defaultValue=""
                              className=" text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="disabled-checkbox"

                            >
                              Surbhi Rajwanshi
                            </label>
                          </div>
                        </th>
                        <td className="px-3 py-4 taskAns">
                          JAN25, 2024
                        </td>
                        <td className="px-3 py-4 taskAns">
                          Two Days
                        </td>
                        <td className="px-3 py-4 taskAns">
                          Sick Leave
                        </td>
                        <td className="px-3 py-4 taskAns">
                          ----
                        </td>
                        <td className="px-3 py-4 taskAns">
                          Sick Leave
                        </td>
                        <td className="px-3 py-4 taskAns">
                          <button
                            type="button"
                            className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                          >
                            Yellow
                          </button>

                        </td>
                        <td className="px-3 py-4 taskAns">
                          <div className="ACTIVITYsss">
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.66536 13.9998H10.332V12.3332H3.66536V13.9998ZM3.66536 10.6665H10.332V8.99984H3.66536V10.6665ZM1.9987 17.3332C1.54036 17.3332 1.148 17.17 0.821615 16.8436C0.495226 16.5172 0.332031 16.1248 0.332031 15.6665V2.33317C0.332031 1.87484 0.495226 1.48248 0.821615 1.15609C1.148 0.829698 1.54036 0.666504 1.9987 0.666504H8.66536L13.6654 5.6665V15.6665C13.6654 16.1248 13.5022 16.5172 13.1758 16.8436C12.8494 17.17 12.457 17.3332 11.9987 17.3332H1.9987ZM7.83203 6.49984V2.33317H1.9987V15.6665H11.9987V6.49984H7.83203Z" fill="#293240" />
                            </svg>
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.49967 13.6668C7.23579 13.6668 6.99967 13.5904 6.79134 13.4377C6.58301 13.2849 6.43023 13.0904 6.33301 12.8543L4.41634 7.8335H0.833008V6.16683H5.58301L7.49967 11.2502L11.333 1.146C11.4302 0.909885 11.583 0.715441 11.7913 0.562663C11.9997 0.409885 12.2358 0.333496 12.4997 0.333496C12.7636 0.333496 12.9997 0.409885 13.208 0.562663C13.4163 0.715441 13.5691 0.909885 13.6663 1.146L15.583 6.16683H19.1663V7.8335H14.4163L12.4997 2.75016L8.66634 12.8543C8.56912 13.0904 8.41634 13.2849 8.20801 13.4377C7.99968 13.5904 7.76356 13.6668 7.49967 13.6668Z" fill="#293240" />
                            </svg></div>
                        </td>

                        <td className="px-6 py-4  flex items-center hiii_gap">
                          <>
                            <button
                              id="dropdownMenuIconButton2222"
                              data-dropdown-toggle="dropdownDots2222"
                              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                              type="button"
                            >
                              <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 4 15"
                              >
                                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                              </svg>
                            </button>
                            <div
                              id="dropdownDots2222"
                              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                            >
                              <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconButton2222"
                              >
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Dashboard
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Settings
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Earnings
                                  </a>
                                </li>
                              </ul>
                              <div className="py-2">
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                  Separated link
                                </a>
                              </div>
                            </div>
                          </>

                        </td>

                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </main>
            </div>
          </div>

     
     {/* this is edit form of leave rqeuest  */}
            <div
            style={styleThing}
            id="authentication-modal"
            tabindex="-1"
            aria-hidden="true"
            class="user_class hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center mt-10 md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="relative p-4 w-full max-w-md max-h-full">
              {/* <!-- Modal content --> */}
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Create Leave Request
                  </h3>
                </div>
                {/* <!-- Modal body --> */}
                <div class="p-4 md:p-5">

                  <form  className="space-y-4" action="#">

                    <div class="mt-2 user_class_input">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Employee Name
                      </label>

                      <input
           value={formdata.employeeName}
           onChange={changeHandler}
             disabled
                        type="text"
                        name="employeeName"
                        id="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter the name"
                        required
                      />
                    </div>

                    <div class="mt-2 user_class_input">
                      <label
                        for="text"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Leave type
                      </label>
                      <input
                      value={formdata.leaveType}
                      disabled
                      onChange={changeHandler}
                        type="text"
                        name="leaveType"
                        id="text"
                        placeholder="Enter your leave type"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <div className="flex justify-between w-full">
                      <div class="user_class_input w-full mt-2 ">
                        <label
                          for="text"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Start
                        </label>
                        <input
                         value={formdata.start}
                         onChange={changeHandler}
                          type="date"
                          name="start"
                          id="text"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                      <div class="user_class_input w-full ml-2  mt-2">
                        <label
                          for="text"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          End
                        </label>
                        <input
                         value={formdata.end}
                          onChange={changeHandler}
                          type="date"
                          name="end"
                          id="text"
                          class="black bg-indigo-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                        />
                      </div>
                      
                    </div>

                    <div class="user_class_input">
                        <label
                          for="message"
                          class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Reason
                        </label>
                        <textarea
                        required
                        name="reason"
                        onChange={changeHandler}
                        value={formdata.reason}
                          id="message"
                          rows="4"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter your reason..."
                        ></textarea>
                      </div>

                    <button
                      onClick={(e) =>{
                        
                        e.preventDefault();
                       
                       submitHandler(e);
                      }}
                      type="button" 
                      class="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      send
                    </button>

                    <button
                      onClick={(e) =>{
                        
                      setStar1(false);
                      }}
                      type="button" 
                      class="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Cancel
                    </button>

                  </form>

                </div>
              </div>
            </div>
          </div>
           
           
           {/* } */}


        </div>
      </div>
    </>
  );
};

export default LeaveRequest;
