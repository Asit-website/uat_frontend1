import React, { useEffect, useState } from "react";
import AdminNavbar from "../../admin/Navbar/AdminNavbar";
import AdminSidebar from "../../admin/Sidebar/AdminSidebar";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import search from "../../images/bx-search.png";
import fff from "../../images/fff.png";
import { NavLink, useNavigate } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import toast from "react-hot-toast";
import download from "../../images/donwlaond.png";
import { IoIosCloseCircle } from "react-icons/io";
import downis from "../../images/downis.png";
const UserLead = ({ setAlert, pop, setPop }) => {
  const navigate = useNavigate();

  const {
    user,
    getLead3,
    deleteLeads,
    getUserByDesignation,
    getLeadByUser,
    closeLead,
  } = useMain();

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [card, setCard] = useState(false);

  const [leadUser, setLeadUser] = useState("Select User");

  const [desUsers, setDeUsers] = useState([]);

  const [Filter1, setFilter1] = useState("Select");

  const stylepeer2 = {
    display: card ? "block" : "none",
  };

  const [filter, setFilter] = useState(false);

  const stylePeer3 = {
    display: filter ? "block" : "none",
  };

  const [allLead, setAllLead] = useState([]);

  let hrms_user = JSON.parse(localStorage.getItem("hrms_user"));

  const [allLeading, setAlleading] = useState([]);

  const fetchLead = async () => {
    const ans = await getLead3();
    setAllLead(ans?.allLead);
    setAlleading(ans?.allLead);
  };

  useEffect(() => {
    fetchLead();
  }, [refreshFlag]);

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
            await deleteLeads(id);
            toast.success("delete Successfully");
            setRefreshFlag(!refreshFlag);
          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });
  };

  const [currentPage, setCurrentPage] = useState(1);

  let itemsPerPage = 10;

  const totalPages = Math.ceil(allLead?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = Math.min(startIndex + itemsPerPage, allLead?.length);

  const currentItems = allLead?.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const [sortDate, setSortDate] = useState("");
  const [sortDate2, setSortDate2] = useState("");

  const [OwnerFilter, setOwnerFilter] = useState(false);

  const handleCheckboxChange = (event) => {
    setOwnerFilter(event.target.checked);
  };

  const applyHandler = () => {
    if (OwnerFilter) {
      const filterdata = allLeading.filter((lead) => {
        const { LeadOwner } = lead;
        return LeadOwner?._id === hrms_user?._id;
      });
      setAllLead(filterdata);
    } else {
      setAllLead(allLeading);
    }
  };

  const fetchDesiUser = async () => {
    const ans = await getUserByDesignation();
    if (ans?.status) {
      setDeUsers(ans?.data);
    }
  };

  const getFilteLead = async () => {
    const ans = await getLeadByUser(leadUser);
    if (ans?.status) {
      setAllLead(ans?.data);
    } else {
      setAllLead(allLeading);
    }
  };

  useEffect(() => {
    if (
      sortDate !== undefined &&
      sortDate2 !== undefined &&
      sortDate != "" &&
      sortDate !== null &&
      sortDate2 != "" &&
      sortDate2 !== null
    ) {
      const sortedData = allLeading.filter((l) => {
        const { createAt } = l;

        const date = new Date(createAt);

        const cyear = date.getFullYear();
        const cmonth = date.getMonth() + 1;
        const cday = date.getDate();

        const [nyear, nmonth, nday] = sortDate.split("-");
        const [nyear2, nmonth2, nday2] = sortDate2.split("-");

        return (
          cyear >= parseInt(nyear) &&
          cyear <= parseInt(nyear2) &&
          cmonth >= parseInt(nmonth) &&
          cmonth <= parseInt(nmonth2) &&
          cday >= parseInt(nday) &&
          cday <= parseInt(nday2)
        );
      });

      setAllLead(sortedData);
    } else {
      setAllLead(allLeading);
    }
  }, [sortDate, sortDate2]);

  useEffect(() => {
    if (leadUser !== "" && leadUser !== "Select User") {
      getFilteLead();
    } else {
      setAllLead(allLeading);
    }
  }, [leadUser]);

  useEffect(() => {
    fetchDesiUser();
  }, []);

  useEffect(() => {
    if (leadUser === "Select User" || leadUser === "") {
      setAllLead(allLeading);
      return;
    } else {
      const userLead = allLeading.filter((ld) => ld?.LeadOwner === leadUser);

      let FiltData;

      const today = new Date();

      if (Filter1 === "Per Day") {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        FiltData = userLead.filter((ld) => {
          const createdAt = new Date(ld.createAt);
          return createdAt >= today && createdAt < tomorrow;
        });
      } else if (Filter1 === "This Week") {
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - 7);

        const lastDayOfWeek = new Date(today);

        FiltData = userLead.filter((ld) => {
          const createdAt = new Date(ld.createAt);
          return createdAt >= firstDayOfWeek && createdAt <= lastDayOfWeek;
        });
      } else if (Filter1 === "Last 14 Days") {
        const fourteenDaysAgo = new Date(today);
        fourteenDaysAgo.setDate(today.getDate() - 14);

        FiltData = userLead.filter((ld) => {
          const createdAt = new Date(ld.createAt);
          return createdAt >= fourteenDaysAgo && createdAt <= today;
        });
      } else if (Filter1 === "This Month") {
        const firstDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );
        const firstDayOfNextMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          1
        );

        FiltData = userLead.filter((ld) => {
          const createdAt = new Date(ld.createAt);
          return (
            createdAt >= firstDayOfMonth && createdAt <= firstDayOfNextMonth
          );
        });
      }

      setAllLead(FiltData);
    }
  }, [Filter1]);

  const [searchText, setSrchText] = useState("");

  useEffect(() => {
    if (searchText === "") {
      setAllLead(allLeading);
    } else {
      const filterData = allLeading.filter((lead) => {
        const leadName = `${lead.FirstName} ${lead.LastName}`.toLowerCase();
        return leadName.includes(searchText.toLowerCase());
      });
      setAllLead(filterData);
    }
  }, [searchText]);

  const closeLeadHandler = async (id) => {
    confirmAlert({
      title: "Are you sure to close this deal?",
      message: "All related data to this deal will closed",
      buttons: [
        {
          label: "Yes, Go Ahead!",
          style: {
            background: "#FF5449",
          },
          onClick: async () => {
            const toastId = toast.loading("Loading...");

            const ans = await closeLead(id);
            if (ans.status) {
              toast.success("Successfuly Done");
            }

            toast.dismiss(toastId);
          },
        },
        {
          label: "Cancel",

          onClick: () => null,
        },
      ],
    });
  };

  return (
    <>
      <div className="employee-dash h-full">
        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />

          <div className="em">
            <div className="leadThings">
              <div className="lead_content1">
                <h2>Lead Management</h2>
                <p>Real-time insights and performance overview</p>
              </div>
              <div className="lead_content2">
                <div className="leads_btn2">
                  <NavLink to="/adminDash/leadFile">
                    <button className="refresh">
                      <img src={download} alt="" />
                      <span className="ref1"> Import Leads</span>
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="laed1">
              <div>
                <div className="leftlead1">
                  {/* <img src={fff} alt="" /> */}

                  <div className="inptsearch">
                    <input
                      value={searchText}
                      onChange={(e) => setSrchText(e.target.value)}
                      type="text"
                      placeholder="Search leads"
                    />
                    <span>
                      <img src={search} alt="" />
                    </span>
                  </div>
                </div>

                {/* <div
                                    id="dropdown"
                                    className="z-10 dart hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                                    style={stylePeer3}
                                >
                                    <div className="filter_lead">
                                        <h2>Filter Leads by</h2>
                                    </div>
                                    <div className="trt_things">
                                        <div className="touched_things">
                                            <input type="checkbox" />
                                            <span>Touched Records</span>
                                        </div>
                                        <div className="fg">
                                            <span>By</span>
                                            <select className="testo" name="" id="">
                                                <option value="User & system">User & system</option>
                                            </select>
                                        </div>
                                        <div className="in_the">
                                            <select className="aloy1" name="" id="">
                                                <option value="In the last">In the last</option>
                                            </select>
                                            <div className="stoing">
                                                <input type="text" placeholder="2" />
                                            </div>
                                            <select className="aloy2" name="" id="">
                                                <option value="Days">Days</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="setting">
                                        <div className="some_things">
                                            <input type="checkbox" />
                                            <span>Untouched Records</span>
                                        </div>
                                        <div className="some_things">
                                            <input type="checkbox" />
                                            <span>Activities</span>
                                        </div>
                                        <div className="some_things">
                                            <input type="checkbox" />
                                            <span>Notes</span>
                                        </div>
                                        <div className="some_things">
                                            <input type="checkbox" />
                                            <span>Annual Revenue</span>
                                        </div>
                                        <div className="some_things">
                                            <input type="checkbox" />
                                            <span>Country</span>
                                        </div>
                                        <div className="some_things">
                                            <input type="checkbox" />
                                            <span>Created Time</span>
                                        </div>
                                        <div className="some_things">
                                            <input type="checkbox" />
                                            <span>Industry</span>
                                        </div>
                                        <div className="some_things">
                                            <input type="checkbox" />
                                            <span>Last Activity Time</span>
                                        </div>
                                        <div className="some_things">
                                            <input checked={OwnerFilter}
                                                onChange={handleCheckboxChange} type="checkbox" />
                                            <span>Lead Owner</span>
                                        </div>
                                    </div>
                                    <div className="apply_footer">
                                        <div className="apply">
                                            <button onClick={() => {
                                                applyHandler();
                                                setFilter(false);
                                            }}>Apply</button>
                                        </div>
                                        <div className="cancel">
                                            <button onClick={() => {
                                                setOwnerFilter(false);
                                                setAllLead(allLeading);
                                                setFilter(false);

                                            }}>Clear</button>
                                        </div>
                                    </div>
                                </div> */}
              </div>

              <div className="leaftlead2">
                <span>Sort by</span>

                <input
                  type="date"
                  value={sortDate}
                  onChange={(e) => setSortDate(e.target.value)}
                />

                <span>TO</span>

                <input
                  type="date"
                  value={sortDate2}
                  onChange={(e) => setSortDate2(e.target.value)}
                />
              </div>
            </div>

            <div>
              {/* apply currnt filter  */}

              <div className="table11">
                <div className="my_open my_open1">
                  <div className="sunis">
                    <h3>User Leads</h3>

                    <select
                      className="userFilterr"
                      name="leadUser"
                      onChange={(e) => {
                        setLeadUser(e.target.value);
                      }}
                      id=""
                    >
                      <option value="Select User">Select User</option>
                      {desUsers?.map((u, index) => (
                        <option key={index} value={u._id}>
                          {u?.fullName}
                        </option>
                      ))}
                    </select>
                    <img width="30" src={downis} alt="downis" />
                  </div>

                  <div className="test_filter">
                    <select
                      onChange={(e) => setFilter1(e.target.value)}
                      value={Filter1}
                      name="thisFilter"
                      id="fentar"
                    >
                      <option value="Select" disabled selected>
                        Select
                      </option>
                      <option value="Per Day">Per Day</option>
                      <option value="This Week"> This Week</option>
                      <option value="Last 14 Days">Last 14 Days</option>
                      <option value="This Month">This Month</option>
                    </select>
                    <img
                      width="30"
                      className="doqn doqn1"
                      src={downis}
                      alt=""
                    />
                  </div>
                </div>

                <div className="relative overflow-x-auto lonj">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className="thol saka">
                        <th scope="col" className="px-3 py-3">
                          <input type="checkbox" placeholder="" />
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 leadti makedivcent"
                        >
                          Company Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 leadti makedivcent"
                        >
                          {/* First Name */}
                          LeadName
                        </th>

                        {/* <th scope="col" className="px-3 py-3 leadti makedivcent">
                                                    Email
                                                </th> */}
                        <th
                          scope="col"
                          className="px-3 py-3 leadti makedivcent"
                        >
                          Website
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3 leadti makedivcent"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 leadti makedivcent"
                        >
                          Lead Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 leadti makedivcent"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentItems?.map((item, index) => {
                        return (
                          <tr key={index} className="">
                            <td scope="col" className="px-3 py-3">
                              <input type="checkbox" placeholder="" />
                            </td>
                            <td
                              scope="col"
                              className="px-3 py-3 myleadtit2 makedivcent"
                            >
                              {item?.Company}
                            </td>
                            <td
                              scope="col"
                              className="px-3 py-3 myleadtit2 makedivcent"
                            >
                              {item?.FirstName}
                              {item?.LastName}
                            </td>

                            {/* <td scope="col" className="px-3 py-3 myleadtit2 makedivcent">
                                                            {item?.Email}
                                                        </td> */}

                            <td
                              scope="col"
                              className="px-3 py-3 myleadtit2 makedivcent"
                            >
                              {item?.Website}
                            </td>

                            <td scope="col" className="px-3 py-3">
                              <div
                                scope="col"
                                className={`statussame 
                              ${
                                item?.LeadStatus === "Connected" && "connected"
                              } 
                              ${
                                item?.LeadStatus == "Nurturing" && "Nurturing"
                              } ${
                                  item?.LeadStatus == "Qualified" && "Qualified"
                                } 
                              ${
                                item?.LeadStatus == "Unqualified" &&
                                "Unqualified"
                              }  ${
                                  item?.LeadStatus == "Converted" && "Converted"
                                }
                               ${
                                 item?.LeadStatus == "Not Converted" &&
                                 "Converteds"
                               }
                               ${item?.LeadStatus == "Junk" && "Junk"}
                               ${item?.LeadStatus === "New" && "Newleadstatus"}
                              
                               `}
                              >
                                {item?.LeadStatus}
                              </div>
                            </td>

                            <td className="px-6 py-4 taskAns makedivcent">
                              {new Date(item?.createAt).toLocaleDateString(
                                "en-CA"
                              )}
                            </td>

                            <td className="thebuttn">
                              <div className="testok">
                                <svg
                                  className="cursor-pointer"
                                  onClick={() =>
                                    navigate("/adminDash/editLead", {
                                      state: item,
                                    })
                                  }
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.71569 5.51667L10.4824 6.28333L2.93236 13.8333H2.16569V13.0667L9.71569 5.51667ZM12.7157 0.5C12.5074 0.5 12.2907 0.583333 12.1324 0.741667L10.6074 2.26667L13.7324 5.39167L15.2574 3.86667C15.5824 3.54167 15.5824 3.01667 15.2574 2.69167L13.3074 0.741667C13.1407 0.575 12.9324 0.5 12.7157 0.5ZM9.71569 3.15833L0.499023 12.375V15.5H3.62402L12.8407 6.28333L9.71569 3.15833Z"
                                    fill="#383838"
                                  />
                                </svg>

                                <svg
                                  className="cursor-pointer"
                                  onClick={() => {
                                    navigate(
                                      `/adminDash/importLead/${item._id}`
                                    );
                                  }}
                                  width="20"
                                  height="14"
                                  viewBox="0 0 20 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.0002 2.41667C13.1585 2.41667 15.9752 4.19167 17.3502 7C15.9752 9.80833 13.1585 11.5833 10.0002 11.5833C6.84183 11.5833 4.02516 9.80833 2.65016 7C4.02516 4.19167 6.84183 2.41667 10.0002 2.41667ZM10.0002 0.75C5.8335 0.75 2.27516 3.34167 0.833496 7C2.27516 10.6583 5.8335 13.25 10.0002 13.25C14.1668 13.25 17.7252 10.6583 19.1668 7C17.7252 3.34167 14.1668 0.75 10.0002 0.75ZM10.0002 4.91667C11.1502 4.91667 12.0835 5.85 12.0835 7C12.0835 8.15 11.1502 9.08333 10.0002 9.08333C8.85016 9.08333 7.91683 8.15 7.91683 7C7.91683 5.85 8.85016 4.91667 10.0002 4.91667ZM10.0002 3.25C7.9335 3.25 6.25016 4.93333 6.25016 7C6.25016 9.06667 7.9335 10.75 10.0002 10.75C12.0668 10.75 13.7502 9.06667 13.7502 7C13.7502 4.93333 12.0668 3.25 10.0002 3.25Z"
                                    fill="#383838"
                                  />
                                </svg>

                                <svg
                                  className="cursor-pointer"
                                  onClick={() => {
                                    deleteProject(item?._id);
                                  }}
                                  width="12"
                                  height="16"
                                  viewBox="0 0 12 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.33317 5.5V13.8333H2.6665V5.5H9.33317ZM8.08317 0.5H3.9165L3.08317 1.33333H0.166504V3H11.8332V1.33333H8.9165L8.08317 0.5ZM10.9998 3.83333H0.999837V13.8333C0.999837 14.75 1.74984 15.5 2.6665 15.5H9.33317C10.2498 15.5 10.9998 14.75 10.9998 13.8333V3.83333Z"
                                    fill="#DE3730"
                                  />
                                </svg>

                                <div
                                  onClick={() => {
                                    closeLeadHandler(item?._id);
                                  }}
                                  className="subView"
                                >
                                  <IoIosCloseCircle className="incfornsizze" />
                                  {/* <p > Close </p> */}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (<div className="prev_next">
                  <div className="next">
                    <button onClick={prevPage} disabled={currentPage === 1}>
                      <span>Prev</span>
                      <svg
                        width="8"
                        height="10"
                        viewBox="0 0 8 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z"
                          fill="#666D76"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="on1">
                    <p>{currentPage}</p>
                  </div>

                  <div className="next">
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                    >
                      <span>Next</span>
                      <svg
                        width="8"
                        height="10"
                        viewBox="0 0 8 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.08748 0L0.912476 1.175L4.72914 5L0.912476 8.825L2.08748 10L7.08748 5L2.08748 0Z"
                          fill="#666D76"
                        />
                      </svg>
                    </button>
                  </div>
                </div>)}              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLead;
