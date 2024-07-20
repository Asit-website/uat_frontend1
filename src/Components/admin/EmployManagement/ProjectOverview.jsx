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
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import cut from "../../images/cutt.png";
import CircularProgress from "./CircularProgress";
import ProgressBar from "@ramonak/react-progress-bar";


const ProjectOverview = ({ setAlert, pop, setPop }) => {
  const { user, getAllProjectApi, CreateProjectTask, getProjectTask } =
    useMain();

  const location = useLocation();

  const data = location?.state;

  console.log("data ",data);

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


  const [allEmp, setAllEmp] = useState([]);

  const [allProject, setAllProject] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const getProjectTaskapi = async () => {
    const ans = await getProjectTask(data?._id);
    const reversedTasks = ans?.data.reverse(); // Reverse the array
    setAllTasks(reversedTasks); // Set the reversed array
  };

  const getAllProject = async () => {
    const ans = await getAllProjectApi();
    setAllProject(ans?.data);
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

  const [openTask ,setOpenTask] =useState(0);
  const [OpenTaskper ,setOpenTaskper] =useState(0);

  const [daysleft , setDaysleft] =useState(0);
  const [daysleftper , setDaysleftper] =useState(0);


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

    
    const openTaskse = allTasks.filter(
      (task) => task.Status !== "Completed"
    ).length;


     setOpenTask(openTaskse);

     
    const completedPercentage = (completedTasks / totalTasks) * 100;
    const opentaskper = ((openTaskse / totalTasks) * 100).toFixed(0);
    const notStartPercentage = (notStartTasks / totalTasks) * 100;
    const startedPercentage = (startedtasks / totalTasks) * 100;
    const PendingPercentage = (Pendingtasks / totalTasks) * 100;

    setPercentage(completedPercentage);
    setOpenTaskper(opentaskper);
    setnotStartedTask(notStartPercentage);
    setstartedTask(startedPercentage);
    setPendingTask(PendingPercentage);

  }, [allTasks]);


  useEffect(()=>{
 // Calculate today's date
 const today = new Date();
    
 // Set your due date
 const dueDate = new Date('2024-07-26');
 
 // Calculate the difference in milliseconds
 const differenceMs = dueDate - today;
 
 // Convert milliseconds to days
 const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
 
 // Update state with the number of days left
 setDaysleft(daysDifference);
 
 // Calculate percentage of days left (assuming 365 days in a year)
 const totalDaysInYear = 20;
 const daysLeftPercentage = Math.ceil((daysDifference / totalDaysInYear) * 100);
 
 // Update state with the percentage of days left
 setDaysleftper(daysLeftPercentage);
  },[data])

 

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
            <div className="tclwrap2">


            <div className="projectOverView">

                 
              <nav>
                <div className="pronaheading">
                  <h2>OVERVIEW {data?.Name}</h2>
                
                </div>

             
              </nav>

               <div className="cont">
                {/* left  */}
                <div className="proleft">
                     <p>Project</p>
                      <p>{data?.Name}</p>
                      <p>Status</p>
                      <p>{data?.Status}</p>
                      <p>Date Created </p>
                       <p>{new Date(data?.createdAt).toISOString().split('T')[0]}</p>
                       <p>Deadline</p>
                       <p>{data?.DueDate}</p>
                </div>

                <div className="eachProgeer">
                   <h4>Project Progress</h4>
                  <CircularProgress percentage={percentage} color={'#4caf50'} />
                </div>

               </div>

               <hr />

               <div className="Decr">
                <h3>DESCRIPTION</h3>
                 <p>{data?.Description}</p>
               </div>

               <hr />

               <div className="embers">
                <h3>MEMBERS</h3>

                 <div className="allMEmb">
                    {
                        data?.Members?.map((mem , index)=>(
                            <div key={index} className="snglme">
                                <img src={mem?.profileImage} alt="" />
                                <p>{mem?.fullName}</p>
                            </div>
                        ))
                    }
                 </div>
               </div>


                 {/* <div className="allprogress">

              

                <div className="eachProgeer">
                   <h4>Pending Tasks</h4>
                  <CircularProgress percentage={pendingTask} color={'#f44336'} />
                </div>

          
                <div className="eachProgeer">
                   <h4>Not Started Tasks</h4>
                  <CircularProgress percentage={notStartedTask} color={'#ff9800'} />
                </div>
                
                <div className="eachProgeer">
                   <h4>Started Tasks</h4>
                  <CircularProgress percentage={startedTask} color={'#2196f3'} />
                </div>

                 </div> */}

              </div>

              <div className="secnoveview">


                <div className="navrighdiv">


                <nav>
                     <p>{openTask}/10 OPEN TASKS</p>
                     <ProgressBar completed={OpenTaskper} />
                </nav>

                <nav>
                     <p>{daysleft} DAYS LEFT</p>
                     <ProgressBar completed={daysleftper} />
                </nav>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};
export default ProjectOverview;
