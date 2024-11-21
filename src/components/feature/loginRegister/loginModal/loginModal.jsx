import './loginModal.css'
const LoginModal = () => {

    return (
        <div className="loginModal">
            <input className={'NameSurname'}
                   type='text'
                   title='NameSurname'
                   placeholder='Name Surname'
            ></input>
            <input className={'email'}
                   type={'email'}
                   title='Email'
                   placeholder='Email'
            ></input>
            <input className={'Password'}
                   type={'password'}
                   title={'Password'}
                   placeholder='Password'
            ></input>
            <select className={'Password'}></select>
            <button className="loginModal__btn">Login</button>
        </div>
    )
}

export default LoginModal;