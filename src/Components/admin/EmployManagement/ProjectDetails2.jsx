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

const ProjectDetails2 = ({ setAlert, pop, setPop }) => {

  const {
    user,
    getAllProjectApi,
    getAllProjectUserTaskApi2 , changeTaskStatusApi
  } = useMain();

  const location = useLocation();

  const data = location?.state;

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;
  
  const [allProject, setAllProject] = useState([]);
  const [allTasks, setAllTasks] = useState([]);


  const getMyProjectTaskapi = async () => {
    const ans = await getAllProjectUserTaskApi2(data?._id);
    const reversedTasks = ans?.data.reverse(); // Reverse the array
    setAllTasks(reversedTasks); // Set the reversed array
  };
  

  const getAllProject = async () => {
    const ans = await getAllProjectApi();
    setAllProject(ans?.data);
  };

  const changeTaskStatus =async(value , taskId) =>{
     const toastId = toast.loading("Loading...");
      const ans = await changeTaskStatusApi(value , taskId);
      getMyProjectTaskapi();

       if(ans?.status){
         toast.success("Successfuly done");
       }

       toast.dismiss(toastId);
  }

  useEffect(() => {
    getAllProject();
    getMyProjectTaskapi();
     
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
                  <h2>App Development</h2>
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

                <div className="clibtns">
                  <button className="backpro">
                    <span>Back</span>
                  </button>
               
                </div>
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
                  <div>
                    <img src={predit} alt="" />
                  </div>
                  <div>
                    <img src={predel} alt="" />
                  </div>
                </div>
              </div>

              {/* this is all tasks now  */}

              <div class="relative overflow-x-auto">

                <table class="w-full prodetailTable text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Subject
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Assign To
                      </th>
                      <th scope="col" class="px-6 py-3">
                        StartDate
                      </th>
                      <th scope="col" class="px-6 py-3">
                        DueDate
                      </th>
                    
                      <th scope="col" class="px-6 py-3">
                        Priority
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Github
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Description
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {allTasks?.map((task, index) => (
                      <tr
                        key={index}
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td class="px-6 py-4">{task.Title}</td>
                        <td class="px-6 py-4">{task?.Members?.fullName}</td>
                        <td class="px-6 py-4">{task?.StartDate}</td>
                        <td class="px-6 py-4">{task?.DueDate}</td>
                        <td class="px-6 py-4">{task?.Priority}</td>
                        <td class="px-6 py-4">{task?.Github}</td>
                        <td class="px-6 py-4">{task?.Description}</td>
                        <td class="px-6 py-4">
                            <select name="taskStatus"  value={task?.Status} onChange={(e)=> changeTaskStatus(e.target.value , task?._id)} >
                                <option value="Not Started">Not Started</option>
                                <option value="Started">Started</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>

            </div>

          </div>
        </div>
      </div>

   
    </>
  );
};
export default ProjectDetails2;
