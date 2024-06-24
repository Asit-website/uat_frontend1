import React from 'react'
import MainContext from './MainContext';
import { deleteReq, get, post, put, postDocuments } from '../Api/api'
import { useState } from 'react';

// const baseUrl = "http://localhost:5000";

// const baseUrl = "https://hrms-backend-code.onrender.com"

// const baseUrl = "http://localhost:5000";

// const baseUrl = "https://hrms-backend-q2ta.onrender.com";

// this is production baseurl 

const baseUrl = "https://hmsbackend.kusheldigi.com";

// const baseUrl = "https://hrms-backend-g3wt.onrender.com";

// const baseUrl = "https://hr-backend-ncrd.onrender.com"


const MainState = (props) => {
   const [user, setUser] = useState({});
   const [flag, setFlag] = useState(false);
   const [chatUser, setChatUser] = useState({});

   const login = async ({ email, employeeCode, password }) => {

      const data = await post(`${baseUrl}/auth/login`, { email, employeeCode, password }, false);

      return data;
   };

   const employeeLogin = async ({ email, password }) => {
      const data = await post(`${baseUrl}/user/login`, { email, password }, false);
      return data;
   };

   // todo
   const employeeResetPassword = async ({ email, password }) => {
      const data = await post(`${baseUrl}/user/resetPassword`, {}, false);
      return data;
   };

   const hrLogin = async ({ email, password }) => {
      const data = await post(`${baseUrl}/hr/login`, { email, password }, false);
      return data;
   };

   const createHr = async ({ fullName, password, department, gmail, reportingManager, designation, joiningDate, email, email1, mobile, gender, dob, pan, adhar, father, currentAddress, currentState, currentCity, currentPin, residence, perState, perCity, perPin, Martial, nationality, Mother, qualification, specialization, qualificationType, yearPass, university, college, percentage, previousCompany, previousDesignation, toDate, fromDate, numberOfMonth, Jobdescription, SalaryPay, SalaryBankName, BeneficiaryName, BankIfsc, AccountNumber, confirmAccount, Branch, employeeCode, }) => {
      const data = await post(`${baseUrl}/admin/createHr`, {
         fullName,
         password,
         department,
         gmail,
         reportingManager,
         designation,
         joiningDate,
         email,
         email1,
         mobile,
         gender,
         dob,
         pan,
         adhar,
         father,
         currentAddress,
         currentState,
         currentCity,
         currentPin,
         residence,
         perState,
         perCity,
         perPin,
         Martial,
         nationality,
         Mother,
         employeeCode,
         qualification,
         specialization,
         qualificationType,
         yearPass,
         university,
         college,
         percentage,
         previousCompany,
         previousDesignation,
         toDate,
         fromDate,
         numberOfMonth,
         Jobdescription,
         SalaryPay,
         SalaryBankName,
         BeneficiaryName,
         BankIfsc,
         AccountNumber,
         confirmAccount,
         Branch
      }, true);
      return data;
   };

   const getHrs = async () => {
      const data = await post(`${baseUrl}/hr/getHrs`, true);
      return data;
   };

   const deleteHr = async () => {
      const data = await deleteReq(`${baseUrl}/hr/deleteHr`, true);
      return data;
   };

   const createEmployee = async ({ fullName, password, department, employeeId, gmail, reportingManager, designation, joiningDate, email, email1, mobile, gender, dob, pan, adhar, father, currentAddress, currentState, currentCity, currentPin, residence, perState, perCity, perPin, Martial, nationality, Mother, employeeCode, qualification, specialization, qualificationType, yearPass, university, college, percentage, previousCompany, previousDesignation, toDate, fromDate, numberOfMonth, Jobdescription, SalaryPay, SalaryBankName, BeneficiaryName, BankIfsc, AccountNumber, confirmAccount, Branch }) => {
      const data = await post(`${baseUrl}/hr/createUser`, {
         fullName,
         password,
         department,
         employeeId,
         gmail,
         reportingManager,
         designation,
         joiningDate,
         email,
         email1,
         mobile,
         gender,
         dob,
         pan,
         adhar,
         father,
         currentAddress,
         currentState,
         currentCity,
         currentPin,
         residence,
         perState,
         perCity,
         perPin,
         Martial,
         nationality,
         Mother,
         employeeCode,
         qualification,
         specialization,
         qualificationType,
         yearPass,
         university,
         college,
         percentage,
         previousCompany,
         previousDesignation,
         toDate,
         fromDate,
         numberOfMonth,
         Jobdescription,
         SalaryPay,
         SalaryBankName,
         BeneficiaryName,
         BankIfsc,
         AccountNumber,
         confirmAccount,
         Branch
      }, true);
      return data;
   };

   const createEmployee1 = async ({ fullName, password, department, employeeId, gmail, reportingManager, designation, joiningDate, email, email1, mobile, gender, dob, pan, adhar, father, currentAddress, currentState, currentCity, currentPin, residence, perState, perCity, perPin, Martial, nationality, Mother, employeeCode, qualification, specialization, qualificationType, yearPass, university, college, percentage, previousCompany, previousDesignation, toDate, fromDate, numberOfMonth, Jobdescription, SalaryPay, SalaryBankName, BeneficiaryName, BankIfsc, AccountNumber, confirmAccount, Branch, adharCard, formData, employeeType }) => {


      const data = await post(`${baseUrl}/admin/createUser1`, { fullName, password, department, employeeId, gmail, reportingManager, designation, joiningDate, email, email1, mobile, gender, dob, pan, adhar, father, currentAddress, currentState, currentCity, currentPin, residence, perState, perCity, perPin, Martial, nationality, Mother, employeeCode, qualification, specialization, qualificationType, yearPass, university, college, percentage, previousCompany, previousDesignation, toDate, fromDate, numberOfMonth, Jobdescription, SalaryPay, SalaryBankName, BeneficiaryName, BankIfsc, AccountNumber, confirmAccount, Branch, adharCard, employeeType }, true);

      const { _id } = data?.data?.adminUser;

      if (formData) {

         const resp = await postDocuments(`${baseUrl}/user/uploadDocument/${_id}`, formData);

      }

      return data;

   };

   const getUsers = async (userId) => {
      const data = await get(`${baseUrl}/user/getUsers?userId=${userId}`, true);
      return data;
   };

   const getActiveUsers = async (userId) => {
      const data = await get(`${baseUrl}/user/getActiveUsers`, true);
      console.log("daa ", data);
      return data;
   };

   const getActiveUsersCount = async (userId) => {
      const data = await get(`${baseUrl}/user/getActiveUsersCount?userId=${userId}`, true);
      console.log(data);
      return data;
   };

   const getEmployees = async (userId) => {
      const data = await get(`${baseUrl}/hr/getUsers?userId=${userId}`, true);
      return data;
   };

   const getAdminEmployees = async (userId) => {
      const data = await get(`${baseUrl}/admin/getAdminEmployees?userId=${userId}`, true);
      return data;
   };

   const getEmployeesByEmployee = async () => {
      const data = await get(`${baseUrl}/user/getEmployeesByEmployee`, true);
      return data;
   };

   const getAllActivities = async () => {

      const data = await get(`${baseUrl}/clock/allAttendence`, true);

      return data;



   };

   const getAllActivities2 = async (type, date, month, userId, department) => {

      const data = await post(`${baseUrl}/clock/attendencedetail`, { type, date, month, userId, department }, true);

      return data;
   };

   const postActivity = async ({ clockIn, clockOut, late, overtime, total, message = '', date1 }) => {

      const data = await post(`${baseUrl}/activity/postActivity`, { clockIn, clockOut, date1, late, overtime, total, message }, true);
      return data;
   };

   const postActivityHr = async ({ date, activity, breaks, overtime, hours }) => {
      const data = await post(`${baseUrl}/activity/postActivityHr`, { date, activity, breaks, overtime, hours }, true);
      return data;
   };

   const getActivitiesByUser = async (date, month, year, page, perPage, userId) => {
      if (date && date.includes('undefined')) {
         date = '';
      }

      const data = await get(`${baseUrl}/activity/getActivitiesByUser?date=${date}&month=${month}&year=${year}&perPage=${perPage}&page=${page}&userId=${userId}`, true);
      return data;
   };

   const getStatisticsByUser = async (userId) => {
      const data = await get(`${baseUrl}/activity/getStatisticsByUser?userId=${userId}`, true);
      return data;
   };

   // this is  for leave post

   const postLeave = async ({ type, from, to, days, reason }) => {

      const data = await post(`${baseUrl}/leave/postLeave`, { type, from, to, days, reason }, true);
      return data;
   };


   // end 

   const updateLeave = async ({ id, type, from, to, days, reason, employeeName }) => {

      const data = await put(`${baseUrl}/leave/updateLeave/${id}`, { type, from, to, days, reason, employeeName }, true);
      return data;
   };

   const getUserLeaves = async () => {
      const data = await get(`${baseUrl}/leave/getUserLeaves`, true);
      return data;
   };

   const getUserLeaveById = async (id) => {
      const data = await get(`${baseUrl}/leave/getUserLeaveById/${id}`, true);
      return data;
   };

   const deleteLeave = async (id) => {

      const data = await deleteReq(`${baseUrl}/leave/deleteLeave/${id}`, true);
      return data;
   };

   const getTotalLeaves = async () => {
      const data = await get(`${baseUrl}/totalLeave/getTotalLeaves`, true);
      return data;
   };

   const getTotalLeavesCount = async () => {
      const data = await get(`${baseUrl}/leave/getToalLeaveCount`, true);
      return data;
   }

   const postTotalLeaves = async ({ totalLeaves }) => {
      const data = await post(`${baseUrl}/totalLeave/postTotalLeaves`, { totalLeaves }, true);
      return data;
   };

   const getProjects = async (projectName, employeeName, page, perPage, id) => {
      const data = await get(`${baseUrl}/project/getProjects?projectName=${projectName}&employeeName=${employeeName}&page=${page}&perPage=${perPage}&projectId=${id}`, true);
      return data;
   };

   const getProjectsByEmployee = async (page, perPage, query) => {
      const data = await get(`${baseUrl}/project/getProjectsByEmployee?page=${page}&perPage=${perPage}&query=${query}`, true);
      return data;
   };

   const postProject = async ({ projectName, client, startDate, endDate, price, priority, projectLeader, teamMembers, description }) => {
      const data = await post(`${baseUrl}/project/postProject`, { projectName, client, startDate, endDate, price, priority, projectLeader, teamMembers, description }, true);
      return data;
   };

   const updateProject = async ({ _id, projectName, client, startDate, endDate, price, priority, projectLeader, teamMembers, status, description }) => {
      const data = await put(`${baseUrl}/project/updateProject/${_id}`, { projectName, client, startDate, endDate, price, priority, projectLeader, teamMembers, status, description }, true);
      return data;
   };

   const deleteProject = async ({ id }) => {
      const data = await deleteReq(`${baseUrl}/project/deleteProject/${id}`, true);
      return data;
   };

   const getHolidays = async () => {
      const data = await get(`${baseUrl}/holiday/getHolidays`, true);
      return data;
   };

   const postHoliday = async ({ holidayName, holidayDate }) => {
      const data = await post(`${baseUrl}/holiday/postHoliday`, { holidayName, holidayDate }, true);
      return data;
   };

   const updateHoliday = async ({ _id, holidayName, holidayDate }) => {
      console.log(_id, holidayName, holidayDate);
      const data = await put(`${baseUrl}/holiday/updateHoliday/${_id}`, { holidayName, holidayDate }, true);
      return data;
   };

   const deleteHoliday = async ({ id }) => {
      const data = await post(`${baseUrl}/holiday/deleteHoliday/${id}`, true);
      return data;
   };

   const verify = async (role) => {
      const data = await post(`${baseUrl}/verify`, { role }, true);
      return data;
   };

   const verifyEmployee = async () => {
      const data = await post(`${baseUrl}/verify/employee`, {}, true);
      return data;
   };

   const verifyHr = async () => {
      const data = await post(`${baseUrl}/verify/hr`, {}, true);
      return data;
   };

   const verifyAdmin = async () => {
      const data = await post(`${baseUrl}/verify/admin`, {}, true);
      return data;
   };

   const getTasks = async () => {
      const data = await get(`${baseUrl}/task/getTasks`, true);
      return data;
   };

   const postTask = async ({ name, time }) => {
      const data = await post(`${baseUrl}/task/postTask`, { name, time }, true);
      return data;
   };

   const updateTask = async ({ id, status }) => {
      const data = await put(`${baseUrl}/task/updateTask/${id}`, { status }, true);
      return data;
   };

   const deleteTask = async ({ id }) => {
      const data = await deleteReq(`${baseUrl}/task/deleteTask/${id}`, true);
      return data;
   };

   const forgetPassword = async ({ email, employeeCode }) => {
      const data = await post(`${baseUrl}/user/forgetPassword`, { email, employeeCode }, false);
      return data;
   };

   const forgetPassword1 = async ({ email, otp }) => {
      const data = await post(`${baseUrl}/user/forgetPassword1`, { email, otp }, false);
      return data;
   };

   const forgetPassword2 = async ({ email, password }) => {
      const data = await post(`${baseUrl}/user/forgetPassword2`, { email, password }, false);
      return data;
   };

   const changePassword = async ({ oldPassword, currentPassword }) => {
      const data = await post(`${baseUrl}/user/changePassword`, { oldPassword, currentPassword }, true);
      return data;
   };

   const changePassword1 = async ({ oldPassword, currentPassword }) => {
      const data = await post(`${baseUrl}/auth/changePassword`, { oldPassword, currentPassword }, true);
      return data;
   };

   const updateProfile = async (
      {
         fullName,
         mobile,
         email,
         email1,
         password,
         gmail,
         department,
         designation,
         joiningDate,
         pan,
         adhar,
         father,
         currentAddress,
         currentState,
         currentCity,
         qualification,
         currentPin,
         residence,
         perState,
         perCity,
         perPin,
         Martial,
         nationality,
         Mother,
         specialization,
         qualificationType,
         yearPass,
         university,
         college,
         percentage,
         previousCompany,
         previousDesignation,
         toDate,
         fromDate,
         numberOfMonth,
         Jobdescription,
         SalaryPay,
         SalaryBankName,
         BeneficiaryName,
         BankIfsc,
         AccountNumber,
         confirmAccount,
         Branch,
         image,
         _id,


      }) => {

      const data = await put(`${baseUrl}/user/updateProfile`, {
         fullName,
         mobile,
         email,
         email1,
         password,
         gmail,
         department,
         designation,
         joiningDate,
         pan,
         adhar,
         father,
         currentAddress,
         currentState,
         currentCity,
         qualification,
         currentPin,
         residence,
         perState,
         perCity,
         perPin,
         Martial,
         nationality,
         Mother,
         specialization,
         qualificationType,
         yearPass,
         university,
         college,
         percentage,
         previousCompany,
         previousDesignation,
         toDate,
         fromDate,
         numberOfMonth,
         Jobdescription,
         SalaryPay,
         SalaryBankName,
         BeneficiaryName,
         BankIfsc,
         AccountNumber,
         confirmAccount,
         Branch,
         image
      }, true);

      if (image) {
         const formdata = new FormData();
         formdata.append("image", image);
         const resp = await postDocuments(`${baseUrl}/user/updateProfile/${_id}`, formdata);

      }
      return data;
   };


   const updateAdminProfile = async ({ fullName, dob, mobile, email, password, employeeCode }) => {
      const data = await put(`${baseUrl}/admin/updateAdmin`, { fullName, dob, mobile, email, password, employeeCode }, true);
      return data;
   };

   const getChats = async () => {
      const data = await get(`${baseUrl}/chat/getChats`, true);
      return data;
   };

   const getChat = async ({ id }) => {
      const data = await get(`${baseUrl}/chat/getChat/${id}`, true);
      return data;
   };

   const getChatByUser = async ({ userId }) => {
      const data = await get(`${baseUrl}/chat/getChatByUser?userId=${userId}`, true);
      return data;
   };

   const createNewChat = async ({ user, message }) => {
      const data = await post(`${baseUrl}/chat/createNewChat`, { user, message }, true);
      return data;
   };

   const postMessage = async ({ id, message }) => {
      const data = await put(`${baseUrl}/chat/postMessage/${id}`, { message }, true);
      return data;
   };

   const deleteChat = async ({ id }) => {
      const data = await deleteReq(`${baseUrl}/chat/deleteChat/${id}`, true);
      return data;
   };

   const adminLogin = async ({ email, password }) => {
      const data = await post(`${baseUrl}/admin/loginAdmin`, { email, password }, false);
      return data;
   };

   const topDash = async () => {
      const data = await get(`${baseUrl}/admin/topDash`, true);
      return data;
   };

   const postAnnouncement = async ({ image, message, date }) => {
      const data = await post(`${baseUrl}/announcement/postAnnouncement`, { image, message, date }, true);
      return data;
   };

   const updateAnnouncement = async ({ image, message, date, _id }) => {
      const data = await put(`${baseUrl}/announcement/updateAnnouncement/${_id}`, { image, message, date }, true);
      return data;
   };

   const getAnnouncements = async (page, perPage, date) => {
      const data = await get(`${baseUrl}/announcement/getAnnouncements?page=${page}&perPage=${perPage}&date=${date}`, true);
      return data;
   };

   const getAnnouncementDates = async () => {
      const data = await get(`${baseUrl}/announcement/getAnnouncementDates`, true);
      return data;
   };

   const deleteAnnouncement = async ({ id }) => {
      const data = await deleteReq(`${baseUrl}/announcement/deleteAnnouncement/${id}`, true);
      return data;
   };

   const getAttendance = async () => {
      const data = await get(`${baseUrl}/attendance/getAttendance`, true);
      return data;
   };

   const getAttendanceByUser = async (userId, date, month, year, page, perPage) => {
      const data = await get(`${baseUrl}/attendance/getAttendanceByUser?userId=${userId}&date=${date}&month=${month}&year=${year}&page=${page}&perPage=${perPage}`, true);
      return data;
   };

   const updateUser = async (userId, value1, value2, value3, value4, value5) => {
      console.log({ ...value2 });
      const data = await put(`${baseUrl}/user/updateUser/${userId}`, { ...value1, ...value2, ...value3, ...value4, ...value5 }, true);
      return data;
   };

   // , adharCard ,   cancelCheque, pancard,educationCert, prevOrgOffer

   const uploadDocuments = async (id, formData) => {

      const data = await postDocuments(`${baseUrl}/user/uploadDocument/${id}`, formData, true);
      return data;

   }

   const getLeaveTypes = async () => {
      const data = await get(`${baseUrl}/system/getLeaveTypes`, true);
      return data;
   };

   const postLeaveType = async ({ name, days }) => {
      const data = await post(`${baseUrl}/system/postLeaveType`, { name, days }, true);
      return data;
   };

   const updateLeaveType = async ({ id, status, days, name }) => {
      const data = await put(`${baseUrl}/system/updateLeaveType/${id}`, { name, days, status }, true);
      return data;
   };

   const deleteLeaveType = async (id) => {
      const data = await deleteReq(`${baseUrl}/system/deleteLeaveType/${id}`, true);
      return data;
   };

   const getBranchs = async () => {
      const data = await get(`${baseUrl}/system/getBranchs`, true);
      return data;
   };

   const postBranch = async ({ name }) => {
      const data = await post(`${baseUrl}/system/postBranch`, { name }, true);
      return data;
   };

   const updateBranch = async ({ id, status, name }) => {
      const data = await put(`${baseUrl}/system/updateBranch/${id}`, { name, status }, true);
      return data;
   };

   const deleteBranch = async (id) => {
      const data = await deleteReq(`${baseUrl}/system/deleteBranch/${id}`, true);
      return data;
   };

   const getDepartments = async () => {
      const data = await get(`${baseUrl}/system/getDepartments`, true);
      return data;
   };

   const postDepartment = async ({ name, branch }) => {
      const data = await post(`${baseUrl}/system/postDepartment`, { name, branch }, true);
      return data;
   };

   const updateDepartment = async ({ id, status, name }) => {
      const data = await put(`${baseUrl}/system/updateDepartment/${id}`, { status, name }, true);
      return data;
   };

   const deleteDepartment = async (id) => {
      const data = await deleteReq(`${baseUrl}/system/deleteDepartment/${id}`, true);
      return data;
   };

   const getDesingation = async ({ id }) => {
      const data = await get(`${baseUrl}/system/getDesignations/${id}`, true);
      return data;
   };

   const getEmp = async ({ id }) => {
      const data = await get(`${baseUrl}/system/getEmployeess/${id}`, true);
      return data;
   };


   const getDesignations = async () => {
      const data = await get(`${baseUrl}/system/getDesignation`, true);
      return data;
   }

   const postDesignation = async ({ name, department }) => {
      console.log(department);
      const data = await post(`${baseUrl}/system/postDesignation`, { name, department }, true);
      return data;
   };

   const updateDesignation = async ({ id, status, name }) => {
      const data = await put(`${baseUrl}/system/updateDesignation/${id}`, { status, name }, true);
      return data;
   };

   const deleteDesignation = async (id) => {
      const data = await deleteReq(`${baseUrl}/system/deleteDesignation/${id}`, true);
      return data;
   };



   const createIndicator = async ({ Branch, Department, Designation, businessProcessRating, projectManagemntRating }) => {
      const data = await post(`${baseUrl}/admin/postIndi`, { Branch, Department, Designation, businessProcessRating, projectManagemntRating }, true);

      return data;
   }


   const departmentEmployee = async (department) => {
      const data = await post(`${baseUrl}/admin/departmentEmployee`, { department }, true);

      return data;
   }
   const createAppraisal = async ({ Branch,
      SelectMonth,
      Employee,
      remarks }) => {
      const data = await post(`${baseUrl}/admin/postapp`, {
         Branch,
         SelectMonth,
         Employee,
         remarks
      }, true);

      console.log("resp ", data);
      return data;
   }

   const getIndicator = async () => {
      const data = await get(`${baseUrl}/admin/getIndicator`, true);
      return data;
   };

   const getAppraisal = async () => {
      const data = await get(`${baseUrl}/admin/getApp`, true);
      return data;
   };

   const deleteIndicator = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteIndicator/${id}`, true);
      return data;
   };

   const updateIndicator = async ({ id, Branch, Department, Designation, businessProcessRating, projectManagemntRating }) => {
      const data = await put(`${baseUrl}/admin/updateIndicator/${id}`, { Branch, Department, Designation, businessProcessRating, projectManagemntRating }, true);
      return data;
   };

   const allEmployee = async () => {
      const data = await get(`${baseUrl}/admin/fetchEmployee`, true);
      return data;

   }
   const allEmployeebyDep = async () => {
      const data = await get(`${baseUrl}/admin/fetchEmployee`, true);
      return data;

   }

   const deleteApprisal = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteApp/${id}`, true);
      return data;
   };

   const updateApprisal = async ({ id, Branch, SelectMonth, Employee, remarks }) => {
      const data = await put(`${baseUrl}/admin/updateApp/${id}`, { Branch, SelectMonth, Employee, remarks }, true);
      return data;
   };

   const createAssets = async ({ Employee,
      designation,
      department,
      product,
      purchaseDate,
      additonal,
      description
   }) => {
      const data = await post(`${baseUrl}/admin/postAsset`, {
         Employee,
         designation,
         department,
         product,
         purchaseDate,
         additonal,
         description
      }, true);

      console.log("resp ", data);
      return data;
   }

   const getAssets = async () => {
      const data = await get(`${baseUrl}/admin/getAsset`, true);
      return data;
   };

   const deleteAssets = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteAsset/${id}`, true);
      return data;
   };

   const updateAssets = async ({ id, Employee,
      designation,
      department,
      product,
      purchaseDate,
      additonal,
      description }) => {
      const data = await put(`${baseUrl}/admin/updateAsset/${id}`, {
         Employee,
         designation,
         department,
         product,
         purchaseDate,
         additonal,
         description
      }, true);
      return data;
   };

   const deleteUser = async (id) => {
      const data = await deleteReq(`${baseUrl}/user/deactivateUser/${id}`, true);
      return data;
   };


   const createTracks = async ({ Branch, GoalType, startDate, endDate, subject, target, description, status, rating, progress }) => {
      const data = await post(`${baseUrl}/admin/postTrack`, { Branch, GoalType, startDate, endDate, subject, target, description, status, rating, progress }, true);

      console.log("resp ", data);
      return data;
   }

   const getTracks = async () => {
      const data = await get(`${baseUrl}/admin/getTrack`, true);
      return data;
   };

   const deleteTracks = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteTrack/${id}`, true);
      return data;
   };

   const updateTracks = async ({ id, Branch, GoalType, startDate, endDate, subject, target, description, status, rating, progress }) => {
      const data = await put(`${baseUrl}/admin/updateTrack/${id}`, { Branch, GoalType, startDate, endDate, subject, target, description, status, rating, progress }, true);
      return data;
   };

   // ================================announcement===========================
   const createAnnouncement = async ({ title, Branch, Department, Employee, startDate, endDate, description }) => {
      const data = await post(`${baseUrl}/admin/postAnnouncement`, { title, Branch, Department, Employee, startDate, endDate, description }, true);
      return data;
   }

   const updateAnnouncements = async ({ id, title, Branch, Department, Employee, startDate, endDate, description }) => {
      const data = await put(`${baseUrl}/admin/updateAnnouncement/${id}`, { title, Branch, Department, Employee, startDate, endDate, description }, true);
      return data;
   };

   const deleteAnnouncements = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteAnnouncement/${id}`, true);
      return data;
   };

   const fetchAnnoucement = async () => {
      const data = await get(`${baseUrl}/admin/getAnnouncement`, true);
      return data;
   };

   const notificationGet = async () => {
      let user = JSON.parse(localStorage.getItem("hrms_user"));
      const userDetail = user;

      const id = userDetail?._id;

      const data = await get(`${baseUrl}/admin/getAnnouncement/${id}`, true);
      return data;
   }


   const acceptLeave = async (formdata, id, userId, from, to) => {

      const { user, days } = formdata;

      let fullName = user.fullName;

      const data = await post(`${baseUrl}/leave/acceptLeave/${id}`, { fullName, days, userId, startDate: from, endDate: to }, true);

      return data;
   }
   const rejectLeave = async (formdata, id) => {
      const { user } = formdata;
      let fullName = user.fullName;

      const data = await post(`${baseUrl}/leave/rejectLeave/${id}`, { fullName }, true);

      return data;
   }


   const postNotification = async (daysGap, name, username) => {


      const data = await post(`${baseUrl}/notification/createNotification`, { title: `Leave Application from ${username} `, description: `Leave of ${daysGap} days`, users: ["shubham gupta"] }, true);


      return data;

   }
   const postNotifyLeavereq = async (name, title) => {

      const data = await post(`${baseUrl}/notification/createNotification`, { title: `${title} Leave Application`, description: `Leave Application ${title} By Admin `, users: [`${name}`] }, true);

      return data;

   }


   const fetchUserNotify = async () => {
      let user = JSON.parse(localStorage.getItem("hrms_user"));
      const userDetail = user;

      const id = userDetail?._id;

      const data = await get(`${baseUrl}/notification/getNotification/${id}`, true);
      return data;
   }


   const fetchTodayLeave = async () => {

      const data = await get(`${baseUrl}/leave/getTodayLeave`, true);
      return data;

   }

   const fetchUserNotifyHR = async () => {

      const data = await get(`${baseUrl}/notification/getNotification`, true);
      return data;
   }


   const deleteNotification = async (notId) => {
      let user = JSON.parse(localStorage.getItem("hrms_user"));
      const userDetail = user;

      const id = userDetail?._id;

      const data = await deleteReq(`${baseUrl}/notification/deleteNotification/${id}/${notId}`, true);
      return data;
   }

   const createTermination = async ({ Employee,
      type,
      noticeDate,
      terminationDate,
      description }) => {
      const data = await post(`${baseUrl}/admin/postTermination`, {
         Employee,
         type,
         noticeDate,
         terminationDate,
         description
      }, true);

      console.log("resp ", data);
      return data;
   }

   const getTermination = async () => {
      const data = await get(`${baseUrl}/admin/getTermination`, true);
      return data;
   };

   const deleteTermination = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteTermination/${id}`, true);
      return data;
   };

   const updateTermination = async ({ id, Employee,
      type,
      noticeDate,
      terminationDate,
      description }) => {
      const data = await put(`${baseUrl}/admin/updateTermination/${id}`, {
         Employee,
         type,
         noticeDate,
         terminationDate,
         description
      }, true);
      return data;
   };

   // ================warning================

   const createWarning = async ({ warningBy,
      warningTo,
      subject,
      warningDate,
      description }) => {
      const data = await post(`${baseUrl}/admin/postWarning`, {
         warningBy,
         warningTo,
         subject,
         warningDate,
         description
      }, true);

      console.log("resp ", data);
      return data;
   }

   const getWarning = async () => {
      const data = await get(`${baseUrl}/admin/getWarning`, true);
      return data;
   };

   const deleteWarning = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteWarning/${id}`, true);
      return data;
   };

   const updateWarning = async ({ id, warningBy,
      warningTo,
      subject,
      warningDate,
      description }) => {
      const data = await put(`${baseUrl}/admin/updateWarning/${id}`, {
         warningBy,
         warningTo,
         subject,
         warningDate,
         description
      }, true);
      return data;
   };

   // =================complains================

   const createComplain = async ({ complainFrom,
      complainAgain,
      title,
      complainDate,
      description }) => {
      const data = await post(`${baseUrl}/admin/postComplain`, {
         complainFrom,
         complainAgain,
         title,
         complainDate,
         description
      }, true);

      return data;
   }

   const getComplain = async () => {
      const data = await get(`${baseUrl}/admin/getComplain`, true);
      return data;
   };

   const deleteComplain = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteComplain/${id}`, true);
      return data;
   };

   const updateComplain = async ({ id, complainFrom,
      complainAgain,
      title,
      complainDate,
      description }) => {
      const data = await put(`${baseUrl}/admin/updateComplain/${id}`, {
         complainFrom,
         complainAgain,
         title,
         complainDate,
         description
      }, true);
      return data;
   };


   const postAttendence = async ({ clockInDetail, clockOutDetail, id, breakTime, clockInDate }) => {

      const data = await post(`${baseUrl}/clock/createClock/${id}`, {
         clockInDetail, clockOutDetail, date: clockInDate, breakTime
      }, true);

      return data;
   }


   const getAttendence = async ({ id, date }) => {

      const data = await post(`${baseUrl}/clock/getClock/${id}`, {
         date
      }, true);

      return data;
   }

   const createResignation = async ({ Employee,
      noticeDate,
      resignationDate,
      description }) => {
      const data = await post(`${baseUrl}/admin/postResignation`, {
         Employee,
         noticeDate,
         resignationDate,
         description
      }, true);

      return data;
   }

   const getResignation = async () => {
      const data = await get(`${baseUrl}/admin/getResignation`, true);
      return data;
   };

   const deleteResignation = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteResignation/${id}`, true);
      return data;
   };

   const updateResignation = async ({ id, Employee,
      noticeDate,
      resignationDate,
      description }) => {
      const data = await put(`${baseUrl}/admin/updateResignation/${id}`, {
         Employee,
         noticeDate,
         resignationDate,
         description
      }, true);
      return data;
   };

   const createPromotion = async ({ Employee, Designation, title, promotionDate, description }) => {
      const data = await post(`${baseUrl}/admin/postPromotion`, {
         Employee, Designation, title, promotionDate, description
      }, true);

      return data;
   }

   const getPromotion = async () => {
      const data = await get(`${baseUrl}/admin/getPromotion`, true);
      return data;
   };

   const deletePromotion = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deletePromotion/${id}`, true);
      return data;
   };

   const updatePromotion = async ({ id, Employee, Designation, title, promotionDate, description }) => {
      const data = await put(`${baseUrl}/admin/updatePromotion/${id}`, {
         Employee, Designation, title, promotionDate, description
      }, true);
      return data;
   };


   const postAward = async ({ employee, awardType, date, gift, description, rating }) => {

      const data = await post(`${baseUrl}/award/postAward`, {
         employee, awardType, date, gift, description, rating
      }, true);

      return data;
   }

   const getAward = async () => {
      const data = await get(`${baseUrl}/award/getAllAward`, true);
      return data;
   }

   const deleteAward = async (id) => {
      const data = await deleteReq(`${baseUrl}/award/deleteAward/${id}`, true);
      return data;
   };

   const updateAward = async ({ id, employee, awardType, date, gift, description, rating }) => {
      const data = await put(`${baseUrl}/award/updateAward/${id}`, {
         employee, awardType, date, gift, description, rating
      }, true);
      return data;
   };

   const fetchClock = async ({ date, Employee }) => {
      const data = await post(`${baseUrl}/clock/getClockByUser`, {
         date, Employee
      }, true);

      return data;
   }

   const createTransfer = async ({ branch, Employee, Department, TransferDate, Description }) => {
      const data = await post(`${baseUrl}/admin/createTransfer`, {
         branch, Employee, Department, TransferDate, Description
      }, true);

      return data;
   }

   const getTransfer = async () => {
      const data = await get(`${baseUrl}/admin/getTransfer`, true);
      return data;
   }

   const deleteTransfer = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteTransfer/${id}`, true);
      return data;
   };

   const updateTransfer = async ({ id, branch, Employee, Department, TransferDate, Description }) => {
      const data = await put(`${baseUrl}/admin/updateTransfer/${id}`, {
         branch, Employee, Department, TransferDate, Description
      }, true);
      return data;
   };

   const createTrainer = async ({ Branch, firstName, lastName, contact, email, expertise, address }) => {
      const data = await post(`${baseUrl}/admin/postTrainer`, {
         Branch, firstName, lastName, contact, email, expertise, address
      }, true);

      return data;
   }

   const getTrainer = async () => {
      const data = await get(`${baseUrl}/admin/getTrainer`, true);
      return data;
   }

   const deleteTrainer = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteTrainer/${id}`, true);
      return data;
   };

   const updateTrainer = async ({ id, Branch, firstName, lastName, contact, email, expertise, address }) => {
      const data = await put(`${baseUrl}/admin/updateTrainer/${id}`, {
         Branch, firstName, lastName, contact, email, expertise, address
      }, true);
      return data;
   };

   // =================training list api======================
   const createTrainingList = async ({ Branch, trainerOption, trainingType, trainer, trainingCost, Employee, startDate, endDate, description }) => {
      const data = await post(`${baseUrl}/admin/postList`, {
         Branch, trainerOption, trainingType, trainer, trainingCost, Employee, startDate, endDate, description
      }, true);

      return data;
   }

   const getTrainingList = async () => {
      const data = await get(`${baseUrl}/admin/getList`, true);
      return data;
   }

   const deleteTrainingList = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteList/${id}`, true);
      return data;
   };

   const updateTrainingList = async ({ id, Branch, trainerOption, trainingType, trainer, trainingCost, Employee, startDate, endDate, description, status, performance, remarks }) => {
      const data = await put(`${baseUrl}/admin/updateList/${id}`, {
         Branch, trainerOption, trainingType, trainer, trainingCost, Employee, startDate, endDate, description, status, performance, remarks
      }, true);
      return data;
   };

   // ==============================Holiday api=====================

   const createHoliday = async ({ holidayName, startDate, endDate }) => {
      const data = await post(`${baseUrl}/admin/createHoliday`, {
         holidayName, startDate, endDate
      }, true);

      return data;
   }

   const getHoliday = async () => {
      const data = await get(`${baseUrl}/admin/getHoliday`, true);
      return data;
   }

   const deleteHolidays = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteHoliday/${id}`, true);
      return data;
   };

   const updateHolidays = async ({ id, holidayName, startDate, endDate }) => {
      const data = await put(`${baseUrl}/admin/updateHoliday/${id}`, {
         holidayName, startDate, endDate
      }, true);
      return data;
   };

   // ======================holiday api end================

   // ===========================trip===========
   const createTrip = async ({ Employee, startDate, endDate, purpose, country, description }) => {
      const data = await post(`${baseUrl}/admin/createTrip`, {
         Employee, startDate, endDate, purpose, country, description
      }, true);

      return data;
   }

   const getTrip = async () => {
      const data = await get(`${baseUrl}/admin/getTrip`, true);
      return data;
   }

   const deleteTrip = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteTrip/${id}`, true);
      return data;
   };

   const updateTrip = async ({ id, Employee, startDate, endDate, purpose, country, description }) => {
      const data = await put(`${baseUrl}/admin/updateTrip/${id}`, {
         Employee, startDate, endDate, purpose, country, description
      }, true);
      return data;
   };

   const createLead = async (
      {
         LeadOwner,
         Company,
         FirstName,
         LastName,
         Title,
         Email,
         Phone,
         Fax,
         Mobile,
         Website,
         LeadSource,
         NoOfEmployee,
         Industry,
         LeadStatus,
         AnnualRevenue,
         Rating,
         EmailOptOut,
         SkypeID,
         SecondaryEmail,
         Twitter,
         Street,
         City,
         State,
         ZipCode,
         Country,
         DescriptionInfo,
         image
      }) => {

      let data;

      if (image) {

         const formdata = new FormData();
         formdata.append("image", image);

         const imageUrl = await postDocuments(`${baseUrl}/lead/postImage`, formdata, true);


         data = await post(`${baseUrl}/lead/createLead`, {
            LeadOwner,
            Company,
            FirstName,
            LastName,
            Title,
            Email,
            Phone,
            Fax,
            Mobile,
            Website,
            LeadSource,
            NoOfEmployee,
            Industry,
            LeadStatus,
            AnnualRevenue,
            Rating,
            EmailOptOut,
            SkypeID,
            SecondaryEmail,
            Twitter,
            Street,
            City,
            State,
            ZipCode,
            Country,
            DescriptionInfo,
            image: imageUrl?.data
         }, true);

      }
      else {
         data = await post(`${baseUrl}/lead/createLead`, {
            LeadOwner,
            Company,
            FirstName,
            LastName,
            Title,
            Email,
            Phone,
            Fax,
            Mobile,
            Website,
            LeadSource,
            NoOfEmployee,
            Industry,
            LeadStatus,
            AnnualRevenue,
            Rating,
            EmailOptOut,
            SkypeID,
            SecondaryEmail,
            Twitter,
            Street,
            City,
            State,
            ZipCode,
            Country,
            DescriptionInfo,

         }, true);
      }

      return data;
   }


   const createExcelLead = async ({ LeadOwner,
      City,
      CompanyName,
      Email,
      FirstName,
      LastName,
      LinkedInURL,
      Mobile,
      Phone,
      State,
      Title,
      Website }) => {

      let data;

      data = await post(`${baseUrl}/lead/createLead`, {
         LeadOwner,
         City,
         Company: CompanyName,
         Email,
         FirstName,
         LastName,
         SkypeID: LinkedInURL,
         Mobile,
         Phone,
         State,
         Title,
         Website

      }, true);


      return data;
   }



   const updateLead = async (
      { LeadOwner,
         Company,
         FirstName,
         LastName,
         Title,
         Email,
         Phone,
         Fax,
         Mobile,
         Website,
         LeadSource,
         NoOfEmployee,
         Industry,
         LeadStatus,
         AnnualRevenue,
         Rating,
         EmailOptOut,
         SkypeID,
         SecondaryEmail,
         Twitter,
         Street,
         City,
         State,
         ZipCode,
         Country,
         DescriptionInfo, id }

   ) => {

      let data;

      data = await post(`${baseUrl}/lead/editLead/${id}`,
         {
            LeadOwner,
            Company,
            FirstName,
            LastName,
            Title,
            Email,
            Phone,
            Fax,
            Mobile,
            Website,
            LeadSource,
            NoOfEmployee,
            Industry,
            LeadStatus,
            AnnualRevenue,
            Rating,
            EmailOptOut,
            SkypeID,
            SecondaryEmail,
            Twitter,
            Street,
            City,
            State,
            ZipCode,
            Country,
            DescriptionInfo,

         }, true);


      return data;
   }

   const getLead = async (id, query, page, perPage) => {
      let user = JSON.parse(localStorage.getItem("hrms_user"));

      const data = await post(`${baseUrl}/lead/getAllLead/?id=${id}&query=${query}&page=${page}&perPage=${perPage}`, { id: user?._id }, true);
      return data;
   }

   const getLead2 = async (id, query, page, perPage) => {

      const data = await get(`${baseUrl}/lead/getAllLead/?id=${id}&query=${query}&page=${page}&perPage=${perPage}`, true);
      return data;
   }


   const getLead3 = async () => {

      let user = JSON.parse(localStorage.getItem("hrms_user"));

      const data = await get(`${baseUrl}/lead/getAllLead2/${user?._id}`, true);
      return data;
   }
   const getLeadByUser = async (id) => {
      const data = await get(`${baseUrl}/lead/getLeadByUser/${id}`, true);
      return data;
   }
   const getAllLeads = async () => {
      const data = await get(`${baseUrl}/lead/getAllLeadByAdmin`, true);
      return data;
   }


   const deleteLeads = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteLead/${id}`, true);
      return data;
   };


   const uploadToCloudinaryImg = async ({ image }) => {

      const formdata = new FormData();
      formdata.append("image", image);
      const resp = await postDocuments(`${baseUrl}/user/uploadToCloudinary`, formdata);
      return resp;
   }

   const updateLeadStatus = async (id, LeadStatus) => {

      const data = await post(`${baseUrl}/lead/updateLeadStatus/${id}`, { LeadStatus }, true);
      return data;
   }
   const updateLeadNote = async (id, Note, LeadStatus) => {

      const data = await post(`${baseUrl}/lead/updateLeadNote/${id}`, { Note, LeadStatus }, true);
      return data;
   }

   const postQuotation = async ({ User, InvoiceNo, GstNo, SacCode, PlacedSupply, BillTo, ShipTo, ClientName, Address, Mobile, Email, ItemDescription, Qty, Price, Amount, BalanceAmount, Note, currency, leadId }) => {

      const data = await post(`${baseUrl}/admin/createInvoice`, { User, InvoiceNo, GstNo, SacCode, PlacedSupply, BillTo, ShipTo, ClientName, Address, Mobile, Email, ItemDescription, Qty, Price, Amount, BalanceAmount, Note, currency, leadId }, true);
      return data;

   }

   const getQuotationAll = async (id) => {
      const data = await get(`${baseUrl}/admin/getEveryUserInvoice/${id}`, true);
      return data;
   }

   const updateQuotation = async (
      { InvoiceNo, GstNo, SacCode, PlacedSupply, BillTo, ShipTo, ClientName, Address, Mobile, Email, ItemDescription, Qty, Price, Amount, BalanceAmount, Note, currency, id }

   ) => {

      let data;

      data = await post(`${baseUrl}/admin/updateInvoice/${id}`,
         {
            InvoiceNo, GstNo, SacCode, PlacedSupply, BillTo, ShipTo, ClientName, Address, Mobile, Email, ItemDescription, Qty, Price, Amount, BalanceAmount, Note, currency
         }, true);


      return data;
   }

   const deleteQuotation = async (id) => {
      const data = await deleteReq(`${baseUrl}/admin/deleteInvoice/${id}`, true);
      return data;
   };

   const createSallary = async ({ salary, paySlipType }) => {

      const data = await post(`${baseUrl}/admin/createSallary`, { salary, paySlipType }, true);
      return data;

   }

   const getSallary = async () => {
      // console.log('iddd ',id);
      const data = await get(`${baseUrl}/admin/getSallary`, true);
      return data;
   }

   const userSalaryFetch = async (id) => {
      const data = await get(`${baseUrl}/payroll/getAllUserPayroll/${id}`, true);
      return data;
   }

   const salaryCreate = async (paySlipType, salary, id) => {
      const data = await post(`${baseUrl}/payroll/editUserSalary/${id}`, { salary, paySlipType }, true);
      return data;
   }

   const createAllowance = async (allowanceOption, amount, title, type, id) => {
      const data = await post(`${baseUrl}/payroll/createAllowance/${id}`, { allowanceOption, amount, title, type }, true);
      return data;
   }
   const createCommision = async (amount, type, title, id) => {
      const data = await post(`${baseUrl}/payroll/createCommission/${id}`, { amount, title, type }, true);
      return data;
   }
   const createLoan = async (LoanOption, loanAmount, title, type, reason, id) => {
      const data = await post(`${baseUrl}/payroll/createLoan/${id}`, { LoanOption, loanAmount, title, reason, type }, true);
      return data;
   }
   const allowDeleteHandler = async (allowId, id) => {
      const data = await deleteReq(`${baseUrl}/payroll/deleteAllowance/${allowId}/${id}`, true);
      return data;
   }
   const loanDeleteHandler = async (loanId, id) => {
      const data = await deleteReq(`${baseUrl}/payroll/deleteLoan/${loanId}/${id}`, true);
      return data;
   }
   const commisionDelteHandler = async (commId, id) => {
      const data = await deleteReq(`${baseUrl}/payroll/deleteCommission/${commId}/${id}`, true);
      return data;
   }

   const editAllowance = async (allowanceOption, amount, title, type, allowanceId, id) => {
      const data = await post(`${baseUrl}/payroll/editAllowance/${id}`, { allowanceOption, amount, title, type, allowanceId }, true);
      return data;
   }
   const editComApi = async (amount, type, title, allowanceId, id) => {
      const data = await post(`${baseUrl}/payroll/editCommission/${id}`, { amount, title, type, allowanceId }, true);
      return data;
   }
   const editLoanApi = async (LoanOption, title, type, loanAmount, reason, allowanceId, id) => {
      const data = await post(`${baseUrl}/payroll/editLoan/${id}`, { LoanOption, loanAmount, title, type, reason, allowanceId }, true);
      return data;
   }
   const getUserSlip = async (month, year) => {
      const data = await post(`${baseUrl}/payslip/getPlayslip`, { month, year }, true);
      return data;
   }
   const togglePayslip = async (userId, month, year) => {

      const data = await post(`${baseUrl}/payslip/toglePayslip/${userId}`, { month, year }, true);
      return data;
   }
   const buildAPI = async (month, year) => {

      const data = await post(`${baseUrl}/payslip/bulkPayslip`, { month, year }, true);
      return data;
   }

   const updateAttendance = async (id, Date, clockIn, clockOut, breakTime) => {
      const data = await post(`${baseUrl}/clock/updateAttendance/${id}`, { Date, clockIn, clockOut, breakTime }, true);
      return data;

   }
   const postDocSetup = async ({ name, requiredField }) => {
      const data = await post(`${baseUrl}/system/createDocSetup`, { name, requiredField }, true);
      return data;

   }
   const updateDocSetup = async ({ id, name, requiredField }) => {
      const data = await post(`${baseUrl}/system/updateDocSetup/${id}`, { name, requiredField }, true);
      return data;

   }
   const deleteDocSetup = async ({ id }) => {
      const data = await deleteReq(`${baseUrl}/system/deleteDocSetup/${id}`, true);
      return data;

   }
   const fetchAllDocs = async () => {
      const data = await get(`${baseUrl}/system/fetchAllDocs`, true);
      return data;
   }

   const deleteAttendence = async (id) => {
      const data = await deleteReq(`${baseUrl}/clock/deleteAttendence/${id}`, true);
      return data;

   }

   const uploadOwnDocs = async ({ formData, id }) => {
      const resp = await postDocuments(`${baseUrl}/user/uploadDocument/${id}`, formData);
      return resp;
   }

   // for task and meet 


   const taskCreateApi = async ({ LeadName, FollowUpType, Date, Time, Remark, LeadId, userId }) => {
      const data = await post(`${baseUrl}/openActivity/createTask`, { LeadName, FollowUpType, Date, Time, Remark, LeadId, userId }, true);
      return data;

   }
   const taskEditApi = async ({  LeadName, FollowUpType, Date, Time, Remark, LeadId, userId , taskId}) => {
      const data = await post(`${baseUrl}/openActivity/editTask/${taskId}`, {  LeadName, FollowUpType, Date, Time, Remark, LeadId, userId }, true);
      return data;

   }

   const deleteTaskapi = async ({ taskId }) => {
      const data = await deleteReq(`${baseUrl}/openActivity/deleteTask/${taskId}`, true);
      return data;

   }

   const getTaskApi = async ({ userId }) => {
      const data = await get(`${baseUrl}/openActivity/getTaskByUser/${userId}`, true);
      return data;
   }

   const getMeetApi = async ({ userId }) => {
      const data = await get(`${baseUrl}/openActivity/getMeetByUser/${userId}`, true);
      return data;
   }


   const deleteMeetapi = async ({ meetId }) => {

      const data = await deleteReq(`${baseUrl}/openActivity/deleteMeet/${meetId}`, true);
      return data;

   }

   const meetCreateApi = async ({ title , meetDateFrom, meetDateTo, Status, meetTimeFrom, meetTimeTo, Host, RelatedTo, Participant, Note, userId, LeadId  }) => {
      const data = await post(`${baseUrl}/openActivity/createMeet`, { title, meetDateFrom, meetDateTo, Status, meetTimeFrom, meetTimeTo, Host, RelatedTo, Participant, Note, userId, LeadId  }, true);
      return data;

   }

   const meetEditApi = async ({ title ,  meetDateFrom, meetDateTo, Status, meetTimeFrom, meetTimeTo, Host, RelatedTo, Participant, Note, userId, meetId, LeadId }) => {
      const data = await post(`${baseUrl}/openActivity/editMeet/${meetId}`, { title, meetDateFrom, meetDateTo, Status, meetTimeFrom, meetTimeTo, Host, RelatedTo, Participant, Note, userId, LeadId  }, true);
      return data;

   }

   const getLeadById = async (id) => {
      const data = await get(`${baseUrl}/lead/getLeadById/${id}`, true);
      return data;
   }

   const getLeadSources = async () => {
      const data = await get(`${baseUrl}/system/getLeadSource`, true);
      return data;
   };

   const postLeadSource = async ({ name }) => {
      const data = await post(`${baseUrl}/system/postLeadSource`, { name }, true);
      return data;
   };

   const updateLeadSource = async ({ id, name }) => {
      const data = await put(`${baseUrl}/system/updateLeadSource/${id}`, { name }, true);
      return data;
   };

   const deleteLeadSource = async (id) => {
      const data = await deleteReq(`${baseUrl}/system/deleteLeadSource/${id}`, true);
      return data;
   };


   const getIndustry = async () => {
      const data = await get(`${baseUrl}/system/getIndustry`, true);
      return data;
   };

   const postIndustry = async ({ name }) => {
      const data = await post(`${baseUrl}/system/postIndustry`, { name }, true);
      return data;
   };

   const updateIndustry = async ({ id, name }) => {
      const data = await put(`${baseUrl}/system/updateIndustry/${id}`, { name }, true);
      return data;
   };

   const deleteIndustry = async (id) => {
      const data = await deleteReq(`${baseUrl}/system/deleteIndustry/${id}`, true);
      return data;
   };


   const postLeadStatus = async ({ status }) => {
      const data = await post(`${baseUrl}/lead/createLeadStatus`, { status }, true);
      return data;
   }
   const postLeadSource2 = async ({ status }) => {
      const data = await post(`${baseUrl}/lead/createLeadSource`, { status }, true);
      return data;
   }

   const AllLeadStatus = async () => {
      const data = await get(`${baseUrl}/lead/allLeadStatus`, true);
      return data;
   }

   const AllLeadSource = async () => {
      const data = await get(`${baseUrl}/lead/allLeadSource`, true);
      return data;

   }


   const UpdateLeadStatus = async ({ status }) => {
      const data = await post(`${baseUrl}/lead/updateLeadStatus`, { status }, true);
      return data;
   }
   const UpdateLeadSource = async ({ status }) => {
      const data = await post(`${baseUrl}/lead/updateLeadSource`, { status }, true);
      return data;
   }


   const getUserByDesignation = async () => {
      const data = await get(`${baseUrl}/lead/getDesiUser`, true);
      return data;
   }

   const GetNoteApi = async(leadId)=>{
      const data = await get(`${baseUrl}/lead/getNoteById/${leadId}`, true);
      return data;
   }


   const CreateNoteApi  = async(id , Note , LeadStatus)=>{
      const data = await post(`${baseUrl}/lead/createLeadNote/${id}`, { Note , Status:LeadStatus }, true);
      return data;
   }
   const updateNoteApi  = async(noteId , Note , LeadStatus)=>{
      const data = await post(`${baseUrl}/lead/updateLeadNote2/${noteId}`, { Note , Status:LeadStatus }, true);
      return data;
   }
   const DeleteNoteApi  = async(id)=>{
      const data = await deleteReq(`${baseUrl}/lead/deleteLeadNote/${id}`, true);
      return data;
   }

   const FetchFollowApi = async(id)=>{
      const data = await get(`${baseUrl}/openActivity/fetchFollow/${id}`, true);
      return data;
   }


   return (
      <MainContext.Provider value={{
         login, taskCreateApi,FetchFollowApi ,  getLeadById,CreateNoteApi  , updateNoteApi,DeleteNoteApi ,  getUserByDesignation, UpdateLeadStatus, UpdateLeadSource, AllLeadSource, meetCreateApi, AllLeadStatus, taskEditApi, meetEditApi,GetNoteApi ,  deleteTaskapi, deleteMeetapi, getTaskApi, getMeetApi, employeeLogin, employeeResetPassword, hrLogin, createHr, getHrs, deleteHr, createEmployee, getEmployees, getUsers, getActiveUsers, getActiveUsersCount, postLeadStatus, postLeadSource2, getAdminEmployees, postActivity, postActivityHr, getActivitiesByUser, getStatisticsByUser, postLeave, updateLeave, getUserLeaves, getUserLeaveById, deleteLeave, getTotalLeaves, postTotalLeaves, verifyEmployee, verifyHr, verifyAdmin, setUser, buildAPI, user, getProjects, postProject, getHolidays, postHoliday, updateProject, getProjectsByEmployee, getTasks, postTask, updateTask, deleteTask, setFlag, flag, changePassword, updateProfile, deleteHoliday, updateHoliday, deleteProject, getChats, createNewChat, postMessage, deleteChat, adminLogin, getChat, getChatByUser, setChatUser, chatUser, getEmployeesByEmployee, topDash, postAnnouncement, updateAnnouncement, getAnnouncements, getAnnouncementDates, deleteAnnouncement, getAttendance, getAttendanceByUser, createEmployee1, updateAdminProfile, changePassword1, verify, updateUser, forgetPassword, forgetPassword1, forgetPassword2, getBranchs, postBranch, updateBranch, deleteBranch, getDepartments, postDepartment, updateDepartment, deleteDepartment, getDesingation, postDesignation, updateDesignation, deleteDesignation, getAllActivities, postLeaveType, updateLeaveType, getLeaveTypes, deleteLeaveType,
         createIndicator, getIndicator, deleteIndicator, getDesignations, updateIndicator, getAppraisal, createAppraisal, allEmployee, deleteApprisal, updateApprisal, createAssets, getAssets, deleteAssets, updateAssets, deleteUser, createTracks, getTracks, deleteTracks, updateTracks, editComApi, loanDeleteHandler,
         editAllowance, commisionDelteHandler, createLoan, editLoanApi,
         getTotalLeavesCount, uploadDocuments, createAnnouncement, deleteAnnouncement, updateAnnouncements, fetchAnnoucement, deleteAnnouncements, getEmp, allEmployeebyDep, notificationGet,
         acceptLeave, rejectLeave,
         uploadOwnDocs,
         getAllLeads,
         updateDocSetup,
         fetchAllDocs,
         updateAttendance,
         deleteDocSetup,
         postDocSetup,
         deleteAttendence,
         postNotification, fetchUserNotify,
         togglePayslip,
         updateLeadStatus,
         deleteNotification,
         createAllowance,
         postNotifyLeavereq,
         getUserSlip,
         createCommision,
         updateLeadNote,
         createTermination, getTermination, deleteTermination, updateTermination,
         createWarning, getWarning, deleteWarning, updateWarning,
         createComplain, getComplain, updateComplain, deleteComplain,
         postAttendence,
         getAttendence, createResignation, getResignation, deleteResignation, updateResignation,
         createPromotion, getPromotion, postAward,
         getAward, fetchClock, deleteAward, updateAward,
         createTransfer, getTransfer,
         deleteTransfer, updateTransfer,
         createTrainer, getTrainer, deleteTrainer, updateTrainer, createTrainingList, getTrainingList, updateTrainingList, deleteTrainingList, createHoliday, getHoliday, deleteHolidays, updateHolidays,
         getAllActivities2,
         createTrip, getTrip, deleteTrip, updateTrip, deletePromotion, updatePromotion,
         createLead,
         getLead,
         getLead2,
         allowDeleteHandler,
         deleteLeads, updateLead,
         uploadToCloudinaryImg,
         postQuotation,
         getQuotationAll,
         fetchUserNotifyHR,
         createSallary,
         getSallary,
         userSalaryFetch, salaryCreate,
         createExcelLead,
         updateQuotation,
         fetchTodayLeave,
         deleteQuotation,
         departmentEmployee,
         getLead3,
         getLeadSources,
         postLeadSource,
         updateLeadSource,
         deleteLeadSource,
         getIndustry,
         postIndustry,
         deleteIndustry,
         updateIndustry,
         getLeadByUser

      }}>
         {props.children}
      </MainContext.Provider>
   );
};

export default MainState