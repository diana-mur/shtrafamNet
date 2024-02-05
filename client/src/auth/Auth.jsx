import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authThunk } from '../redux/authSlice.js'
import Header from '../elements/header.jsx'
import { useLocation } from 'react-router-dom'

function Authorization() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const path = useLocation()

  return (
    authState.loading ? <p>Loading...</p> :
      <>
        {/* <Header role={undefined} path={path.pathname} /> */}
        <div className="mainDiv">
          <form>
            <h1>Авторизация</h1>
            <input type="text" placeholder='Номер телефона' value={phone} onChange={e => setPhone(e.target.value)} />
            <input type="password" placeholder='Пароль' value={password} onChange={e => setPassword(e.target.value)} />
            <button className='btn' onClick={() => {
              dispatch(authThunk({
                phone: phone,
                password: password
              }))
            }}>Войти</button>
          </form>
          {
            authState.error ? <p>{authState.error}</p> : <></>
          }
        </div>
      </>
  )
}

export default Authorization
