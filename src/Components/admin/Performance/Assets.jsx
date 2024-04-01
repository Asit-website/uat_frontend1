import AdminSidebar from '../Sidebar/AdminSidebar';
import AdminNavbar from '../Navbar/AdminNavbar';
import { useMain } from '../../../hooks/useMain'
import annPlus from "../../images/annPlus.png"
import "./indicator.css"
import { useEffect, useState } from 'react';
import cross from "../../images/crossAn.png"
import { FaRegStar } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const Assets = ({ pop, setPop, setAlert }) => {
  const { user, createAssets, allEmployee, getAssets,deleteAssets,updateAssets  , getDepartments , getDesignations } = useMain();

  const [openForm, setOpenForm] = useState(false);

  const [employee, setEmployee] = useState([]);

  const [data, setData] = useState([]);

  const [refreshFlag, setRefreshFlag] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const [formdata, setFormdata] = useState({
    Employee: "",
    designation: "",
    department: "",
    additionProduct: "",
    toDate: "",
    product: "",
    description: ""
  })

  const changeHandler = (e) => {
    e.preventDefault();
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
        Employee: editData.Employee,
        Name: editData.Name,
        amount: editData.amount,
        purchaseDate: editData.purchaseDate,
        supportedDate: editData.supportedDate,
        description: editData.description
      })
    }
  }, [editData])


  const submitHandler = async (e) => {
    try {
      if (onEdit) {
        await updateAssets({ ...formdata });
        alert("update successfully");
        setRefreshFlag(!refreshFlag);
      }
      else {
        await createAssets({ ...formdata });
        alert("Successfuly Created");
        setRefreshFlag(!refreshFlag);
      }
      setOpenForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
    fetchEmployee();
  }, [refreshFlag]);


  const getData = async () => {
    const ans = await getAssets();
    setData(ans?.data);
    setRefreshFlag(!refreshFlag)
  }

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
            await deleteAssets(id);
            alert("delete Successfully");
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

  const fetchEmployee = async () => {
    const ans = await allEmployee();
    setEmployee(ans?.emp);

  }

  const [department , setDepartment] = useState([]);
  const [designation , setDesignation] = useState([]);

  const departmentCollect = async()=>{
    const ans2 = await  getDepartments();
    console.log(' ans2 ' , ans2);
    setDepartment(ans2?.data);
    
  }
  const designationCollect = async()=>{
    const ans3 = await getDesignations();
    console.log(' ans3 ' , ans3);
    setDesignation(ans3?.data);

  }

  useEffect(()=>{
    departmentCollect();
    designationCollect();
  },[])

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

                <h2>Assets</h2>
                <p>Dashboard <span> Assets</span> </p>

              </div>

              {/* rogth side  */}
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
                        NAME
                      </th>
                      <th scope="col" class="px-6 py-3">
                        USERS
                      </th>
                      <th scope="col" class="px-6 py-3">
                        PURCHASE DATE
                      </th>
                      <th scope="col" class="px-6 py-3">
                        SUPPORTED DATE
                      </th>
                      <th scope="col" class="px-6 py-3">
                        AMOUNT
                      </th>
                      <th scope="col" class="px-6 py-3">
                        DESCRIPTION
                      </th>

                      <th scope="col" class="px-6 py-3">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {
                      data.length > 0 ?
                        data.map((item, index) => (
                          <tr key={index} class="bg-white">

                            <td class="px-6 py-4">
                              {item?.Name}
                            </td>
                            <td class="px-6 py-4">
                              {item?.Employee}
                            </td>
                            <td class="px-6 py-4">
                              {item?.purchaseDate}
                            </td>
                            <td class="px-6 py-4">
                              {item?.supportedDate}
                            </td>

                            <td class="px-6 py-4">
                              {item?.amount}
                            </td>
                            <td class="px-6 py-4">
                              {item?.description}
                            </td>


                            <td class="px-6 py-4">
                              <div className='flex items-center sk'>
                                <i onClick={() => {
                                setOnEdit(true);
                                setEditData(item);
                                setOpenForm(true)
                              }}  className="fa-solid fa-pen-to-square"></i>
                                <i onClick={()=>{
                                  deleteProject(item?._id)
                                }} className="fa-solid fa-trash"></i>
                              </div>
                            </td>


                          </tr>
                        ))
                        :
                        <div className='noEntries'>

                          <span >No entries found</span>
                        </div>

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
                <h2>Create New Assets</h2>
                <img onClick={() => {
                  setOpenForm(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    Employee: "",
                    Name: "",
                    amount: "",
                    purchaseDate: "",
                    supportedDate: "",
                    description: ""
                  })
                }} className='cursor-pointer' src={cross} alt="" />
              </nav>

              <hr />

              <div className="allInputFileds">

                <label className='fullLabel' >
                  <p>Employee</p>
                  <select name="Employee" id="Employee" value={formdata.Employee} onChange={changeHandler}>
                    <option>Select</option>
                    {
                      employee?.map((val, index) => {
                        return <option key={index} value={val?.fullName}>{val?.fullName}</option>
                      })
                    }
                  </select>
                </label>

                <label htmlFor="Name" className='halfLabel' >
                  <p>Designation</p>
                  <select name="designation" value={formdata.designation} onChange={changeHandler}>
                    <option>Select</option>
                    {
                      designation?.map((val, index) => {
                        return <option key={index} value={val?.name}>{val?.name}</option>
                      })
                    }
                  </select>
                </label>

                <label className='halfLabel' >
                  <p>Department</p>
                  <select name="department" value={formdata.department} onChange={changeHandler}>
                    <option>Select</option>
                    {
                      department?.map((val, index) => {
                        return <option key={index} value={val?.name}>{val?.name}</option>
                      })
                    }
                  </select>
                </label>

                <label className='halfLabel' >
                  <p>Product</p>
                  <input value={formdata?.product} name='product' onChange={changeHandler} type="text" />
                </label>

                <label className='halfLabel' >
                  <p>To Date</p>
                  <input name='supportedDate' value={formdata?.toDate} onChange={changeHandler} type="date" />
                </label>

                <label className='fullLabel' >
                  <p>Additional Product</p>
                  <input name="additionProduct" id="description" onChange={changeHandler} cols="20" rows="3" value={formdata?.additionProduct} />
                </label>

                <label className='fullLabel' >
                  <p>Description</p>
                  <textarea name="description" id="description" onChange={changeHandler} cols="20" rows="3" value={formdata?.description}></textarea>
                </label>

              </div>

              <hr />

              <div className="createBtn">
                <button type='button' onClick={() => {
                  setOpenForm(false);
                  setOnEdit(false);
                  setEditData({});
                  setFormdata({
                    Employee: "",
                    Name: "",
                    amount: "",
                    purchaseDate: "",
                    supportedDate: "",
                    description: ""
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

export default Assets;