import React, { useEffect, useRef, useState } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import leadProfile from "../../images/leadProfile.png";
import bx from "../../images/bx-purchase-tag.png";
import "./lead.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import veci from "../../images/veci.svg";
import deli from "../../images/deli.svg";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import cancel from "../../images/cancell.png";
import { useLocation } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import useOnClickOutside from "../../../hooks/useOnClickOutside";



const ImportLead = ({ setAlert, pop, setPop }) => {
  const {
    user,
    getLead2,
    allEmployee,
    updateLeadStatus,
    CreateNoteApi,
    taskCreateApi,
    meetCreateApi,
    taskEditApi,
    meetEditApi,
    GetNoteApi,
    ShareLeadApi,
    DeleteNoteApi,
    updateNoteApi,
    FetchFollowApi,
    getLeadStat,
    getFollowUp,
    getUserByDesignation1,
    getQuotationApi,
    deleteQuotationapi,
    deleteQproapi,
    getSaveTempalte
  } = useMain();

  const { id } = useParams();

  const location = useLocation();

  const [shareOpen , setShareOpen] = useState(false);

  const [shareList, setShareList] = useState([]);
  const { type, data1 } = location.state || {};

  const [data, setData] = useState({});
  const [shareSrch , setShareSrch] = useState("");
  const [shareemp , setShareEmp] = useState([]);

  const [LeadStatus, setLeadStatus] = useState("");

  const handleCheckboxChange = (empId) => {
    setShareList((prevList) =>
      prevList.includes(empId)
        ? prevList.filter((id) => id !== empId) 
        : [...prevList, empId] 
    );
  };

  const [leadStat, setLeadStat] = useState([]);

  const [userDeg, setUserDeg] = useState([]);

  const [Note, setNote] = useState("");

  const proNavRef2 = useRef(null);
  useOnClickOutside(proNavRef2, () => setShareOpen(false));

  const navigate = useNavigate();

  const [allFollowUp, setAllFollowUp] = useState([]);

  const [allEmple , setAllEmple] = useState([]);

  const fetchAllEmp = async()=>{
     const ans = await allEmployee();
     setAllEmple(ans?.emp);
     setShareEmp(ans?.emp);
  }

  useEffect(()=>{
    fetchAllEmp();
  },[])

  const fetchFollowUp = async () => {
    const ans = await FetchFollowApi(id);
    if (ans?.status) {
      setAllFollowUp(ans?.data);
    }
  };

  useEffect(()=>{

    if(shareSrch === ""){
     setShareEmp([...allEmple]);
    }
    else{
     const data = allEmple.filter((emp)=> emp?.fullName?.toLowerCase()?.includes(shareSrch.toLowerCase()));
     setShareEmp(data);

    }
   
 },[shareSrch])

  const fetchUserDesignation = async () => {
    const ans = await getUserByDesignation1();
    setUserDeg(ans?.data);
  };

  useEffect(() => {
    fetchUserDesignation();
  }, []);

  const fetchLeadStat = async () => {
    const ans = await getLeadStat();
    setLeadStat(ans?.data);
  };

  useEffect(() => {
    fetchLeadStat();
  }, []);

  const getData = async () => {
    let ans = await getLead2(id, "", "", "");
    setData(ans.data[0]);
    const leadOwnerIds = ans?.data[0]?.LeadOwner.map(owner => owner._id);
    setShareList(leadOwnerIds);
  };

  const [allFollow2, setAllFollow2] = useState([]);

  const getFollow = async () => {
    const ans = await getFollowUp();
    if (ans?.success) {
      setAllFollow2(ans?.data);
    }
  };

  useEffect(() => {
    getFollow();
  }, []);

  const updatingLeadStatus = async (leading) => {
    const { _id } = data;
    const ans = await updateLeadStatus(_id, leading);
  };

  const [isNoteEdit, setIsNoteEdit] = useState(false);
  const [allNote, setAllNote] = useState([]);

  const getNotes = async () => {
    const ans = await GetNoteApi(id);
    if (ans?.status) {
      setAllNote(ans?.data);
    }
  };

  const createNote = async () => {
    const ans = await CreateNoteApi(id, Note, LeadStatus);
    if (ans?.status) {
      toast.success("Successfuly created");
      getNotes();
      setNote("");
      setLeadStatus("Status");
    }
  };

  const updatingNote = async () => {
    const ans = await updateNoteApi(isNoteEdit, Note, LeadStatus);
    if (ans?.status) {
      toast.success("Successfuly created");
      getNotes();
      setNote("");
      setIsNoteEdit(false);
      setLeadStatus("Status");
    }
  };

  const deleteNote = async (id) => {
    const ans = await DeleteNoteApi(id);
    if (ans?.status) {
      toast.success("delleted ");
      getNotes();
    }
  };

  
   const shareleads = async()=>{
    const toastId = toast.loading("Loading...");
     const resp = await ShareLeadApi(id , shareList);
      toast.success("Successfuly shared");
      toast.dismiss(toastId);
      getData();
    }

  const [openCreateTask, setOpenCreateTask] = useState(false);
  const [openCreateMeet, setOpenCreateMeet] = useState(false);
  const [opnAdNew, setOpenAdNew] = useState(false);

  const [taskData, setTaskData] = useState({
    LeadName: `${data?.FirstName || ""} ${data?.LastName || ""}`,
    FollowUpType: "",
    Date: "",
    Time: "",
    Remark: "",
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
    MeetingLink: "",
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
        LeadName: `${data?.FirstName || ""} ${data?.LastName || ""}`,
        FollowUpType: "",
        Status: "",
        Date: "",
        Time: "",
        Remark: "",
        LeadId: id,
        userId: data?.LeadOwner?._id,
      });
      fetchFollowUp();
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
        LeadName: `${data?.FirstName || ""} ${data?.LastName || ""}`,
        FollowUpType: "",
        Status: "",
        Date: "",
        Time: "",
        Remark: "",
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
        MeetingLink: "",
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

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const intHours = parseInt(hours, 10);
    const amPm = intHours >= 12 ? "PM" : "AM";
    const adjustedHours = intHours % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${adjustedHours}:${minutes} ${amPm}`;
  };

  const [allQuota, setAllQuota] = useState([]);
  const [allPropo, setAllPropo] = useState([]);

  const [openDrops , setOpenDrops] = useState(null);

  const proNavRef = useRef(null);
  useOnClickOutside(proNavRef, () => setOpenDrops(null));

  const [saveTemplate , setSaveTemplate ] = useState([]);

   const fetchSaveTemplates = async()=>{
     try{

      const ans = await getSaveTempalte(id);
      console.log("savetemplate ",ans);
       if(ans?.status){
         setSaveTemplate(ans?.data);
       }

     }catch(error){
      toast.error("Something went wrong , Please try again");
     }
   }

  const getQuotationOfLead = async () => {
    const ans = await getQuotationApi(id);
    setAllQuota(ans?.quotations);
    setAllPropo(ans?.proposals);
  };

  const deleteQuotationApi = async (id) => {
    const toastId = toast.loading("Loading...");
    const ans = await deleteQuotationapi(id);
    if (ans?.status) {
      getQuotationOfLead();
      fetchSaveTemplates();
      toast.success("Successfuly deleted");
    } else {
      toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
  };

  const deletePropsalApi = async (id) => {
    const toastId = toast.loading("Loading...");
    const ans = await deleteQproapi(id);
    if (ans?.status) {
      getQuotationOfLead();
      toast.success("Successfuly deleted");
    } else {
      toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
  };

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

  useEffect(() => {
    setTaskData((prev) => ({
      ...prev,
      LeadName: `${data?.FirstName || ""} ${data?.LastName || ""}`,
    }));
  }, [data]);

  useEffect(() => {
    const size = allNote.length;
    if (size) {
      let lastNote = allNote[size - 1];
      const { Status } = lastNote;
      setLeadStatus(Status);
    }
  }, [allNote]);

  useEffect(() => {
    getData();
    getNotes();
    fetchFollowUp();
    getQuotationOfLead();
    fetchSaveTemplates();
  }, []);

  return (
    <div className="imprtleadCont">
      <div className="employee-dash h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />

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
                  <h2>
                    {data?.FirstName} {data?.LastName}
                  </h2>
                  <p style={{ display: "flex" }}>
                    <img src={bx} /> <span> Add Tags</span>
                  </p>
                </div>
              </div>

              {/* right side  */}
              <div className="laedRight">

              <button className="refresh1 relative" >
      <span onClick={()=>setShareOpen((prev)=>!prev)} className="ref1">Share</span>
      {shareOpen && (
        <div ref={proNavRef2} className="shareopen">
           <div className="share_wraps">
           <div className="sendbtns">
             <input onChange={(e)=>setShareSrch(e.target.value)} value={shareSrch} type="text" placeholder="Search..." />
             <button  onClick={()=>shareleads()} >Send</button>
           </div>
          {shareemp?.map((emp, index) => (
            <div key={index} className="singluser">
              <input
                type="checkbox"
                checked={shareList.includes(emp?._id)}
                onChange={() => handleCheckboxChange(emp?._id)}
              />
              <span>{emp?.fullName}</span>
            </div>
          ))}
           </div>
        </div>
      )}
    </button>

                <button
                  onClick={() =>
                    navigate("/adminDash/editLead", { state: data })
                  }
                  className="refresh1"
                >
                  <span className="ref1">Edit</span>
                </button>
                
              </div>

            </section>

            {/* second sect */}

            {/* third secttion  */}
            <div className="leadWRAP">
              {/* first part  */}
              <div className="leadFirs">
                <h2 className="ehading">Lead Information</h2>

                <div className="eladinfoWrap">
                  {/* left side  */}
                  <div className="lleaiFOlEFT">
                  <div className="subPart">
                      <h3>Lead Owner :</h3>
                       <div className="leanwlonwers">
                       {
                        data?.LeadOwner?.map((own , index)=>(
                          <p className="makesonsmall" key={index}>{own?.fullName} , </p>
                        ))
                      }
                       </div>
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
                <h2 className="ehading">Descriptive Information</h2>

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

                  <hr />

                  <select
                    onChange={(e) => {
                      setLeadStatus(e.target.value);
                      updatingLeadStatus(e.target.value);
                    }}
                    value={LeadStatus}
                    className="leadUPdateStsus sewidfls"
                    name="LeadStatus"
                    id=""
                  >
                    <option> Status</option>
                    {leadStat?.map((val, index) => {
                      return (
                        <option key={index} value={val?.name}>
                          {val?.name}
                        </option>
                      );
                    })}
                  </select>

                  <label className="noteLabel">
                    <p>Note:</p>
                    <textarea
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
                        setNote("");
                        setIsNoteEdit(false);
                      }}
                      className="canccfdl"
                    >
                      Cancel
                    </button>

                    <button
                      className="noteSaveBtn2"
                      onClick={isNoteEdit ? updatingNote : createNote}
                    >
                      <span>{isNoteEdit ? "Update" : "Save"}</span>
                    </button>
                  </div>

                  <div className="allNotes">
                    {allNote?.map((note, index) => (
                      <div key={index} className="singlNoteDe">
                        <div className="line_danda"></div>

                        <div className="noteStaus">
                          <p>{note?.Status}</p>
                        </div>

                        <p className="notedate">
                          {new Date(note?.Date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>

                        <p className="noteTExt">{note?.Note}</p>

                        {/* <img onClick={()=>{
                                    setIsNoteEdit(note?._id);
                                  setNote(note?.Note);
                                  }} src={veci} alt="" /> */}
                        <img
                          onClick={() => {
                            deleteNote(note?._id);
                          }}
                          src={deli}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* secoond third   third  */}
              <div className="leadFirs">
                <div className="LEADSsTunav litu">
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
                        <p onClick={() => setOpenCreateTask(true)}>Follow Up</p>
                        <hr />
                        <p onClick={() => setOpenCreateMeet(true)}>Meeting</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="allFolowup">
                  <h2>My Next Follow Up : </h2>

                  {allFollowUp?.map((fol, index) => (
                    <div key={index} className="singFol">
                      <p className="notedate">
                        {new Date(fol?.Date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p>{fol?.time}</p>

                      <p>{fol?.Time && convertTo12HourFormat(fol.Time)}</p>

                      <p>{fol?.FollowUpType}</p>

                      <p>{fol?.Remark}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* quotation */}
              <div className="leadFirs">
                <div className="LEADSsTunav litu">
                  <h2 className="ehading">Quotation</h2>

                  <button
                    onClick={() =>
                      navigate("/adminDash/HRM/QuotationForm", {
                        state: { id },
                      })
                    }
                    className="createQquot"
                  >
                    <span>Create Quotation</span>
                  </button>
                </div>

                <hr />

                {allQuota?.length > 0 ? (
                  <div className="allQui">
                    {allQuota?.map((item, index) => (
                      <div key={index} className="sakacont">
                        <div className="singlquot" key={index}>
                          <p className="invId">
                            customer ID: {item?.customerId}
                          </p>
                          <p className="inName">{item?.customerName}</p>
                          <p className="date">
                            {new Date(item?.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                        </div>

                        <div className="dj">
                          <img
                          
                            onClick={() => {
                              navigate("/adminDash/HRM/QuotationForm", {
                                state: { item },
                              });
                            }}
                            className="cursor-pointer"
                            src={veci}
                            alt="veci"
                          />
                          <img
                            onClick={() => {
                              deleteQuotationApi(item?._id);
                            }}
                            className="dli cursor-pointer"
                            src={deli}
                            alt="deli"
                          />
                        
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="norecord">No records found</span>
                )}
              </div>

              {/* Quotation cards is here  */}

              <div className="leadFirs">
  <div className="LEADSsTunav litu">
    <h2 className="ehading">Recent Templates</h2>
  </div>

  <hr />
  <div className="allCards">
    {saveTemplate?.length > 0 ? (
      saveTemplate.map((item, index) => (
        <div   
       
         key={index} className="card ">
          <img src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1735558409/WhatsApp_Image_2024-12-30_at_17.02.43_160b7501_fg2z1u.jpg" alt={`Card ${item?.customerName}`} />
         
         
           <div className="thredotwrap">

          
          <div className="card-content">

            <h3 className="card-title">Name: {item?.customerName}</h3>
            <p className="card-meta">
              Quotation Date: {new Date(item?.createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>

          <BsThreeDotsVertical onClick={()=> {
            setOpenDrops(index);
          }} className="threedot_lead" />

          {
       openDrops === index && 
        <div className="dropswrap" ref={proNavRef} >
           <p    onClick={() => {
          navigate("/adminDash/HRM/QuotationForm", {
            state: { item },
          });
        }}><MdEdit className="lead_icon" />     <span>Edit</span>  </p>
           <p 
            onClick={()=>{
              deleteQuotationApi(item?._id);
            }}
           >  <MdDelete className="lead_icon" /> <span>Delete</span>  </p>
        </div>
          }

          </div>


        </div>
      ))
    ) : (
      <span className="norecord">No records found</span>
    )}
  </div>
</div>


              {/* fourth third  */}
              <div className="leadFirs">
                <div className="LEADSsTunav litu">
                  <h2 className="ehading">Proposal</h2>

                  <button
                    onClick={() =>
                      navigate("/adminDash/HRM/ProposalForm", {
                        state: { id },
                      })
                    }
                    className="createQquot"
                  >
                    <span>Create Proposal</span>
                  </button>
                </div>

                <hr />

                {allPropo?.length > 0 ? (
                  <div className="allQui">
                    {allPropo?.map((item, index) => (
                      <div key={index} className="sakacont">
                        <div className="singlquot" key={index}>
                          <p className="invId">
                            Proposal For: {item?.proposalFor}
                          </p>
                          <p className="invId">Created By: {item?.createdBy}</p>
                          <p className="date">
                            {new Date(item?.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                        </div>

                        <div className="dj">
                          <img
                            onClick={() => {
                              navigate("/adminDash/HRM/ProposalForm", {
                                state: { item },
                              });
                            }}
                            className="cursor-pointer"
                            src={veci}
                            alt="veci"
                          />
                          <img
                            onClick={() => {
                              deletePropsalApi(item?._id);
                            }}
                            className="dli cursor-pointer"
                            src={deli}
                            alt="deli"
                          />
                          {/* <img
                            onClick={() =>
                              navigate("/invoicePage", { state: item })
                            }
                            className="dli cursor-pointer"
                            src={semi}
                            alt="semi"
                          /> */}
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
          </div>
        </div>
      </div>

      {openCreateTask && (
        <div className="createTaskWrap">
          <div className="cretTaskCont">
            <nav>
              <p>Create Follow Up</p>
              <img
                onClick={() => setOpenCreateTask(false)}
                className="cursor-pointer"
                src={cancel}
                alt=""
              />
            </nav>

            <form className="taskForm">
              <label>
                <p>LeadName</p>
                <input
                  name="LeadName"
                  value={taskData?.LeadName}
                  onChange={taskHandler}
                  type="text"
                  placeholder="Subject"
                />
              </label>

              <label>
                <p>Follow-Up type</p>

                <select
                  name="FollowUpType"
                  value={taskData?.FollowUpType}
                  onChange={taskHandler}
                  id=""
                >
                  <option value="select one">Select One</option>

                  {allFollow2?.map((f, index) => (
                    <option key={index} value={f?.name}>
                      {f?.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="twoTask">
                <label>
                  <p>Date</p>
                  <input
                    name="Date"
                    value={taskData?.Date}
                    onChange={taskHandler}
                    type="date"
                  />
                </label>

                <label>
                  <p>Time</p>
                  <input
                    name="Time"
                    value={taskData?.Time}
                    onChange={taskHandler}
                    type="time"
                  />
                </label>
              </div>

              <label>
                <p>Remark</p>
                <input
                  name="Remark"
                  value={taskData?.Remark}
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
                    <option value="Host">Chose Host</option>
                    {userDeg?.map((val, index) => {
                      return (
                        <option key={index} value={val?._id}>
                          {val?.fullName}
                        </option>
                      );
                    })}
                    {/* <option value="Host1">Host1</option>
                    <option value="Host2">Host2</option> */}
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
              </div>

              <label>
                <p>Meeting Link</p>
                <input
                  value={meetData.MeetingLink}
                  onChange={meetHandler}
                  name="MeetingLink"
                  type="text"
                />
              </label>

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

}


export default ImportLead;
