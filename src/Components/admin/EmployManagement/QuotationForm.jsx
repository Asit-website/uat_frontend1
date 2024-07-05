import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "./HRMsystem.css";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import plussing from "../../images/plussing.png";
import inputfileds from "../../images/inputfield.png";
import cutting from "../../images/cutting.png";
import kdsquto from "../../images/KdsQuto.png";
import "./quote.css";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

const QuotationForm = ({ setAlert, pop, setPop }) => {
  const { user } = useMain();

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const editor = useRef(null);

  const [content, setContent] = useState("");

  const {
    role,
    hrmsSetupEditPermission,
    hrmsSetupDeletePermission,
    hrmsSetupCreatePermission,
  } = hrms_user;

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // You can also handle the selected file here, e.g., uploading it to a server
    }
  };
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
              {/* lefft side  */}

              <div className="qutaLeft">
                <div className="qutLTo">
                  <h2>Quotation Form</h2>
                  <button>
                    <span>Preview</span>
                  </button>
                </div>

                <div className="allwhitebg">
                  <form className="qtoform">
                    <label>
                      <p>Quotation No*</p>
                      <input type="text" placeholder="#01" />
                    </label>

                    <label>
                      <p>Customer Name*</p>
                      <input type="text" placeholder="Akash Negi" />
                    </label>

                    <label>
                      <p>Customer Requirement</p>
                      <input
                        type="text"
                        placeholder="Mobile App - diet care app"
                      />
                    </label>

                    <label>
                      <p>Mobile Number*</p>
                      <input type="text" placeholder="+918595046368" />
                    </label>

                    <label>
                      <p>Quotation Date*</p>
                      <input type="date" />
                    </label>

                    <label>
                      <p>Valid Until*</p>
                      <input type="date" />
                    </label>

                    <label>
                      <p>Customer ID*</p>
                      <input type="date" />
                    </label>

                    <div className="admorewrap">
                      <div className="admorCont">
                        <img src={plussing} alt="" />
                        <span>Add More Fields</span>
                      </div>

                      <div className="image" onClick={handleImageClick}>
                        <img src={inputfileds} alt="" />
                        <p>Add Business Logo</p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </form>

                  <div class="relative ">
                    <table class="quotablle text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="theadqu">
                        <tr>
                          <th scope="col" class="px-2 py-3">
                            Description
                          </th>
                          <th scope="col" class="px-2 py-3">
                            Quantity
                          </th>
                          <th scope="col" class="px-2 py-3">
                            Price
                          </th>
                          <th scope="col" class="px-2 py-3">
                            Total
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr class="bg-white tabletr ">
                          <td class="px-2 py-4">
                            <input type="text" className="inpu11" />
                          </td>

                          <td class="px-2 py-4">
                            <input type="number" />
                          </td>

                          <td class="px-2 py-4">
                            <input type="number" />
                          </td>

                          <td class="px-2 py-4">
                            <input type="number" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="admorCont">
                    <img src={plussing} alt="" />
                    <span>Add Item</span>
                  </div>

                  <div className="docuThird">
                    <h3>Format</h3>

                    <hr />

                    <JoditEditor
                      ref={editor}
                      value={content}
                      tabIndex={1}
                      // onBlur={(newContent) => setContent(newContent)}
                      onChange={(newContent) => {
                        setContent(newContent);
                      }}
                    />
                  </div>

                  <div className="comapnydetail">
                    <h3 className="comdetail">Company Details</h3>

                    <form className="qtoform">
                      <label>
                        <p>Company Name*</p>
                        <input type="text" placeholder="" />
                      </label>

                      <label>
                        <p>Company Address*</p>
                        <input type="text" placeholder="" />
                      </label>

                      <label>
                        <p>Company GSTIN*</p>
                        <input type="text" />
                      </label>

                      <label>
                        <p>Company Website*</p>
                        <input type="text" />
                      </label>
                    </form>
                  </div>
                </div>
              </div>

              {/* right side  */}
              <div className="qutaRight">
                <div className="qrTop">
                  <h3>Preview</h3>
                  <img src={cutting} alt="" />
                </div>

                <hr />

                <div className="hdquot">
                  <p>Quotation #01</p>
                  <img src={kdsquto} alt="" />
                </div>

                <p className="cust">Customer</p>

                <div className="gridView">
                  <p>Mr. Akash Negi</p>
                  <p>Date: 05/07/2024</p>
                  <p>Mobile App - diet cure app</p>
                  <p>Valid Until: 05/08/2024</p>
                  <p>+918595046368</p>
                  <p>Customer ID: 001</p>
                </div>

                {/* talble */}

                <div className="talbeLike">
                  <nav>
                    <p>Description</p>
                    <p>Quantity</p>
                    <p>Price</p>
                    <p>Total</p>
                  </nav>

                  <div className="tabledata">
                    <p>Featured Services</p>
                    <p>1</p>
                    <p>0</p>
                    <p>0</p>
                  </div>

                  <ol className="services">
                    <li>1. User App(android/iOS)</li>
                    <li>2. Portfolio Website</li>
                    <li>3. Admin Pannel</li>
                  </ol>
                </div>

                <hr />

                <div className="userApp">
                  <h3>User App(android/iOS)</h3>

                  <ul className="ulist">
                    <li>Login with</li>
                  </ul>

                  <ol className="ollist">
                    <li>1. Email address</li>
                    <li>2. Password</li>
                  </ol>

                  <ul className="ulist">
                    <li>Sign Up</li>
                  </ul>

                  <ol className="ollist">
                    <li>
                      <span>Name:</span> You’ll likely be asked to enter your
                      first and last name.
                    </li>
                    <li>
                      <span>Email address: </span>You’ll need to provide a valid
                      email address to create an account.{" "}
                    </li>
                  </ol>
                </div>

                <hr />

                <div className="rigthfot">
                  {/* right side */}
                  <div className="rigthfotleft">
                    <p className="leftfist">Kushel Digi Solutions</p>
                    <p className="seconle">
                      IT and e-Commerce Development Company
                    </p>
                    <p className="thirleft">
                      <span>GST No. </span> 07BKIPG8876K1ZG
                    </p>
                  </div>

                  {/* eleft  */}
                  <div className="rigthfotright">
                    <p>Reach us at</p>
                    <p>
                      G9, Sector 63 Rd, Noida, Chotpur, Uttar Pradesh 201301
                    </p>
                    <p>+91-9045301702 / +1-585-566-2070</p>
                    <p>www.kusheldigi.com</p>
                  </div>

                  <hr />
                </div>

                <div className="prntBtn">
                  <button>
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuotationForm;
