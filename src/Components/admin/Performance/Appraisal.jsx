import { useEffect, useState } from "react";
import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminNavbar from "../Navbar/AdminNavbar";
import { useMain } from "../../../hooks/useMain";
import annPlus from "../../images/annPlus.png";
import "./indicator.css";
import cross from "../../images/crossAn.png";
import { FaRegStar } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import toast from "react-hot-toast";
import EmployeeNavbar from "../../Employee/Navbar/EmployeeNavbar";
import EmployeeSidebar from "../../Employee/Sidebar/EmployeeSidebar";

const Appraisal = ({ pop, setPop, setAlert }) => {
  const {
    user,
    getAppraisal,
    createAppraisal,
    allEmployee,
    getBranchs,
    deleteApprisal,
    updateApprisal,
  } = useMain();

  const [openForm, setOpenForm] = useState(false);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const { role } = hrms_user;

  const [data, setData] = useState([]);

  const [employee, setEmployee] = useState([]);

  const [branch, setBranch] = useState([]);

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const [formdata, setFormdata] = useState({
    Branch: "",
    Employee: "",
    SelectMonth: "",
    remarks: "",
  });

  const getData = async () => {
    const ans = await getAppraisal();
    setData(ans?.data);
  };

  useEffect(() => {
    getData1();
  }, []);

  const getData1 = async () => {
    const ans = await getBranchs();
    setBranch(ans?.data);
  };

  const fetchEmployee = async () => {
    const ans = await allEmployee();
    const activeEmployees = ans?.emp?.filter(emp => emp.isDeactivated === "No");
    console.log("active employees", activeEmployees);
    setEmployee(activeEmployees);
  };

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
            await deleteApprisal(id);
            toast.success("delete Successfully");
            setRefreshFlag(!refreshFlag);
            getData();
          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });
  };

  useEffect(() => {
    getData();
    fetchEmployee();
  }, [refreshFlag]);

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        Branch: editData.Branch,
        SelectMonth: editData.SelectMonth,
        Employee: editData.Employee,
        remarks: editData.remarks,
      });
    }
  }, [editData]);

  const submitHandler = async () => {
    try {
      if (onEdit) {
        await updateApprisal({ ...formdata });
        toast.success("update successfully");
        setRefreshFlag(!refreshFlag);
      } else {
        await createAppraisal({ ...formdata });
        toast.success("Successfuly Created");
        setRefreshFlag(!refreshFlag);
      }
      setOpenForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = data.filter((item) =>
    (item.GoalType?.toLowerCase() || "").includes(searchTerm.toLowerCase().trim()) ||
    (item.subject?.toLowerCase() || "").includes(searchTerm.toLowerCase().trim()) ||
    (item.Branch?.toLowerCase() || "").includes(searchTerm.toLowerCase().trim()) ||
    (item.target?.toLowerCase() || "").includes(searchTerm.toLowerCase().trim())
  );
  
  useEffect(() => {
    console.log("Search Term:", searchTerm);
    console.log("Filtered Data Length:", filteredData.length);
  }, [searchTerm, data]);
  
  const [currentPage, setCurrentPage] = useState(1); 
  const entriesPerPage = 5; 
  const indexOfLastEntry = currentPage * entriesPerPage; 
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage; 
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage); 

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="annDash relative h-full">
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
            <div className="anNav">
              {/* left sie */}
              <div className="anNavLeft">
                <h2>Manage Appraisal</h2>
                <p>
                  Dashboard <span> Appraisal</span>{" "}
                </p>
              </div>

              {/* rogth side  */}
              {/* <div onClick={() => setOpenForm(true)} className='plusImg'>
                <img src={annPlus} alt="" />

              </div> */}
              <button
                onClick={() => setOpenForm(true)}
                className="plusImg"
                style={{
                  color: "white",
                  padding: "10px 20px",
                  fontSize: "16px",
                  width: "10rem",
                }}
              >
                Create Appraisal
              </button>
            </div>

            <main className="anMain">
              {/* top */}
              <div className="anmainTop">
                {/* left side */}
                <div className="anMLef">
                  {/* <select name="" id="">
                    <option value="10">10</option>
                  </select>

                  <span>entries per page</span> */}
                </div>

                {/* right side  */}
                <div className="anMaRi">
                  <input type="text" placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-black dark:text-black">
                  <thead class="text-xs text-black uppercase  dark:text-black">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        BRANCH
                      </th>
                      <th scope="col" class="px-6 py-3">
                        DEPARTMENT
                      </th>
                      <th scope="col" class="px-6 py-3">
                        DESIGNATION
                      </th>
                      <th scope="col" class="px-6 py-3">
                        EMPLOYEE
                      </th>
                      <th scope="col" class="px-6 py-3">
                        TARGET RATING
                      </th>
                      <th scope="col" class="px-6 py-3">
                        OVERALL RATING
                      </th>
                      <th scope="col" class="px-6 py-3">
                        APPRAISAL DATE
                      </th>
                      <th scope="col" class="px-6 py-3">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentEntries.map((item, index) => (
                      <tr key={index} className="bg-white">
                        <td className="px-6 py-4">{item.Branch}</td>
                        <td className="px-6 py-4">{item.department}</td>
                        <td className="px-6 py-4">{item.designation}</td>
                        <td className="px-6 py-4">{item.Employee}</td>
                        <td className="px-6 py-4">{item.targetRating}</td>
                        <td className="px-6 py-4">{item.overallRating}</td>
                        <td className="px-6 py-4">{item.SelectMonth}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center sk">
                            <i
                              onClick={() => {
                                setOnEdit(true);
                                setEditData(item);
                                setOpenForm(true);
                              }}
                              className="fa-solid fa-pen-to-square"
                            ></i>
                            <i
                              onClick={() => {
                                deleteProject(item?._id);
                              }}
                              className="fa-solid fa-trash"
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             {totalPages >1 && (
                 <div className="pagination navbuttons flex justify-between items-center mt-4">
                 <button
                   onClick={handlePrevPage}
                   disabled={currentPage === 1}
                   className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                 >
                   Previous
                 </button>
      
                 <span className="px-4">{currentPage}</span>
                 <button
                   onClick={handleNextPage}
                   disabled={currentPage === totalPages}
                   className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
                 >
                   Next
                 </button>
               </div>
             )}

                {/* <p className="showText">Showing 1 to 1 of 1 entries</p> */}
              </div>
            </main>
          </div>
        </div>

        {/* form  */}
        {openForm && (
          <div className="annFormwrap">
            <form
              onSubmit={() => {
                submitHandler();
                setOpenForm(false);
              }}
              className="openform"
            >
              <nav>
                {/* left  */}
                <h2>Create New Appraisal</h2>
                <img
                  onClick={() => {
                    setOpenForm(false);
                    setOnEdit(false);
                    setEditData({});
                    setFormdata({
                      Branch: "",
                      Employee: "",
                      SelectMonth: "",
                      remarks: "",
                    });
                  }}
                  className="cursor-pointer"
                  src={cross}
                  alt=""
                />
              </nav>

              <hr />

              <div className="allInputFileds">
                <label htmlFor="" className="fullLabel">
                  <p>Branch*</p>
                  <select
                    onChange={changeHandler}
                    value={formdata.Branch}
                    name="Branch"
                  >
                    <option value="Select Branch">Select Branch</option>
                    {branch?.map((val, index) => {
                      return (
                        <option key={index} value={val?.name}>
                          {val?.name}
                        </option>
                      );
                    })}
                  </select>
                </label>

                <label className="halfLabel">
                  <p>Employee*</p>
                  <select
                    onChange={changeHandler}
                    value={formdata.Employee}
                    name="Employee"
                  >
                    <option value="Select Employee">Select Employee</option>
                    {employee.map((item, index) => (
                      <option value={item.fullName} key={index}>
                        {item.fullName}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="halfLabel">
                  <p>Select Date*</p>
                  <input
                    name="SelectMonth"
                    value={formdata.SelectMonth}
                    onChange={changeHandler}
                    type="date"
                  />
                </label>

                <label htmlFor="remarks" className="fullLabel">
                  <p>Remarks</p>
                  <textarea
                    onChange={changeHandler}
                    value={formdata.remarks}
                    name="remarks"
                    placeholder="Enter remark"
                    id="remarks"
                    cols="20"
                    rows="3"
                  ></textarea>
                </label>
              </div>

              <hr />

              <div className="createBtn">
                <button
                  type="button"
                  onClick={() => {
                    setOpenForm(false);
                    setOnEdit(false);
                    setEditData({});
                    setFormdata({
                      Branch: "",
                      Employee: "",
                      SelectMonth: "",
                      remarks: "",
                    });
                  }}
                  className="cancelBtn"
                >
                  Cancel
                </button>
                <button type="submit" className="creteBtn">
                  {onEdit ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Appraisal;
