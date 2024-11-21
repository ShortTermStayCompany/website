import './SubmitButton.css'

const SubmitButton = ({onClick, text}) => {
    return (
        <div className="submitButtonField">
            <button className="SubmitButton"
            type="submit"
            onClick={onClick}>
                {text}
            </button>
        </div>
    )
}

export default SubmitButton;