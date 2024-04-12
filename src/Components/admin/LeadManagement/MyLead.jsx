import React from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import pluss from "../../images/pluss.png"
import search from "../../images/bx-search.png"
import fff from "../../images/fff.png"


const data = [
    {
        leadName:"Adrian Kirk",
        company:"Design Pro Web Solutions, LLC",
    email:"sales@designprowebsolutions.com",
    phone:"1 901-275-2749",
    firstName:"Gulinski",
    lastName:"Adrian Kirk",
    leadStatus:"Adrian Kirk",
    industry:"Adrian Kirk"
    }
]

const MyLead = ({ setAlert, pop, setPop }) => {
    const { user } = useMain();
    return (
        <>
            <div className="employee-dash h-full">
                <AdminSidebar pop={pop} setPop={setPop} />

                <div className="tm">
                    <AdminNavbar user={user} setAlert={setAlert} />

                    <div className="em">

                        <div className="leadThings">
                            <div className="lead_content1">
                                <h2>Lead Management</h2>
                                <p>Real-time insights and performance overview</p>
                            </div>
                            <div className="lead_content2">
                                <div className="leads_btn2">
                          
                                    <button className="lead_btn2"> 
                                    <img src={pluss} alt="" /> <span> Create New Lead </span>
                                    </button>

                                    <button className="refresh">
                                        <span className="ref1">Import Leads</span>
                                      
                                    </button>

                              <select name="" className="actions" id="">
                                <option value="Action">Actions</option>
                              </select>
 

                                </div>
                            </div>
                        </div>

                        <div className="laed1">
                
                {/* left side */}
                <div className="leftlead1">

                    <div className="inptsearch">
                        <input type="text" placeholder="Search leads" />
                        <span><img src={search} alt="" /></span>
                    </div>

                    <img src={fff} alt="" />

                </div>
                          
                          {/* right side  */}
                          <div className="leaftlead2">

                            <span>Sort by</span>
                             <input type="date" />

                          </div>

                        </div>

                        <div className="">
                           

<div class="relative overflow-x-auto">
        <h2 className="mylead">My Leads</h2>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">


        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                Lead Name
                </th>
                <th scope="col" class="px-6 py-3">
                Company
                </th>
                <th scope="col" class="px-6 py-3">
                Email
                </th>
                <th scope="col" class="px-6 py-3">
                Phone
                </th>
                <th scope="col" class="px-6 py-3">
                First Name
                </th>
                <th scope="col" class="px-6 py-3">
                Last Name
                </th>
                <th scope="col" class="px-6 py-3">
                Lead Status
                </th>
                <th scope="col" class="px-6 py-3">
                Industry
                </th>
            </tr>
        </thead>

        <tbody>
            {
                data?.map((item ,index)=>(
                    <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
           
                    <td class="px-6 py-4">
                        {item.leadName}
                    </td>
                    <td class="px-6 py-4">
                        {item.company}
                    </td>
                    <td class="px-6 py-4">
                        {item.email}
                    </td>
                    <td class="px-6 py-4">
                        {item.phone}
                    </td>
                    <td class="px-6 py-4">
                        {item.firstName}
                    </td>
                    <td class="px-6 py-4">
                        {item.lastName}
                    </td>
                    <td class="px-6 py-4">
                        {item.leadStatus}
                    </td>
                    <td class="px-6 py-4">
                        {item.industry}
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
            </div>
        </>
    );
};

export default MyLead;
