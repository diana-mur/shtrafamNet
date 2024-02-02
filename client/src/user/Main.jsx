import { useSelector } from "react-redux";
import Header from "../elements/header.jsx";
import { useLocation } from "react-router-dom";

export default function UserMain() {
    const role = useSelector((state) => state.auth.roleid)

    const path = useLocation()

    const [requests, setRequests] = useState([])

    return (
        <>
            <Header role={role} path={path.pathname} />
            <div className="requestsList">
            {
            requests.map(e => (
                <div className="req">
                    <div className="numReq">
                        <h2>Заявка №</h2>
                    </div>
                    <div className="aboutReq">
                        <div className="imgReq">
                            <img src="" alt="" />
                        </div>
                        <div className="textReq">
                            
                        </div>
                    </div>
                </div>
            ))
            }
            </div>
        </>
    )
}