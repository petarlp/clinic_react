import * as doctorsService from "../services/doctorsService";
import { useEffect , useState } from "react";
import  CreateDoctorsModal from "../components/CreateDoctorsModal";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'


export default function Doctors() {

    const[doctors,setDoctors] = useState([]);

    const[showModal, setShowModal] = useState(false);
    const[editIndex, setEditIndex] = useState(null);
    const[editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        uin: '',
        codSpec: '',
        address: '',
    });

    useEffect(() => {
        doctorsService.getAll()
        .then(result => setDoctors(result))
        .catch(err => {
            console.log(err);
            Swal.fire({icon: "error",title: "Oops...",text: err,});
        })
    } , [])

    const showm = (val) => {setShowModal(val);};

    const addDoc = () => {
        console.log('add doc');
        setFormData({ _id: '', name: '' , uin: '', codSpec: '', address: ''});
        setEditIndex(null);
        setEditId(null);
        setShowModal(true);
    };

    const editRecord = (id,index) => {

        const selectedData = doctors[index];
        setFormData({
            _id: id,
            name: selectedData.name,
            uin: selectedData.uin,
            codSpec: selectedData.codSpec,
            address: selectedData.address,
        });
        setShowModal(true);
        setEditIndex(index);
        setEditId(id);
    }

    const handleAddOrEdit = () => {
        if (editIndex !== null) {// Edit existing record
          const newData = [...doctors];
          newData[editIndex] = formData;
            doctorsService.update(editId,formData)
                .then(result => {
                    setDoctors(newData);
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({icon: "error",title: "Грешка",text: err.message,});
                })
          
        } else {// Add new record
            doctorsService.create(formData)
                .then(result => {
                    doctorsService.getAll()
                    .then(result => setDoctors(result))
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
        setFormData({ _id: '', name: '' , uin: '', codSpec: '', address: ''});
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
                     doctorsService.del(id)
                    .then(result => {
                        const newData = [...doctors];
                        newData.splice(ind, 1);
                        console.log('splice');
                        console.log(newData);
                        setDoctors(newData);
                        Swal.fire({title: "Изтриване!",text: "Избрания запис беше изтрит.",icon: "success"});
                    })
                    .catch(err => { Swal.fire({icon: "error",title: "Грешка",text: err.message,}); })
            }
          });
    };


    return (
        <main id="main" className="main">

            <div className="pagetitle">
              <h1>Списък на лекарите</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item active">Лекари</li>
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
                                        <th scope="col">Имена</th>
                                        <th scope="col">УИН</th>
                                        <th scope="col">Код спец.</th>
                                        <th scope="col">АДРЕС</th>
                                        <th scope="col">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doctors.map( (doctor, index) => (
                                        <tr key={doctor._id}>
                                            <td>{index + 1}</td>
                                            <td>{doctor.name}</td>
                                            <td>{doctor.uin}</td>
                                            <td>{doctor.codSpec}</td>
                                            <td>{doctor.address}</td>
                                            <td>
                                                <i className="bi bi-pencil-square edit_but" onClick={ () => {editRecord(doctor._id,index)}} ></i>
                                                <i className="bi bi-x-square del_but" onClick={() => {handleDelete(doctor._id,index)}}></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            </section>

            <CreateDoctorsModal showModal={showModal} showm={showm} editIndex={editIndex} formData={formData} setFormData={setFormData} handleAddOrEdit={handleAddOrEdit}/>

            <Button variant="primary" onClick={ () => addDoc() }>
                Нов лекар   
            </Button>

        </main>
    )
}