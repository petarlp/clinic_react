
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'

// eslint-disable-next-line react/prop-types
function CreateDoctorsModal({showModal,showm,editIndex,formData,setFormData,handleAddOrEdit}) {
  

  const handleClose = () => {
    showm(false)
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleEdit = () => {
    
    if(
        !formData.name || formData.name.trim() === '' || 
        !formData.uin || formData.uin.trim() === '' || 
        !formData.codSpec || formData.codSpec.trim() === '' || 
        !formData.address || formData.address.trim() === '' 
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
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Имена</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="uin">
              <Form.Label>УИН</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.uin}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="codSpec">
              <Form.Label>Код спец.</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.codSpec}
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
          <Button variant="primary" onClick={() => handleEdit()} >
              {editIndex !== null ? 'Редактирай' : 'Добави'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default  CreateDoctorsModal;