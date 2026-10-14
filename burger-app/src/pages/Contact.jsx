import './Contact.css'


function Contact () {
    return (
        <div className="page-content page-content--offset">
            <h2>Contact Us</h2>
            <div className="contact-grid">
                <div className="contact-info">
                    <h3>Visit Us</h3>
                    <p className="info-line">
                        <strong>Address</strong><br />
                        123 Burger Street, Boston, MA 02115
                    </p>
                    <p className="info-line">
                        <strong>Phone</strong><br />
                        (617) 555-0198
                    </p>
                    <p className="info-line">
                        <strong>Hours</strong><br />
                        Mon-Fri: 11:00 AM - 08:00 PM <br/>
                        Sat: 11:00 AM - 10:00 PM <br/>
                        Sun: 11:00 AM - 10:00 PM
                    </p>
                </div>

                <div className="contact-map">
                <iframe
                    title="Burger Barn Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2951.9!2d-71.0942!3d42.3417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDIwJzMwLjEiTiA3McKwMDUnMzkuMSJX!5e0!3m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>
            </div>
        </div>
    );
}


export default Contact;