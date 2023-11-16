import  * as patientsService from "../services/patientsService"; 

import { useEffect , useState } from "react";




export default function Patients() {



    const[patients,setPatients] = useState([]);


    useEffect(() => {

        patientsService.getAll()
        .then(result => setPatients(result))
        .catch(err => console.log(err))


    } , [])



    return (
        <main id="main" className="main">

            <div className="pagetitle">
              <h1>Пациенти</h1> 
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
                                        <th scope="col">#</th>
                                        <th scope="col">Имена</th>
                                        <th scope="col">ЕГН/ЛНЧ</th>
                                        <th scope="col">ТЕЛЕФОН</th>
                                        <th scope="col">АДРЕС</th>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            </section>

        </main>
    )
}