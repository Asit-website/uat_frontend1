import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import plussing from "../../images/plussing.png";
import "./quote.css";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { CiCirclePlus } from "react-icons/ci";
import pluslogo from "../../images/8922789.png";
import logokushel from "../../images/kushel1.png";


const data = `<p><strong><span style="font-size: 24px;">Introduction<br><br><br></span></strong></p><p><strong><span style="font-size: 24px;"><br></span></strong></p><p><strong><span style="font-size: 24px;">Key Features</span></strong></p><p><strong><span style="font-size: 24px;"><br></span></strong></p><p><strong><span style="font-size: 24px;">1.&nbsp;. User Registration &amp; Profile</span></strong></p><p><br>
<span style="font-size: 14px;">●&nbsp; <strong>Sign-Up/Sign-In</strong>: Users can register and log in using social media (Google,
Facebook) or email.</span></p><p><span style="font-size: 14px;"><br>
<span style="font-size: 14px;">●<strong>&nbsp;User Profiles:</strong> Ability to create and manage personal profiles, set fitness goals,
and track progress</span></span></p>`;

const data2 = `<p><strong style="font-family: Tahoma, Geneva, sans-serif; font-size: 24px;"><span style="font-family: Verdana, Geneva, sans-serif; font-size: 16px;">Additional Consideration</span></strong></p><p><strong style="font-family: Tahoma, Geneva, sans-serif;"><span style="font-family: Verdana, Geneva, sans-serif; font-size: 16px;"><br></span></strong></p><p><span style="font-family: Verdana, Geneva, sans-serif;"><strong style="font-family: Tahoma, Geneva, sans-serif;"><span style="font-size: 16px;">1. Third-Party API Costs: </span></strong><span style="font-size: 16px;">Any additional API costs for video services, payment
gateways, or others would be charged separately.</span></span></p><p><span style="font-family: Tahoma, Geneva, sans-serif;"><span style="font-family: Verdana, Geneva, sans-serif; font-size: 16px;"><br></span></span></p><p><span style="font-family: Verdana, Geneva, sans-serif;"><strong style="font-family: Tahoma, Geneva, sans-serif;"><span style="font-size: 16px;">2. Maintenance: </span></strong><span style="font-size: 16px;">Ongoing support and maintenance would be charged at a monthly
retainer or hourly rate post-launch</span><strong style="font-family: Tahoma, Geneva, sans-serif;"><span style="font-size: 16px;">.</span></strong></span></p><p><strong style="font-family: Tahoma, Geneva, sans-serif;"><span style="font-family: Verdana, Geneva, sans-serif; font-size: 16px;"><br></span></strong></p><p><span style="font-family: Verdana, Geneva, sans-serif;"><strong style="font-family: Tahoma, Geneva, sans-serif;"><span style="font-size: 16px;">
3. Content Creation: </span></strong><span style="font-size: 16px;">The client will be responsible for providing content such as
workout videos, tutorials, and articles unless otherwise specified</span><strong style="font-family: Tahoma, Geneva, sans-serif;"><span style="font-size: 16px;">.</span></strong></span></p><p><strong style="font-family: Tahoma, Geneva, sans-serif;"><span style="font-family: Verdana, Geneva, sans-serif; font-size: 16px;"><br></span></strong></p><p><span style="font-size: 24px;"><br><span style="font-family: Verdana, Geneva, sans-serif;"><strong style="font-family: Tahoma, Geneva, sans-serif;">Payment Schedule&nbsp;</strong></span></span></p><p><span style="font-family: Verdana, Geneva, sans-serif;"><strong style="font-family: Tahoma, Geneva, sans-serif;"><span style="font-size: 16px;"><br>1. </span></strong><span style="font-size: 16px;">Advance Payment of 25% upon order confirmation.</span><strong style="font-family: Tahoma, Geneva, sans-serif;"><span style="font-size: 16px;">
<br>2. </span></strong><span style="font-size: 16px;">25% After Figma finalization.</span><strong style="font-family: Tahoma, Geneva, sans-serif;"><span style="font-size: 16px;">
<br>3. </span></strong><span style="font-size: 16px;">25% After Frontend Development.</span><strong style="font-family: Tahoma, Geneva, sans-serif;"><span style="font-size: 16px;">
<br>4. </span></strong><span style="font-size: 16px;">25% after final delivery.</span></span></p><p><span style="font-family: Verdana, Geneva, sans-serif;"><span style="font-size: 16px;"><br></span></span></p><p><span style="font-family: Verdana, Geneva, sans-serif;"><span style="font-size: 16px;"><br></span></span></p><p><span style="font-family: Verdana, Geneva, sans-serif;"><span style="font-size: 16px;"><strong style="font-size: 24px;">Requirements</strong></span></span></p><p><span style="font-family: Verdana, Geneva, sans-serif;"><span style="font-size: 16px;">
<br>List of requirements for start working on the website-<br><br>
● Relevant contents &amp; images
<br>● Functional Requirements: User registration, fitness/nutrition plans, live
coaching, community features, e-commerce, subscription models.
<br>● Technical Requirements: Tech stack preferences, hosting, mobile
compatibility, third-party integrations (payments, video)
<br>● E-commerce: Product list, pricing structure, payment gateways, currencies.</span></span></p>`;

