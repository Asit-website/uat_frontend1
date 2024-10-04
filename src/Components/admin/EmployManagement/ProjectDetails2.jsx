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


var tc3;
var tc4;

const ProjectDetails2 = ({ setAlert, pop, setPop }) => {
  const { user, getAllProjectApi, CreateProjectTask, getMyProjectTask  , timerHandlerapi} =useMain();

  const location = useLocation();

  const data = location?.state;

  const [percentage, setPercentage] = useState(0);
  const [pendingTask, setPendingTask] = useState(0);
  const [notStartedTask, setnotStartedTask] = useState(0);
  const [startedTask, setstartedTask] = useState(0);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [formdata, setFormdata] = useState({
    Title: "",
    Description: "",
    Members: "",
    StartDate: "",
    DueDate: "",
    // Project: "",
    Priority: "",
    Github: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [addClientPop, setAddClientPop] = useState(false);

  const [allEmp, setAllEmp] = useState([]);

  const [allProject, setAllProject] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const getProjectTaskapi = async () => {
    const ans = await getMyProjectTask(data?._id , hrms_user?._id);
    const reversedTasks = ans?.data.reverse(); // Reverse the array
    setAllTasks(reversedTasks); // Set the reversed array
  };

  const getAllProject = async () => {
    const ans = await getAllProjectApi();
    setAllProject(ans?.data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const toastId = toast.loading("Loading....");

      const ans = await CreateProjectTask({
        ...formdata,
        projectId: data?._id,
      });
      if (ans?.status) {
        toast.success("Successfuly created task");
      }

      setAddClientPop(false);
      getProjectTaskapi();
      setFormdata({
        Title: "",
        Description: "",
        Members: "",
        StartDate: "",
        DueDate: "",
        Github: "",
      });

      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong , please try again");
    }
  };

  useEffect(() => {
    getAllProject();
    getProjectTaskapi();
  }, []);

  useEffect(() => {
    if (data) {
      setAllEmp(data?.Members);
    }
  }, [data]);

  useEffect(() => {
    
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(
      (task) => task.Status === "Completed"
    ).length;
    
    const notStartTasks = allTasks.filter(
      (task) => task.Status === "Not Started"
    ).length;

    const startedtasks = allTasks.filter(
      (task) => task.Status === "Started"
    ).length;
    const Pendingtasks = allTasks.filter(
      (task) => task.Status === "Pending"
    ).length;

     
    const completedPercentage = (completedTasks / totalTasks) * 100;
    const notStartPercentage = (notStartTasks / totalTasks) * 100;
    const startedPercentage = (startedtasks / totalTasks) * 100;
    const PendingPercentage = (Pendingtasks / totalTasks) * 100;

    setPercentage(completedPercentage);
    setnotStartedTask(notStartPercentage);
    setstartedTask(startedPercentage);
    setPendingTask(PendingPercentage);

  }, [allTasks]);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  
  // Calculate the total number of pages
  const totalPages = Math.ceil(allTasks.length / tasksPerPage);

  // Get the tasks for the current page
  const currentTasks = allTasks.slice(
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

  const [timerPop , setTimerPop] = useState(false);

  const [timerData , setTimerData] = useState({
    taskId:"" , 
    Note:"" , 
  })


  const timerChange = (e)=>{
    const {name ,value} = e.target;
    setTimerData((prev)=>({
      ...prev ,
      [name]:value
    }))
  }

  const closeTimer = async()=>{
    clearInterval(tc3);
    clearInterval(tc4);
    setMount(!mount);
    setClock(0);


    localStorage.removeItem("taskTimer");
    localStorage.removeItem("timerClockIn");
    localStorage.removeItem("timeIn");
   
  }

  const clockIn = async () => {

    let t = localStorage.getItem("taskTimer");

    if (!t){

        localStorage.setItem( "timerClockIn",
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );

      const currentTime = new Date(); 
      const timeOut = currentTime.toISOString(); 
      
      localStorage.setItem('timeIn', currentTime.toISOString());   // Set clock-in time in ISO format

      localStorage.setItem("taskTimer", new Date().getTime());
      
      tc4 = setInterval(() => {
        setClock(++clock);
      }, 1000);
    } 
    else {
  setTimerPop(true);
    }

    setMount(!mount);
  };


  const timerHandler = async(e)=>{

    e.preventDefault();

    const currentTime = new Date();
  
    const timeIn = new Date(localStorage.getItem('timeIn'));
    const timeOut = currentTime.getTime();

      const difference = currentTime.getTime() - timeIn.getTime(); 
  
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
      const diffTime = `${hours}:${minutes}:${seconds}`;  
      
  
    const resp = await timerHandlerapi({Note: timerData.Note , taskId: timerData?.taskId , timeIn: timeIn, timeOut: timeOut , totalTime: diffTime , user: hrms_user?._id , projectId: data?._id });

    if(resp?.status){
      closeTimer();
      toast.success("Successfuly done");
      setTimerPop(false);
    }
    else{
      toast.error("Something went wrong");
    }
   }

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

          tc3 = setInterval(() => {
          }, 1000);
      } else {
        let t7 = localStorage.getItem("clock-out-time");
        let t5 = Math.floor((t7 - t) / 1000);
        setClock(t5);
      }
    }

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    initializeTimer();
  }, []);

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
                      allProject.Status === "Finished" && "finibg"
                    } ${allProject.Status === "Ongoing" && "Ongoingbg"} ${
                      allProject.Status === "OnHold" && "OnHoldbg"
                    }`}
                  >
                    {allProject?.Status}
                  </p>
                </div>

                {
                  hrms_user?.designation === "Manager" && hrms_user?.designation === "UI/UX Designer" && hrms_user?.designation === "Senior Digital Marketing" &&  <div className="clibtns">
                  <NavLink to="/adminDash/HRM/taskProjects"><button className="backpro">
                      <span>Back</span>
                    </button></NavLink>
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
                  <p>{Math.floor((clock % 3600) / 60)}</p>:
                  <p>{clock % 60}</p>
                  </div>


                <div>
                  <IoMdTimer onClick={clockIn} className="cursor-pointer"/>
                  </div>

                  <div>
                    <img src={predit} alt="" />
                  </div>
                  <div>
                    <img src={predel} alt="" />
                  </div>
                 
                </div>
              </div>

              {/* this is all tasks now  */}

              <div className="relative overflow-x-auto">
      <table className="w-full prodetailTable text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Subject</th>
            <th scope="col" className="px-6 py-3">Assign To</th>
            <th scope="col" className="px-6 py-3">StartDate</th>
            <th scope="col" className="px-6 py-3">DueDate</th>
            <th scope="col" className="px-6 py-3">Priority</th>
            <th scope="col" className="px-6 py-3">Github</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{task.Title}</td>
              <td className="px-6 py-4">{task?.Members?.fullName}</td>
              <td className="px-6 py-4">{task?.StartDate}</td>
              <td className="px-6 py-4">{task?.DueDate}</td>
              <td className="px-6 py-4">{task?.Priority}</td>
              <td className="px-6 py-4">{task?.Github}</td>
              <td className="px-6 py-4">{task?.Description}</td>
              <td className="px-6 py-4">{task?.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
                  setFormdata({
                    Name: "",
                    Description: "",
                    Members: "",
                    Status: "Ongoing",
                    DueDate: "",
                    Members: "",
                  });
                }}
                src={cut}
                alt=""
              />
            </nav>

            <hr />

            <form onSubmit={submitHandler}>
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

                <select
                  name="Members"
                  value={formdata.Members}
                  onChange={changeHandler}
                >
                  <option value="Select">Select Employee</option>
                  {allEmp?.map((emp, index) => (
                    <option value={emp?._id} key={index}>
                      {emp?.fullName}
                    </option>
                  ))}
                </select>
              </label>

              {/* <label>
                <p>Project </p>

                <select
                  name="Project"
                  value={formdata.Project}
                  onChange={changeHandler}
                >
                  <option value="Select">Select Employee</option>
                  {allProject?.map((emp, index) => (
                    <option value={emp?._id} key={index}>
                      {emp?.Name}
                    </option>
                  ))}
                </select>
              </label> */}

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
                <p>Github Link</p>
                <input
                  name="Github"
                  value={formdata.Github}
                  onChange={changeHandler}
                  type="text"
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

              <div className="btnsss">
                <button type="submit" className="saveclient">
                  <span>Add Task</span>
                </button>
                <button
                  onClick={() => {
                    setAddClientPop(false);
                    setFormdata({
                      Name: "",
                      Description: "",
                      Members: "",
                      Status: "Ongoing",
                      DueDate: "",
                      Members: "",
                    });
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


      {timerPop && (
        <div className="addCliWrap">

          <div className="addClieCont fitheight">

            <nav>
              <p>Timer Details</p>
              <img
                onClick={() => { setTimerPop(false);}}
                src={cut}
              />
            </nav>

            <hr />

            <form onSubmit={timerHandler}>

              <select name="taskId"  onChange={timerChange} value={timerData.taskId} >
                <option value="Select">Select Task</option>
{
  allTasks?.map((task , index)=>(
    <option key={index} value={task?._id}>{task?.Title}</option>
  ))
}
              </select>

      
              <input name="Note"  onChange={timerChange} value={timerData.Note} type="text" placeholder="Enter Note..." className="noteInput" />
             

              <div className="btnsss">
                <button type="submit" className="saveclient">
                  <span>Add</span>
                </button>
                <button
                  onClick={() => {
                    setTimerPop(false);   }}
                  className="cancel"
                >
                  <span>Cancel</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      )}

     


    </>
  );
};
export default ProjectDetails2;
