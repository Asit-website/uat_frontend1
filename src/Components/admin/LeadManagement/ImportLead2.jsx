import React, { useEffect, useState } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import leadProfile from "../../images/leadProfile.png"
import bx from "../../images/bx-purchase-tag.png"
import "./lead.css"
import { NavLink, useNavigate, useParams } from "react-router-dom";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";

const ImportLead2 = ({ setAlert, pop, setPop }) => {
    const { user, getLead2 , updateLeadStatus } = useMain();

    const { id } = useParams();
    const [data, setData] = useState({});

    const navigate = useNavigate();

    const [LeadStatus , setLeadStatus] = useState("");


    const getData = async () => {
        let ans = await getLead2(id, '', '', '');
        setData(ans.data[0]);
        setLeadStatus(ans?.data[0]?.LeadStatus);

    };

    useEffect(() => {
        getData();
    }, [])

    const updatingLeadStatus = async(leading)=>{
        const {_id} = data;
         const ans = await updateLeadStatus(_id , leading);
         console.log("ans " , ans);
     }

     console.log("ata ",data);
    return (
        <>
            <div className="employee-dash h-full">
                <EmployeeSidebar pop={pop} setPop={setPop} />

                <div className="tm">
                    <EmployeeNavbar user={user} setAlert={setAlert} />

                    <div className="em">

                        {/* first  */}
                        <section className="firsSec">

                            {/* /left side  */}
                            <div className="leadLe">

                                <img className="sio" src={data?.image ? data?.image : leadProfile} alt="" />

                                <div className="lTITL">
                                    <h2>{data?.LeadOwner?.fullName}</h2>
                                    <p style={{ display: "flex" }}><img src={bx} /> <span> Add Tags</span></p>
                                </div>

                            </div>

                            {/* right side  */}
                            <div className="laedRight">

                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 sendBtn">Send Email</button>

                              <button onClick={()=>navigate("/employeeDash/editLead",{state:data})} className="refresh1"><span className="ref1">Edit</span>
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
                                            <p>{data?.LeadOwner?.email}</p>

                                        </div>

                                        <div className="subPart">
                                            <h3>{data?.title}</h3>
                                            <p>-</p>

                                        </div>

                                        <div className="subPart">
                                            <h3>Phone :</h3>
                                            <p>{data?.Phone}</p>

                                        </div>

                                        <div className="subPart">
                                            <h3>Mobile :</h3>
                                            <p>{data?.Mobile}</p>
                                        </div>

                                        <div className="subPart">
                                            <h3>Industry :</h3>
                                            <p>{data?.Industry}</p>
                                        </div>

                                        <div className="subPart">
                                            <h3>Annual Revenue :</h3>
                                            <p>${data?.AnnualRevenue}</p>
                                        </div>

                                        <div className="subPart">
                                            <h3>Annual Revenue :</h3>
                                            <p>${data?.AnnualRevenue}</p>
                                        </div>

                                        <div className="subPart">
                                            <h3>Annual Revenue :</h3>
                                            <p>${data?.AnnualRevenue}</p>
                                        </div>

                                    </div>

                                    {/* right side  */}
                                    <div className="lleaiFOlEFT">


                                        <div className="subPart">
                                            <h3>Company :</h3>
                                            <p>{data?.Company}</p>
                                        </div>

                                        <div className="subPart">
                                            <h3>Lead Name :</h3>
                                            <p>{data?.FirstName} {data?.LastName}</p>
                                        </div>

                                        <div className="subPart">
                                            <h3>Email :</h3>
                                            <p>{data?.Email}</p>
                                        </div>

                                        <div className="subPart">
                                            <h3>Fax :</h3>
                                            <p>{data?.Fax}</p>
                                        </div>
                                        <div className="subPart">
                                            <h3>No. of Employees :</h3>
                                            <p>{data?.NoOfEmployee}</p>
                                        </div>
                                        <div className="subPart">
                                            <h3>Lead Status :</h3>
                                            <p>{data?.LeadStatus}</p>
                                        </div>
                                        <div className="subPart">
                                            <h3>Lead Status :</h3>
                                            <p>{data?.LeadStatus}</p>
                                        </div>
                                        <div className="subPart">
                                            <h3>Lead Status :</h3>
                                            <p>{data?.LeadStatus}</p>
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
                                            <p>{data?.Street}</p>

                                        </div>

                                        <div className="subPart">
                                            <h3>State</h3>
                                            <p>{data?.State}</p>

                                        </div>

                                        <div className="subPart">
                                            <h3>Country :</h3>
                                            <p>{data?.Country}</p>

                                        </div>




                                    </div>

                                    {/* right side  */}
                                    <div className="lleaiFOlEFT">
                                        <div className="subPart">
                                            <h3>city :</h3>
                                            <p>{data?.City}</p>
                                        </div>

                                        <div className="subPart">
                                            <h3>zip code :</h3>
                                            <p>{data?.ZipCode}</p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* third  */}
                            <div className="leadFirs">

                                <h2 className="ehading">Description Information</h2>

                                <div className="eladinfoWrap secondWRap">

                                    <p>Description: <span>{data?.DescriptionInfo}</span></p>

                                </div>

                            </div>

   {/* third  */}
   <div className="leadFirs">

<div className = "LEADSsTunav">
   
                               <h2 className="ehading">Lead Status</h2>

                               <select  onChange={(e)=>{
                                   setLeadStatus(e.target.value);
                                   updatingLeadStatus(e.target.value);
                               }}  className="leadUPdateStsus" name="LeadStatus"  id="">
                                               <option >Select Status</option>
                                                  <option value="Cold">Cold</option>
                                                  <option value="Follow-up">Follow-up</option>
                                                  <option value="Hot">Hot</option>
                                                  <option value="Warm">Warm</option>

                                           </select>
</div>

                               <div className="eladinfoWrap secondWRap">

                                  {
                                   LeadStatus ? <span className="ladingstaus">{LeadStatus}</span> : <span className="noRecord">No records found</span>
                                  }

                               </div>

                           </div>

                            {/* fourth  */}
                            
                            <div className="leadFirs">
                                <div className="attachment">
                                    <h2 className="ehading">Description Information</h2>
                                    <div className="saya">
                                        <p>Upload File</p>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13 19V15H16L12 10L8 15H11V19H13Z" fill="#0B56E4" />
                                            <path d="M7 19H9V17H7C5.346 17 4 15.654 4 14C4 12.596 5.199 11.244 6.673 10.985L7.254 10.883L7.446 10.325C8.149 8.274 9.895 7 12 7C14.757 7 17 9.243 17 12V13H18C19.103 13 20 13.897 20 15C20 16.103 19.103 17 18 17H15V19H18C20.206 19 22 17.206 22 15C21.9985 14.1036 21.6966 13.2336 21.1427 12.5288C20.5888 11.8241 19.8147 11.3253 18.944 11.112C18.507 7.67 15.56 5 12 5C9.244 5 6.85 6.611 5.757 9.15C3.609 9.792 2 11.82 2 14C2 16.757 4.243 19 7 19Z" fill="#0B56E4" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="eladinfoWrap secondWRap lion">
                                     <p className="toyotoyo">No Attachment</p>
                                </div>

                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ImportLead2;
