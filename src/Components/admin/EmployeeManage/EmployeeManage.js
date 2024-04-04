import React, { useState, useEffect } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import ladki from "../../images/ladki.png";
import edit from "../../images/edit.png";
import upper from "../../images/upper.png";
import lower from "../../images/lower.png";
import del from "../../images/delete.png";
import { useNavigate, useParams } from "react-router-dom";
import HrSidebar from "../../Hr/Sidebar/HrSidebar";
import HrNavbar from "../../Hr/Navbar/HrNavbar";

const EmployeeManage = ({ pop1, setPop1, pop, setPop, setAlert, isHr = false }) => {
  
  const { id } = useParams();

  const navigate = useNavigate();

  const { user, createEmployee1, getUsers, updateUser, getBranchs, getDepartments, getDesignations , uploadDocuments } = useMain();

  const [value, setValue] = useState({
    branch: '',
    department: '',
    designation: ''
  });

  const [value1, setValue1] = useState({
    status: false,
    fullName: "",
    password: "",
    department: "",
    email: "",
    reportingManager: "",
    designation: "",
    joiningDate: "",
  });

  const [value2, setValue2] = useState({
    status: false,
    gmail: "",
    email1: "",
    mobile: "",
    gender: "",
    dob: "",
  });

  const [value3, setValue3] = useState({
    status: false,
    pan: "",
    adhar: "",
    father: "",
    currentAddress: "",
    currentState: "",
    currentCity: "",
    currentPin: "",
    residence: "",
    perState: "",
    perCity: "",
    perPin: "",
    Martial: "",
    nationality: "",
    Mother: "",
  });

  const [value4, setValue4] = useState({
    status: false,
    qualification: "",
    specialization: "",
    qualificationType: "",
    yearPass: "",
    university: "",
    college: "",
    percentage: "",
    previousCompany: "",
    previousDesignation: "",
    toDate: "",
    fromDate: "",
    numberOfMonth: "",
    Jobdescription: "",
  });

  const [value5, setValue5] = useState({
    status: false,
    SalaryPay: "",
    SalaryBankName: "",
    BeneficiaryName: "",
    BankIfsc: "",
    AccountNumber: "",
    confirmAccount: "",
    Branch: "",
  });

  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);


  useEffect(() => {
    let form1 = localStorage.getItem("form1");
    if (form1) {
      form1 = JSON.parse(form1);
      setValue1(form1);
    }
    let form2 = localStorage.getItem("form2");
    if (form2) {
      form2 = JSON.parse(form2);
      setValue2(form2);
    }
    let form3 = localStorage.getItem("form3");
    if (form3) {
      form3 = JSON.parse(form3);
      setValue3(form3);
    }
    let form4 = localStorage.getItem("form4");
    if (form4) {
      form4 = JSON.parse(form4);
      setValue4(form4);
    }
    let form5 = localStorage.getItem("form5");
    if (form5) {
      form5 = JSON.parse(form5);
      setValue5(form5);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let ans = await getBranchs();
    let ans1 = await getDepartments();
    let ans2 = await getDesignations();
    console.log(ans?.data);
    setBranches(ans?.data);
    setDepartments(ans1?.data);
    setDesignations(ans2?.data);
  };

  const getUser = async () => {
    const ans = await getUsers(id);
    console.log(ans);
    setValue1({
      status: false,
      fullName: ans.data.fullName,
      department: ans.data.department,
      email: ans.data.email,
      reportingManager: ans.data.reportingManager,
      designation: ans.data.designation,
      joiningDate: ans.data.joiningDate,
      password: ''
    });
    setValue2({
      status: false,
      gmail: ans.data.gmail,
      email1: ans.data.email1,
      mobile: ans.data.mobile,
      gender: ans.data.gender,
      dob: ans.data.dob
    });
    setValue3({
      status: false,
      pan: ans.data.pan,
      adhar: ans.data.adhar,
      father: ans.data.father,
      currentAddress: ans.data.currentAddress,
      currentState: ans.data.currentState,
      currentCity: ans.data.currentCity,
      currentPin: ans.data.currentPin,
      residence: ans.data.residence,
      perState: ans.data.perState,
      perCity: ans.data.perCity,
      perPin: ans.data.perPin,
      Martial: ans.data.Martial,
      nationality: ans.data.nationality,
      Mother: ans.data.Mother,
    });
    setValue4({
      status: false,
      qualification: ans.data.qualification,
      specialization: ans.data.specialization,
      qualificationType: ans.data.qualificationType,
      yearPass: ans.data.yearPass,
      university: ans.data.university,
      college: ans.data.college,
      percentage: ans.data.percentage,
      previousCompany: ans.data.previousCompany,
      previousDesignation: ans.data.previousDesignation,
      toDate: ans.data.toDate,
      fromDate: ans.data.fromDate,
      numberOfMonth: ans.data.numberOfMonth,
      Jobdescription: ans.data.Jobdescription
    });
    setValue5({
      status: false,
      SalaryPay: ans.data.SalaryPay,
      SalaryBankName: ans.data.SalaryBankName,
      BeneficiaryName: ans.data.BeneficiaryName,
      BankIfsc: ans.data.BankIfsc,
      AccountNumber: ans.data.AccountNumber,
      confirmAccount: ans.data.confirmAccount,
      Branch: ans.data.Branch
    });
  };

  const handleChange = (e, type) => {
    if (type === "form1") {
      setValue1({ ...value1, [e.target.name]: e.target.value });
    } else if (type === "form2") {
      setValue2({ ...value2, [e.target.name]: e.target.value });
    } else if (type === "form3") {
      setValue3({ ...value3, [e.target.name]: e.target.value });
    } else if (type === "form4") {
      setValue4({ ...value4, [e.target.name]: e.target.value });
    } else if (type === "form5") {
      setValue5({ ...value5, [e.target.name]: e.target.value });
    }
  };

  const handleEdit = (type) => {
    if (type === "form1") {
      setValue1({ ...value1, status: false });
      localStorage.setItem(type, JSON.stringify({ ...value1, status: false }));
    } else if (type === "form2") {
      setValue2({ ...value2, status: false });
      localStorage.setItem(type, JSON.stringify({ ...value2, status: false }));
    } else if (type === "form3") {
      setValue3({ ...value3, status: false });
      localStorage.setItem(type, JSON.stringify({ ...value3, status: false }));
    } else if (type === "form4") {
      setValue4({ ...value4, status: false });
      localStorage.setItem(type, JSON.stringify({ ...value4, status: false }));
    } else if (type === "form5") {
      setValue5({ ...value5, status: false });
      localStorage.setItem(type, JSON.stringify({ ...value5, status: false }));
    }
  };

  const handleSave = (type) => {
    if (type === "form1") {
      setValue1({ ...value1, status: true });
      localStorage.setItem(type, JSON.stringify({ ...value1, status: true }));
    } else if (type === "form2") {
      setValue2({ ...value2, status: true });
      localStorage.setItem(type, JSON.stringify({ ...value2, status: true }));
    } else if (type === "form3") {
      setValue3({ ...value3, status: true });
      localStorage.setItem(type, JSON.stringify({ ...value3, status: true }));
    } else if (type === "form4") {
      setValue4({ ...value4, status: true });
      localStorage.setItem(type, JSON.stringify({ ...value4, status: true }));
    } else if (type === "form5") {
      setValue5({ ...value5, status: true });
      localStorage.setItem(type, JSON.stringify({ ...value5, status: true }));
    }
  };

  
  const [documents , setDocuments] = useState({
    monthSalary:"",
    adharCard:"",
    cancelCheque:"",
    pancard:"",
    educationCert:"",
    prevOrgOffer:"",

   })

   const handleFileChange = (event) => {
    const file = event.target.files[0]; 
 const {name} = event.target;
    if (file) {
      setDocuments((prevDocuments) => ({
        ...prevDocuments,
        [name]: file, 
      }));
    }
  };
 

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    if (!id) {

      const {adharCard , cancelCheque , educationCert , monthSalary , prevOrgOffer} = documents;

      console.log('adhee ',adharCard , cancelCheque , educationCert , monthSalary , prevOrgOffer);

    
    const formData = new FormData();
     if(documents.adharCard){
       formData.append('adharCard', adharCard);

     }
     if(documents.cancelCheque){
       formData.append('cancelCheque', cancelCheque);

     }
     if(documents.educationCert){
       formData.append('educationCert', educationCert);

     }
     if(documents.monthSalary){
       formData.append('monthSalary', monthSalary);

     }
     if(documents.prevOrgOffer){
       formData.append('prevOrgOffer', prevOrgOffer);

     }
    

     if(documents.adharCard !=="" || documents.prevOrgOffer !=="" || documents.cancelCheque !=="" || documents.educationCert !=="" || documents.monthSalary !==""){
      const ans = await createEmployee1({
        ...value1,
        ...value2,
        ...value3,
        ...value4,
        ...value5,
        formData
      });
    }
      
    else{

      
      const ans = await createEmployee1({
        ...value1,
        ...value2,
        ...value3,
        ...value4,
        ...value5
      });
      
    }

      localStorage.removeItem('form1');
      localStorage.removeItem('form2');
      localStorage.removeItem('form3');
      localStorage.removeItem('form4');
      localStorage.removeItem('form5');

      setValue1({
        status: false,
        fullName: "",
        password: "",
        department: "",
        email: "",
        reportingManager: "",
        designation: "",
        joiningDate: "",
      });
      setValue2({
        status: false,
        gmail: "",
        email1: "",
        mobile: "",
        gender: "",
        dob: "",
      });
      setValue3({
        status: false,
        pan: "",
        adhar: "",
        father: "",
        currentAddress: "",
        currentState: "",
        currentCity: "",
        currentPin: "",
        residence: "",
        perState: "",
        perCity: "",
        perPin: "",
        Martial: "",
        nationality: "",
        Mother: "",
      });
      setValue4({
        status: false,
        qualification: "",
        specialization: "",
        qualificationType: "",
        yearPass: "",
        university: "",
        college: "",
        percentage: "",
        previousCompany: "",
        previousDesignation: "",
        toDate: "",
        fromDate: "",
        numberOfMonth: "",
        Jobdescription: "",
      });
      setValue5({
        status: false,
        SalaryPay: "",
        SalaryBankName: "",
        BeneficiaryName: "",
        BankIfsc: "",
        AccountNumber: "",
        confirmAccount: "",
        Branch: "",
      });

      alert("created");
    }
    else {


 const {adharCard , cancelCheque , educationCert , monthSalary , prevOrgOffer} = documents;

 const formData = new FormData();
 if(documents.adharCard){
   formData.append('adharCard', adharCard);

 }
 if(documents.cancelCheque){
   formData.append('cancelCheque', cancelCheque);

 }
 if(documents.educationCert){
   formData.append('educationCert', educationCert);

 }
 if(documents.monthSalary){
   formData.append('monthSalary', monthSalary);

 }
 if(documents.prevOrgOffer){
   formData.append('prevOrgOffer', prevOrgOffer);

 }

 if(adharCard !== "" || cancelCheque !== "" || educationCert !=="" || monthSalary !== "" || prevOrgOffer !== ""){
  // formData
  const ans = await uploadDocuments(id , formData);
  if(ans.success){
     alert("Successfuly updated the documents");
  }
}

      const ans = await updateUser(id, value1, value2, value3, value4, value5);
      console.log(ans.data);

      setAlert("success", "Profile updated Successfully");
      
      if (!isHr) {
        navigate("/adminDash/HRM/EmployeeManagement");
      }
      else {
        navigate("/hrDash/EmployeeMan");
      }
    }

  };



  return (
    <>
      <div className="employee-dash h-full">
        {isHr ? <HrSidebar /> : <AdminSidebar pop={pop} setPop={setPop} />}

        <div className="tm">
          {isHr ? <HrNavbar user={user} setAlert={setAlert} pop1={pop1} setPop1={setPop1} /> : <AdminNavbar user={user} setAlert={setAlert} />}

          <div className="em">
            <div className="flex-col">
              <form
                onSubmit={(f) => {
                  handleSubmit(f, "submit");
                }}
              >
                {/* <div className="bg-white border-none ">
                  <div className=" p-3 pl-9  ">
                    <a href="#">
                      <h5 className="text-xl font-bold  ">Personal Details</h5>
                    </a>
                  </div>

                  <hr />

                  <div className=" p-3 pl-7 pr-7 ">
                    <div className="flex w-full ">
                      <div className=" w-full try">
                        <div className="pb-4 w-full try">
                          <label for="name-input" className="block  text-lg font-bold ">Name</label>
                          <input type="text" id="name-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="First Name" />
                        </div>
                        <div className="pb-5 w-full try">
                          <label for="email-input" className="block  text-lg font-bold ">Email Address</label>
                          <input type="email" id="email-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Enter Email" />
                        </div>

                        <div className="pb-5 w-full try">
                          <label for="comemail-input" className="block  text-lg font-bold ">Company email id</label>
                          <input type="email" id="comemail-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Enter Company Email" />
                        </div>
                        <div className="pb-2 w-full try">
                          <label for="gender-input" className="block  text-lg font-bold ">Gender</label>
                          <div className="flex hiiihih">
                            <div className="flex items-center hiiihih">
                              <input id="gender-input" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                              male
                            </div>
                            <div className="flex items-center hiiihih">
                              <input id="gender-input" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-50 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                              Female
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className=" w-full try ">
                        <div className="pb-4 w-full try">
                          <label for="namelast-input" className="block  text-lg font-bold ">Last Name</label>
                          <input type="text" id="namelast-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Last Name" />
                        </div>
                        <div className="pb-2 w-full try">
                          <label for="peraddress-input" className="block  text-lg font-bold ">Permanent Address</label>
                          <input type="text" id="peraddress-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Enter Address" />
                        </div>


                      </div>
                      <div className=" w-full try ">
                        <div className="pb-4 w-full try">
                          <label for="phone-input" className="block  text-lg font-bold ">Phone</label>
                          <input type="number" id="phone-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Enter Number" />
                        </div>
                        <div className="pb-2 w-full try">
                          <label for="temaddress-input" className="block  text-lg font-bold ">Temporary Address</label>
                          <input type="text" id="temaddress-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Enter Address" />
                        </div>

                      </div>
                    </div>

                  </div>
                </div>

                <div className="bg-white border-none mt-7 ">
                  <div className=" p-3 pl-9  ">
                    <a href="#">
                      <h5 className="text-xl font-bold  ">Company Details</h5>
                    </a>
                  </div>

                  <hr />

                  <div className=" p-3 pl-7 pr-7 ">
                    <div className="flex w-full ">
                      <div className=" w-full try">
                        <div className="pb-4 w-full try">
                          <label for="emailid-input" className="block  text-lg font-bold ">Email id </label>
                          <input type="email" id="emailid-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Enter Email id" />
                        </div>
                        <div className="pb-4 w-full try">
                          <form className="max-w-sm mx-auto">
                            <label for="Department" className="block text-lg font-bold ">Department</label>
                            <select id="Department" className="border border-gray-300 text-gray-900 text-sm rounded  block w-full p-2.5 dark:placeholder-gray-900">
                              <option selected >Select Department</option>
                              <option value="Web">Web</option>
                              {
                                departments?.map((e,index)=>{
                                  return <option key={index} value={e?.name}>{e?.name}</option>
                                })
                              }
                              
                            </select>
                          </form>
                        </div>



                      </div>
                      <div className=" w-full try ">
                        <div className="pb-4 w-full try">
                          <label for="joiningdate-input" className="block  text-lg font-bold ">Date of Joining</label>
                          <input type="date" id="joiningdate-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Last Name" />
                        </div>
                        <div className="pb-4 w-full try">
                          <form className="max-w-sm mx-auto">
                            <label for="Designation" className="block  text-lg font-bold ">Designation</label>
                            <select id="Designation" className="border border-gray-300 text-gray-900 text-sm rounded  block w-full p-2.5 dark:placeholder-gray-900">
                              <option selected >Select Designation</option>
                              {
                                designations?.map((e,index)=>{
                                  return <option key={index} value={e?.name}>{e?.name}</option>
                                })
                              }
                            </select>
                          </form>
                        </div>



                      </div>
                      <div className=" w-full try ">
                        <div className="pb-4 w-full try">
                          <form className="max-w-sm mx-auto">
                            <label for="Branch" className="block  text-lg font-bold ">Branch</label>
                            <select className="border border-gray-300 text-gray-900 text-sm rounded  block w-full p-2.5 dark:placeholder-gray-900">
                              <option >Select Branch</option>
                              {branches?.map((e, index) => {
                                return <option key={index} value={e?.name}>{e?.name}</option>
                              })}
                            </select>
                          </form>
                        </div>
                        <div className="pb-2 w-full try">
                          <label for="salary-input" className="block  text-lg font-bold ">salary</label>
                          <input type="number" id="salary-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Enter Salary" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="bg-white border-none mt-7 ">
                  <div className=" p-3 pl-9  ">
                    <a href="#">
                      <h5 className="text-xl font-bold  ">Document Details </h5>
                    </a>
                  </div>
                  <hr />
                  <div className=" p-3 pl-7 pr-7 ">
                    <div className="flex w-full ">
                      <div className=" w-full try">
                        <div className="pb-4 w-full try">
                          <label for="PanNumber-input" className="block  text-lg font-bold ">Pan Number</label>
                          <input type="number" id="PanNumber-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Enter Pan Number" />
                        </div>
                        <div className="pb-5 w-full try">
                          <label for="penfile-input" className="block  text-lg font-bold "></label>
                          <input type="file" id="penfile-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Upload Pan Card" />
                        </div>
                        <div className="pb-5 w-full try">
                          <label for="Cancelfile-input" className="block  text-lg font-bold "></label>
                          <input type="file" id="Cancelfile-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Cancel Check Upload" />
                        </div>


                      </div>
                      <div className=" w-full try ">
                        <div className="pb-5 w-full try">
                          <label for="Aadharcard-input" className="block  text-lg font-bold ">Aadhar card </label>
                          <input type="number" id="Aadharcard-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Enter number" />
                        </div>
                        <div className="pb-5 w-full try">
                          <label for="Aadharfile-input" className="block  text-lg font-bold "></label>
                          <input type="file" id="Aadharfile-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Upload Aadhar Card" />
                        </div>
                        <div className="pb-5 w-full try">
                          <label for="12file-input" className="block  text-lg font-bold "></label>
                          <input type="file" id="12file-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="12th  Certificate" />
                        </div>


                      </div>
                      <div className=" w-full try ">
                        <div className="pb-5 w-full try">
                          <label for="Validation-input" className="block  text-lg font-bold ">Validation Of Pan Number</label>
                          <input type="number" id="Validation-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " />
                        </div>
                        <div className="pb-5 w-full try">
                          <label for="10file-input" className="block  text-lg font-bold "></label>
                          <input type="file" id="10file-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="10th Certificate" />
                        </div>
                        <div className="pb-5 w-full try">
                          <label for="Graduationfile-input" className="block  text-lg font-bold "></label>
                          <input type="file" id="Graduationfile-input" className=" border border-gray-300 text-gray-900 text-sm rounded-m  block w-full p-2.5 dark:placeholder-gray-900 " placeholder="Graduation Certificate" />
                        </div>

                      </div>
                    </div>

                  </div>

                </div> */}

                <div className="admin-main admin-main1">
                  <div className="admin-form">
                    <div className="admin-form1">
                
                      <div className="form-section">
                        <div>
                          <div className="flex flex-col">
                            <input
                              onChange={(e) => {
                                handleChange(e, "form1");
                              }}
                              name="fullName"
                              value={value1?.fullName}
                              type="text"
                              placeholder="Full Name"
                              disabled={value1.status}
                            />
                            <input
                              onChange={(e) => {
                                handleChange(e, "form1");
                              }}
                              name="password"
                              value={value1?.password}
                              type="text"
                              placeholder="Password"
                              disabled={value1.status}
                            />
                            <select
                              onChange={(e) => {
                                handleChange(e, "form1");
                              }}
                              name="department"
                              value={value1?.department}
                              disabled={value1.status}
                              className="department_test"
                            >
                              <option value={''}>Select Department</option>
                              {departments?.map((e, index) => {
                                return <option key={index} value={e?.name}>{e?.name}</option>
                              })}
                              {/* <option value={`Intern`}>
                                Intern
                              </option>
                              <option value={`UI/UX Designer`}>
                           Designer
                              </option>
                              <option value={`Developer`}>
                                Developer
                              </option>
                              <option value={`Manager`}>
                                Manager/Project manager
                              </option>
                              <option value={`Digital Marketing`}>
                                Digital Marketing
                              </option>
                              <option value={`Business development`}>
                              Business development
                              </option>
                              {
                                user.role === "ADMIN" && <option value={`Hr`}>Hr</option>
                              } */}
                            </select>
                            <input
                              onChange={(e) => {
                                handleChange(e, "form1");
                              }}
                              type="email"
                              // name="gmail"
                              name="email"
                              // value={value1?.gmail}
                              value={value1?.email}
                              // placeholder="Company Gmail"
                              placeholder="Company Email Address"
                              disabled={value1.status}
                              
                            />
                            <select
                              onChange={(e) => {
                                handleChange(e, "form1");
                              }}
                              name="reportingManager"
                              value={value1?.reportingManager}
                              disabled={value1.status}
                              className="department_test"
                            >
                              <option>Reporting Manager</option>
                              <option value="Chirag">Chirag Negi</option>
                            </select>
                            <select
                              onChange={(e) => {
                                handleChange(e, "form1");
                              }}
                              name="designation"
                              value={value1?.designation}
                              disabled={value1.status}
                              className="department_test"
                            >
                              {/* <option>Designation</option>
                              {designations?.filter(x=>x?.department?._id===value?.department)?.map((e,index)=>{
                                <option key={index} value={e?._name}>{e?.name}</option>
                              })} */}

                              <option>Designation</option>
                              {designations?.map((e, index) => {
                               return <option key={index} value={e?._name}>{e?.name}</option>
                              })}

                              {/*<option value="Senior Developer">Senior Developer</option>
                              <option value="Developer">Developer</option>
                              <option value="UI/UX Designer">UI/UX Designer</option>
                              <option value="Graphic Designer">Graphic Designer</option>

                              <option value="E-Mail Marketer">E-Mail Marketer</option>
                              <option value="Digital Marketing">Digital Marketing</option>
                              <option value="Hr">Hr</option>
                              <option value="Team Leader">Team Leader</option>
                              <option value="  Business development">  Business development</option>
                              <option value="Manager">Manager/Project manager</option> */}
                            </select>
                            <input
                              onChange={(e) => {
                                handleChange(e, "form1");
                              }}
                              type="date"
                              name="joiningDate"
                              value={value1?.joiningDate}
                              disabled={value1.status}
                            />
                          </div>
                          {/* <div className="inputs-buttons">
                            <button
                              onClick={() => {
                                handleEdit("form1");
                                alert("Now admin can edit");
                              }}
                              type="button"
                              className="edit"
                            >
                              <img src={edit} alt="" /> <span>Edit</span>{" "}
                            </button>
                            <button
                              onClick={() => {
                                handleSave("form1");
                                alert("Saved the data");
                              }}
                              type="button"
                              className="save"
                            >
                              Save
                            </button>
                          </div> */}
                        </div>
                      </div>

                    </div>

                    <div className="admin-form2">

                      <div className="basic-information">
                        <div className="basics">
                          <h3>Basic Information</h3>
                          <img src={upper} alt="" />
                        </div>
                        <hr className="upper" />
                        <div className="form2-class">
                          <div className=" w-full mt-2">
                            <div className="flex w-full">
                              <div className="mb-6 w-full try">
                                <label
                                  for="gmail"
                                  className="block mb-0  font-medium "
                                >
                                  Company Gmail
                                </label>
                                <input
                                  type="email"
                                  id="gmail"
                                  className=" w-full rounded-lg"
                                  // required
                                  // name="email"
                                  name="gmail"
                                  // value={value2?.email}
                                  value={value2?.gmail}
                                  onChange={(e) => {
                                    handleChange(e, "form2");
                                  }}
                                  disabled={value2.status}
                                />
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="email1"
                                  className="block mb-0  font-medium"
                                >
                                  Personal Email Address
                                </label>
                                <input
                                  type="email"
                                  id="email1"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="email1"
                                  value={value2?.email1}
                                  onChange={(e) => {
                                    handleChange(e, "form2");
                                  }}
                                  disabled={value2.status}
                                />
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="mobile"
                                  className="block mb-0 font-medium"
                                >
                                  Mobile Number*
                                </label>
                                <input
                                  type="text"
                                  id="mobile"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="mobile"
                                  value={value2?.mobile}
                                  onChange={(e) => {
                                    handleChange(e, "form2");
                                  }}
                                  disabled={value2.status}
                                />
                              </div>
                            </div>
                            <div className="flex w-full">
                              <div className="mb-6 w-full try">
                                <label
                                  for="gender"
                                  className="block mb-0  font-medium "
                                >
                                  Gender
                                </label>
                                <select
                                  onChange={(e) => {
                                    handleChange(e, "form2");
                                  }}
                                  name="gender"
                                  value={value2?.gender}
                                  disabled={value2.status}
                                  className="w-full rouneded-lg"
                                >
                                  <option>gender</option>
                                  <option>Male</option>
                                  <option>Female</option>
                                  onChange=
                                  {(e) => {
                                    handleChange(e, "form2");
                                  }}
                                  disabled={value2.status}
                                </select>
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="dob"
                                  className="block mb-0  font-medium"
                                >
                                  Date of Birth
                                </label>
                                <input
                                  type="text"
                                  id="dob"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="dob"
                                  value={value2?.dob}
                                  onChange={(e) => {
                                    handleChange(e, "form2");
                                  }}
                                  disabled={value2.status}
                                />
                              </div>
                              <div className="mb-6 w-full try">
                                {/* <div className="inputs-buttons w-full inputs-button1">
                                  <button
                                    onClick={() => {
                                      handleEdit("form2");
                                    }}
                                    type="button"
                                    className="edit"
                                  >
                                    <img src={edit} alt="" /> <span>Edit</span>{" "}
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleSave("form2");
                                    }}
                                    type="button"
                                    className="save"
                                  >
                                    Save
                                  </button>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="basic-information mt-7">
                        <div className="basics">
                          <h3>Personal Information</h3>
                          <img src={upper} alt="" />
                        </div>
                        <hr className="upper" />
                        <div className="form2-class">
                          <div className="w-full mt-2">
                            <div className="flex w-full">
                              <div className="mb-6 w-full try">
                                <label
                                  for="pan"
                                  className="block mb-0  font-medium "
                                >
                                  PAN No.
                                </label>
                                <input
                                  type="text"
                                  id="pan"
                                  className=" w-full rounded-lg"
                                  // required
                                  name="pan"
                                  value={value3?.pan}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="adhar"
                                  className="block mb-0  font-medium"
                                >
                                  Aadhaar No.
                                </label>
                                <input
                                  type="text"
                                  id="adhar"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="adhar"
                                  value={value3?.adhar}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="father"
                                  className="block mb-0 font-medium"
                                >
                                  Father Name
                                </label>
                                <input
                                  type="text"
                                  id="father"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="father"
                                  value={value3?.father}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>
                            </div>
                            <div className="flex w-full">
                              <div className="mb-6 w-full try">
                                <label
                                  for="currentAddress"
                                  className="block mb-0  font-medium "
                                >
                                  Current Residence Address
                                </label>
                                <input
                                  type="text"
                                  id="currentAddress"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="currentAddress"
                                  value={value3?.currentAddress}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>
                            </div>
                            <div className="flex w-full">
                              <div className="mb-6 w-full try">
                                <label
                                  for="currentState"
                                  className="block mb-0  font-medium "
                                >
                                  Current state
                                </label>
                                {/* <select
                                  className="rounded-lg  w-full"
                                  name="currentState"
                                  id="currentState"
                                  value={value3?.currentState}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                >
                                  <option>CurrentState</option>
                                  <option>Jharkhand</option>
                                </select> */}

                                <input
                                  type="text"
                                  id="currentState"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="currentState"
                                  value={value3?.currentState}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="currentCity"
                                  className="block mb-0  font-medium"
                                >
                                  Current city
                                </label>
                                <input
                                  type="text"
                                  id="currentCity"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="currentCity"
                                  value={value3?.currentCity}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="currentPin"
                                  className="block mb-0 font-medium"
                                >
                                  Area Pincode
                                </label>
                                <input
                                  type="text"
                                  id="currentPin"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="currentPin"
                                  value={value3?.currentPin}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>
                            </div>
                            <div className="flex w-full">
                              <div className="mb-6 w-full try">
                                <div className="flex items-center">
                                  <label
                                    for="residence"
                                    className="block mb-0  font-medium "
                                  >
                                    Permanent Residence Address{" "}
                                  </label>
                                  <div className="flex items-center">
                                    <input
                                      id="link-checkbox"
                                      type="checkbox"
                                      value=""
                                      className="w-4 checkta  rounded mt-3 "
                                    />
                                    <label
                                      for="link-checkbox"
                                      className="ml-2 text-sm font-medium  text-gray-900 dark:text-gray-300"
                                    >
                                      Set as present{" "}
                                      <a
                                        href="#"
                                        className="text-blue-600 dark:text-blue-500 hover:underline"
                                      ></a>
                                      .
                                    </label>
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  id="residence"
                                  name="residence"
                                  value={value3?.residence}
                                  className=" rounded-lg w-full"
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>
                            </div>

                            <div className="flex w-full">
                              <div className="mb-6 w-full try">
                                <label
                                  for="perState"
                                  className="block mb-0  font-medium "
                                >
                                  Permanent state
                                </label>
                                <select
                                  className="rounded-lg  w-full"
                                  name="perState"
                                  value={value3?.perState}
                                  id="perState"
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                >
                                  <option>Permanent State</option>
                                  <option>Jharkhand</option>
                                </select>
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="perCity"
                                  className="block mb-0  font-medium"
                                >
                                  Permanent city
                                </label>
                                <input
                                  type="text"
                                  id="perCity"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="perCity"
                                  value={value3?.perCity}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="perPin"
                                  className="block mb-0 font-medium"
                                >
                                  Permanent Area Pincode
                                </label>
                                <input
                                  type="text"
                                  id="perPin"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="perPin"
                                  value={value3?.perPin}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>
                            </div>

                            <div className="flex w-full">
                              <div className="mb-6 w-full try">
                                <label
                                  for="Martial"
                                  className="block mb-0  font-medium "
                                >
                                  Marital status
                                </label>
                                <select
                                  className="rounded-lg w-full"
                                  name="Martial"
                                  id="Martial"
                                  value={value3?.Martial}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                >
                                  <option>Martial Status</option>
                                  <option>Married</option>
                                  <option>UnMarried</option>
                                </select>
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="nationality"
                                  className="block mb-0  font-medium"
                                >
                                  Nationality
                                </label>
                                <select
                                  className="rounded-lg  w-full"
                                  name="nationality"
                                  id="nationality"
                                  value={value3?.nationality}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                >
                                  <option>Nationality</option>
                                  <option>india</option>
                                </select>
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="Mother"
                                  className="block mb-0 font-medium"
                                >
                                  Mother name
                                </label>
                                <input
                                  type="text"
                                  id="Mother"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="Mother"
                                  value={value3?.Mother}
                                  onChange={(e) => {
                                    handleChange(e, "form3");
                                  }}
                                  disabled={value3.status}
                                />
                              </div>
                            </div>

                            {/* <div className="inputs-buttons inputs-button2">
                              <button
                                onClick={() => {
                                  handleEdit("form3");
                                }}
                                type="button"
                                className="edit"
                              >
                                <img src={edit} alt="" /> <span>Edit</span>{" "}
                              </button>
                              <button
                                onClick={() => {
                                  handleSave("form3");
                                }}
                                type="button"
                                className="save"
                              >
                                Save
                              </button>
                            </div> */}
                          </div>
                        </div>
                      </div>

                      <div className="basic-information mt-7">
                        <div className="basics">
                          <h3>Professional Information</h3>
                          <img src={lower} alt="lower" />
                        </div>
                        <hr className="upper" />
                        <div className="form2-class">
                          <div className="w-full mt-2">
                            <div className="flex w-full">
                              <div className="mb-6 w-full try">
                                <label
                                  for="qualification"
                                  className="block mb-0  font-medium "
                                >
                                  Qualification
                                </label>
                                <input
                                  type="text"
                                  id="qualification"
                                  className="w-full rounded-lg"
                                  // required
                                  name="qualification"
                                  value={value4?.qualification}
                                  onChange={(e) => {
                                    handleChange(e, "form4");
                                  }}
                                  disabled={value4.status}
                                />
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="specialization"
                                  className="block mb-0  font-medium"
                                >
                                  Specialization
                                </label>
                                <input
                                  type="text"
                                  id="specialization"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="specialization"
                                  value={value4?.specialization}
                                  onChange={(e) => {
                                    handleChange(e, "form4");
                                  }}
                                  disabled={value4.status}
                                />
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="qualificationType"
                                  className="block mb-0 font-medium"
                                >
                                  Qualification Type
                                </label>
                                <select
                                  className="rounded-lg  w-full"
                                  name="qualificationType"
                                  id="qualificationType"
                                  value={value4?.qualificationType}
                                  onChange={(e) => {
                                    handleChange(e, "form4");
                                  }}
                                  disabled={value4.status}
                                >
                                  <option>Qualification Type</option>
                                  <option>M.sc</option>
                                  <option>B.sc</option>
                                  <option>10th</option>
                                  <option>12th</option>

                                </select>
                              </div>
                            </div>

                            <div className="flex w-full">
                              <div className="mb-6 w-full try">
                                <label
                                  for="yearPass"
                                  className="block mb-0 font-medium"
                                >
                                  Year of passing •
                                </label>
                                <select
                                  className="rounded-lg  w-full"
                                  name="yearPass"
                                  id="yearPass"
                                  value={value4?.yearPass}
                                  onChange={(e) => {
                                    handleChange(e, "form4");
                                  }}
                                  disabled={value4.status}
                                >
                                  <option>year of passing</option>
                                  <option>2000</option>
                                  <option>2001</option>
                                  <option>2002</option>
                                  <option>2003</option>
                                  <option>2004</option>
                                  <option>2005</option>
                                  <option>2006</option>
                                  <option>2007</option>
                                  <option>2008</option>
                                  <option>2009</option>
                                  <option>2010</option>
                                  <option>2011</option>
                                  <option>2012</option>
                                  <option>2013</option>
                                  <option>2014</option>
                                  <option>2015</option>
                                  <option>2016</option>
                                  <option>2017</option>
                                  <option>2018</option>
                                  <option>2019</option>
                                  <option>2020</option>
                                  <option>2021</option>
                                </select>
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="university"
                                  className="block mb-0  font-medium"
                                >
                                  University/Board •
                                </label>
                                <input
                                  type="text"
                                  id="university"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="university"
                                  value={value4?.university}
                                  onChange={(e) => {
                                    handleChange(e, "form4");
                                  }}
                                  disabled={value4.status}
                                />
                              </div>


                              <div className="mb-6 w-full try">
                                <label
                                  for="college"
                                  className="block mb-0  font-medium"
                                >
                                  College/School •
                                </label>
                                <input
                                  type="text"
                                  id="college"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="college"
                                  value={value4?.college}
                                  onChange={(e) => {
                                    handleChange(e, "form4");
                                  }}
                                  disabled={value4.status}
                                />
                              </div>

                            </div>

                            <div className="flex w-full">
                              <div className="mb-6 w-full try">
                                <label
                                  for="percentage"
                                  className="block mb-0  font-medium"
                                >
                                  Grade/CCPA/Percentage
                                </label>
                                <input
                                  type="text"
                                  id="percentage"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="percentage"
                                  value={value4?.percentage}
                                  onChange={(e) => {
                                    handleChange(e, "form4");
                                  }}
                                  disabled={value4.status}
                                />
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="previousCompany"
                                  className="block mb-0  font-medium"
                                >
                                  Previous Company •
                                </label>
                                <input
                                  type="text"
                                  id="previousCompany"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="previousCompany"
                                  value={value4?.previousCompany}
                                  onChange={(e) => {
                                    handleChange(e, "form4");
                                  }}
                                  disabled={value4.status}
                                />
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="previousDesignation"
                                  className="block mb-0  font-medium"
                                >
                                  Previous Designation •
                                </label>
                                <input
                                  type="text"
                                  id="previousDesignation"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="previousDesignation"
                                  value={value4?.previousDesignation}
                                  onChange={(e) => {
                                    handleChange(e, "form4");
                                  }}
                                  disabled={value4.status}
                                />
                              </div>
                            </div>

                            <div className="flex w-full">
                              <div className="mb-6 w-full try">
                                <label
                                  for="toDate"
                                  className="block mb-0  font-medium"
                                >
                                  To date •
                                </label>
                                <input
                                  type="date"
                                  id="toDate"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="toDate"
                                  value={value4?.toDate}
                                  onChange={(e) => {
                                    handleChange(e, "form4");
                                  }}
                                  disabled={value4.status}
                                />
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="fromDate"
                                  className="block mb-0  font-medium"
                                >
                                  From date*
                                </label>
                                <input
                                  type="date"
                                  id="fromDate"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="fromDate"
                                  value={value4?.fromDate}
                                  onChange={(e) => {
                                    handleChange(e, "form4");
                                  }}
                                  disabled={value4.status}
                                />
                              </div>
                              <div className="mb-6 w-full try">
                                <label
                                  for="numberOfMonth"
                                  className="block mb-0  font-medium"
                                >
                                  Number of months *
                                </label>
                                <input
                                  type="text"
                                  id="numberOfMonth"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="numberOfMonth"
                                  value={value4?.numberOfMonth}
                                  onChange={(e) => {
                                    handleChange(e, "form4");
                                  }}
                                  disabled={value4.status}
                                />
                              </div>
                            </div>

                            <div className="flex w-full">
                              <div className="mb-6 w-full try">
                                <label
                                  for="Jobdescription"
                                  className="block mb-0  font-medium"
                                >
                                  Job description
                                </label>
                                <input
                                  type="text"
                                  id="Jobdescription"
                                  className="rounded-lg  w-full Jobdescription"
                                  // required
                                  name="Jobdescription"
                                  value={value4?.Jobdescription}
                                  onChange={(e) => {
                                    handleChange(e, "form4");
                                  }}
                                  disabled={value4.status}
                                />
                              </div>
                            </div>
                           
                          </div>
                        </div>
                      </div>

                      <div className="basic-information mt-7">
                        <div className="basics">
                          <h3>Bank Account Information</h3>
                          <img src={lower} alt="lower" />
                        </div>
                        <hr className="upper" />
                        <div className="form2-class">
                          <div className="w-full mt-2">
                            <div className="flex w-full">

                              <div className="mb-6 w-full try">
                                <label
                                  for="SalaryPay"
                                  className="block mb-0  font-medium "
                                >
                                  Salary Pay Mode
                                </label>
                                <input
                                  type="text"
                                  id="SalaryPay"
                                  className="w-full rounded-lg"
                                  
                                  name="SalaryPay"
                                  value={value5?.SalaryPay}
                                  onChange={(e) => {
                                    handleChange(e, "form5");
                                  }}
                                  disabled={value5.status}
                                />
                              </div>

                              <div className="mb-6 w-full try">
                                <label
                                  for="SalaryBankName"
                                  className="block mb-0  font-medium"
                                >
                                  Salary Bank Name
                                </label>
                                <input
                                  type="text"
                                  id="SalaryBankName"
                                  className="rounded-lg  w-full"
                                  name="SalaryBankName"
                                  value={value5?.SalaryBankName}
                                  onChange={(e) => {
                                    handleChange(e, "form5");
                                  }}
                                  disabled={value5.status}
                                />
                              </div>

                              <div className="mb-6 w-full try">
                                <label
                                  for="BeneficiaryName"
                                  className="block mb-0 font-medium"
                                >
                                  Beneficiary Name
                                </label>

                                <input
                                  type="text"
                                  id="BeneficiaryName"
                                  className="rounded-lg  w-full"
                                  name="BeneficiaryName"
                                  value={value5?.BeneficiaryName}
                                  onChange={(e) => {
                                    handleChange(e, "form5");
                                  }}
                                  disabled={value5.status}
                                />
                              </div>

                            </div>

                            <div className="flex w-full">
                              <div className="mb-6 w-full try">
                                <label
                                  for="BankIfsc"
                                  className="block mb-0 font-medium"
                                >
                                  Bank IFSC Code
                                </label>
                                <input
                                  type="text"
                                  id="BankIfsc"
                                  className="rounded-lg  w-full"
                                  name="BankIfsc"
                                  value={value5?.BankIfsc}
                                  onChange={(e) => {
                                    handleChange(e, "form5");
                                  }}
                                  disabled={value5.status}
                                />
                              </div>

                              <div className="mb-6 w-full try">
                                <label
                                  for="AccountNumber"
                                  className="block mb-0  font-medium"
                                >
                                  Account Number
                                </label>
                                <input
                                  type="text"
                                  id="AccountNumber"
                                  className="rounded-lg w-full"
                                
                                  name="AccountNumber"
                                  value={value5?.AccountNumber}
                                  onChange={(e) => {
                                    handleChange(e, "form5");
                                  }}
                                  disabled={value5.status}
                                />
                              </div>

                              <div className="mb-6 w-full try">
                                <label
                                  for="confirmAccount"
                                  className="block mb-0  font-medium"
                                >
                                  Confirm Account Number
                                </label>
                                <input
                                  type="text"
                                  id="confirmAccount"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="confirmAccount"
                                  value={value5?.confirmAccount}
                                  onChange={(e) => {
                                    handleChange(e, "form5");
                                  }}
                                  disabled={value5.status}
                                />
                              </div>

                            </div>

                            <div className="flex">
                              <div className="mb-6 w-[30%] try">
                                <label
                                  for="Branch"
                                  className="block mb-0  font-medium"
                                >
                                  Bank Branch
                                </label>
                                <input
                                  type="text"
                                  id="Branch"
                                  className="rounded-lg  w-full"
                                  // required
                                  name="Branch"
                                  value={value5?.Branch}
                                  onChange={(e) => {
                                    handleChange(e, "form5");
                                  }}
                                  disabled={value5.status}
                                />
                              </div>
                             
                            </div>

                          </div>
                        </div>
                      </div>

                      {/* this is documents */}
                      <div className="basic-information mt-7">
                        <div className="basics">
                          <h3>Documents</h3>
                          <img src={lower} alt="lower" />
                        </div>
                        <hr className="upper" />
                        <div className="form2-class">
                          <div className="w-full mt-6">

                            <div className="flex w-full">

                              <div className="drag-area try">
                                <div className="icon">
                                  <i className="fas fa-cloud-upload-alt"></i>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                  <header>3 Month salary Slips</header>
                                  <span>Select or drop Your Files Here</span>
                                </div>
                                <input
                                 
                                 name="monthSalary"
                                  onChange={handleFileChange}
                                  className="filesjila w-full"
                                  type="file"
                                />
                              </div>

                              <div className="drag-area try">
                                <div className="icon">
                                  <i className="fas fa-cloud-upload-alt"></i>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                  <header>Aadhar Card (Both Sides)</header>
                                  <span>Select or drop Your Files Here</span>
                                </div>
                                <input
                               
                               className="filesjila w-full"
                               name = "adharCard"
                                  type="file"
                                  onChange={handleFileChange}
                                />
                              </div>

                              <div className="drag-area try">
                                <div className="icon">
                                  <i className="fas fa-cloud-upload-alt"></i>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                  <header>Cancelled Cheque</header>
                                  <span>Select or drop Your Files Here</span>
                                </div>

                                <input
                                  className="filesjila w-full"
                                  type="file"
                            
                                  name="cancelCheque"
                                  onChange={handleFileChange}
                                />
                              </div>

                            </div>

                            <div className="flex w-full mt-6">
                              
                              <div className="drag-area try">
                                <div className="icon">
                                  <i className="fas fa-cloud-upload-alt"></i>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                  <header>PAN Card</header>
                                  <span>Select or drop Your Files Here</span>
                                </div>

                                <input
                                  className="filesjila w-full"
                                  type="file"
                                
                                  name="pancard"
                                  onChange={handleFileChange}
                                />
                              </div>

                              <div className="drag-area try">
                                <div className="icon">
                                  <i className="fas fa-cloud-upload-alt"></i>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                  <header>Education Certificate</header>
                                  <span>Select or drop Your Files Here</span>
                                </div>

                                <input
                                  className="filesjila w-full"
                                  type="file"
                                 
                          
                                  name="educationCert"
                                  onChange={handleFileChange}
                                />
                              </div>

                              <div className="drag-area try">
                                <div className="icon">
                                  <i className="fas fa-cloud-upload-alt"></i>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                  <header>Previous organization Offer </header>
                                  <span>Select or drop Your Files Here</span>
                                </div>

                                <input
                                name="prevOrgOffer"
                                  className="filesjila w-full"
                                  type="file"
                                  onChange={handleFileChange}
                                />
                              </div>

                            </div>

                            <div className="flex w-full mt-6">

                              {/* <div className="drag-area drag-area2 try">
                                <div className="icon">
                                  <i className="fas fa-cloud-upload-alt"></i>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                  <header>PAN Card</header>
                                  <span>Select or drop Your Files Here</span>
                                </div>

                                <input
                                  className="filesjila w-full"
                                  type="file"
                                  onChange={handleFileChange}
                                />
                              </div> */}

                              {/* <div className="inputs-buttons inputs-button2">
                                <button
                                  onClick={() => {
                                    handleEdit("form5");
                                  }}
                                  type="button"
                                  className="edit delete"
                                >
                                  <img src={del} alt="del" /> <span>Clear</span>{" "}
                                </button>
                                <button
                                 
                                  type="button"
                                  className="save"
                                >
                                  Save
                                </button>
                              </div> */}

                            </div>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className=" flex items-center justify-center mt-5">
                    <button
                      type="submit"
                      className="text-white outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  font-semibold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Register
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeManage;
