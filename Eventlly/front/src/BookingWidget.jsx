import { useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function BookingWidget({place}){
    const[fromDate,setFromDate]=useState('');
    const[toDate,setToDate]=useState('');  
    const[name,setName]=useState('');
    const[mobile,setMobile]=useState('');
    const[numberOfGuests,setNumberOfGuests]=useState(1); 
    const[redirect,setRedirect]=useState('');

    let numberOfDays=0;
    if(fromDate && toDate){
        numberOfDays=differenceInCalendarDays( new Date(toDate),new Date(fromDate));
    }   

    async function bookThisPlace(){
        const response=await axios.post('/bookings',{fromDate,toDate,numberOfGuests,name,mobile,price:numberOfDays*place.price,place:place._id,});
        const bookingId= response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if(redirect){
        return <Navigate to={redirect} />;
    }

    return(
        <div>
            <div className="bg-lavender p-4 rounded-2xl shadow">
                 <div className="text-2xl text-center font-bold">Price: ₹{place.price} / per Day</div>
                    <div className="  bg-snow border rounded-2xl mt-4">
                         <div className="flex">
                            <div className=" px-4 py-3">
                                <label>From: </label>
                                 <input className=" px-1" type="date" value={fromDate} onChange={ev=> setFromDate(ev.target.value)}></input>
                            </div>
                            <div className=" ml-1 px-4 py-3 border-l">
                                <label>To: </label>
                                <input  className=" px-1" type="date" value={toDate} onChange={ev=> setToDate(ev.target.value)}></input>
                            </div>
                        </div>
                        <div className=" px-4 py-3 border-t">
                            <label>No. of Guests: </label>
                            <input className=" border border-blue-400 rounded-2xl px-3 py-2 my-1 w-full" type="number" value={numberOfGuests} onChange={ev=> setNumberOfGuests(ev.target.value)}/>
                        </div>
                        {numberOfDays >0 &&(
                            <div className=" px-4 py-3 border-t">
                                <label>Your Full Name: </label>
                                <input className=" border border-blue-400 rounded-2xl px-3 py-2 my-1 w-full" type="text" value={name} onChange={ev=> setName(ev.target.value)}/>
                                <label>Phone Number: </label>
                                <input className=" border border-blue-400 rounded-2xl px-3 py-2 my-1 w-full" type="tel" value={mobile} onChange={ev=> setMobile(ev.target.value)}/>
                            </div>
                        )}
                    </div>
                <button onClick={bookThisPlace} className="bg-primary p-2 mt-4 w-full text-white rounded-2xl">
                     Book this Place
                     {numberOfDays>0 &&(
                        <span> ₹{numberOfDays * place.price}</span>
                     )}
                </button>
            </div>
        </div>
    );
}