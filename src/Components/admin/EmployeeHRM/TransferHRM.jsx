import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import chevron from "../../images/chevron_right.png";
import { useMain } from "../../../hooks/useMain";

import "./award.css";

import plusIcon from "../../images/plusIcon.png";


const HRMsystemSetup = ({ setAlert, pop, setPop }) => {
  const { user  , allEmployee , getDepartments , createTransfer , getTransfer , getBranchs} = useMain();


  const [open, setOpen] = useState(0);
  const [allTransfer , setAllTransfer] = useState([]);

  const [popup1, setPopup1] = useState(false);

  const [allEmp , setAllEmp] = useState([]);

  const [allDep , setAllDep] = useState([]);

  const [allBranch , setBranch] = useState([]);

  const fetchAllEmp = async()=>{
    const ans = await allEmployee();
    setAllEmp(ans?.emp);
  }

  const fetchAllDep = async()=>{
    const ans = await getDepartments();
    setAllDep(ans?.data);
  }

  const [formdata , setFormdata] = useState({
    branch:"" , Employee:"" , Department:"" ,TransferDate:"" , Description:""
  })

  const changeHandler = (e)=>{
    const {name , value} = e.target;

     setFormdata((prev)=>({
      ...prev ,
      [name]:value
     }))
  }

  const fetchTranfer = async()=>{
    const ans = await getTransfer();
    console.log("tt",ans);
    setAllTransfer(ans?.data);
  }

  const submitHandler = async()=>{
    const ans = await createTransfer({...formdata});
    if(ans?.status){
      alert("Successfuly created");
      fetchTranfer();
 setPopup1(false);

    }
  }

  const fetchBranch = async()=>{
    const ans = await getBranchs();
    setBranch(ans?.data);
  }


  useEffect(()=>{
    fetchAllEmp();
    fetchAllDep();
    fetchTranfer();
    fetchBranch();
  },[])

  return (
    <>
      <div className="employee-dash h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm awardtm">
          <AdminNavbar user={user} setAlert={setAlert} />

          <div className="em">
            <div className="flex-col">
              <div className="admin-main adminmain">
                <div className="plusSection">
                  <div className="adminFirt">
                    <h2 className="hrmShed">Manage Transfer</h2>

                    <div className="hrmDoHe">
                      <p>Dashboard</p>
                      <img src={chevron} alt="" />
                      <span>Transfer</span>
                    </div>
                  </div>


                  <img
                    onClick={() => {
                      if (open === 0) {
                        setPopup1(true);
                      }
                    }}
                    className="plusiCON"
                    src={plusIcon}
                    alt=""
                  />
                </div>

                <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
               <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                   <tr>
                     <th scope="col" className="px-6 py-3">
                       EMPLOYEE NAME
                     </th>
                     <th scope="col" className="px-6 py-3">
                       <div className="flex items-center">
                         BRANCH
                         <a href="#">
                           <svg
                             className="w-3 h-3 ms-1.5"
                             aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                           >
                             <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                           </svg>
                         </a>
                       </div>
                     </th>
                     <th scope="col" className="px-6 py-3">
                       <div className="flex items-center">
                         DEPARTMENT
                         <a href="#">
                           <svg
                             className="w-3 h-3 ms-1.5"
                             aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                           >
                             <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                           </svg>
                         </a>
                       </div>
                     </th>
                     <th scope="col" className="px-6 py-3">
                       <div className="flex items-center">
                         TRANSFER DATE
                         <a href="#">
                           <svg
                             className="w-3 h-3 ms-1.5"
                             aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                           >
                             <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                           </svg>
                         </a>
                       </div>
                     </th>
                     <th scope="col" className="px-6 py-3">
                     <div className="flex items-center">
                         DESCRIPTION
                         <a href="#">
                           <svg
                             className="w-3 h-3 ms-1.5"
                             aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                           >
                             <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                           </svg>
                         </a>
                       </div>
                     </th>
                     <th scope="col" className="px-6 py-3">
                     <div className="flex items-center">
                         ACTION
                         <a href="#">
                           <svg
                             className="w-3 h-3 ms-1.5"
                             aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                           >
                             <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                           </svg>
                         </a>
                       </div>
                     </th>
                   </tr>
                 </thead>
                 <tbody>
           
     {
      allTransfer?.map((item ,index)=>(
        <tr key={index} class="bg-white dark:bg-gray-800">
             
        <td class="px-6 py-4">
            {item?.Employee?.fullName}
        </td>
        <td class="px-6 py-4">
            {item?.branch}
        </td>
        <td class="px-6 py-4">
            {item?.Department}
        </td>
        <td className="px-6 py-4">{new Date(item?.TransferDate).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</td>

        <td class="px-6 py-4">
            {item?.Description}
        </td>
        <td class="px-6 py-4">
          ACTION
        </td>
    </tr>
      ))
     }
        </tbody>
               </table>
              </div>

                </div>


                <>
                  {/* Main modal */}
                 
                </>
                
              </div>
            </div>
          </div>
        </div>

        {popup1 && (
          <div className="allPopupWrap">
            <div className="popup1 awardpopup">
              <h2>Create New Transfer</h2>
              <label className="cross-icon"></label>

              <hr />

              <div className="award-popup-label">
              <label htmlFor="">
                <p>Employee</p>
                <select name="Employee" onChange={changeHandler} id="">
                  <option value="select Employee">select Employee</option>
                  {
                    allEmp?.map((item ,index)=>(
                      <option value={item?.fullName} key={index}>{item?.fullName}</option>
                    ))
                  }
                </select>
              
              </label>
              <label htmlFor="">
                <p>Branch</p>
                <select name="branch" onChange={changeHandler} id="">
                  <option value="select Branch">select Branch</option>
                  {
                    allBranch?.map((item ,index)=>(
                      <option value={item?.name} key={index}>{item?.name}</option>
                    ))
                  }
                </select>
                
              </label>
              </div>
              <div className="award-popup-label">
              <label htmlFor="">
                <p>Department</p>
                <select   name="Department" onChange={changeHandler} id="">
                  <option value="select Department">select Department</option>
                  {
                    allDep.map((item ,index)=>(
                      <option value={item?.name} key={index}>{item.name}</option>
                    ))
                  }
                </select>
               
              </label>
              <label htmlFor="">
                <p>Transfer Date</p>
                <input
                  type="date"
                value={formdata.TransferDate}
                onChange={changeHandler}                 
                name="TransferDate"
                  placeholder="dd-mm-yyyy"
                />
              </label>
              </div>

              <div className="award-popup-label award-popup-textarea">
              <label htmlFor="">
                <p>Description</p>
                <textarea onChange={changeHandler}
                 value={formdata.Description} id="w3review" name="Description" rows="8" cols="50" placeholder="Enter Description"></textarea>
              </label>
              </div>
              {/* <div/> */}

              <hr />

              <div className="btnWrap Award-popup-btn">
                <button className="cencel awd-cancel" onClick={() => setPopup1(false)}>
                  <span>Cancel</span>
                </button>

                <button onClick={submitHandler} className="create awd-create" >
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </>
  );
};

export default HRMsystemSetup;
