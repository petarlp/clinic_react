import * as medicamentsServise from "../services/medicamentsService";
import { useEffect , useState } from "react";

export default function Medicaments() {

    const[medicaments,setMedicaments] = useState([]);

    useEffect(() => {
        medicamentsServise.getAll()
        .then(result => setMedicaments(result))
        .catch(err => console.log(err))
    } , [])

    return (
        <main id="main" className="main">

            <div className="pagetitle">
              <h1>Списък лекарства</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Начало</a></li>
                  <li className="breadcrumb-item active">Лекарства</li>
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