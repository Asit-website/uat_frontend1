import React, { useMemo, useRef, useState } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import bxUser from "../../images/bx-user-pin.png";
import docSub from "../../images/docSubfir.png"
import JoditEditor from 'jodit-react';

import "./document.css";



const item = [
    {
      title: "Full-time Employees",
    },
    {
      title: "Intern Employees",
    },
    {
      title: "Freelancer Employees",
    },
  ];
  
const DocumentManagement = ({ setAlert, pop, setPop }) => {
  const { user} = useMain();


  const [currEmp, setCurrEmp] = useState(0);

  const editor = useRef(null);

  const [content, setContent] = useState('');

   const config = {
    placeholder: "start typing"
   }


  return (
    <>
      <div className="employee-dash h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />

          <div className="em">
            <div className="flex-col">
              <div className="docuwrap">

               <h2 className="docHead">Document Management</h2>

                 {/* first sec */}
              <div className="leadInFir2">
                {item.map((e, index) => (
                  <div
                    onClick={() => setCurrEmp(index)}
                    className="sinInfir"
                    key={index}
                  >
                    <img src={bxUser} alt="" />

                    <p className={`${currEmp == index ? "currEmp" : "nom"}`}>
                      {e.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* second  */}
              <div className="docuSec">
                
{/* ff */}
<div className="doSubFir">
    <img src={docSub} alt="" />
     <span>Offer Latter</span>
</div>

 <hr />

 {/*ss */}
 <div className="doSubSs">
    <span>Placeholders</span>
 </div>

 <hr />

 {/* thh */}
 <div className="doSubThi">

    {/* f */}
    <div className="dothiff">
        <label  >
             <p>Applicant Name :</p>
              {/* <span>applicant_name</span> */}
              <input type="text" placeholder="{_applicant_name}" />
        </label>
        <label  >
             <p>Job type :</p>
              {/* <span> job_type</span> */}
              <input type="text" placeholder="{ job_type}" />

        </label>
        <label  >
             <p>Days Of Week :</p>
              {/* <span> days_of_week</span> */}
              <input type="text" placeholder="{ days_of_week}" />

        </label>
    </div>

    {/* s*/}
    <div className="dothiff">
        <label  >
             <p>Company Name : </p>
              {/* <span>app_name</span> */}
              <input type="text" placeholder="{app_name}" />

        </label>
        <label  >
             <p>Proposed Start Date : </p>
              {/* <span>start_date</span> */}
              <input type="text" placeholder="{start_date}" />

        </label>
        <label  >
             <p>Salary : </p>
              {/* <span>salary</span> */}
              <input type="text" placeholder="{salary}" />

        </label>
    </div>

    {/* f */}
    <div className="dothiff">
        <label  >
             <p>Job title : </p>
              {/* <span>job_title</span> */}
              <input type="text" placeholder="{job_title}" />

        </label>
        <label  >
             <p>Working Location : </p>
              {/* <span>workplace_location</span> */}
              <input type="text" placeholder="{workplace_location}" />

        </label>
        <label  >
             <p>Salary Type : </p>
              {/* <span>salary_type</span> */}
              <input type="text" placeholder="{salary_type}" />

        </label>
    </div>

 </div>


              </div>


              {/* third  */}

               <div className="docuThird">

                <h3>Format</h3>
                
                <hr />
                

               <JoditEditor
			ref={editor}
			value={content}
			tabIndex={1} 
			onBlur={newContent => setContent(newContent)} 
			onChange={newContent => {setContent(newContent)}}
		/>

               </div>


              </div>
            </div>
          </div>
          
        </div>



      </div>
    </>
  );

}
export default DocumentManagement;