const QuotationForm = ({ setAlert, pop, setPop }) => {
  const {
    user,
    uploadSingleImage,
    postQuotationFormApi,
    updateQuotationFormApi,
  } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Quotation',
  });

  const location = useLocation();

  const { id, item } = location.state;

  const [formdata, setFormdata] = useState({
    quotationNum: "",
    customerName: "",
    customerReq: "",
    mobileNum: "",
    quotationDate: "",
    validUntil: "",
    customerId: "",
    companyName: "",
    companyAddress: "",
    companyGSTIN: "",
    companyWebsite: "",
  });

  const textChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editor = useRef(null);
  const editor2 = useRef(null);

  const navigate = useNavigate();

  const [content, setContent] = useState(data);

  const [content2, setContent2] = useState(data2);

  const { role } = hrms_user;

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const [preview, setPreview] = useState(false);

  const [logoImage, setLogoImage] = useState("");
  const [buislogoname, setBuisLogName] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formdata2 = new FormData();
      formdata2.append("Image", file);
      setBuisLogName(file);

      const ans = await uploadSingleImage(formdata2);
      if (ans?.status) {
        sessionStorage.setItem("quotationLogoLink", ans?.link);
        toast.success("Successfuly uploaded");
        setLogoImage(ans?.link);
      } else {
        toast.error("Something went wrong , please try again");
      }
    }
  };

  const [rows, setRows] = useState([
    { description: "", price: "", total: "" },
  ]);


  const [rows2, setRows2] = useState([{ description: "", stack: "" }]);
  const [rows3, setRows3] = useState([{ description: "" }]);

  const addRow = () => {
    setRows([...rows, { description: "", price: "", total: "" }]);
  };

  const addRow2 = () => {
    setRows2([...rows2, { description: "", stack: "" }]);
  };
  const addRow3 = () => {
    setRows3([...rows3, { description: "" }]);
  };

  const postQuotationForm = async () => {
    const toastId = toast.loading("Loading...");

    const {customerName , customerReq , quotationDate} = formdata;

    const ans = await postQuotationFormApi({
      customerName , 
      customerReq , 
      quotationDate ,
      costhead: rows,
      userId: hrms_user?._id,
      leadId: id,
      introduction : content,
      additional: content2 , 
      technology:rows2 , 
      timeline: rows3

    });

    if (ans?.status) {
      toast.success("Successfuly created");
      setFormdata({
        quotationNum: "",
        customerName: "",
        customerReq: "",
        mobileNum: "",
        quotationDate: "",
        validUntil: "",
        customerId: "",
        companyName: "",
        companyAddress: "",
        companyGSTIN: "",
        companyWebsite: "",
      });

      sessionStorage.removeItem("quotationLogoLink");

      setRows([]);
      setContent(data);
    }
    toast.dismiss(toastId);
  };

  const updateQuotationForm = async () => {
    const toastId = toast.loading("Loading...");

    const {customerName , customerReq , quotationDate} = formdata;

    const ans = await updateQuotationFormApi({
      // ...formdata,
      // items: rows,
      // userId: hrms_user?._id,
      // leadId: id,
      // content,
      // id: item?._id,
      customerName , 
      customerReq , 
      quotationDate ,
      costhead: rows,
      userId: hrms_user?._id,
      introduction : content,
      additional: content2 , 
      technology:rows2 , 
      timeline: rows3 , 
      id: item?._id
    });

    if (ans?.status) {
      toast.success("Successfuly updated");
      setFormdata({
        quotationNum: "",
        customerName: "",
        customerReq: "",
        mobileNum: "",
        quotationDate: "",
        validUntil: "",
        customerId: "",
        companyName: "",
        companyAddress: "",
        companyGSTIN: "",
        companyWebsite: "",
      });

      setRows([]);
      setContent(data);
      sessionStorage.removeItem("quotationLogoLink");
    }
    toast.dismiss(toastId);
  };

  useEffect(() => {
    const quotationLogoLink = sessionStorage.getItem("quotationLogoLink");
    if (quotationLogoLink) {
      setLogoImage(quotationLogoLink);
    }
  }, []);

  useEffect(() => {
    if (item) {
      
      const {
        // quotationNum,
        // mobileNum,
        // validUntil,
        // customerId,
        // companyName,
        // companyAddress,
        // companyGSTIN,
        // companyWebsite,
        customerName,
        customerReq,
        quotationDate,
        costhead,
        additional ,
        introduction , 
        timeline,
        technology
      } = item;
      setRows(costhead);
      setRows2(technology)
      setRows3(timeline)
      setContent(introduction)
      setContent2(additional)
      setFormdata({
        customerName,
        customerReq,
        quotationDate
      });
    }
  }, [item]);

  const contonentPDF = useRef();



  const generatePdf = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Quotation",
    parentContainer: {
      "@media print": {
        display: "block",
      },
    },
    onAfterPrint: () => alert("success", "item saved"),
  });

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
            <div className="qutaWrap">
              <div className="qutaLeft">
                <div className="qutLTo">
                  {/* <h2>Quotation Form</h2> */}

                  <div className="qutolobutons">
                    <button onClick={() => setPreview(true)}>Preview</button>
                    <button
                      onClick={() => {
                        if (item) {
                          updateQuotationForm();
                        } else {
                          postQuotationForm();
                        }
                      }}
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        navigate(-1);
                      }}
                      className="cnebuqo"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="allwhitebg">
                  <form className="qtoform">
                    {/* <label>
                      <p>Quotation No*</p>
                      <input
                        value={formdata.quotationNum}
                        name="quotationNum"
                        onChange={textChangeHandler}
                        type="text"
                        placeholder="#01"
                      />
                    </label> */}

                    <label>
                      <p>Customer Name*</p>
                      <input
                        value={formdata.customerName}
                        name="customerName"
                        onChange={textChangeHandler}
                        type="text"
                        placeholder="Akash Negi"
                      />
                    </label>

                    <label>
                      <p>Customer Requirement</p>
                      <input
                        type="text"
                        value={formdata.customerReq}
                        name="customerReq"
                        onChange={textChangeHandler}
                        placeholder="Mobile App - diet care app"
                      />
                    </label>

                    {/* <label>
                      <p>Mobile Number*</p>
                      <input
                        value={formdata.mobileNum}
                        name="mobileNum"
                        onChange={textChangeHandler}
                        type="text"
                        placeholder="+918595046368"
                      />
                    </label> */}

                    <label>
                      <p>Quotation Date*</p>
                      <input
                        value={formdata.quotationDate}
                        name="quotationDate"
                        onChange={textChangeHandler}
                        type="date"
                      />
                    </label>
{/* 
                    <label>
                      <p>Valid Until*</p>
                      <input
                        value={formdata.validUntil}
                        name="validUntil"
                        onChange={textChangeHandler}
                        type="date"
                      />
                    </label> */}

                    {/* <label>
                      <p>Customer ID*</p>
                      <input
                        value={formdata.customerId}
                        name="customerId"
                        onChange={textChangeHandler}
                        type="text"
                      />
                    </label> */}
                  </form>

                  {/* <div
                    className="adddbunelogo cursor-pointer"
                    onClick={handleImageClick}
                  >
                    <img src={pluslogo} width={50} alt="" />
                    <p>
                      {" "}
                      {buislogoname
                        ? buislogoname?.name
                        : "Add Business Logo"}{" "}
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div> */}

                  <div className="docuThird">
                    <h3>Introduction And Key Features </h3>

                    <hr />

                    <JoditEditor
                      ref={editor}
                      value={content}
                      tabIndex={1}
                      onBlur={(newContent) => setContent(newContent)}
                      onChange={(newContent) => {
                        setContent(newContent);
                      }}
                    />
                  </div>

                  <div class="techstackwrap ">
                    <h2>Techonology Stack</h2>

                    <div className="allrows2wrao">
                      {rows2.map((row, index) => (
                        <div
                          className="bg-white tabletr makeitflexri"
                          key={index}
                        >
                          <div className=" givfulwidt">
                            <input
                              type="text"
                              placeholder="Stack"
                              value={row.stack}
                              onChange={(e) => {
                                const newRows = [...rows2];
                                newRows[index].stack = e.target.value;
                                setRows2(newRows);
                              }}
                            />
                          </div>

                          <div className="givfulwidt2">
                            <input
                              type="text"
                              className="inpu11"
                              placeholder="Description"
                              value={row.description}
                              onChange={(e) => {
                                const newRows = [...rows2];
                                newRows[index].description = e.target.value;
                                setRows2(newRows);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div onClick={addRow2} className="admorCont cursor-pointer">
                    <img src={plussing} alt="" />
                    <span>Add Techonology</span>
                  </div>

                  {/* FOR TIMELINE  */}
                  <div class="techstackwrap ">
                    <h2>Timeline</h2>

                    <div className="allrows2wrao">
                      {rows3.map((row, index) => (
                        <div
                          className="bg-white tabletr makeitflexri"
                          key={index}
                        >
                          <div className="givfulwidt2">
                            <input
                              type="text"
                              className="inpu11"
                              placeholder="Requirements gathering and design (3-5 weeks)"
                              value={row.description}
                              onChange={(e) => {
                                const newRows = [...rows3];
                                newRows[index].description = e.target.value;
                                setRows3(newRows);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div onClick={addRow3} className="admorCont cursor-pointer">
                    <img src={plussing} alt="" />
                    <span>Add Timeline</span>
                  </div>

                  {/* COST ESTIMATAE */}
                  <div class="relative costestimate ">
                    <h2>Cost Estimate</h2>
                    <table className="quotablle text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="theadqu">
                        <tr>
                          <th scope="col" className="px-2 py-3">
                            Cost Head
                          </th>
                          <th scope="col" className="px-2 py-3">
                            Nature of Charge
                          </th>
                          <th scope="col" className="px-2 py-3">
                            Amount (in inr)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr className="bg-white tabletr" key={index}>
                            <td className="px-2 py-4">
                              <input
                                type="text"
                                className="inpu11"
                                value={row.description}
                                onChange={(e) => {
                                  const newRows = [...rows];
                                  newRows[index].description = e.target.value;
                                  setRows(newRows);
                                }}
                              />
                            </td>
                            <td className="px-2 py-4">
                              <input
                                type="text"
                                value={row.price}
                                onChange={(e) => {
                                  const newRows = [...rows];
                                  newRows[index].price = e.target.value;
                                  setRows(newRows);
                                }}
                              />
                            </td>
                            <td className="px-2 py-4">
                              <input
                                type="number"
                                value={row.total}
                                onChange={(e) => {
                                  const newRows = [...rows];
                                  newRows[index].total = e.target.value;
                                  setRows(newRows);
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div onClick={addRow} className="admorCont cursor-pointer">
                    <img src={plussing} alt="" />
                    <span>Add Cost Estimate</span>
                  </div>

                  {/* <div className="comapnydetail">
                    <h3 className="comdetail">Company Details</h3>

                    <form className="qtoform">
                      <label>
                        <p>Company Name*</p>
                        <input
                          value={formdata.companyName}
                          name="companyName"
                          onChange={textChangeHandler}
                          type="text"
                          placeholder=""
                        />
                      </label>

                      <label>
                        <p>Company Address*</p>
                        <input
                          value={formdata.companyAddress}
                          name="companyAddress"
                          onChange={textChangeHandler}
                          type="text"
                          placeholder=""
                        />
                      </label>

                      <label>
                        <p>Company GSTIN*</p>
                        <input
                          value={formdata.companyGSTIN}
                          name="companyGSTIN"
                          onChange={textChangeHandler}
                          type="text"
                        />
                      </label>

                      <label>
                        <p>Company Website*</p>
                        <input
                          value={formdata.companyWebsite}
                          name="companyWebsite"
                          onChange={textChangeHandler}
                          type="text"
                        />
                      </label>
                    </form>
                  </div> */}

                  {/* Addition consideration  */}
                  <div className="docuThird">
                    <h3>
                      Addition Consideration / Payment Schedule / Requirements{" "}
                    </h3>

                    <hr />

                    <JoditEditor
                      ref={editor2}
                      value={content2}
                      tabIndex={1}
                      onBlur={(newContent) => setContent2(newContent)}
                      onChange={(newContent) => {
                        setContent2(newContent);
                      }}
                    />
                  </div>
                </div>
              </div>

              {preview && (
                <div className="previwwraps">
                  <div className="qutaRight">
                    <div ref={printRef} className="qutaRightcont">

                    <div className="quota_header">
                      <img className="logokushelquot" src={logokushel} alt="" />
                      </div>


                 <div className="quot_contentt">


                      <p className="proprsaltitle">
                       {formdata.customerReq}
                      </p>

                      <div className="preparequtotion">
                        <div className="presec">
                          <p>Prepared For</p>
                          <p> {formdata.customerName} </p>
                        </div>
                        <div className="presec">
                          <p>Created by: </p>
                          <p>Shubham Gupta</p>
                        </div>
                        <div className="presec">
                          <p>Date: {formdata.quotationDate} </p>
                        </div>
                        <div className="presec">
                          <p>Kushel Digi Solutions </p>
                          <span>shubham@kusheldigi.com</span>
                          <span>www.kusheldigi.com</span>
                          <p>+91 9045301702</p>
                        </div>
                      </div>

<br />
<br />

                      <div className="userApp">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                      </div>

                      <div className="techsstack">
                        <h2>Technology Stack</h2>
                        <div className="allstack">
                          {rows2?.map((tech, index) => (
                            <div key={index} className="snglstack">
                              <p>• {tech.stack} : </p>
                              <span>{tech.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="techsstack">
                        <h2>Timeline</h2>
                        <div className="allstack">
                          {rows3?.map((tech, index) => (
                            <div key={index} className="snglstack">
                              <p>• Phase{index+1} : </p>
                              <span>{tech.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="talbeLike">
                        <div class="relative w-full">
                          <table className="quotablle2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="theadqu2">
                              <tr>
                                <th scope="col" className="px-2 py-3">
                                  Cost Head
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Nature of Charge
                                </th>
                                <th scope="col" className="px-2 py-3">
                                  Amount(in INR)
                                </th>
                               
                              </tr>
                            </thead>
                            <tbody>
                              {rows.map((row, index) => (
                                <tr className="bg-white tabletr2" key={index}>
                                  <td className="px-2 py-4"> {row.description}</td>
                                  <td className="px-2 py-4">{row.price}</td>
                                  <td className="px-2 py-4">{row.total}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="userAppdds">
                        <div dangerouslySetInnerHTML={{ __html: content2 }} />
                      </div>

                      <hr />

            
                      <div className="procesforwar">
                        <h2>Process Forward</h2>
                        <ul>
                          <li>• Finalization of terms of development</li>
                          <li>• Project Agreement for Digital Signature</li>
                          <li>• Advance Payment</li>
                          <li>• Commencement of Development Process</li>
                          <li>• Milestone Update </li>
                        </ul>
                      </div>

                      <br />

                      <p className="wehoemesg">
                      
                        We hope this will be helpful to understand our process
                        and our plan for your Address: G-9, First Floor, Sector
                        63, Noida, 201301 Phone: +91 9045301702 | Email:
                        info@kusheldigi.com | Website: www.kusheldigi.com
                        website. We intend to build a creative, thoughtful, and
                        modern App thatyour customers will love to use and
                        increase your brand value, credibility, andsales. We
                        look forward to providing you with a smooth development
                        process and constant support.
                      </p>

<br />
                      <div className="thaksmessge">
                        <h4>Thanks & Regards</h4>

                        <div className="frommesage">
                          <h4>Shubham Gupta</h4>
                          <p>CEO</p>
                          <p>Kushel Digi Solutions </p>
                          <p>G-9 First Floor, Sector 63, Noida, India </p>
                          <p>
                            Email: <span>shubham@kusheldigi.com</span>
                          </p>
                          <p>Phone: +91 9045301702</p>
                        </div>
                      </div>

<br /><br /><br />

                    


                  </div>

                  <footer className="qoformfooter">
                        <p>Address: First Floor, D242, F-32B, Sector 63 Rd, Noida, Uttar Pradesh 201301</p>
                        <p>Phone: +91 9045301702 | Email: <span>info@kusheldigi.com</span> | Website: <span>www.kusheldigi.com</span></p>
                      </footer>


                    </div>

                    <hr />

                    <div className="prntBtn">
                      <button
                        onClick={() => setPreview(false)}
                        className="cnebuqo"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          generatePdf();
                        }}
                      >
                        <span>Print</span>
                      </button>

                      <style>
        {`
         
          @media print {

}
 
          
        `}
      </style>

                    </div>


                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuotationForm;
