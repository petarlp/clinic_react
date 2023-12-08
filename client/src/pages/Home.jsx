export function Home() {
   
    return (
        <main style={{ height: "100vh", overflow: "hidden" }}>
            <div className="">

                
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{ height: "100%", overflow: "hidden" }}>

                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="assets/img/med1.jpg" className="d-block w-100 h-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <h2>Иновативен софтуер за работа с болнични заведения.<br/>
                                Разработен специално, като са спазвани всички съвременни изисквания.</h2>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="assets/img/med2.jpg" className="d-block w-100 h-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h2>Лесно и бързо внедряване без никакви усилия.<br/>
                                Ще ви съдействаме моментално 24/7 при всякакви трудности и въпроси.</h2>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="assets/img/med3.jpg" className="d-block w-100 h-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h2>Достъп на всеки лекар със собствен акаунт.<br/> 
                                С възможност за записване на часове и организация на лекарския процес.</h2>
                            </div>
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>

                </div>

                         

            </div>
        </main>
    );
}

export default Home;



