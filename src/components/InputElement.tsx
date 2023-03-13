import React from 'react';

export const InputElement = ({ type, value, setValue }) => {
    return (
        <div className="row align-items-center py-3">
            <div className="col-md-3 ps-5">

                <h6 className="mb-0">Email address</h6>

            </div>
            <div className="col-md-9 pe-5">

                <input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    type={type}
                    className="form-control form-control-lg"
                    placeholder="example@example.com"
                />

            </div>
        </div>
    )
};
