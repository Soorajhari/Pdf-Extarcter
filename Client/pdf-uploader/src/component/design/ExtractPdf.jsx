import React, { useState } from "react";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Viewer } from "@react-pdf-viewer/core";
import { useSelector } from "react-redux";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./mypdf.css";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const ExtractPdf = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin(); // from react-pdf-viewer
 const navigate=useNavigate()
const logout=useLogout()


  const handleClick = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const { pdfData } = useSelector((state) => state.extractedData);
  console.log(pdfData);

  return (
    <>
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

        <div className=" mr-5 md:mr-16 mt-7 flex gap-x-6 md:gap-x-10">
        <div>
              <button
                onClick={()=>handleClick()}
                className="bg-[#3981b6] p-1 md:p-2 w-[50px] md:w-[90px] rounded-2xl shadow-md text-white text-xs md:text-lg font-semibold"
              >
                Logout
              </button>
            </div>
          <p className="text-[#3189b6] text-base md:text-xl lg:text-2xl font-bold">
            Pdf- <span className="text-[#1AACAC]">Uploader</span>
          </p>
        </div>
      </div>

      <hr className="mt-3" />

      <Viewer
        fileUrl={pdfData} // data from the redux store is passed to react-pdf-viewer here you can download pdf ,provided by react-pdf-viewer
        plugins={[defaultLayoutPluginInstance]}
        
      />
    </>
  );
};

export default ExtractPdf;
