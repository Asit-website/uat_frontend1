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
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ViewTask from "./ViewTask";

const ProjectOverview2 = ({ allTasks, getProjectTaskapi }) => {
  const navigate = useNavigate();
  const {
    user,
    getAllProjectApi,
    CreateProjectTask,
    getProjectTask,
    deleteProjectTaskapi22,
    EditProjectTask,
  } = useMain();

  const location = useLocation();
  const data = location?.state;

  console.log("alltask", allTasks);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

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


  const getTask = (id) => {
    setViewTask(true)
    const filter = allTasks.find(e => e._id === id)
    if (filter) {
      setFormdata({
        Title: filter.taskName,
        Description: filter.description,
        Members: filter.Members,
        StartDate: filter.startDate,
        DueDate: filter.dueDate,
        Github: "",
        taskfile: filter.taskfile,
      });
    }
  }

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
  const [allTaskDetail, setAllTaskDetail] = useState([]);
  const [timerPop, setTimerPop] = useState(false);




  const getAllProject = async () => {
    const ans = await getAllProjectApi();
    setAllProject(ans?.data);
    console.log(allProject)
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

  // const [proUser, setProUser] = useState([]);


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

  useEffect(() => {
    getAllProject();
    getProjectTaskapi();
    console.log(allTaskDetail)
  }, []);

  useEffect(() => {
    if (data) {
      setAllEmp(data?.Members);
    }
  }, [data]);

  const [isEdit, setisEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const totalPages = Math.ceil(allTasks.length / tasksPerPage);
  // const currentTasks = allTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const deleteTasks = async (id) => {
    const resp = await deleteProjectTaskapi22(id);
    if (resp?.status) {
      getProjectTaskapi();
      toast.success("Successfully deleted");
    } else {
      toast.error("Something went wrong");
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


  return (
    <>
      <div className="">
        <div className="tm">

          <div style={{ marginTop: '40px', paddingLeft: "20px" }}>
            <div className="tclwrap">
              <nav>
                <div className="pronaheading">
                  <h2>{data?.Name}</h2>
                  <p
                    className={`stapro ${allProject?.Status === "Finished" && "finibg"
                      } ${allProject?.Status === "Ongoing" && "Ongoingbg"} ${allProject?.Status === "OnHold" && "OnHoldbg"
                      }`}
                  >
                    {allProject?.Status}
                  </p>
                </div>
                <div className="clibtns">
                  <button
                    onClick={() => {
                      setAddClientPop(true);
                      setisEdit(false);
                    }}
                    className="newcli"
                  >
                    <img src={pluss} alt="Add Task" /> <span>Add Task </span>
                  </button>
                </div>
              </nav>
              <div className="prodlefriwrap">
                <div className="leftprodetail">
                  <label>
                    <p className="filn">Start Date:</p>
                    <p className="proand">
                      {new Date(data?.createdAt).toISOString().split('T')[0]}
                    </p>
                  </label>
                  <label>
                    <p className="filn">Due Date:</p>
                    <p className="proand">{data?.deadline}</p>
                  </label>
                  <label>
                    <p className="filn">Total Members</p>
                    <p className="proand">{data.Members?.length}</p>
                  </label>
                </div>
                <div className="righprodetail">
                  <div>
                    <img src={predit} alt="" />
                  </div>
                  <div>
                    <img src={predel} alt="" />
                  </div>
                </div>
              </div>
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
                        Start date
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
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTasks.map((task, index) => (
                      // console.log(allTasks)
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{task?.taskName}</td>
                        <td style={{ display: "flex", gap: "-2px" }}>
                          {
                            task?.Members?.map((item, index) => (
                              <img key={index}
                                src={`${item?.profileImage ? item?.profileImage : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"}`}
                                className="w-20 h-20"
                                alt="Member Avatar"
                                style={{
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                  transition: "color 0.3s ease, text-decoration 0.3s ease", height: "40px", width: "40px"
                                }}
                              />
                            ))
                          }
                        </td>



                        <td className="px-6 py-4">{task?.startDate}</td>
                        <td className="px-6 py-4">{task?.dueDate}</td>
                        <td className="px-6 py-4">{task?.priority}</td>
                        <td className="px-6 py-4">{task?.description}</td>
                        <td className="px-6 py-4">{task?.Status}</td>
                        <td className="px-6 py-4 adddsomflex">
                          <MdDelete
                            onClick={() => deleteTasks(task?._id)}
                            className="iconsss"
                          />
                          <MdOutlineEdit
                            onClick={() => { handleEditClick(task) }}
                            className="iconsss2"
                          />
                          <FaEye
                            onClick={() => getTask(task?._id)}
                            className="iconsss"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {totalPages > 1 && (
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
                    min={formdata.StartDate}
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
                alt="Close"
              />
            </nav>
            <hr />
            <p>
              Time In:
              <input
                type="datetime-local"
                onChange={(e) =>
                  setTimerPop((prev) => ({
                    ...prev,
                    timeIn: new Date(e.target.value).toISOString(),
                  }))
                }
                value={new Date(timerPop.timeIn).toISOString().slice(0, 16)}
              />
            </p>
            <p>
              Time Out:
              <input
                type="datetime-local"
                onChange={(e) =>
                  setTimerPop((prev) => ({
                    ...prev,
                    timeOut: new Date(e.target.value).getTime().toString(),
                  }))
                }
                value={new Date(Number(timerPop.timeOut)).toISOString().slice(0, 16)}
              />
            </p>
            <p>Total Time: <input type="text" value={timerPop?.totalTime} readOnly /> </p>
          </div>
        </div>
      )}


      {viewTask && (<>
        <div className="addCliWrap">
          <div className="addClieCont addheight flex">
            <ViewTask src={cut} data = {formdata} onClick={()=>setViewTask(false)}/>
          </div>
        </div>
      </>)}
    </>
  );
};

export default ProjectOverview2;