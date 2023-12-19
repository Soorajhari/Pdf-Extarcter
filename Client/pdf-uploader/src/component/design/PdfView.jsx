import { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./mypdf.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ExtractedData } from "../../redux/Extractedfile";
import Error from "./Error";
import instance from "../../utils/axios";

function PdfComp(props) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedPages, setSelectedPages] = useState([]);
  const [errors,setErrors]=useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const { pdfInfo } = useSelector((state) => state.pdfData);

  console.log(selectedPages);
  const handleCheckboxChange = (page) => {   // getting the user selected page numbers to the state 
    const newSelectedPages = [...selectedPages];
    if (newSelectedPages.includes(page)) {
      const index = newSelectedPages.indexOf(page);
      newSelectedPages.splice(index, 1);
    } else {
      newSelectedPages.push(page);
    }
    setSelectedPages(newSelectedPages);
  };

  const createSelectedPdf = async () => {       // sending the  user selelcte page number and  pdf _id to server  side 
    try {
      const id = pdfInfo.id;
      const response = await instance.post("/extract", {
        _id: id,
        selectedpages: selectedPages,
      });
      console.log(response.data);
      if (response.data.status == "ok") {
        const base64Data = response.data.data;

        const base64encodedData = `data:application/pdf;base64,${base64Data}`; 
        dispatch(ExtractedData(base64encodedData));
        navigate("/download");
      }else{
      setErrors(response.data.error)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
    {  errors && <Error error={errors}/>}
    <div className="mypdfCanvas">
      <Document
        className="flex-wrap flex"
        file={props.data}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
          <div key={page}>
            <input
              className=" ml-24 "
              type="checkbox"
              onChange={() => handleCheckboxChange(page)}
              checked={selectedPages.includes(page)}
            />
            <Page
              pageNumber={page}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
            <p className="flex justify-center">Page {page}</p>
          </div>
        ))}
      </Document>
      <div className="flex justify-center mb-10">
        <button
          className="p-2 bg-green-400 w-[170px] h-[50px] text-white font-semibold text-xl rounded-3xl"
          onClick={createSelectedPdf} // button for extaract
        >
          Extract
        </button>
      </div>
    </div>
    </>
  );
}

export default PdfComp;
