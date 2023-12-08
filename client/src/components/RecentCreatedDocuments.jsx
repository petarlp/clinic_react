import { useEffect , useState } from "react";
import * as alistsService from "../services/alistsService";
import Swal from 'sweetalert2'
import { dateFormatBg } from "../services/dateFormatBg";

export default function RecentSales() {

  const[alists,setAlists] = useState([]);


      useEffect(() => {
        alistsService.getAll()
        .then(result => {setAlists(result)})
        .catch(err => {
            console.log(err);
            Swal.fire({icon: "error",title: "Грешка",text: err.message,});
        })
      } , []);

    return(

        <div className="col-12">
                      <div className="overflow-auto card recent-sales">

                        
                        <div className="card-body">
                          <h5 className="card-title">Последно издадени амбулаторни листи </h5>

                          <table className="table table-borderless datatable">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Дата</th>
                                <th scope="col">Пациент</th>
                                <th scope="col">Лекар</th>
                              </tr>
                            </thead>
                            <tbody>
                            {alists.map( (al, index) => (
                                        <tr key={al._id}>
                                            <td>{index + 1}</td>
                                            <td>{dateFormatBg(al.date)}</td>
                                            <td>{al._patientId.name}</td>
                                            <td>{al._doctorId.name}</td>
                                        </tr>
                                    ))}
                            </tbody>
                          </table>

                        </div>

                      </div>
                    </div>
    )
}