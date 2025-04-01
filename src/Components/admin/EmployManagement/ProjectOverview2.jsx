import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import "react-profile-avatar/dist/index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useMain } from "../../../hooks/useMain";
import cut from "../../images/cutt.png";
import predit from "../../images/Frame 9740.png";
import predel from "../../images/Frame 9741.png";
import pluss from "../../images/pluss.png";
import "./HRMsystem.css";
import "./quote.css";
import ViewTask from "./ViewTask";

const ProjectOverview2 = ({ allTasks, getProjectTaskapi }) => {
  const navigate = useNavigate();
  const {
    user,
    getAllProjectApi,
    CreateProjectTask,
    getProjectTask,
    deleteProjectTaskapi22,
    EditProjectTask,postNotifyTask, fetchAllTimesheetapi
  } = useMain();

  const location = useLocation();
  const data = location?.state;
    const [altimesheet, setTimesheet] = useState([]);
  
// console.log(data)
  // console.log("alltask", allTasks);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
  const role = hrms_user?.Role

  const [formdata, setFormdata] = useState({
    Title: "",
    Description: "",
    Members: [], // Ensure this is an array
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
    const filter = allTasks?.find(e => e._id === id)
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
    filterByTaskId(id)
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
  
    // If "Select" is chosen or selectedEmpId is invalid, return
    if (selectedEmpId === "Select") return;
  
    // Find the selected employee using the ID
    const selectedEmp = allEmp?.find((emp) => emp?._id === selectedEmpId);
  
    // If no employee is found or the employee is already in proUser, return
    if (!selectedEmp || proUser?.includes(selectedEmp?.fullName)) return;
  
    // Update the proUser state by adding the selected employee's fullName
    setProUser((prev) => {
      const updatedProUser = [...prev, selectedEmp?.fullName];
  
      // Update the Members array with the selected employee's ID and existing IDs from alreadyUsers
      const alreadyUsers = allEmp.filter((emp) => updatedProUser.includes(emp?.fullName));
  
      setFormdata((prevData) => {
        // Ensure Members is an array
        const prevMembers = Array.isArray(prevData?.Members) ? prevData?.Members : [];
  
        // Update the Members array with selectedEmpId and alreadyUsers _id
        const newMembers = [
          ...prevMembers,
          selectedEmpId,
          ...alreadyUsers.map((user) => user._id),
        ];
  
        return {
          ...prevData,
          Members: Array.from(new Set(newMembers)), // Remove duplicates by converting to a Set and back to an array
        };
      });
  
      return updatedProUser;
    });
  };
  
  
  

  // const removeUser = (index) => {
  //   // Remove the user from the proUser list using the provided index
  //   const newProUser = proUser?.filter((_, i) => i !== index);
  
  //   // Get the remaining employees whose fullName is in the newProUser list
  //   const alreadyUsers = allEmp.filter((emp) => newProUser.includes(emp?.fullName));
  
  //   // Ensure Members is an array, even if it's undefined or not an array
  //   const newMembers = Array.isArray(formdata?.Members)
  //     ? formdata?.Members.filter((_, i) => i !== index)
  //     : [];
  
  //   // Log the newProUser and newMembers for debugging
  //   // console.log(newProUser, newMembers);
  
  //   // Update the proUser state and Members array
  //   setProUser(newProUser);
  //   setFormdata({
  //     ...formdata,
  //     Members: [
  //       ...newMembers, // Keep the remaining Members
  //       ...alreadyUsers.map((user) => user._id), // Add the _id of the remaining users
  //     ],
  //   });
  // };

  const removeUser = (index) => {
    const newProUser = proUser?.filter((_, i) => i !== index);
    const newMembers = formdata?.Members?.filter((_, i) => i !== index);
    console.log(newMembers)
    setProUser(newProUser);
    console.log(newProUser)
  const alreadyUsers = allEmp.filter((emp) => newProUser.includes(emp?.fullName));
    setFormdata({ ...formdata, Members: alreadyUsers.map((user) => user._id) });
  };
  
  
  
  
  

  const [addClientPop, setAddClientPop] = useState(false);
  const [allEmp, setAllEmp] = useState([]);
  const [allProject, setAllProject] = useState([]);
  const [allTaskDetail, setAllTaskDetail] = useState([]);
  const [timerPop, setTimerPop] = useState(false);




  const getAllProject = async () => {
    const ans = await getAllProjectApi();
    setAllProject(ans?.data);
    // console.log(allProject)
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
        getProjectTaskapi();const result = formdata.Members.map(userId => {
          const user = allEmp.find(e => e._id === userId);
          return user ? user.fullName : null;
        }).filter(fullName => fullName !== null);
        
        // console.log(result);
        result.forEach((e)=>
          postNotifyTask(e, formdata.Title,`${formdata?.DueDate}`)
      )
        setFormdata({
          Title: "",
          Description: "",
          Members: [], // Reset to an empty array
          StartDate: "",
          DueDate: "",
          Github: "",
          taskfile: "", // Ensure taskfile is also reset
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
        getProjectTaskapi();const result = formdata.Members.map(userId => {
          const user = allEmp.find(e => e._id === userId);
          return user ? user.fullName : null;
        }).filter(fullName => fullName !== null);
        
        // console.log(result);
        result.forEach((e)=>
          postNotifyTask(e, formdata.Title,`${formdata?.DueDate}`)
      )        
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
    // console.log(allTaskDetail)
  }, []);

  useEffect(() => {
    if (data) {
      setAllEmp(data?.Members);
    }
  }, [data]);

  const [isEdit, setisEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const totalPages = Math.ceil(allTasks?.length / tasksPerPage);
  const currentTasks = allTasks?.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

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
    // console.log(client);
        const membersNames = client.Members.map((memberId) => {
      const member = allEmp.find((emp) => emp._id === memberId?._id);
      return member ? member.fullName : "";
    });

    setisEdit(client._id);
    setFormdata({
      Title: client.taskName,
      Description: client.description,
      StartDate: client.startDate,
      DueDate: client.dueDate,
      Priority:client.priority
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

  const fetchAllTimesheet = async () => {
    const resp = await fetchAllTimesheetapi(data?._id);
    if(resp.status === 200){
      // console.log("res", resp);
      setTimesheet(resp?.taskTimelines);
    }

  }

useEffect(()=>{
  fetchAllTimesheet()
},[])

const [filterTimelines,setFilterTimelines]=useState()

const filterByTaskId = (taskId) => {
  if(altimesheet) {

    setFilterTimelines(altimesheet.filter(item => item.taskId._id === taskId))
    return altimesheet.filter(item => item.taskId._id === taskId);
  }
  return
};
// console.log(filterByTaskId("67e03be5b424002f7d3884bc"))
// console.log(altimesheet)
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
                {role !== "Client" && (
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
                )}

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
                    {currentTasks?.map((task, index) => (
                      // console.log(allTasks)
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{task?.taskName}</td>
                        <td style={{ display: "flex", gap: "-2px" }} className="borderNone">
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
                        <td className="px-6 py-4">
                          {task?.description?.length > 40
                            ? task.description.slice(0, 30) + "..."
                            : task.description}
                        </td>

                        <td className="px-6 py-4">{task?.Status}</td>
                        <td className="px-6 py-4 adddsomflex borderNone">
                          {role !== "Client" && (
                            <>
                            <MdDelete
                            onClick={() => deleteTasks(task?._id)}
                            className="iconsss"
                          />
                          <MdOutlineEdit
                            onClick={() => { handleEditClick(task) }}
                            className="iconsss2"
                          />
                            </>
                          )}
                          
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
              <p>{isEdit ? "Edit Task" : "Create New Task"}</p>
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
                    disabled={formdata?.Members?.length >= allEmp?.length}  >
                    <option value="Select">Select Employee</option>
                    {allEmp?.map((emp, index) => {
                      // Check if emp._id is already in formdata?.Members
                      const isAlreadySelected = proUser.includes(emp.fullName);

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
                  <p>Start Date</p>
                  <input
                    name="StartDate"
                    value={formdata.StartDate}
                    onChange={changeHandler}
                    type="date"
                    min={data.startDate}
                    max={data.deadline}
                  />
                </label>
                <label>
                  <p>Due Date</p>
                  <input
                    name="DueDate"
                    value={formdata.DueDate}
                    onChange={changeHandler}
                    type="date"
                    min={formdata.StartDate || data.startDate}
                    max={data.deadline}
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
            <ViewTask src={cut} data={formdata} timesheets={filterTimelines} onClick={() => setViewTask(false)} />
          </div>
        </div>
      </>)}
    </>
  );
};

export default ProjectOverview2;