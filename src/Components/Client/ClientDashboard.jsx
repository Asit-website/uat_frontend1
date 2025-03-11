import React, { useState, useEffect } from "react";
import pluss from "../../../src/Components/images/pluss.png";
import ClientNavbar from "./ClientNavbar";
import ClientSideBar from "./ClientSideBar";
import AdminNavbar from "../admin/Navbar/AdminNavbar";
import AdminSidebar from "../admin/Sidebar/AdminSidebar";
import { useMain } from "../../hooks/useMain";
import cut from "../../../src/Components/images/cutt.png";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



const ClientDashboard = () => {
    const { getClientProject, createProjectapi,allEmployee, editProjectapi,getAllProjectApi } = useMain();
    const navigate = useNavigate();
    const location = useLocation();
    const data = location?.state
    console.log(data)
    let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

    const role = hrms_user?.Role || hrms_user?.role;




    const clientData = {
        _id: "67c17062a6cdc041b8342967",
        Name: "Akash Negi",
        Email: "akashnegi.kushel@gmail.com",
        Password: "123456",
        City: "Ghaziabad",
        State: "",
        ZipCode: "",
        PhoneNumber: "",
        Country: "",
        Address: "",
        isDisable: false,
        createdAt: "2025-02-28T08:14:26.402Z",
        updatedAt: "2025-02-28T08:14:26.402Z",
        __v: 0,
    };

    const [projects, setProjects] = useState([]);


    const getAllProject = async (clientId) => {
        const ans = await getAllProjectApi();
        if (ans?.status) {
            const res = ans?.projects.filter(e => e.client === clientId);
            // console.log(res)
            setProjects(res)
            
            // setAllProjects(ans?.projects);
            // setStorePro(ans?.projects);
        }
    };

    const fetchClientProjects = async (clientId) => {
        try {
            const data = await getClientProject(clientId);
            if (data?.projects) {
                setProjects(data.projects);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };


    useEffect(() => {
        const client = JSON.parse(localStorage.getItem("hrms_user"));
        getAllProject(client._id);
        
    }, []);

    

    return (
        <>
            <div className="employee-dash h-full pb-40">
                {role === "Client" ? (
                    <ClientSideBar />
                ) : (
                    <AdminSidebar />
                )}

                <div className="tm">
                    {role === "Client" ? (
                        <ClientNavbar />
                    ) : (
                        <AdminNavbar />
                    )}

                    <div className="em">
                        <div className="tclwrap">
                         

                            <nav>
                                <h1 className="my-5 text-3xl font-bold">
                                    {role === "Client" && 'My Projects'}
                                </h1>
                            </nav>

                            <div className="allClients">
                                <table>
                                    <thead>

                                        <tr>
                                            <th>#</th>
                                            <th>Project Name</th>
                                            <th>Start Date</th>
                                            <th>Deadline</th>
                                            <th>Members</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {projects.map((project, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <span>{project.projectName}</span>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                            marginTop: "2px",
                                                            fontSize: "0.875rem",
                                                            color: "#2563eb",
                                                        }}
                                                    >
                                                        <p style={{ margin: 0, cursor: "pointer" }}
                                                            onClick={() => navigate("/client/task", {
                                                                state: project,
                                                            })}
                                                        >
                                                            View
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>{project.startDate}</td>
                                                <td>{project.deadline}</td>
                                                <td className="flex">
                                                    {project?.Members?.map((member,index) => {
                                                        console.log(member)
                                                        return <>
                                                        <img
                                                        src={`${member?.profileImage
                                                            ? member?.profileImage
                                                            : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                                                            }`}
                                                        className="w-10 h-10 rounded-full cursor-pointer transition-colors duration-300 ease-in-out"
                                                        alt="Member Avatar "
                                                        key={index}
                                                        
                                                        
                                                      /></>
                                                    })}
                                                </td>
                                                <td>{project.Status}</td>


                                            </tr>

                                        ))}
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

export default ClientDashboard;
