import { useEffect , useState } from "react";
import * as alistsService from "../services/alistsService";
import Swal from 'sweetalert2'

export default function Procedures(){

    const[alists,setAlists] = useState([]);


      useEffect(() => {
        alistsService.getCount()
        .then(result => {setAlists(result)})
        .catch(err => {
            console.log(err);
            Swal.fire({icon: "error",title: "Грешка",text: err.message,});
        })
      } , []);

    return(
        <div className="col-xxl-4 col-md-6">
                      <div className="card info-card revenue-card">
                        
                        <div className="card-body">
                          <h5 className="card-title">Издадени амб. листи  <span></span></h5>

                          <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i className="ri-service-line"></i>
                            </div>
                            <div className="ps-3">
                              <h6>{alists}</h6>
                              {/* <span className="pt-1 text-success small fw-bold">8%</span> <span className="pt-2 text-muted small ps-1">увеличение</span> */}

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
    )
}