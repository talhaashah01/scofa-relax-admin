import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import { currentUser } from "./../../Config/Data";

import { DashboardLayout } from "../../Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";

import './style.css'

const EditProfile = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({});
    const [userNewData, setUserNewData] = useState({})

    useEffect(() => {

        document.title = 'Scofa Relax | Edit Profile';

        setUserData(currentUser);
    }, []);

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit Profile
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        {userData ?
                            <div className="col-12">
                                <form>
                                    <div className="row mb-3">
                                        <div className="col-lg-4 offset-lg-4 text-center order-2 order-lg-1 mb-3">
                                            <div className="profileImage">
                                                <img src={userData.image} alt="User" />
                                                <input type="file" accept="img/*" className="d-none" id="profileImage" onChange={(event) => { setUserNewData({ ...userNewData, image: event.target.value }) }} />
                                                <label htmlFor="profileImage" className="imageUploadButton"><FontAwesomeIcon icon={faCamera} /></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-12">
                                                    <CustomInput label="Name" labelClass="mainLabel" required type="text" placeholder="Enter Name" inputClass="mainInput" onChange={(event) => { setUserNewData({ ...userNewData, name: event.target.value }) }} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <CustomInput label="Email Address" labelClass="mainLabel" required type="email" placeholder="Enter Email Address" inputClass="mainInput" onChange={(event) => { setUserNewData({ ...userNewData, email: event.target.value }) }} />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 text-center">
                                            <CustomButton type="button" variant="primaryButton" className="me-3 mb-2" text="Save" onClick={() => {
                                                navigate('/profile')
                                            }} />
                                            <CustomButton type="button" variant="secondaryButton" className="me-3 mb-2" text="Cancel" onClick={() => { navigate('/profile') }} />
                                        </div>

                                    </div>
                                </form>
                            </div> : ''}

                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default EditProfile;
