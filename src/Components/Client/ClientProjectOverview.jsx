import React, { useState, useEffect } from "react";
import ClientNavbar from "./ClientNavbar";
import ClientSideBar from "./ClientSideBar";
// ClientSideBar
import { useLocation } from "react-router-dom";
import CircularProgress from "../admin/EmployManagement/CircularProgress";
import ProjectOverview2 from "../admin/EmployManagement/ProjectOverview2";
import { useMain } from "../../hooks/useMain";
import toast from "react-hot-toast";
import ProgressBar from "@ramonak/react-progress-bar";


const ClientProjectOverview = () => {

  const { getProjectTask, UploadFileProjectapi, allfilesproject } = useMain();
  const location = useLocation();
  const data = location?.state;
  const projectOpt = ["Overview", "Task", "Files"];
  const [optIndex, setOptIndex] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [allfiles, setAllFiles] = useState([]);
  const [openTask, setOpenTask] = useState(0);
  const [OpenTaskper, setOpenTaskper] = useState(0);
  const handleFileChange = (event) => {
    const toastId = toast.loading("Loading...");
    const files = Array.from(event.target.files); // Get all files
    setSelectedFiles(files); // Set files array to the state
    toast.dismiss(toastId);
  };
  const fetchAllFile = async () => {
    const resp = await allfilesproject(data?._id);
    setAllFiles(resp?.files);
  };

  const uploadFileProject = async () => {
    if (selectedFiles.length > 0) {
      const toastId = toast.loading("Loading...");

      try {
        await Promise.all(
          selectedFiles.map(async (file) => {
            const resp = await UploadFileProjectapi(file, data?._id);
          })
        );

        toast.success("Successfully uploaded");
        fetchAllFile();
        setSelectedFiles([]);
      } catch (error) {
        toast.error("Failed to upload files");
      } finally {
        toast.dismiss(toastId);
        setSelectedFiles([]);
      }
    } else {
      toast.error("No files selected");
    }
  };

  const [allTasks, setAllTasks] = useState([]);
  const getProjectTaskapi = async () => {
    const ans = await getProjectTask(data?._id);
    setAllTasks(ans?.tasks);
  };
  useEffect(() => {
    getProjectTaskapi();
    fetchAllFile();
  }, [])

  useEffect(() => {
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(
      (task) => task.Status === "Completed"
    ).length;

    const openTaskse = allTasks.filter(
      (task) => task.Status !== "Not Started"
    ).length;

    setOpenTask(openTaskse);

    const completedPercentage = (completedTasks / totalTasks) * 100;
    const opentaskper = ((openTaskse / totalTasks) * 100).toFixed(0);
    console.log(completedPercentage)

    setPercentage(completedPercentage);
    setOpenTaskper(opentaskper);
    // gettAllClients();
  }, [allTasks]);
  useEffect(() => { }, [selectedFiles])

  return (
    <>
      <h1>hello</h1>
      <div className="employee-dash h-full">
        <ClientSideBar />
        <div className="tm">
          <ClientNavbar />

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
                    }  ${index === 2 && "addBorder"} ${optIndex === index && "adddbg"
                    }`}
                >
                  <span>{pr}</span>
                </div>
              ))}
            </div>


            {optIndex === 0 && (
              <div className="tclwrap2" style={{ marginTop: "40px" }}>
                <div className="projectOverView">
                  <nav>
                    <div className="pronaheading">
                      <h2>OVERVIEW {data?.projectName}</h2>
                    </div>
                  </nav>

                  <div className="cont">
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
                  </div>{/* left  */}

                  <hr />

                  <div className="Decr">
                    <h3>DESCRIPTION</h3>
                    <p>{data?.Description}</p>
                  </div>

                  <hr />
                  <div className="embers">
                    <h3>MEMBERS</h3>

                    <div className="allMEmb">
                      {data?.Members?.map((mem, index) => (
                        <div key={index} className="snglme">
                          <img src={mem?.profileImage} alt="" />
                          <p>{mem?.fullName}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="secnoveview">
                  <div className="navrighdiv">
                    <nav>
                      <p>{openTask}/{allTasks?.length} Completed TASKS</p>
                      <ProgressBar completed={OpenTaskper} />
                    </nav>
                    <nav>
                      <p>Total logged Hour's</p>
                      <p>0</p>
                    </nav>
                  </div>
                </div>
              </div>
            )}


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

            {optIndex === 2 && (
              <div className="p-6 bg-gray-50 rounded-lg shadow-md mt-10">
                {/* Upload File Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Upload File or Folder</h4>
                  <input
                    type="file"
                    webkitdirectory
                    multiple
                    directory="true"
                    onChange={handleFileChange}
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
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">All Files</h4>
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
                              // Show File Name if not an image
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


              </div>
            )}
          </div>
        </div>

      </div>

    </>
  )
}

export default ClientProjectOverview;