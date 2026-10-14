function TestimonialCard({testimonial}) {
    return (
        <div className="testimonial-card">
            <div className="stars">
                {"★".repeat(testimonial.rating)}
                {"☆".repeat(5 - testimonial.rating)}
            </div>
            <p className="quote">"{testimonial.quote}"</p>
            <p className="author">— {testimonial.name}</p>
        </div>
    );
}


export default TestimonialCard;