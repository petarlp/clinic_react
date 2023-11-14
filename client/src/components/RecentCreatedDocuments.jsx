export default function RecentSales() {
    return(
        <div className="col-12">
                      <div className="overflow-auto card recent-sales">

                        
                        <div className="card-body">
                          <h5 className="card-title">Последно издадени документи </h5>

                          <table className="table table-borderless datatable">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Пациент</th>
                                <th scope="col">Документ</th>
                                <th scope="col">Статус</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row"><a href="#">#2457</a></th>
                                <td>Иван Иванов</td>
                                <td><a href="#" className="text-primary">Амбулаторен лист</a></td>
                                <td><span className="badge bg-success">Предаден </span></td>
                              </tr>
                              <tr>
                                <th scope="row"><a href="#">#2147</a></th>
                                <td>Стефан Колев</td>
                                <td><a href="#" className="text-primary">Амбулаторен лист</a></td>
                                <td><span className="badge bg-warning">Изчакващ</span></td>
                              </tr>
                              <tr>
                                <th scope="row"><a href="#">#2049</a></th>
                                <td>Ангелина Дачева</td>
                                <td><a href="#" className="text-primary">Амбулаторен лист</a></td>
                                <td><span className="badge bg-success">Предаден </span></td>
                              </tr>
                              <tr>
                                <th scope="row"><a href="#">#2644</a></th>
                                <td>Калин Манев</td>
                                <td><a href="#" className="text-primar">Амбулаторен лист</a></td>
                                <td><span className="badge bg-warning">Изчакващ</span></td> 
                              </tr>
                              <tr>
                                <th scope="row"><a href="#">#2643</a></th>
                                <td>Поля Васева</td>
                                <td><a href="#" className="text-primary">Рецепта</a></td>
                                <td><span className="badge bg-success">Предаден </span></td>
                              </tr>
                              <tr>
                                <th scope="row"><a href="#">#2664</a></th>
                                <td>Милен Жечев</td>
                                <td><a href="#" className="text-primary">Амбулаторен лист</a></td>
                                <td><span className="badge bg-success">Предаден </span></td>
                              </tr>
                              <tr>
                                <th scope="row"><a href="#">#2678</a></th>
                                <td>Николай Христов</td>
                                <td><a href="#" className="text-primary">Рецепта</a></td>
                                <td><span className="badge bg-success">Предаден </span></td>
                              </tr>
                              <tr>
                                <th scope="row"><a href="#">#2543</a></th>
                                <td>Лора Русева</td>
                                <td><a href="#" className="text-primary">Амбулаторен лист</a></td>
                                <td><span className="badge bg-success">Предаден </span></td>
                              </tr>
                            </tbody>
                          </table>

                        </div>

                      </div>
                    </div>
    )
}