import { Link, useLocation } from "react-router-dom";
import Header from "../elements/header";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logOut } from "../redux/authSlice";

export default function Account() {
    const role = useSelector((state) => state.auth.roleid)
    const path = useLocation()
    const [nick, setNick] = useState('')
    const [phone, setPhone] = useState('')

    const dispatch = useDispatch()

    return (
        <>
            <Header role={role} path={path.pathname} />
            <h1>Профиль</h1>
            <div className="aboutAcc">
                <div>
                    <h4>Ник: </h4>
                    <p>{nick}</p>
                </div>
                <div>
                    <h4>Номер телефона: </h4>
                    <p>{phone}</p>
                </div>
            </div>
            <Link to={"/redactAccount"}>Редактировать данные</Link>
            <button onClick={() => {
                dispatch(logOut())
            }}>Выйти</button>
        </>
    )
}