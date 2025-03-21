import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import "./quote.css";
import "react-profile-avatar/dist/index.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CircularProgress from "./CircularProgress";
import ProgressBar from "@ramonak/react-progress-bar";
import ProjectOverview2 from "../../admin/EmployManagement/ProjectOverview2";
import toast from "react-hot-toast";
import ClientNavbar from "../../Client/ClientNavbar";
import ClientSideBar from "../../Client/ClientSideBar";


const ProjectOverview = ({ setAlert, pop, setPop }) => {
  const { user, getProjectTask, getClientapi, UploadFileProjectapi, allfilesproject, fetchAllTimesheetapi } =
    useMain();

  const [allTasks, setAllTasks] = useState([]);

  const location = useLocation();

  const data = location?.state;
  // // console.log(data)

  const [percentage, setPercentage] = useState(0);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"))

  const role = hrms_user.Role || hrms_user.role;
  // // console.log(role)

  const [allClients, setAllClients] = useState();

  const projectOpt = ["Overview", "Task", "Files", "Timesheets"];
  const [optIndex, setOptIndex] = useState(0);
  const [openTask, setOpenTask] = useState(0);
  const [OpenTaskper, setOpenTaskper] = useState(0);

  const [daysleft, setDaysleft] = useState(0);
  const [daysleftper, setDaysleftper] = useState(0);

  const getProjectTaskapi = async () => {
    const ans = await getProjectTask(data?._id);
    setAllTasks(ans?.tasks?.reverse());
  };
  const gettAllClients = async () => {
    try {
      const ans = await getClientapi();
      // console.log("ans", ans);
      if (ans?.status) {
        setAllClients(ans?.data);
        // // console.log(allClient)
      }
    } catch (error) {
      // console.log(error);
      toast.error("sometinng went wrong ,please try agin");
    }
  }

  useEffect(() => {
    const totalTasks = allTasks?.length;
    const completedTasks = allTasks?.filter(
      (task) => task.Status === "Completed"
    ).length;

    const openTaskse = allTasks?.filter(
      (task) => task.Status !== "Completed"
    ).length;

    setOpenTask(openTaskse);

    const completedPercentage = (completedTasks / totalTasks) * 100;
    const opentaskper = ((openTaskse / totalTasks) * 100).toFixed(0);

    setPercentage(completedPercentage);
    setOpenTaskper(opentaskper);
    gettAllClients();
  }, [allTasks]);

  useEffect(() => {
    const today = new Date();

    const dueDate = new Date("2024-07-26");

    const differenceMs = dueDate - today;

    const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    setDaysleft(daysDifference);

    const totalDaysInYear = 20;
    const daysLeftPercentage = Math.ceil(
      (daysDifference / totalDaysInYear) * 100
    );

    setDaysleftper(daysLeftPercentage);

    // getProjectTaskapi();
  }, [data]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [allfiles, setAllFiles] = useState([]);
  const fileInputRef = useRef(null);


  const fetchAllFile = async () => {
    const resp = await allfilesproject(data?._id);
    setAllFiles(resp?.files?.reverse());
  };

  const handleFileChange = (event) => {
    const toastId = toast.loading("Loading...");
    const files = event.target.files; // Get all selected files
    setSelectedFile(files); // Store the files in state
    toast.dismiss(toastId);
  };

  const uploadFileProject = async () => {
    if (selectedFile && selectedFile.length > 0) {
      const toastId = toast.loading("Uploading...");

      // Loop through the selected files and upload each one
      for (let i = 0; i < selectedFile.length; i++) {
        const file = selectedFile[i];
        await UploadFileProjectapi(file, data?._id);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("Successfully uploaded");
      toast.dismiss(toastId);
      fetchAllFile();
    }
  };
  const [altimesheet, setTimesheet] = useState([]);

  function findTime(timestamp, state) {
    const date = new Date(timestamp);
    if (state === "time") {
      const time = date.toISOString().slice(11, 19);
      // console.log(time);
      return time
    }
    else {
      const date = new Date(timestamp);
      const formattedDate = date.toISOString().slice(0, 10);
      return formattedDate
    }
  }
  const fetchAllTimesheet = async () => {
    const resp = await fetchAllTimesheetapi(data?._id);
    // console.log("res", resp);
    setTimesheet(resp?.taskTimelines);
    // console.log(resp)
    // // console.log(new Date(resp[0]))

  }
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const totalPages = Math.ceil(altimesheet?.length / tasksPerPage);
  const currentTimeSheet = altimesheet?.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const dateFormate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString()
  }

  useEffect(() => {
    gettAllClients()
    getProjectTaskapi()
  }, []);

  useEffect(() => {
    if (optIndex === 1) {
      getProjectTaskapi()
    }
    if (optIndex === 3) {
      fetchAllTimesheet();
    } if (optIndex === 2) {
      fetchAllFile();

    }
  }, [optIndex]);

  return (
    <>
      <div className="employee-dash h-full">
        {role === "EMPLOYEE" ? (
          <EmployeeSidebar user={user} setAlert={setAlert} />
        ) : role === "Client" ? (
          <ClientSideBar user={user} setAlert={setAlert} />
        ) : (
          <AdminSidebar user={user} setAlert={setAlert} />
        )}

        <div className="tm">
          {role === "EMPLOYEE" ? (
            <EmployeeNavbar user={user} setAlert={setAlert} />
          ) : role === "Client" ? (
            <ClientNavbar user={user} setAlert={setAlert} />
          ) : (
            <AdminNavbar user={user} setAlert={setAlert} />
          )}

          <div className="em">
            <div
              className=""
              style={{
                width: "338px",
                height: "42px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {projectOpt.map((pr, index) => (
                <div
                  onClick={() => setOptIndex(index)}
                  key={index}
                  className={`cursor-pointer singelPr ${index === 0 && "addlefborder"
                    }  ${index === 3 && "addBorder"} ${optIndex === index && "adddbg"
                    } ${role === "Client" && index === 1 || index === 3 ? "hide" : ""}`}
                >
                  <span>{pr}</span>
                </div>
              ))}
            </div>

            {optIndex === 1 && (
              <>
                <div style={{ marginTop: "-1px", paddingTop: "-20px" }}>
                  <ProjectOverview2
                    getProjectTaskapi={getProjectTaskapi}
                    allTasks={allTasks}
                    setAllTasks={setAllTasks}
                    data={data}
                  />
                </div>
              </>
            )}

            {optIndex === 0 && (
              <div className="tclwrap2" style={{ marginTop: "40px" }}>
                <div className="projectOverView">
                  <nav>
                    <div className="pronaheading">
                      <h2>OVERVIEW {data?.projectName}</h2>
                    </div>
                  </nav>

                  <div className="cont">
                    {/* left  */}
                    <div className="proleft">
                      <p>Project</p>
                      <p>{data?.projectName}</p>
                      <p>Status</p>
                      <p>{data?.Status}</p>
                      <p>Date Created </p>
                      <p>
                        {new Date(data?.createdAt).toISOString().split("T")[0]}
                      </p>
                      <p>Deadline</p>
                      <p>{data?.deadline}</p>
                    </div>

                    <div className="eachProgeer">
                      <h4>Project Progress</h4>
                      <CircularProgress
                        percentage={(data?.Status === "Finished") ? 100 : (percentage || 0)}
                        color={"#4caf50"}
                      />
                    </div>
                  </div>

                  <hr />

                  <div className="Decr">
                    <h3>DESCRIPTION</h3>
                    <p>{data?.Description}</p>
                  </div>

                  <hr />

                </div>

                <div className="secnoveview">
                  <div className="navrighdiv">
                    <nav>
                      <p>{openTask}/{allTasks?.length} OPEN TASKS</p>
                      <ProgressBar completed={OpenTaskper} />
                    </nav>
                    
                    <hr className="my-5 border"/>

                    <div className="embers">
                    <h3>MEMBERS</h3>

                    <div className="allMEmb">
                      {data?.Members?.map((mem, index) => (
                        <div key={index} className="snglme">
                          <img src={mem?.profileImage ? mem?.profileImage :"https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"} alt="" />
                          <p>{mem?.fullName}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            )}

            {optIndex === 2 && (
              <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-10">
                {/* Upload File Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Upload File or Folder</h4>
                  <input
                    type="file"
                    webkitdirectory
                    directory="true"
                    multiple
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                  />
                  <button
                    onClick={uploadFileProject}
                    className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Upload
                  </button>
                </div>
                {/* All Files Section */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">{allfiles?.length===0 ?"No files": "All Files"}</h4>
                  <div className="space-y-6">
                    {allfiles?.map((file, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-600">
                              <strong>File Name:</strong> {file?.fileName}
                            </p>
                            <p className="text-gray-600">
                              <strong>Download Link:</strong>{" "}
                              <a
                                target="_blank"
                                href={`${file?.filePath}`}
                                className="text-blue-500 hover:underline"
                              >
                                {file?.filePath}
                              </a>
                            </p>
                            <p className="text-gray-600">
                              <strong>Uploaded by:</strong> {file?.uploadedBy?.fullName}
                            </p>
                            <p className="text-gray-600">
                              <strong>Uploaded On:</strong> {new Date(file?.createdAt).toLocaleDateString()}
                            </p>
                          </div>

                          {/* Image or file preview */}
                          <div>
                            {file?.filePath && /\.(jpg|jpeg|png|gif)$/i.test(file?.filePath) ? (
                              // Show Image Preview
                              <a
                                target="_blank"
                                href={`${file?.filePath}`}
                                className="text-blue-500 hover:underline"
                              >
                                <img
                                  src={file?.filePath}
                                  alt={file?.fileName}
                                  className="h-20 w-20 object-cover rounded-md"
                                />
                              </a>
                            ) : (
                              <a
                                target="_blank"
                                href={`${file?.filePath}`}
                                className="text-blue-500 hover:underline"
                              >

                                <p className="text-gray-500 text-sm">{file?.fileName}</p>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


              </div>
            )}



            {
              optIndex === 3 &&
              <div className="timehssepwrap mt-10">


                <table className="w-full prodetailTable text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-center">
                        Clock In
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        Clock Out
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        Date
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        Submitted By
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        Total Time
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        Worked On
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTimeSheet?.map((task, index) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-4 py-3 text-center">{findTime(task?.clockIn, "time")}</td>
                        <td className="px-4 py-3 text-center">{task?.clockOut}</td>
                        <td className="px-4 py-3 text-center">{findTime(task?.createdAt)}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <img
                              className="rounded-full w-10 h-10"
                              src={task?.submitedBy?.profileImage || "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"}
                              alt={task?.submitedBy?.fullName || "User profile"}
                            />
                            <p className="text-sm">{task?.submitedBy?.fullName || "Unknown User"}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">{task?.totalTime}</td>
                        <td className="px-4 py-3 text-center">{task?.taskId?.taskName}</td>
                        <td className="px-4 py-3 text-center">{task?.Note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {totalPages > 1 && (
                  <div className="navbuttons flex justify-between items-center mt-4">
                    <button
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                    >
                      Prev
                    </button>
                    <span className="px-4">{currentPage}</span>
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                    >
                      Next
                    </button>
                  </div>
                )}

              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};
export default ProjectOverview;
