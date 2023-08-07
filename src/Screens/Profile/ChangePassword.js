import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { currentUser } from "./../../Config/Data";

import { DashboardLayout } from "../../Layout/DashboardLayout";

import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";

import './style.css'

const ChangePassword = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({});

    useEffect(() => {

        document.title = 'Relax Scofa | Change Password';

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
                                Change Password
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xl-6 col-lg-8">
                            <form>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <CustomInput label="Current Password" labelClass="mainLabel" required type="password" placeholder="Enter Current Password" inputClass="mainInput" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <CustomInput label="New Password" labelClass="mainLabel" required type="password" placeholder="Enter New Password" inputClass="mainInput" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <CustomInput label="Confirm New Password" labelClass="mainLabel" required type="password" placeholder="Confirm New Password" inputClass="mainInput" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12r">
                                        <CustomButton type="button" variant="primaryButton" className="me-3 mb-2" text="Update" onClick={() => {navigate('/profile')}} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default ChangePassword;
