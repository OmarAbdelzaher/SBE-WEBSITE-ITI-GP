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
    <section className="h-custom ">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="py-5 col-lg-8 col-xl-12 card rounded-3 courses-b border border-2 border-light">
                <div className="card-body ">
                    <p className="fs-2 text-light"> OfficeHours Schedule</p>
                
                    <div className="justify-content-center">
                        <select className="select form-control-lg btn btn-lg col-3" style={{backgroundColor:"#003049", color:"#ffff"}} 
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
                    </div>
                </div>


<table class="table table-hover bg-light fs-4 col-12 ">
            <thead>
                <tr  className="text-dark">
                <th scope="col">#</th>
                <th scope="col" className="text-dark fw-light">OfficeHour Type</th>
                <th scope="col" className="text-dark fw-light">Week Day</th>
                <th scope="col" className="text-dark fw-light">From</th>
                <th scope="col" className="text-dark fw-light">To</th>
                </tr>
            </thead>
            <tbody className="mb-3">
                {
                    oh_list != undefined ?
                    oh_list.map((item,index)=>{
                        return (
                            <tr key={index}>
                                <th scope="row">{index+1}</th>   
                                <td className="admin-tables">{item.officehours_type}</td>
                                <td className="admin-tables">{item.weekday}</td>
                                <td className="admin-tables">{item.from_hour}</td>
                                <td className="admin-tables">{item.to_hour}</td>
                            </tr>
                        )
                    })
                    : null
                }
            </tbody>
            </table>
            
             </div>
            <div className="margin-b"></div>
          </div>
        </div>
      </section>
    </>
  )
}
