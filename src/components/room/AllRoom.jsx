import { useEffect } from "react";
import { getAllRooms } from "../utils/ApiFunction";

function AddRoom() {

    useEffect(()=>{
        getAllRooms().then((data) => {
            console.log(data)
        })
    },[])
    return ( 
        <div>
            xin chao nhe
        </div>
     );
}

export default AddRoom;