import { useDispatch, useSelector } from "react-redux";
import Header from "../elements/header";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RedAcc() {
    const role = useSelector((state) => state.auth.roleid)
    const id = useSelector((state) => state.auth.id)
    const path = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [info, setInfo] = useState([])
    const [nick, setNick] = useState('')
    const [phone, setPhone] = useState('')


    useEffect(() => {
        fetch(`http://localhost:5000/profile/${id}`)
            .then(res => res.json())
            .then(json => setInfo(json))
    }, [id])

    useEffect(() => {
        setNick(info[0]?.nick);
        setPhone(info[0]?.phone)
    }, [info])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                nick: nick,
                phone: phone
            }

            const response = await fetch(`http://localhost:5000/updateprofile/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Данные успешно изменены");
                navigate('/myAccount')
            } else {
                console.log("Ошибка при отправке данных на сервер");
            }
        } catch (error) {
            console.log("Ошибка при отправке данных ", error);
        }
    }

    return (
        <>
            <div className="mainDiv">
                <h1>Редактировать данные</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Ник" value={nick} onChange={e => setNick(e.target.value)} />
                    <input type="text" placeholder="Номер телефона" value={phone} onChange={e => setPhone(e.target.value)} />
                    <button type="submit" className="btn">Готово</button>
                </form>
            </div>
        </>
    )
}