import React, { useEffect, useState } from 'react'
import axios from "axios";
import { reset_password } from '../actions/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function ReservationSchedule() {
    const [hallReservations, setHallReservations] = useState()
    const [labReservations, setLabReservations] = useState()
    const [deviceReservations, setDeviceReservations] = useState()
    const [reservations, setReservations] = useState()

    useEffect(() => {
        axios
          .get("http://localhost:8000/api/reservedhalls/")
          .then((res) => setHallReservations(res.data));
    }, []);
    
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/reservedlabs/")
            .then((res) => setLabReservations(res.data));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/reserveddevices/")
            .then((res) => setDeviceReservations(res.data));
    }, []);

    function onChange(e){

        if (e.target.value == "halls"){
            setReservations(hallReservations)
        }
        else if (e.target.value == "labs"){
            setReservations(labReservations)
        }
        else if (e.target.value == "devices"){
            setReservations(deviceReservations)
        }
        else if (e.target.value == "Reservation Types"){
            alert("Choose a proper Reservation Type")
        }
    }

    return (
    <>  
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
        <select className="select form-control-lg btn button" 
            onChange={(e) => onChange(e)}
            name="ReserveType"
            value={reservations}>

            <option selected value="Reservation Types">Reservation Types</option>
            <option value="halls">Halls Reservations</option>
            <option value="labs">Labs Reservations</option>
            <option value="devices">Devices Reservations</option>

        </select>

        <table class="table table-hover table-dark ">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Reserved By</th>
                {/* <th scope="col">Confirmed By</th> */}
                <th scope="col">Date</th>
                <th scope="col">Time Slot</th>
                <th scope="col">Confirmed</th>
                </tr>
            </thead>
            <tbody>
                {
                    reservations != undefined ?
                    reservations.map((item,index)=>{
                        return (
                            <tr key={index}>
                                <th scope="row">{index+1}</th>   
                                    {item.hall_id ? <td>{item.hall_id}</td> : null}
                                    {item.lab_id ? <td>{item.lab_id}</td> : null}
                                    {item.device_id ? <td>{item.device_id}</td> : null}
                                <td>{item.staff_id}</td>
                                {/* <td>{}</td> */}
                                <td>{item.date}</td>
                                <td>{item.timeslot}</td>
                                <td>{item.is_confirmed ? <FontAwesomeIcon className="fs-2" icon={faCircleCheck} /> : <FontAwesomeIcon className="fs-2" icon={faCircleXmark} /> }</td>
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
