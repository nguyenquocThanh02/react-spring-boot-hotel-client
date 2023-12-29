import NavBar from "../layout/NavBar"
import HeaderMain from "../layout/HeaderMain";
import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
function Home() {
    return (  
        <section>
            <NavBar />
            <HeaderMain/>
            <h2>Home page</h2>

            <section className="container">
                <Parallax />
                {/* <HotelService /> */}
                <Parallax />
            </section>
        </section>
    );
}

export default Home;
<div>
    <h2>Home page</h2>
</div>