import { Link } from "react-router-dom";

function Admin() {
    return (  
        <section className="container mt-5">
            <h2>Welcome to Admin page</h2>
            <hr/>
            <Link to={"/existing-rooms"}>
                Manage Rooms
            </Link>
        </section>
    );
}

export default Admin;