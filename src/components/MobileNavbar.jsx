import React from 'react'
import { useNavigate } from 'react-router-dom'
import './MobileNavbar.scss'

export default function MobileNavbar() {
    const navigate = useNavigate()
    return (
        <div className='mobile-navbar'>
            <div className='mobile-titles'>
                <div onClick={()=>navigate('/instructions')}>使用說明</div>
                    <div onClick={()=>navigate('/charging')}>收費方式</div>
                    <div onClick={()=>navigate('/')}>站點資訊</div>
                    <div onClick={()=>navigate('/news')}>最新消息</div>
                    <div onClick={()=>navigate('/activities')}>活動專區</div>
                </div>
            <div className='mobile-login-button'>登入</div>
        </div>
    )
}
