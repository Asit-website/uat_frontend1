import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import pluss from "../../images/pluss.png";
import { Avatar } from "react-profile-avatar";
import "react-profile-avatar/dist/index.css";
import threedots from "../../images/thredonts.png";
import { useEffect, useState } from "react";
import edit from "../../images/edit.png";
import disable from "../../images/delete1.png";
import cut from "../../images/cutt.png";
import invidd from "../../images/invide.png";
import share from "../../images/bx-share-alt.png";
import bxcopy from "../../images/bx-copy.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const projectOpt = ["All", "Ongoing", "Finished", "OnHold"];

const TaskProjects = ({ setAlert, pop, setPop }) => {
  const {
    user,
    allEmployee,
    editProjectapi,
    getAllProjectApi,
    createProjectapi,
    deleteTaskProject,
    getClientapi,
  } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [formdata, setFormdata] = useState({
    Name: "",
    Description: "",
    Members: [],
    startDate: "",
    Status: "Ongoing",
    DueDate: "",
  });
  const [clientInfo, setClientInfo] = useState("")
  const [proUser, setProUser] = useState([]);
  const [allClient, setAllClient] = useState([]);
  const getAllClient = async () => {
    try {
      const ans = await getClientapi();
      console.log("ans", ans);
      if (ans?.status) {
        setAllClient(ans?.data);
        console.log(allClient)
      }
    } catch (error) {
      console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }
  };
  useEffect(() => {
    // console.log(clientInfo)
  }, [clientInfo])

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

  const [showIndex, setShowIndex] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const [addClientPop, setAddClientPop] = useState(false);

  const [optIndex, setOptIndex] = useState(0);

  const navigate = useNavigate();

  const [allProjects, setAllProjects] = useState([]);

  const [storeProject, setStorePro] = useState([]);

  const [allEmp, setAllEmp] = useState([]);

  const getAllProject = async () => {
    const ans = await getAllProjectApi();
    if (ans?.status) {
      setAllProjects(ans?.projects);
      setStorePro(ans?.projects);
    }
  };

  const editHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const ans = await editProjectapi({ ...formdata, projectId: isEdit });
      if (ans?.status) {
        toast.success("Successfuly updated");
        getAllProject();
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
      toast.error("sometinng went wrong ,please try agin");
    }

    toast.dismiss(toastId);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setShowIndex(null);
    const toastId = toast.loading("Loading...");
    try {
      const ans = await createProjectapi({
        ...formdata, projectOwner: clientInfo,
        client: clientInfo
      });
      if (ans?.status) {
        toast.success("Successfuly created");
        getAllProject();
        setFormdata({
          Name: "",
          Description: "",
          Members: "",
          Status: "Ongoing",
          DueDate: "",
          startDate: "",
          Members: "",
        });
        setAddClientPop(false);
        setProUser([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }

    toast.dismiss(toastId);
  };

  // const fetchemp = async () => {
  //   const ans = await allEmployee();

  //   setAllEmp(ans?.emp);
  // };

  const fetchemp = async () => {
    const ans = await allEmployee();
    // Filter active employees
    const activeEmployees = ans?.emp?.filter(
      (emp) => emp.isDeactivated === "No"
    );
    // console.log("activeEmployee",activeEmployees)
    setAllEmp(activeEmployees);
  };

  const deleteApi = async (id) => {
    const toastId = toast.loading("Loading...");
    setShowIndex(null);
    const ans = await deleteTaskProject(id);
    toast.success("Successfuly deleted");
    toast.dismiss(toastId);
    getAllProject();
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

  useEffect(() => {
    fetchemp();
    getAllProject();
    getAllClient()
  }, []);

  useEffect(() => {
    if (optIndex === 0) {
      setAllProjects([...storeProject]);
    } else if (optIndex === 1) {
      const fitlerdata = storeProject.filter((pro) => pro.Status === "Ongoing");
      setAllProjects(fitlerdata);
    } else if (optIndex === 2) {
      const fitlerdata = storeProject.filter(
        (pro) => pro.Status === "Finished"
      );
      setAllProjects(fitlerdata);
    } else {
      const fitlerdata = storeProject.filter((pro) => pro.Status === "OnHold");
      setAllProjects(fitlerdata);
    }
  }, [optIndex]);

  return (
    <>
      <div className="employee-dash h-full">
        {role === "EMPLOYEE" ? (
          <EmployeeSidebar pop={pop} setPop={setPop} />
        ) : (
          <AdminSidebar pop={pop} setPop={setPop} />
        )}

        <div className="tm">
          {role === "EMPLOYEE" ? (
            <EmployeeNavbar user={user} setAlert={setAlert} />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">
            <div className="tclwrap">
              <nav>
                <h2>Projects</h2>

                <div className="clibtns">
                  <button
                    onClick={() => {
                      setAddClientPop(true);
                    }}
                    className="newcli"
                  >
                    <img src={pluss} /> <span>Add Project</span>
                  </button>
                </div>
              </nav>

              {/* filter type  */}
              <div className="selectOption">
                {projectOpt.map((pr, index) => (
                  <div
                    onClick={() => setOptIndex(index)}
                    key={index}
                    className={`cursor-pointer singelPr ${index === 0 && "addlefborder"
                      }  ${index === 3 && "addBorder"} ${optIndex === index && "adddbg"
                      }`}
                  >
                    <span>{pr}</span>
                  </div>
                ))}
              </div>

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
                    {allProjects.map((client, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <span>{client.projectName}</span>
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginTop: "2px",
                              fontSize: "0.875rem",
                              color: "#2563eb",
                            }}
                          >
                            <p
                              onClick={() =>
                                navigate("/adminDash/HRM/projectOverview", {
                                  state: client,
                                })
                              }
                              style={{ margin: 0, cursor: "pointer" }}
                            >
                              View
                            </p>
                            <span>|</span>
                            <p
                              onClick={() => {
                                handleEditClick(client);
                              }}
                              style={{ margin: 0, cursor: "pointer" }}
                            >
                              Edit
                            </p>
                            <span>|</span>
                            <p
                              onClick={() => deleteApi(client?._id)}
                              style={{ margin: 0, cursor: "pointer" }}
                            >
                              Delete
                            </p>
                          </div>
                        </td>
                        <td>
                          {
                            new Date(client?.createdAt)
                              .toISOString()
                              .split("T")[0]
                          }
                        </td>
                        <td>{client?.deadline}</td>

                        <td style={{ display: "flex", gap: "-2px" }}>
                          {client?.Members?.map((member) => (
                            <img
                              src={`${member?.profileImage
                                ? member?.profileImage
                                : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                                }`}
                              className="w-20 h-20"
                              alt="Member Avatar "
                              key={member._id}
                              onClick={() =>
                                navigate("/adminDash/EmployeeDetails", {
                                  state: member?._id,
                                })
                              }
                              style={{
                                borderRadius: "50%",
                                cursor: "pointer",
                                transition:
                                  "color 0.3s ease, text-decoration 0.3s ease",
                                height: "40px",
                                width: "40px",
                              }}
                            />
                          ))}
                        </td>
                        <td>
                          <span className="text-blue-600 border border-blue-200 bg-blue-50 flex items-center rounded-md text-xs font-medium leading-4 px-2 py-1">
                            {client.Status}
                          </span>

                        </td>
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
              <p>Create New Project</p>
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
                    console.log("all employee list ",allEmp)
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
                  <p>Client</p>
                  <select
                    value={clientInfo}
                    onChange={(e) => setClientInfo(e.target.value)}  // Update state with the selected client
                  >
                    <option value="Select">Select</option>
                    {allClient.map((e, index) => (
                      <option value={e._id} key={index}>
                        {e.Name}
                      </option>
                    ))}
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
                  <span>Add Project </span>
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
export default TaskProjects;