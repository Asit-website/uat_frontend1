import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import chevron from "../../images/chevron_right.png";

import emplyee from "../../images/emplyProfile.png"
import call from "../../images/call.png"
import mail from "../../images/mail.png"

import "./hrm.css";
import "./leaveEmp.css";
import { NavLink } from "react-router-dom";


const data = [
    {
        profile:emplyee,
        name:"Surbhi Rajwanshi",
        profession:"Jr.Developer",
        mail:"Surbhi@kusheldigi.com",
        phoneNumber:"9873******",
        department:"Developer",
        dateOfJoin:"02 March,2022"
    },
    {
        profile:emplyee,
        name:"Surbhi Rajwanshi",
        profession:"Jr.Developer",
        mail:"Surbhi@kusheldigi.com",
        phoneNumber:"9873******",
        department:"Developer",
        dateOfJoin:"02 March,2022"
    },
    {
        profile:emplyee,
        name:"Surbhi Rajwanshi",
        profession:"Jr.Developer",
        mail:"Surbhi@kusheldigi.com",
        phoneNumber:"9873******",
        department:"Developer",
        dateOfJoin:"02 March,2022"
    },
    {
        profile:emplyee,
        name:"Surbhi Rajwanshi",
        profession:"Jr.Developer",
        mail:"Surbhi@kusheldigi.com",
        phoneNumber:"9873******",
        department:"Developer",
        dateOfJoin:"02 March,2022"
    },
   

]

const LeaveEmployee = ({
  pop1,
  setPop1,
  pop,
  setPop,
  setAlert,
  isHr = false,
}) => {
  const { user } = useMain();

  return (
    <>
      <div className="employee-dash h-full">
        {isHr ? <HrSidebar /> : <AdminSidebar pop={pop} setPop={setPop} />}
        <div className="tm">
          {isHr ? (
            <HrNavbar
              user={user}
              setAlert={setAlert}
              pop1={pop1}
              setPop1={setPop1}
            />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">
            <div className="flex-col">
              {/* first  */}
              <div className="hrmDasTxtFir">
                <p className="hrmHed">Dashboard</p>

                <div className="hrDsPa">
                  <p className="hrFirDs">Dashboard</p>{" "}
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  <NavLink to={`/adminDash/HRM`}>
                    <span className="hrFirDs">HRM</span>
                  </NavLink>
                  <span>
                    <img src={chevron} alt="" />
                  </span>{" "}
                  <span className="thml">Employees on Leave</span>

                  


                </div>
              </div>


{/* second */}
<main className="laveEmplyWrap">
{
                data?.map((employ , index)=>(
                    <div key={index} className="singl_EmplyL">

                             <div className="singEmp_profileL">

                        <img src={employ?.profile} alt="" />
                           <h2>{employ?.name}</h2>
                           <p>{employ?.profession}</p>

                           <button className="inactBtn55"><span>Inactive</span></button>
                             </div>

                             <div className="empEmail_phnL">
                                <p><img src={mail} alt="" /> <span>{employ?.mail}</span></p>
                                <p><img src={call} alt="" /> <span>{employ?.phoneNumber}</span></p>
                             </div>

                             <div className="empDep_joinL">
                                <p>
                                    <span>Department</span>
                                    <span className="snsL">{employ?.department}</span>
                                </p>
                                <p>
                                    <span>Date of Joining</span>
                                    <span className="snsL">{employ?.dateOfJoin}</span>
                                </p>
                             </div>

                    </div>
                ))
             }

</main>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveEmployee;
