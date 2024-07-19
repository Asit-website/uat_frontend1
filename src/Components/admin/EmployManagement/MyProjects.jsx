import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import { Avatar } from "react-profile-avatar";
import "react-profile-avatar/dist/index.css";
import threedots from "../../images/thredonts.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const MyProjects = ({ setAlert, pop, setPop }) => {
  const { user  , getAllProjectUserApi} = useMain();

  const [allProjects, setAllProject] = useState([]);

  const navigate = useNavigate();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const fetchuserapi = async()=>{
    const ans = await getAllProjectUserApi();
     setAllProject(ans?.projects);
  }

  useEffect(()=>{
    fetchuserapi();
  },[])

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
                <h2> My Projects</h2>
              </nav>

              <div className="allClients">
                {allProjects.map((client, index) => (

                  <div key={index} className="singleProject">
                    
                    <div onClick={()=>{
                       navigate("/employeeDash/HRM/projectDetails" , {state:client})
                    }} className="projnav cursor-pointer">

                      <div className="leftnav">
                        <Avatar
                          name={client?.Name}
                          colour={
                            index % 3 == 0
                              ? "#3C78E9"
                              : `${index % 2 == 0 ? "#E45D3A" : "#F7A539"}`
                          }
                          size={32}
                          className="avatarclient"
                        />
                        <p>{client.Name}</p>
                      </div>

                      {/* <img src={threedots} alt="" /> */}
                    </div>

                    <hr />

                    <div className="statusdue">
                      <div
                        className={`stapro ${
                          client.Status === "Finished" && "finibg"
                        } ${client.Status === "Ongoing" && "Ongoingbg"} ${
                          client.Status === "OnHold" && "OnHoldbg"
                        }`}
                      >
                        <span>{client.Status}</span>
                      </div>

                      <p className="duedate">
                        {" "}
                        <span>Due Date:</span>
                        {client?.DueDate}
                      </p>
                    </div>

                    <div className="propara">
                      <p className="">{client?.Description}</p>
                    </div>

                    <div className="mem">
                      <p>Members</p>
                      <p>{client?.Members?.length}</p>
                    </div>

                    <div className="protasjwon">
                      <p className="proteast">{client.task} Tasks</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyProjects;
