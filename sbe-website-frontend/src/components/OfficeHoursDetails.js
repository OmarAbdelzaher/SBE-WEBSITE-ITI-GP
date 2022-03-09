import React from 'react';
import { useState, useEffect,useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useHistory, useParams } from 'react-router-dom';

export default function OfficeHoursDetails(params) {

    const staff = useSelector(( state ) => state.auth)
    const [officehours,setOfficeHours] = useState()
    const history = useHistory()

    useEffect(() => {
        axios
          .get("http://localhost:8000/api/officehours/")
          .then((res) =>{
              setOfficeHours(res.data)
            }); 
      }, []);

      useEffect(() => {
    
            if (staff.user != null && officehours != undefined ) 
            {
              setOfficeHours(officehours.filter((oh) => oh.staff_id == staff.user.id))
            }
      }, []);

    const deleteOfficeHour = (id) => {
        axios.delete(`http://localhost:8000/api/officehourdetails/${id}`).then((res)=>{
            const officehours_update = officehours.filter( item => item.id !== id  )
            setOfficeHours(officehours_update)
        }).catch((e)=>{
            console.log(e)
        })
    }

  return (
   <>
   <br/>
   <br/>

   <br/>
   <br/>
   <br/>

   <button className='btn btn-success'>
   <Link to={"/officehours"}>Add Office Hours 
</Link>
   </button>
        <table class="table table-hover table-dark">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">OfficeHour Type</th>
            <th scope="col">Week Day</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Actions</th>

            </tr>
        </thead>
        <tbody>
            {
                officehours != undefined ?
                officehours.map((item,index)=>{
                    return (
                        <tr key={index}>
                            <th scope="row">{index+1}</th>   
                            <td>{item.officehours_type}</td>
                            <td>{item.weekday}</td>
                            <td>{item.from_hour}</td>
                            <td>{item.to_hour}</td>
                            <td>
                                <button className="btn btn-success" ><Link to={`/officehoursEdit/${item.id}`}>Edit</Link> </button>
                                <button className="btn btn-danger" onClick={()=> deleteOfficeHour(item.id)} >Delete</button>
                            </td>
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
