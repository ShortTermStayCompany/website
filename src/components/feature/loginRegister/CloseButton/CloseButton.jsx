import './CloseButton.css'

const CloseButton = ({onClick}) => {
    return (
        <div className="CloseButtonContainer">
            <button className="CloseButton"
                    onClick={onClick}>
                x
            </button>
        </div>
    )
}

export default CloseButton;