import React from "react";

import { useAppSelector } from "../../hoc/hook";

const Profile = () => {

    const authUser = useAppSelector(state => state.auth.user);

    return (
        <>
            <section className="h-100 gradient-custom-2">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-9 col-xl-7">
                            <div className="card">
                                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: 200 }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: 150 }}>
                                        {/* TODO: изменить ссылку на изображение */}
                                        <img src={authUser.imageRef}
                                            alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-3"
                                            style={{ width: 150, zIndex: 1 }} />
                                        <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
                                            style={{ zIndex: 1 }} >
                                            Изменить
                                        </button>
                                    </div>
                                    <div className="ms-3" style={{ marginTop: 130 }}>
                                        <h5>{authUser.name}</h5>
                                        <p>{authUser.email}</p>
                                    </div>
                                </div>
                                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div>
                                            <p className="mb-1 h5">253</p>
                                            <p className="small text-muted mb-0">Photos</p>
                                        </div>
                                        <div className="px-3">
                                            <p className="mb-1 h5">1026</p>
                                            <p className="small text-muted mb-0">Followers</p>
                                        </div>
                                        <div>
                                            <p className="mb-1 h5">478</p>
                                            <p className="small text-muted mb-0">Following</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4 text-black">
                                    <div className="mb-5">
                                        {/* TODO: добавить функционал редактирования/добавления инфы о себе */}
                                        <p className="lead fw-normal mb-1">О себе</p>
                                        <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                            <p className="font-italic mb-1">Web Developer</p>
                                            <p className="font-italic mb-1">Lives in New York</p>
                                            <p className="font-italic mb-0">Photographer</p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0">Последние посты</p>
                                        <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col mb-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                                alt="image 1" className="w-100 rounded-3" />
                                        </div>
                                        <div className="col mb-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                                alt="image 1" className="w-100 rounded-3" />
                                        </div>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                                alt="image 1" className="w-100 rounded-3" />
                                        </div>
                                        <div className="col">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                                alt="image 1" className="w-100 rounded-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>

    )
};

export default Profile;


{/* <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-md-9 col-lg-7 col-xl-5">
                        <div className="card" style={{ borderRadius: 15 }}>
                            <div className="card-body p-4">
                                <div className="d-flex text-black">
                                    <div className="flex-shrink-0">
                                        <img src={authUser.imageRef}
                                            alt="Generic placeholder image" className="img-fluid"
                                            style={{ width: 180, borderRadius: 10 }} />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="mb-1">{authUser.name}</h5>
                                        <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>Пользователь</p>
                                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                            style={{ backgroundColor: '#efefef' }}>
                                            <div>
                                                <p className="small text-muted mb-1">Articles</p>
                                                <p className="mb-0">41</p>
                                            </div>
                                            <div className="px-3">
                                                <p className="small text-muted mb-1">Followers</p>
                                                <p className="mb-0">976</p>
                                            </div>
                                            <div>
                                                <p className="small text-muted mb-1">Rating</p>
                                                <p className="mb-0">8.5</p>
                                            </div>
                                        </div>
                                        <div className="d-flex pt-1">
                                            <button type="button" className="btn btn-outline-primary me-1 flex-grow-1">Посты</button>
                                            <button type="button" className="btn btn-primary flex-grow-1">Подписаться</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}