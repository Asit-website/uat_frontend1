import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useMain } from "../../../hooks/useMain";
import pluss from "../../images/pluss.png";
import search from "../../images/bx-search.png";
import fff from "../../images/fff.png";
import { NavLink, useNavigate } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css"; 
import toast from "react-hot-toast";
import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminNavbar from "../Navbar/AdminNavbar";
import actions from "../../images/actions.png";
import happy from "../../images/bx-happy-heart-eyes.png";
import deleted from "../../images/deletedd.svg";
import edit22 from "../../images/edit22.png";

const MyLead2 = ({ setAlert, pop, setPop }) => {
  const navigate = useNavigate();

  const { user, getLead, deleteLeads, getUserByDesignation } = useMain();

  const [desUsers, setDeUsers] = useState([]);

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [card, setCard] = useState(false);

  const [Filter1, setFilter1] = useState("Select");

  const [currView, setCurrView] = useState(-1);

  const [allLeading, setAllLeading] = useState([]);
  const [allLead, setAllLead] = useState([]);
  const [allData, setAllData] = useState([]);

  const fetchLead = async () => {
    const ans = await getLead("", "", "", "");
    setAllLead(ans?.data);
    setAllData(ans?.data);
    setAllLeading(ans?.data);
  };

  const [filterInput, setFilterInput] = useState();

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

  useEffect(() => {
    if (filterInput) {
      const filtered = allLeading.filter((lead) => {
        const leadDate = new Date(lead.createAt);
        const currentDate = new Date();
        const daysAgo = new Date(
          currentDate.setDate(currentDate.getDate() - filterInput)
        );
        return leadDate >= daysAgo;
      });

      setAllLead(filtered);
    } else {
      setAllLead(allLeading);
    }
  }, [filterInput, allLeading]);

  const [currentPage, setCurrentPage] = useState(1);

  let itemsPerPage = 10;

  const totalPages = Math?.ceil(allLead?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = Math.min(startIndex + itemsPerPage, allLead?.length);

  const currentItems = allLead?.slice(startIndex, endIndex);

  const [sortDate, setSortDate] = useState("");

  const [sortDate2, setSortDate2] = useState("");

  const fetchDesiUser = async () => {
    const ans = await getUserByDesignation();
    if (ans?.status) {
      setDeUsers(ans?.data);
    }
  };

  useEffect(() => {
    setCurrentPage(1);

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
    fetchDesiUser();
  }, []);

  // this is for filter per day one
  useEffect(() => {
    let FiltData;

    const today = new Date();
    setCurrentPage(1);

    if (Filter1 === "Per Day") {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      FiltData = allLeading.filter((ld) => {
        const createdAt = new Date(ld.createAt);
        return createdAt >= today && createdAt < tomorrow;
      });
    } else if (Filter1 === "This Week") {
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - 7);

      const lastDayOfWeek = new Date(today);

      FiltData = allLeading.filter((ld) => {
        const createdAt = new Date(ld.createAt);
        return createdAt >= firstDayOfWeek && createdAt <= lastDayOfWeek;
      });
    } else if (Filter1 === "Last 14 Days") {
      const fourteenDaysAgo = new Date(today);
      fourteenDaysAgo.setDate(today.getDate() - 14);

      FiltData = allLeading.filter((ld) => {
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

      FiltData = allLeading.filter((ld) => {
        const createdAt = new Date(ld.createAt);
        return createdAt >= firstDayOfMonth && createdAt <= firstDayOfNextMonth;
      });
    }

    setAllLead(FiltData);
  }, [Filter1]);

  const [searchText, setSrchText] = useState("");

  useEffect(() => {
    setCurrentPage(1);
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const [checkInpId, setCheckInpId] = useState([]);

  const checkallinput = () => {
    const idList = allData.map((d) => d?._id);
    setCheckInpId(idList);
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
                  <button className="lead_btn2">
                    <NavLink className="such_thing" to="/employeeDash/createLead">
                      {" "}
                      <img src={pluss} alt="" />{" "}
                      <span className="colp"> Create New Lead </span>{" "}
                    </NavLink>
                  </button>

                  <NavLink to="/employeeDash/leadFile">
                    <button className="refresh">
                      <span className="ref1">Import Leads</span>
                    </button>
                  </NavLink>

                  <div></div>

                 


                </div>
              </div>
            </div>

            <div className="laed1">
              {/* left side */}
              <div>
                <div className="leftlead1">
                  <div className="inptsearch">
                    <input
                      value={searchText}
                      onChange={(e) => setSrchText(e.target.value)}
                      type="text"
                      placeholder="Search leads"
                    />
                    <span>
                      <img className="cursor-pointer" src={search} alt="" />
                    </span>
                  </div>

                  {/* <img src={fff} alt="" /> */}
                </div>

          
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
              </div>

              <div className="relative   overflow-x-auto w-full">
                <table className="w-full table1 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs uppercase textALLtITL ">
                    <tr>
                      <th scope="col" className="px-6 py-3 taskTitl ">
                        <input
                          onClick={() => {
                            if (checkInpId?.length === allData?.length) {
                              setCheckInpId([]);
                            } else {
                              checkallinput();
                            }
                          }}
                          checked={checkInpId?.length === allData.length}
                          type="checkbox"
                          className="checkboxes"
                        />
                      </th>
                      <th scope="col" className="px-6 py-3 taskTitl ">
                        Company Name
                      </th>
                      <th scope="col" className="px-6 py-3 taskTitl ">
                        LeadName
                      </th>
                      <th scope="col" className="px-6 py-3 taskTitl ">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 taskTitl ">
                        Website
                      </th>
                      <th scope="col" className="px-6 py-3 taskTitl ">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 taskTitl ">
                        Lead Date
                      </th>

                      <th scope="col" className="px-6 py-3 taskTitl ">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr key={index} className="bg-white border-b fdf">
                        <th scope="col" className="px-6 py-3 taskTitl ">
                          <input
                            onClick={() => {
                              if (checkInpId.includes(item?._id)) {
                                const filterdata = checkInpId.filter(
                                  (id) => id !== item?._id
                                );
                                setCheckInpId(filterdata);
                              } else {
                                setCheckInpId((prev) => [...prev, item?._id]);
                              }
                            }}
                            checked={checkInpId.includes(item?._id)}
                            type="checkbox"
                            className="checkboxes"
                          />
                        </th>

                        <td className="px-6 py-4 taskAns">{item?.Company}</td>
                        <td className="px-6 py-4 taskAns">
                          {item?.FirstName} {item?.LastName}
                        </td>
                        <td className="px-6 py-4 taskAns">{item?.Email}</td>
                        <td className="px-6 py-4 taskAns">{item?.Website}</td>

                        <td scope="col" className="px-3 py-3">
                          <div
                            scope="col"
                            className={`statussame ${
                              item?.LeadStatus === "Follow-up" && "followUp"
                            } ${item?.LeadStatus == "Hot" && "Hot"} ${
                              item?.LeadStatus == "Cold" && "Cold"
                            } ${item?.LeadStatus == "cold" && "Cold"}  ${
                              item?.LeadStatus == "Warm" && "Warm"
                            }`}
                          >
                            {item?.LeadStatus}
                          </div>
                        </td>

                        <td className="px-6 py-4 taskAns">
                          {new Date(item?.createAt).toLocaleDateString("en-CA")}
                        </td>

                        <OutsideClickHandler
                          onOutsideClick={() => {
                            if (index == currView) {
                              setCurrView(-1);
                            }
                          }}
                        >
                          <div className="viewOnwWRAP">
                            <td
                              onClick={() => {
                                if (index == currView) {
                                  setCurrView(-1);
                                } else {
                                  setCurrView(index);
                                }
                              }}
                              className="px-6 py-4 taskAns cursor-pointer"
                            >
                              <img src={actions} alt="" />
                            </td>

                            {index == currView && (
                              <div className=" viewOne">
                                {/* first  */}
                                <div
                                 onClick={() => {
                                  navigate(
                                    `/employeeDash/importLead/${item._id}`
                                  );
                                }}
                                  className="subView"
                                >
                                  <img src={happy} alt="" />
                                  <p>View</p>
                                </div>

                                <hr />

                                {/* second */}
                                {
                                  //  (employeeManageEditPermission || role === "ADMIN") &&

                                  <div
                                  
                                    onClick={() => {
                                      navigate("/employeeDash/editLead", {
                                        state: item,
                                      });
                                    }}
                                    className="subView"
                                  >
                                    <img src={edit22} alt="" />
                                    <p>Edit </p>
                                  </div>
                                }

                                <hr />

                                {/* third */}
                                {
                                  // (employeeManageActivatePermission || role === "ADMIN") &&

                                  <div
                                    onClick={() => {
                                      deleteProject(item?._id);
                                    }}
                                    className="subView"
                                  >
                                    <img src={deleted} alt="" />
                                    <p > Delete </p>
                                  </div>
                                }
                              </div>
                            )}
                          </div>
                        </OutsideClickHandler>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="emPaginate">
              <button
                className={`prepaginate ${
                  currentPage !== 1 && "putthehovebtn"
                }`}
                onClick={() => {
                  handlePageChange(currentPage - 1);
                  scrollToTop();
                }}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="pagenum">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`prepaginate ${
                  currentPage !== totalPages && "putthehovebtn"
                } `}
                onClick={() => {
                  handlePageChange(currentPage + 1);
                  scrollToTop();
                }}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyLead2;
