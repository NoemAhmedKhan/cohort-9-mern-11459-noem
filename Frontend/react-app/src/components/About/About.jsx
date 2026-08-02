import "./About.css";

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
            <div className="mt-4">
              <a href="#" className="btn btn-brand-outline">
                Get Started
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
