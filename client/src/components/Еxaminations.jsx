import { useEffect , useState } from "react";
import * as shedulesService from "../services/shedulesService";
import Swal from 'sweetalert2'

export default function Еxaminations() {

      const[shedules,setShedules] = useState([]);


      useEffect(() => {
        shedulesService.getCount()
        .then(result => {setShedules(result)})
        .catch(err => {
            console.log(err);
            Swal.fire({icon: "error",title: "Грешка",text: err.message,});
        })
      } , []);

    return(
        <div className="col-xxl-4 col-md-6">
        <div className="card info-card sales-card">

          <div className="card-body">
            <h5 className="card-title">Записани прегледи <span></span></h5>

            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                
                <i className="ri-stethoscope-fill"></i>
              </div>
              <div className="ps-3">
                <h6>{shedules}</h6>{/* <span className="pt-1 text-success small fw-bold">12%</span> <span className="pt-2 text-muted small ps-1">повече от вчера</span> */}

              </div>
            </div>
          </div>

        </div>
      </div>
    )
}