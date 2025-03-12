import React, { useState, useEffect } from "react";
import pluss from "../../images/pluss.png";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import AdminNavbar from "../Navbar/AdminNavbar";
import AdminSidebar from "../Sidebar/AdminSidebar";
import { useMain } from "../../../hooks/useMain";
import cut from "../../images/cutt.png";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminClientDashboard = () => {
    const { getClientProject, createProjectapi, allEmployee, editProjectapi, deleteTaskProject, getAllProjectApi } = useMain();
    const navigate = useNavigate();
    const location = useLocation();
    const data = location?.state;
    let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));
    const role = hrms_user?.role;

    const [formdata, setFormdata] = useState({
        Name: "",
        Description: "",
        Members: [],
        startDate: "",
        Status: "Ongoing",
        DueDate: "",
        client: data && data._id,
        projectOwner: data && data._id
    });
    const [projects, setProjects] = useState([])

    const [proUser, setProUser] = useState([]);
    const [showIndex, setShowIndex] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [addClientPop, setAddClientPop] = useState(false);
    const [optIndex, setOptIndex] = useState(0);
    const [allProjects, setAllProjects] = useState([]);
    const [storeProject, setStorePro] = useState([]);
    const [allEmp, setAllEmp] = useState([]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const changeHandler2 = (e) => {
        const selectedEmpId = e.target.value;
        if (selectedEmpId === "Select" || formdata.Members.includes(selectedEmpId))
            return;

        const selectedEmp = allEmp.find((emp) => emp._id === selectedEmpId);
        setProUser([...proUser, selectedEmp.fullName]);
        setFormdata({ ...formdata, Members: [...formdata.Members, selectedEmpId] });
    };

    const removeUser = (index) => {
        const newProUser = proUser.filter((_, i) => i !== index);
        const newMembers = formdata.Members.filter((_, i) => i !== index);
        setProUser(newProUser);
        setFormdata({ ...formdata, Members: newMembers });
    };


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

    const editHandler = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Loading...");
        try {
            const ans = await editProjectapi({ ...formdata, projectId: isEdit });
            if (ans?.status) {
                toast.success("Successfully updated");
                fetchClientProjects(data._id);
                setFormdata({
                    Name: "",
                    Description: "",
                    Members: [],
                    Status: "Ongoing",
                    DueDate: "",
                    Members: "",
                });
                setAddClientPop(false);
                setProUser([]);
                setIsEdit(false);
                setShowIndex(null);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong, please try again");
        }

        toast.dismiss(toastId);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setShowIndex(null);
        const toastId = toast.loading("Loading...");
        try {
            const ans = await createProjectapi({
                ...formdata,
                projectOwner: data._id,
                client: data._id
            });

            if (ans?.status) {
                toast.success("Successfully created project");
                fetchClientProjects(data._id);

                setFormdata({
                    Name: "",
                    Description: "",
                    Members: "",
                    Status: "Ongoing",
                    DueDate: "",
                    startDate: "",
                    client: "",
                    projectOwner: ""
                });

                setAddClientPop(false);
                setProUser([]);
                fetchClientProjects(data._id);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong, please try again");
        }

        toast.dismiss(toastId);
    };

    const handleEditClick = (client) => {
        const membersNames = client.Members.map((memberId) => {
            const member = allEmp.find((emp) => emp._id === memberId?._id);
            return member ? member.fullName : "";
        });

        setIsEdit(client._id);
        setFormdata({
            Name: client?.projectName,
            DueDate: client.deadline,
            ...client,
        });
        setProUser(membersNames);
        setAddClientPop(true);
    };

    const fetchemp = async () => {
        const ans = await allEmployee();
        // Filter active employees
        const activeEmployees = ans?.emp?.filter(
            (emp) => emp.isDeactivated === "No"
        );

        setAllEmp(activeEmployees);
    };

    const deleteApi = async (id) => {
        const toastId = toast.loading("Loading...");
        setShowIndex(null);
        const ans = await deleteTaskProject(id);
        toast.success("Successfully deleted");
        toast.dismiss(toastId);
        fetchClientProjects(data._id);
    };

    useEffect(() => {
        const client = JSON.parse(localStorage.getItem("hrms_user"));
        data && getAllProject(data._id);
        fetchemp()
    }, []);

    return (
        <>
            <div className="employee-dash h-full pb-40">
                {role === "EMPLOYEE" ? (
                    <EmployeeSidebar />
                ) : (
                    <AdminSidebar />
                )}
                <div className="tm">
                    {role === "EMPLOYEE" ? (
                        <EmployeeNavbar />
                    ) : (
                        <AdminNavbar />
                    )}
                    <div className="em">
                        <div className="tclwrap">
                            <nav>
                                <h1 className="my-5 text-3xl font-bold">{role === "Client" ? 'My Projects' : `${data?.Name} Projects`}</h1>
                                <div className="clibtns">
                                    <button
                                        onClick={() => {
                                            setAddClientPop(true);
                                        }}
                                        className="newcli"
                                    >
                                        <img src={pluss} />
                                        <span>Add Project</span>
                                    </button>
                                </div>
                            </nav>

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
                                        {projects?.map((project, index) => (
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
                                                            onClick={() =>  navigate(role==="EMPLOYEE"?"/employeeDash/HRM/projectOverview":"/adminDash/HRM/projectOverview", {
                                                                state: project,
                                                            })}
                                                        >
                                                            View
                                                        </p><span>|</span>
                                                        <p
                                                            onClick={() => {
                                                                handleEditClick(project);
                                                            }}
                                                            style={{ margin: 0, cursor: "pointer" }}
                                                        >
                                                            Edit
                                                        </p>
                                                        <span>|</span>
                                                        <p
                                                            onClick={() => deleteApi(project?._id)}
                                                            style={{ margin: 0, cursor: "pointer" }}
                                                        >
                                                            Delete
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
                                                        className="w-20 h-20 rounded-full cursor-pointer transition-colors duration-300 ease-in-out"
                                                        alt="Member Avatar "
                                                        key={index}
                                                        onClick={() =>
                                                          navigate("/adminDash/EmployeeDetails", {
                                                            state: member?._id,
                                                          })
                                                        }
                                                        
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

            {addClientPop && (
                <div className="addCliWrap">
                    <div className="addClieCont addheight">
                        <nav>
                            <p>{!isEdit ? 'Create New Project' : "Edit Project"}</p>
                            <img
                                onClick={() => {
                                    setAddClientPop(false);
                                    setProUser([]);
                                    setFormdata({
                                        Name: "",
                                        Description: "",
                                        Members: "",
                                        Status: "Ongoing",
                                        DueDate: "",
                                        Members: "",
                                    });
                                }}
                                src={cut}
                                alt=""
                            />
                        </nav>

                        <hr />

                        <form onSubmit={isEdit ? editHandler : submitHandler}>
                            <div style={{ overflowY: "auto" }}>
                                <label>
                                    <p>Name</p>
                                    <input
                                        name="Name"
                                        value={formdata.Name}
                                        onChange={changeHandler}
                                        type="text"
                                        placeholder="Name"
                                    />
                                </label>

                                <label>
                                    <p>Employee </p>
                                    <div className="allempid">
                                        {proUser.map((pro, index) => (
                                            <div key={index} className="sinproid">
                                                <p>{pro}</p>
                                                <img
                                                    src={cut}
                                                    alt="Remove"
                                                    onClick={() => removeUser(index)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <select
                                        name="Members"
                                        value={formdata.Members}
                                        onChange={changeHandler2}
                                    >
                                        <option value="Select">Select Employee</option>
                                        {allEmp?.map((emp, index) => (
                                            <option value={emp?._id} key={index}>
                                                {emp?.fullName}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label>
                                    <p>Status </p>
                                    <select
                                        name="Status"
                                        value={formdata.Status}
                                        onChange={changeHandler}
                                    >
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="OnHold">OnHold</option>
                                        <option value="Finished">Finished</option>
                                    </select>
                                </label>

                                <label>
                                    <p>Start Date</p>
                                    <input
                                        name="startDate"
                                        value={formdata.startDate}
                                        onChange={changeHandler}
                                        type="date"
                                    />
                                </label>
                                <label>
                                    <p>Due Date</p>
                                    <input
                                        name="DueDate"
                                        value={formdata.DueDate}
                                        onChange={changeHandler}
                                        type="date"
                                        min = {formdata.startDate}
                                    />
                                </label>

                                <label>
                                    <p>Description</p>
                                    <textarea
                                        type="text"
                                        name="Description"
                                        value={formdata.Description}
                                        onChange={changeHandler}
                                        placeholder="Description"
                                    />
                                </label>
                            </div>
                            <div className="btnsss">
                                <button type="submit" className="saveclient">
                                    <span>{isEdit ? "Update" : 'Add Project'} </span>
                                </button>
                                <button
                                    onClick={() => {
                                        setAddClientPop(false);
                                        setProUser([]);
                                        setFormdata({
                                            Name: "",
                                            Description: "",
                                            Members: "",
                                            Status: "Ongoing",
                                            DueDate: "",
                                            Members: "",
                                        });
                                    }}
                                    className="cancel"
                                >
                                    <span>Cancel</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminClientDashboard;
