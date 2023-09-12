import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import './MobileNavbar.scss'

export default function MobileNavbar() {
    // 當前路由
    const currentPathname = useLocation().pathname
    // 跳轉路由變數
    const navigate = useNavigate()
    return (
        <div className='mobile-navbar'>
            <div className='mobile-titles'>
                <div className={currentPathname==='/instructions'? 'chosen-color':''} onClick={()=>navigate('/instructions')}>使用說明</div>
                <div className={currentPathname==='/charging'? 'chosen-color':''} onClick={()=>navigate('/charging')}>收費方式</div>
                <div className={currentPathname==='/'? 'chosen-color':''} onClick={()=>navigate('/')}>站點資訊</div>
                <div className={currentPathname==='/news'? 'chosen-color':''}onClick={()=>navigate('/news')}>最新消息</div>
                <div className={currentPathname==='/activities'? 'chosen-color':''} onClick={()=>navigate('/activities')}>活動專區</div>
            </div>
            <div className='mobile-login-button'>登入</div>
        </div>
    )
}
