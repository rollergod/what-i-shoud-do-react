import React, { FC, forwardRef } from 'react';

interface InputProps {
    header: string,
    name: string,
    placeHolder: string,
    type: string,
    register: any,
    errors: any
}

export const InputElement: FC<InputProps> = ({ header, name, placeHolder, type, errors, register }) => {
    console.log(errors);
    return (
        <div className="row align-items-center py-3">
            <div className="col-md-3 ps-5">

                <h6 className="mb-0">{header}</h6>

            </div>
            <div className="col-md-9 pe-5">

                <input
                    {...register}
                    name={name}
                    type={type}
                    className={errors[name] ? 'error form-control form-control-lg' : 'form-control form-control-lg'}
                    placeholder={placeHolder}
                />
                {errors[name] && <p>{errors[name].message}</p>}
            </div>
        </div>
    )
};
