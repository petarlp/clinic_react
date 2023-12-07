import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// eslint-disable-next-line react/prop-types
function CreateEditAlistsModal({showModal,showm,editIndex,formData,setFormData,handleAddOrEdit, patients, doctors, mkbs}) {
  

  const handleClose = () => {
    showm(false)
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormData({ ...formData, [id]: value });
  };

  return (
    <>
      
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Редакция на данни' : 'Добави запис'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="date">
                  <Form.Label>Дата</Form.Label>
                  <DatePicker
                    selected={formData.date ? new Date(formData.date) : null} // Convert date string to Date object
                    onChange={(date) => setFormData({ ...formData, date })} 
                    dateFormat="dd/MM/yyyy" 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="_patientId">
                  <Form.Label>Пациент</Form.Label>
                  {/* <Form.Control
                    type="text"
                    placeholder=""
                    value={formData.patient}
                    onChange={handleInputChange}
                  /> */}

                <Form.Control as="select" value={formData._patientId} onChange={handleInputChange}>
                  <option value="">Избери пациент {formData._patientId}</option>
                  {patients.map((patient, index) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.name}
                    </option>
                  ))}
                </Form.Control>

                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="_doctorId">
                  <Form.Label>Доктор</Form.Label>
                  {/* <Form.Control
                    type="text"
                    placeholder=""
                    value={formData.doctor}
                    onChange={handleInputChange}
                  /> */}
                    <Form.Control as="select" value={formData._doctorId} onChange={handleInputChange}>
                    <option value="">Избери доктор</option>
                    {doctors.map((doctor, index) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="_mkbId">
                  <Form.Label>МКБ</Form.Label>
                    <Form.Control as="select" value={formData._mkbId} onChange={handleInputChange}>
                      <option value="">Избери МКБ</option>
                      {mkbs.map((mkb, index) => (
                        <option key={mkb._id} value={mkb._id}>
                          {mkb.text}
                        </option>
                      ))}
                    </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3" controlId="main_diagnose">
              <Form.Label>Основна диагноза</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.main_diagnose}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="med_history">
              <Form.Label>Анамнеза</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.med_history}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="obj_state">
              <Form.Label>Обективно състояние</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.obj_state}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="med_research">
              <Form.Label>Изследвания</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.med_research}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="teraphy">
              <Form.Label>Терапия</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.teraphy}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => showm(false)}>
            Отказ
          </Button>
          <Button variant="primary" onClick={() => handleAddOrEdit()} >
              {editIndex !== null ? 'Редактирай' : 'Добави'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default  CreateEditAlistsModal;