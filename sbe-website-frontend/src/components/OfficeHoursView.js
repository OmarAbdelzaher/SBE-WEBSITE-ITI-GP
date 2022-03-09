import React, { useEffect, useState } from 'react'
import axios from "axios";
import { reset_password } from '../actions/auth';

export default function OfficeHoursSchedule() {
    const [staff, setStaff] = useState()
    const [officehours, setOfficeHours] = useState()
    const [oh_list, setOhList] = useState()

    useEffect(() => {
        axios
          .get("http://localhost:8000/api/staff/")
          .then((res) => { setStaff(res.data)
        console.log(res.data)
        })

    }, []);
    
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/officehours/")
            .then((res) => setOfficeHours(res.data));
    }, []);

    

    const onChange = (e) =>{
        let staffID = e.target.value 
        setOhList(officehours.filter((oh) => oh.staff_id == staffID))

    }
   ;

    return (
    <>  
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
        <select className="select form-control-lg" 
            onChange={(e) => onChange(e)}
            name="staffmenu"
            value="asdasd">
        
            <option selected value="staffmenu">Staff Menu</option>
            { staff != undefined ?
                staff.map((item,index) => {
                    return (
                <option value={item.id }>{item.fname}</option>
                    )
                })
            : null
            }
        </select>


<table class="table table-hover table-dark">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">OfficeHour Type</th>
                <th scope="col">Week Day</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                </tr>
            </thead>
            <tbody>
                {
                    oh_list != undefined ?
                    oh_list.map((item,index)=>{
                        return (
                            <tr key={index}>
                                <th scope="row">{index+1}</th>   
                                <td>{item.officehours_type}</td>
                                <td>{item.weekday}</td>
                                <td>{item.from_hour}</td>
                                <td>{item.to_hour}</td>
                            </tr>
                        )
                    })
                    : null
                }
            </tbody>
            </table>
            
            
    </>
  )
}
