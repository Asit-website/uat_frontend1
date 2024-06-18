import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import leadProfile from "../../images/leadProfile.png";
import bx from "../../images/bx-purchase-tag.png";
import "./lead.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import veci from "../../images/veci.svg";
import deli from "../../images/deli.svg";
import semi from "../../images/simi.svg";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import leadEdit from "../../images/leadEdit.png";
import leadDel from "../../images/leadDel.png";
import cancel from "../../images/cancell.png";
import { useLocation } from "react-router-dom";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import timeline from "../../images/timeline.png";

const ImportLead = ({ setAlert, pop, setPop }) => {
  const {
    user,
    getLead2,
    updateLeadStatus,
    updateLeadNote,
    getQuotationAll,
    deleteQuotation,
    taskCreateApi,
    meetCreateApi,
    taskEditApi,
    meetEditApi,
  } = useMain();

  const { id } = useParams();

  const location = useLocation();
  const { type, data1 } = location.state || {};

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [data, setData] = useState({});

  const [notOpenEdit, setnotOpenEdit] = useState(false);

  const [LeadStatus, setLeadStatus] = useState("");

  const [Note, setNote] = useState("");

  const navigate = useNavigate();

  const getData = async () => {
    let ans = await getLead2(id, "", "", "");
    setData(ans.data[0]);
    setLeadStatus(ans?.data[0]?.LeadStatus);
  };

  console.log("leastatus ", LeadStatus);

  const updatingLeadStatus = async (leading) => {
    const { _id } = data;
    await updateLeadStatus(_id, leading);
  };

  const updatingNote = async (isDelete = false) => {
    const toastId = toast.loading("Loading...");
    const { _id } = data;

    let whichNote = isDelete ? "" : Note;
    const ans = await updateLeadNote(_id, whichNote, LeadStatus);

    if (isDelete) {
      toast.success("Successfuly deleted");
    } else if (ans?.message) {
      toast.success("Successfuly updated");
    } else {
      toast.error("Error while updating");
    }

    getData();
    toast.dismiss(toastId);
  };

  const [userQuotation, setUserQu] = useState([]);

  const getQuotation = async () => {
    const ans = await getQuotationAll(id);
    if (ans?.status) {
      setUserQu(ans?.data);
    }
  };

  useEffect(() => {
    getQuotation();
  }, [refreshFlag]);

  const deleteProject = async (id) => {
    confirmAlert({
      title: "Are you sure to delete this data?",
      message: "All related data to this will be deleted",
      buttons: [
        {
          label: "Yes, Go Ahead!",
          style: {
            background: "#FF5449",
          },
          onClick: async () => {
            await deleteQuotation(id);
            toast.success("delete Successfully");
            setRefreshFlag(!refreshFlag);
          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });
  };

  const [openCreateTask, setOpenCreateTask] = useState(false);
  const [openCreateMeet, setOpenCreateMeet] = useState(false);
  const [opnAdNew, setOpenAdNew] = useState(false);

  const [isTimeLine, setIsTimeLine] = useState(false);

  const [taskData, setTaskData] = useState({
    Subject: "",
    Priority: "",
    Status: "",
    DueDate: "",
    RelatedTo: "",
    ContactName: "",
    Note: "",
    LeadId: id,
    userId: data?.LeadOwner?._id,
  });

  const [meetData, setMeetData] = useState({
    title: "",
    meetDateFrom: "",
    meetDateTo: "",
    Status: "",
    LeadId: id,
    meetTimeFrom: "",
    meetTimeTo: "",
    Host: "",
    RelatedTo: "",
    Participant: "",
    Note: "",
    userId: data?.LeadOwner?._id,
  });

  const taskHandler = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const meetHandler = (e) => {
    const { name, value } = e.target;
    setMeetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const TaskSubmitHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");

    const ans = await taskCreateApi({ ...taskData });

    if (ans?.status) {
      toast.success("Successfuly created");
      setTaskData({
        Subject: "",
        Priority: "",
        Status: "",
        DueDate: "",
        RelatedTo: "",
        ContactName: "",
        Note: "",
        LeadId: id,
        userId: data?.LeadOwner?._id,
      });
      setOpenCreateTask(false);
    }

    toast.dismiss(toastId);
  };

  const taskUpdateHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");

    const ans = await taskEditApi({ ...taskData, taskId: data1?._id });

    if (ans?.status) {
      toast.success("Successfuly updated");
      setTaskData({
        Subject: "",
        Priority: "",
        Status: "",
        DueDate: "",
        RelatedTo: "",
        ContactName: "",
        Note: "",
        LeadId: id,
        userId: data?.LeadOwner?._id,
      });
      setOpenCreateTask(false);
    }

    toast.dismiss(toastId);
  };

  const meetSubmitHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");

    const ans = await meetCreateApi({ ...meetData });

    if (ans?.status) {
      toast.success("Successfuly created");
      setOpenCreateMeet(false);
      setMeetData({
        title: "",
        meetDateFrom: "",
        meetDateTo: "",
        Status: "",
        meetTimeFrom: "",
        meetTimeTo: "",
        Host: "",
        RelatedTo: "",
        Participant: "",
        Note: "",
        userId: data?.LeadOwner?._id,
      });
    }

    toast.dismiss(toastId);
  };

  const meetUpdateHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");

    const ans = await meetEditApi({ ...meetData, meetId: data1?._id });

    if (ans?.status) {
      toast.success("Successfuly created");
      setOpenCreateMeet(false);
      setMeetData({
        title: "",
        meetDateFrom: "",
        meetDateTo: "",
        Status: "",
        meetTimeFrom: "",
        meetTimeTo: "",
        Host: "",
        RelatedTo: "",
        Participant: "",
        Note: "",
        userId: data?.LeadOwner?._id,
      });
    }

    toast.dismiss(toastId);
  };

  const [noting, setNoting] = useState({
    isCold: false,
    isWarm: false,
    isFollowUp: false,
    isHot: false,
  });

  useEffect(() => {
    if (LeadStatus === "Cold") {
      setNoting((prev) => ({
        ...prev,
        isCold: true,
        isWarm: false,
        isHot: false,
        isFollowUp: false,
      }));
    } else if (LeadStatus === "Warm") {
      setNoting((prev) => ({
        ...prev,
        isCold: false,
        isWarm: true,
        isHot: false,
        isFollowUp: false,
      }));
    } else if (LeadStatus === "Hot") {
      setNoting((prev) => ({
        ...prev,
        isCold: false,
        isHot: true,
        isWarm: false,
        isFollowUp: false,
      }));
    } else {
      setNoting((prev) => ({
        ...prev,
        isCold: false,
        isHot: false,
        isWarm: false,
        isFollowUp: true,
      }));
    }
  }, [LeadStatus]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (type === "meet" && data1) {
      setMeetData(data1);
      setOpenCreateMeet(true);
    }
  }, [type, data1]);

  useEffect(() => {
    if (type === "task" && data1) {
      setTaskData(data1);
      setOpenCreateTask(true);
    }
  }, [type, data1]);

  useEffect(() => {
    if (data) {
      setMeetData((prevMeetData) => ({
        ...prevMeetData,
        userId: data?.LeadOwner?._id,
      }));

      setTaskData((prev) => ({
        ...prev,
        userId: data?.LeadOwner?._id,
      }));
    }
  }, [data]);

  return (
    <div className="imprtleadCont">
      <div className="employee-dash h-full">
        <EmployeeSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          <EmployeeNavbar user={user} setAlert={setAlert} />

          <div className="em">
            {/* first  */}
            <section className="firsSec">
              {/* /left side  */}
              <div className="leadLe">
                <img
                  className="sio"
                  src={data?.image ? data?.image : leadProfile}
                  alt=""
                />

                <div className="lTITL">
                  <h2>Kanishka Tyagi</h2>
                  <p style={{ display: "flex" }}>
                    <img src={bx} /> <span> Add Tags</span>
                  </p>
                </div>
              </div>

              {/* right side  */}
              <div className="laedRight">
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 sendBtn"
                >
                  Send Email
                </button>

                <button
                  onClick={() =>
                    navigate("/adminDash/editLead", { state: data })
                  }
                  className="refresh1"
                >
                  <span className="ref1">Edit</span>
                </button>

                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="text-white silo   px-5 py-2.5 text-center inline-flex items-center"
                  type="button"
                >
                  Actions{" "}
                  <svg
                    className="ml-2"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.293 9.29303L12 13.586L7.70697 9.29303L6.29297 10.707L12 16.414L17.707 10.707L16.293 9.29303Z"
                      fill="#666D76"
                    />
                  </svg>
                </button>
              </div>
            </section>

            {/*time line section   */}
            <div className="timeLineCont">
              {/* left side */}
              <div className="timeLOverBtns">
                <div
                  onClick={() => setIsTimeLine(false)}
                  className={`${isTimeLine ? "noTimeline" : "timeline"}`}
                >
                  <p>Overview</p>
                </div>

                <div
                  onClick={() => setIsTimeLine(true)}
                  className={`${isTimeLine ? "timelin12" : "timelin1"}`}
                >
                  <p>Timeline</p>
                </div>
              </div>

              {/* right side */}
              <button className="leadClonse">
                <span>Lead Close</span>
              </button>
            </div>

            {isTimeLine ? (
              <div className="timeelineWrap">
                <h2>Timeline History</h2>

                <hr />

                <div className="timeCount">
                  {/* singl */}
                  <div className="singleTimeline">
                    {/* left side */}
                    <div className="tiemLeft">
                      <p className="timeDate">Apr 27, 2024</p>
                      <p className="timelineTime">03:48PM</p>
                    </div>

                    <img src={timeline} alt="" />

                    <div className="leadCreate">
                      <p className="timeLeadcREA">Lead Created</p>
                      <p className="timeByINFO">by info</p>
                    </div>
                  </div>

                  {/* singl */}
                  <div className="singleTimeline">
                    {/* left side */}
                    <div className="tiemLeft">
                      <p className="timeDate">Apr 27, 2024</p>
                      <p className="timelineTime">03:48PM</p>
                    </div>

                    <img src={timeline} alt="" />

                    <div className="leadCreate">
                      <p className="timeLeadcREA">Lead Created</p>
                      <p className="timeByINFO">by info</p>
                    </div>
                  </div>

                  {/* singl */}
                  <div className="singleTimeline">
                    {/* left side */}
                    <div className="tiemLeft">
                      <p className="timeDate">Apr 27, 2024</p>
                      <p className="timelineTime">03:48PM</p>
                    </div>

                    <img src={timeline} alt="" />

                    <div className="leadCreate">
                      <p className="timeLeadcREA">Lead Created</p>
                      <p className="timeByINFO">by info</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="leadWRAP">
                {/* first part  */}
                <div className="leadFirs">
                  <h2 className="ehading">Lead Information</h2>

                  <div className="eladinfoWrap">
                    {/* left side  */}
                    <div className="lleaiFOlEFT">
                      <div className="subPart">
                        <h3>Lead Owner :</h3>
                        <p>{data?.LeadOwner?.email}</p>
                      </div>

                      <div className="subPart">
                        <h3>{data?.title}</h3>
                        <p>-</p>
                      </div>

                      <div className="subPart">
                        <h3>Phone :</h3>
                        <p>{data?.Phone}</p>
                      </div>

                      <div className="subPart">
                        <h3>Mobile :</h3>
                        <p>{data?.Mobile}</p>
                      </div>

                      <div className="subPart">
                        <h3>Industry :</h3>
                        <p>{data?.Industry}</p>
                      </div>

                      <div className="subPart">
                        <h3>Annual Revenue :</h3>
                        <p>${data?.AnnualRevenue}</p>
                      </div>

                      <div className="subPart">
                        <h3>Annual Revenue :</h3>
                        <p>${data?.AnnualRevenue}</p>
                      </div>

                      <div className="subPart">
                        <h3>Annual Revenue :</h3>
                        <p>${data?.AnnualRevenue}</p>
                      </div>
                    </div>

                    {/* right side  */}
                    <div className="lleaiFOlEFT">
                      <div className="subPart">
                        <h3>Company :</h3>
                        <p>{data?.Company}</p>
                      </div>

                      <div className="subPart">
                        <h3>Lead Name :</h3>
                        <p>
                          {data?.FirstName} {data?.LastName}
                        </p>
                      </div>

                      <div className="subPart">
                        <h3>Email :</h3>
                        <p>{data?.Email}</p>
                      </div>

                      <div className="subPart">
                        <h3>Fax :</h3>
                        <p>{data?.Fax}</p>
                      </div>
                      <div className="subPart">
                        <h3>No. of Employees :</h3>
                        <p>{data?.NoOfEmployee}</p>
                      </div>
                      <div className="subPart">
                        <h3>Lead Status :</h3>
                        <p>{data?.LeadStatus}</p>
                      </div>
                      <div className="subPart">
                        <h3>Lead Status :</h3>
                        <p>{data?.LeadStatus}</p>
                      </div>
                      <div className="subPart">
                        <h3>Lead Status :</h3>
                        <p>{data?.LeadStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* second part  */}
                <div className="leadFirs">
                  <h2 className="ehading">Address Information</h2>

                  <div className="eladinfoWrap">
                    {/* left side  */}
                    <div className="lleaiFOlEFT">
                      <div className="subPart">
                        <h3>Street :</h3>
                        <p>{data?.Street}</p>
                      </div>

                      <div className="subPart">
                        <h3>State</h3>
                        <p>{data?.State}</p>
                      </div>

                      <div className="subPart">
                        <h3>Country :</h3>
                        <p>{data?.Country}</p>
                      </div>
                    </div>

                    {/* right side  */}
                    <div className="lleaiFOlEFT">
                      <div className="subPart">
                        <h3>city :</h3>
                        <p>{data?.City}</p>
                      </div>

                      <div className="subPart">
                        <h3>zip code :</h3>
                        <p>{data?.ZipCode}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* third  */}
                <div className="leadFirs">
                  <h2 className="ehading">Description Information</h2>

                  <div className="eladinfoWrap secondWRap">
                    <p>
                      Description: <span>{data?.DescriptionInfo}</span>
                    </p>
                  </div>
                </div>

                {/* second  third  */}
                <div className="leadFirs">
                  <div className="LEADSsTunav">
                    <h2 className="ehading">Lead Status</h2>

                    <select
                      onChange={(e) => {
                        setLeadStatus(e.target.value);
                        updatingLeadStatus(e.target.value);
                      }}
                      value={LeadStatus}
                      className="leadUPdateStsus"
                      name="LeadStatus"
                      id=""
                    >
                      <option> Status</option>
                      <option value="Cold">Cold</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Hot">Hot</option>
                      <option value="Warm">Warm</option>
                    </select>
                  </div>

                  <div
                    className={` ${
                      notOpenEdit ||
                      data?.Note === undefined ||
                      data?.Note === ""
                        ? "doColumn"
                        : "fornotewrap"
                    }  `}
                  >
                    <div className="eladinfoWrap secondWRap">
                      {LeadStatus ? (
                        <span className="ladingstausw">{LeadStatus}</span>
                      ) : (
                        <span className="noRecord">No records found</span>
                      )}
                    </div>

                    {/* this is for cold  */}

                    {noting.isCold && (
                      <>
                        {LeadStatus === "Cold" &&
                        data?.ColdNote !== "" &&
                        !notOpenEdit ? (
                          <div className="notePresent">
                            <p>
                              {new Date(data?.NoteDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                            <div className="reatlnotecont">
                              <span className="realNote">
                                {data?.ColdNote}{" "}
                              </span>
                            </div>
                            <div className="eidtdel">
                              <img
                                onClick={() => {
                                  setnotOpenEdit(true);
                                  setNote(data?.ColdNote);
                                }}
                                src={leadEdit}
                                alt=""
                              />
                              <img
                                onClick={() => {
                                  setNote("");
                                  updatingNote(true);
                                  setnotOpenEdit(false);
                                }}
                                src={leadDel}
                                alt=""
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <label className="noteLabel">
                              <p>Note:</p>
                              <input
                                value={Note}
                                onChange={(e) => {
                                  setNote(e.target.value);
                                }}
                                type="text"
                              />
                            </label>

                            <div className="noteSaveBtn">
                              <button
                                onClick={() => {
                                  updatingNote();
                                  setnotOpenEdit(false);
                                }}
                              >
                                <span>Save</span>
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* this is for warm  */}

                    {noting.isWarm && (
                      <>
                        {LeadStatus === "Warm" &&
                        data?.WarmNote !== "" &&
                        !notOpenEdit ? (
                          <div className="notePresent">
                            <p>
                              {new Date(data?.NoteDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                            <div className="reatlnotecont">
                              <span className="realNote">
                                {data?.WarmNote}{" "}
                              </span>
                            </div>
                            <div className="eidtdel">
                              <img
                                onClick={() => {
                                  setnotOpenEdit(true);
                                  setNote(data?.WarmNote);
                                }}
                                src={leadEdit}
                                alt=""
                              />
                              <img
                                onClick={() => {
                                  setNote("");
                                  updatingNote(true);
                                  setnotOpenEdit(false);
                                }}
                                src={leadDel}
                                alt=""
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <label className="noteLabel">
                              <p>Note:</p>
                              <input
                                value={Note}
                                onChange={(e) => {
                                  setNote(e.target.value);
                                }}
                                type="text"
                              />
                            </label>

                            <div className="noteSaveBtn">
                              <button
                                onClick={() => {
                                  updatingNote();
                                  setnotOpenEdit(false);
                                }}
                              >
                                <span>Save</span>
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* this is for Hoot  */}

                    {noting.isHot && (
                      <>
                        {LeadStatus === "Hot" &&
                        data?.HotNote !== "" &&
                        !notOpenEdit ? (
                          <div className="notePresent">
                            <p>
                              {new Date(data?.NoteDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                            <div className="reatlnotecont">
                              <span className="realNote">{data?.HotNote} </span>
                            </div>
                            <div className="eidtdel">
                              <img
                                onClick={() => {
                                  setnotOpenEdit(true);
                                  setNote(data?.HotNote);
                                }}
                                src={leadEdit}
                                alt=""
                              />
                              <img
                                onClick={() => {
                                  setNote("");
                                  updatingNote(true);
                                  setnotOpenEdit(false);
                                }}
                                src={leadDel}
                                alt=""
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <label className="noteLabel">
                              <p>Note:</p>
                              <input
                                value={Note}
                                onChange={(e) => {
                                  setNote(e.target.value);
                                }}
                                type="text"
                              />
                            </label>

                            <div className="noteSaveBtn">
                              <button
                                onClick={() => {
                                  updatingNote();
                                  setnotOpenEdit(false);
                                }}
                              >
                                <span>Save</span>
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* this is for Foo=kkow  */}

                    {noting.isFollowUp && (
                      <>
                        {LeadStatus === "Follow-up" &&
                        data?.FollowNote !== "" &&
                        !notOpenEdit ? (
                          <div className="notePresent">
                            <p>
                              {new Date(data?.NoteDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                            <div className="reatlnotecont">
                              <span className="realNote">
                                {data?.FollowNote}{" "}
                              </span>
                            </div>
                            <div className="eidtdel">
                              <img
                                onClick={() => {
                                  setnotOpenEdit(true);
                                  setNote(data?.FollowNote);
                                }}
                                src={leadEdit}
                                alt=""
                              />
                              <img
                                onClick={() => {
                                  setNote("");
                                  updatingNote(true);
                                  setnotOpenEdit(false);
                                }}
                                src={leadDel}
                                alt=""
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <label className="noteLabel">
                              <p>Note:</p>
                              <input
                                value={Note}
                                onChange={(e) => {
                                  setNote(e.target.value);
                                }}
                                type="text"
                              />
                            </label>

                            <div className="noteSaveBtn">
                              <button
                                onClick={() => {
                                  updatingNote();
                                  setnotOpenEdit(false);
                                }}
                              >
                                <span>Save</span>
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* secoond third   third  */}
                <div className="leadFirs">
                  <div className="LEADSsTunav">
                    <h2 className="ehading">Open Activities</h2>

                    <div className="addNewCont">
                      <div
                        onClick={() => setOpenAdNew((prev) => !prev)}
                        className="addneEW"
                      >
                        <p>Add New</p>
                      </div>

                      {opnAdNew && (
                        <div className="opeAnew">
                          <p onClick={() => setOpenCreateTask(true)}>Task</p>
                          <hr />
                          <p onClick={() => setOpenCreateMeet(true)}>Meeting</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* third third  */}
                <div className="leadFirs">
                  <div className="LEADSsTunav">
                    <h2 className="ehading">Quotation</h2>

                    <button
                      onClick={() =>
                        navigate("/adminDash/createQuotation", {
                          state: { id },
                        })
                      }
                      className="createQquot"
                    >
                      <span>Create Quotation</span>
                    </button>
                  </div>

                  <hr />

                  {userQuotation?.length > 0 ? (
                    <div className="allQui">
                      {userQuotation?.map((item, index) => (
                        <div key={index} className="sakacont">
                          <div className="singlquot" key={index}>
                            <p className="invId">
                              Invoice ID: {item?.InvoiceNo}
                            </p>
                            <p className="inName"> {item?.ClientName}</p>
                            <p className="inName">{item?.Price}</p>
                            <p className="date">
                              {new Date(Number(item?.ts)).toLocaleDateString()}{" "}
                              :{" "}
                              {new Date(Number(item?.ts)).toLocaleTimeString()}
                            </p>
                          </div>

                          <div className="dj">
                            <img
                              onClick={() =>
                                navigate("/adminDash/editQuotation", {
                                  state: item,
                                })
                              }
                              className="cursor-pointer"
                              src={veci}
                              alt="veci"
                            />
                            <img
                              onClick={() => {
                                deleteProject(item?._id);
                              }}
                              className="dli cursor-pointer"
                              src={deli}
                              alt="deli"
                            />
                            <img
                              onClick={() =>
                                navigate("/invoicePage", { state: item })
                              }
                              className="dli cursor-pointer"
                              src={semi}
                              alt="semi"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="norecord">No records found</span>
                  )}
                </div>

                {/* fourth  */}
                <div className="leadFirs">
                  <div className="attachment">
                    <h2 className="ehading">Description Information</h2>
                    <div className="saya">
                      <p>Upload File</p>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 19V15H16L12 10L8 15H11V19H13Z"
                          fill="#0B56E4"
                        />
                        <path
                          d="M7 19H9V17H7C5.346 17 4 15.654 4 14C4 12.596 5.199 11.244 6.673 10.985L7.254 10.883L7.446 10.325C8.149 8.274 9.895 7 12 7C14.757 7 17 9.243 17 12V13H18C19.103 13 20 13.897 20 15C20 16.103 19.103 17 18 17H15V19H18C20.206 19 22 17.206 22 15C21.9985 14.1036 21.6966 13.2336 21.1427 12.5288C20.5888 11.8241 19.8147 11.3253 18.944 11.112C18.507 7.67 15.56 5 12 5C9.244 5 6.85 6.611 5.757 9.15C3.609 9.792 2 11.82 2 14C2 16.757 4.243 19 7 19Z"
                          fill="#0B56E4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="eladinfoWrap secondWRap lion">
                    <p className="toyotoyo">No Attachment</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {openCreateTask && (
        <div className="createTaskWrap">
          <div className="cretTaskCont">
            <nav>
              <p>Create Task</p>
              <img
                onClick={() => setOpenCreateTask(false)}
                className="cursor-pointer"
                src={cancel}
                alt=""
              />
            </nav>

            <form className="taskForm">
              <label>
                <p>Subject</p>
                <input
                  name="Subject"
                  value={taskData?.Subject}
                  onChange={taskHandler}
                  type="text"
                  placeholder="Subject"
                />
              </label>

              <div className="twoTask">
                <label>
                  <p>Priority</p>
                  <select
                    name="Priority"
                    value={taskData?.Priority}
                    onChange={taskHandler}
                    id=""
                  >
                    <option value="select one">Select One</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </label>

                <label>
                  <p>Status</p>
                  <select
                    name="Status"
                    value={taskData?.Status}
                    onChange={taskHandler}
                    id=""
                  >
                    <option value="select one">Select One</option>
                    <option value="Not Started">Not Started</option>
                    <option value="Started"> Started</option>
                  </select>
                </label>
              </div>

              <div className="twoTask">
                <label>
                  <p>Due Date</p>
                  <input
                    name="DueDate"
                    value={taskData?.DueDate}
                    onChange={taskHandler}
                    type="date"
                  />
                </label>

                <label>
                  <p>Related To</p>
                  <input
                    name="RelatedTo"
                    value={taskData?.RelatedTo}
                    onChange={taskHandler}
                    type="text"
                  />
                </label>
              </div>

              <label>
                <p>Contact Name</p>
                <input
                  name="ContactName"
                  value={taskData?.ContactName}
                  onChange={taskHandler}
                  type="text"
                />
              </label>

              <label>
                <p>Note</p>
                <input
                  name="Note"
                  value={taskData?.Note}
                  onChange={taskHandler}
                  type="text"
                />
              </label>

              <div className="btnstask">
                <button
                  onClick={data1 ? taskUpdateHandler : TaskSubmitHandler}
                  className="creattk"
                >
                  {data1 ? "Task Update " : " Task Create"}
                </button>
                <button
                  onClick={() => setOpenCreateTask(false)}
                  className="tkCnacel"
                >
                  Cancel
                </button>
              </div>
            </form>

            <hr />
          </div>
        </div>
      )}

      {openCreateMeet && (
        <div className="createTaskWrap">
          <div className="cretTaskCont2">
            <nav>
              <p>Create Meeting</p>
              <img
                onClick={() => setOpenCreateMeet(false)}
                className="cursor-pointer"
                src={cancel}
                alt=""
              />
            </nav>

            <form className="taskForm">
              <label>
                <p>Title</p>
                <input
                  value={meetData.title}
                  onChange={meetHandler}
                  name="title"
                  type="text"
                  placeholder="Title"
                />
              </label>

              <label>
                <p>Status</p>
                <input
                  type="text"
                  value={meetData.Status}
                  onChange={meetHandler}
                  name="Status"
                  placeholder="Online"
                />
              </label>

              <div className="twoTask">
                <label>
                  <p>Meeting Date From</p>
                  <input
                    value={meetData.meetDateFrom}
                    onChange={meetHandler}
                    name="meetDateFrom"
                    type="date"
                  />
                </label>

                <label>
                  <p>Meeting Date To</p>
                  <input
                    value={meetData.meetDateTo}
                    onChange={meetHandler}
                    name="meetDateTo"
                    type="date"
                  />
                </label>
              </div>

              <div className="twoTask">
                <label>
                  <p>Meeting Time From</p>
                  <input
                    value={meetData.meetTimeFrom}
                    onChange={meetHandler}
                    name="meetTimeFrom"
                    type="time"
                  />
                </label>

                <label>
                  <p>Meeting Time To</p>
                  <input
                    value={meetData.meetTimeTo}
                    onChange={meetHandler}
                    name="meetTimeTo"
                    type="time"
                  />
                </label>
              </div>

              <div className="twoTask">
                <label>
                  <p>Host </p>
                  <select
                    value={meetData.Host}
                    onChange={meetHandler}
                    name="Host"
                    id=""
                  >
                    <option value="Host">Host</option>
                    <option value="Host1">Host1</option>
                    <option value="Host2">Host2</option>
                  </select>
                </label>

                <label>
                  <p>Related To</p>
                  <input
                    value={meetData.RelatedTo}
                    onChange={meetHandler}
                    name="RelatedTo"
                    type="text"
                  />
                </label>
              </div>

              <div className="twoTask">
                <label>
                  <p>Participants</p>
                  <input
                    value={meetData.Participant}
                    onChange={meetHandler}
                    name="Participant"
                    type="text"
                  />
                </label>

                <span className="addnewTx"> Add new</span>
              </div>

              <label>
                <p>Note</p>
                <input
                  value={meetData.Note}
                  onChange={meetHandler}
                  name="Note"
                  type="text"
                />
              </label>

              <div className="btnstask">
                <button
                  onClick={data1 ? meetUpdateHandler : meetSubmitHandler}
                  className="creatmt"
                >
                  {data1 ? "Update meeting" : "Create Meeting"}
                </button>
                <button
                  onClick={() => setOpenCreateMeet(false)}
                  className="tkCnacel"
                >
                  Cancel
                </button>
              </div>
            </form>

            <hr />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportLead;
