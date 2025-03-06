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
    const { getClientProject, createProjectapi,allEmployee, editProjectapi, getAllProject } = useMain();
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
        fetchClientProjects(client._id);
        
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
                                                <td>
                                                    {project?.Member?.map((member) => {
                                                        <img
                                                            src={`${"https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                                                                }`}
                                                            className="w-20 h-20"
                                                            alt="Member Avatar "
                                                            key={member._id}
                                                            // ?
                                                            style={{
                                                                borderRadius: "50%",
                                                                cursor: "pointer",
                                                                transition:
                                                                    "color 0.3s ease, text-decoration 0.3s ease",
                                                                height: "40px",
                                                                width: "40px",
                                                            }}
                                                        />
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