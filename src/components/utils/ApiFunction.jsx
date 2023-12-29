import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9192"
})

// Function to add a new room
export async function addRoom(photo, roomType, roomPrice){
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData)
    
    if(response.status === 200){
        return true;
    }else return false;
}

// Function to get all types of rooms
export async function getRoomTypes(){
    try{
        const response = await api.get("rooms/types")
        return response.data
    }catch(error){
        throw new Error("Error fetching room types")
    }
}

// Function to get all rooms
export async function getAllRooms(){
    try{
        const response = await api.get("rooms/all-rooms")
        // console.log(response.data)
        return response.data
    }catch(error){
        throw new Error("Error fetching all rooms")
    }
}

// Function to delete room by id
export async function deleteRoom(roomId){
    try{
        const result = await api.delete(`rooms/delete-room/${roomId}`)
        return result.data
    }catch(error){
        throw new Error(`Error deleting room ${error.message}`)
    }
}

// Function to update room by id
export async function updateRoom(roomId, roomData){
    const formData = new FormData()
    formData.append("photo", roomData.photo)
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    const response = await api.put(`/rooms/update-room/${roomId}`, formData)
    return response

}

// Function to get a room by id
export async function getRoomById(roomId){
    try{
        const result = await api.post(`/rooms/get-room/${roomId}`)
        return result.data
    }catch(error){
        throw new Error(`Error fetching room ${error.message}`)
    }
}