import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import deleted from "../../images/deleted.png";
import edited from "../../images/edited.png";
import textType from "../../images/Text Type.png";
import hub3 from "../../images/hub3.png"
import cross1 from "../../images/cross1.png"
import toast from "react-hot-toast";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";

const sidebarItem = [

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
  {
    title: "Lead Source",
    img: hub3,
    tableData: [
      {
        title: "Source",
      },
     
      {
        title: "ACTION",
      },
    ],
  },
];

const LeadSystemSetting2 = ({ setAlert, pop, setPop }) => {
  const { user, getBranchs, getDepartments, getDesignations, getLeaveTypes   , fetchAllDocs  , postLeadStatus ,postLeadSource2 ,AllLeadStatus ,AllLeadSource   ,UpdateLeadStatus  ,UpdateLeadSource , deleteIndustry , deleteLeadSource} = useMain();

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

  const UpdateLeadStatus1 = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await UpdateLeadStatus({
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

  const UpdateLeadSource1 = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await UpdateLeadSource({
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


  const [allDocs , setAllDocs] = useState([]);

  const getDocs = async()=>{
    const ans = await fetchAllDocs();
    setAllDocs(ans?.data);
     }

 useEffect(()=>{
    getDocs();
 },[])

 const deleteIndustryHandler = async(id)=>{
  const ans =await deleteIndustry(id);
  if(ans?.success){
    toast.success('Delete Succesfuly');
    fetchAllStatus();

  }
 }

 const deleteLeadSourceHandler = async(id)=>{
  const ans =await deleteLeadSource(id);
  if(ans?.success){
    toast.success('Delete Succesfuly');
    fetchAllSource();

  }
 }

  return (
    <>
      <div className="employee-dash h-full">
        <EmployeeSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          
          <EmployeeNavbar user={user} setAlert={setAlert} />

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
                              {allStatus.length === 0 ? 'No data found' : allStatus.map((item, index) => (
                                <tr key={index} className="bg-white ">
                                  <td className="px-6 py-4 tabl3Titl">{item?.name}</td>
                                  <td className="px-6 py-4 flex hrmActions">
                                    <img className="cursor-pointer"  src={edited} alt="" />
                                    <img className="cursor-pointer" onClick={(e)=>{
                                            deleteIndustryHandler(item?._id);
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
                              <span>Lead Source</span>
                       
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
                                  <td className="px-6 py-4 flex hrmActions">
                                    <img className="cursor-pointer"  src={edited} alt="" />
                                    <img className="cursor-pointer" onClick={()=>{deleteLeadSourceHandler(item?._id)}} src={deleted} alt="" />
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

                        
                        </div>
                        {/* Modal body */}
                        <div className="p-4 md:p-5 space-y-4">
                          <label>Name:</label>
                          <input type="text" name="" id="" />
                      
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

<h2>Create New Industry</h2>
<img onClick={() => setPopup5(false)} src={cross1} alt="" />

        </div>
              <hr />
              <label >
                <p className="popTitl">Industry</p>

                <input type="text" placeholder="Enter Industry" name="status" value={leadStatus?.status} onChange={(e) => {
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

<h2>Create New Lead Source</h2>
<img onClick={() => setPopup6(false)} src={cross1} alt="" />

        </div>
              <hr />
              <label >
                <p className="popTitl">Lead Source</p>

                <input type="text" placeholder="Enter Lead Source" name="status" value={leadSource?.status} onChange={(e) => {
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
export default LeadSystemSetting2;