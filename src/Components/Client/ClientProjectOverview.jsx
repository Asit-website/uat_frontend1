import React, { useState, useEffect } from "react";
import ClientNavbar from "./ClientNavbar";
import ClientSideBar from "./ClientSideBar";
// ClientSideBar
import { useLocation } from "react-router-dom";
import CircularProgress from "../admin/EmployManagement/CircularProgress";
import ProjectOverview2 from "../admin/EmployManagement/ProjectOverview2";
import { useMain } from "../../hooks/useMain";
const ClientProjectOverview = () => {

    const { getProjectTask } = useMain();
    const location = useLocation();
    const data = location?.state;
    const ans = 'aman'
    const projectOpt = ["Overview", "Task", ];
    const [optIndex, setOptIndex] = useState(0);

    const [allTasks, setAllTasks] = useState([]);
    const getProjectTaskapi = async () => {
        const ans = await getProjectTask(data?._id);
        setAllTasks(ans?.tasks);
    };
    useEffect(() => {
        getProjectTaskapi();
    }, [])

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
                                        }  ${index === 1 && "addBorder"} ${optIndex === index && "adddbg"
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
                                                percentage={'0'}
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
                    </div>
                </div>

            </div>

        </>
    )
}

export default ClientProjectOverview;