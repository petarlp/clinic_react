import { useState, useContext } from 'react';
import AuthContext from "../contexts/authContext";

export function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { loginSubmitHandler } = useContext(AuthContext);

    const handleContentChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitData = (e) => {
        e.preventDefault();
        console.log('submit data');
        loginSubmitHandler(formData);
    }
     

   
    return (
        <main>
            <div className="container">

                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                <div className="d-flex justify-content-center py-4">
                                    {/*<a href="index.html" className="logo d-flex align-items-center w-auto">*/}
                                    {/*    <img src="assets/img/logo.png" alt="" />*/}
                                    {/*        <span className="d-none d-lg-block">NiceAdmin</span>*/}
                                    {/*</a>*/}
                                </div>

                                <div className="card mb-3">

                                    <div className="card-body">

                                        <div className="pt-2 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Вход в системата</h5>
                                            <p className="text-center small">Въведете данни за вход</p>
                                        </div>

                                        <form className="row g-3 needs-validation" >

                                            <div className="col-12">
                                                <label  className="form-label">Потр. име</label>
                                                <div className="input-group has-validation">
                                                    <input type="text" name="email" id="email" className="form-control"  value={formData.email}  onChange={handleContentChange} required />
                                                        <div className="invalid-feedback">Моля въведете email.</div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label  className="form-label">Парола</label>
                                                <input type="password" name="password" id="password" className="form-control" value={formData.password}   onChange={handleContentChange} required />
                                                    <div className="invalid-feedback">Моля въведете парола!</div>
                                            </div>

                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit" onClick={handleSubmitData}>Вход</button>
                                            </div>
                                            
                                        </form>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </section>

            </div>
        </main>
    );
}

export default Login;