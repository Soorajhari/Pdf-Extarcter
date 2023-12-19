import React, { useState } from "react";
import instance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pdfData,setLoading,setError } from "../../redux/File";
import Spin from "./Spinner";
import Error from "./Error";
import { storagePdfData } from "../../functions/localStorage";
  
const Home = () => {
  const [file, setFile] = useState(null);
  const [errors,setErrors]=useState(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();

const {loading}=useSelector((state)=>state.pdfData)

const handleFileChange=(e)=>{
  const selectedFile = e.target.files[0];
  console.log(selectedFile)
  if (selectedFile && selectedFile.type === 'application/pdf') {
    setFile(selectedFile);
    setError(null);
  } else {
    setErrors('Please select a valid PDF file.');
  }
};

// const user=JSON.parse(localStorage.getItem("user"))
const {userInfo}=useSelector((state)=>state.loginData)
console.log(userInfo)
  const handleSubmit = async (e) => {// submiting file to the server side
    e.preventDefault();
    if(userInfo){
      dispatch(setLoading(true));
      try {
  
  
        const formdata = new FormData();// send file as formData
        formdata.append("files", file);
        
        const response = await instance.post("/upload-pdf", formdata);
    
        if (response.data.status == "ok") {
          console.log(response.data._id);
          const details={
            id:response.data._id
          }
          storagePdfData(details)
          dispatch(
            pdfData({
              id: response.data._id,
              fieldname: response.data.fieldname,
              originalname: response.data.originalname,
              encoding: response.data.encoding,
              mimetype: response.data.mimetype,
              destination: response.data.destination,
              filename: response.data.filename,
              path: response.data.path,
              size: response.data.size,
            })
          );
          navigate("/extract");
        }else{
          setErrors(response.data.error)
        }
      } catch (error) {
        console.log(error.message);
        dispatch(setError(true));
      }finally{
        dispatch(setLoading(false));
      }
    }else{
      { file ? navigate("/login"): navigate("/")}
    
    }

   
  }




  return (
    <>
    {  errors && <Error error={errors}/>}
    <div className="flex justify-center items-center min-h-screen font-[Ubuntu] overflow-y-hidden">
      <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
        <div className=" border border-gray-500 w-[600px] md:w-[800px] h-[400px] ">
          <div className=" w-[60px] md:w-[90px]  h-[60px] md:h-[90px] m-auto mt-20 ">
            <img src={require("../assets/pdf-file.png")} alt="pdf-icon" />
          </div>

          <p className=" text-xl md:text-3xl font-semibold text-black text-center mt-5">
            Extract Pages
          </p>
          <p className="text-center font-normal text-sm md:text-lg mt-2">
            Select your file ,then extract pages from it.
          </p>
          <div className="mt-5 text-center">
            <label className="text-center text-lg cursor-pointer bg-blue-500 text-white py-2 px-4 rounded">
              Choose File
              <input
                onChange={ handleFileChange
                }
                type="file"
                className="hidden"
                name="files"
                accept=".pdf" 
              />
            </label>
          </div>
          <div className="mt-5 text-center">
           
            <button
              type="submit"
              className="text-white p-2 w-[300px] h-[40px] bg-green-500 rounded-3xl text-xl"
            >
              {loading ? <Spin/> : "Upload"}
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
};

export default Home;
