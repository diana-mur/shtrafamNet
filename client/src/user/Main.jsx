import { useSelector } from "react-redux";
import Header from "../elements/header.jsx";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function UserMain() {
    const [requests, setRequests] = useState([])

    const role = useSelector((state) => state.auth.roleid)
    const id = useSelector((state) => state.auth.id)

    const path = useLocation()

    useEffect(() => {
        fetch(`http://localhost:5000/requests/${id}`)
            .then(res => res.json())
            .then(json => setRequests(json))
    }, [id])

    console.log(id);

    return (
        <>
            <h1 className="hReq">Заявки</h1>
            <div className="requestsList">
                {
                    requests.map(e => (
                        <div className="req" key={e.id}>
                            <div className="numReq">
                                <h2>Заявка №{e.id}</h2>
                            </div>
                            <div className="aboutReq">
                                <div className="imgReq">
                                    <img src={`http://localhost:5000/` + e.file} alt="" />
                                </div>
                                <div>
                                    <div className="textReq">
                                        <h4>дата: </h4>
                                        <p>{e.date}</p>
                                    </div>
                                    <div className="textReq">
                                        <h4>место: </h4>
                                        <p>{e.location}</p>
                                    </div>
                                    <div className="textReq">
                                        <h4>номер машины: </h4>
                                        <p>{e.numbercar}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="statusReq" style={{
                                color: e.statusid == 1 ? '#F5FF84' : e.statusid == 2 ? '#8DF791' : '#FF8484',
                                border: e.statusid == 1 ? '1px solid #F5FF84' : e.statusid == 2 ? '1px solid #8DF791' : '1px solid #FF8484',
                            }}>{e.statusid == 1 ? 'в обработке' : e.statusid == 2 ? 'принято' : 'отклонено'}</div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}