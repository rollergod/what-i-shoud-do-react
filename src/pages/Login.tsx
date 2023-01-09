import React from "react";

import ImagePage from "../components/ImagePage";
import "bootstrap/dist/css/bootstrap.css";

const Login = () => {
    return (
        <form className="w-25 mt-5 m-auto">
            <div className="form-outline mb-4">
                <input type="email" id="form2Example1" className="form-control" />
                <label className="form-label" >Email address</label>
            </div>

            <div className="form-outline mb-4">
                <input type="password" id="form2Example2" className="form-control" />
                <label className="form-label" >Password</label>
            </div>

            <div className="form-outline mb-4">
                <input type="password" id="form2Example2" className="form-control" />
                {/* <ImagePage></ImagePage> */}
                <label className="form-label" >Profile Image</label>
            </div>

            <div className="row mb-4">
                <div className="col">
                    <a href="#!">Forgot password?</a>
                </div>
            </div>

            <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button>

            <div className="text-center">
                <p>Not a member? <a href="#!">Register</a></p>
            </div>
        </form>
    )
};

export default Login;