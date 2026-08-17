import "./Footer.css";
import logo from "../../assets/logo.png";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="container">

          <div className="container">
            <div className="row align-items-center justify-content-evenly">
              <div className="col-9 col-md-3 mt-2">
                <a href="#home" className="navbar-brand footer-logo-anchor">
                  <img src={logo} className="img-fluid w-25 mt-2 mb-2 rounded" alt="Note Taker Logo"/>
                </a>
                <p className="footer-text">
                  A secure, full-stack space to write, organize, and find your
                  notes whenever you need them.
                </p>
              </div>

              <div className="col-9 col-md-3 mt-5">
                <h3 className="footer-heading">Quick links</h3>
                <ul className="list-unstyled footer-text">
                  <li className="footer-nav-links"> <a className="text-decoration-none" href="#about">About</a></li>
                  <li className="footer-nav-links"> <a className="text-decoration-none" href="#features">Features</a></li>
                  <li className="footer-nav-links"> <a className="text-decoration-none" href="#contact">Contact</a></li>
                </ul>
              </div>

              <div className="col-9 col-md-3 mt-5">
                <h3 className="footer-heading">Get in touch</h3>
                <ul className="footer-text email list-unstyled">
                  <li>
                    <i className="fa-solid fa-envelope"></i>
                    <a href="mailto:noemahmedkhan8307@gmail.com">noemahmedkhan8307@gmail.com</a>
                  </li>
                </ul>
                <div className="d-flex justify-content-evenly footer-social">
                  <a href="https://github.com/NoemAhmedKhan" target="_blank" aria-label="Note Taker on GitHub">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/noem-ahmed-khan" target="_blank" aria-label="Note Taker on LinkedIn">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://wa.me/923452971536" target="_blank" aria-label="Note Taker on Whatsapp">
                    <i className="fa-brands fa-square-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="row align-items-center justify-content-center">
              <div className="col footer-bottom">
                <p>&copy; {year} Note Taker. All rights reserved.</p>
              </div>
            </div>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
