import { useState } from "react";
import "./App.css";
import Auth from "./Components/auth/Auth.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgetPassword from "./Components/auth/ForgetPassword";
import ForgetPassword1 from "./Components/auth/ForgetPassword1";
import MainState from "./context/MainState";
import Alert from "./Components/Alert/Alert";
import PrivateRoute from "./privateRoute/PrivateRoute";
import EmployeeDash from "./Components/Employee/Dashboard/EmployeeDash";
import HrDashboard from "./Components/Hr/Dashboard/HrDashboard";
import AdminDash from "./Components/admin/Dashboard/AdminDash";
import ForgetPassword2 from "./Components/auth/ForgetPassword2";
import Home from "./Components/Home";
import EmployeeManage from "./Components/admin/EmployeeManage/EmployeeManage";
import Request from "./Components/Employee/Request/Request";
import UpdateProfile from "./Components/Employee/Profile/UpdateProfile";
import AdminProfile from "./Components/admin/AdminProfile/AdminProfile";
import HrManage from "./Components/admin/HrManage/HrManage";
import EmployeeManageByHr from "./Components/Hr/EmployeeManageHr/EmployeeManageByHr";
import ShowEmployee from "./Components/Hr/ShownEmployee.js/ShowEmployee";
import ShowEmployee1 from "./Components/Hr/ShownEmployee.js/ShowEmployee1";
import UpdateProfileHr from "./Components/Hr/UpdateProfileHr/UpdateProfileHr";
import AttendenceCalendar from "./Components/Employee/Request/AttendenceCalendar";
import Payroll from "./Components/Hr/Payroll/Payroll";
import ProfileManagement from "./Components/admin/ProfileManagement/ProfileManagement";
import HrAttendence from "./Components/Hr/HrAttendence/HrAttendence";
import HolidayHRM from "./Components/admin/EmployeeHRM/HolidayHRM";
import EmployeeHRM from "./Components/admin/EmployeeHRM/EmployeeHRM";
import TotalEmployee from "./Components/admin/EmployeeHRM/TotalEmployee";
import LeaveEmployee from "./Components/admin/EmployeeHRM/LeaveEmployee";
import ActiveEmplyee from "./Components/admin/EmployeeHRM/ActiveEmplyee";
import LeaveRequest from "./Components/admin/EmployeeHRM/LeaveRequest";
import CreateEmployee from "./Components/admin/EmployManagement/CreateEmploy";
import EmployeeManagement from "./Components/admin/EmployManagement/EmployeeManagement";
import EmployeeManagementID from "./Components/admin/EmployManagement/EmployeeManagementID";
import HRMsystemSetup from "./Components/admin/EmployManagement/HRMsystemSetup";
import AwardHRM from "./Components/admin/EmployeeHRM/AwardHRM";
import TransferHRM from "./Components/admin/EmployeeHRM/TransferHRM";
import ResignationHRM from "./Components/admin/EmployeeHRM/ResignationHRM";
import PromotionHRM from "./Components/admin/EmployeeHRM/PromotionHRM";
import ComplaintsHRM from "./Components/admin/EmployeeHRM/ComplaintsHRM";
import WarningHRM from "./Components/admin/EmployeeHRM/WarningHRM";
import TerminationHRM from "./Components/admin/EmployeeHRM/TerminationHRM";
import TrainingList from "./Components/admin/EmployeeHRM/TrainingList";
import TrainerHRM from "./Components/admin/EmployeeHRM/TrainerHRM";
import DocumentSetup from "./Components/admin/EmployeeHRM/DocumentSetup";
import MarkAttendance from "./Components/admin/EmployeeHRM/MarkAttendence";
import AdminAnnoncement from "./Components/admin/Announcement/AdminAnnoncement"
import Indicator from "./Components/admin/Performance/Indicator";
import Appraisal from "./Components/admin/Performance/Appraisal";
import GoalTracking from "./Components/admin/Performance/GoalTracking";
import Assets from "./Components/admin/Performance/Assets";
import Notification from "./Components/admin/Notification/Notification";
import Notification2 from "./Components/admin/Notification/Notification2";
import EmployeAttendence from "./Components/admin/EmployeeHRM/EmployeAttendence";
import Trip from "./Components/admin/EmployeeHRM/Trip";
import LeadDash from "./Components/admin/LeadManagement/LeadDash.jsx";
import MyLead from "./Components/admin/LeadManagement/MyLead.jsx";
import CreateLead from "./Components/admin/LeadManagement/CreateLead.jsx";
import ImportLead from "./Components/admin/LeadManagement/ImportLead.jsx";
import LeadFile from "./Components/admin/LeadManagement/LeadFile.jsx";
import EditLead from "./Components/admin/LeadManagement/EditLead.jsx";
import LeadDash2 from "./Components/admin/LeadManagement/LeadDash2.jsx";
import MyLead2 from "./Components/admin/LeadManagement/MyLead2.jsx";
import CreateLead2 from "./Components/admin/LeadManagement/CreateLead2.jsx";
import EditLead2 from "./Components/admin/LeadManagement/EditLead2.jsx";
import ImportLead2 from "./Components/admin/LeadManagement/ImportLead2.jsx";
import LeadFile2 from "./Components/admin/LeadManagement/LeadFile2.jsx";
import AddEmployee from "./Components/admin/EmployManagement/AddEmployee.jsx";
import MySelf from "./Components/Employee/MySelf/MySelf.jsx";
import CreateQuotation from "./Components/quotation/CreateQuotation.jsx";
import InvoicePage from "./Components/quotation/InvoicePage.jsx";
import HrAttendence1 from "./Components/Hr/attendence/HrAttendence1.jsx";
import Notification3 from "./Components/admin/Notification/Notification3.jsx";
import Notification4 from "./Components/admin/Notification/Notification4.jsx";
import EmployeeSelf from "./Components/Employee/EmployeeSelf/EmployeeSelf.jsx";

