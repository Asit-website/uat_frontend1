import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";
import moreVert from "../../images/more_vert.png";
import { useEffect, useState } from "react";
import upload2 from "../../images/upload_2.png"
import frames from "../../images/Frame 1000010647.png"
import bxsearch from "../../images/bx-search.png"
import crosss from "../../images/crosss.png"
import talent1 from '../../images/talent1.svg';
import sink from '../../images/sink.svg';
import elo from '../../images/elo.svg';
import frema from '../../images/frema.svg';
import lion from '../../images/lion.svg';
import oot from '../../images/oot.svg'
const SetSallary = ({
    pop,
    setPop
    //   pop1,
    //   setPop1,
    //   pop,
    //   setPop,
    //   setAlert,
    //   isHr = false,
}) => {
    const { user,createSallary, getSallary } = useMain();
    const [refreshFlag,setRefreshFlag] = useState(false);

    const [formdata, setFormdata] = useState({
        salary:"",
        paySlipType:""
      })

      const [data,setData] = useState([]);

      useEffect(()=>{
          getData()
      },[refreshFlag])

      const getData = async () =>{
          const ans = await getSallary();
          setData(ans?.data);
      }

     

      const changeHandler = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
    
        setFormdata((prev) => ({
          ...prev,
          [name]: value
        }))
    
      }

      const submitHandler = async (e) => {
          e.preventDefault();
        try {
           const ans =  await createSallary({ ...formdata });
           console.log(ans);
            alert("Successfuly Created");
            setRefreshFlag(!refreshFlag);
            setShow(false);
        } catch (error) {
          console.log(error);
        }
      }

    const [show, setShow] = useState(false);

    const [show1,setShow1] = useState(false);

    const [show2,setShow2] = useState(false);

    const [show3,setShow3] = useState(false);


    const stylePeer1 = {
        display: show ? "block" : "none"
    }

    const stylePeer2 = {
        display: show1 ? "block" : "none"
    }

    const stylePeer3 = {
        display: show2 ? "block" : "none"
    }

    const stylePeer4 = {
        display: show3 ? "block" : "none"
    }


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
                                <h2>Employee Set Salary</h2>
                            </div>

                            <div className="Employee_set">
                                <div className="employee_set1">
                                    <div className="salary_details">
                                        <div className="salary_head">
                                            <div className="salary_head11">
                                                <img src={talent1} alt="talent1" />
                                                <h2>Employee Salary Details</h2>
                                            </div>
                                            <div className="salary_head12">
                                                <img className="cursor-pointer" onClick={() => {
                                                    setShow(true);
                                                }} src={sink} alt="" />
                                            </div>
                                        </div>
                                        {
                                            data?.map((item,index)=>{
                                                return (
                                                    <div key={index} className="salary_body">
                                                    <div className="salary_bn">
                                                        <h3>Payslip Type</h3>
                                                        <p>{item?.paySlipType}</p>
                                                    </div>
                                                    <div className="salary_bn salary_bn1">
                                                        <h3>Salary</h3>
                                                        <p>{item?.salary}</p>
                                                    </div>
                                                </div>
                                                )
                                            })
                                        }
                                       
                                    </div>
                                    <div className="salary_details mt-5">
                                        <div className="salary_head">
                                            <div className="salary_head11">
                                                <img src={talent1} alt="talent1" />
                                                <h2>Commission</h2>
                                                <input type="date" />
                                            </div>
                                            <div className="salary_head12">
                                                <img onClick={()=>{
                                                    setShow2(true);
                                                }} src={lion} alt="" />
                                            </div>
                                        </div>
                                        <div className="salary_body salary_bdy11">
                                            <div className="relative overflow-x-auto sklin">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr className="sipi sipi1">
                                                            <th scope="col" className="px-6 py-3">
                                                                Name
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Allowance Option
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Title
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Type
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Amount
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        <tr className="bg-white opos opos1 border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 oklo font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                            >
                                                                Akash Negi
                                                            </th>
                                                            <td className="px-6 py-4">hi</td>
                                                            <td className="px-6 py-4">Monthly Payslip</td>
                                                            <td className="px-6 py-4">₹ 0</td>
                                                            <td className="px-6 py-4">₹ 0</td>
                                                            <td className="px-6 py-4">
                                                                <div className="action_so">
                                                                    <img src={elo} alt="elo" />
                                                                    <img src={frema} alt="frema" />
                                                                </div>
                                                            </td>
                                                        </tr>


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="employee_set2">
                                    <div className="salary_details">
                                        <div className="salary_head">
                                            <div className="salary_head11">
                                                <img src={talent1} alt="talent1" />
                                                <h2>Allowance</h2>
                                            </div>
                                            <div className="salary_head12">
                                                <img className="cursor-pointer" onClick={()=>{
                                                    setShow1(true);
                                                }} src={lion} alt="" />
                                            </div>
                                        </div>
                                        <div className="salary_body salary_bdy11">
                                            <div className="relative overflow-x-auto sklin">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr className="sipi sipi1">
                                                            <th scope="col" className="px-6 py-3">
                                                                Name
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Allowance Option
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Title
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Type
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Amount
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        <tr className="bg-white opos opos1 border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 oklo font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                            >
                                                                Akash Negi
                                                            </th>
                                                            <td className="px-6 py-4">hi</td>
                                                            <td className="px-6 py-4">Monthly Payslip</td>
                                                            <td className="px-6 py-4">₹ 0</td>
                                                            <td className="px-6 py-4">₹ 0</td>
                                                            <td className="px-6 py-4">
                                                                <div className="action_so">
                                                                    <img src={elo} alt="elo" />
                                                                    <img src={frema} alt="frema" />
                                                                </div>
                                                            </td>
                                                        </tr>


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="salary_details mt-5">
                                        <div className="salary_head">
                                            <div className="salary_head11">
                                                <img src={talent1} alt="talent1" />
                                                <h2>Loan</h2>
                                            </div>
                                            <div className="salary_head12">
                                                <img onClick={()=>{
                                                    setShow3(true);
                                                }} src={lion} alt="" />
                                            </div>
                                        </div>
                                        <div className="salary_body salary_bdy11">
                                            <div className="relative overflow-x-auto sklin">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr className="sipi sipi1">
                                                            <th scope="col" className="px-6 py-3">
                                                                Name
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Allowance Option
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Title
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Type
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Amount
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        <tr className="bg-white opos opos1 border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 oklo font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                            >
                                                                Akash Negi
                                                            </th>
                                                            <td className="px-6 py-4">hi</td>
                                                            <td className="px-6 py-4">Monthly Payslip</td>
                                                            <td className="px-6 py-4">₹ 0</td>
                                                            <td className="px-6 py-4">₹ 0</td>
                                                            <td className="px-6 py-4">
                                                                <div className="action_so">
                                                                    <img src={elo} alt="elo" />
                                                                    <img src={frema} alt="frema" />
                                                                </div>
                                                            </td>
                                                        </tr>


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* =============toggle1============ */}

                            <>
                                {/* Modal toggle */}

                                {/* Main modal */}
                                <div
                                    style={stylePeer1}
                                    id="authentication-modal"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] lokig max-h-full"
                                >
                                    <div className="relative sekin p-4 w-full max-w-md max-h-full">
                                        {/* Modal content */}
                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            {/* Modal header */}
                                            <div className="flex okad items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                <h3 className="text-xl font-semibold basic_sel text-gray-900 dark:text-white">
                                                    Set Basic Salary
                                                </h3>
                                                <img className="cursor-pointer" onClick={() => {
                                                    setShow(false);
                                                }} src={oot} alt="oot" />
                                            </div>
                                            {/* Modal body */}
                                            <div className="p-4 md:p-5">
                                                <form className="space-y-4 kinh" onSubmit={submitHandler}>
                                                    <div>
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Payslip Type*
                                                        </label>
                                                        <select onChange={changeHandler} name="paySlipType" value={formdata?.paySlipType} id="paySlipType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                            <option>Select Payslip</option>
                                                            <option>Monthly Paysleep</option>
                                                        </select>
                                                    </div>
                                                    <div className="mt-4">
                                                        <label
                                                            htmlFor="password"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Salary
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="salary"
                                                            id="salary"
                                                            value={formdata?.salary}
                                                            onChange={changeHandler}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                            required=""
                                                        />
                                                    </div>
                                                    <div className="buttons_formo">
                                                        <button type="submit" className="text-white sarfros bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save Change</button>
                                                        <button onClick={() => {
                                                            setShow(false);
                                                        }} type="button" className="text-gray-900 sarfros1 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>

                            {/* ===============toggle1 end============ */}

                            {/* ===================toggle2 start=============== */}
                            <>
                                {/* Modal toggle */}

                                {/* Main modal */}
                                <div
                                    style={stylePeer2}
                                    id="authentication-modal1"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] lokig max-h-full"
                                >
                                    <div className="relative sekin sekin1 p-4 w-full max-w-md max-h-full">
                                        {/* Modal content */}
                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            {/* Modal header */}
                                            <div className="flex okad items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                <h3 className="text-xl font-semibold basic_sel text-gray-900 dark:text-white">
                                                Create Allowance
                                                </h3>
                                                <img className="cursor-pointer" onClick={() => {
                                                    setShow1(false);
                                                }} src={oot} alt="oot" />
                                            </div>
                                            {/* Modal body */}
                                            <div className="p-4 md:p-5">
                                                <form className="space-y-4 kinh" action="#">
                                                    <div className=" flex items-center fgg">
                                                    <div className="w-full">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Allowance Options*
                                                        </label>
                                                        <select name="" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                            <option value="">Select Allowance</option>
                                                            <option>Allowance</option>
                                                            <option>Travel Allowance</option>
                                                        </select>
                                                    </div>
                                                    <div className="w-full fggg mt-5">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="salary"
                                                            id="salary"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                            required=""
                                                        />
                                                    </div>
                                                    </div>
                                                    <div className=" flex items-center mt-4 fgg">
                                                    <div className="w-full">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Type
                                                        </label>
                                                        <select name="" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                            <option>Select Type</option>
                                                            <option>Fixed</option>
                                                        </select>
                                                    </div>
                                                    <div className="w-full fggg">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Amount
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="amount"
                                                            id="amount"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                            required=""
                                                        />
                                                    </div>
                                                    </div>
                                                    <div className="buttons_formo">
                                                        <button type="submit" className="text-white sarfros bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>
                                                        <button onClick={() => {
                                                            setShow1(false);
                                                        }} type="button" className="text-gray-900 sarfros1 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>

                            {/* ===================toggle2 end============= */}

                            {/* ===================toggle3 start============= */}

                            <>
                                {/* Modal toggle */}

                                {/* Main modal */}
                                <div
                                    style={stylePeer3}
                                    id="authentication-modal2"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] lokig max-h-full"
                                >
                                    <div className="relative sekin sekin1 p-4 w-full max-w-md max-h-full">
                                        {/* Modal content */}
                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            {/* Modal header */}
                                            <div className="flex okad items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                <h3 className="text-xl font-semibold basic_sel text-gray-900 dark:text-white">
                                                Create Commission
                                                </h3>
                                                <img className="cursor-pointer" onClick={() => {
                                                    setShow2(false);
                                                }} src={oot} alt="oot" />
                                            </div>
                                            {/* Modal body */}
                                            <div className="p-4 md:p-5">
                                                <form className="space-y-4 kinh" action="#">
                                                    <div className=" flex items-center fgg">
                                                   
                                                    <div className="w-full">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="salary"
                                                            id="salary"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                            required=""
                                                        />
                                                    </div>
                                                    </div>
                                                    <div className=" flex items-center mt-4 fgg">
                                                    <div className="w-full">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Type
                                                        </label>
                                                        <select name="" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                            <option>Select Type</option>
                                                            <option>Fixed</option>
                                                        </select>
                                                    </div>
                                                    <div className="w-full fggg">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Amount
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="amount"
                                                            id="amount"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                            required=""
                                                        />
                                                    </div>
                                                    </div>
                                                    <div className="buttons_formo">
                                                        <button type="submit" className="text-white sarfros bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>
                                                        <button onClick={() => {
                                                            setShow2(false);
                                                        }} type="button" className="text-gray-900 sarfros1 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            {/* ======================toggle3 end================ */}

                            {/* ===================toggle4 start=========== */}
                            <>
                                {/* Modal toggle */}

                                {/* Main modal */}
                                <div
                                    style={stylePeer4}
                                    id="authentication-modal3"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] lokig max-h-full"
                                >
                                    <div className="relative sekin sekin1 p-4 w-full max-w-md max-h-full">
                                        {/* Modal content */}
                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            {/* Modal header */}
                                            <div className="flex okad items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                <h3 className="text-xl font-semibold basic_sel text-gray-900 dark:text-white">
                                                Create Loan
                                                </h3>
                                                <img className="cursor-pointer" onClick={() => {
                                                    setShow3(false);
                                                }} src={oot} alt="oot" />
                                            </div>
                                            {/* Modal body */}
                                            <div className="p-4 md:p-5">
                                                <form className="space-y-4 kinh" action="#">
                                                    <div className=" flex items-center fgg">
                                                    <div className="w-full">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="salary"
                                                            id="salary"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                            required=""
                                                        />
                                                    </div>
                                                    <div className="w-full fggg">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Loan Options*
                                                        </label>
                                                        <select name="" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                            <option value="">Select Loan</option>
                                                            <option>Health Insurance</option>
                                                            
                                                        </select>
                                                    </div>
                                                   
                                                    </div>
                                                    <div className=" flex items-center fgg mt-5">
                                                    <div className="w-full">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Type
                                                        </label>
                                                        <select name="" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                            <option value="">Select Type</option>
                                                            <option>Fixed</option>
                                                            
                                                        </select>
                                                    </div>
                                                    <div className="w-full fggg">
                                                        <label
                                                            htmlFor="email"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            Amount
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="salary"
                                                            id="salary"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                            required=""
                                                        />
                                                    </div>
                                                  
                                                   
                                                    </div>

                                                    <div className=" flex items-center fgg mt-5">
                                                   
                                                   <div className="w-full">
                                                       <label
                                                           htmlFor="email"
                                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                       >
                                                           Reason
                                                       </label>
                                                       <input
                                                           type="text"
                                                           name="salary"
                                                           id="salary"
                                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                           required=""
                                                       />
                                                   </div>
                                                   </div>
                                                    <div className="buttons_formo">
                                                        <button type="submit" className="text-white sarfros bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>
                                                        <button onClick={() => {
                                                            setShow3(false);
                                                        }} type="button" className="text-gray-900 sarfros1 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            {/* ================toggle4 end================ */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetSallary;
