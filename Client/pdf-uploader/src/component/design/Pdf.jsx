import React, { useEffect, useState } from "react";
import {  useDispatch } from "react-redux";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfView";
import { pdfData } from "../../redux/File";
import Error from "./Error";
import instance from "../../utils/axios";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const Pdf = () => {
  const [file, setFile] = useState(null);
  const [errors,setErrors]=useState(null)

 
  const pdfId = JSON.parse(localStorage.getItem("Details"));
  console.log(pdfId);

  const dispatch = useDispatch();
  useEffect(() => {  
    try {
      const fetchData = async () => {
        const id = pdfId.id;
        console.log(id);
        const response = await instance.get(`/details/${id}`);
        console.log(response);

        if (response.data.status === "ok") {
          setFile(response.data.data);
          dispatch(
            pdfData({ // last time i use redux-perists so now this have role but iam not removing it
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
        }else{
           setErrors(response.data.error)
        }
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const base64encodedData = `data:application/pdf;base64,${file}`;//a data url represent a pdf file in a  base64 encoded format

  return (
    <>
     
    {  errors && <Error error={errors}/>}
      <div className="flex justify-between ">
        <div className="flex gap-x-4 md:gap-x-7 p-3 md:p-5 font-[Ubuntu]">
          <ion-icon
            class="mt-2 md:mt-0 text-2xl md:text-3xl font-semibold"
            name="home-outline"
          ></ion-icon>
          <div className=" mt-2 md:mt-0 w-[25px] md:w-[30px] h-[25px] md:h-[30px]">
            <img src={require("../assets/pdf-file.png")} alt="pdf-icon" />
          </div>
          <p className=" mt-2 md:mt-0 text-sm md:text-lg font-semibold text-black">
            Organize Pages: Extract
          </p>
        </div>
      </div>

      <hr className="mt-3" />
      {/* passing data as props as to react-pdf */}
      <PdfComp data={base64encodedData} /> 
    </>
  );
};

export default Pdf;
