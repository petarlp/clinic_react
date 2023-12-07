import * as shedulesService from "../services/shedulesService";
import * as doctorsService from "../services/doctorsService";
import * as patientsService from "../services/patientsService"; 
import { dateFormatBgHour } from "../services/dateFormatBgHour";
import { useEffect , useState } from "react";

import CreateEditSheduleModal from "../components/CreateEditSheduleModal";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

export default function Shedule() {
    const user_id = localStorage.getItem('user_id');

    const[shedules,setShedules] = useState([]);
    const[patients,setPatients] = useState([]);
    const[doctors,setDoctors] = useState([]);

    const[showModal, setShowModal] = useState(false);
    const[editIndex, setEditIndex] = useState(null);
    const[editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        _id: '',
        _ownerId: user_id,
        date: '',
        _patientId: '',
        _doctorId: '',
        notes: ''               
    });

    

    useEffect(() => {
        shedulesService.getAll()
        .then(result => setShedules(result))
        .catch(err => {
            console.log(err);
            Swal.fire({icon: "error",title: "Грешка",text: err.message,});
        });

        patientsService.getAll()
        .then(result => setPatients(result))
        .catch(err => {
            console.log(err);
            Swal.fire({icon: "error",title: "Грешка",text: err.message,});
        });

        doctorsService.getAll()
        .then(result => setDoctors(result))
        .catch(err => {
            console.log(err);
            Swal.fire({icon: "error",title: "Грешка",text: err.message,});
        });
    } , []);

    const showm = (val) => {setShowModal(val);};


    const addShedule = () => {
        setFormData({ _id: '', _ownerId: user_id, date: '', _patientId: '', _doctorId: '', notes: ''});
        setEditIndex(null);
        setEditId(null);
        setShowModal(true);
    };

    const editRecord = (id,index) => {

        const selectedData = shedules[index];

        setFormData({
            _id: id,
            date: selectedData.date,
            _patientId: selectedData._patientId._id,
            _doctorId: selectedData._doctorId._id,
            notes: selectedData.notes,
        });
        setShowModal(true);
        setEditIndex(index);
        setEditId(id);
    };

    const handleAddOrEdit = () => {
        if (editIndex !== null) {// Edit existing record
          const newData = [...shedules];
          newData[editIndex] = formData;
            shedulesService.update(editId,formData)
                .then(result => {
                    shedulesService.getAll()
                    .then(result => {setShedules(result)})
                    .catch(err => {
                        console.log(err);
                        Swal.fire({icon: "error",title: "Грешка",text: err.message,});
                    })
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({icon: "error",title: "Грешка",text: err.message,});
                })
          
        } else {// Add new record
            shedulesService.create(formData)
                .then(result => {
                    shedulesService.getAll()
                    .then(result => {setShedules(result)})
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
        setFormData({ _id: '', _ownerId: user_id , date: '', _patientId: '', _doctorId: '', notes: ''});
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
                     shedulesService.del(id)
                    .then(result => {
                        const newData = [...shedules];
                        newData.splice(ind, 1);
                        setShedules(newData);
                        Swal.fire({title: "Изтриване!",text: "Избрания запис беше изтрит.",icon: "success"});
                    })
                    .catch(err => { Swal.fire({icon: "error",title: "Грешка",text: err.message,}); })
            }
          });
    };

    return (
        <main id="main" className="main">

            <div className="pagetitle">
              <h1>Запазени часове</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Начало</a></li>
                  <li className="breadcrumb-item active">Запис на час</li>
                </ol>
              </nav>
            </div>

            <section className="section doctors">
                <div className="card">
                    <div className="card-body"> 
                        <div className=" mt-3">
                            <table className="table table-striped table-hover w-100">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Дата</th>
                                        <th scope="col">Пациент</th>
                                        <th scope="col">Доктор</th>
                                        <th scope="col">Забележки</th>
                                        <th scope="col">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shedules.map( (slist, index) => (
                                        <tr key={slist._id}>
                                            <td>{index + 1}</td>
                                            <td>{dateFormatBgHour(slist.date)}</td>
                                            <td>{slist._patientId.name}</td>
                                            <td>{slist._doctorId.name}</td>
                                            <td>{slist.notes}</td>
                                            <td>
                                                <i className="bi bi-pencil-square edit_but" onClick={ () => {editRecord(slist._id,index)}} ></i>
                                                <i className="bi bi-x-square del_but" onClick={() => {handleDelete(slist._id,index)}}></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            </section>

            <CreateEditSheduleModal showModal={showModal} showm={showm} editIndex={editIndex} formData={formData} setFormData={setFormData} handleAddOrEdit={handleAddOrEdit} patients={patients} doctors={doctors}/>

            <Button variant="primary" onClick={ () => addShedule() }>
                Запази нов час  
            </Button>

        </main>
    )
}