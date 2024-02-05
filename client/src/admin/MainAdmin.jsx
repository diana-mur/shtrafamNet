import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

function MainAdmin() {
    const [requests, setRequests] = useState([])

    const token = useSelector((state) => state.auth.token)
    const role = useSelector((state) => state.auth.roleid)
    const id = useSelector((state) => state.auth.id)

    const path = useLocation()

    const True = async (id) => {
        try {
            const data = {
                id: id,
                status: 2
            }
            const response = await fetch(`http://localhost:5000/adminrequests`, {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Данные успешно изменены");
            } else {
                console.log("Ошибка при отправке данных на сервер");
            }
        } catch (error) {
            console.log("Ошибка при отправке данных ", error);
        }
    }

    const False = async (id) => {
        try {
            const data = {
                id: id,
                status: 3
            }
            const response = await fetch(`http://localhost:5000/adminrequests`, {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Данные успешно изменены");
                
            } else {
                console.log("Ошибка при отправке данных на сервер");
            }
        } catch (error) {
            console.log("Ошибка при отправке данных ", error);
        }
    }

    const getInfo = () => {
        fetch(`http://localhost:5000/admin`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(json => setRequests(json))
    }

    useEffect(() => {
        fetch(`http://localhost:5000/admin`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(json => setRequests(json))
    }, [token])

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
                                    <img src={`http://localhost:5000/${e.file}`} alt="" />
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
                            <div className="buttonsReq">
                                <button onClick={() => {
                                    True(e.id);
                                    getInfo()
                                }} className="green">Принять</button>
                                <button onClick={() => {
                                    False(e.id);
                                    getInfo()
                                }} className="red">Отклонить</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default MainAdmin