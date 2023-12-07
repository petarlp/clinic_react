import * as mkbService from "../services/mkbService";
import { useEffect , useState } from "react";
import CreateEditMkbModal from "../components/CreateEditMkbModal"
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

export default function Mkb() {

    const user_id = localStorage.getItem('user_id');

    const[mkb,setMkb] = useState([]);
    const[showModal, setShowModal] = useState(false);
    const[editIndex, setEditIndex] = useState(null);
    const[editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        _id: '',
        _ownerId: user_id,
        code: '',
        text: ''
    });


    useEffect(() => {
        mkbService.getAll()
        .then(result => setMkb(result))
        .catch(err => {
            console.log(err);
            Swal.fire({icon: "error",title: "Грешка",text: err.message,});
        });
    } , []);


    const showm = (val) => {setShowModal(val);};

    const addMkb = () => {
        setFormData({ _id: '', _ownerId: user_id, code: '' , text: ''});
        setEditIndex(null);
        setEditId(null);
        setShowModal(true);
    };

    const editRecord = (id,index) => {
        // const selectedData = patients.filter(item => item._id === id);
        const selectedData = mkb[index];
        setFormData({
            _id: id,
            code: selectedData.code,
            text: selectedData.text,
        });
        setShowModal(true);
        setEditIndex(index);
        setEditId(id);
    }

    const handleAddOrEdit = () => {
        if (editIndex !== null) {// Edit existing record
          const newData = [...mkb];
          newData[editIndex] = formData;
            mkbService.update(editId,formData)
                .then(result => {
                    setMkb(newData);
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({icon: "error",title: "Грешка",text: err.message,});
                })
          
        } else {// Add new record
            mkbService.create(formData)
                .then(result => {
                    mkbService.getAll()
                    .then(result => {setMkb(result)})
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
        setFormData({ _id: '', _ownerId: user_id , code: '' , text: ''});
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
                    mkbService.del(id)
                    .then(result => {
                        const newData = [...mkb];
                        newData.splice(ind, 1);
                        console.log('splice');
                        console.log(newData);
                        setMkb(newData);
                        Swal.fire({title: "Изтриване!",text: "Избрания запис беше изтрит.",icon: "success"});
                    })
                    .catch(err => { Swal.fire({icon: "error",title: "Грешка",text: err.message,}); })
            }
          });
    };

    return (
        <main id="main" className="main">

            <div className="pagetitle">
              <h1>Списък МКБ</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Начало</a></li>
                  <li className="breadcrumb-item active">Списък МКБ</li>
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
                                        <th scope="col">Код</th>
                                        <th scope="col">Наименование</th>
                                        <th scope="col">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mkb.map( (m, index) => (
                                        <tr key={m._id}>
                                            <td>{index + 1}</td>
                                            <td>{m.code}</td>
                                            <td>{m.text}</td>
                                            <td>
                                                <i className="bi bi-pencil-square edit_but" onClick={ () => {editRecord(m._id,index)}} ></i>
                                                <i className="bi bi-x-square del_but" onClick={() => {handleDelete(m._id,index)}}></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            </section>

            <CreateEditMkbModal showModal={showModal} showm={showm} editIndex={editIndex} formData={formData} setFormData={setFormData} handleAddOrEdit={handleAddOrEdit}/>
                

            <Button variant="primary" onClick={ () => addMkb() }>
                Нов МКБ   
            </Button>

        </main>
    )
}