import * as medicamentsService from "../services/medicamentsService";
import { useEffect , useState } from "react";
import CreateEditMedicamentsModal from "../components/CreateEditMedicamentsModal";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

export default function Medicaments() {

    const user_id = localStorage.getItem('user_id');

    const[medicaments,setMedicaments] = useState([]);

    const[showModal, setShowModal] = useState(false);
    const[editIndex, setEditIndex] = useState(null);
    const[editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        _id: '',
        _ownerId: user_id,
        name: ''
    });

    useEffect(() => {
        medicamentsService.getAll()
        .then(result => setMedicaments(result))
        .catch(err => console.log(err))
    } , []);

    const showm = (val) => {setShowModal(val);};

    const addMedicaments = () => {
        setFormData({ _id: '', _ownerId: user_id, name: ''});
        setEditIndex(null);
        setEditId(null);
        setShowModal(true);
    };

    const editRecord = (id,index) => {
        // const selectedData = patients.filter(item => item._id === id);
        const selectedData = medicaments[index];
        setFormData({
            _id: id,
            name: selectedData.name
        });
        setShowModal(true);
        setEditIndex(index);
        setEditId(id);
    };

    const handleAddOrEdit = () => {
        if (editIndex !== null) {// Edit existing record
          const newData = [...medicaments];
          newData[editIndex] = formData;
            medicamentsService.update(editId,formData)
                .then(result => {
                    setMedicaments(newData);
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({icon: "error",title: "Грешка",text: err.message,});
                })
          
        } else {// Add new record
            medicamentsService.create(formData)
                .then(result => {
                    medicamentsService.getAll()
                    .then(result => {setMedicaments(result)})
                    .catch(err => {
                        console.log(err);
                        Swal.fire({icon: "error",title: "Грешка",text: err.message,});
                    })
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({icon: "error",title: "Грешка",text: err.message,});
                })
          
        }
        setFormData({ _id: '', _ownerId: user_id , name: ''});
        setEditIndex(null);
        setEditId(null);
        setShowModal(false);
    };

    const handleDelete = (id,ind) => {
        Swal.fire({
            title: "Изтриване на запис!",
            text: "Сигурни ли сте?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Да , изтриване"
          }).then((result) => {
            if (result.isConfirmed) {
                medicamentsService.del(id)
                    .then(result => {
                        const newData = [...medicaments];
                        newData.splice(ind, 1);
                        setMedicaments(newData);
                        Swal.fire({title: "Изтриване!",text: "Избрания запис беше изтрит.",icon: "success"});
                    })
                    .catch(err => { Swal.fire({icon: "error",title: "Грешка",text: err.message,}); })
            }
          });
    };

    return (
        <main id="main" className="main">

            <div className="pagetitle">
              <h1>Списък лекарства</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Начало</a></li>
                  <li className="breadcrumb-item active">Лекарства</li>
                  <th scope="col">Действия</th>
                </ol>
              </nav>
            </div>

            <section className="section mkb">
                <div className="card">
                    <div className="card-body"> 
                        <div className=" mt-3">
                            <table className="table table-striped table-hover w-100">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Наименование</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicaments.map( (med, index) => (
                                        <tr key={med._id}>
                                            <td>{index + 1}</td>
                                            <td>{med.name}</td>
                                            <td>
                                                <i className="bi bi-pencil-square edit_but" onClick={ () => {editRecord(med._id,index)}} ></i>
                                                <i className="bi bi-x-square del_but" onClick={() => {handleDelete(med._id,index)}}></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            </section>

            <CreateEditMedicamentsModal showModal={showModal} showm={showm} editIndex={editIndex} formData={formData} setFormData={setFormData} handleAddOrEdit={handleAddOrEdit}/>
                

            <Button variant="primary" onClick={ () => addMedicaments() }>
                Нов Медикамент 
            </Button>

        </main>
    )
}