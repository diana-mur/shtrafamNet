import { useSelector } from "react-redux";
import Header from "../elements/header";
import { useLocation } from "react-router-dom";

export default function RedAcc() {
    const role = useSelector((state) => state.auth.roleid)
    const path = useLocation()

    return (
        <>
            <Header role={role} path={path.pathname} />
            <h1>Редактировать данные</h1>
            <form>
                <input type="text" placeholder="Ник" />
                <input type="text" placeholder="Номер телефона" />
                <button>Готово</button>
            </form>
        </>
    )
}