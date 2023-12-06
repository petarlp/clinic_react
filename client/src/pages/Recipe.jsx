import * as recipesService from "../services/recipesService";
import { dateFormatBg } from "../services/dateFormatBg";
import { useEffect , useState } from "react";

export default function Recipe() {
    const[alists,setAlists] = useState([]);

    useEffect(() => {
        recipesService.getAll()
        .then(result => setAlists(result))
        .catch(err => console.log(err))
    } , [])

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
                                    </tr>
                                </thead>
                                <tbody>
                                    {alists.map( (alist, index) => (
                                        <tr key={alist._id}>
                                            <td>{index + 1}</td>
                                            <td>{dateFormatBg(alist.date)}</td>
                                            <td>{alist.patient.name}</td>
                                            <td>{alist.doctor.name}</td>
                                            <td>{alist.exec}</td>
                                            <td>{alist.med_name}</td>
                                            <td>{alist.med_text}</td>
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