interface Props {
    text: string;
    onClick: () => void;
}

const Button = ({ text, onClick }: Props): JSX.Element => {
    return (
        <button type="button" className="button" onClick={onClick}>
            {text}
        </button>
    );
};
export default Button;