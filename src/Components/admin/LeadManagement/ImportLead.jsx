import React from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import leadProfile from "../../images/leadProfile.png"
import bx from "../../images/bx-purchase-tag.png"
import "./lead.css"


const ImportLead = ({ setAlert, pop, setPop }) => {
    const { user  } = useMain();
 

    return (
        <>
            <div className="employee-dash h-full">
                <AdminSidebar pop={pop} setPop={setPop} />

                <div className="tm">
                    <AdminNavbar user={user} setAlert={setAlert} />

                    <div className="em">

                        {/* first  */}
                        <section className="firsSec">

                            {/* /left side  */}
                            <div className="leadLe">

                         <img src={leadProfile} alt="" />

                          <div className="lTITL">
                            <h2>Kanishka Tyagi</h2>
                            <p style={{display:"flex"}}><img src={bx}   /> <span> Add Tags</span></p>
                          </div>

                            </div>

                            {/* right side  */}
                            <div className="laedRight">

                            <button type="button"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 sendBtn">Send Email</button>

                            <button className="refresh1"><span className="ref1">Edit</span>
                                    </button>

                                    <button
                                        id="dropdownDefaultButton"
                                        data-dropdown-toggle="dropdown"
                                        className="text-white silo   px-5 py-2.5 text-center inline-flex items-center"
                                        type="button"
                                    >
                                        Actions{" "}
                                        <svg className="ml-2" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.293 9.29303L12 13.586L7.70697 9.29303L6.29297 10.707L12 16.414L17.707 10.707L16.293 9.29303Z" fill="#666D76" />
                                        </svg>

                                    </button>




                            </div>

                        </section>

                        {/* second sect */}


                        {/* third secttion  */}
                        <div className="leadWRAP">

                            {/* first part  */}
                            <div className="leadFirs">

                       <h2 className="ehading">Lead Information</h2>

                       <div className="eladinfoWrap">
                        {/* left side  */}
                        <div className="lleaiFOlEFT">

                            <div className="subPart">
                                <h3>Lead Owner :</h3>
                                <p>info</p>

                            </div>

                            <div className="subPart">
                                <h3>Title</h3>
                                <p>-</p>

                            </div>

                            <div className="subPart">
                                <h3>Phone :</h3>
                                <p>919837919771</p>

                            </div>

                            <div className="subPart">
                                <h3>Mobile :</h3>
                               <p>-</p>
                            </div>

                            <div className="subPart">
                                <h3>Industry :</h3>
                               <p>Data/Telecom OEM</p>
                            </div>

                            <div className="subPart">
                                <h3>Annual Revenue :</h3>
                               <p>$1247</p>
                            </div>

                            <div className="subPart">
                                <h3>Annual Revenue :</h3>
                               <p>$1247</p>
                            </div>

                            <div className="subPart">
                                <h3>Annual Revenue :</h3>
                               <p>$1247</p>
                            </div>

                        </div>

                        {/* right side  */}
                        <div className="lleaiFOlEFT">

                            
                        <div className="subPart">
                                <h3>Company :</h3>
                                <p>info</p>
                            </div>

                        <div className="subPart">
                                <h3>Lead Name :</h3>
                                <p>Kanishka Tyagi</p>
                            </div>

                        <div className="subPart">
                                <h3>Email :</h3>
                                <p>kanishkatyagi13@gmail.com</p>
                            </div>

                        <div className="subPart">
                                <h3>Fax :</h3>
                                <p>-</p>
                            </div>
                        <div className="subPart">
                                <h3>No. of Employees :</h3>
                                <p>10</p>
                            </div>
                        <div className="subPart">
                                <h3>Lead Status :</h3>
                                <p>-</p>
                            </div>
                        <div className="subPart">
                                <h3>Lead Status :</h3>
                                <p>-</p>
                            </div>
                        <div className="subPart">
                                <h3>Lead Status :</h3>
                                <p>-</p>
                            </div>

                        </div>

                       </div>

                            </div>

                            {/* second part  */}
                            <div className="leadFirs">

                       <h2 className="ehading">Address Information</h2>

                       <div className="eladinfoWrap">
                        {/* left side  */}
                        <div className="lleaiFOlEFT">

                            <div className="subPart">
                                <h3>Street :</h3>
                                <p>info</p>

                            </div>

                            <div className="subPart">
                                <h3>State</h3>
                                <p>-</p>

                            </div>

                            <div className="subPart">
                                <h3>Country :</h3>
                                <p>USA</p>

                            </div>

                       


                        </div>

                        {/* right side  */}
                        <div className="lleaiFOlEFT">                 
                        <div className="subPart">
                                <h3>city :</h3>
                                <p>info</p>
                            </div>

                        <div className="subPart">
                                <h3>zip code :</h3>
                                <p>Kanishka Tyagi</p>
                            </div>

                        </div>

                       </div>

                            </div>

                            {/* third  */}
                            <div className="leadFirs">

<h2 className="ehading">Description Information</h2>

<div className="eladinfoWrap secondWRap">

<p>Description: <span>Are you hiring UI Designer?</span></p>

</div>

     </div>
                            {/* fourth  */}
                            <div className="leadFirs">

<h2 className="ehading">Description Information</h2>

<div className="eladinfoWrap secondWRap">

<p>Description: <span>Are you hiring UI Designer?</span></p>

</div>

     </div>


                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImportLead;
