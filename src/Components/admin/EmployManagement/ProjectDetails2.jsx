import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import pluss from "../../images/pluss.png";
import "react-profile-avatar/dist/index.css";
import predit from "../../images/Frame 9740.png";
import predel from "../../images/Frame 9741.png";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import cut from "../../images/cutt.png";
import CircularProgress from "./CircularProgress";
import { IoMdTimer } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

var tc3;
var tc4;

const ProjectDetails2 = ({ setAlert, pop, setPop }) => {
  const {
    user,
    getAllProjectApi,
    CreateProjectTask,
    getMyProjectTask,
    timerHandlerapi,
    getProjectTask,
    statuschangeapi,
    deleteProjectTaskapi22 , EditProjectTask
  } = useMain();

  const location = useLocation();

  const data = location?.state;

  // console.log("daa",data);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  let hrms_permission = JSON.parse(localStorage.getItem("hrms_permission"));

  const { role,  } = hrms_user;
  const {  showTasksDetailPermission , showAllProjectPermission , addTaskPermission ,  deleteTaskPermission , editTaskPermission ,  } = hrms_permission;

  const [formdata, setFormdata] = useState({
    Title: "",
    Description: "",
    Members: [],
    taskfile: "",
    StartDate: "",
    DueDate: "",
    Priority: "",
    Github: "",
  });
  const [proUser, setProUser] = useState([]);
  const [viewTask, setViewTask] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const changeHandler2 = (e) => {
    const selectedEmpId = e.target.value;
    if (selectedEmpId === "Select" || formdata.Members.includes(selectedEmpId))
      return;

    const selectedEmp = allEmp.find((emp) => emp._id === selectedEmpId);
    setProUser([...proUser, selectedEmp.fullName]);
    setFormdata({ ...formdata, Members: [...formdata.Members, selectedEmpId] });
  };

  const removeUser = (index) => {
    const newProUser = proUser.filter((_, i) => i !== index);
    const newMembers = formdata.Members.filter((_, i) => i !== index);
    setProUser(newProUser);
    setFormdata({ ...formdata, Members: newMembers });
  };
  const [addClientPop, setAddClientPop] = useState(false);

  const [allEmp, setAllEmp] = useState([]);

  const [allProject, setAllProject] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const getProjectTaskapi = async () => {
    const ans = await getMyProjectTask(data?._id, hrms_user?._id);
    setAllTasks(ans?.tasks); 
  };

  const getProjectTaskapiPermi = async () => {
    const ans = await getProjectTask(data?._id);
    setAllTaskDetail(ans?.tasks);
    setAllTasks(ans?.tasks);
  };


  const getAllProject = async () => {
    const ans = await getAllProjectApi();
    setAllProject(ans?.data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading....");
    try {
      const ans = await CreateProjectTask({
        ...formdata,
        projectId: data?._id,
      });
      if (ans?.status) {
        toast.success("Successfully created task");
        getProjectTaskapi();
        setFormdata({
          Title: "",
          Description: "",
          Members: "",
          StartDate: "",
          DueDate: "",
          Github: "",
          Members: "",
        });
        setAddClientPop(false);
        setProUser([]);

      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
    toast.dismiss(toastId);
  };

  useEffect(() => {
    if (data) {
      setAllEmp(data?.Members);
    }
  }, [data]);


  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(allTasks?.length / tasksPerPage);

  // Get the tasks for the current page
  const currentTasks = allTasks?.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  // Handle click for previous button
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle click for next button
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // THIS IS FOR CLOCK
  var [clock, setClock] = useState(0);
  const [mount, setMount] = useState(false);

  const [timerPop, setTimerPop] = useState(false);

  const [timerData, setTimerData] = useState({
    taskId: "",
    Note: "",
  });

  const timerChange = (e) => {
    const { name, value } = e.target;
    setTimerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeTimer = async () => {
    clearInterval(tc3);
    clearInterval(tc4);
    setMount(!mount);
    setClock(0);

    localStorage.removeItem("taskTimer");
    localStorage.removeItem("timerClockIn");
    localStorage.removeItem("timeIn");
  };

  const clockIn = async () => {
    let t = localStorage.getItem("taskTimer");

    if (!t) {
      localStorage.setItem(
        "timerClockIn",
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );

      const currentTime = new Date();
      const timeOut = currentTime.toISOString();

      localStorage.setItem("timeIn", currentTime.toISOString()); // Set clock-in time in ISO format

      localStorage.setItem("taskTimer", new Date().getTime());

      tc4 = setInterval(() => {
        setClock(++clock);
      }, 1000);
    } else {
      setTimerPop(true);
    }

    setMount(!mount);
  };

  const [isEdit, setisEdit] = useState(false);


  const timerHandler = async (e) => {
    e.preventDefault();

    const currentTime = new Date();

    const timeIn = new Date(localStorage.getItem("timeIn"));
    const timeOut = currentTime.getTime();

    const difference = currentTime.getTime() - timeIn.getTime();

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const diffTime = `${hours}:${minutes}:${seconds}`;


    const resp = await timerHandlerapi({
      Note: timerData.Note,
      taskId: timerData?.taskId,
      clockIn: timeIn,
      clockOut: timeOut,
      totalTime: diffTime,
      projectId: data?._id
    });
    if (resp?.status) {
      closeTimer();
      toast.success("Successfuly done");
      setTimerPop(false);
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleVisibilityChange = () => {
    if (!document.hidden) {
      initializeTimer();
    }
  };

  const initializeTimer = () => {
    let t = localStorage.getItem("taskTimer");

    clearInterval(tc3);
    clearInterval(tc4);

    if (t) {
      let t5 = Math.floor((new Date().getTime() - t) / 1000);
      setClock(t5);

      tc4 = setInterval(() => {
        setClock(++t5);
      }, 1000);

      tc3 = setInterval(() => {}, 1000);
    } else {
      let t7 = localStorage.getItem("clock-out-time");
      let t5 = Math.floor((t7 - t) / 1000);
      setClock(t5);
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    initializeTimer();
  }, []);

  const edittaskhandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading....");
    try {
      const ans = await EditProjectTask({
        ...formdata,
        projectId: data?._id,
        taskId: isEdit,
      });
      if (ans?.status) {
        toast.success("Successfully updated task");
        getProjectTaskapi();
        setFormdata({
          Title: "",
          Description: "",
          Members: [],
          StartDate: "",
          DueDate: "",
          Github: "",
          Members: "",

        });
        setAddClientPop(false);
        setProUser([]);
        setisEdit(false);
      }
      toast.dismiss(toastId);
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };

  const handleEditClick = (client) => {
    const membersNames = client.Members.map((memberId) => {
      const member = allEmp.find((emp) => emp._id === memberId?._id);
      return member ? member.fullName : "";
    });

    setisEdit(client._id);
    setFormdata({
      Name: client?.projectName,
      DueDate: client.deadline,
      ...client,
    });
    setProUser(membersNames);
    setAddClientPop(true);
  };
  
  // setisEdit(client._id);
  const changeHandler3 = (event) => {
    const file = event.target.files[0];
    setFormdata((prevData) => ({
      ...prevData,
      taskfile: file,
    }));
  };

  const [allTaskDetail, setAllTaskDetail] = useState([]);

  const [timerPop2, setTimerPop2] = useState(false);


  // THIS IS FOR PERMISSION


  const deleteTasks = async (id) => {
    const toastId = toast.loading("Loading...");
    const resp = await deleteProjectTaskapi22(id);
    if (resp?.status) {
      getProjectTaskapi();
      getProjectTaskapiPermi();
      toast.success("Succesfuly deleted");
    } else {
      toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
  };



  useEffect(() => {
    if(showAllProjectPermission){
      getProjectTaskapiPermi();

    }
    else{
      getProjectTaskapi();
    }
    getAllProject();
  }, []);


  const statuschangehadler = async(taskId , status)=>{
    const toastId = toast.loading("Loading...");
     const resp = await statuschangeapi(taskId, status );
      toast.success("Successfuly done");
      toast.dismiss(toastId);
      if(showAllProjectPermission){
        getProjectTaskapiPermi();
      }
      else{
        getProjectTaskapi();
      }
  }

  return (
    <>
      <div className="employee-dash h-full">
        {role === "EMPLOYEE" ? (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        ) : (
          <AdminSidebar pop={pop} setPop={setPop} />
        )}

        <div className="tm">
          {role === "EMPLOYEE" ? (
            <EmployeeNavbar user={user} setAlert={setAlert} />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">
            <div className="tclwrap">
              <nav>
                <div className="pronaheading">
                  <h2>{data?.Name}</h2>
                  <p
                    className={`stapro ${
                      allProject?.Status === "Finished" && "finibg"
                    } ${allProject?.Status === "Ongoing" && "Ongoingbg"} ${
                      allProject?.Status === "OnHold" && "OnHoldbg"
                    }`}
                  >
                    {allProject?.Status}
                  </p>
                </div>

               
               {

            addTaskPermission && 
               
                    <div className="clibtns">
                      <NavLink to="employeeDash/HRM/myProjects">
                        <button className="backpro">
                          <span>Back</span>
                        </button>
                      </NavLink>
                      <button
                        onClick={() => {
                          setAddClientPop(true);
                        }}
                        className="newcli"
                      >
                        <img src={pluss} /> <span>Add Task</span>
                      </button>
                    </div>

                      }
                
              </nav>

              <div className="prodlefriwrap">
                {/* left side */}
                <div className="leftprodetail">
                  <label>
                    <p className="filn">Start Date:</p>
                    <p className="proand">
                      {new Date(data?.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </label>
                  <label>
                    <p className="filn">Due Date:</p>
                    <p className="proand">{data?.DueDate}</p>
                  </label>
                  <label>
                    <p className="filn">Total Members</p>
                    <p className="proand">{data.Members?.length}</p>
                  </label>
                </div>

                {/* right side */}
                <div className="righprodetail">
                  <div className="timerdives">
                    <p>{Math.floor(clock / 3600)}</p>:
                    <p>{Math.floor((clock % 3600) / 60)}</p>:<p>{clock % 60}</p>
                  </div>

                  {allTasks?.length > 0 && (
                    <div>
                      <IoMdTimer onClick={clockIn} className="cursor-pointer" />
                    </div>
                  )}

                  {/* <div>
                    <img src={predit} alt="" />
                  </div>
                  <div>
                    <img src={predel} alt="" />
                  </div> */}
                </div>
              </div>

              {/* this is all tasks now  */}

              <div className="relative overflow-x-auto">
                <table className="w-full prodetailTable text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Subject
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Assign To
                      </th>
                      <th scope="col" className="px-6 py-3">
                        StartDate
                      </th>
                      <th scope="col" className="px-6 py-3">
                        DueDate
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Priority
                      </th>
                    
                      <th scope="col" className="px-6 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      {showTasksDetailPermission && (
                        <th scope="col" className="px-6 py-3">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {allTasks?.map((task, index) => (
                      <tr
                        key={index}
                        className="bg-white"
                      >
                        <td className="px-6 py-4">{task?.taskName}</td>
                        <td className="px-6 py-4 flex items-center justify-center ">
                           {
                            task?.Members?.map((member)=>(
                              <img
                              src={`${
                                member?.profileImage
                                  ? member?.profileImage
                                  : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                              }`}
                              className="w-20 h-20"
                              alt="Member Avatar "
                              key={member._id}
                            
                              style={{
                                borderRadius: "50%",
                                cursor: "pointer",
                                transition:
                                  "color 0.3s ease, text-decoration 0.3s ease",
                                height: "40px",
                                width: "40px",
                              }}
                            />
                            ))
                           }
                        </td>
                        <td className="px-6 py-4">{task?.startDate}</td>
                        <td className="px-6 py-4">{task?.dueDate}</td>
                        <td className="px-6 py-4">{task?.priority}</td>
                        {/* <td className="px-6 py-4">{task?.Github}</td> */}
                        <td className="px-6 py-4">{task?.description}</td>
                        <td className="px-6 py-4">
                           <select name="status" id="" onChange={(e)=>statuschangehadler(task?._id , e.target.value)} value={task?.Status} >
                            {/* <option value=""></option> */}
                             <option value="Not Started">Not Started</option>
                             <option value="Started">Started</option>
                              <option value="Pending">Pending</option>
                              <option value="Completed">Completed</option>
                           </select>
                        </td>

                        {showTasksDetailPermission && (
                          <td className="px-6 py-4 adddsomflex">
                            {
                              showTasksDetailPermission &&   
                               <FaEye
                              onClick={() => {
                                const filterData = allTaskDetail?.find(
                                  (t) => t?.taskId === task?._id
                                );
                                setTimerPop2(filterData);
                              }}
                              className="iconsss"
                            />
                            }
                            {
                              deleteTaskPermission && 
                               <MdDelete
                              onClick={() => deleteTasks(task?._id)}
                              className="iconsss"
                            />
                            }
                            {
                              editTaskPermission && 
                              <MdOutlineEdit
                              onClick={() => {
                                setAddClientPop(true);
                                setFormdata(task);
                                setisEdit(task?._id);
                              }}
                              className="iconsss2"
                            />
                            }
                          
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>

               {totalPages >1 && (
                 <div className="navbuttons flex justify-between items-center mt-4">
                 <button
                   onClick={handlePrev}
                   disabled={currentPage === 1}
                   className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                 >
                   Prev
                 </button>
                 <span className="px-4">{currentPage}</span>
                 <button
                   onClick={handleNext}
                   disabled={currentPage === totalPages}
                   className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                 >
                   Next
                 </button>
               </div>
               )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {addClientPop && (
        <div className="addCliWrap">
          <div className="addClieCont addheight">
            <nav>
              <p>Create New Task</p>
              <img
                onClick={() => {
                  setAddClientPop(false);
                  // setisEdit(false);
                  setProUser([]);
                  setFormdata({
                    Title: "",
                    Description: "",
                    Members: "",
                    StartDate: "",
                    DueDate: "",
                    Priority: "",
                    Github: "",
                    Members: "",
                  });
                }}
                src={cut}
                alt="Close"
              />
            </nav>
            <hr />
            <form
              onSubmit={(e) => {
                if (isEdit) {
                  edittaskhandler(e);
                } else {
                  submitHandler(e);
                }
              }}
            >
              <div style={{ overflowY: "auto" }}>
                <label>
                  <p>Add File</p>
                  <input
                    name="taskfile"
                    // value={formdata.taskfile}
                    onChange={changeHandler3}
                    type="file"
                    placeholder="file"
                  />
                </label>
                <label>
                  <p>Subject</p>
                  <input
                    name="Title"
                    value={formdata.Title}
                    onChange={changeHandler}
                    type="text"
                    placeholder="Name"
                  />
                </label>
                <label>
                  <p>Assign To </p>
                  <div className="allempid">
                    {proUser.map((pro, index) => (
                      <div key={index} className="sinproid">
                        <p >{pro}</p>
                        <img
                          src={cut}
                          alt="Remove"
                          onClick={() => removeUser(index)}
                        />
                      </div>
                    ))}
                  </div>

                  <select
                    name="Members"
                    onChange={changeHandler2}
                    disabled={formdata.Members.length >= allEmp.length} // Disable if all members are assigned
                  >
                    <option value="Select">Select Employee</option>
                    {allEmp?.map((emp, index) => {
                      // Check if emp._id is already in formdata.Members
                      const isAlreadySelected = formdata.Members.includes(emp._id);

                      return (
                        <option value={emp?._id} key={index} disabled={isAlreadySelected}>
                          {emp?.fullName}
                        </option>
                      );
                    })}
                  </select>


                </label>
                <label>
                  <p>Priority </p>
                  <select
                    name="Priority"
                    value={formdata.Priority}
                    onChange={changeHandler}
                  >
                    <option value="Select">Select Priority</option>
                    <option value="Normal">Normal</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </label>
                <label>
                  <p>Start Date </p>
                  <input
                    name="StartDate"
                    value={formdata.StartDate}
                    onChange={changeHandler}
                    type="date"
                  />
                </label>
                <label>
                  <p>Due Date</p>
                  <input
                    name="DueDate"
                    value={formdata.DueDate}
                    onChange={changeHandler}
                    type="date"
                  />
                </label>
                <label>
                  <p>Description</p>
                  <textarea
                    type="text"
                    name="Description"
                    value={formdata.Description}
                    onChange={changeHandler}
                    placeholder="Description"
                  />
                </label>
              </div>
              <div className="btnsss">
                <button type="submit" className="saveclient">
                  <span>{isEdit ? "Update" : "Add Task "}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddClientPop(false);
                    setisEdit(false);
                    setProUser([]);
                    setFormdata({
                      Title: "",
                      Description: "",
                      Members: "",
                      StartDate: "",
                      DueDate: "",
                      Priority: "",
                      Github: "",
                      Members: "",
                    });
                  }}
                  className="cancel"
                >
                  <span>Cancel </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* {alert('yes....')} */}

      {timerPop && (
        <div className="addCliWrap">
          <div className="addClieCont fitheight">
            <nav>
              <p>Timer Details</p>
              <img
                onClick={() => {
                  setTimerPop(false);
                }}
                src={cut}
              />
            </nav>

            <hr />

            <form onSubmit={timerHandler}>
              <select
                name="taskId"
                onChange={timerChange}
                value={timerData.taskId}
              >
                <option value="Select">Select Task</option>
                {allTasks?.map((task, index) => (
                  <option key={index} value={task?._id}>
                    {"hi"}
                  </option>
                ))}
              </select>

              <input
                name="Note"
                onChange={timerChange}
                value={timerData.Note}
                type="text"
                placeholder="Enter Note..."
                className="noteInput"
              />

              <div className="btnsss">
                <button type="submit" className="saveclient">
                  <span>Add</span>
                </button>
                <button
                  onClick={() => {
                    setTimerPop(false);
                  }}
                  className="cancel"
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {timerPop2 && (
        <div className="addCliWrap">
          <div className="addClieCont fitheight">
            <nav>
              <p>Timer Details</p>
              <img
                onClick={() => {
                  setTimerPop2(false);
                }}
                src={cut}
              />
            </nav>

            <hr />

            <p>
              Time In:{" "}
              {new Date(timerPop2?.timeIn).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
            </p>

            <p>
              Time Out:{" "}
              {new Date(Number(timerPop2?.timeOut)).toLocaleTimeString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                }
              )}
            </p>

            <p>Total Time: {timerPop2?.totalTime} </p>
          </div>
        </div>
      )}
    </>
  );
};
export default ProjectDetails2;