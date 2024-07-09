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
import threedots from "../../images/thredonts.png"
import { useState } from "react";
import happy from "../../images/bx-happy-heart-eyes.png"
import edit from "../../images/edit.png"
import disable from "../../images/bx-hide.png"
import cut from "../../images/cutt.png"

const allClients = [
  {
    Name: "Darlene Robertson",
    Email: "finix@example.com",
  },
 
  {
    Name: "Darlene Robertson",
    Email: "finix@example.com",
  },
 
  {
    Name: "Darlene Robertson",
    Email: "finix@example.com",
  },
 
  {
    Name: "Darlene Robertson",
    Email: "finix@example.com",
  },
 
  {
    Name: "Darlene Robertson",
    Email: "finix@example.com",
  },
 
  {
    Name: "Darlene Robertson",
    Email: "finix@example.com",
  },
 
  {
    Name: "Darlene Robertson",
    Email: "finix@example.com",
  },
 
];

const TaskClients = ({ setAlert, pop, setPop }) => {
  const { user } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [showIndex , setShowIndex] = useState(null);

  const [addClientPop , setAddClientPop ] = useState(false);

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
                <h2>Clients</h2>

                <div className="clibtns">
                  <button onClick={()=>{
                    setAddClientPop(true);
                  }} className="newcli">
                    <img src={pluss} alt="" /> <span>New Client</span>
                  </button>
                  <button className="impcli">
                    <span>Import Client</span>
                  </button>
                  <button className="expoclient">
                    <span>Export Client</span>
                  </button>
                </div>
                
              </nav>

              <div className="allClients">

                {allClients.map((client, index) => (

                  <div key={index} className="singleclient2">

                     <div onClick={()=>{
                        if(showIndex === index){
                             setShowIndex(null);
                        }
                        else {
                            setShowIndex(index);
                        }
                     }}  className="navdiv cursor-pointer" >    <img src={threedots} alt="" />
                     </div>

                    <Avatar name={client?.Name} colour={index%3 == 0 ?"#3C78E9": `${index%2 == 0?"#E45D3A":"#F7A539"}`} size={60}  className="avatarclient"/>

                     <h3>{client?.Name}</h3>
                     <p>{client?.Email}</p>

                     {
                        showIndex === index && 
                        <div className="showIndexcont">
                          
                           <div className="singlinpro">
                            <img src={happy} alt="" />
                            <span>View</span>
                           </div>

                           <hr />

                           <div className="singlinpro">
                            <img src={edit} alt="" />
                            <span>Edit</span>
                           </div>

                           <hr />

                           <div className="singlinpro">
                            <img src={disable} alt="" />
                            <span className="delspan">Disable</span>
                           </div>


                        </div>
                     }

                  </div>

                ))}

              </div>
            </div>

          </div>
        </div>
      </div>


{
    addClientPop && 
       <div className="addCliWrap">
         
          <div className="addClieCont">

             <nav>
                <p>Add Client</p>
                <img onClick={()=>{
                    setAddClientPop(false);
                }} src={cut} alt="" />

             </nav>

              <hr />

               <form >

                 <label >
                    <p>Name</p>
                    <input type="text" name="Name"  placeholder="Name" />
                 </label>

                 <label >
                    <p>Email</p>
                    <input type="text" name="Email"  placeholder="Email" />
                 </label>

                  <div className="citstateCont">
                     
                  <label >
                    <p>City</p>
                    <input type="text" name="City"  placeholder="City" />
                 </label>

                  <label >
                    <p>State</p>
                    <input type="text" name="State"  placeholder="State" />
                 </label>

                  </div>

                  <div className="citstateCont">
                     
                  <label >
                    <p>Zip/Post Code</p>
                    <input type="text" name="ZipCode"  placeholder="Zip/Post Code" />
                 </label>

                  <label >
                    <p>Country</p>
                    <input type="text" name="Country"  placeholder="Country" />
                 </label>

                  </div>

                  <label >
                    <p>Phone Number</p>
                    <input type="text" name="PhoneNumber"  placeholder="Phone Number" />
                 </label>

                  <label >
                    <p>Address</p>
                    <input type="text" name="Address"  placeholder="Address" />
                 </label>


                 <div className="btnsss">
                    <button className="saveclient"><span>Save Client</span></button>
                    <button onClick={()=>{
                    setAddClientPop(false);
                }} className="cancel"><span>Cancel</span></button>
                 </div>
                  
               </form>

          </div>

       </div>

}
       
    </>
  );
};
export default TaskClients;
