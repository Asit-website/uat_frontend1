import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import acy from '../../images/acy.svg';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const Payslip = ({
    pop,
    setPop
}) => {
    const { user  , getUserSlip , togglePayslip} = useMain();


    const [loading , setLoading] = useState(false);

    const [formdata ,setFormdata] = useState({
        month:"January",
        year:"2024"
    })


    const changeHandler = (e)=>{
        const {name , value} = e.target;

        setFormdata((prev)=>({
            ...prev ,
            [name]:value
        }))
    }

     

    const [data , setData] = useState([]);

    const [showToggle , setShowToggle ] = useState(null);

  const fetchUserSlip = async(showLoading= true)=>{
    if(showLoading){

        setLoading(true);
    }
    const ans = await getUserSlip(formdata.month , formdata.year);
     if(ans?.status){
        setData(ans?.payslipDetails);
     }

          setLoading(false);
  }

  const toggleStatus = async(userId)=>{

    const toastId = toast.loading("Loading...");
    const ans = await togglePayslip(userId , formdata.month ,formdata.year);
     if(ans?.status){
        fetchUserSlip(false);
        toast.success('Successfuly updated');

     }
     else {
        toast.error("Something went wrong , plese try again");
     }

     toast.dismiss(toastId);
     setShowToggle(null);
  }


  useEffect(()=>{
    fetchUserSlip();

  },[formdata.month , formdata.year])

  useEffect(()=>{

     let toastId;
    if(loading){
         toastId = toast.loading("Loading...");
    }
    else {
        toast.dismiss(toastId);
    }

  },[loading])

    return (
        <>
            <div className="employee-dash h-full">
                <AdminSidebar pop={pop} setPop={setPop} />
                <div className="tm">
                    <AdminNavbar user={user} />

                    <div className="em ">

                        <div className="flex-col emWraping">

                            {/* first  */}
                            <div className="hrmDasTxtFir2">
                                <h2>Manage Employee Salary</h2>
                            </div>

                            <div className="employee_sal_card">

                                 <div className="emp_sino">
                                     <div className="type_date">
                                           <select name="month" onChange={changeHandler} value={formdata.month} id="">
                                               <option>January</option>
                                               <option>Febuary</option>
                                               <option>March</option>
                                               <option>April</option>
                                               <option>May</option>
                                               <option>June</option>
                                               <option>July</option>
                                               <option>August</option>
                                               <option>September</option>
                                               <option>October</option>
                                               <option>November</option>
                                               <option>December</option>
                                           </select>
                                     </div>
                                     <div className="type_year">
                                         <select name="year" value={formdata.year} onChange={changeHandler} id="">
                                            <option>2024</option>
                                            <option>2025</option>
                                            <option>2026</option>
                                            <option>2027</option>
                                            <option>2028</option>
                                            <option>2029</option>
                                            <option>2030</option>
                                         </select>
                                     </div>
                                     <div className="btn_export">
                                         <button>Export</button>
                                     </div>
                                 </div>

                                <div className="emp_selo">

                                    <h3 className="somoi">Employee Payslip</h3>

                                    <form className="max-w-md mx-auto">
                                        <label
                                            htmlFor="default-search"
                                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                        >
                                            Search
                                        </label>
                                        <div className="relative">
                                            <div className="absolute sonit inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg
                                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type="search"
                                                id="default-search"
                                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Search Employee"
                                                required=""
                                            />

                                        </div>
                                    </form>

                                </div>

                                <div className="relative overflow-x-auto sklin">

                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="sipi">
                                                <th scope="col" className="px-6 py-3">
                                                    Employee ID
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Employee Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Payroll Type
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Salary
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Net Salary
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                      
                            {
                                data?.map((item ,index)=>(
                                    <tr key={index} className="bg-white opos border-b dark:bg-gray-800 dark:border-gray-700">
                                   
                                    <td className="px-6 py-4">#{item?.user?.employeeCode}</td>
                                    <td className="px-6 py-4">{item?.user?.fullName}</td>
                                    <td className="px-6 py-4">{item?.user?.paySlipType}</td>
                                    <td className="px-6 py-4">{item?.user?.salary ? item?.user?.salary :"00"}</td>
                                    <td className="px-6 py-4">{item?.user?.netSalary}</td>
                                     <div  className="toglwCont">

                                    <td onClick={()=>{
                                         if(showToggle === index){
                                            setShowToggle(null);
                                         }
                                         else {
                                            setShowToggle(index);
                                         }
                                    }} className={`px-6 py-4 `}> <span className={`${item?.status === "Unpaid" ?"unpaid":"paid"} `}>{item?.status}</span> </td>
                                     
                                     {/*  */}
                                     {
                                        showToggle === index && 
                                     <div className="togglewrap">

                                        <p onClick={()=>{
                                            toggleStatus(item?.user?._id)
                                        }}>Click to {item?.status === "Unpaid"?"Paid":"Unpaid"}</p>

                                     </div>
                                    }
                            
                                     </div>
                                    <td className="px-6 py-4">
                                        <img src={acy} alt="acy" />
                                    </td>

                                </tr>
                                ))
                            }
                                        </tbody>
                                    </table>

                                </div>

                                <div className="prev_next">

                                    <div className="next">
                                        <button>
                                            <span>Prev</span>
                                            <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z" fill="#666D76" />
                                            </svg>

                                        </button>
                                    </div>

                                    <div className="on1">
                                        <p>1</p>
                                    </div>

                                    <div className="next">
                                        <button><span>Next</span>
                                            <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z" fill="#666D76" />
                                            </svg>
                                        </button>
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

export default Payslip;
