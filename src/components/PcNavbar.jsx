import React from 'react'
import { useNavigate } from 'react-router-dom'
import './PcNavbar.scss'
export default function PcNavbar() {
  // 跳轉路由變數
  const navigate = useNavigate()
  return (
    <div className='pc-navbar'>
        <div className='pc-titles'>
            <div onClick={()=>navigate('/instructions')}>使用說明</div>
            <div onClick={()=>navigate('/charging')}>收費方式</div>
            <div onClick={()=>navigate('/')}>站點資訊</div>
            <div onClick={()=>navigate('/news')}>最新消息</div>
            <div onClick={()=>navigate('/activities')}>活動專區</div>
        </div>
        <div className='pc-login-button'>登入</div>
    </div>
  )
}
