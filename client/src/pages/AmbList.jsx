import * as alistsService from "../services/alistsService";
import { dateFormatBg } from "../services/dateFormatBg";
import { useEffect , useState } from "react";
import CreateEditAlistsModal from "../components/CreateEditAlistsModal";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

import * as mkbServise from "../services/mkbService";
import * as doctorsService from "../services/doctorsService";
import  * as patientsService from "../services/patientsService"; 

export default function AmbList() {
    const user_id = localStorage.getItem('user_id');

    const[alists,setAlists] = useState([]);
    const[patients,setPatients] = useState([]);
    const[doctors,setDoctors] = useState([]);
    const[mkbs,setMkbs] = useState([]);

    const[showModal, setShowModal] = useState(false);
    const[editIndex, setEditIndex] = useState(null);
    const[editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        _id: '',
        _ownerId: user_id,
        date: '',
        _patientId: '',
        _doctorId: '',
        _mkbId: '',
        main_diagnose: '',
        med_history: '',
        obj_state: '',
        med_research: '',
        teraphy: '',                         
    });

    useEffect(() => {
        alistsService.getAll()
        .then(result => setAlists(result))
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

        mkbServise.getAll()
        .then(result => setMkbs(result))
        .catch(err => {
            console.log(err);
            Swal.fire({icon: "error",title: "Грешка",text: err.message,});
        });
    } , [])

    const showm = (val) => {setShowModal(val);};

    const addAlist = () => {
        setFormData({ _id: '', _ownerId: user_id, date: '', _patientId: '', _doctorId: '', _mkbId: '', main_diagnose: '', med_history: '', obj_state: '', med_research: '', teraphy: '',});
        setEditIndex(null);
        setEditId(null);
        setShowModal(true);
    };

    const editRecord = (id,index) => {

        const selectedData = alists[index];


        console.log(selectedData);

        setFormData({
            _id: id,
            date: selectedData.date,
            _patientId: selectedData._patientId._id,
            _doctorId: selectedData._doctorId._id,
            _mkbId: selectedData._mkbId._id,
            main_diagnose: selectedData.main_diagnose,
            med_history: selectedData.med_history,
            obj_state: selectedData.obj_state,
            med_research: selectedData.med_research,
            teraphy: selectedData.teraphy,
        });
        setShowModal(true);
        setEditIndex(index);
        setEditId(id);
    }

    const handleAddOrEdit = () => {
        if (editIndex !== null) {// Edit existing record
          const newData = [...alists];
          newData[editIndex] = formData;
            alistsService.update(editId,formData)
                .then(result => {
                    alistsService.getAll()
                    .then(result => {setAlists(result)})
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
            alistsService.create(formData)
                .then(result => {
                    alistsService.getAll()
                    .then(result => {setAlists(result)})
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
        setFormData({ _id: '', _ownerId: user_id , date: '', _patientId: '', _doctorId: '', _mkbId: '', main_diagnose: '', med_history: '', obj_state: '', med_research: '', teraphy: ''});
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
                     alistsService.del(id)
                    .then(result => {
                        const newData = [...alists];
                        newData.splice(ind, 1);
                        console.log('splice');
                        console.log(newData);
                        setAlists(newData);
                        Swal.fire({title: "Изтриване!",text: "Избрания запис беше изтрит.",icon: "success"});
                    })
                    .catch(err => { Swal.fire({icon: "error",title: "Грешка",text: err.message,}); })
            }
          });
    };

    return (
        <main id="main" className="main">

            <div className="pagetitle">
              <h1>Ambulatore List</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item active">Ambulatore List</li>
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
                                        <th scope="col">МКБ</th>
                                        <th scope="col">Основна диагноза</th>
                                        <th scope="col">Анамнеза</th>
                                        <th scope="col">Обективно състояние</th>
                                        <th scope="col">Изследвания</th>
                                        <th scope="col">Терапия</th>
                                        <th scope="col">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alists.map( (alist, index) => (
                                        <tr key={alist._id}>
                                            <td>{index + 1}</td>
                                            <td>{dateFormatBg(alist.date)}</td>
                                            <td>{alist._patientId.name}</td>
                                            <td>{alist._doctorId.name}</td>
                                            <td>{alist._mkbId.code}/{alist._mkbId.text}</td>
                                            <td>{alist.main_diagnose}</td>
                                            <td>{alist.med_history}</td>
                                            <td>{alist.obj_state}</td>
                                            <td>{alist.med_research}</td>
                                            <td>{alist.teraphy}</td>
                                            <td>
                                                <i className="bi bi-pencil-square edit_but" onClick={ () => {editRecord(alist._id,index)}} ></i>
                                                <i className="bi bi-x-square del_but" onClick={() => {handleDelete(alist._id,index)}}></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            </section>

            <CreateEditAlistsModal showModal={showModal} showm={showm} editIndex={editIndex} formData={formData} setFormData={setFormData} handleAddOrEdit={handleAddOrEdit} patients={patients} doctors={doctors} mkbs={mkbs}/>

            <Button variant="primary" onClick={ () => addAlist() }>
                Въведи амбулаторен лист   
            </Button>

        </main>
    )
}