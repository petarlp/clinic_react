import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

const PdfGenerator = (props) => {
  const pdfRef = useRef();

  const generatePdf = () => {
    const element = pdfRef.current;

    html2pdf(element).from(element).save();
  };

  return (
    <div ref={pdfRef}>
    <main id="main" className="main">
      <div className="float-left w-100 mt-1" style={{ fontSize: "1rem" }}>
        <div className="float-left  border border-dark" style={{ width: "450px", height: "850px" }}>
          <div className="float-left w-100 p-2 pl-3 border-bottom border-dark">
            <div className="float-left">
             <div className="mt-2" style={{ marginLeft: "5px" }}><b>Медицински специалист:</b></div>
             <div className="mt-1" style={{ marginLeft: "5px" }}><b>УИН:</b></div>
             <div className="mt-1" style={{ marginLeft: "5px" }}><b>ЛЗ: 675423456</b></div>
             <div className="mt-1" style={{ marginLeft: "5px" }}><b>Адрес:</b></div>
             <div className="mt-1" style={{ marginLeft: "5px" }}><b>Дата:</b></div>
            </div>
          </div>
          <div className="float-left w-100  pl-3 border-bottom border-dark">
            <div className="" style={{ marginLeft: "10px" }}><b>За еднократно отпускане</b></div>
          </div>
          <div className="float-left w-100  pl-3 border-bottom border-dark" style={{ height: "160px" }}>
            <div className="" style={{ marginLeft: "10px" }}><b>Rp.</b></div>
            <div className="mt-2" style={{ marginLeft: "10px" }}><b>--------</b></div>
            <div className="mt-2" style={{ marginLeft: "10px" }}><b>--------</b></div>
            
          </div>
          <div className="float-left w-100  pl-3 border-bottom border-dark" style={{ height: "160px" }}>
            <div className="" style={{ marginLeft: "10px" }}><b>Rp.</b></div>
            <p style={{ textAlign: "center", fontSize: "80px" }}>Z</p>
          </div>
          <div className="float-left w-100  pl-3 border-bottom border-dark" style={{ height: "160px" }}>
            <div className="" style={{ marginLeft: "10px" }}><b>Rp.</b></div>
            <p style={{ textAlign: "center", fontSize: "80px" }}>Z</p>
          </div>
          <div className="float-left w-100  pl-3 mt-2" style={{ height: "200px" }}>
            <div className="mt-3" style={{ marginLeft: "5px" }}><b>Медицински специалист:..........................................</b>{" "}</div>
            <span style={{ marginLeft: "230px" }}>подпис и печат</span>
            <div className="mt-3" style={{ marginLeft: "5px" }}><b>Пациент: </b></div>
            <div className="mt-2" style={{ marginLeft: "5px" }}><b>Възраст: </b></div>
            <div className="mt-2" style={{ marginLeft: "5px" }}><b>Адрес: </b></div>
          </div>
        </div>
      </div>
      
      <button onClick={generatePdf}>Разпечатай рецепта</button>
      
    </main>
      
    </div>
  );
};

export default PdfGenerator;
