import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import bran from "../../images/hub_FILL0_wght400_GRAD0_opsz24 1.png"
import deleted from "../../images/deleted.png";
import edited from "../../images/edited.png";
import textType from "../../images/Text Type.png";
import hub  from "../../images/hub2.png"
import hub2 from "../../images/work_FILL0_wght400_GRAD0_opsz24 1.png"
import hub3 from "../../images/hub3.png"
import frame1 from "../../images/Frame 9688.png"
import cross1 from "../../images/cross1.png"
import toast from "react-hot-toast";
import plus from "../../images/pluss.png"
import Selectmultidropdown from "./MultiSelect";

const sidebarItem = [

  {
    title: "Lead Status",
    img: hub3,
    tableData: [
      {
        title: "Status",
      },
      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Industry",
    img: hub3,
    tableData: [
      {
        title: "Industry",
      },
     
      {
        title: "ACTION",
      },
    ],
  },
];

const LeadSystemSetting = ({ setAlert, pop, setPop }) => {
  const { user, getBranchs, deleteBranch, getDepartments, deleteDepartment, getDesignations, deleteDesignation, getLeaveTypes, deleteLeaveType   , fetchAllDocs  , postLeadStatus ,postLeadSource2 ,AllLeadStatus ,AllLeadSource} = useMain();

  const [open, setOpen] = useState(0);

  const [popup, setPopup] = useState(false);

  const styleing = {
    display: popup ? "block" : "none",
  };

   const [allStatus , setAllStatus] = useState([]);
   const [allSource , setAllSource] = useState([]);

  const fetchAllStatus = async()=>{
    const ans  = await AllLeadStatus();
    setAllStatus(ans?.data);

  }
  const fetchAllSource = async()=>{
    const ans  = await AllLeadSource();
    setAllSource(ans?.data);

  }

  useEffect(()=>{
    fetchAllStatus();
    fetchAllSource();

  },[])


  const [popup5, setPopup5] = useState(false);
  const [popup6, setPopup6] = useState(false);
  const [popup41, setPopup41] = useState(false);

  const [id, setId] = useState('');
  const [branches, setBranches] = useState([]);
  const [branches1, setBranches1] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departments1, setDepartments1] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [designations1, setDesignations1] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveTypes1, setLeaveTypes1] = useState([]);

  const [leadStatus, setLeadStatus] = useState({
    status: "",
   
  });
  const [leadSource, setLeadSource] = useState({
    status: "",
   
  });

  const [leaveTypeValue1, setLeaveTypeValue1] = useState({
    name: "",
    days: ""
  });
  const [refreshFlag, setRefreshFlag] = useState(false);


  const getData = async () => {
    const ans1 = await getBranchs();
    const ans2 = await getDepartments();
    const ans3 = await getDesignations();
    const ans4 = await getLeaveTypes();
    setBranches(ans1?.data);
    setBranches1(ans1?.data);
    setDepartments(ans2?.data);
    setDepartments1(ans2?.data);
    setDesignations(ans3?.data);
    setDesignations1(ans3?.data);
    setLeaveTypes(ans4?.data);
    setLeaveTypes1(ans4?.data);
  };

  useEffect(() => {
    getData();
  }, [refreshFlag]);



  const handleCreateLeadStatus = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await postLeadStatus({
      status: leadStatus?.status,
    });

    if (ans.status) {
      toast.success("success");
      fetchAllStatus();
      setLeadStatus("");
      setPopup5(false);
    }
   
    toast.dismiss(toastId);
  }
  

  const handleCreateLeadSource = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await postLeadSource2({
      status: leadSource?.status,
    });



    if (ans.status) {
      toast.success("success");
      fetchAllSource();
      setLeadSource("");
      setPopup6(false);
    }
   
    toast.dismiss(toastId);
  }
  





  const handleDelete = async (id, type) => {
    const toastId = toast.loading("Loading...");
    let ans;
    if (type === 'branch') {
      ans = await deleteBranch(id);
    }
    else if (type === 'department') {
      ans = await deleteDepartment(id);
    }
    else if (type === 'designation') {
      ans = await deleteDesignation(id);
    }
    else if (type === 'leaveType') {
      ans = await deleteLeaveType(id);
    }

    if (ans.success) {
      toast.success(ans.message);
      setRefreshFlag(!refreshFlag);
    } else {
      toast.success("something went wrong");
    }

    toast.dismiss(toastId);
  };

  const [allDocs , setAllDocs] = useState([]);

  const getDocs = async()=>{
    const ans = await fetchAllDocs();
    setAllDocs(ans?.data);
     }



 const [isUpdate , setIsUpdate] = useState(false);



 useEffect(()=>{
    getDocs();
 },[])

 console.log("op 5 ",popup5 , "6b " , popup6);

  return (
    <>
      <div className="employee-dash h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />

          <div className="em">
            <div className="flex-col">
              <div className="admin-main">

                 <div className="plusSec">
                  <h3>Lead System Setting</h3>
                  <button  onClick={() => {

                    console.log("optin" , open);
                     
                       if(open === 0){
                        setPopup5(true);
                      }
                      else if(open === 1){
                        setPopup6(true);
                      }
                    }}><img src={textType} alt="" /> <span>Add New</span></button>
                 </div>

                <div className="hrmssystemsetup-parents">
                  <div className="hrmssystemsetup-rightmenu">
                    {sidebarItem.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => setOpen(index)}
                        className={`hrmsystemsetup-subrightmenu ${open === index && "openItem"
                          } `}
                      >
                         <img src={item.img} alt="" />
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>

                
                  {open === 0 && (
                    <div className="hrmsystemsetup-leftmenu">
                      <div className="hrmsystemsetup-container">

                      <div className="hrmsystemsetup-pagination">
                               {/* <img src={frame1} alt="" /> */}
                              <span>Lead Status</span>
                       
                        </div>

                        <div className="relative overflow-x-auto">
                          <table className="w-full table3 text-left   text-[#060606]">
                            <thead className=" uppercase text-[#060606]">
                              <tr>
                                {sidebarItem[open].tableData.map(
                                  (item, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className="px-6 py-3"
                                    >
                                      {item.title}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {allStatus.length === 0 ? 'No data found' : allStatus.map((item, index) => (
                                <tr key={index} className="bg-white ">
                                  <td className="px-6 py-4 tabl3Titl">{item?.name}</td>
                                  {/* <td className="px-6 py-4 tabl3Titl">{item?.days}</td> */}
                                  <td className="px-6 py-4 flex hrmActions">
                                    <img className="cursor-pointer" onClick={() => {
                                      setLeaveTypeValue1({
                                        days: item?.days,
                                        name: item?.name
                                      });
                                      setId(item?._id);
                                      setPopup41(true);
                                    }} src={edited} alt="" />
                                    <img className="cursor-pointer" onClick={() => {
                                      handleDelete(item._id, 'leaveType');
                                    }} src={deleted} alt="" />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                    {open === 1 && (
                    <div className="hrmsystemsetup-leftmenu">
                      <div className="hrmsystemsetup-container">

                      <div className="hrmsystemsetup-pagination">
                              <span>Industry</span>
                       
                        </div>

                        <div className="relative overflow-x-auto">
                          <table className="w-full table3 text-left   text-[#060606]">
                            <thead className=" uppercase text-[#060606]">
                              <tr>
                                {sidebarItem[open].tableData.map(
                                  (item, index) => (
                                    <th
                                      key={index}
                                      scope="col"
                                      className="px-6 py-3"
                                    >
                                      {item.title}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>

                            <tbody>
                              {allSource?.length === 0 ? 'No data found' : allSource?.map((item, index) => (
                                <tr key={index} className="bg-white ">
                                  <td className="px-6 py-4 tabl3Titl">{item?.name}</td>
                                  {/* <td className="px-6 py-4 tabl3Titl">{item?.days}</td> */}
                                  <td className="px-6 py-4 flex hrmActions">
                                    <img className="cursor-pointer" onClick={() => {
                                      setLeaveTypeValue1({
                                        days: item?.days,
                                        name: item?.name
                                      });
                                      setId(item?._id);
                                      setPopup41(true);
                                    }} src={edited} alt="" />
                                    <img className="cursor-pointer" onClick={() => {
                                      handleDelete(item._id, 'leaveType');
                                    }} src={deleted} alt="" />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
              
                </div>


      

                <>
              
                  {/* Main modal */}

                  <div
                    style={styleing}
                    tabIndex={-1}
                    aria-hidden="true"
                    className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                  >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
=                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
=
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Terms of Service
                          </h3>

                          {/* <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="default-modal"
                          >
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button> */}
                        </div>
                        {/* Modal body */}
                        <div className="p-4 md:p-5 space-y-4">
                          <label>Name:</label>
                          <input type="text" name="" id="" />
                          {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European
                            Union enacts new consumer privacy laws for its
                            citizens, companies around the world are updating
                            their terms of service agreements to comply.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection
                            Regulation (G.D.P.R.) goes into effect on May 25 and
                            is meant to ensure a common set of data rights in
                            the European Union. It requires organizations to
                            notify users as soon as possible of high-risk data
                            breaches that could personally affect them.
                          </p> */}
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                          <button
                            onClick={() => setPopup(false)}
                            data-modal-hide="default-modal"
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => setPopup(false)}
                            data-modal-hide="default-modal"
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </>

              </div>
            </div>
          </div>
          
        </div>

   


{popup5 && (
          <div className="allPopupWrap">
            <div className="popup1 popup5 pono2">
              <div className="popNav">

<h2>Create New Lead Status</h2>
<img onClick={() => setPopup5(false)} src={cross1} alt="" />

        </div>
              <hr />
              <label >
                <p className="popTitl">Lead Status</p>

                <input type="text" placeholder="Enter Lead Status" name="status" value={leadStatus?.status} onChange={(e) => {
                  setLeadStatus({ ...leadStatus, [e.target.name]: e.target.value });
                }} />
              
              </label>

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup5(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleCreateLeadStatus}>
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}


{popup6 && (
          <div className="allPopupWrap">
            <div className="popup1 popup5 pono2">
              <div className="popNav">

<h2>Create New Industry</h2>
<img onClick={() => setPopup6(false)} src={cross1} alt="" />

        </div>
              <hr />
              <label >
                <p className="popTitl">Industry</p>

                <input type="text" placeholder="Enter Industry" name="status" value={leadSource?.status} onChange={(e) => {
                  setLeadSource({ ...leadSource, [e.target.name]: e.target.value });
                }} />
              
              </label>

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup6(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleCreateLeadSource}>
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );

}
export default LeadSystemSetting;