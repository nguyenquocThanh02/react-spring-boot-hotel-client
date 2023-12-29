import './App.css'
import ExistingRoom from './components/room/ExistingRoom'
import Home from './components/home/Home'
import EditRoom from './components/room/EditRoom'
import AddRoom from './components/room/AddRoom' 
import RoomCard from './components/room/RoomCard'
import Room from './components/room/Room'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import RoomListing from './components/room/RoomListing'
import Admin from './components/admin/Admin'
function App() {
  
  return (
    <>
      <main>
          <Router>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/edit-room/:roomId" element={<EditRoom/>}/>
              <Route path="/existing-rooms" element={<ExistingRoom/>}/>
              <Route path="/all-rooms" element={<RoomListing/>}/>
              <Route path="/rooms" element={<Room/>}/>
              <Route path="/add-room" element={<AddRoom/>}/>
              <Route path="/user/login" element={<AddRoom/>}/>
              <Route path="/user/profile" element={<AddRoom/>}/>
              <Route path="/user/logout" element={<AddRoom/>}/>
              <Route path="/admin" element={<Admin/>}/>
            </Routes>
          </Router>
      </main>
    </>
  )
}

export default App
