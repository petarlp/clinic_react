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

                    <div className="col-lg-8 mt-3">
                        {/* <h5 className="card-title"> -------4444--- <span></span></h5> */}

                        {
                            patients.map( patient => (
                                <p key={patient._id}>{patient.name}</p>
                            ))
                        }
                    
                    </div>
                    

                </div>

            </div>

            </section>

        </main>
    )
}