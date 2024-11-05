import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminNavbar from "../Navbar/AdminNavbar";
import { useMain } from "../../../hooks/useMain";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./permission.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Permission = ({ pop, setPop, setAlert }) => {
  const {
    user,
    allEmployee,
    getDesignations,
    ProvidePermission,
    ProvideRemovePermission,
  } = useMain();

  const [formdata, setFormdata] = useState({
    Service: "",
    userId: "",
    Designation: "",
    SubPermission: "",
  });

  const [formdata2, setFormdata2] = useState({
    Service: "",
    userId: "",
    Designation: "",
    SubPermission: "",
  });

  const [allEmp, setAllEmp] = useState([]);
  const [allDesig, setAllDesig] = useState([]);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeHandler2 = (e) => {
    const { name, value } = e.target;

    setFormdata2((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const allEmployeFetch = async () => {
    const ans = await allEmployee();
    setAllEmp(ans?.emp);
  };

  const alldesinationFetch = async () => {
    const ans = await getDesignations();
    setAllDesig(ans?.data);
  };

  const applyPermission = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await ProvidePermission({
      Designation: formdata?.Designation,
      userId: formdata?.userId,
      Service: formdata?.Service,
      SubPermission: formdata?.SubPermission,
    });

    toast.success("Successfuly done");
    toast.dismiss(toastId);
  };

  const applyRemovePermission = async () => {
    const toastId = toast.loading("Loading...");
    const ans = await ProvideRemovePermission({
      Designation: formdata2?.Designation,
      userId: formdata2?.userId,
      Service: formdata2?.Service,
      SubPermission: formdata2?.SubPermission,
    });

    toast.success("Successfuly done");
    toast.dismiss(toastId);
  };

  useEffect(() => {
    allEmployeFetch();
    alldesinationFetch();
  }, []);


  const allLead = [
    { id: "leadDeletePermission", title: "Lead Delete" },
    { id: "leadEditPermission", title: "Lead Edit" },
    { id: "leadCreatePermission", title: "Lead Create" },
  ];

  const ProjectCreate = [
    { id: "projectDeletePermission", title: "Project Delete" },
    { id: "showProjectPermission", title: "Show Project" },
    { id: "projectEditPermission", title: "Project Edit" },
    { id: "projectCreatePermission", title: "Project Create" },
  ];

  const leadSystem = [
    { id: "leadSystemPermission", title: "LeadSystem Show" },
    { id: "leadSystemSettingEditPermission", title: "Edit LeadSystem" },
    { id: "leadSystemSettingDeletePermission", title: "LeadSystem Delete" },
    { id: "leadSystemSettingCreatePermission", title: "LeadSystem Create" },
  ];

  const taskPerms = [
    { id: "showTasksDetailPermission", title: "Task Show" },
    { id: "addTaskPermission", title: "Add Task" },
    { id: "deleteTaskPermission", title: "Delete Task" },
    { id: "editTaskPermission", title: "Edit Task" },
  ];


  const [selectLead, setSelectLead] = useState([]);


  const handleSelect = (id) => {
    setSelectLead((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((leadId) => leadId !== id) 
        : [...prevSelected, id] 
    );
  };


  const handleSelectAll = (event, categoryArray) => {
    if (event.target.checked) {
      setSelectLead((prevSelected) => [
        ...prevSelected,
        ...categoryArray
          .map((item) => item.id)
          .filter((id) => !prevSelected.includes(id)), 
      ]);
    } else {
      setSelectLead((prevSelected) =>
        prevSelected.filter((id) => !categoryArray.some((item) => item.id === id))
      );
    }
  };

  const renderCategory = (category, title) => (
    <div className="leadroleCont">
      <div className="lead_head">
        <input
          type="checkbox"
          checked={category.every((item) => selectLead.includes(item.id))}
          onChange={(e) => handleSelectAll(e, category)}
        />
        <h2>{title}</h2>
      </div>
      <div className="leadroelscond">
        {category.map((item) => (
          <div key={item.id} className="singlead">
            <input
              type="checkbox"
              checked={selectLead.includes(item.id)}
              onChange={() => handleSelect(item.id)}
            />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="annDash relative h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />

          <div className="em editrolewrap">
            <h1>Edit Role</h1>

            <label htmlFor="" className="inputfilabel">
              <p>Name</p>
              <input type="text" />
            </label>

            <div className="allroleswrap">
      {renderCategory(allLead, "Lead")}
      {renderCategory(ProjectCreate, "Project")}
      {renderCategory(leadSystem, "Lead System")}
      {renderCategory(taskPerms, "Task")}
    </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Permission;

{
  /* <div>

        
<div className="em">
  <div className="permiCont">

    <label>
      <p>Service</p>
      <select
        required
        className="mt-3"
        onChange={changeHandler}
        name="Service"
        value={formdata.Service}
      >
        <option>Select Service</option>
        <option value="leadPermission">leadPermission</option>
        <option value="hrmsSetUpPermission">
          hrmsSetUpPermission
        </option>
        <option value="leadSystemPermission">
          leadSystemPermission
        </option>
        <option value="halfDayPermission">
        halfDayPermission
        </option>
        <option value="attendencePermission">
          attendencePermission
        </option>
        <option value="showTasksDetailPermission">
        showTasksDetailPermission
        </option>
        <option value="projectCreatePermission">
        projectCreatePermission
        </option>
        <option value="showAllProjectPermission">
        showAllProjectPermission
        </option>
        <option value="assetsPermission">assetsPermission</option>
        <option value="documentPermission">documentPermission</option>
        <option value="userAllowCrtPermission">userAllowanceCreatePermission</option>
        <option value="leaveManagePermission">
          leaveManagePermission
        </option>
        <option value="showExpensePermission">
        showExpensePermission
        </option>
        <option value="createExpensePermission">
          createExpensePermission
        </option>
        <option value="performancePermission">
          performancePermission
        </option>
        <option value="employeeManagePermission">
          employeeManagePermission
        </option>
        <option value="payrollPermission">payrollPermission</option>
        <option value="hrAdminSetupPermission">
          hrAdminSetupPermission
        </option>
        <option value="addTaskPermission">
        addTaskPermission
        </option>
        <option value="trainingSetupPermission">
          trainingSetupPermission
        </option>
        <option value="activeEmployeePermission">
          activeEmployeePermission
        </option>
        <option value="leaveRequestPermission">
          leaveRequestPermission
        </option>
        <option value="employeeOnLeavePermission">
          employeeOnLeavePermission
        </option>
        <option value="totalEmployeePermission">
          totalEmployeePermission
        </option>
        <option value="deleteTaskPermission">
        deleteTaskPermission 
        </option>
        <option value="editTaskPermission">
        editTaskPermission
        </option>
        <option value="createLeadPermission">
          createLeadPermission
        </option>
        <option value="hrmsSetupEditPermission">
          hrmsSetupEditPermission
        </option>
        <option value="hrmsSetupDeletePermission">
          hrmsSetupDeletePermission
        </option>
        <option value="hrmsSetupCreatePermission">
          hrmsSetupCreatePermission
        </option>
        <option value="paySlipActionPermission">
          paySlipActionPermission
        </option>
        <option value="leadSystemSettingEditPermission">
          leadSystemSettingEditPermission
        </option>
        <option value="leadSystemSettingDeletePermission">
          leadSystemSettingDeletePermission
        </option>
        <option value="leadSystemSettingCreatePermission">
          leadSystemSettingCreatePermission
        </option>
        <option value="leaveReqestEditPermission">
          leaveReqestEditPermission
        </option>
        <option value="leaveReqestActionPermission">
          leaveReqestActionPermission
        </option>
        <option value="employeeManageEditPermission">
          employeeManageEditPermission
        </option>
        <option value="employeeManageActivatePermission">
          employeeManageActivatePermission
        </option>
      </select>
    </label>

    <label>
      <p>All User</p>
      <select
        required
        className="mt-3"
        name="userId"
        value={formdata.userId}
        onChange={changeHandler}
      >
        <option>Select User</option>
        {allEmp?.map((emp, index) => (
          <option value={emp?._id} key={index}>
            {emp?.fullName}
          </option>
        ))}
      </select>
    </label>

    <label>
      <p>choose for leadPermission</p>
      <select
        required
        className="mt-3"
        name="SubPermission"
        onChange={changeHandler}
        value={formdata?.SubPermission}
      >
        <option value="">Select Permission</option>
        <option value="leadEditPermission">leadEditPermission</option>
        <option value="leadDeletePermission">
          leadDeletePermission
        </option>
        <option value="leadCreatePermission">
          leadCreatePermission
        </option>
      </select>
    </label>

    <label>
      <p>All Role</p>
      <select
        required
        className="mt-3"
        name="Designation"
        value={formdata.Designation}
        onChange={changeHandler}
      >
        <option>Select Role</option>
        {allDesig?.map((d, index) => (
          <option value={d?.name} key={index}>
            {d?.name}
          </option>
        ))}
      </select>
    </label>
  </div>

  <button onClick={applyPermission} className="applyBtn">
    <span>Apply</span>
  </button>
</div>


<h2 className="removePermsion">Remove Permission</h2>

<div className="em22">
  <div className="permiCont">
    <label>
      <p>Service</p>
      <select
        required
        className="mt-3"
        onChange={changeHandler2}
        name="Service"
        value={formdata2.Service}
      >
        <option>Select Service</option>
        <option value="leadPermission">leadPermission</option>
        <option value="hrmsSetUpPermission">
          hrmsSetUpPermission
        </option>
        <option value="leadSystemPermission">
          leadSystemPermission
        </option>
        <option value="halfDayPermission">
        halfDayPermission
        </option>
        <option value="showTasksDetailPermission">
        showTasksDetailPermission
        </option>
        <option value="attendencePermission">
          attendencePermission
        </option>
        <option value="assetsPermission">assetsPermission</option>
        <option value="projectCreatePermission">
        projectCreatePermission
        </option>
        <option value="showAllProjectPermission">
        showAllProjectPermission
        </option>
        <option value="deleteTaskPermission">
        deleteTaskPermission 
        </option>
        <option value="editTaskPermission">
        editTaskPermission
        </option>
        <option value="userAllowCrtPermission">userAllowanceCreatePermission</option>
        <option value="documentPermission">documentPermission</option>
        <option value="leaveManagePermission">
          leaveManagePermission
        </option>
        <option value="showExpensePermission">
        showExpensePermission
        </option>
        <option value="createExpensePermission">
        createExpensePermission
        </option>
        <option value="performancePermission">
          performancePermission
        </option>
        <option value="employeeManagePermission">
          employeeManagePermission
        </option>
        <option value="payrollPermission">payrollPermission</option>
        <option value="hrAdminSetupPermission">
          hrAdminSetupPermission
        </option>
        <option value="addTaskPermission">
        addTaskPermission
        </option>
        <option value="trainingSetupPermission">
          trainingSetupPermission
        </option>
        <option value="activeEmployeePermission">
          activeEmployeePermission
        </option>
        <option value="leaveRequestPermission">
          leaveRequestPermission
        </option>
        <option value="employeeOnLeavePermission">
          employeeOnLeavePermission
        </option>
        <option value="totalEmployeePermission">
          totalEmployeePermission
        </option>
        <option value="createLeadPermission">
          createLeadPermission
        </option>
        <option value="hrmsSetupEditPermission">
          hrmsSetupEditPermission
        </option>
        <option value="hrmsSetupDeletePermission">
          hrmsSetupDeletePermission
        </option>
        <option value="hrmsSetupCreatePermission">
          hrmsSetupCreatePermission
        </option>
        <option value="paySlipActionPermission">
          paySlipActionPermission
        </option>
        <option value="leadSystemSettingEditPermission">
          leadSystemSettingEditPermission
        </option>
        <option value="leadSystemSettingDeletePermission">
          leadSystemSettingDeletePermission
        </option>
        <option value="leadSystemSettingCreatePermission">
          leadSystemSettingCreatePermission
        </option>
        <option value="leaveReqestEditPermission">
          leaveReqestEditPermission
        </option>
        <option value="leaveReqestActionPermission">
          leaveReqestActionPermission
        </option>
        <option value="employeeManageEditPermission">
          employeeManageEditPermission
        </option>
        <option value="employeeManageActivatePermission">
          employeeManageActivatePermission
        </option>
      </select>
    </label>

    <label>
      <p>All User</p>
      <select
        required
        className="mt-3"
        name="userId"
        value={formdata2.userId}
        onChange={changeHandler2}
      >
        <option>Select User</option>
        {allEmp?.map((emp, index) => (
          <option value={emp?._id} key={index}>
            {emp?.fullName}
          </option>
        ))}
      </select>
    </label>

    <label>
      <p>choose for leadPermission</p>
      <select
        required
        className="mt-3"
        name="SubPermission"
        onChange={changeHandler2}
        value={formdata2?.SubPermission}
      >
        <option value="">Select Permission</option>
        <option value="leadEditPermission">leadEditPermission</option>
        <option value="leadDeletePermission">
          leadDeletePermission
        </option>
        <option value="leadCreatePermission">
          leadCreatePermission
        </option>
      </select>
    </label>

    <label>
      <p>All Role</p>
      <select
        required
        className="mt-3"
        name="Designation"
        value={formdata2.Designation}
        onChange={changeHandler2}
      >
        <option>Select Role</option>
        {allDesig?.map((d, index) => (
          <option value={d?.name} key={index}>
            {d?.name}
          </option>
        ))}
      </select>
    </label>
  </div>

  <button onClick={applyRemovePermission} className="applyBtn">
    <span>Apply</span>
  </button>
</div>

</div> */
}
