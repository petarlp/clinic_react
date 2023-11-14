import Еxaminations from "../components/Еxaminations";
import Procedures from "../components/Procedures";
import Customers from "../components/Customers";
import RecentCreatedDocuments from "../components/RecentCreatedDocuments";
import RecentActivity from "../components/RecentActivity";

export default function DashBoard() {
    return (
        <main id="main" className="main">

            <div className="pagetitle">
              <h1>Dashboard</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </nav>
            </div>

            <section className="section dashboard">

                <div className="row">

                    <div className="col-lg-8">
                        <div className="row">
                            <Еxaminations />
                            <Procedures />
                            <Customers />
                            {/* <Reports /> */}
                            <RecentCreatedDocuments />
                        </div>
                    </div>

                
                    <div className="col-lg-4">
                        <RecentActivity />
                    </div>

                </div>

            </section>

        </main>
    )
}