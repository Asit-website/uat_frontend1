import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import chevron from "../../images/chevron_right.png";
import { useMain } from "../../../hooks/useMain";

import "./award.css";

import plusIcon from "../../images/plusIcon.png";

const sidebarItem = [
  {
    title: "Branch",
    tableData: [
      {
        title: "TYPE",
      },
      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Department",
    tableData: [
      {
        title: "BRANCH",
      },
      {
        title: "DEPARTMENT",
      },
      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Designation",
    tableData: [
      {
        title: "DEPARTMENT",
      },
      {
        title: "DESIGNATION",
      },
      {
        title: "ACTION",
      },
    ],
  },
  {
    title: "Leave Type",
    tableData: [
      {
        title: "Leave Type",
      },
      {
        title: "Days/Year",
      },
      {
        title: "ACTION",
      },
    ],
  },
];

const HRMsystemSetup = ({ setAlert, pop, setPop }) => {
  const { user, getBranchs, postBranch, updateBranch, deleteBranch, getDepartments, postDepartment, updateDepartment, deleteDepartment, getDesignations, postDesignation, updateDesignation, deleteDesignation, postLeaveType, updateLeaveType, getLeaveTypes, deleteLeaveType } = useMain();

  const [value, onChange] = useState(new Date());
  const [gen, setGen] = useState([]);
  const [flag, setFlag] = useState();

  const [open, setOpen] = useState(0);

  const [popup, setPopup] = useState(false);

  const styleing = {
    display: popup ? "block" : "none",
  };

  useEffect(() => {
    // getData();
  }, []);
  // console.log(gen.concat().toString.caller.arguments());
  // const getData = async () => {

  // };

  const data1 = [
    {
      type: "Head office",
    },
    {
      type: "Head office",
    },
    {
      type: "Head office",
    },
  ];

  const data2 = [
    {
      branch: "Head office",
      department: "Admin",
    },
    {
      branch: "Head office",
      department: "Admin",
    },
    {
      branch: "Head office",
      department: "Admin",
    },
  ];

  const data3 = [
    {
      department: "Head office",
      designation: "Admin",
    },
    {
      department: "Head office",
      designation: "Admin",
    },
    {
      department: "Head office",
      designation: "Admin",
    },
  ];

  const [popup1, setPopup1] = useState(false);
  const [popup11, setPopup11] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [popup21, setPopup21] = useState(false);
  const [popup3, setPopup3] = useState(false);
  const [popup31, setPopup31] = useState(false);
  const [popup4, setPopup4] = useState(false);
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
  const [branch, setBranch] = useState("");
  const [branch1, setBranch1] = useState("");
  const [departmentValue, setDepartmentValue] = useState({
    branch: "",
    name: "",
  });
  const [leaveTypeValue, setLeaveTypeValue] = useState({
    name: "",
    days: ""
  });
  const [designationValue, setDesignationValue] = useState({
    department: "",
    name: "",
  });
  const [departmentValue1, setDepartmentValue1] = useState({
    branch: "",
    name: "",
  });
  const [designationValue1, setDesignationValue1] = useState({
    department: "",
    name: "",
  });
  const [leaveTypeValue1, setLeaveTypeValue1] = useState({
    name: "",
    days: ""
  });
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    getData();
  }, [refreshFlag]);

  const getData = async () => {
    const ans1 = await getBranchs();
    const ans2 = await getDepartments();
    const ans3 = await getDesignations();
    const ans4 = await getLeaveTypes();
    setBranches(ans1.data);
    setBranches1(ans1.data);
    setDepartments(ans2.data);
    setDepartments1(ans2.data);
    setDesignations(ans3.data);
    setDesignations1(ans3.data);
    setLeaveTypes(ans4.data);
    setLeaveTypes1(ans4.data);
  };

  const handleCreateBranch = async () => {
    const ans = await postBranch({ name: branch });
    console.log(ans);
    if (ans.success) {
      alert(ans.message);
      setBranch("");
      setRefreshFlag(!refreshFlag);
      setPopup1(false);
    } else {
      alert("something went wrong");
    }
  };

  const handleUpdateBranch = async () => {
    const ans = await updateBranch({ name: branch1, id });
    console.log(ans);
    if (ans.success) {
      alert(ans.message);
      setBranch1("");
      setRefreshFlag(!refreshFlag);
      setPopup11(false);
    } else {
      alert("something went wrong");
    }
  };

  const handleCreateDepartment = async () => {
    // console.log(departmentValue);
    const ans = await postDepartment({
      name: departmentValue.name,
      branch: branches.find(x => x._id === departmentValue.branch),
    });
    console.log(ans);
    if (ans.success) {
      setDepartmentValue({
        name: '',
        branch: ''
      });
      alert(ans.message);
      setRefreshFlag(!refreshFlag);
      setPopup2(false);
    } else {
      alert("something went wrong");
    }
  };

  const handleCreateDesignation = async () => {
    // console.log(designationValue);
    const ans = await postDesignation({
      name: designationValue.name,
      department: departments.find(x => x._id === designationValue.department)
    });
    console.log(ans);
    if (ans.success) {
      alert(ans.message);
      setDesignationValue({
        name: '',
        department: ''
      });
      setRefreshFlag(!refreshFlag);
      setPopup3(false);
    } else {
      alert("something went wrong");
    }
  };

  const handleCreateLeaveType = async () => {
    const ans = await postLeaveType({
      days: leaveTypeValue?.days,
      name: leaveTypeValue?.name
    });
    console.log(ans);
    if (ans.success) {
      alert(ans.message);
      setLeaveTypeValue({
        name: '',
        days: ''
      });
      setRefreshFlag(!refreshFlag);
      setPopup4(false);
    } else {
      alert("something went wrong");
    }
  };

  const handleUpdateDepartment = async () => {
    // console.log(departmentValue);
    const ans = await updateDepartment({
      id,
      name: departmentValue1?.name,
      branch: branches?.find(x => x?._id === departmentValue1?.branch),
    });
    console.log(ans);
    if (ans.success) {
      setDepartmentValue1({
        name: '',
        branch: ''
      });
      alert(ans.message);
      setRefreshFlag(!refreshFlag);
      setPopup21(false);
    } else {
      alert("something went wrong");
    }
  };

  const handleUpdateDesignation = async () => {
    // console.log(designationValue);
    const ans = await updateDesignation({
      id,
      name: designationValue1?.name,
      department: departments?.find(x => x?._id === designationValue1?.department)
    });
    console.log(ans);
    if (ans.success) {
      alert(ans.message);
      setDesignationValue1({
        name: '',
        department: ''
      });
      setRefreshFlag(!refreshFlag);
      setPopup31(false);
    } else {
      alert("something went wrong");
    }
  };

  const handleUpdateLeaveType = async () => {
    const ans = await updateLeaveType({
      id,
      days: leaveTypeValue1?.days,
      name: leaveTypeValue1?.name
    });
    console.log(ans);
    if (ans.success) {
      alert(ans.message);
      setLeaveTypeValue1({
        name: '',
        days: ''
      });
      setRefreshFlag(!refreshFlag);
      setPopup41(false);
    } else {
      alert("something went wrong");
    }
  };

  const handleDelete = async (id, type) => {
    let ans;
    console.log(id, type);
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
    console.log(ans);

    if (ans.success) {
      alert(ans.message);
      setRefreshFlag(!refreshFlag);
    } else {
      alert("something went wrong");
    }
  };

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
                    <h2 className="hrmShed">Manage Termination</h2>

                    <div className="hrmDoHe">
                      <p>Dashboard</p>
                      <img src={chevron} alt="" />
                      <span>Termination</span>
                    </div>
                  </div>


                  <img
                    onClick={() => {
                      if (open === 0) {
                        setPopup1(true);
                      } else if (open === 1) {
                        setPopup2(true);
                      } else if (open === 2) {
                        setPopup3(true);
                      } else if (open === 3) {
                        setPopup4(true);
                      }
                    }}
                    className="plusiCON"
                    src={plusIcon}
                    alt=""
                  />
                </div>

                <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
               <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                   <tr>
                     <th scope="col" className="px-6 py-3">
                       EMPLOYEE NAME
                     </th>
                     <th scope="col" className="px-6 py-3">
                       <div className="flex items-center">
                         TERMINATION TYPE
                         <a href="#">
                           <svg
                             className="w-3 h-3 ms-1.5"
                             aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                           >
                             <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                           </svg>
                         </a>
                       </div>
                     </th>
                     <th scope="col" className="px-6 py-3">
                       <div className="flex items-center">
                         NOTICE DATE
                         <a href="#">
                           <svg
                             className="w-3 h-3 ms-1.5"
                             aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                           >
                             <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                           </svg>
                         </a>
                       </div>
                     </th>
                     <th scope="col" className="px-6 py-3">
                       <div className="flex items-center">
                         TERMINATION DATE
                         <a href="#">
                           <svg
                             className="w-3 h-3 ms-1.5"
                             aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                           >
                             <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                           </svg>
                         </a>
                       </div>
                     </th>
                     <th scope="col" className="px-6 py-3">
                     <div className="flex items-center">
                         DESCRIPTION
                         <a href="#">
                           <svg
                             className="w-3 h-3 ms-1.5"
                             aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                           >
                             <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                           </svg>
                         </a>
                       </div>
                     </th>
                     <th scope="col" className="px-6 py-3">
                     <div className="flex items-center">
                         ACTION
                         <a href="#">
                           <svg
                             className="w-3 h-3 ms-1.5"
                             aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                           >
                             <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                           </svg>
                         </a>
                       </div>
                     </th>
                   </tr>
                 </thead>
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
              <h2>Create New Termination</h2>
              <label className="cross-icon"></label>

              <hr />

              {/* <div className="award-popup-label"> */}
              <div className="award-popup-label">
              <label htmlFor="">
                <p>Employee</p>
                <input
                  type="text"
                  name="branch"
                  // onChange={(e) => {
                  //   setBranch(e.target.value);
                  // }}
                  // value={branch}
                  placeholder="Enter Employee Name"
                />
              </label>
              <label htmlFor="">
                <p>Termination Type</p>
                <input
                  type="text"
                  name="branch"
                  // onChange={(e) => {
                  //   setBranch(e.target.value);
                  // }}
                  // value={branch}
                  placeholder="CEO"
                />
              </label>
              </div>
              <div className="award-popup-label">
              <label htmlFor="">
                <p>Notice Date</p>
                <input
                  type="number"
                  name="branch"
                  // onChange={(e) => {
                  //   setBranch(e.target.value);
                  // }}
                  // value={branch}
                  placeholder="dd-mm-yyyy"
                />
              </label>
              <label htmlFor="">
                <p>Termination Date</p>
                <input
                  type="number"
                  name="branch"
                  // onChange={(e) => {
                  //   setBranch(e.target.value);
                  // }}
                  // value={branch}
                  placeholder="dd-mm-yyyy"
                />
              </label>
              </div>
              <div className="award-popup-label award-popup-textarea">
              <label htmlFor="">
                <p>Description</p>
                <textarea id="w3review" name="w3review" rows="8" cols="50" placeholder="Enter Description"></textarea>
              </label>
              </div>
              {/* <div/> */}

              <hr />

              <div className="btnWrap Award-popup-btn">
                <button className="cencel awd-cancel" onClick={() => setPopup1(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create awd-create" onClick={handleCreateBranch}>
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </>
  );
};

export default HRMsystemSetup;
