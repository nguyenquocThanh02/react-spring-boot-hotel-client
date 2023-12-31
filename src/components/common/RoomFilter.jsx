import  { useState } from 'react';

const RoomFilter = ({data, setFilteredData}) => {
    const [filter, setFilter] = useState("")

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value
        setFilter(selectedRoomType)
        const filteredRooms = data.filter((room) => room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()));
        setFilteredData(filteredRooms)
    }

    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }

    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))]
    return (  
        <div className='input-group mb-3'>
            <span className="input-group-text" id="room-type-filter">Filter room by type</span>
            <select className="form-select" value={filter} onChange={handleSelectChange}>
                <option value={""}>select a room type to filter</option>
                {roomTypes.map((roomType, index) => (
                    <option key={index} value={String(roomType)}>{String(roomType)}</option>
                ))}
            </select>

            <button className="btn btn-primary" type="button" onClick={clearFilter}>Clear Filter</button>
        </div>
    );
}

export default RoomFilter;