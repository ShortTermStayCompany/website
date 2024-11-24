
import './RegisterButton.css'

// eslint-disable-next-line react/prop-types
const RegisterButton = ({modalType = 'RegisterModal'} ) => {

    return (
        <div>
            <button className="register-button">{modalType.replace('Modal','')}</button>
        </div>
    )
}

export default RegisterButton;