import * as shedulesService from "../services/shedulesService";
import { dateFormatBg } from "../services/dateFormatBg";
import { useEffect , useState } from "react";

export default function Shedule() {
    const[shedules,setShedules] = useState([]);

    useEffect(() => {
        shedulesService.getAll()
        .then(result => setShedules(result))
        .catch(err => console.log(err))
    } , [])

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
                                    </tr>
                                </thead>
                                <tbody>
                                    {shedules.map( (slist, index) => (
                                        <tr key={slist._id}>
                                            <td>{index + 1}</td>
                                            <td>{dateFormatBg(slist.date)}</td>
                                            <td>{slist.patient.name}</td>
                                            <td>{slist.doctor.name}</td>
                                            <td>{slist.notes}</td>
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