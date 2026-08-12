import "./About.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="row align-items-center gy-5">

          <div className="col">
            <h1 className="about-title">Note Taker</h1>
            <p className="about-tagline">
              Capture, Organize, and Keep your notes secure - all in one place.
            </p>
            <p className="about-description">
              Note Taker is a full-stack note management app that helps you capture, organize, and manage your thoughts effortlessly.
              Create your account, write notes with a rich text editor, and keep your ideas at one place with secure database storage.
            </p>
            <Link to="/signup" className="link">
              <button type="button" className="btn btn-outline-dark mt-4">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
