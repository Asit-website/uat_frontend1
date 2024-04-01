import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import chevron from "../../images/chevron_right.png";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import blackRight from "../../images/blackRight.png";
import srchIcon from "../../images/srchIcon.png";
import deleted from "../../images/deleted.png";
import edited from "../../images/edited.png";
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


  const getData = async () => {
    const ans1 = await getBranchs();
    const ans2 = await getDepartments();
    const ans3 = await getDesignations();
     console.log("ans3",ans3);
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

  const handleCreateBranch = async () => {
    const ans = await postBranch({ name: branch });
    console.log(ans);
    if (ans.success) {
      alert(ans.message);
      setBranch("");
      setRefreshFlag(!refreshFlag);
      setPopup1(false);
    } else {
      alert("Branch name is alreday exist");
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

    if (ans.status) {
      alert("success");
      setBranch('');
      setRefreshFlag(!refreshFlag);
      setPopup1(false);
    }
    if (ans.success) {
      setDepartmentValue({
        name: '',
        branch: ''
      });
      alert(ans.message);
      setRefreshFlag(!refreshFlag);
      setPopup2(false);
    }
     else {
      alert("Department name alreday exist");

    }
  }


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
      alert("Leave Name already exist");
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

        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />

          <div className="em">
            <div className="flex-col">
              <div className="admin-main">
                <div className="plusSection">
                  <div className="adminFirt">
                    <h2 className="hrmShed">HRMS</h2>

                    <div className="hrmDoHe">
                      <p>HRMS</p>
                      <img src={chevron} alt="" />
                      <span>HRM System Setup</span>
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

                <div className="hrmssystemsetup-parents">
                  <div className="hrmssystemsetup-rightmenu">
                    {sidebarItem.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => setOpen(index)}
                        className={`hrmsystemsetup-subrightmenu ${open === index && "openItem"
                          } `}
                      >
                        <span>{item.title}</span>
                        <img src={blackRight} alt="" />
                      </div>
                    ))}
                  </div>

                  {open === 0 && (
                    <div className="hrmsystemsetup-leftmenu">
                      <div className="hrmsystemsetup-container">
                        <div className="hrmsystemsetup-pagination">
                          {/* <select id="entries">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select> */}

                          <p>Filter</p>
                          <div className="hrmsystemsetup-search">
                            <img src={srchIcon} alt="" />
                            <input type="text" placeholder="Search..." onChange={(e) => {
                              setBranches(() => {
                                return branches1.filter(x => x.name.toLowerCase().includes(e.target.value.toLowerCase()));
                              });
                            }} />
                          </div>
                        </div>

                        <div className="relative overflow-x-auto">
                          <table className="w-full text-left   text-[#060606]">
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
                              {branches?.length === 0 ? 'No Branches Added' : branches.map((item, index) => (
                                <tr key={index} className="bg-white ">
                                  <td className="px-6 py-4 ">{item?.name}</td>

                                  <td className="px-6 py-4 flex hrmActions">
                                    <img
                                      className={'cursor-pointer'}
                                      onClick={() => {
                                        setId(item?._id);
                                        setBranch1(item?.name);
                                        setPopup11(true);
                                      }}
                                      src={edited}
                                      alt=""
                                    />
                                    <img
                                      className="cursor-pointer"
                                      onClick={() => {
                                        handleDelete(item._id, 'branch');
                                      }}
                                      src={deleted}
                                      alt=""
                                    />
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
                          {/* <select id="entries">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select> */}

                          <p>Filter</p>
                          <div className="hrmsystemsetup-search">
                            <img src={srchIcon} alt="" />
                            <input type="text" placeholder="Search..." onChange={(e) => {
                              let txt = e.target.value.toLowerCase();
                              setDepartments(() => {
                                return departments1.filter(x => x.name.toLowerCase().includes(txt));
                              });
                            }} />
                          </div>
                        </div>

                        <div className="relative overflow-x-auto">
                          <table className="w-full text-left   text-[#060606]">
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
                              {departments.length === 0 ? 'No Departments Added' : departments.map((item, index) => (
                                <tr key={index} className="bg-white ">
                                  <td className="px-6 py-4 ">
                                    {item?.branch?.name}
                                  </td>
                                  <td className="px-6 py-4 ">{item?.name}</td>
                                  <td className="px-6 py-4 flex hrmActions">
                                    <img src={edited} className="cursor-pointer" onClick={() => {
                                      setDepartmentValue1({
                                        branch: item?.branch?._id,
                                        name: item?.name
                                      });
                                      setId(item?._id);
                                      setPopup21(true);
                                    }} alt="" />
                                    <img src={deleted} className="cursor-pointer" onClick={() => { handleDelete(item._id, 'department') }} alt="" />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {open === 2 && (
                    <div className="hrmsystemsetup-leftmenu">
                      <div className="hrmsystemsetup-container">
                        <div className="hrmsystemsetup-pagination">
                          {/* <select id="entries">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select> */}

                          <p>Filter</p>
                          <div className="hrmsystemsetup-search">
                            <img src={srchIcon} alt="" />
                            <input type="text" placeholder="Search..." onChange={(e) => {
                              let txt = e.target.value.toLowerCase();
                              setDesignations(() => {
                                return designations1.filter(x => x.name.toLowerCase().includes(txt));
                              });
                            }} />
                          </div>
                        </div>

                        <div className="relative overflow-x-auto">
                          <table className="w-full text-left   text-[#060606]">
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
                              {designations.length === 0 ? 'No Designations Added' : designations.map((item, index) => (
                                <tr key={index} className="bg-white ">
                                  <td className="px-6 py-4 ">
                                    {item?.department?.name}
                                  </td>

                                  <td className="px-6 py-4 ">{item?.name}</td>

                                  <td className="px-6 py-4 flex hrmActions">
                                    <img src={edited} className="cursor-pointer" onClick={() => {
                                      setDesignationValue1({
                                        department: item?.department?._id,
                                        name: item?.name
                                      });
                                      setId(item?._id);
                                      setPopup31(true);
                                    }} alt="" />
                                    <img src={deleted} className="cursor-pointer" onClick={() => {
                                      handleDelete(item._id, 'designation');
                                    }} alt="" />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {open === 3 && (
                    <div className="hrmsystemsetup-leftmenu">
                      <div className="hrmsystemsetup-container">
                        <div className="hrmsystemsetup-pagination">
                          <p>Filter</p>
                          <div className="hrmsystemsetup-search">
                            <img src={srchIcon} alt="" />
                            <input type="text" placeholder="Search..." onChange={(e) => {
                              let txt = e.target.value.toLowerCase();
                              setLeaveTypes(() => {
                                return leaveTypes1.filter(x => x.name.toLowerCase().includes(txt));
                              });
                            }} />
                          </div>
                        </div>

                        <div className="relative overflow-x-auto">
                          <table className="w-full text-left   text-[#060606]">
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
                              {leaveTypes.length === 0 ? 'No data found' : leaveTypes.map((item, index) => (
                                <tr key={index} className="bg-white ">
                                  <td className="px-6 py-4 ">{item?.name}</td>
                                  <td className="px-6 py-4 ">{item?.days}</td>
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

                  {/* {open === 1 && (
                    <div className="hrmsystemsetup-leftmenu">
                      <div className="hrmsystemsetup-container">
                        <div className="hrmsystemsetup-ican">
                          <svg
                            className="w-6 h-6 text-gray-800 dark:text-black"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 8 14"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                            />
                          </svg>
                        </div>
                        <div className="hrmsystemsetup-pagination">
                          <label for="entries">10 entries per page</label>
                          <select id="entries">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                          </select>
                        </div>
                        <div className="hrmsystemsetup-search">
                          <input type="text" placeholder="Search..." />
                        </div>
                        <table>
                          <tr>
                            <th>BRANCH</th>
                            <th>ACTION</th>
                          </tr>
                          <tr>
                            <td>Head office</td>
                            <td>
                              <a href="#" className="action-buttons view">
                                View
                              </a>
                              <a href="#" className="action-buttons delete">
                                Delete
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>kushel</td>
                            <td>
                              <a href="#" className="action-buttons view">
                                View
                              </a>
                              <a href="#" className="action-buttons delete">
                                Delete
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>sector63</td>
                            <td>
                              <a href="#" className="action-buttons view">
                                View
                              </a>
                              <a href="#" className="action-buttons delete">
                                Delete
                              </a>
                            </td>
                          </tr>
                        </table>
                        <p>Showing 1 to  of 3 entries</p>
                      </div>
                    </div>
                  )} */}

                  {/* {open === 2 && (
                    <div className="hrmsystemsetup-leftmenu">
                      <div className="hrmsystemsetup-container">
                        <div className="hrmsystemsetup-ican">
                          <svg
                            className="w-6 h-6 text-gray-800 dark:text-black"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 8 14"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                            />
                          </svg>
                        </div>
                        <div className="hrmsystemsetup-pagination">
                          <label for="entries">10 entries per page</label>
                          <select id="entries">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                          </select>
                        </div>
                        <div className="hrmsystemsetup-search">
                          <input type="text" placeholder="Search..." />
                        </div>
                        <table>
                          <tr>
                            <th>BRANCH</th>
                            <th>ACTION</th>
                          </tr>
                          <tr>
                            <td>Admin </td>
                            <td>
                              <a href="#" className="action-buttons view">
                                View
                              </a>
                              <a href="#" className="action-buttons delete">
                                Delete
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Admin</td>
                            <td>
                              <a href="#" className="action-buttons view">
                                View
                              </a>
                              <a href="#" className="action-buttons delete">
                                Delete
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>sector63</td>
                            <td>
                              <a href="#" className="action-buttons view">
                                View
                              </a>
                              <a href="#" className="action-buttons delete">
                                Delete
                              </a>
                            </td>
                          </tr>
                        </table>
                        <p>Showing 1 to 3 of 10 entries</p>
                      </div>
                    </div>
                  )} */}
                </div>

                <>
                  {/* Modal toggle */}
                  {/* <button
                    onClick={() => {
                      setPopup(!popup);
                      console.log("hi");
                    }}
                    type="button"
                  >
                    Toggle modal
                    <svg
                            className="w-6 h-6 text-gray-800 dark:text-black"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 8 14"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                            />
                          </svg>
                  </button> */}
                  {/* Main modal */}
                  <div
                    style={styleing}
                    // id="default-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                  >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                      {/* Modal content */}
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
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

                {/* <div className="admin1">
                  <img
                    onClick={() => setPop(true)}
                    className="plus1"
                    src={plus1}
                    alt="plus1"
                  />
                </div>
                <div className="main-card flex items-center  justify-between">
                  <div className="main-box main-boxes">
                    <NavLink to="/adminDash/EmployeeMan">
                      <div className="main-box1">
                        <div className="loj">
                          <img src={person} alt="loj" />
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/adminDash/EmployeeMan">
                      <div className="main-box2">
                        <h3>Employee Registration</h3>
                      </div>
                    </NavLink>
                  </div>
                  
                  <NavLink to="/adminDash/profile-management" className="main-box main-boxes">
                    <div className="main-box1">
                      <div className="loj">
                        <img src={person} alt="loj" />
                      </div>
                    </div>
                    <div className="main-box2">
                      <h3>Profile Management</h3>
                    </div>
                  </NavLink>

                  <div className="main-box main-boxes">
                    <div className="main-box1">
                      <div className="loj">
                        <img src={person2} alt="loj" />
                      </div>
                    </div>
                    <div className="main-box2">
                      <h3>Roles Management</h3>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {popup1 && (
          <div className="allPopupWrap">
            <div className="popup1">
              <h2>Create New Branch</h2>

              <hr />

              <label htmlFor="">
                <p>Name</p>
                <input
                  type="text"
                  name="branch"
                  onChange={(e) => {
                    setBranch(e.target.value);
                  }}
                  value={branch}
                  placeholder="Enter Branch Name"
                />
              </label>

              <hr />

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup1(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleCreateBranch}>
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup11 && (
          <div className="allPopupWrap">
            <div className="popup1">
              <h2>Edit Branch</h2>

              <hr />

              <label htmlFor="">
                <p>Name</p>
                <input
                  type="text"
                  name="branch1"
                  onChange={(e) => {
                    setBranch1(e.target.value);
                  }}
                  value={branch1}
                  placeholder="Enter Branch Name"
                />
              </label>

              <hr />

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup11(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleUpdateBranch}>
                  <span>Update</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup2 && (
          <div className="allPopupWrap">
            <div className="popup1">
              <h2>Create New Department</h2>
              <hr />
              <select className="selectBRANCH" value={departmentValue.branch} onChange={(e) => { setDepartmentValue({ ...departmentValue, branch: e.target.value }); }} name="branch1" id="branch1">
                <option value="">select Branch</option>

                {branches.map((e, index) => {
                  return (
                    <option key={index} value={e._id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>

              <label>
                <p>Name</p>
                <input type="text" name="department1" value={departmentValue.name} onChange={(e) => { setDepartmentValue({ ...departmentValue, name: e.target.value }); }} placeholder="Enter Department Name" />
              </label>

              <hr />

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup2(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleCreateDepartment}>
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup21 && (
          <div className="allPopupWrap">
            <div className="popup1">
              <h2>Edit Department</h2>
              <hr />
              <select className="selectBRANCH" value={departmentValue1.branch} onChange={(e) => { setDepartmentValue1({ ...departmentValue1, branch: e.target.value }); }} name="branch1" id="branch1">
                <option value="">select Branch</option>

                {branches.map((e, index) => {
                  return (
                    <option key={index} value={e._id}>
                      {e.name}
                    </option>
                  );
                })}
              </select>

              <label>
                <p>Name</p>
                <input type="text" name="department1" value={departmentValue1.name} onChange={(e) => { setDepartmentValue1({ ...departmentValue1, name: e.target.value }); }} placeholder="Enter Department Name" />
              </label>

              <hr />

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup21(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleUpdateDepartment}>
                  <span>Update</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup3 && (
          <div className="allPopupWrap">
            <div className="popup1">
              <h2>Create New Designation</h2>
              <hr />
              <label htmlFor>
                <p>Department</p>
                <select className="selectBRANCH" value={designationValue?.department} onChange={(e) => {
                  setDesignationValue({ ...designationValue, department: e.target.value });
                }}>
                  <option value="" disabled>Choose Department</option>
                  {departments?.map((e, index) => {
                    return (
                      <option key={index} value={e?._id}>{e?.name}</option>
                    );
                  })}
                </select>
              </label>
              <label htmlFor="">
                <p>Name</p>
                <input type="text" placeholder="Enter Designation Name" value={designationValue?.name} onChange={(e) => {
                  setDesignationValue({ ...designationValue, name: e.target.value });
                }} />
              </label>

              <hr />

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup3(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleCreateDesignation}>
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup31 && (
          <div className="allPopupWrap">
            <div className="popup1">
              <h2>Edit Designation</h2>
              <hr />
              <label htmlFor>
                <p>Department</p>
                <select className="selectBRANCH" value={designationValue1?.department} onChange={(e) => {
                  setDesignationValue1({ ...designationValue1, department: e.target.value });
                }}>
                  <option value="" disabled>Choose Department</option>
                  {departments?.map((e, index) => {
                    return (
                      <option key={index} value={e?._id}>{e?.name}</option>
                    );
                  })}
                </select>
              </label>
              <label htmlFor="">
                <p>Name</p>
                <input type="text" placeholder="Enter Designation Name" value={designationValue1?.name} onChange={(e) => {
                  setDesignationValue1({ ...designationValue1, name: e.target.value });
                }} />
              </label>

              <hr />

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup31(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleUpdateDesignation}>
                  <span>Update</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup4 && (
          <div className="allPopupWrap">
            <div className="popup1">
              <h2>Create New Leave Type </h2>
              <hr />
              <label htmlFor>
                <p>Leave Type</p>
                <input type="text" placeholder="Enter Leave Type Name" name="name" value={leaveTypeValue?.name} onChange={(e) => {
                  setLeaveTypeValue({ ...leaveTypeValue, [e.target.name]: e.target.value });
                }} />
                {/* <select className="selectBRANCH" name="" id="">
                  <option value="" disabled selected></option>
                </select> */}
              </label>

              <label htmlFor="">
                <p>Days Per Year</p>
                <input type="text" placeholder="Enter Days / Year" name="days" value={leaveTypeValue?.days} onChange={(e) => {
                  setLeaveTypeValue({ ...leaveTypeValue, [e.target.name]: e.target.value });
                }} />
              </label>

              <hr />

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup4(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleCreateLeaveType}>
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {popup41 && (
          <div className="allPopupWrap">
            <div className="popup1">
              <h2>Edit Leave Type </h2>
              <hr />
              <label htmlFor>
                <p>Leave Type</p>
                <input type="text" placeholder="Enter Leave Type Name" name="name" value={leaveTypeValue1?.name} onChange={(e) => {
                  setLeaveTypeValue1({ ...leaveTypeValue1, [e.target.name]: e.target.value });
                }} />
                {/* <select className="selectBRANCH" name="" id="">
                  <option value="" disabled selected></option>
                </select> */}
              </label>

              <label htmlFor="">
                <p>Days Per Year</p>
                <input type="text" placeholder="Enter Days / Year" name="days" value={leaveTypeValue1?.days} onChange={(e) => {
                  setLeaveTypeValue1({ ...leaveTypeValue1, [e.target.name]: e.target.value });
                }} />
              </label>

              <hr />

              <div className="btnWrap">
                <button className="cencel" onClick={() => setPopup41(false)}>
                  <span>Cancel</span>
                </button>

                <button className="create" onClick={handleUpdateLeaveType}>
                  <span>Update</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

}
export default HRMsystemSetup;