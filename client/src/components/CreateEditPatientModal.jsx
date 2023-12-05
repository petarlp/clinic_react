
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



// eslint-disable-next-line react/prop-types
function CreateEditPatientModal({showModal,showm,editIndex,formData,setFormData,handleAddOrEdit}) {

  const handleClose = () => {
    showm(false)
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <>
      <Modal  show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Редакция на данни' : 'Добави запис'}</Modal.Title>
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

export default  CreateEditPatientModal;