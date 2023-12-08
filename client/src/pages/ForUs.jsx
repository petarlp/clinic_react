export function ForUs() {

    const backgroundStyle = {
        backgroundImage: 'url("assets/img/med4.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        height: '100vh'
    };

    const textStyle = {
        width: '50%', 
        padding: '50px', 
        color: 'white', 
    };
   
    return (
        <main style={{ height: "100vh", overflow: "hidden" }}>
           
           <div style={backgroundStyle}>
                <div className="forustext" style={textStyle}>
                    <h2>Информация за нашата компания</h2>
                    <p>Здравейте ние сме малка компания , която се занимава и стандартизира в разработката на всякакъв медицински софтуер. На пазара сме от 2010г. и имаме разработени
                        над 20 вида различни софтуери за управление на медицинска апаратура. Имаме разработка и на софтуер за менижмънт на цялата болнична система. Искаме тук да ви представим именно този 
                        софтуер. Ще споменем само някои от неговите предиства: <br/><br/>
                         - Разработен специално, като са спазвани всички съвременни изисквания.<br/>
                         - Лесно и бързо внедряване без никакви усилия.<br/>
                         - Достъп на всеки лекар със собствен акаунт.<br/>
                         - Централизиране система за обобщаване на резултатите.<br/>
                         - Запис на часове и водене на дневници.<br/><br/>

                         Ще ви съдействаме моментално 24/7 при всякакви трудности и въпроси.

                    </p>
                </div>
            </div>
                
                
        </main>
    );
}

export default ForUs;


