
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRef } from 'react';
import html2pdf from "html2pdf.js";
import { dateFormatBg } from "../services/dateFormatBg";
import useAgeFromEGN from '../hooks/useAgeFromEGN';



// eslint-disable-next-line react/prop-types
function PrintRecipeModal({showModalRecipe,showmPr,dataPrint}) {

  
  const pdfRef = useRef();
  const age = useAgeFromEGN(dataPrint._patientId.egn);
    


  const generatePdf = () => {
    const element = pdfRef.current;
    

    html2pdf(element).from(element).save();
  };

  const handleClose = () => {
    showmPr(false);
  };

 

  return (
    <>
      <Modal  show={showModalRecipe} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Принтирай рецепта</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div ref={pdfRef}>
          
            <div className="float-left w-100 mt-1" style={{ fontSize: "1rem" }}>
              <div className="float-left  border border-dark" style={{ width: "450px", height: "850px" }}>
                <div className="float-left w-100 p-2 pl-3 border-bottom border-dark">
                  <div className="float-left">
                  <div className="mt-2" style={{ marginLeft: "5px" }}><b>Медицински специалист: {dataPrint._doctorId.name}</b></div>
                  <div className="mt-1" style={{ marginLeft: "5px" }}><b>УИН:{dataPrint._doctorId.uin}</b></div>
                  <div className="mt-1" style={{ marginLeft: "5px" }}><b>ЛЗ: 675423456</b></div>
                  <div className="mt-1" style={{ marginLeft: "5px" }}><b>Адрес:{dataPrint._doctorId.address}</b></div>
                  <div className="mt-1" style={{ marginLeft: "5px" }}><b>Дата:{dateFormatBg(dataPrint.date)}</b></div>
                  </div>
                </div>
                <div className="float-left w-100  pl-3 border-bottom border-dark">
                  <div className="" style={{ marginLeft: "10px" }}><b>Oтпускане: {dataPrint.exec}</b></div>
                </div>
                <div className="float-left w-100  pl-3 border-bottom border-dark" style={{ height: "160px" }}>
                  <div className="" style={{ marginLeft: "10px" }}><b>Rp.</b></div>
                  <div className="mt-2" style={{ marginLeft: "10px" }}><b>{dataPrint._medicamentId.name}</b></div>
                  <div className="mt-2" style={{ marginLeft: "10px" }}><b>{dataPrint.med_text}</b></div>
                  
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
                  <div className="mt-3" style={{ marginLeft: "5px" }}><b>Пациент:{dataPrint._patientId.name} </b></div>
                  <div className="mt-2" style={{ marginLeft: "5px" }}><b>Възраст: {age}</b></div>
                  <div className="mt-2" style={{ marginLeft: "5px" }}><b>Адрес: {dataPrint._patientId.address}</b></div>
                </div>
              </div>
            </div>
            
            {/* <button onClick={generatePdf}>Разпечатай рецепта</button> */}
            
          
        </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => showmPr(false)} >
            Отказ 
          </Button>
          <Button variant="primary" onClick={generatePdf} >
            Принтирай
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default  PrintRecipeModal;