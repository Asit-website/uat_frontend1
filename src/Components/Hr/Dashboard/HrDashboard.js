import React, { useState } from "react";
import HrSidebar from "../Sidebar/HrSidebar";
import HrNavbar from "../Navbar/HrNavbar";
import tanj from "../../images/tanj.png";
import hand from "../../images/hath.png";
import phone from "../../images/phone.png";
import redPhone from "../../images/redPhone.png";
import goal from "../../images/goal.png";
import shubham from "../../images/shubham.png";
import calendarMonth from "../../images/calendarMonth.png";
import signin from "../../images/signin.png";
import Calendar from "react-calendar";
import akash from '../../images/akash.png';
import rahul from '../../images/rahul.png';
import { NavLink } from "react-router-dom";
import arrow from '../../images/arrow.png';
var tc;
var tc2;
const HrDashboard = ({ setAlert, pop1, setPop1 }) => {

  // tc2 is defined in the main server success trueley for the right combinat

  const [value, onChange] = useState(new Date());
  return (
    <>
      <div className="employee-dash h-full">
        <HrSidebar setAlert={setAlert} />
        <div className="tm">
          <HrNavbar setAlert={setAlert} pop1={pop1} setPop1={setPop1} />
          <div className="em">
            <div className="flex-col">
              <div className="hrDash-status flex">
                <div className="hrDash-status1 w-full">
                  <div className="hrStatus  flex">
                    <div className="hrStatus1 w-full">
                      <div className="status-box">
                        <div className="status-sox flex items-center justify-between">
                          <h3>Candidate Status</h3>
                          <img src={tanj} alt="tanj" />
                        </div>
                        <hr className="mt-3 hr-months" />
                        <div className="status-months flex-start flex  justify-between mt-3">
                          <div className="status-months1">
                            <h5>Total Onboarding</h5>
                            <h2>156</h2>
                          </div>
                          <div className="status-months2">
                            <select name="" id="">
                              <option>Month</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="onboarding">
                        <div className="gonBoarding">
                          <div className="first-on">
                            <div className="first-o">
                              <img src={hand} alt="" />
                            </div>
                            <div className="second-o">
                              <p>Onboarding Candidates</p>
                            </div>
                          </div>
                          <div className="second-on">
                            <h4>400</h4>
                          </div>
                        </div>
                        <hr className="onboard-hr" />
                        <div className="gonBoarding gon">
                          <div className="first-on">
                            <div className="first-o">
                              <img src={redPhone} alt="redPhone" />
                            </div>
                            <div className="second-o">
                              <p>Rejected Candidates</p>
                            </div>
                          </div>
                          <div className="second-on">
                            <h4>012</h4>
                          </div>
                        </div>
                        <hr className="onboard-hr" />
                        <div className="gonBoarding gon">
                          <div className="first-on">
                            <div className="first-o">
                              <img src={phone} alt="phone" />
                            </div>
                            <div className="second-o">
                              <p>Pending Candidate</p>
                            </div>
                          </div>
                          <div className="second-on">
                            <h4>20</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hrStatus2 ml-3">
                      <div className="request-card">
                        <div className="see-req flex items-center justify-between">
                          <h2>Requests</h2>
                          <p>See all</p>
                        </div>
                        <hr className="see-hr" />
                        <div className="shubham-cards4">
                          <div className="shubham-cards">
                            <div className="shubham-cards1 flex items-center">
                              <img className="goal" src={goal} alt="goal" />
                              <img
                                className="shubham"
                                src={shubham}
                                alt="shubham"
                              />
                              <div className="mr">
                                <h4>Mr. Shubham Gupta</h4>
                                <p>NO22MR183</p>
                              </div>
                            </div>
                            <div className="tistar">
                              <p>04 Days Leave Request</p>
                            </div>
                            <div className="date flex items-center">
                              <img src={calendarMonth} alt="calendarMonth" />
                              <div className="date1">
                                <h4>15 July 2021</h4>
                                <p>10 : 45 AM</p>
                              </div>
                            </div>
                            <div className="signin-img">
                              <img src={signin} alt="signin" />
                            </div>
                          </div>
                          <div className="shubham-cards mt-5">
                            <div className="shubham-cards1 flex items-center">
                              <img className="goal" src={goal} alt="goal" />
                              <img
                                className="shubham"
                                src={shubham}
                                alt="shubham"
                              />
                              <div className="mr">
                                <h4>Mr. Shubham Gupta</h4>
                                <p>NO22MR183</p>
                              </div>
                            </div>
                            <div className="tistar">
                              <p>04 Days Leave Request</p>
                            </div>
                            <div className="date flex items-center">
                              <img src={calendarMonth} alt="calendarMonth" />
                              <div className="date1">
                                <h4>15 July 2021</h4>
                                <p>10 : 45 AM</p>
                              </div>
                            </div>
                            <div className="signin-img">
                              <img src={signin} alt="signin" />
                            </div>
                          </div>
                          <div className="shubham-cards mt-5">
                            <div className="shubham-cards1 flex items-center">
                              <img className="goal" src={goal} alt="goal" />
                              <img
                                className="shubham"
                                src={shubham}
                                alt="shubham"
                              />
                              <div className="mr">
                                <h4>Mr. Shubham Gupta</h4>
                                <p>NO22MR183</p>
                              </div>
                            </div>
                            <div className="tistar">
                              <p>04 Days Leave Request</p>
                            </div>
                            <div className="date flex items-center">
                              <img src={calendarMonth} alt="calendarMonth" />
                              <div className="date1">
                                <h4>15 July 2021</h4>
                                <p>10 : 45 AM</p>
                              </div>
                            </div>
                            <div className="signin-img">
                              <img src={signin} alt="signin" />
                            </div>
                          </div>
                          <div className="shubham-cards  mt-5">
                            <div className="shubham-cards1 flex items-center">
                              <img className="goal" src={goal} alt="goal" />
                              <img
                                className="shubham"
                                src={shubham}
                                alt="shubham"
                              />
                              <div className="mr">
                                <h4>Mr. Shubham Gupta</h4>
                                <p>NO22MR183</p>
                              </div>
                            </div>
                            <div className="tistar">
                              <p>04 Days Leave Request</p>
                            </div>
                            <div className="date flex items-center">
                              <img src={calendarMonth} alt="calendarMonth" />
                              <div className="date1">
                                <h4>15 July 2021</h4>
                                <p>10 : 45 AM</p>
                              </div>
                            </div>
                            <div className="signin-img">
                              <img src={signin} alt="signin" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hrDash-status2 w-full ml-3">
                  <div className="interview">
                    <div className="interview-img flex items-start justify-between">
                      <h3>Interviews and Meetings</h3>
                      <img src={tanj} alt="tanj" />
                    </div>
                    <hr className="test" />

                    <div className="calendar calendar1  relative">
                      <NavLink to="/hrDash/atten">
                        <img clas width={12} src={arrow} alt="arrow" />
                      </NavLink>
                      <Calendar onChange={onChange} value={value} />
                    </div>

                    <div className="col-akash flex items-center ">
                      <div className="col-img">
                        <img src={akash} alt="akash" />
                      </div>
                      <div className="col-para">
                        <h3>Interview with Akash Negi</h3>
                        <p>Discussion on major changes on CRM software</p>
                        <h5>12:30  June 12,2022</h5>
                      </div>
                    </div>

                    <div className="col-akash flex items-center ">
                      <div className="col-img">
                        <img src={rahul} alt="akash" />
                      </div>
                      <div className="col-para">
                        <h3>Interview with Akash Negi</h3>
                        <p>Discussion on major changes on CRM software</p>
                        <h5>12:30  June 12,2022</h5>
                      </div>
                    </div>


                    <div className="col-akash flex items-center ">
                      <div className="col-img">
                        <img src={akash} alt="akash" />
                      </div>
                      <div className="col-para">
                        <h3>Interview with Akash Negi</h3>
                        <p>Discussion on major changes on CRM software</p>
                        <h5>12:30  June 12,2022</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <p>cmMdbU5</p> */}
        </div>
      </div>
    </>
  );
};
export default HrDashboard;
