import { Button, Form, Modal, Row, Col } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
function CreateEditRecipeModal({showModal,showm,editIndex,formData,setFormData,handleAddOrEdit, patients, doctors, medicaments}) {
  

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
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="_patientId">
                <Form.Label>Пациент</Form.Label>
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
                <Form.Group className="mb-3" controlId="_medicamentId">
                  <Form.Label>Лекарство</Form.Label>
                    <Form.Control as="select" value={formData._medicamentId} onChange={handleInputChange}>
                      <option value="">Избери лекарство</option>
                      {medicaments.map((med, index) => (
                        <option key={med._id} value={med._id}>
                          {med.name}
                        </option>
                      ))}
                    </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3" controlId="exec">
              <Form.Label>Отпускане</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.exec}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="med_text">
              <Form.Label>Прием</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.med_text}
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

export default  CreateEditRecipeModal;