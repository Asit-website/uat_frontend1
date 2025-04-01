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

const projectOpt = ["All", "Ongoing", "Finished", "OnHold", "Canceled"];

const TaskProjects = ({ setAlert, pop, setPop }) => {
  const {
    user,
    allEmployee,
    editProjectapi,
    getAllProjectApi,
    createProjectapi,
    deleteTaskProject,
    getClientapi,
    postNotifyProject, postClientNotification
  } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user")) || '';

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
    if (selectedEmpId === "Select") return;
    const selectedEmp = allEmp?.find((emp) => emp?._id === selectedEmpId);
    if (!selectedEmp || proUser?.includes(selectedEmp?.fullName)) return;
    setProUser((prev) => {
      const updatedProUser = [...prev, selectedEmp?.fullName];
      const alreadyUsers = allEmp.filter((emp) => updatedProUser.includes(emp?.fullName));
      setFormdata((prevData) => {
        const prevMembers = Array.isArray(prevData?.Members) ? prevData?.Members : [];
        // Update the Members array with selectedEmpId
        const newMembers = [
          ...prevMembers,
          selectedEmpId,
        ];

        return {
          ...prevData,
          Members: Array.from(new Set(newMembers)),
        };
      });

      return updatedProUser;
    });
  };


  const removeUser = (index) => {
    const newProUser = proUser?.filter((_, i) => i !== index);
    const newMembers = formdata?.Members?.filter((_, i) => i !== index);
    console.log(newMembers)
    setProUser(newProUser);
    console.log(newProUser)
    const alreadyUsers = allEmp.filter((emp) => newProUser.includes(emp?.fullName));
    setFormdata({ ...formdata, Members: alreadyUsers.map((user) => user._id) });
  };


  const [showIndex, setShowIndex] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const [addClientPop, setAddClientPop] = useState(false);

  const [optIndex, setOptIndex] = useState(0);

  const navigate = useNavigate();

  const [allProjects, setAllProjects] = useState([]);

  const [storeProject, setStorePro] = useState([]);

  const [allEmp, setAllEmp] = useState([]);
  const [selected1, setSelected] = useState();

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
      const ans = await editProjectapi({
        ...formdata, ...formdata, projectOwner: clientInfo || hrms_user._id,
        client: clientInfo || hrms_user._id, projectId: isEdit
      });
      if (ans?.status) {
        toast.success("Successfuly updated");
        getAllProject();
        const result = formdata.Members.map(userId => {
          const user = allEmp.find(e => e._id === userId);
          return user ? user.fullName : null;
        }).filter(fullName => fullName !== null);
        result.forEach((e) =>
          postNotifyProject(e, formdata.Name)
        )
        let validClient = allClient.find((e) => e._id === clientInfo)
        if (validClient) {
          postClientNotification(validClient.Name, formdata.Name);
        }
        setFormdata({
          Name: "",
          Description: "",
          Members: [],
          Status: "Ongoing",
          DueDate: "",
          Members: "",
          projectOwner: clientInfo || hrms_user._id,
          client: clientInfo || hrms_user._id
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
        ...formdata, projectOwner: clientInfo || hrms_user._id,
        client: clientInfo || hrms_user._id
      });
      if (ans?.status) {
        toast.success("Successfuly created");
        getAllProject();
        const result = formdata.Members.map(userId => {
          const user = allEmp.find(e => e._id === userId);
          return user ? user.fullName : null;
        }).filter(fullName => fullName !== null);

        console.log(result);
        result.forEach((e) =>
          postNotifyProject(e, formdata.Name)
        )
        let validClient = allClient.find((e) => e._id === clientInfo)
        if (validClient) {
          postClientNotification(validClient.Name, formdata.Name);
        }
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
    console.log(client)
    const membersNames = client.Members.map((memberId) => {
      const member = allEmp.find((emp) => emp._id === memberId?._id);
      return member ? member.fullName : "";
    });
    const clientStatus = allClient.find((e) => e._id === client.client)
    console.log(clientStatus?._id)
    setClientInfo(clientStatus?._id)
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
    }
    else if (optIndex === 1) {
      const fitlerdata = storeProject.filter((pro) => pro.Status === "Ongoing");
      setAllProjects(fitlerdata);
    }
    else if (optIndex === 2) {
      const fitlerdata = storeProject.filter(
        (pro) => pro.Status === "Finished"
      );
      setAllProjects(fitlerdata);
    }
    else if (optIndex === 3) {
      const fitlerdata = storeProject.filter((pro) => pro.Status === "OnHold");
      setAllProjects(fitlerdata);
    }
    else {
      const fitlerdata = storeProject.filter((pro) => pro.Status === "Canceled");
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
                      }  ${index === 4 && "addBorder"} ${optIndex === index && "adddbg"
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
                      <tr key={index} className="border border-none">
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
                              className="underline text-blue-600"
                            >
                              View
                            </p>
                            <span>|</span>
                            <p
                              onClick={() => {
                                handleEditClick(client);
                                setSelected(client)
                              }}
                              style={{ margin: 0, cursor: "pointer" }}
                              className="underline text-blue-600"
                            >
                              Edit
                            </p>
                            <span>|</span>
                            <p
                              onClick={() => deleteApi(client?._id)}
                              style={{ margin: 0, cursor: "pointer" }}
                              className="underline text-blue-600"
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

                        <td className="flex items-center justify-center align-center">
                          {client?.Members?.map((member) => (
                            <img
                              src={`${member?.profileImage
                                ? member?.profileImage
                                : "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                                }`}
                              className="w-10 h-10  mt-5 rounded-full cursor-pointer transition-colors duration-300 ease-in-out"
                              alt="Member Avatar "
                              key={member._id}
                              onClick={() =>
                                navigate("/adminDash/EmployeeDetails", {
                                  state: member?._id,
                                })
                              }

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
              <p>{isEdit ? "Edit Project" : "Create New Project"}</p>
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
                    value=''
                    onChange={changeHandler2}
                  >
                    <option value="Select">Select Employee</option>
                    {allEmp?.map((emp, index) => (
                      <option value={emp?._id} key={index}
                        disabled={proUser.includes(emp.fullName)}>
                        {emp?.fullName} {formdata.Members.includes(emp._id) ? "(Selected)" : ""}
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
                    <option value="Canceled">Canceled</option>
                  </select>
                </label>

                <label>
                  <p>Client</p>
                  <select
                    value={clientInfo}
                    onChange={(e) => setClientInfo(e.target.value)}  // Update state with the selected client
                  >
                    <option value={hrms_user._id}>Select</option>
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
                    min={formdata.startDate}
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
                  <span>{isEdit ? "Update" : "Add Project"} </span>
                </button>
                <button
                  onClick={() => {
                    setClientInfo()
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
