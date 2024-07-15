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
import predit from "../../images/Frame 9740.png"
import predel from "../../images/Frame 9741.png"


const allProject = {
  Name: "App Development",
  Description: "description",
  Members: "7",
  Status: "Ongoing",
  DueDate: "07 Jul 2024",
};

const ProjectDetails = ({ setAlert, pop, setPop }) => {
  const { user } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

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
                  <p    className={`stapro ${
                          allProject.Status === "Finished" && "finibg"
                        } ${allProject.Status === "Ongoing" && "Ongoingbg"} ${
                            allProject.Status === "OnHold" && "OnHoldbg"
                        }`}>{allProject?.Status}</p>
                </div>

                <div className="clibtns">
                  <button className="backpro">
                    <span>Back</span>
                  </button>
                  <button className="newcli">
                    <img src={pluss} /> <span>Add Project</span>
                  </button>
                </div>
              </nav>

               <div className="prodlefriwrap">


        {/* left side */}
        <div className="leftprodetail">

            <label >
                <p className="filn">Start Date:</p>
                <p className="proand">07 Jul 2024</p>
            </label>
            <label >
                <p className="filn">Due Date:</p>
                <p className="proand">{allProject?.DueDate}</p>
            </label>
            <label >
                <p className="filn">Total Members</p>
                <p className="proand">{allProject.Members}</p>
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


            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProjectDetails;
