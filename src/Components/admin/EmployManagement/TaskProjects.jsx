import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import pluss from "../../images/pluss.png";
import { Avatar } from "react-profile-avatar";
import "react-profile-avatar/dist/index.css";
import threedots from "../../images/thredonts.png";
import { useState } from "react";
import happy from "../../images/bx-happy-heart-eyes.png";
import edit from "../../images/edit.png";
import disable from "../../images/delete1.png";
import cut from "../../images/cutt.png";
import invidd from "../../images/invide.png"
import share from "../../images/bx-share-alt.png"
import bxcopy from "../../images/bx-copy.png"

const allProjects = [
  {
    projectName: "App Development",
    name: "A D",
    Status: "Finished",
    DueDate: "14-09-2024",
    para: "Install Business Systems Manager and appropriate patches on test or QA servers",
    member: "7",
    task: "7",
  },
  {
    projectName: "App Development",
    name: "A D",
    Status: "Finished",
    DueDate: "14-09-2024",
    para: "Install Business Systems Manager and appropriate patches on test or QA servers",
    member: "7",
    task: "7",
  },
  {
    projectName: "App Development",
    name: "A D",
    Status: "Finished",
    DueDate: "14-09-2024",
    para: "Install Business Systems Manager and appropriate patches on test or QA servers",
    member: "7",
    task: "7",
  },
  {
    projectName: "App Development",
    name: "A D",
    Status: "Finished",
    DueDate: "14-09-2024",
    para: "Install Business Systems Manager and appropriate patches on test or QA servers",
    member: "7",
    task: "7",
  },
  {
    projectName: "App Development",
    name: "A D",
    Status: "Finished",
    DueDate: "14-09-2024",
    para: "Install Business Systems Manager and appropriate patches on test or QA servers",
    member: "7",
    task: "7",
  },
];

const projectOpt = ["All", "Ongoing", "Finished", "OnHold"];

const TaskProjects = ({ setAlert, pop, setPop }) => {
  const { user } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [showIndex, setShowIndex] = useState(null);

  const [addClientPop, setAddClientPop] = useState(false);

  const [optIndex, setOptIndex] = useState(0);

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
                <h2>Projects</h2>

                <div className="clibtns">
                  <button
                    onClick={() => {
                      setAddClientPop(true);
                    }}
                    className="newcli"
                  >
                    <img src={pluss} alt="" /> <span>Add Project</span>
                  </button>
                  <button className="impcli">
                    <span>Import Project</span>
                  </button>
                  <button className="expoclient">
                    <span>Export Project</span>
                  </button>
                </div>
              </nav>

              {/* filter type  */}
              <div className="selectOption">
                {projectOpt.map((pr, index) => (
                  <div
                    onClick={() => setOptIndex(index)}
                    key={index}
                    className={`cursor-pointer singelPr ${
                      index === 0 && "addlefborder"
                    }  ${index === 3 && "addBorder"} ${
                      optIndex === index && "adddbg"
                    }`}
                  >
                    <span>{pr}</span>
                  </div>
                ))}
              </div>

              <div className="allClients">
                {allProjects.map((client, index) => (
                  <div key={index} className="singleProject">

                    <div
                      onClick={() => {
                        if (showIndex === index) {
                          setShowIndex(null);
                        } else {
                          setShowIndex(index);
                        }
                      }}
                      className="projnav cursor-pointer"
                    >
                      <div className="leftnav">
                        <Avatar
                          name={client?.name}
                          colour={
                            index % 3 == 0
                              ? "#3C78E9"
                              : `${index % 2 == 0 ? "#E45D3A" : "#F7A539"}`
                          }
                          size={32}
                          className="avatarclient"
                        />
                        <p>{client.projectName}</p>
                      </div>
                      <img src={threedots} alt="" />
                    </div>

                     <hr />

                      <div className="statusdue">

                        <div className={`stapro ${client.Status === "Finished"  && "finibg"} ${client.Status === "Ongoing"  && "Ongoingbg"} ${client.Status === "OnHold"  && "OnHoldbg"}`}>
                          <span >{client.Status}</span>
                        </div>

                          <p className="duedate"> <span>Due Date:</span>{client.DueDate}</p>

                      </div>

                    <p className="propara">{client?.para}</p>

                    <div className="mem">
                       <p>Members</p>
                    </div>

                <div className="protasjwon">

                    <p className="proteast">{client.task} Tasks</p>
                </div>

                    {showIndex === index && (
                      <div className="showIndexcont2">

                        <div className="singlinpro">
                          <img src={invidd} alt="" />
                          <span>Invite Employee</span>
                        </div>

                        <hr />

                        <div className="singlinpro">
                          <img src={edit} alt="" />
                          <span>Edit</span>
                        </div>

                        <hr />

                        <div className="singlinpro">
                          <img src={share} alt="" />
                          <span>Share to Clients</span>
                        </div>

 <hr />

                        <div className="singlinpro">
                          <img src={bxcopy} alt="" />
                          <span>Duplicate</span>
                        </div>

 <hr />


                        <div className="singlinpro">
                          <img src={disable} alt="" />
                          <span className="delspan">Delete</span>
                        </div>

                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {addClientPop && (
        <div className="addCliWrap">
          <div className="addClieCont addheight">
            <nav>
              <p>Create New Project</p>
              <img
                onClick={() => {
                  setAddClientPop(false);
                }}
                src={cut}
                alt=""
              />
            </nav>

            <hr />

            <form>
              <label>
                <p>Name</p>
                <input type="text" name="Name" placeholder="Name" />
              </label>

              <label>
                <p>Employee </p>
                {/* <input type="text" name="Email" placeholder="Email" /> */}
                <select name="" id=""></select>
              </label>


          
              <label>
                <p>Description</p>
                <textarea
                  type="text"
                  name="Description"
                  placeholder="Description"
                />
              </label>

              <div className="btnsss">
                <button className="saveclient">
                  <span>Add Project</span>
                </button>
                <button
                  onClick={() => {
                    setAddClientPop(false);
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
    </>
  );
};
export default TaskProjects;
