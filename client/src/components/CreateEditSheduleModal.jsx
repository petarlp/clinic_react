import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

// eslint-disable-next-line react/prop-types
function CreateEditSheduleModal({showModal,showm,editIndex,formData,setFormData,handleAddOrEdit, patients, doctors}) {
  

  const handleClose = () => {
    showm(false)
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormData({ ...formData, [id]: value });
  };

  const handleEdit = () => {
    
    if(
        !formData.date || 
        !formData._patientId || formData._patientId.trim() === '' || 
        !formData._doctorId || formData._doctorId.trim() === '' || 
        !formData.notes || formData.notes.trim() === '' 
      ) 
    {
      Swal.fire({icon: "error",title: "Грешка",text: "Моля попълнете всички полета",});
      return;
    }
    handleAddOrEdit();
  };

  return (
    <>
      
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Редакция на данни' : 'Добави запис'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
           
             
                <Form.Group className="mb-3" controlId="date">
                  <Form.Label>Дата </Form.Label><br/>
                  <DatePicker
                    selected={formData.date ? new Date(formData.date) : null} // Convert date string to Date object
                    onChange={(date) => setFormData({ ...formData, date })} 
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="dd/MM/yyyy HH:mm"
                    placeholderText="Избери дата и час"
                  />
                </Form.Group>
              
             
                <Form.Group className="mb-3" controlId="_patientId">
                <Form.Label>Пациент</Form.Label>
                  <Form.Control as="select" value={formData._patientId} onChange={handleInputChange}>
                    <option value="">Избери пациент</option>
                    {patients.map((patient, index) => (
                      <option key={patient._id} value={patient._id}>
                        {patient.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              
            
            
              
                <Form.Group className="mb-3" controlId="_doctorId">
                  <Form.Label>Доктор</Form.Label>
                    <Form.Control as="select" value={formData._doctorId} onChange={handleInputChange}>
                    <option value="">Избери доктор</option>
                    {doctors.map((doctor, index) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              
              
                <Form.Group className="mb-3" controlId="notes">
                <Form.Label>Забележки</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="по здравна каса"
                      type="radio"
                      id="notes1"
                      value="по здравна каса"
                      checked={formData.notes === "по здравна каса"}
                      onChange={() => setFormData({ ...formData, notes: "по здравна каса" })}
                    />
                    <Form.Check
                      inline
                      label="частен преглед"
                      type="radio"
                      id="notes2"
                      value="частен преглед"
                      checked={formData.notes === "частен преглед"}
                      onChange={() => setFormData({ ...formData, notes: "частен преглед" })}
                    />
                  </div>
              </Form.Group>
              
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => showm(false)}>
            Отказ
          </Button>
          <Button variant="primary" onClick={() => handleEdit()} >
              {editIndex !== null ? 'Редактирай' : 'Добави'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default  CreateEditSheduleModal;