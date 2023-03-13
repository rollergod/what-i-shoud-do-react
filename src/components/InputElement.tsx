import React from 'react';

export const InputElement = ({ register, header, type, value, setValue, placeholder }) => {
    console.log();
    return (
        <div className="row align-items-center py-3">
            <div className="col-md-3 ps-5">

                <h6 className="mb-0">{header}</h6>

            </div>
            <div className="col-md-9 pe-5">

                <input
                    {...register(header.replace(' ', ''), {
                        required: `Поле "${header}" обязательно для ввода`,
                    })}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    type={type}
                    className="form-control form-control-lg"
                    placeholder={placeholder}
                />

            </div>
        </div>
    )
};
