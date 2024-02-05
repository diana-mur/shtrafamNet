import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"

function Header() {
    const [loc, setLoc] = useState('')
    const role = useSelector((state) => state.auth.roleid)

    return (
        <div className="header">
            <p className="logo">ШтрафамНет</p>
            {
                role == undefined ?
                    <nav>
                        <div className="boxAnimation">
                            <div className="animation" style={{
                                transform: loc == '/auth' ? 'translate(0)' : 'translate(197px)',
                            }}></div>
                        </div>
                        <div className="navLink">
                            <NavLink to={'/auth'} className={({ isActive, isPending }) =>
                                isActive
                                    ? "location"
                                    : isPending
                                        ? "navLink_a"
                                        : "navLink_a"
                            } onClick={() => setLoc('/auth')} id="auth">Авторизация</NavLink>
                        </div>
                        <div className="navLink">
                            <NavLink to={'/reg'} className={({ isActive, isPending }) => 
                                isActive
                                    ? "location"
                                    : isPending
                                        ? "navLink_a"
                                        : "navLink_a"
                            } onClick={() => setLoc('/reg')} id="reg">Регистрация</NavLink>
                        </div>
                    </nav> :
                    role == 1 ?
                        <nav>
                            <div className="boxAnimation">
                                <div className="animation" style={{
                                    transform: loc == "/myAccount" ? 'translate(394px)' : loc == "/newRequest" ? 'translate(197px)' : 'translate(0)',
                                    transition: "all 1s ease-in-out"
                                }}></div>
                            </div>
                            <div className="navLink">
                                <NavLink to={'/'}
                                    className={({ isActive, isPending }) => 
                                    isActive
                                        ? "location"
                                        : isPending
                                            ? "navLink_a"
                                            : "navLink_a"
                                } onClick={() => setLoc('/')} id="main">Главная</NavLink>
                            </div>
                            <div className="navLink">
                                <NavLink to={'/newRequest'}
                                    className={({ isActive, isPending }) => 
                                    isActive
                                        ? "location"
                                        : isPending
                                            ? "navLink_a"
                                            : "navLink_a"
                                } onClick={() => setLoc('/newRequest')} id="newRequest">Создать заявку</NavLink>
                            </div>
                            <div className="navLink">
                                <NavLink to={'/myAccount'}
                                    className={({ isActive, isPending }) => 
                                    isActive
                                        ? "location"
                                        : isPending
                                            ? "navLink_a"
                                            : "navLink_a"
                                } onClick={() => setLoc('/myAccount')} id="myAccount">Профиль</NavLink>
                            </div>
                        </nav >
                        :
                        <nav>
                            <div className="boxAnimation">
                                <div className="animation" style={{
                                    transform: loc == "/myAccount" ? 'translate(197px)' : 'translate(0)',
                                    transition: "all 1s ease-in-out"
                                }}></div>
                            </div>
                            <div className="navLink">
                                <NavLink to={'/admin'}
                                    className={({ isActive, isPending }) => 
                                    isActive
                                        ? "location"
                                        : isPending
                                            ? "navLink_a"
                                            : "navLink_a"
                                } onClick={() => setLoc('/admin')} id="admin">Главная</NavLink>
                            </div>
                            <div className="navLink">
                                <NavLink to={'/myAccount'}
                                    className={({ isActive, isPending }) => 
                                    isActive
                                        ? "location"
                                        : isPending
                                            ? "navLink_a"
                                            : "navLink_a"
                                } onClick={() => setLoc('/myAccount')} id="myAccount">Профиль</NavLink>
                            </div>
                        </nav>
            }
        </div >
    )
}

export default Header

// ul li