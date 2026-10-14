import './Card.css'


function Card({title, description, image}) {
    return (
        <div className="info-card">
            <div className="info-card-icon">
                {image ? <img src={image} alt={title} /> : icon}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}


export default Card;