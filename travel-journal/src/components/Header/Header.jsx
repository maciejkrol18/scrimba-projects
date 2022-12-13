import './Header.scss'
import GlobeIcon from "../../assets/globe.svg"

const Header = () => {
    return (
        <header className='header'>
            <img src={GlobeIcon} alt="" aria-hidden={true}/>
            <p>my travel journal</p>
        </header>
    )
}

export default Header