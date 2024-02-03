import { useSelector } from "react-redux";
import Header from "../elements/header.jsx";
import { useLocation } from "react-router-dom";
import { useState } from "react";

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
                                <h2>Заявка №{e.id}</h2>
                            </div>
                            <div className="aboutReq">
                                <div className="imgReq">
                                    <img src={e.file} alt="" />
                                </div>
                                <div className="textReq">
                                    <div>
                                        <h4>дата: </h4>
                                        <p>{e.date}</p>
                                    </div>
                                    <div>
                                        <h4>место: </h4>
                                        <p>{e.location}</p>
                                    </div>
                                    <div>
                                        <h4>номер машины: </h4>
                                        <p>{e.numbercar}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="statusReq">{e.status}</div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}