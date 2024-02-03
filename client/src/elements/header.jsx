import { Link } from "react-router-dom"

function Header({ role, path }) {
    return (
        <div className="header">
            <p className="logo">ШтрафамНет</p>
            {
                role == undefined ?
                    <nav>
                        <Link to={'/auth'} 
                        className={path == "/auth" ? "location" : ''}>Авторизация</Link>
                        <Link to={'/reg'}
                        className={path == "/reg" ? "location" : ''}>Регистрация</Link>
                    </nav> :
                    role == 1 ?
                        <nav>
                            <Link to={'/'}
                            className={path == "/" ? "location" : ''}>Главная</Link>
                            <Link to={'/newRequest'}
                            className={path == "/newRequest" ? "location" : ''}>Создать заявку</Link>
                            <Link to={'/myAccount'}
                            className={path == "/myAccount" || path == "/redactAccount" ? "location" : ''}>Профиль</Link>
                        </nav>
                        :
                        <nav>
                            <Link to={'/admin'}
                            className={path == "/admin" ? "location" : ''}>Главная</Link>
                            <Link to={'/myAccount'}
                            className={path == "/myAccount" ? "location" : ''}>Профиль</Link>
                        </nav>
            }
        </div>
    )
}

export default Header

// ul li