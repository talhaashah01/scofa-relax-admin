import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./style.css";


import {AuthLayout} from './../../Layout/AuthLayout'
import CustomInput from "../../Components/CustomInput"
import CustomButton from '../../Components/CustomButton';


const ForgetPassword2 = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({})

    useEffect(() => {
        document.title = 'Relax Scofa | Password Recovery';
    }, [])


    const handleClick = (e) => {
        e.preventDefault()
        navigate('/forget-password3')
    }

    return (
        <>
            <AuthLayout authTitle='Password Recovery' authPara='An email has been sent to you with a verification code.' backOption={true}>
                <form>
                    <CustomInput label='Verification Code' required id='verificationCode' type='number' placeholder='Enter Verification Code' labelClass='mainLabel' inputClass='mainInput' onChange={(event) => {
                        setFormData({ ...formData, code: event.target.value })
                    }} />
                    <div className="d-flex align-items-baseline justify-content-between mt-1">
                        <p className='text-danger fw-bold'>Resending in 00:50</p>
                        <button type='button' className='notButton primaryColor fw-bold text-decoration-underline'>Resend Code</button>
                    </div>
                    <div className="mt-4 text-center">
                        <CustomButton type='button' variant='primaryButton' text='Continue' onClick={handleClick} />
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}



export default ForgetPassword2