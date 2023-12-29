import { useEffect } from "react";
import { useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import RoomFilter from "../common/RoomFilter";
import RoomPagination from "../common/RoomPagination";
import { deleteRoom, getAllRooms } from "../utils/ApiFunction";
import '@fortawesome/fontawesome-free/css/all.css';
import NavBar from "../layout/NavBar"

const ExistingRoom = () => {

    const [rooms, setRooms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(8)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredRooms, setFilteredRooms] = useState([])
    const [selectedRoomType] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchRooms()
    }, [])

    const fetchRooms = async () => {
        setIsLoading(true)
        try{
            const result = await getAllRooms()
            setRooms(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        if(selectedRoomType === ""){
            setFilteredRooms(rooms)
        }else{
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType)
            setFilteredRooms(filtered)
        }
        setCurrentPage(1)
    }, [rooms,  selectedRoomType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDeleteRoom = async (roomId) => {
        try{
            const result = await deleteRoom(roomId)
            if(result === ""){
                setSuccessMessage(`Room No ${roomId} was deleted`)
                fetchRooms()
            }else{
                console.error(`Error deleting room:  ${result.message}`)
            }
        }catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 2000)
    }
    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomsPerPage)
    }

    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)


    return (  
        <>
        <NavBar />
        {isLoading ? (
            <p>Loading existing rooms</p>
        ) : (
            <>
            <section className="mt-5 mb-5 container">
                <div className="d-flex justify-content-center mb-3 mt-5">
                    <h2>Existing rooms</h2>
                    {successMessage && (
                        <p>{successMessage}</p>
                    )}
                    {errorMessage && (
                        <p>{errorMessage}</p>
                    )}
                </div>
                <Col md={6} className="mb-3 mb-md-0">
                    <Link to={`/add-room`}>
                        <span className="btn btn-info btn-sm"><i className="fa-solid fa-plus"></i>Add</span>
                    </Link>    
                </Col>
                <Col md={12} className="mb-3 mb-md-0">
                    <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
                </Col>

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Room Type</th>
                            <th>Room Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRooms.map((room) => (
                            <tr key={room.id} className="text-center">
                                <td>{room.id}</td>
                                <td>{room.roomType}</td>
                                <td>{room.roomPrice}</td>
                                <td className="gap-2">
                                    <Link to={`/edit-room/${room.id}`}>
                                        <span className="btn btn-info btn-sm"><i className="fa-regular fa-eye"></i></span>
                                        <span className="btn btn-warning btn-sm"> <i className="fa-regular fa-pen-to-square"></i></span>
                                    </Link>
                                    <button className="btn btn-danger btn-sm" onClick={()=>handleDeleteRoom(room.id)}>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <RoomPagination 
                    currentPage={currentPage}
                    totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                    onPageChange={handlePaginationClick}
                />
            </section>
            </>
        )}
        </>
    );
}

export default ExistingRoom;