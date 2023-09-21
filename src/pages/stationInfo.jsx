import React, { useEffect, useState } from 'react'
import './stationInfo.scss'
import { AutoComplete, Select } from 'antd'
import axios from 'axios'
import {groupBy} from 'lodash'
import PcNavbar from '../components/PcNavbar'
import MobileNavbar from '../components/MobileNavbar'
export default function StationInfo() {
    const [ua]=useState(navigator.userAgent.includes('Mobile')?'mobile':'pc')
    const [innerWidth,setInnerWidth] = useState(0)
    console.log(innerWidth)
    console.log(ua)
    // mobile-navbar 控制變數
    const [displayNav,setDisplayNav] = useState(false)
    // search-block 資料變數
    const [cityOptions,setCityOptions] = useState([])
    const [areaOptions,setAreaOptions] = useState([]) //arr
    const [stationOptions,setStationOptions] = useState([]) //arr
    // display-block 資料變數
    const [data,setData] = useState(null) //arr
    const [dataInArea,setDataInArea] = useState([]) //obj
    const [toggleTarget,setToggleTarget] = useState('') //string
    const [targetStation,setTargetStation] = useState('')  //string
    const [targetAreas,setTargetAreas] = useState([]) //arr
    const [targetAllAreas,setTargetAllAreas] = useState(false)

    const createCityOptions=()=>{
        let cityArr = ['台北市','新北市','台中市','台南市','高雄市']
        let temp = []
        cityArr.forEach(i=>temp.push({value:i,label:i}))
        setCityOptions(temp)
    }
    const filterCityOptions=(input,option)=>{
        if(option.label.includes(input))
        return true
        // (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    }
    const fetchAPI=()=>{
        return axios.get('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
    }
    const createAreaOptions=(dataByArea)=>{
        setAreaOptions(Object.keys(dataByArea))
    }
    const changeArea=(index)=>{
        setToggleTarget('area')
        if(targetAreas.includes(index)) setTargetAreas(targetAreas.filter(i=>i!=index))
        else setTargetAreas([index,...targetAreas])
    }
    const changeAllAreas=()=>{
        setToggleTarget('area')
        if(targetAllAreas) setTargetAreas([])
        else setTargetAreas([0,1,2,3,4,5,6,7,8,9,10,11,12])
        setTargetAllAreas(!targetAllAreas)
    }
    const typeInStation=(text)=>{
        let temp = []
        data.forEach(i=>{
            if(i.sna.includes(text)) temp.push({value:i.sna,label:i.sna})
        })
        setStationOptions(temp)
    }
    const selectStation=(text)=>{
        setToggleTarget('station')
        setTargetStation(data.find(i=>i.sna===text))
        setTargetAllAreas(false)
        setTargetAreas([])
    }
    useEffect(()=>{
        createCityOptions()
        fetchAPI().then(res=>{
            // console.log(res.data)
            setData(res.data)
            let dataByArea = groupBy(res.data,'sarea')
            createAreaOptions(dataByArea)
            setDataInArea(dataByArea)
            changeAllAreas()
        })
    },[])
    useEffect(()=>{
        window.addEventListener('resize',()=>setInnerWidth(window.innerWidth))
        return ()=>{
            window.removeEventListener('resize',setInnerWidth(window.innerWidth))
        }
    },[])

  return (
    <div className='stationInfo'>
    {(ua==='mobile' || innerWidth<=600) &&
    <div className='mobile'>
        {/* nav-block --------------------------------------------------- */}
        <div className='nav-block'>
            <div className='logo'><img src={require('../images/youbike_logo.png')}/></div>
            <div className='mobile-nav-button' onClick={()=>setDisplayNav(!displayNav)}>
                {displayNav?<img src={require('../images/youbike-close-nav-button.png')}/>
                :<img src={require('../images/youbike-nav-button.png')}/>}
            </div>
        </div>
        {/* mobile-navbar (點擊顯示&隱------------------------------------------------ */}
        {displayNav && <MobileNavbar/>}
        {/* search-block ------------------------------------------------ */}
        {!displayNav &&
        <div className='search-block'>
            <div className='title'>站點資訊</div>
            <div className='search-and-city-select'>
                <AutoComplete
                    className='search'
                    size='large'
                    options={stationOptions}
                    onSelect={selectStation}
                    onSearch={(text) => typeInStation(text)}
                    placeholder="搜尋站點"
                />
                <Select
                    className='city-select'
                    size='large'    
                    defaultValue="選擇縣市"
                    options={cityOptions}
                    filterOption={filterCityOptions}
                    showSearch
                    optionFilterProp='children'
                />      
            </div>
            <div className='area-select'>
                <div className='all-cb'>
                    <input  
                        type='checkbox' 
                        checked={targetAllAreas}  
                        onChange={changeAllAreas}
                    />
                    <label>全部勾選</label>
                </div>
                <div className='options'>
                    {areaOptions.length!=0 && areaOptions.map((item,index)=>{
                        return (
                            <div key={index}>
                                <input type='checkbox' onChange={()=>changeArea(index)} checked={targetAreas.includes(index)}/>
                                <label>{item}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        }
        {/* display-block ----------------------------------------------- */}
        {!displayNav &&
        <div className='display-block'>
            <div>
                <span>縣市</span>
                <span>區域</span>
                <span className='station-name'>站點名稱</span>
                <span>可借車輛</span>
                <span>可還空位</span>
            </div>
            {toggleTarget==='station' && <div>
                    <span>台北市</span>
                    <span>{targetStation.sarea}</span>
                    <span className='station-name'>{targetStation.sna}</span>
                    <span className='color-green'>{targetStation.sbi}</span>
                    <span className='color-green'>{targetStation.bemp}</span>
            </div>}
            {toggleTarget==='area' && targetAreas.length!=0 && targetAreas.map((item)=>{
                return dataInArea[areaOptions[item]].map((i,index)=>{
                        return (
                        <div key={index}>
                            <span>台北市</span>
                            <span>{i.sarea}</span>
                            <span className='station-name'>{i.sna}</span>
                            <span className='color-green'>{i.sbi}</span>
                            <span className='color-green'>{i.bemp}</span>
                        </div>
                        )
                })
            })}
        </div>
        }
    </div>
    }

    {(ua==='pc' && innerWidth>600) && 
    <div className='pc'>
        {/* nav-block --------------------------------------------------- */}
        <div className='nav-block'>
            <div className='logo'><img src={require('../images/youbike_logo.png')}/></div>
            {ua==='pc' && <PcNavbar/>}
        </div>
        {/* search-block ------------------------------------------------ */}
        {!displayNav &&
        <div className='search-block'>
            <div className='title'>站點資訊</div>
            <div className='pc-bg'><img src={require('../images/youbike-background.png')}/></div>
            <div className='search-and-city-select'>
                <AutoComplete
                    className='search'
                    size='large'
                    options={stationOptions}
                    onSelect={selectStation}
                    onSearch={(text) => typeInStation(text)}
                    placeholder="搜尋站點"
                />
                <Select
                    className='city-select'
                    size='large'    
                    defaultValue="選擇縣市"
                    options={cityOptions}
                    filterOption={filterCityOptions}
                    showSearch
                    optionFilterProp='children'
                />      
            </div>
            <div className='area-select'>
                <div className='all-cb'>
                    <input  
                        type='checkbox' 
                        checked={targetAllAreas}  
                        onChange={changeAllAreas}
                    />
                    <label>全部勾選</label>
                </div>
                <div className='options'>
                    {areaOptions.length!=0 && areaOptions.map((item,index)=>{
                        return (
                            <div key={index}>
                                <input type='checkbox' onChange={()=>changeArea(index)} checked={targetAreas.includes(index)}/>
                                <label>{item}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        }
        {/* display-block ----------------------------------------------- */}
        {!displayNav &&
        <div className='display-block'>
            <div>
                <span>縣市</span>
                <span>區域</span>
                <span className='station-name'>站點名稱</span>
                <span>可借車輛</span>
                <span>可還空位</span>
            </div>
            {toggleTarget==='station' && <div>
                    <span>台北市</span>
                    <span>{targetStation.sarea}</span>
                    <span className='station-name'>{targetStation.sna}</span>
                    <span className='color-green'>{targetStation.sbi}</span>
                    <span className='color-green'>{targetStation.bemp}</span>
            </div>}
            {toggleTarget==='area' && targetAreas.length!=0 && targetAreas.map((item)=>{
                return dataInArea[areaOptions[item]].map((i,index)=>{
                        return (
                        <div key={index}>
                            <span>台北市</span>
                            <span>{i.sarea}</span>
                            <span className='station-name'>{i.sna}</span>
                            <span className='color-green'>{i.sbi}</span>
                            <span className='color-green'>{i.bemp}</span>
                        </div>
                        )
                })
            })}
        </div>
        }
    </div>
    }
    </div>
  )
}
