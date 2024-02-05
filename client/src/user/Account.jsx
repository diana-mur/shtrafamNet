import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logOut } from "../redux/authSlice";

export default function Account() {
    const role = useSelector((state) => state.auth.roleid)
    const id = useSelector((state) => state.auth.id)
    const path = useLocation()
    const [info, setInfo] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        fetch(`http://localhost:5000/profile/${id}`)
            .then(res => res.json())
            .then(json => setInfo(json))
    }, [id])

    return (
        <>
            <div className="mainDiv">
                <h1>Профиль</h1>
                <div className="aboutAcc">
                    <div className="infoAcc">
                        <h4>Ник: </h4>
                        <p>{info[0]?.nick}</p>
                    </div>
                    <div className="infoAcc">
                        <h4>Номер телефона: </h4>
                        <p>{info[0]?.phone}</p>
                    </div>
                </div>
                <Link to={"/redactAccount"} className="redactAcc">Редактировать данные</Link>
                <button className="btn" onClick={() => {
                    dispatch(logOut())
                }}>Выйти</button>
            </div>
        </>
    )
}