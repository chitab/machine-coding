import './Header.css';
const Header = ({header, onClick}) => {
    return(
        <header
        >
            <button onClick={onClick} className="back-button">Back to List</button>
            <div className="header-text">{header}</div>
        </header>

    )
}
export default Header;