import react, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import ClientNavbar from "./ClientNavbar";
import ClientSideBar from "./ClientSideBar";


const ViewTask = () => {

    const data = useLocation()
    console.log(data)
    return (
        <>
            <div className="employee-dash h-full">
                <ClientNavbar />

                <ClientSideBar />
                <div className="tm">
                    <div className="em">
                        <div className="tclwrap">
                        <h1>hello</h1>

                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}


export default ViewTask;