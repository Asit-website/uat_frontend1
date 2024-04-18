import React, { useState } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./emp.css"
import bxUser from "../../images/bx-user-pin.png"
import OutsideClickHandler from "react-outside-click-handler";
import upload from '../../images/upload.svg';



const item = [
    {
    title:"Full-time Employees"
    },
    {
    title:"Part-time Employees"
    },
    {
    title:"Trainee Employees"
    },
]

const AddEmployee = ({ setAlert, pop, setPop }) => {
    const { user } = useMain();

    const [currEmp , setCurrEmp] = useState(0);

    let userDetail = JSON.parse(localStorage.getItem("hrms_user"));


    const [formdata , setFormdata] = useState({
        image:"",
        LeadOwner:userDetail?._id,
        Company:"",
        FirstName:"",
        LastName:"",
        Title:"",
        Email:"",
        Phone:"",
        Fax:"",
        Mobile:"",
        Website:"",
        LeadSource:"",
        NoOfEmployee:"",
        Industry:"",
        LeadStatus:"",
        AnnualRevenue:"",
        Rating:"",
        EmailOptOut:"",
        SkypeID:"",
        SecondaryEmail:"",
        Twitter:"",
         Street:"" ,
         City :"",
         State :"",
         ZipCode :"",
         Country:"" ,
         DescriptionInfo:""
     });

    
     const submitHandler = async()=>{
       
         
    }

    const changeHandler = async(e)=>{
        const {name ,value} = e.target;

        setFormdata((prev)=>({
            ...prev ,
            [name]:value
        }))
     }

    return (
        <>
            <div className="employee-dash h-full">
                <AdminSidebar pop={pop} setPop={setPop} />

                <div className="tm">
                    <AdminNavbar user={user} setAlert={setAlert} />

                    <div className="em">

                        {/* first  */}
                        <section className="adFri">
                            {/* left side  */}
                            <h2>Add Employee</h2>

                            {/* right side  */}
                            <div className="adFrRIH">

                                <button className="calce"><span>Cancel</span></button>
                                <button className="register"><span>Register New</span></button>

                            </div>
                        </section>
                    

                    {/* /main section  */}
                    <main className="leadForm">

                        {/* first sec */}
                        <div className="leadInFir">

                            {
                                item.map((e ,index)=>(
                                    <div onClick={()=>setCurrEmp(index)} className="sinInfir" key={index}>

                                        <img src={bxUser} alt="" />

                                        <p className={`${currEmp == index ?"currEmp":"nom"}`}>{e.title}</p>

                                    </div>
                                ))
                            }
                            


                        </div>

                        <div className="em2">
                        <form>
                           
                            <div className="lead_information ">
                                <h2>Lead Information</h2>

                                <div className="lead_input mt-5">
                                    
                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Lead Owner</label>
                                            <input type="LeadOwner" value={userDetail?.fullName} disabled onChange={changeHandler}  />

                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Company</label>
                                            <input type="text" value={formdata.Company} name="Company" onChange={changeHandler} />
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
                                            <input value={formdata.FirstName} name="FirstName" onChange={changeHandler}  type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Last Name</label>
                                            <input value={formdata.LastName} name="LastName" onChange={changeHandler}  type="text" />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Title</label>
                                            <input value={formdata.Title} name="Title" onChange={changeHandler}  type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Email</label>
                                            <input value={formdata.Email} name="Email" onChange={changeHandler} type="email" />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Phone</label>
                                            <input value={formdata.Phone} name="Phone" onChange={changeHandler} type="number" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Fax</label>
                                            <input value={formdata.Fax} name="Fax" onChange={changeHandler} type="text" />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Mobile</label>
                                            <input value={formdata.Mobile} name="Mobile" onChange={changeHandler} type="text" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Website</label>
                                            <input value={formdata.Website} name="Website" onChange={changeHandler}  type="text" />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Lead Source</label>
                                            <select  name="LeadSource" onChange={changeHandler} id="">
                                                <option disabled>Select lead source</option>
                                                <option>Cold Call</option>
                                                <option>Cold Email</option>
                                            </select>
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">No. of Employees</label>
                                            <input value={formdata.NoOfEmployee} name="NoOfEmployee" onChange={changeHandler} type="number" />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="Industry">Industry</label>
                                            <select  value={formdata?.Industry}  name="Industry" onChange={changeHandler} id="Industry">
                                                 <option disabled>Select Industry</option>
                                                <option>IT_B2B</option>
                                                <option>IT_B2C</option>
                                            </select>
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Lead Status</label>
                                            <select value={formdata?.LeadStatus}  name="LeadStatus" onChange={changeHandler}  id="">
                                                <option disabled>Select Status</option>
                                                <option>Active</option>
                                                <option>Inactive</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Annual Revenue</label>
                                            <input value={formdata.AnnualRevenue} name="AnnualRevenue" onChange={changeHandler} placeholder="$" type="number" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Rating</label>
                                            <select name="Rating" onChange={changeHandler}  id="">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1 lead_inp111">
                                            <label className="jpo" htmlFor="">Email Opt Out</label>
                                            <input value={formdata.EmailOptOut} name="EmailOptOut" onChange={changeHandler}  className="seng" type="checkbox" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Skype ID</label>
                                             <input value={formdata?.SkypeID} name="SkypeID" type="text" onChange={changeHandler} />
                                        </div>
                                    </div>

                                    <div className="lead_inp">
                                        <div className="lead_inp1">
                                            <label htmlFor="">Secondary Email</label>
                                            <input value={formdata.SecondaryEmail} name="SecondaryEmail" onChange={changeHandler}  type="email" />
                                        </div>
                                        <div className="lead_inp1">
                                            <label htmlFor="">Twitter</label>
                                            <input value={formdata.Twitter} name="Twitter" onChange={changeHandler} type="text" />
                                        </div>

                                    </div>
                                    
                                </div>

                            </div>

                                
                             <div>
                             <button type="button" onClick={submitHandler} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>

                             </div>

                        </form>
                    </div>

                    </main>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AddEmployee;
