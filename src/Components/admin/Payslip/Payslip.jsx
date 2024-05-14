import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import acy from '../../images/acy.svg';
import { useEffect, useState,useRef } from "react";
import toast from "react-hot-toast";
import oot from "../../images/oot.svg";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import cancell from "../../images/cancell.png"
import kdslogo from "../../images/kdslogo.png"
import { useReactToPrint } from 'react-to-print'

const Payslip = ({
    pop,
    setPop
}) => {
    const { user, getUserSlip, togglePayslip, buildAPI } = useMain();


    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);

    const [openPayslip, setOpenPayslip] = useState(false);

    const styleperr = {
        display: show ? "block" : "none"
    }

    const [formdata, setFormdata] = useState({
        month: "January",
        year: "2024"
    })


    const changeHandler = (e) => {
        const { name, value } = e.target;

        setFormdata((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const [data, setData] = useState([]);

    const [showToggle, setShowToggle] = useState(null);

    const [popdata, setPopData] = useState(null);

    const fetchUserSlip = async (showLoading = true) => {
        if (showLoading) {

            setLoading(true);
        }
        const ans = await getUserSlip(formdata.month, formdata.year);
        if (ans?.status) {
            setData(ans?.payslipDetails);
        }

        setLoading(false);
    }

    const toggleStatus = async (userId) => {

        const toastId = toast.loading("Loading...");
        const ans = await togglePayslip(userId, formdata.month, formdata.year);
        if (ans?.status) {
            fetchUserSlip(false);
            toast.success('Successfuly updated');

        }
        else {
            toast.error("Something went wrong , plese try again");
        }

        toast.dismiss(toastId);
        setShowToggle(null);
    }


    useEffect(() => {
        fetchUserSlip();

    }, [formdata.month, formdata.year])

    useEffect(() => {

        let toastId;
        if (loading) {
            toastId = toast.loading("Loading...");
        }
        else {
            toast.dismiss(toastId);
        }

    }, [loading])

    const bulkPaymentHandler = async () => {
        const toastId = toast.loading("Loading...");
        const ans = await buildAPI(formdata.month, formdata.year);
        if (ans?.status) {
            toast.success("Successfuly done");
            setShow(false);
            fetchUserSlip();
        }
        else {
            toast.error("Something went wrong , please try again");
        }

        toast.dismiss(toastId);
    }

    const contonentPDF = useRef()
    const generatePdf = useReactToPrint({
        content: () => contonentPDF.current,
        documentTitle: "Order",
        parentContainer: {
            '@media print': {
                display: 'block'
            },
        },
        onAfterPrint: () => alert("already saved")
    })

    return (
        <>
            <div className={`employee-dash  h-full`}>
                <AdminSidebar pop={pop} setPop={setPop} />
                <div className="tm">
                    <AdminNavbar user={user} />

                    <div className={`em ${openPayslip ? "hidenOverflow" : ""} `}>

                        <div className="flex-col emWraping">

                            {/* first  */}
                            <div className="hrmDasTxtFir2 htmj">
                                <h2>Payslip</h2>
                                <button onClick={() => setShow(true)}>Bulk Payment</button>
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
                                        {/* <button>Export</button> */}
                                        <ReactHTMLTableToExcel
                                            id="test-table-xls-button"
                                            className="download-table-xls-button"
                                            table="table-to-xls"
                                            filename="tablexls"
                                            sheet="tablexls"
                                            buttonText="Export" />
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

                                    <table id="table-to-xls" className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                                data.filter(x => x.user.designation !== "CEO" && x.user._id !== user._id )?.map((item, index) => (
                                                    <tr key={index} className="bg-white opos border-b dark:bg-gray-800 dark:border-gray-700">

                                                        <td className="px-6 py-4">#KDS{item?.user?.employeeCode}</td>
                                                        <td className="px-6 py-4">{item?.user?.fullName}</td>
                                                        <td className="px-6 py-4">{item?.user?.paySlipType}</td>
                                                        <td className="px-6 py-4">{item?.user?.salary ? item?.user?.salary : "00"}</td>
                                                        <td className="px-6 py-4">{item?.user?.netSalary}</td>

                                                        <td className={`px-6 py-4 `}> <span className={`${item?.status === "Unpaid" ? "unpaid" : "paid"} `}>{item?.status}</span> </td>

                                                        {/*  */}


                                                        <div className="toglwCont">
                                                            <td onClick={() => {
                                                                if (showToggle === index) {
                                                                    setShowToggle(null);
                                                                }
                                                                else {
                                                                    setShowToggle(index);
                                                                }
                                                            }} className="px-6 py-4">
                                                                <img src={acy} alt="acy" />
                                                            </td>
                                                            {
                                                                showToggle === index &&
                                                                <div className="togglewrap">

                                                                    <p onClick={() => {
                                                                        toggleStatus(item?.user?._id)
                                                                    }}>Click to {item?.status === "Unpaid" ? "Paid" : "Unpaid"}</p>

                                                                    <p onClick={() => {
                                                                        setOpenPayslip(true);
                                                                        setShowToggle(null);
                                                                        console.log("item ", item);
                                                                        setPopData(item);
                                                                    }}>Payslip</p>

                                                                    <p>Delete </p>

                                                                </div>
                                                            }
                                                        </div>

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

            {/* ===============modal of export start========= */}
            <>
                {/* Modal toggle */}
                {/* Main modal */}
                <div
                    style={styleperr}
                    id="default-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="hidden holm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative holm1 p-4 w-full max-w-2xl max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 sijk">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white gd">
                                    Bulk Payment
                                </h3>
                                <img className="cursor-pointer" onClick={() => {
                                    setShow(false);
                                }} src={oot} alt="oot" />
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5 space-y-4">
                                <p className="text-base ipsd leading-relaxed text-gray-500 dark:text-gray-400">
                                    Total Unpaid Employee 24 out of 23
                                </p>

                            </div>
                            {/* Modal footer */}
                            <div className="flex  thj items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button onClick={bulkPaymentHandler}
                                    data-modal-hide="default-modal"
                                    type="button"
                                    className="text-white bulk bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Bulk Payment
                                </button>
                                <button
                                    onClick={() => setShow(false)}
                                    data-modal-hide="default-modal"
                                    type="button"
                                    className="py-2.5 ml-3 cancol px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>

            {/* ========================modal of export end=============== */}




            {/*  =================== this is openpayslip ============================= */}


            {
                openPayslip &&

                <div  className="openPaywrap">

                    <div className="openPayCont">

                        <nav>
                            <h2>Employee Payslip</h2>
                             
                             {/* <button onClick={generatePdf}>Print</button> */}
                             <button onClick={generatePdf} type="button" className="text-white bg-blue-700 genrt hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Print</button>

                            <img onClick={() => setOpenPayslip(false)} className="cursor-pointer" src={cancell} alt="" />
                        </nav>


                        <hr />

                        <img src={kdslogo} alt="" className="kdslogo" />


                        <hr />

                        <div ref={contonentPDF}>
                        <div  className="paydetails">

                            {/* left side */}
                            <div className="paydetailLeft">

                                <label >
                                    <p>Name :</p>
                                    <p>{popdata?.user?.fullName}</p>
                                </label>

                                <label >
                                    <p>Position :</p>
                                    <p>{popdata?.user?.department}</p>
                                </label>

                                <label >
                                    <p>Salary Date :</p>
                                    <p>{popdata?.user?.salarydate}</p>
                                </label>

                            </div>

                            {/* rigth side */}
                            <div className="paydetailRight">
                                <h3>Kushel Digi Solutions</h3>
                                <p>G-9, first Floor, Sector 63, Noida, Noida, <br />
                                    Uttar pradesh-251352</p>
                            </div>

                        </div>

                        <div className="payform">
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right  ">
                                    <thead class="text-xs  uppercase bg-gray-50 dark:bg-gray-700 ">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Earning
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Title
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Type
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        <tr class="bg-white ">

                                            <td class="px-6 py-4">
                                                Basic Salary
                                            </td>
                                            <td class="px-6 py-4">
                                            </td>
                                            <td class="px-6 py-4">
                                            </td>
                                            <td class="px-6 py-4">
                                                {popdata?.user?.netSalary}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="totalErWrap">
                                <div className="enrcont">
                                    <p>Total Earning :</p>
                                    <p>  {popdata?.user?.netSalary}</p>
                                </div>
                                <div className="enrcont">
                                    <p>Total Deduction :</p>
                                    <p>{popdata?.user?.netSalary - popdata?.user?.salary || "00"}</p>
                                </div>
                            </div>


                        </div>

                        <div className="paidWrap">
                            <h3>Employee Signature</h3>
                            <p>Paid By</p>
                        </div>
                        </div>


                    </div>


                </div>


            }

            {/*  =================== end  is openpayslip ============================= */}


        </>
    );
};

export default Payslip;
