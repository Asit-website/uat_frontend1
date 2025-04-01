import React, { useEffect, useState, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import "../MySelf/myself.css"
import doc from "../../images/docu.png"
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import { useLocation } from 'react-router-dom';
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";


const EmployeeSelf = ({ setAlert, pop1, setPop1 }) => {
   const { user, postActivity, getStatisticsByUser, getUsers, changeOfferLetterPer, changeRelivingLetterPer, changeExperienceLetterPer, getThisMonthLeave, getMyOfferLetter

   } = useMain();

   const [user1, setUser1] = useState({});

   const location = useLocation();
   const state = location.state;
   const [curenpage, setCurrPage] = useState("Document");
   const [isChecked, setIsChecked] = useState(false);
   const [isChecked2, setIsChecked2] = useState(false);
   const [isChecked3, setIsChecked3] = useState(false);


   const [offerContent, setOfferContent] = useState(``);
   const [reliveContent, setReliveContent] = useState(``);
   const [internOffer, setInternOffer] = useState(``);
   const [experienceContent, setExperienceContent] = useState(``);
   const [internshipContent, setinternshipContent] = useState(``);

     const contonentPDF = useRef();
     const contonentPDF2 = useRef();
     const contonentPDF3 = useRef();
     const contonentPDF4 = useRef();

       const generatePdf = useReactToPrint({
         content: () => contonentPDF.current,
         documentTitle: "Quotation",
         parentContainer: {
           "@media print": {
             display: "block",
           },
         },
       });
     
       const generatePdf2 = useReactToPrint({
         content: () => contonentPDF2.current,
         documentTitle: "Quotation",
         parentContainer: {
           "@media print": {
             display: "block",
           },
         },
       });
       const generatePdf3 = useReactToPrint({
         content: () => contonentPDF3.current,
         documentTitle: "Quotation",
        
       });
       const generatePdf4 = useReactToPrint({
         content: () => contonentPDF4.current,
         documentTitle: "Quotation",
         parentContainer: {
           "@media print": {
             display: "block",
           },
         },
       });

   const [thisMonthLeave, setThisMonthLeave] = useState(0);

   const getOfferletter = async () => {
      const ans = await getMyOfferLetter(state);
      if (ans?.status) {
         setOfferContent(ans?.data?.createletter[0]?.content);
         setReliveContent(ans?.data?.relivingLetter[0]?.content);
         setExperienceContent(ans?.data?.expeletter[0]?.content);
         setinternshipContent(ans?.data?.internLetter[0]?.content);
      }
   };

   useEffect(() => {
      getOfferletter();

   }, []);

   const handleCheckboxChange = async (event) => {
      const toastId = toast.loading("Loading...");
      const checked = event.target.checked;
      setIsChecked(checked);

      try {
         const ans = await changeOfferLetterPer({ userId: state });
         toast.success("Succesfuly updated");
      } catch (error) {
         console.error('Error calling API:', error);
      }
      toast.dismiss(toastId);
   };

   const handleCheckboxChange2 = async (event) => {
      const toastId = toast.loading("Loading...");
      const checked = event.target.checked;
      setIsChecked2(checked);

      try {
         const ans = await changeRelivingLetterPer({ userId: state });
         toast.success("Succesfuly updated");
      } catch (error) {
         console.error('Error calling API:', error);
      }
      toast.dismiss(toastId);
   };

   const handleCheckboxChange3 = async (event) => {
      const toastId = toast.loading("Loading...");
      const checked = event.target.checked;
      setIsChecked3(checked);

      try {
         const ans = await changeExperienceLetterPer({ userId: state });
         toast.success("Succesfuly updated");
      } catch (error) {
         console.error('Error calling API:', error);
      }
      toast.dismiss(toastId);
   };

   const fetchUserDetails = async () => {
      const ans = await getUsers(state);
      const resp = await getThisMonthLeave(state);
      setThisMonthLeave(resp?.totalDays);
      setUser1(ans?.data);

   }


   useEffect(() => {
      if (user1?.offerLetterPermission) {
         setIsChecked(true);
      }
      if (user1?.RelievingLetterPermission) {
         setIsChecked2(true);
      }
      if (user1?.ExperienceLetterPermission) {
         setIsChecked3(true);
      }
   }, [user1])

   useEffect(() => {
      fetchUserDetails();

   }, [])


   return (
      <>
         <div className="employee-dash h-full">

            <AdminSidebar />


            <div className="tm">
               <AdminNavbar
                  user={user}
                  setAlert={setAlert}
                  postActivity={postActivity}
                  getStatisticsByUser={getStatisticsByUser}
                  pop1={pop1}
                  setPop1={setPop1}
               />

               <div className="em manem">

                  <nav className="myselfNav">
                     <h2>{user1?.fullName} Details</h2>

                     <select
                        value={curenpage}
                        onChange={(e) => setCurrPage(e.target.value)}
                        name=""
                        id=""
                     >
                        <option value="Document">Document</option>
                        <option value="Offer Letter">Offer Letter</option>
                        <option value="Relieving Letter">Relieving Letter</option>
                        <option value="Experience Letter">Experience Letter</option>
                        <option value="Internship Letter">Internship Letter</option>
                     </select>

                  </nav>

                  
                  {curenpage === "Document" && (
                     <>
                        {/* first section  */}
                        <div className="myselfFirst">


                           <h3>Employee Detail</h3>

                           <hr />

                           <div className="allFristDe3tail">

                              <div className="singfirst">
                                 <p>Employee ID :</p>
                                 <span>KDS{user1?.employeeCode}</span>
                              </div>

                              <div className="singfirst">
                                 <p>Name :</p>
                                 <span>{user1?.fullName}</span>
                              </div>

                              <div className="singfirst">
                                 <p>Department :</p>
                                 <span>{user1?.department}</span>
                              </div>

                              <div className="singfirst">
                                 <p>Designation :</p>
                                 <span>{user1?.designation}</span>
                              </div>

                              <div className="singfirst">
                                 <p>Date of Joining :</p>
                                 <span>{user1?.joiningDate}</span>
                              </div>

                              <div className="singfirst">
                                 <p>Office Email :</p>
                                 <span>{user1?.email}</span>
                              </div>

                           </div>

                        </div>

                        {/* second section  */}
                        <div className="myselfFirst">


                           <h3>Other Detail</h3>

                           <hr />

                           <div className="allFristDe3tail">

                              <div className="singfirst1">
                                 <p>Address :</p>
                                 <span>{user1?.currentAddress}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Mobile :</p>
                                 <span>{user1?.mobile}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Personal ID :</p>
                                 <span>{user1?.email1}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Gender :</p>
                                 <span>{user1?.gender}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Pan Number :</p>
                                 <span>{user1?.pan}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Adhar Number :</p>
                                 <span>{user1?.adhar}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Father Name :</p>
                                 <span>{user1?.father}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Current  Address :</p>
                                 <span>{user1?.currentAddress}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Current State :</p>
                                 <span>{user1?.currentState}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Current City :</p>
                                 <span>{user1?.currentCity}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Area Pincode :</p>
                                 <span>{user1?.currentPin}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Permanent Address :</p>
                                 <span>{user1?.residence}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Permanent State :</p>
                                 <span>{user1?.perState}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Permanent City :</p>
                                 <span>{user1?.perCity}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Permanent Pin :</p>
                                 <span>{user1?.perPin}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Marital status :</p>
                                 <span>{user1?.Martial}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Nationality :</p>
                                 <span>{user1?.nationality}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Mother name :</p>
                                 <span>{user1?.Mother}</span>
                              </div>

                           </div>

                        </div>

                        {/* thid  section  */}
                        <div className="myselfFirst">


                           <h3>Document Upload</h3>

                           <hr />



                           <div className="allFristDe3tail2">

                              {
                                 user1?.document?.map((item, index) => (
                                    <div className="singleDoc" key={index}>

                                       {/* left */}
                                       <div className="sidocLeft">

                                          <a target="_blank" href={`${item?.url}`}><img src={doc} alt="" /></a>

                                          <div className="ffwrap">
                                             <a target="_blank" href={`${item?.url}`}><p className="ff"> {item.name === "twevelCert" ? "twelveth Certificate" : item?.name === "tenCert" ? "Tenth Certicate" : item?.name}</p></a>
                                             <a target="_blank" href={`${item?.url}`}> <p className="dd">{(item?.url).slice(50, 80)}</p></a>
                                          </div>

                                       </div>

                                       {/* right  */}
                                       {/* <p className="singDocRight">{new Date().now()}</p> */}

                                    </div>
                                 ))
                              }


                           </div>

                        </div>


                        {/* fourth section  */}
                        <div className="myselfFirst">


                           <h3>Bank Account Detail</h3>

                           <hr />

                           <div className="allFristDe3tail">

                              <div className="singfirst1">
                                 <p>Salary Pay Mode</p>
                                 <span>{user1?.SalaryPay}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Account No :</p>
                                 <span>{user1?.AccountNumber}</span>
                              </div>

                              <div className="singfirst1">
                                 <p> Bank Name :</p>
                                 <span>{user1?.SalaryBankName}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Beneficiary Name :</p>
                                 <span>{user1?.BeneficiaryName}</span>
                              </div>

                              <div className="singfirst1">
                                 <p>Branch Ifsc Code :</p>
                                 <span>{user1?.BankIfsc}</span>
                              </div>
                              <div className="singfirst1">
                                 <p>Bank Branch Name :</p>
                                 <span>{user1?.Branch}</span>
                              </div>



                           </div>

                        </div>

                        {/* fivth section  */}
                        <div className="myselfFirst">


                           <h3>Leave Details</h3>

                           <hr />

                           <div className="allFristDe3tail">

                              <div className="singfirst2">
                                 <p>This Month Leave:</p>
                                 <span>{thisMonthLeave ? thisMonthLeave : 0}</span>
                              </div>

                              <div className="singfirst2">
                                 <p>Total Leave taken:</p>
                                 <span>{user1?.totalLeaves}</span>
                              </div>

                              <div className="singfirst2">
                                 <p>This Month Paid Leave Remaining:</p>
                                 <span>{2 - parseInt(thisMonthLeave) >= 0 ? 2 - parseInt(thisMonthLeave) : 0}</span>
                              </div>

                              <div className="singfirst2">
                                 <p>Year paid leave remaining:</p>
                                 <span>{12 - parseInt(user1?.totalLeaves) >= 0 ? 12 - parseInt(user1?.totalLeaves) : 0}</span>
                              </div>



                           </div>

                        </div>

                        <div className="myselfFirst">


                           <h3>Document Permission</h3>

                           <hr />

                           <div className="allFristDe3tail sinoid">

                              <div className="singfirst adwwith">
                                 <p>Offer Letter :</p>

                                 <input checked={isChecked} onChange={handleCheckboxChange} className="inpo1" type="checkbox" />

                              </div>

                              <div className="singfirst adwwith">
                                 <p>Relieving Letter :</p>

                                 <input checked={isChecked2} onChange={handleCheckboxChange2} className="inpo1" type="checkbox" />

                              </div>


                              <div className="singfirst adwwith">
                                 <p>Experience Letter :</p>

                                 <input checked={isChecked3} onChange={handleCheckboxChange3} className="inpo2" type="checkbox" />

                              </div>




                           </div>

                        </div>


                        <div className="reqcahgng">

                        </div>
                     </>
                  )}
                  {curenpage === "Offer Letter" && (
              <div>
                <div ref={contonentPDF} className="showoffercont">
                  <img className="offer_header11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png" alt="" />
                  <h2>OFFER LETTER</h2>

                  <div className="font-wrapper p-4">
                    <div
                      className="addfont"
                      dangerouslySetInnerHTML={{ __html: offerContent }}
                    />
                    <img className="offer_footer11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png" alt="" />
                  </div>


                </div>

                <div className="prntBtn">
                  <button onClick={() => generatePdf()}>
                    <span>Print</span>
                  </button>
                </div>

              </div>
            )}
            {curenpage === "Relieving Letter" && (
              <div>
                <div ref={contonentPDF2} >
                  <div className="showoffercont">
                    <img className="offer_header11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png" alt="" />
                    <h2>RELIEVING LETTER</h2>

                    <div className=" p-4">
                      <div dangerouslySetInnerHTML={{ __html: reliveContent }} />
                    </div>
                    <img className="offer_footer11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png" alt="" />


                  </div>


                </div>

                <div className="prntBtn">
                  <button onClick={() => generatePdf2()}>
                    <span>Print</span>
                  </button>
                </div>
              </div>
            )}

            {curenpage === "Experience Letter" && (
             <div>
             <div ref={contonentPDF3} className="showoffercont">
               <img className="offer_header11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png" alt="" />
               <h2>EXPERIENCE LETTER</h2>
           
               <div className="p-4">
                 <div dangerouslySetInnerHTML={{ __html: experienceContent }} />
               </div>
           
               <img className="offer_footer11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png" alt="" />
             </div>
           
             <div className="prntBtn">
               <button onClick={() => generatePdf3()}>
                 <span>Print</span>
               </button>
             </div>
           </div>
           
            )}

            {curenpage === "Internship Letter" && (
              <div>
                <div ref={contonentPDF4} className="showoffercont">
                  <img className="offer_header11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741687779/aman_bhai_1_jlctyt.png" alt="" />
                  <h2>INTERNSHIP LETTER</h2>

                  <div className="p-4">
                    <div
                      dangerouslySetInnerHTML={{ __html: internshipContent }}
                    />
                  </div>
                  <img className="offer_footer11" src="https://res.cloudinary.com/dd9tagtiw/image/upload/v1741681598/imageee_h3x8so.png" alt="" />


                </div>

                <div className="prntBtn">
                  <button onClick={() => generatePdf4()}>
                    <span>Print</span>
                  </button>
                </div>
              </div>
            )}





               </div>



            </div>
         </div>
      </>
   );
};

export default EmployeeSelf;
