import  {useState} from "react";
import { useEffect } from "react";
import {useParams, Link} from "react-router-dom"
import {getRoomById, updateRoom} from "../utils/ApiFunction"
import RoomTypeSelector from "../common/RoomTypeSelector"

function EditRoom() {
    const initialRoom = {
        photo: null,
        roomType: "",
        roomPrice: ""
    }

    const [room, setRoom] = useState(initialRoom)
    const [imagePreview, setImagePreview] = useState("")
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageError, setMessageError] = useState("")

    const {roomId} = useParams()

    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if(name === "roomPrice"){
            if(!isNaN(value)){
                value = parseInt(value, 10)
            }
            else{
                value = ""
            }
        }
        setRoom({...room, [name]: value})
    }

    const handleImageChange = (e) => {
        const selectedIamge = e.target.files[0]
        setRoom({...room, photo: selectedIamge})
        setImagePreview(URL.createObjectURL(selectedIamge))
        console.log("đã tc")
    }

    useEffect(() => {
        const fetchRoom = async () => {
            try{
                const roomData = await getRoomById(roomId)
                setRoom(roomData)
                setImagePreview('data:image/jpeg;base64,' + roomData.photo)
            }catch(error){
                console.log(error)
            }
        }
        fetchRoom()
    }, [roomId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await updateRoom(roomId, room)
            if(response.status === 200){
                setMessageSuccess("Successfully updating a room")
                const updatedRoomData = await getRoomById(roomId)
                setRoom(updatedRoomData)
                setImagePreview('data:image/jpeg;base64,' + updatedRoomData.photo)
                setMessageError("")
            }else{
                setMessageError("Couldn't update a new room")
            }
        }catch(error){
            setMessageError(error.message)
        }

        setTimeout(() => {
            setMessageError("");
            setMessageSuccess("");
        }, 2000)
    }
    return (  
        <>
            <section>
                <h2 className="text-center">Edit room</h2>
                {messageSuccess &&
                    <p className="alert alert-success">{messageSuccess}</p>
                }
                {messageError &&
                    <p className="alert alert-success">{messageError}</p>
                }
                <form action="" className="border p-2">
                    <div className="mb-3">
                        <label htmlFor="roomType" className="form-label">Room type</label>
                        <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={room}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="roomPrice" className="form-label">Room price</label>
                        <input type="text" className="form-control" id="roomPrice" name="roomPrice" value={room.roomPrice} onChange={handleRoomInputChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="photo" className="form-label">Photo</label>
                        <input type="file" className="form-control" id="photo" name="photo" onChange={handleImageChange}/>
                        {imagePreview && 
                            <img src={imagePreview} alt="photo of room" style={{maxWidth: "200px"}}/>
                        }
                    </div>
                    
                    <div className="d-grid gap-2 d-md-flex mt-2">
                        <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
                            Back
                        </Link>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Edit room</button>
                    </div>
                    
                </form>
            </section>
        </>
    );
}

export default EditRoom;
