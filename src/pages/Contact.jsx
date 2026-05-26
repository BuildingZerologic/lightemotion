import { motion } from "framer-motion";
import "./Contact.scss";

// Reusable cinematic animation variants
const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { staggerChildren: 0.12 } 
    }
};

export default function Contact() {
    return (
        <div className="contact-page" data-navbar-solid>
            <section className="contact" aria-labelledby="contact-title">
                <motion.div 
                    className="contact__container"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={staggerContainer}
                >
                    <motion.header className="contact__header" variants={fadeUpVariants}>
                        <h1 className="contact__title" id="contact-title">
                            Let's Connect
                        </h1>
                        <p className="contact__description">
                            Have a question, project in mind, or need more information? <br></br>
                            Fill out the form and our team will get back to you 
                            as soon as possible.
                        </p>
                    </motion.header>

                    <motion.form 
                        className="contact__form" 
                        variants={fadeUpVariants}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="contact__field">
                            <label htmlFor="name" className="contact__label">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                className="contact__input" 
                                placeholder="Your full name" 
                                required 
                            />
                        </div>

                        <div className="contact__field">
                            <label htmlFor="email" className="contact__label">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="contact__input" 
                                placeholder="Your email address" 
                                required 
                            />
                        </div>

                        <div className="contact__field">
                            <label htmlFor="phone" className="contact__label">Phone Number</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                className="contact__input" 
                                placeholder="Your phone number" 
                            />
                        </div>

                        <div className="contact__field">
                            <label htmlFor="message" className="contact__label">Message</label>
                            <textarea 
                                id="message" 
                                className="contact__input contact__textarea" 
                                placeholder="How can we help you?" 
                                rows="6" 
                                required
                            />
                        </div>

                        <button type="submit" className="contact__submit">
                            Submit
                        </button>
                    </motion.form>
                </motion.div>
            </section>
        </div>
    );
}