import { useNavigate } from 'react-router-dom';
import "../styles/App.css"
export const Navbar = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-info">
                <div className="container-fluid">
                    
                   

                    <div className="collapse navbar-collapse" id="navbarColor03">
                        <ul className="navbar-nav me-auto">

                        </ul>

                        <button
                            className="btn btn-outline-secondary my-2 my-sm-0"
                            onClick={() => navigate("/create-employee")}
                        >
                            Create User
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}
