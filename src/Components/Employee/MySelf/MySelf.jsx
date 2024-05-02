import React from "react";
import EmployeeNavbar from "../Navbar/EmployeeNavbar";
import EmployeeSidebar from "../Sidebar/EmployeeSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./myself.css"
import doc from "../../images/docu.png"
import  bx from "../../images/bxs-download.png"
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";

const MySelf = ({ setAlert, pop1, setPop1 }) => {
  // =================punch in punch out concept==========
  const {
    user,
    postActivity,
    getStatisticsByUser,

  } = useMain();

  let user1 = JSON?.parse(localStorage.getItem("hrms_user"));

  console.log("user ",user1);


  return (
    <>
      <div className="employee-dash h-full">
         {
            user1?.role === "ADMIN" ?
            <AdminSidebar />
            :
        <EmployeeSidebar />
         }
        <div className="tm">
          <EmployeeNavbar
            user={user}
            setAlert={setAlert}
            postActivity={postActivity}
            getStatisticsByUser={getStatisticsByUser}
            pop1={pop1}
            setPop1={setPop1}
          />

         <div className="em manem">

            <nav className="myselfNav">
                <h2>My self</h2>

                <select name="" id="">
                    <option value="Document">Document</option>
                    <option value="Offer Latter">Offer Latter</option>
                    <option value="Experience Letter">Experience Letter</option>
                    <option value="Experience Letter">Experience Letter</option>
                    <option value="Experience Letter">Experience Letter</option>
                </select>
                
            </nav>


            {/* first section  */}
            <div className="myselfFirst">


                 <h3>Employee Detail</h3>

                 <hr />

 <div className="allFristDe3tail">

                 <div className="singfirst">
                    <p>Employee ID :</p>
                    <span>{user1?.employeeCode}</span>
                 </div>

                 <div className="singfirst">
                    <p>Name :</p>
                    <span>{user1?.fullName}</span>
                 </div>

                 <div className="singfirst">
                    <p>Department :</p>
                    <span>{user1?.department}</span>
                 </div>

                 <div className="singfirst">
                    <p>Designation :</p>
                    <span>{user1?.designation}</span>
                 </div>

                 <div className="singfirst">
                    <p>Date of Joining :</p>
                    <span>{user1?.joiningDate}</span>
                 </div>

                 <div className="singfirst">
                    <p>Office Email :</p>
                    <span>{user1?.email}</span>
                 </div>

            </div>

            </div>

            {/* second section  */}
            <div className="myselfFirst">


                 <h3>Other Detail</h3>

                 <hr />

 <div className="allFristDe3tail">

                 <div className="singfirst">
                    <p>Address :</p>
                    <span>{user1?.currentAddress}</span>
                 </div>

                 <div className="singfirst">
                    <p>Mobile :</p>
                    <span>{user1?.mobile}</span>
                 </div>

                 <div className="singfirst">
                    <p>Personal ID :</p>
                    <span>{user1?.email1}</span>
                 </div>

                 <div className="singfirst">
                    <p>Gender :</p>
                    <span>{user1?.gender}</span>
                 </div>

                

            </div>

            </div>

               {/* thid  section  */}
               <div className="myselfFirst">


<h3>Document Upload</h3>

<hr />

<div className="allFristDe3tail2">

    {
        user1?.document?.map((item ,index)=>(
            <div className="singleDoc" key={index}>

                    {/* left */}
                    <div className="sidocLeft">

                <img src={doc} alt="" />

                <div className="ffwrap">
                    <p className="ff"> Tech requirment :</p>
                     <p className="dd">200KB</p>
                </div>

                    </div>

                    {/* right  */}
                    <p className="singDocRight">Jan 4, 2024</p>

            </div>
        ))
    }


</div>

</div>


  {/* fourth section  */}
  <div className="myselfFirst">


<h3>Bank Account Detail</h3>

<hr />

<div className="allFristDe3tail">

<div className="singfirst">
   <p> Account Holder Name</p>
   <span>{user1?.accHolderName}</span>
</div>

<div className="singfirst">
   <p>Account No :</p>
   <span>{user1?.accNo}</span>
</div>

<div className="singfirst">
   <p> Bank Name :</p>
   <span>{user1?.bankName}</span>
</div>

<div className="singfirst">
   <p>Bank Identifier Code :</p>
   <span>{user1?.bankIndentifier}</span>
</div>

<div className="singfirst">
   <p>Branch Location :</p>
   <span>{user1?.branchLocation}</span>
</div>
<div className="singfirst">
   <p>Tax Payer Id :</p>
   <span>{user1?.taxPayerId}</span>
</div>



</div>

</div>


 <div className="reqcahgng">

    <button className="rqbtn"><span>Request Change</span></button>

 </div>


         </div>

     

        </div>
      </div>
    </>
  );
};

export default MySelf;
