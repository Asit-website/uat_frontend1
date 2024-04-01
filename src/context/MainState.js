import React from 'react'
import MainContext from './MainContext';
import { deleteReq, get, post, put, postDocuments } from '../Api/api'
import { useState } from 'react';

const baseUrl = "http://localhost:5000";

// const baseUrl = "https://hrms-backend-code.onrender.com"

// const baseUrl = "http://localhost:5000";

// const baseUrl = "https://hrms-backend-q2ta.onrender.com";

// const baseUrl = "https://hmsbackend.kusheldigi.com";

// const baseUrl = "https://hrms-backend-g3wt.onrender.com";

const MainState = (props) => {
   const [user, setUser] = useState({});
   const [flag, setFlag] = useState(false);
   const [chatUser, setChatUser] = useState({});

   const login = async ({ email, employeeCode, password }) => {
      const data = await post(`${baseUrl}/auth/login`, { email, employeeCode, password, role: "Admin" }, false);

      console.log("data", data);
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

   const createEmployee1 = async ({ fullName, password, department, employeeId, gmail, reportingManager, designation, joiningDate, email, email1, mobile, gender, dob, pan, adhar, father, currentAddress, currentState, currentCity, currentPin, residence, perState, perCity, perPin, Martial, nationality, Mother, employeeCode, qualification, specialization, qualificationType, yearPass, university, college, percentage, previousCompany, previousDesignation, toDate, fromDate, numberOfMonth, Jobdescription, SalaryPay, SalaryBankName, BeneficiaryName, BankIfsc, AccountNumber, confirmAccount, Branch, adharCard, formData }) => {


      const data = await post(`${baseUrl}/admin/createUser1`, { fullName, password, department, employeeId, gmail, reportingManager, designation, joiningDate, email, email1, mobile, gender, dob, pan, adhar, father, currentAddress, currentState, currentCity, currentPin, residence, perState, perCity, perPin, Martial, nationality, Mother, employeeCode, qualification, specialization, qualificationType, yearPass, university, college, percentage, previousCompany, previousDesignation, toDate, fromDate, numberOfMonth, Jobdescription, SalaryPay, SalaryBankName, BeneficiaryName, BankIfsc, AccountNumber, confirmAccount, Branch, adharCard }, true);

      const { _id } = data?.data?.adminUser;

      if(formData){

         console.log("reujjn ",formData); 
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

   const getAllActivities = async (type, date, userId, month) => {
      const data = await get(`${baseUrl}/activity/getAllActivities?type=${type}&date=${date}&userId=${userId}&month=${month}`, true);
      return data;
   };

   const postActivity = async ({ clockIn, clockOut, late, overtime, total, message = '', date1 }) => {
      console.log("a ", clockIn, clockOut, date1, late, overtime, total);
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
      console.log("data ", data);
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

   const updateProfile = async ({ fullName, mobile, email, image, email1, password, gmail, department, designation, pan, adhar, father, currentAddress, currentState, currentPin, residence, perState, perCity, perPin, Martial, nationality, Mother, _id }) => {

      const data = await put(`${baseUrl}/user/updateProfile`, { fullName, mobile, email, email1, password, gmail, department, designation, pan, adhar, father, currentAddress, currentState, currentPin, residence, perState, perCity, perPin, Martial, nationality, Mother }, true);

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

      console.log("resp ", data);
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
      // console.log("d", data);
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
      Name,
      amount,
      purchaseDate,
      supportedDate,
      description
   }) => {
      const data = await post(`${baseUrl}/admin/postAsset`, {
         Employee,
         Name,
         amount,
         purchaseDate,
         supportedDate,
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
      Name,
      amount,
      purchaseDate,
      supportedDate,
      description }) => {
      const data = await put(`${baseUrl}/admin/updateAsset/${id}`, {
         Employee,
         Name,
         amount,
         purchaseDate,
         supportedDate,
         description
      }, true);
      return data;
   };

   const deleteUser = async (id) => {
      const data = await deleteReq(`${baseUrl}/user/deleteUser/${id}`, true);
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
   const createAnnouncement = async ({title, Branch, Department, Employee, startDate,endDate , description}) => {
      const data = await post(`${baseUrl}/admin/postAnnouncement`, {title, Branch, Department, Employee, startDate,endDate , description}, true);
      return data; 
   }



   const updateAnnouncements = async ({ id, title, Branch, Department, Employee, startDate,endDate,description}) => {
      const data = await put(`${baseUrl}/admin/updateAnnouncement/${id}`, {title, Branch, Department, Employee, startDate,endDate,description}, true);
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

   const notificationGet = async()=>{
      let user = localStorage.getItem("hrms_user");
      const userDetail = JSON.parse(user);

      const id = userDetail?._id;

      const data = await get(`${baseUrl}/admin/getAnnouncement/${id}`, true);
      return data;
   }

   
   const acceptLeave = async(formdata)=>{
      
      const {user , days} = formdata;

      let fullName = user.fullName;

     const data = await post(`${baseUrl}/leave/acceptLeave`,{fullName , days}, true);
     return data;
   }
    const rejectLeave = async(formdata)=>{
     const {user } = formdata;
     let fullName = user.fullName;

     const data = await post(`${baseUrl}/leave/rejectLeave`, {fullName}, true);

     return data;
    }
  

    const postNotification = async(daysGap ,name)=>{
 
     const data = await post(`${baseUrl}/notification/createNotification`, {title: `Leave Application from ${name} ` , description:`Leave of ${daysGap} days` , users:["shubham gupta"]}, true);


     return data;

    }
    const postNotifyLeavereq = async(name , title)=>{
 
     const data = await post(`${baseUrl}/notification/createNotification`, {title: `${title} Leave Application` , description:`Leave Application ${title} By Admin ` , users:[`${name}`]}, true);


     return data;

    }
  

     const fetchUserNotify = async()=>{
      let user = localStorage.getItem("hrms_user");
      const userDetail = JSON.parse(user);

      const id = userDetail?._id;

      const data = await get(`${baseUrl}/notification/getNotification/${id}`, true);
      return data;
     }
     const deleteNotification = async(notId)=>{
      let user = localStorage.getItem("hrms_user");
      const userDetail = JSON.parse(user);

      const id = userDetail?._id;

      const data = await deleteReq(`${baseUrl}/notification/deleteNotification/${id}/${notId}`, true);
      return data;
     }



   return (
      <MainContext.Provider value={{
         login, employeeLogin, employeeResetPassword, hrLogin, createHr, getHrs, deleteHr, createEmployee, getEmployees, getUsers, getActiveUsers, getActiveUsersCount, getAdminEmployees, postActivity, postActivityHr, getActivitiesByUser, getStatisticsByUser, postLeave, updateLeave, getUserLeaves, getUserLeaveById, deleteLeave, getTotalLeaves, postTotalLeaves, verifyEmployee, verifyHr, verifyAdmin, setUser, user, getProjects, postProject, getHolidays, postHoliday, updateProject, getProjectsByEmployee, getTasks, postTask, updateTask, deleteTask, setFlag, flag, changePassword, updateProfile, deleteHoliday, updateHoliday, deleteProject, getChats, createNewChat, postMessage, deleteChat, adminLogin, getChat, getChatByUser, setChatUser, chatUser, getEmployeesByEmployee, topDash, postAnnouncement, updateAnnouncement, getAnnouncements, getAnnouncementDates, deleteAnnouncement, getAttendance, getAttendanceByUser, createEmployee1, updateAdminProfile, changePassword1, verify, updateUser, forgetPassword, forgetPassword1, forgetPassword2, getBranchs, postBranch, updateBranch, deleteBranch, getDepartments, postDepartment, updateDepartment, deleteDepartment, getDesingation, postDesignation, updateDesignation, deleteDesignation, getAllActivities, postLeaveType, updateLeaveType, getLeaveTypes, deleteLeaveType,
         createIndicator, getIndicator, deleteIndicator, getDesignations, updateIndicator, getAppraisal, createAppraisal, allEmployee, deleteApprisal, updateApprisal, createAssets, getAssets, deleteAssets, updateAssets, deleteUser, createTracks, getTracks, deleteTracks, updateTracks,
         getTotalLeavesCount, uploadDocuments,createAnnouncement,deleteAnnouncement,updateAnnouncements,fetchAnnoucement,deleteAnnouncements,getEmp , allEmployeebyDep , notificationGet , 
         acceptLeave ,rejectLeave , 
         postNotification , fetchUserNotify , 
         deleteNotification , 
         postNotifyLeavereq
      }}>
         {props.children}
      </MainContext.Provider>
   );
};

export default MainState