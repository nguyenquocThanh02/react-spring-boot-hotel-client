import { useState } from "react"
import RoomTypeSelector from "../common/RoomTypeSelector";
import {addRoom} from "../utils/ApiFunction"
import {Link} from "react-router-dom"

function AddRoom() {
    const initialRoom = {
        photo: null,
        roomType: "",
        roomPrice: ""
    }

    const [newRoom, setNewRoom] = useState(initialRoom)
    const [imagePreview, setImagePreview] = useState("")
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageError, setMessageError] = useState("")

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
        setNewRoom({...newRoom, [name]: value})
    }

    const handleImageChange = (e) => {
        const selectedIamge = e.target.files[0]
        setNewRoom({...newRoom, photo: selectedIamge})
        setImagePreview(URL.createObjectURL(selectedIamge))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
            if(success !== undefined){
                setMessageSuccess("Successfully adding a new room")
                setNewRoom(initialRoom)
                setImagePreview("")
                setMessageError("")
            }else{
                setMessageError("Couldn't add a new room")
            }
        }catch(error){
            setMessageError(error.message)
        }

        setTimeout(() => {
            setMessageError("");
            setMessageSuccess("");
        }, 3000)
    }
    return (  
        <>
            <section>
                <h2 className="text-center">Add a new room</h2>
                {messageSuccess &&
                    <p className="alert alert-success">{messageSuccess}</p>
                }
                {messageError &&
                    <p className="alert alert-success">{messageError}</p>
                }
                <form action="" className="border p-2">
                    <div className="mb-3">
                        <label htmlFor="roomType" className="form-label">Room type</label>
                        <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="roomPrice" className="form-label">Room price</label>
                        <input type="text" className="form-control" id="roomPrice" name="roomPrice" value={newRoom.roomPrice} onChange={handleRoomInputChange}/>
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
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                    
                </form>
            </section>
        </>
    );
}

export default AddRoom;