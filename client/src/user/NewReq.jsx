import { useLocation } from "react-router-dom";
import Header from "../elements/header";
import { useDispatch, useSelector } from "react-redux";

function NewReq() {
    const role = useSelector((state) => state.auth.roleid)
    const path = useLocation()

    return (
        <>
            <Header role={role} path={path.pathname} />
            <h1>Создать заявку</h1>
            <form>
                <input type="date" placeholder="дата" />
                <input type="text" placeholder="место" />
                <input type="text" placeholder="номер авто" />
                <input type="file" placeholder="Прикрепить фото/видео" />
                <button>Отправить</button>
            </form>
        </>
    )
}

export default NewReq