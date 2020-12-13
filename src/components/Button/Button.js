import './Button.scss';

const Button = ({value, color}) => {
    return (
        <div className="button" style={{borderColor: color, color: color}}>
            {value}
        </div>
    )
}

export default Button;