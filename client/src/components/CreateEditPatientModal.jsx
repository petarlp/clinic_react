import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// eslint-disable-next-line react/prop-types
function CreateEditPatientModal({updateParentData, selUserId, showModal}) {

  const [show, setShow] = useState(showModal);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    egn: '',
    phoneNumber: '',
    address: '',
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3030/jsonstore/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        const fdata = formData;
        fdata._id = Object.values(result)[0];
        updateParentData(fdata);
        handleClose(); 
      } else {
        console.error('Грешка при запис:', response.statusText);
      }
    } catch (error) {
      console.error('Грешка при изпращането на данните:', error);
    }
  };

  useEffect(() => {
    if(selUserId >= 0) // if selUserId ==0 create new patient
    {
      setShow(true);
    }
  },[selUserId])

  return (
    <>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selUserId==0?'Въвеждане на нов пациент':'Редакция на пациент'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Имена</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="egn">
              <Form.Label>ЕГН/ЛНЧ</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.egn}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Адрес</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Group>

            

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отказ
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Запази данни
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default  CreateEditPatientModal;