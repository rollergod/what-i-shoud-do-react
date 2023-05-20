import React from "react";

import { useAppDispatch, useAppSelector } from "../../../hoc/hook";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_URLS } from "../../../api/api_constants";
import { uploadFile } from "../../../firebase/firebaseApi";
import { useNavigate } from "react-router-dom";
import { InputElement } from "../../../components/InputElement";
import axios from "../../../api/axiosInstance";

type changeRequest = {
    Name: string,
    Email: string,
    ImageName?: string
}

interface IFormInputs {
    name: string,
    email: string,
    imageUrl: string
}

const ChangeProfile = () => {

    const navigate = useNavigate();

    // const authUser = useAppSelector(state => state.auth.user);
    const stateAuthUser = useAppSelector(state => state.auth.user);
    const [authUser, setAuthUser] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState<string>('');
    const [selectedImage, setSelectedImage] = React.useState<File>(null);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    React.useEffect(() => {
        setAuthUser(stateAuthUser);
        setImageUrl(stateAuthUser.imageRef);
    }, [stateAuthUser])

    React.useEffect(() => {
        reset(authUser);
    }, [authUser])

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm<IFormInputs>({
        mode: 'onChange'
    });

    const onChangeImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            const item = event.target.files[0];
            setSelectedImage(item);
            setImageUrl(URL.createObjectURL(item));
        }
    }

    const onSubmit: SubmitHandler<IFormInputs> = async (values) => {
        const changeRequest: changeRequest = {
            Name: values.name,
            Email: values.email,
        };

        if (selectedImage !== null)
            changeRequest.ImageName = selectedImage.name;

        console.log(changeRequest);

        // try {
        //     await axios.post(API_URLS.CHANGE_PROFILE, changeRequest)
        //         .then((resp) => {
        //             // setResponse(resp.data)
        //             console.log(resp);
        //         });

        //     uploadFile(selectedImage);
        //     navigate('/', { replace: true });
        // } catch (error) {
        //     setErrorMessage(error.response.data.title);
        // }
    };

    return (
        <section className="text-center">

            <div className="card mx-4 mx-md-5 shadow-5-strong"
            >
                <div className="card-body py-5 px-md-5">

                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-5">Изменение профиля</h2>
                            {
                                authUser && <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="form-outline mb-4">
                                        <InputElement
                                            name='name'
                                            header='Никнейм:'
                                            placeHolder=''
                                            type='text'
                                            register={{
                                                ...register('name', {
                                                    required: `Введите никнейм для профиля`,
                                                    minLength: {
                                                        value: 2,
                                                        message: `Минимум 2 символа`,
                                                    }
                                                })
                                            }}
                                            errors={errors}
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <InputElement
                                            name='email'
                                            header='Почта'
                                            placeHolder=''
                                            type='email'
                                            register={{
                                                ...register('email', {
                                                    required: `Введите почту для профиля`,
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Неверный адрес почты"
                                                    }
                                                })
                                            }}
                                            errors={errors}
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" >Изображение профиля:</label>
                                        <input type="file" onChange={onChangeImage} accept="image/*" className="form-control" />
                                        {
                                            imageUrl &&
                                            <img className="mt-5 w-25 h-25" src={imageUrl} />
                                        }
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        Изменить
                                    </button>

                                </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default ChangeProfile;