import { useEffect , useState } from "react";
import * as shedulesService from "../services/shedulesService";
import { dateFormatBgHour } from "../services/dateFormatBgHour";
import Swal from 'sweetalert2'

export default function RecentActivity(){

    const[shedules,setShedules] = useState([]);


      useEffect(() => {
        shedulesService.getAll()
        .then(result => {setShedules(result)})
        .catch(err => {
            console.log(err);
            Swal.fire({icon: "error",title: "Грешка",text: err.message,});
        })
      } , []);

    return(
            <div className="card">
                

                <div className="card-body">
                    <h5 className="card-title">Последни прегледи / процедури <span></span></h5>

                    <div className="activity">

                    {shedules.map( (slist, index) => (
                        <div key={slist._id} className="activity-item d-flex">
                            <div className="activite-label">{dateFormatBgHour(slist.date)}</div>
                            <i className='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                            <div className="activity-content">
                                Преглед {slist._doctorId.name} - {slist.notes}
                            </div>
                        </div>
                    ))}

                    </div>

                </div>

            </div>
    )
}