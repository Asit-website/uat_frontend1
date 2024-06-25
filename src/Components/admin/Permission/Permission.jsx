import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminNavbar from "../Navbar/AdminNavbar";
import { useMain } from "../../../hooks/useMain";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./permission.css"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Permission = ({ pop, setPop, setAlert }) => {

  const { user ,allEmployee ,getDesignations  , ProvidePermission , RemovePermission  } = useMain();

  const [formdata , setFormdata] = useState({
    Service:"" , 
    userId:"" , 
    Designation:"" , 
    SubPermission:"" , 
  })

  const [allEmp , setAllEmp] = useState([]);
  const [allDesig , setAllDesig] = useState([]);


  const changeHandler = (e)=>{
    const {name , value} = e.target;

     setFormdata((prev)=>({
        ...prev ,
        [name]:value
     }))

  }
 
  const allEmployeFetch = async()=>{
    const ans  = await allEmployee();
     setAllEmp(ans?.emp);
  }

  const alldesinationFetch = async()=>{
    const ans  = await getDesignations();
     setAllDesig(ans?.data);
  }

 useEffect(()=>{
    allEmployeFetch();
    alldesinationFetch();
 },[])


 const applyPermission = async()=>{
     const toastId = toast.loading("Loading...");
  const ans = await ProvidePermission({Designation:formdata?.Designation , userId:formdata?.userId , Service:formdata?.Service , SubPermission: formdata?.SubPermission});

        toast.success("Successfuly done");
    toast.dismiss(toastId);
 }

  return (
    <>
      <div className="annDash relative h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />
          <div className="em">

              <div className="permiCont">

                 <label >
                    <p>Service</p>
                     <select onChange={changeHandler} name="Service" value={formdata.Service} >
                  
                        <option value="leadPermission">leadPermission</option>
                        <option value="hrmsSetUpPermission">hrmsSetUpPermission</option>
                        <option value="leadSystemPermission">leadSystemPermission</option>
                        <option value="attendencePermission">attendencePermission</option>
                        <option value="assetsPermission">assetsPermission</option>
                        <option value="documentPermission">documentPermission</option>
                        <option value="leaveManagePermission">leaveManagePermission</option>
                        <option value="performancePermission">performancePermission</option>
                        <option value="employeeManagePermission">employeeManagePermission</option>
                        <option value="payrollPermission">payrollPermission</option>
                     </select>
                 </label>

              <label >
                <p>All User</p>
                <select name="userId" value={formdata.userId} onChange={changeHandler}>
                     {
                        allEmp?.map((emp , index)=>(
                            <option value={emp?._id} key={index} >{emp?.fullName}</option>
                        ))
                     }
                </select>
              </label>

              <label >
                 <p>choose for leadPermission</p>
                 <select name="SubPermission" onChange={changeHandler} value={formdata?.SubPermission}>
                    <option value="">Select Permission</option>
                    <option value="leadEditPermission">leadEditPermission</option>
                    <option value="leadDeletePermission">leadDeletePermission</option>
                    <option value="leadCreatePermission">leadCreatePermission</option>
                 </select>
              </label>
              
              <label >
                <p>All Designation</p>
                <select name="Designation" value={formdata.Designation} onChange={changeHandler}>
                     {
                        allDesig?.map((d , index)=>(
                            <option value={d?.name} key={index} >{d?.name}</option>
                        ))
                     }
                </select>
              </label>

              <button onClick={applyPermission} className="applyBtn"><span>Apply</span></button>

              </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Permission;
