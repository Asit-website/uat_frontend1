import React, { useState, useEffect, useRef } from "react";
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

  const { getProjectTask, UploadFileProjectapi, allfilesproject, deleteProjectFile } = useMain();
  const location = useLocation();
  const data = location?.state;
  // console.log(data)
  const projectOpt = ["Overview", "Task", "Files"];
  const [optIndex, setOptIndex] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [openTask, setOpenTask] = useState(0);
  const [OpenTaskper, setOpenTaskper] = useState(0);

  
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
      if(selectedFile === null) return toast.error('Please Choose a file !!')
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


  const deleteFile = async(id)=>{
    console.log(id)
    const ans = await deleteProjectFile(id);
    await fetchAllFile()
    return  ans;
  }

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
    const totalTasks = allTasks?.length;
    const completedTasks = allTasks?.filter(
      (task) => task?.Status === "Completed"
    )?.length;

    const openTaskse = allTasks?.filter(
      (task) => task?.Status !== "Completed"
    )?.length;

    setOpenTask(openTaskse);
    const completedPercentage = (completedTasks / totalTasks) * 100;
    const opentaskper = ((openTaskse / totalTasks) * 100)?.toFixed(0);
    // console.log(completedPercentage)
    if (isNaN(opentaskper)) {
      console.log("opentaskper is NaN");
      
      setOpenTaskper(0);
    } else {
    setOpenTaskper(opentaskper);

      console.log("opentaskper is not NaN");
  }

    setPercentage(completedPercentage);
    // gettAllClients();
  }, [allTasks]);
  useEffect(() => { }, [selectedFile])

  return (
    <>
      <h1>hello</h1>
      <div className="employee-dash h-full">
        {/* <ClientSideBar /> */}
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

                  
                </div>

                <div className="secnoveview">
                  <div className="navrighdiv">
                    <nav>
                      <p>{openTask}/{allTasks?.length} Open TASKS</p>
                      <ProgressBar completed={OpenTaskper} />
                    </nav>
                    <hr className="my-5"/>
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
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">All Files</h4>
                  <div className="space-y-6">
                    {allfiles?.map((file, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-600">
                              <strong>File Name:</strong> {file?.fileName}
                            </p>
                            {/* <p className="text-gray-600">
                              <strong>Download Link:</strong>{" "}
                              <a
                                target="_blank"
                                href={`${file?.filePath}`}
                                className="text-blue-500 hover:underline"
                              >
                                {file?.filePath}
                              </a>
                            </p> */}
                            <p className="text-gray-600">
                              <strong>Uploaded by:</strong> {file?.uploadedBy?.fullName || JSON.parse(localStorage.getItem("hrms_user")).Name}
                            </p>
                            <p className="text-gray-600">
                              <strong>Uploaded On:</strong> {new Date(file?.createdAt).toLocaleDateString()}
                            </p>
                            <button onClick={()=>deleteFile(file?._id)} className="bg-red-500 text-white px-2 rounded-l py-1">Delete</button>
                          </div>

                          {/* Image or file preview */}
                          <div>
                            {file?.filePath && /\.(jpg|jpeg|png|gif|webp)$/i.test(file?.filePath) ? (
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