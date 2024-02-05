import { useLocation } from "react-router-dom";
import Header from "../elements/header";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function NewReq() {
    const [date, setDate] = useState('')
    const [location, setLocatione] = useState('')
    const [numberCar, setNumberCar] = useState('')
    const [file, setFile] = useState(undefined)

    const role = useSelector((state) => state.auth.roleid)
    const id = useSelector((state) => state.auth.id)
    const path = useLocation()

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        // setFileName(e.target.files[0].name)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('date', date);
            formData.append('location', location);
            formData.append('numberCar', numberCar);
            formData.append('files', file);
            formData.append('userId', id)

            const response = await fetch('http://localhost:5000/newrequest', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log("Данные успешно отправлены на сервер");

                setDate('')
                setLocatione('')
                setNumberCar('')
                setFile(undefined)
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
                <form onSubmit={handleSubmit}>
                <h1>Создать заявку</h1>
                    <input type="date" placeholder="дата" name="date" value={date} onChange={e => setDate(e.target.value)} />
                    <input type="text" placeholder="место" name="location" value={location} onChange={e => setLocatione(e.target.value)} />
                    <input type="text" placeholder="номер авто" name="numCar" value={numberCar} onChange={e => setNumberCar(e.target.value)} />
                    <input type="file" placeholder="Прикрепить фото/видео" name="files" id="input__file" onChange={handleFileChange} />
                    <label htmlFor="input__file" className="fileBtn">{file == undefined ? 'Прикрепить фото/видео' : 'Файл прикреплен'}</label>
                    <button type="submit" className="btn">Отправить</button>
                </form>
            </div>
        </>
    )
}

export default NewReq