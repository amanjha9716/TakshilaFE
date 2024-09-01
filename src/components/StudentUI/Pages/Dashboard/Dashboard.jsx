import React, { useContext, useRef, useState, useEffect } from 'react';
import { BarChart, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar } from 'recharts';
import Barchart from './Barchart';
import Radarchart from './Radarchart';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { DataContext, useData } from '../../../store';
import NextTopic from './NextTopic';
import UpcEvent from './UpcEvent';
import Modal from './Modal';
import './dashboard.css'

function transformData(input) {
    const result = [];
    let avg = 0;
    let count = 0;

    input.forEach(item => {
        const transformed = { name: item.name };

        Object.keys(item.subjects).forEach(subject => {
            avg += item.subjects[subject];
            count++;
            transformed[subject] = item.subjects[subject];
        });

        result.push(transformed);
    });

    avg = count ? avg / count : 0;
    return { avg, result };
}

export default function Dashboard() {
    
    const ctx = useContext(DataContext);
    const month = useRef();
    const [avg, setAvg] = useState(0);
    const [user, setUser] = useState(useRouteLoaderData("student"));
  
    const {resdata,data:nexttopic,notif} = useLoaderData();
    const { data } = useData();
    const [mapdata, setMapdata] = useState([]);
    const [cur, setCur] = useState('Overall');
    const [sinData, setSinData] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);

    
    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
    useEffect(()=> {
        const res = transformData(data);
        setAvg(res.avg);
        setMapdata(res.result);
    }, [data]);

    useEffect(() => {
        const temp = data.find(e => e.name === cur);
        if (temp) {
            const sdata = Object.entries(temp.subjects).map(([key, value]) => ({
                subject: key,
                marks: value,
                FullMarks: 100
            }));
            setSinData(sdata);
        }
    }, [data, cur]);


    function handleChange() {
        setCur(month.current.value);
    }
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    // Process the array to capitalize subjects
    mapdata.forEach(monthData => {
        Object.keys(monthData).forEach(key => {
            if (key !== 'name') {
                let capitalizedKey = capitalize(key);
                if (capitalizedKey !== key) {
                    monthData[capitalizedKey] = monthData[key];
                    delete monthData[key];
                }
            }
        });
    });
    return (
        <>
            <div className="second" >
                <div className="header" style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 'bold', fontSize: "20px", textTransform: "capitalize" }}>
                            Hi {user.studname}👋
                        </span>
                        <span style={{ fontSize: '12px' }}>Welcome to your dashboard</span>
                    </div>
                    <div className='inp'>
                        <input type="text" placeholder='Search...' />
                        <div className="notif" style={{display:'flex'}}>
                        <i className="fa-solid fa-bell" onClick={openModal}></i>
                            <div className='count' > 
                                {notif.length}
                            </div>
                        </div>
                        {isModalOpen && (
        <Modal
          notifications={notif}
          onClose={closeModal}
        />
      )}
                    </div>
                </div>

                <div className="marksgraph">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="tit" style={{ marginLeft: '15px', marginBottom: '10px' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '18px', margin: 0 }}>Marksheet</p>
                            <p style={{ fontSize: '12px', margin: 0 }}>Performance in this session</p>
                        </div>
                        <select ref={month} onChange={handleChange} name="month">
                            <option value="Overall">Overall</option>
                            <option value="Jan">January</option>
                            <option value="Feb">February</option>
                            <option value="Mar">March</option>
                            <option value="Apr">April</option>
                            <option value="May">May</option>
                            <option value="Jun">June</option>
                            <option value="Jul">July</option>
                            <option value="Aug">August</option>
                            <option value="Sep">September</option>
                            <option value="Oct">October</option>
                            <option value="Nov">November</option>
                            <option value="Dec">December</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <ResponsiveContainer width={'70%'} height={'100%'}>
                            
                            {cur === 'Overall' ? <Barchart data={mapdata} /> : <Radarchart data={sinData} />}
                        </ResponsiveContainer>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '30%' }}>
                            <div className='avarage'>
                                <p style={{ fontSize: '16px', margin: '0' }}>Average Marks</p>
                                <h1 style={{ marginLeft: '20px', margin: "5px" }}>{avg}</h1>
                                <p style={{
                                    fontSize: '12px', margin: '0', backgroundColor: '#495175', padding: '5px',
                                    borderRadius: '10px', width: 'fit-content', paddingLeft: '10px', paddingRight: '10px'
                                }}>
                                    <i style={{ padding: '5px', margin: '0', width: 'fit-content' }} className="fa-solid fa-circle-up"></i>24%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="secondbot">
                    <div className="nextclass">
                        <p style={{ fontWeight: 'bold', fontSize: '18px', margin: 0 }}>Next Topics</p>
                        <p style={{ fontSize: '10px', margin: 0 }}>Topics to be discussed in next classes</p>
                        {nexttopic.map(e => <NextTopic key={e.topicname} subject={e.topicname} date={e.classdate} completion={e.completion} />)}
                    </div>

                    <div className="notrew">
                        <div className="notice">
                            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>Notice</p>
                            <ul>
                                <li>Tomorrow will be off</li>
                                <li>Day after tomorrow there will be a celebration</li>
                            </ul>
                        </div>
                        <div className="notice">
                            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>Student Review</p>
                            <p style={{ fontSize: '12px', margin: '0' }}>Student is performing well, understands concepts but couldn’t explain them.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="third">
                <div className="cont">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar />
                    </LocalizationProvider>
                    <div className="upc">
                        <h1>Upcoming Events</h1>
                        {resdata[0]&&<UpcEvent eventname={resdata[0].assessename} subject={resdata[0].subject}/>}
                        {resdata[1]&&<UpcEvent eventname={resdata[1].assessename} subject={resdata[1].subject}/>}

                    


                    </div>
                </div>
            </div>
        </>
    );
}

export async function dashboardloader() {
    const itemStr = localStorage.getItem("userData");
    const item = JSON.parse(itemStr);
    const user = JSON.parse(item.value);
    const response = await fetch(`https://www.takshilabackend.somee.com/api/Learning/getTopic?stan=${user.stand}`);
  var resdata=await fetch(`https://www.takshilabackend.somee.com/api/Results/get4result?username=${user.username}`);
        
  var notif=await fetch(`https://www.takshilabackend.somee.com/api/Students/notification?stan=${user.stand}`);
  notif=await notif.json();
resdata=await resdata.json();
    const data = await response.json();
    return {data,resdata,notif};
}
