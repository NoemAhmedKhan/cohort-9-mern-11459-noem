import "./Features.css";

const features = [
  {
    icon: "fa-solid fa-shield-halved",
    title: "Secure sign-in",
    description:
      "Create an account and keep your notes private and control your content. No one else can read, edit, or delete them.",
  },
  {
    icon: "fa-solid fa-pen-nib",
    title: "Rich text editing",
    description:
      "Write notes the way you think with headings, lists, and formatting options instead of a plain textbox.",
  },
  {
    icon: "fa-solid fa-bolt",
    title: "Real-time sync",
    description:
      "Changes appear instantly with real-time updates powered by Socket.IO, keeping your notes always up to date.",
  },
  {
    icon: "fa-solid fa-magnifying-glass",
    title: "Search & filter",
    description:
      "Find the one note you need in seconds, even with hundreds saved, using fast search and filtering.",
  },
  {
    icon: "fa-solid fa-file-export",
    title: "Export & import",
    description:
      "Easily back up your notes or bring existing ones with flexible import and export options - your data stays in your control.",
  },
  {
    icon: "fa-solid fa-database",
    title: "Built to last",
    description:
      "A logged, tested backend with graceful error handling means your notes are backed by infrastructure you can trust.",
  },
];

function Features() {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="text-center features-heading">
          <p className="about-eyebrow-center">What you get</p>
          <h2 className="features-title">Everything you need to manage your notes</h2>
          <p className="features-subtitle">
            A simple and user-friendly dashboard with essential components to create, organize, and find your notes effortlessly.
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-md-6 col-lg-4" key={feature.title}>
              <div className="feature-card h-100">
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
