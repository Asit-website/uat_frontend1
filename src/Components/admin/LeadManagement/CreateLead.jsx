import React, { useState } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import siy from '../../images/siy.png';
import uint from '../../images/uing.png';
const CreateLead = ({ setAlert, pop, setPop }) => {
    const { user } = useMain();
    const [pop1,setPop1] = useState(false);
    const stylePeer = {
        display:pop1 ? "block" : "none"
    }
    return (
        <>
            <div className="employee-dash h-full">
                <AdminSidebar pop={pop} setPop={setPop} />

                <div className="tm">
                    <AdminNavbar user={user} setAlert={setAlert} />

                    <div className="em">
                        <h2 className="semik">Create Lead</h2>
                        <form action="">
                            <div onClick={()=> setPop1(!pop1)} data-modal-target="default-modal"
                                data-modal-toggle="default-modal" className="uint mt-5">
                                <img src={uint} alt="unit" />
                            </div>
                            <>
                                
                                {/* Main modal */}
                                <div
                                    id="default-modal"
                                    
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    className="hidden tikra overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                                    style={stylePeer}
                                >
                                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                                        {/* Modal content */}
                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            {/* Modal header */}
                                            <div className=" p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                <h3 className="text-xl sini  font-semibold text-gray-900 dark:text-white">
                                                Select Image
                                                </h3>
                                                {/* <button
                                                    type="button"
                                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                    data-modal-hide="default-modal"
                                                >
                                                    <svg
                                                        className="w-3 h-3"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 14 14"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                        />
                                                    </svg>
                                                    <span className="sr-only">Close modal</span>
                                                </button> */}
                                            </div>
                                            {/* Modal body */}
                                             <div className="selct_div">
                                                  
                                             </div>
                                            {/* Modal footer */}
                                            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                <button
                                                    data-modal-hide="default-modal"
                                                    type="button"
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                >
                                                    I accept
                                                </button>
                                                <button
                                                    data-modal-hide="default-modal"
                                                    type="button"
                                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>

                            <div className="lead_information mt-6">
                                <h2>Lead Information</h2>
                                <div className="lead_input mt-5">
                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Lead Owner</label>
                                            <select name="" id="">
                                                <option value="info">Info</option>
                                            </select>
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Company</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div className="lead_inp">
                                        <div className="lead_inp1 lead_inp11">
                                            <label htmlFor="">First Name</label>
                                            <select style={{ width: "91px !important" }} className="selr" name="" id="">
                                                <option value="info">None</option>
                                            </select>
                                        </div>
                                        <div className="lead_inp1">
                                            <label style={{ visibility: "hidden" }} htmlFor="">Company</label>
                                            <input type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Last Name</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Title</label>
                                            <input type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Email</label>
                                            <input type="email" />
                                        </div>
                                    </div>
                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Phone</label>
                                            <input type="number" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Fax</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Mobile</label>
                                            <input type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Website</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Lead Source</label>
                                            <select name="" id="">
                                                <option value="info">Cold Call</option>
                                            </select>
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">No. of Employees</label>
                                            <input type="number" />
                                        </div>
                                    </div>
                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Industry</label>
                                            <select name="" id="">
                                                <option value="info">IT_B2B</option>
                                            </select>
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Lead Status</label>
                                            <select name="" id="">
                                                <option value="info">IT_B2B</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Annual Revenue</label>
                                            <input placeholder="$" type="number" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Rating</label>
                                            <select name="" id="">
                                                <option value="info">Cold Email</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className="lead_inp">
                                        <div className="lead_inp1 lead_inp111">
                                            <label className="jpo" htmlFor="">Email Opt Out</label>
                                            <input className="seng" type="checkbox" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Lead Status</label>
                                            <select name="" id="">
                                                <option value="info">IT_B2B</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Secondary Email</label>
                                            <input type="email" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Twitter</label>
                                            <input type="text" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="lead_information mt-6">
                                <h2>Address Information</h2>
                                <div className="lead_input mt-5">
                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Street</label>
                                            <input type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">City</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">State</label>
                                            <input type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Zip Code</label>
                                            <input type="Number" />
                                        </div>
                                    </div>
                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Country</label>
                                            <input type="text" />
                                        </div>
                                        <div style={{ visibility: "hidden" }} className="lead_inp1">
                                            <label htmlFor="">Zip Code</label>
                                            <input type="Number" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lead_information mt-6">
                                <h2>Description Information</h2>
                                <div className="lead_input mt-5">
                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Description</label>
                                            <input type="text" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateLead;
