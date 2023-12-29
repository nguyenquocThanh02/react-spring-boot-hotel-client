import  { useState } from "react";
import { useEffect } from "react";
import { getRoomTypes } from "../utils/ApiFunction";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomTypes] = useState([""])
    const [showRoomTypeInput, setShowRoomTypeInput] = useState(false)
    const [newRoomTypes, setNewRoomTypes] = useState("")

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        })
    }, [])

    const handleNewRoomInputChange = (e) => {
        setNewRoomTypes(e.target.value);
    }

    const handleAddNewRoomType = (e) => {
        if(newRoomTypes !== ""){
            setRoomTypes([...roomTypes, newRoomTypes])
            setNewRoomTypes("")
            setShowRoomTypeInput(false)
        }
    }

    return (  
        <>
            {roomTypes.length > 0 &&(
                <div>
                    <select name="roomType" id="roomType" value={newRoom.roomType} onChange={(e)=>{
                        if(e.target.value === "Add New"){
                            setShowRoomTypeInput(true)
                        }else{
                            handleRoomInputChange(e)
                        }
                    }}>
                        <option value="" className="text-primary">select a room type</option>
                        <option value={"Add New"} className="text-primary">Add New</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}

                    </select>
                    {showRoomTypeInput &&
                        <>
                            <input type="text" className="form-control" id="roomType" name="roomType" onChange={handleNewRoomInputChange}/>
                            <button className="btn btn-primary" type="button" onClick={handleAddNewRoomType}>Add</button>
                        </>
                    }
                </div>
            )}
        </>
    );
}

export default RoomTypeSelector;