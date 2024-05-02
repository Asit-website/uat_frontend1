import AdminSidebar from '../Sidebar/AdminSidebar';
import AdminNavbar from '../Navbar/AdminNavbar';
import { useMain } from '../../../hooks/useMain'
import annPlus from "../../images/annPlus.png"
import "./indicator.css"
import { useEffect, useState } from 'react';
import cross from "../../images/crossAn.png"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { FaRegStar, FaSleigh } from "react-icons/fa";
import toast from 'react-hot-toast';


const Indicator = ({ pop, setPop, setAlert }) => {

  const user1 = JSON.parse(localStorage.getItem("hrms_user"));
  // console.log(user1);
  const { user, createIndicator, getIndicator, deleteIndicator, updateIndicator,getBranchs, getDepartments, getDesingation } = useMain();

  const [openForm, setOpenForm] = useState(false);


  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [data, setData] = useState([]);
 
  const [branch,setBranch] = useState([]);
  const [department,setDepartment] = useState([]);
  const [designation,setDesignation] = useState([]);

  const [formdata, setFormdata] = useState({
    Branch: "",
    Department: "",
    Designation: "",
    businessProcessRating: "",
    projectManagemntRating: ""  
  });


  const getData = async () => {
    // console.log("caa");
    const ans = await getIndicator();
    // console.log(ans?.data);
    setData(ans?.data);
    setRefreshFlag(!refreshFlag);
  }

  useEffect(() => {
    getData();
  }, [refreshFlag])

  useEffect(()=>{
     getData1();
  },[refreshFlag])

  const getData1 = async () =>{
    const ans = await getBranchs();
    const ans1 = await getDepartments();
    setBranch(ans?.data);
    setDepartment(ans1?.data);
  }
  // const data = [
  //   {
  //     branch: "Head office",
  //     department: "xyz",
  //     designation: "xyz",
  //     overallRating: "5",
  //     addedBy: "khushel digi solution",
  //     createAt: "	Jan 4, 2024",

  //   },

  // ]

  // const deleteProject = async (id) =>{
  //   const ans = await deleteIndicator(id);
  //   console.log(ans);
  //   alert("delete Success");
  // }

  const deleteProject = async (id) => {

    confirmAlert({
      title: 'Are you sure to delete this data?',
      message: 'All related data to this will be deleted',
      buttons: [
        {
          label: 'Yes, Go Ahead!',
          style: {
            background: "#FF5449"
          },
          onClick: async () => {
            await deleteIndicator(id);
            toast.success("delete Successfully");
            setRefreshFlag(!refreshFlag);
            getData(); 
          }
        },
        {
          label: 'Cancel',

          onClick: () => null
        }
      ]
    });

  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    if (onEdit) {
      setFormdata({
        id: editData._id,
        Branch: editData.Branch,
        Department: editData.Department,
        Designation: editData.Designation,
        businessProcessRating: editData.businessProcessRating,
        projectManagemntRating: editData.projectManagemntRating
      })
    }
  }, [editData])

  const submitHandler = async (e) => {
    // e.preventDefault();
    try {
      if (onEdit) {
        const ans = await updateIndicator({ ...formdata });
        console.log(ans.data);
        toast.success("update successfully");
        setRefreshFlag(!refreshFlag);
      }
      else {
        const ans = await createIndicator({ ...formdata });
        console.log("rep ans ", ans);
        toast.success("Successfuly Created");
        setRefreshFlag(!refreshFlag);
      }
      setOpenForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  const getDepartmentId = (name) => {
    const depart = department.find(dep => dep.name === name);
    return depart ? depart._id : null; // Return department ID if found, otherwise null
  };
  

   const designationFetch = async()=>{

    const departmentId = getDepartmentId(formdata.Department);

       const ans2 = await getDesingation({id:departmentId });
       
       setDesignation(ans2?.data);

   }

   useEffect(()=>{

     if(formdata.Department !== "" && formdata.Department !== "Select Department" )
    designationFetch();
   },[formdata.Department])

  return (
    <>
      <div className="annDash relative h-full">

        <AdminSidebar pop={pop} setPop={setPop} />

        <div className="tm">
          <AdminNavbar user={user} setAlert={setAlert} />
          <div className="em">

            <div className='anNav'>

              {/* left sie */}
              <div className='anNavLeft'>

                <h2>Manage Indicator</h2>
                <p>Dashboard <span> Indicator</span> </p>

              </div>

              {/* right side  */}
              <div onClick={() => setOpenForm(true)} className='plusImg'>
                <img src={annPlus} alt="" />

              </div>

            </div>


            <main className='anMain'>

              {/* top */}
              <div className='anmainTop'>
                {/* left side */}
                <div className='anMLef'>

                  <select name="" id="">
                    <option value="10">10</option>
                  </select>

                  <span>entries per page</span>

                </div>

                {/* right side  */}
                <div className='anMaRi'>
                  <input type="text" placeholder='Search...' />
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
                        OVERALL RATING
                      </th>
                      <th scope="col" class="px-6 py-3">
                        ADDED BY
                      </th>
                      <th scope="col" class="px-6 py-3">
                        CREATED AT
                      </th>
                      <th scope="col" class="px-6 py-3">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {
                      data?.map((item, index) => (
                        <tr key={index} class="bg-white">

                          <td class="px-6 py-4">
                            {item.Branch}
                          </td>
                          <td class="px-6 py-4">
                            {item.Department}
                          </td>
                          <td class="px-6 py-4">
                            {item.Designation}
                          </td>
                          <td class="px-6 py-4">
                            {(item?.businessProcessRating) + (item?.projectManagemntRating)}
                          </td>

                          <td class="px-6 py-4">
                            {user1?.createdBy}
                          </td>
                          <td class="px-6 py-4">
                            {new Date(Number(item?.ts)).toLocaleDateString()}
                          </td>

                          <td class="px-6 py-4">
                            <div className='flex items-center sk'>
                              <i onClick={() => {
                                setOnEdit(true);
                                setEditData(item);
                                setOpenForm(true)
                              }} className="fa-solid fa-pen-to-square"></i>
                              <i onClick={() => {
                                deleteProject(item?._id)
                              }} className="fa-solid fa-trash"></i>
                            </div>
                          </td>


                        </tr>
                      ))
                    }



                  </tbody>

                </table>

                <p className='showText'>Showing 1 to 1 of 1 entries</p>

              </div>


            </main>

          </div>
        </div>

        {/* form  */}
        {
          openForm &&
          <div className='annFormwrap'>

            <form onSubmit={() => {
              submitHandler();
              setOpenForm(false);
            }} className='openform' >

              <nav>
                {/* left  */}
                <h2>Create New Indicator</h2>
                <img onClick={() => {
                  setOpenForm(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    Branch: "",
                    Department: "",
                    Designation: "",
                    businessProcessRating: "",
                    projectManagemntRating: ""
                  })
                }} className='cursor-pointer' src={cross} alt="" />
              </nav>

              <hr />

              <div className="allInputFileds">

                <label htmlFor="" className='fullLabel' >
                  <p>Branch</p>
                  <select name="Branch" value={formdata.Branch} onChange={changeHandler} id="">
                    <option value="Select Branch" >Select Branch</option>
                    {
                      branch?.map((val,index)=>{
                        return <option key={index} value={val?.name}>{val?.name}</option>
                      })
                    }
                    {/* <option value="Head Office">Head Office</option>
                    <option value="kushel">kushel</option> */}
                  </select>
                </label>

                <label className='halfLabel' >
                  <p>Department</p>
                  <select name="Department" value={formdata.Department} onChange={(e)=>{
                    changeHandler(e);
                      
                  }} >

                    <option value="Select Department" >Select Department</option>
                    {/* <option value="Developer">Developer</option>
                    <option value="Hr">Hr</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Manager">Manager</option> */}
                    {
                      department?.map((val,index)=>{
                        return <option key={index} value={val?.name}>{val?.name}</option>
                      })
                    }

                  </select>
                </label>

                <label className='halfLabel' >
                  <p>Designation</p>
                  <select name="Designation" value={formdata.Designation} onChange={changeHandler} id="">
                    <option value="Select Designation" >Select Designation</option>
                    {/* <option value="Developer">Developer</option>
                    <option value="Hr">Hr</option>
                    <option value="Manager">Manager</option>
                    <option value="Designer">Designer</option>
                    <option value="Graphic Designer">Graphic Designer</option> */}
                    {
                      designation?.map((val,index)=>{
                        return <option key={index} value={val?.name}>{val?.name}</option>
                      })
                    }
                  </select>
                </label>

                <label className='anotheLabel' >
                  <h2>Behavioural Competencies</h2>
                  <hr />
                  <div className='anWrap'>
                    {/* left  */}
                    <p>Business Process</p>
                    <div className='rating'>
                      {/* <FaRegStar />
                      <FaRegStar />
                      <FaRegStar />
                      <FaRegStar />
                      <FaRegStar /> */}

                      <input name='businessProcessRating' value={formdata.businessProcessRating} className='overall' onChange={changeHandler} type="number" placeholder='Overall rating out of 5' />

                    </div>
                  </div>
                </label>

                <label className='anotheLabel' >
                  <h2>Organizational Competencies</h2>
                  <hr />
                  <div className='anWrap'>
                    {/* left  */}
                    <p>Project Management</p>
                    <div className='rating'>
                      {/* <FaRegStar />
                      <FaRegStar />
                      <FaRegStar />
                      <FaRegStar />
                      <FaRegStar /> */}
                      <input name='projectManagemntRating' value={formdata.projectManagemntRating} className='overall' onChange={changeHandler} type="number" placeholder='Overall rating out of 5' />

                    </div>
                  </div>
                  {/* <div className='anWrap'>
                  
                    <p>Project Management</p>
                    <div className='rating'>
                     
                        <input className='overall' type="text" placeholder='Overall rating out of 5' />

                    </div>
                  </div> */}
                </label>



              </div>

              <hr />

              <div className="createBtn">
                <button type='button' onClick={() => {
                  setOpenForm(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    Branch: "",
                    Department: "",
                    Designation: "",
                    businessProcessRating: "",
                    projectManagemntRating: ""
                  })
                }} className='cancelBtn'>Cancel</button>
                <button type='submit' className='creteBtn'>{onEdit ? "Update" : "Create"}</button>
              </div>


            </form>
          </div>
        }

      </div>
    </>
  )
}

export default Indicator;