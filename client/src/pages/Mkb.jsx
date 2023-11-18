import * as mkbServise from "../services/mkbService";
import { useEffect , useState } from "react";

export default function Mkb() {

    const[mkb,setMkb] = useState([]);

    useEffect(() => {
        mkbServise.getAll()
        .then(result => setMkb(result))
        .catch(err => console.log(err))
    } , [])

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
                                    </tr>
                                </thead>
                                <tbody>
                                    {mkb.map( (m, index) => (
                                        <tr key={m._id}>
                                            <td>{index + 1}</td>
                                            <td>{m.code}</td>
                                            <td>{m.text}</td>
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