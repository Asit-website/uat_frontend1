import React, { useState, useEffect } from "react";
import pluss from "../../../src/Components/images/pluss.png";
import ClientNavbar from "./ClientNavbar";
import ClientSideBar from "./ClientSideBar";
import AdminNavbar from "../admin/Navbar/AdminNavbar";
import AdminSidebar from "../admin/Sidebar/AdminSidebar";
import { useMain } from "../../hooks/useMain";
import cut from "../../../src/Components/images/cutt.png";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import refresh from "../images/bx-refresh.png"
import projectsImage from "../images/projects.svg"



const ClientDashboard = () => {
    const { getClientProject, createProjectapi, allEmployee, editProjectapi, getAllProjectApi } = useMain();
    const navigate = useNavigate();
    const location = useLocation();
    const data = location?.state
    let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

    const role = hrms_user?.Role || hrms_user?.role;

    const [projects, setProjects] = useState([]);
    const [storeProject,setStorePro] = useState([]);

    const [optIndex,setOptIndex] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    let itemsPerPage = 5
    const totalPages = Math?.ceil(projects?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = Math.min(startIndex + itemsPerPage, projects?.length);

  const currentItems = projects?.slice(startIndex, endIndex);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };


    const getAllProject = async (clientId) => {
        const ans = await getAllProjectApi();
        if (ans?.status) {
            const res = ans?.projects.filter(e => e.client === clientId);
            // console.log(res)
            setStorePro(res);
            setProjects(res);
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
      useEffect(() => {
        if (optIndex === 0) {
          setProjects([...storeProject]);
        } else if (optIndex === 1) {
          const fitlerdata = storeProject.filter((pro) => pro.Status === "Ongoing");
          setProjects(fitlerdata);
        } else if (optIndex === 2) {
          const fitlerdata = storeProject.filter(
            (pro) => pro.Status === "Finished"
          );
          setProjects(fitlerdata);
        } else if(optIndex===3) {
          const fitlerdata = storeProject.filter((pro) => pro.Status === "OnHold");
          setProjects(fitlerdata);
        } else{
          const fitlerdata = storeProject.filter((pro) => pro.Status === "Canceled");
          setProjects(fitlerdata);
        }
      }, [optIndex]);



    return (
        <>
            <div className="employee-dash h-full pb-40">
                {/* {role === "Client" ? (
                    <ClientSideBar />
                ) : (
                    <AdminSidebar />
                )} */}

                <div className="tm">
                    {role === "Client" ? (
                        <ClientNavbar />
                    ) : (
                        <AdminNavbar />
                    )}

                    <div className="em">
                        <div className="flex-col">
                            <div className="firstD">
                                {/* left side */}
                                <div className="dFirLef">
                                    <h2>Hi {hrms_user?.Name}</h2>
                                    <p>Welcome to your project management dashboard! Here, you can track your total, ongoing, and completed projects with real-time insights.</p>
                                </div>

                                {/* right side  */}
                                <button
                                    onClick={() => {
                                        window.location.href = "/client";
                                    }}
                                    className="refreBtn"
                                >
                                    Refresh{" "}
                                    <span>
                                        <img src={refresh} alt="" />
                                    </span>
                                </button>
                            </div>
                            <div className="flex gap-3 items-center mt-4">
                                <NavLink
                                    className={`skm ${optIndex === 0 ? 'border rounded' : 'bg-gray-200 text-black'}`}
                                    onClick={()=>setOptIndex(0)}

                                >
                                    <div className={`sinActDat colorChange1  `}>
                                        <img className="firImg" src={projectsImage} alt="" />

                                        <div className="titWrap">
                                            <h3>Total Projects</h3>
                                            <p className="hrmlRNu">{storeProject.length}</p>
                                        </div>
                                    </div>
                                </NavLink>
                                <NavLink
                                    className="skm"
                                    onClick={()=>setOptIndex(1)}

                                >                                    <div className="sinActDat colorChange2">

                                        <img className="firImg" src={projectsImage} alt="" />

                                        <div className="titWrap">
                                            <h3>Ongoing Projects</h3>
                                            <p className="hrmlRNu">{storeProject.filter((pro) => pro.Status === "Ongoing").length}</p>
                                        </div>
                                    </div>
                                </NavLink>
                                <NavLink
                                    className="skm"
                                    onClick={()=>setOptIndex(2)}

                                >
                                    <div className="sinActDat colorChange1 ">
                                        <img className="firImg" src={projectsImage} alt="" />

                                        <div className="titWrap">
                                            <h3>Finished Projects</h3>
                                            <p className="hrmlRNu">{storeProject.filter((pro) => pro.Status === "Finished").length}</p>
                                        </div>
                                    </div>
                                </NavLink>
                                <NavLink
                                    className="skm"
                                    onClick={()=>setOptIndex(3)}

                                >
                                    <div className="sinActDat colorChange2 ">
                                        <img className="firImg" src={projectsImage} alt="" />

                                        <div className="titWrap">
                                            <h3>OnHold Projects</h3>
                                            <p className="hrmlRNu">{storeProject.filter((pro) => pro.Status === "OnHold").length}</p>
                                        </div>
                                    </div>
                                </NavLink>
                                <NavLink
                                    className="skm"
                                    onClick={()=>setOptIndex(4)}

                                >
                                    <div className="sinActDat colorChange4 ">
                                        <img className="firImg" src={projectsImage} alt="" />

                                        <div className="titWrap">
                                            <h3>Canceled Projects</h3>
                                            <p className="hrmlRNu">{storeProject.filter((pro) => pro.Status === "Canceled").length}</p>
                                        </div>
                                    </div>
                                </NavLink>

                            </div>
                        </div>
                        <div className="tclwrap">


                            <nav>
                                <h1 className="my-5 text-3xl font-bold">
                                    {role === "Client" && (
                                        optIndex === 0 ? ('All Projects') : (optIndex === 1 ? ('Ongoing Projects') : (optIndex === 2 ? ("Finished Projects") : (optIndex === 3 ? ("OnHold Projects") : ("Canceled Projects"))))
                                    )}
                                </h1>
                            </nav>

                            <div className="allClients">
                                {projects.length > 0 ? (
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
                                            {currentItems.map((project, index) => (
                                                <tr key={index}>
                                                    <td>{startIndex+index + 1}</td>
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
                                                                className="underline text-blue-600"
                                                            >
                                                                View
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>{project.startDate}</td>
                                                    <td>{project.deadline}</td>
                                                    <td className="flex">
                                                        {project?.Members?.map((member, index) => {
                                                            return <>
                                                                <img
                                                                    src={`${member?.profileImage
                                                                        ? member?.profileImage
                                                                        : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                                                                        }`}
                                                                    className="w-10 h-10 rounded-full cursor-pointer transition-colors duration-300 ease-in-out"
                                                                    alt="Member Avatar "
                                                                    key={member?._id}


                                                                /></>
                                                        })}
                                                    </td>
                                                    <td>{project.Status}</td>


                                                </tr>

                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <h1>No have any project</h1>
                                )}

                            </div>
                            {totalPages >1 && (
             <div className="emPaginate">
             <button
               className={`prepaginate ${currentPage !== 1 && "putthehovebtn"
                 }`}
               onClick={() => {
                 handlePageChange(currentPage - 1);
                 scrollToTop();
               }}
               disabled={currentPage === 1}
             >
               Previous
             </button>
             <span className="pagenum">
               Page {currentPage} of {totalPages}
             </span>
             <button
               className={`prepaginate ${currentPage !== totalPages && "putthehovebtn"
                 } `}
               onClick={() => {
                 handlePageChange(currentPage + 1);
                 scrollToTop();
               }}
               disabled={currentPage === totalPages}
             >
               Next
             </button>
           </div>
           )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ClientDashboard;
