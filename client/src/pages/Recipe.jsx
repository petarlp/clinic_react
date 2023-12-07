import * as recipesService from "../services/recipesService";
import { dateFormatBg } from "../services/dateFormatBg";
import { useEffect , useState } from "react";

import * as medicamentsServise from "../services/medicamentsService";
import * as doctorsService from "../services/doctorsService";
import * as patientsService from "../services/patientsService"; 

import CreateEditRecipeModal from "../components/CreateEditRecipeModal";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'


export default function Recipe() {

    const user_id = localStorage.getItem('user_id');

    const[recipes,setRecipes] = useState([]);
    const[patients,setPatients] = useState([]);
    const[doctors,setDoctors] = useState([]);
    const[medicaments,setMedicaments] = useState([]);

    const[showModal, setShowModal] = useState(false);
    const[editIndex, setEditIndex] = useState(null);
    const[editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        _id: '',
        _ownerId: user_id,
        date: '',
        _patientId: '',
        _doctorId: '',
        _medicamentId: '',
        exec: '',
        med_text: '',                        
    });

    useEffect(() => {
        recipesService.getAll()
        .then(result => setRecipes(result))
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

        medicamentsServise.getAll()
        .then(result => setMedicaments(result))
        .catch(err => {
            console.log(err);
            Swal.fire({icon: "error",title: "Грешка",text: err.message,});
        });

    } , []);

    const showm = (val) => {setShowModal(val);};

    const addRecipes = () => {
        setFormData({ _id: '', _ownerId: user_id, date: '', _patientId: '', _doctorId: '', _medicamentId: '', exec: '', med_text: ''});
        setEditIndex(null);
        setEditId(null);
        setShowModal(true);
    };

    const editRecord = (id,index) => {

        const selectedData = recipes[index];

        console.log(selectedData);

        setFormData({
            _id: id,
            date: selectedData.date,
            _patientId: selectedData._patientId._id,
            _doctorId: selectedData._doctorId._id,
            _medicamentId: selectedData._medicamentId._id,
            exec: selectedData.exec,
            med_text: selectedData.med_text,
        });
        setShowModal(true);
        setEditIndex(index);
        setEditId(id);
    }

    const handleAddOrEdit = () => {
        if (editIndex !== null) {// Edit existing record
          const newData = [...recipes];
          newData[editIndex] = formData;
            recipesService.update(editId,formData)
                .then(result => {
                    recipesService.getAll()
                    .then(result => {setRecipes(result)})
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
            recipesService.create(formData)
                .then(result => {
                    recipesService.getAll()
                    .then(result => {setRecipes(result)})
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
        setFormData({ _id: '', _ownerId: user_id , date: '', _patientId: '', _doctorId: '', _medicamentId: '', exec: '', med_text: ''});
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
                    recipesService.del(id)
                    .then(result => {
                        const newData = [...recipes];
                        newData.splice(ind, 1);
                        console.log('splice');
                        console.log(newData);
                        setRecipes(newData);
                        Swal.fire({title: "Изтриване!",text: "Избрания запис беше изтрит.",icon: "success"});
                    })
                    .catch(err => { Swal.fire({icon: "error",title: "Грешка",text: err.message,}); })
            }
          });
    };

    return (
        <main id="main" className="main">

            <div className="pagetitle">
              <h1>Рецепти</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Начало</a></li>
                  <li className="breadcrumb-item active">Издадени рецепти</li>
                </ol>
              </nav>
            </div>

            <section className="section recipes">
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
                                        <th scope="col">Отпускане</th>
                                        <th scope="col">Лекарство</th>
                                        <th scope="col">Прием</th>
                                        <th scope="col">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recipes.map( (recip, index) => (
                                        <tr key={recip._id}>
                                            <td>{index + 1}</td>
                                            <td>{dateFormatBg(recip.date)}</td>
                                            <td>{recip._patientId.name}</td>
                                            <td>{recip._doctorId.name}</td>
                                            <td>{recip.exec}</td>
                                            <td>{recip._medicamentId.name}</td>
                                            <td>{recip.med_text}</td>
                                            <td>
                                                <i className="bi bi-pencil-square edit_but" onClick={ () => {editRecord(recip._id,index)}} ></i>
                                                <i className="bi bi-x-square del_but" onClick={() => {handleDelete(recip._id,index)}}></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            </section>

            <CreateEditRecipeModal showModal={showModal} showm={showm} editIndex={editIndex} formData={formData} setFormData={setFormData} handleAddOrEdit={handleAddOrEdit} patients={patients} doctors={doctors} medicaments={medicaments}/>

            <Button variant="primary" onClick={ () => addRecipes() }>
                Въведи рецепта   
            </Button>

        </main>
    )
}