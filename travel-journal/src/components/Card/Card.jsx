import Pin from "../../assets/pin.svg"
import "./Card.scss"

const Card = ({item}) => {
    return (
        <article className="card">
            <img src={item.imageUrl} alt="Article image" className="cardImage" />
            <div className="cardContent">
                <div className="cardMeta">
                    <div className="cardLocation">
                        <img src={Pin} alt="" aria-hidden={true}/>
                        <span className='locationName'>{item.location}</span>
                    </div>
                    <a href={item.googleMapsUrl}>View on Google Maps</a>
                </div>
                <h1 className="title">{item.title}</h1>
                <span className="cardDate">{item.startDate} - {item.endDate}</span>
                <p className="cardDescription">{item.description}</p>
            </div>
        </article>
    )
}

export default Card