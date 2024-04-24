import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VenuesFormPage(){
    const{id}=useParams();
    const[title,setTitle]=useState('');
    const[address,setAddress]=useState('');
    const[addedPhotos,setAddedPhotos]=useState([]);
    const[description,setDescription]=useState('');
    const[perks,setPerks]=useState('');
    const[extraInfo,setExtraInfo]=useState('');
    const[minGuests,setMinGuests]=useState(1);
    const[maxGuests,setMaxGuests]=useState(1);
    const[redirect,setRedirect]=useState(false);
    const[price,setPrice]=useState(100);

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response=>{
            const{data}=response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setMinGuests(data.minGuests);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    },[id]);

    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos, description, perks, extraInfo, minGuests, maxGuests,price
        };
    
        try {
            if (id) {
                // Update existing place
                await axios.put(`/places/${id}`, placeData);
            } else {
                // Create new place
                await axios.post('/places', placeData);
            }
    
            setRedirect(true);  // Set redirect to true
        } catch (error) {
            console.error('Error saving place:', error);
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'} />
    }

    return(
        <div className=" pl-5 pr-2">
            <AccountNav />
                <form onSubmit={savePlace}>
                    <h2 className="text-xl mt-4">Title</h2>
                    <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for eg. Name of the Place" className="w-full border rounded-2xl my-1 px-3 py-2 border-slate-200"/>
                    <h2 className="text-xl mt-4">Address</h2>
                    <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" className=" border w-full rounded-2xl my-1 px-3 py-2"/>
                    <h2 className="text-xl mt-4 ">Photos</h2>
                        <PhotosUploader  addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                    <h2 className="text-xl mt-4">Description</h2>
                    <p className="text-gray-500 text-sm"> description of the Venue</p>
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)}  className=" h-40 border w-full rounded-2xl my-1 px-3 py-2"></textarea>

                    <h2 className="text-xl mt-4">Perks</h2>
                    <p className="text-gray-500 text-sm">select perks of your Venue</p>
                    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        <Perks selected={perks} onChange={setPerks}/>
                    </div>
                    <h2 className="text-xl mt-4">Extra Info</h2>
                    <p className="text-gray-500 text-sm">rules,what else customers can expect and etc.</p>
                    <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} className=" h-40 border w-full rounded-2xl my-1 px-3 py-2"></textarea>

                    <h2 className="text-xl mt-4">Min & Max Guests</h2>
                    <p className="text-gray-500 text-sm">minimum and maximum numbers of guests allowed</p>
                    <div className="grid gap-1 grid-cols-2 md:grid-cols-3">
                        <div>
                            <h3 className="mt-2 -mb-1">Minimum no. of Guests</h3>
                            <input type="number" value={minGuests} onChange={ev => setMinGuests(ev.target.value)}  className=" border w-7/12 rounded-2xl my-1 px-3 py-2"/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Maximum no. of Guests</h3>
                            <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}  className=" border w-7/12 rounded-2xl my-1 px-3 py-2"/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Booking Price</h3>
                            <input type="number" value={price} onChange={ev => setPrice(ev.target.value)}  className=" border w-7/12 rounded-2xl my-1 px-3 py-2"/>
                        </div>
                    </div>
                    <div>
                    <button className=" w-full py-3 my-4 bg-lightsky rounded-2xl">
                        Save
                    </button>
                    </div>
                </form>
            </div>
    );
}