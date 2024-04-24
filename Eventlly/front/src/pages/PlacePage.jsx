import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage(){
    const{id}=useParams();
    const[place,setPlace]=useState(null);
    
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get(`/places/${id}`).then(response =>{
            setPlace(response.data);
        });
    },[id]);

    if(!place) return '';

    return (
        <div className="mt-1 -mx-4 px-8 pt-6 bg-snow">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
           <PlaceGallery place={place} />     
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    <div>
                        ✦ Min number of guests: {place.minGuests}<br />
                        ✦ Max number of guests: {place.maxGuests}
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl mt-4">Perks:</h3>
                        <ul>
                            {place.perks && place.perks.map((perk, index) => (
                            <li key={index} className="list-disc list-inside">
                                {perk}
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
                 <BookingWidget place={place} />
            </div>
            <div className=" bg-white -mx-8 px-8 py-8 border-t">
            <div>
                <h2 className="font-semibold text-2xl">Extra Information</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-6">{place.extraInfo}</div>
            </div>
        </div>
        
    );
}