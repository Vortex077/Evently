import decoration from "./assets/decoration.svg";
import food from "./assets/food.svg";
import makeup from "./assets/makeup.svg";
import room from "./assets/room.svg";

export default function Perks({selected,onChange}){selected.includes

    function handleCbClick(ev) {
        const{checked,name}=ev.target;
        if(checked){
            onChange([...selected,name]);
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
    }

    return(
        <>
                        <label className=" flex border p-4 gap-2 rounded-2xl items-center cursor-pointer">
                            <input type="checkbox" checked={selected.includes('DJ')} name='DJ' onChange={handleCbClick}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                            </svg>
                            <span>DJ</span>
                        </label>
                        <label className=" flex border p-4 gap-2 rounded-2xl items-center cursor-pointer">
                            <input type="checkbox" checked={selected.includes('Decoration')} name='Decoration' onChange={handleCbClick}/>
                            <img className='h-7 w-8' src={decoration} alt="deco_icon" />
                            <span>Decoration</span>
                        </label>
                        <label className=" flex border p-4 gap-2 rounded-2xl items-center cursor-pointer">
                            <input type="checkbox" checked={selected.includes('Catering')} name='Catering' onChange={handleCbClick}/>
                            <img className='h-7 w-8' src={food} alt="food_icon" />
                            <span>Catering</span>
                        </label>
                        <label className=" flex border p-4 gap-2 rounded-2xl items-center cursor-pointer">
                            <input type="checkbox" checked={selected.includes('Makeup Artist')} name='Makeup Artist' onChange={handleCbClick}/>
                            <img className='h-7 w-8' src={makeup} alt="makeup_icon" />
                            <span>Makeup Artist</span>
                        </label>
                        <label className=" flex border p-4 gap-2 rounded-2xl items-center cursor-pointer">
                            <input type="checkbox" checked={selected.includes('Rooms')} name='Rooms' onChange={handleCbClick}/>
                            <img className='h-7 w-8' src={room} alt="room_icon" />
                            <span>Rooms</span>
                        </label>
        </>
    );
}