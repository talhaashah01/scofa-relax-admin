import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { currentUser } from "./../../Config/Data";

import { DashboardLayout } from "../../Layout/DashboardLayout";

import CustomButton from "../../Components/CustomButton";

import './style.css'


const Profile = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({});

    useEffect(() => {
        document.title = 'Relax Scofa | My Profile';

        setUserData(currentUser);
    }, []);

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h2 className="mainTitle">
                                My Profile
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        {userData ?
                            <div className="col-12">
                                <div className="row mb-3">
                                    <div className="col-lg-4 offset-lg-4 text-center order-2 order-lg-1 mb-3">
                                        <div className="profileImage">
                                            <img src={userData.image} alt="User" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="row mb-4">
                                            <div className="offset-lg-4 col-lg-4 mb-3">
                                                <h4 className="secondaryLabel">Name</h4>
                                                <p className="secondaryText">{userData.name}</p>
                                            </div>
                                            <div className="col-lg-4 mb-3">
                                                <h4 className="secondaryLabel">Email Address</h4>
                                                <p className="secondaryText">{userData.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center">
                                        <CustomButton type="button" variant="primaryButton" className="me-3 mb-2" text="Edit Profile" onClick={() => { navigate('/profile/edit-profile') }} />
                                        <CustomButton type="button" variant="secondaryButton" className="me-3 mb-2" text="Change Password" onClick={() => { navigate('/profile/change-password') }} />
                                    </div>

                                </div>
                            </div> : ''}

                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Profile;
