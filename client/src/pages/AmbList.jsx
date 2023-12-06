import * as alistsService from "../services/alistsService";
import { dateFormatBg } from "../services/dateFormatBg";
import { useEffect , useState } from "react";

export default function AmbList() {
    const[alists,setAlists] = useState([]);

    useEffect(() => {
        alistsService.getAll()
        .then(result => setAlists(result))
        .catch(err => console.log(err))
    } , [])

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
                                    </tr>
                                </thead>
                                <tbody>
                                    {alists.map( (alist, index) => (
                                        <tr key={alist._id}>
                                            <td>{index + 1}</td>
                                            <td>{dateFormatBg(alist.date)}</td>
                                            <td>{alist.patient.name}</td>
                                            <td>{alist.doctor.name}</td>
                                            <td>{alist.mkb.code}/{alist.mkb.text}</td>
                                            <td>{alist.main_diagnose}</td>
                                            <td>{alist.med_history}</td>
                                            <td>{alist.obj_state}</td>
                                            <td>{alist.med_research}</td>
                                            <td>{alist.teraphy}</td>
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