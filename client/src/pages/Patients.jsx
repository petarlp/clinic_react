import  * as patientsService from "../services/patientsService"; 
import { useEffect , useState } from "react";
import  CreateEditPatientModal from "../components/CreateEditPatientModal"
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'


export default function Patients() {

    const user_id = localStorage.getItem('user_id');

    const[patients,setPatients] = useState([]);

    const[showModal, setShowModal] = useState(false);
    const[editIndex, setEditIndex] = useState(null);
    const[editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        _id: '',
        _ownerId: user_id,
        name: '',
        egn: '',
        phoneNumber: '',
        address: '',
    });

    useEffect(() => {
        patientsService.getAll()
        .then(result => {setPatients(result)})
        .catch(err => {
            console.log(err);
            Swal.fire({icon: "error",title: "Грешка",text: err.message,});
        })
    } , [])


    const showm = (val) => {setShowModal(val);};

    const addPat = () => {
        setFormData({ _id: '', _ownerId: user_id, name: '' , egn: '', phoneNumber: '', address: ''});
        setEditIndex(null);
        setEditId(null);
        setShowModal(true);
    };

    const editRecord = (id,index) => {
        // const selectedData = patients.filter(item => item._id === id);
        const selectedData = patients[index];
        setFormData({
            _id: id,
            name: selectedData.name,
            egn: selectedData.egn,
            phoneNumber: selectedData.phoneNumber,
            address: selectedData.address,
        });
        setShowModal(true);
        setEditIndex(index);
        setEditId(id);
    }

    const handleAddOrEdit = () => {
        if (editIndex !== null) {// Edit existing record
          const newData = [...patients];
          newData[editIndex] = formData;
            patientsService.update(editId,formData)
                .then(result => {
                    setPatients(newData);
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({icon: "error",title: "Грешка",text: err.message,});
                })
          
        } else {// Add new record
            patientsService.create(formData)
                .then(result => {
                    patientsService.getAll()
                    .then(result => {setPatients(result)})
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
        setFormData({ _id: '', _ownerId: user_id , name: '' , egn: '', phoneNumber: '', address: ''});
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
                     patientsService.del(id)
                    .then(result => {
                        const newData = [...patients];
                        newData.splice(ind, 1);
                        console.log('splice');
                        console.log(newData);
                        setPatients(newData);
                        Swal.fire({title: "Изтриване!",text: "Избрания запис беше изтрит.",icon: "success"});
                    })
                    .catch(err => { Swal.fire({icon: "error",title: "Грешка",text: err.message,}); })
            }
          });
    };



    return (
        <main id="main" className="main">

            <div className="pagetitle">
              <h1>Списък на пациентите</h1> 
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Начало</a></li>
                  <li className="breadcrumb-item active">Пациенти</li>
                </ol>
              </nav>
            </div>

            <section className="section alist">
                <div className="card">
                    <div className="card-body"> 
                        <div className=" mt-3">
                            <table className="table table-striped table-hover w-100">
                                <thead>
                                    <tr>
                                        <th scope="col">#  {showModal} </th>
                                        <th scope="col">Имена</th>
                                        <th scope="col">ЕГН/ЛНЧ</th>
                                        <th scope="col">ТЕЛЕФОН</th>
                                        <th scope="col">АДРЕС</th>
                                        <th scope="col">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patients.map( (patient, index) => (
                                        <tr key={patient._id}>
                                            <td>{index + 1}</td>
                                            <td>{patient.name}</td>
                                            <td>{patient.egn}</td>
                                            <td>{patient.phoneNumber}</td>
                                            <td>{patient.address}</td>
                                            <td>
                                                <i className="bi bi-pencil-square edit_but" onClick={ () => {editRecord(patient._id,index)}} ></i>
                                                <i className="bi bi-x-square del_but" onClick={() => {handleDelete(patient._id,index)}}></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            </section>

            {/* <CreateEditPatientModal updateParentData={updatePatientData} selUserId={editUserId} /> */}

            <CreateEditPatientModal showModal={showModal} showm={showm} editIndex={editIndex} formData={formData} setFormData={setFormData} handleAddOrEdit={handleAddOrEdit}/>
                

            <Button variant="primary" onClick={ () => addPat() }>
                Нов пациент   
            </Button>

            

        </main>


    )
}