import * as doctorsServise from "../services/doctorsService";
import { useEffect , useState } from "react";


export default function Doctors() {

    const[doctors,setDoctors] = useState([]);

    useEffect(() => {
        doctorsServise.getAll()
        .then(result => setDoctors(result))
        .catch(err => console.log(err))
    } , [])


    return (
        <main id="main" className="main">

            <div className="pagetitle">
              <h1>Doctors List</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item active">Doctores List</li>
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