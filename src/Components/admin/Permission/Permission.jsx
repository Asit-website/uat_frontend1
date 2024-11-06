import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminNavbar from "../Navbar/AdminNavbar";
import { useMain } from "../../../hooks/useMain";
import "react-confirm-alert/src/react-confirm-alert.css";
import { MdEdit } from "react-icons/md";
import "./permission.css";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const Permission = ({ pop, setPop, setAlert }) => {
  const { user, AllRolesapi  , DeleteRoleApi} = useMain();

const navigate = useNavigate();

const [allRoles , setAllRoles] = useState([]);

const fetchAllRoles = async()=>{
   const ans = await AllRolesapi();
   setAllRoles(ans?.data);
}

const deleteRole = async(id)=>{
  const toastId = toast.loading("Loading...");
  const ans = await DeleteRoleApi(id);
  if(ans?.status){
    toast.success("Successfuly Deleted");
  }
  fetchAllRoles();

  toast.dismiss(toastId);
}

useEffect(()=>{
   fetchAllRoles();
},[])

  return (
    <>
      <div className="annDash relative h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />

          <div className="em editrolewrap">

            <div className="editrolehead">
            <h1>Edit Role</h1>
            <button onClick={()=>navigate("/adminDash/PermissionDetail")}><span>Add New Role</span></button>
            </div>

            <div className="relative  overflow-x-auto w-full">

<table className="w-full table1 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

  <thead className="text-xs uppercase textALLtITL ">
    <tr>
     
      <th scope="col" className="px-6 py-3 taskTitl ">
        SN.
      </th>
      <th scope="col" className="px-6 py-3 taskTitl ">
         NAME
      </th>
      <th scope="col" className="px-6 py-3 taskTitl ">
        ACTION
      </th>
     
    </tr>
  </thead>

  <tbody>
    
    {
      allRoles?.map((roles , index)=>(
        <tr  key={index} className="bg-white border-b fdf">
      
        <td className="px-6 py-4 taskAns">{index+1}</td>
        <td className="px-6 py-4 taskAns">{roles?.name}</td>
        <td className="px-6 py-4 taskAns makethisflex">
        <MdEdit onClick={()=>navigate("/adminDash/PermissionDetail" ,{state: roles})} fontSize={20} className="cursor-pointer" />
        <MdDelete onClick={()=>deleteRole(roles?._id)} fontSize={20} className="cursor-pointer"  />
        </td>
    

      
      </tr>

      ))
    }
       

  </tbody>

</table>
</div>


          </div>
        </div>
      </div>
    </>
  );
};

export default Permission;

{
  /* <label>
<p>All Role</p>
<select
  required
  className="mt-3"
  name="Designation"
  value={formdata.Designation}
  onChange={changeHandler}
>
  <option>Select Role</option>
  {allDesig?.map((d, index) => (
    <option value={d?.name} key={index}>
      {d?.name}
    </option>
  ))}
</select>
</label> */
}