var tc;

const ROLES = {
  EMPLOYEE: "EMPLOYEE",
  HR: "HR",
  ADMIN: "ADMIN",
};

function App() {

  const [alertValue, setAlertValue] = useState({
    show: false,
    color: "",
    message: "",
  });

  const [pop, setPop] = useState(false);
  const [pop1, setPop1] = useState(false);

  const setAlert = (color, message) => {
    setAlertValue({
      color,
      message,
      show: true,
    });

    clearTimeout(tc);
    tc = setTimeout(() => {
      setAlertValue({
        color: "",
        message: "",
        show: false,
      });
    }, 3000);
  };

  const closeAlert = () => {
    clearTimeout(tc);
    setAlertValue({
      color: "",
      message: "",
      show: false,
    });
  };

  return (
    <>
      <MainState>
        <BrowserRouter>
          {alertValue.show ? (
            <Alert
              color={alertValue.color}
              message={alertValue.message}
              closeAlert={closeAlert}
            />
          ) : null}

          <Routes>
            <Route path="/" element={<Home setAlert={setAlert} />} />
            <Route path="/login" element={<Auth setAlert={setAlert} />} />
            <Route path="/forget" element={<ForgetPassword setAlert={setAlert} />} />
            <Route path="/forget1" element={<ForgetPassword1 setAlert={setAlert} />} />
            <Route path="/forget2" element={<ForgetPassword2 setAlert={setAlert} />} />

            {/* =================Employee routing=========== */}
            <Route
              element={<PrivateRoute role={[ROLES.EMPLOYEE, ROLES.ADMIN]} />}
            >
              <Route
                path="/employeeDash"
                element={
                  <EmployeeDash
                    setAlert={setAlert}
                    pop1={pop1}
                    setPop1={setPop1}
                  />
                }
              />

              <Route path="/employeeDash/request" element={<Request pop1={pop1}
                setPop1={setPop1} setAlert={setAlert} />} />
              <Route path="/employeeDash/update" element={<UpdateProfile pop1={pop1}
                setPop1={setPop1} setAlert={setAlert} />} />
              <Route path="/employeeDash/atten" element={<AttendenceCalendar pop1={pop1}
                setPop1={setPop1} setAlert={setAlert} />} />
                <Route path="/employeeDash/editLead" element={<EditLead2 />}/>
                <Route path="/employeeDash/createLead" element={<CreateLead2 />}/>
                <Route path="/employeeDash/myLead" element={<MyLead2 />}/>
                <Route path="/employeeDash/leadDash" element={<LeadDash2 />}/>
                <Route path="/employeeDash/importLead/:id" element={<ImportLead2/>}/>
                <Route path="/employeeDash/leadFile" element={<LeadFile2/>}/>
                <Route path="/employeeDash/mySelf" element={<MySelf />}/>

                <Route path="/employeeDash/createQuotation" element={<CreateQuotation />}  />

                
            </Route>

            {/* ====================hr routing============== */}
            <Route element={<PrivateRoute role={[ROLES.HR, ROLES.ADMIN]} />}>
              <Route
                path="/hrDash"
                element={<HrDashboard pop1={pop1} setPop1={setPop1} setAlert={setAlert} />}
              />
              {/* <Route path="/hrDash/EmployeeReg" element={<EmployeeManageByHr setAlert={setAlert}/>}/> */}
              <Route path="/hrDash/EmployeeReg" element={<EmployeeManage
                setAlert={setAlert}
                pop={pop}
                setPop={setPop}
                pop1={pop1}
                setPop1={setPop1}
                isHr={true}
              />} />
              <Route path="/hrDash/EmployeeReg/:id" element={<EmployeeManage
                setAlert={setAlert}
                pop={pop}
                setPop={setPop}
                pop1={pop1}
                setPop1={setPop1}
                isHr={true}
              />} />
              <Route path="/hrDash/EmployeeMan" element={<ShowEmployee setAlert={setAlert} pop1={pop1}
                setPop1={setPop1} />} />
              <Route path="/hrDash/EmployeeMan1" element={<ShowEmployee1 setAlert={setAlert} pop1={pop1}
                setPop1={setPop1} />} />
              <Route path="/hrDash/profile" element={<UpdateProfileHr setAlert={setAlert} pop1={pop1}
                setPop1={setPop1} />} />
              <Route path="/hrDash/payroll" element={<Payroll setAlert={setAlert} pop1={pop1}
                setPop1={setPop1} />} />

              <Route path="/hrDash/atten" element={<HrAttendence pop1={pop1}
                setPop1={setPop1} setAlert={setAlert} />} />
                 <Route path="/hrDash/atten1" element={<HrAttendence1 pop1={pop1}
                setPop1={setPop1} setAlert={setAlert} />} />


            </Route>

            {/* ================admin routing===================== */}
            <Route >
              <Route
                path="/adminDash"
                element={<AdminDash pop={pop} setPop={setPop} setAlert={setAlert} />}
              />
              <Route path="/adminDash/EmployeeMan" element={<EmployeeManage pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM" element={<EmployeeHRM pop={pop} setPop={setPop} setAlert={setAlert} />} />

              <Route path="/adminDash/HRM/createEmployee" element={<CreateEmployee pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/EmployeeManagement" element={<EmployeeManagement pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/EmployeeManagement/:id" element={<EmployeeManagementID pop={pop} setPop={setPop} setAlert={setAlert} />} />
              {/* dinesh  */}
              <Route path="/adminDash/HRM/HRMsystemSetup" element={<HRMsystemSetup />} />
              <Route path="/adminDash/HRM/AwardHRM" element={<AwardHRM />} />
              <Route path="/adminDash/HRM/trip" element={<Trip />} />
              <Route path="/adminDash/HRM/TransferHRM" element={<TransferHRM />} />
              <Route path="/adminDash/HRM/ResignationHRM" element={<ResignationHRM />} />
              <Route path="/adminDash/HRM/PromotionHRM" element={<PromotionHRM />} />
              <Route path="/adminDash/HRM/ComplaintsHRM" element={<ComplaintsHRM />} />
              <Route path="/adminDash/HRM/WarningHRM" element={<WarningHRM />} />
              <Route path="/adminDash/HRM/TerminationHRM" element={<TerminationHRM />} />
              <Route path="/adminDash/HRM/holiday" element={<HolidayHRM />} />


              <Route path="/adminDash/HRM/totalEmployee" element={<TotalEmployee pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/LeaveEmployee" element={<LeaveEmployee pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/activeEmployee" element={<ActiveEmplyee pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/leaveRequest" element={<LeaveRequest pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/markAttendance" element={<MarkAttendance pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/HRM/userAttendence" element={<EmployeAttendence pop={pop} setPop={setPop} setAlert={setAlert} />} />

              <Route path="/adminDash/EmployeeMan/:id" element={<EmployeeManage pop={pop} setPop={setPop} setAlert={setAlert} />} />

              <Route path="/adminDash/profile-management" element={<ProfileManagement pop={pop} setPop={setPop} setAlert={setAlert} />} />

              <Route path="/adminDash/HrManage" element={<HrManage pop={pop} setAlert={setAlert} setPop={setPop} />} />
              <Route path="/adminDash/profile" element={<AdminProfile pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/adminDash/announcement" element={<AdminAnnoncement pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/performance/indicator" element={<Indicator pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/performance/appraisal" element={<Appraisal pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/performance/goalTracking" element={<GoalTracking pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/performance/Assets" element={<Assets pop={pop} setPop={setPop} setAlert={setAlert} />} />
              <Route path="/training/TrainingList" element={<TrainingList />} />
              <Route path="/training/TrainerHRM" element={<TrainerHRM />} />
              <Route path="/training/DocumentSetup" element={<DocumentSetup />} />
              <Route path="/adminDash/notification" element={<Notification />} />
              <Route path="/hrDash/notification" element={<Notification2 setAlert={setAlert}
                pop={pop}
                setPop={setPop}
                pop1={pop1}
                setPop1={setPop1}
                isHr={true} />} />
                <Route path="/hrDash/notification3" element={<Notification3 />} />
                 <Route path="/hrDash/notification4" element={<Notification4 setAlert={setAlert}
                pop={pop}
                setPop={setPop}
                pop1={pop1}
                setPop1={setPop1}
                isHr={true} />} />
                <Route path="/adminDash/leadDash" element={<LeadDash/>}/>
                <Route path="/adminDash/myLead" element={<MyLead />}/>
                <Route path="/adminDash/createLead" element={<CreateLead/>}/>
                <Route path="/adminDash/editLead" element={<EditLead />}/>
                <Route path="/adminDash/importLead/:id" element={<ImportLead />}/>
                <Route path="/adminDash/mySelf" element={<MySelf />}/>
                <Route path="/adminDash/EmployeeDetails" element={<EmployeeSelf />}/>

                <Route path="/adminDash/leadFile" element={<LeadFile/>}/>

                <Route path="/adminDash/createQuotation" element={<CreateQuotation />}  />


<Route path="/adminDash/addEmployee" element={<AddEmployee />}  />

<Route path="/invoicePage" element={<InvoicePage />} />
                 
            </Route>

          </Routes>

        </BrowserRouter>
      </MainState>
      {/* <Auth/> */}
    </>
  );
};

export default App;
