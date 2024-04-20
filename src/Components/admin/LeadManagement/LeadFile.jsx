import React from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./lead.css"
import bxs from '../../images/bxs.svg'
import { NavLink } from "react-router-dom";

const LeadFile = ({ setAlert, pop, setPop }) => {
    const { user } = useMain();

    return (
        <>
            <div className="employee-dash h-full">
                <AdminSidebar pop={pop} setPop={setPop} />

                <div className="tm">
                    <AdminNavbar user={user} setAlert={setAlert} />

                    <div className="em">
                        <div className="importB">
                            <h2>Import Leads</h2>
                           <NavLink to="/adminDash/myLead"><button className="refresh canlo">
                                <span className="ref1">Cancel</span>
                            </button></NavLink>
                        </div>
                        <div className="import_vhasa">
                            <div className="form_filel">
                                <img src={bxs} alt="bxs" />
                                <h3>From File</h3>
                            </div>

                            <div className="selis">
                                <h3 className="srop">Drag and drop your file here. <br />
                                    -  or  -</h3>
                                <div className="selis_inp">
                                    <div className="opd mt-4">
                                        <div className="browse">
                                            <h3>Browse Local Files</h3>
                                        </div>
                                        <input type="file" />
                                    </div>
                                </div>
                                <div className="download_gfg">
                                    <h2>Download sample file
                                        <span> CSV </span>
                                           or
                                        <span> XLSX </span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeadFile;
