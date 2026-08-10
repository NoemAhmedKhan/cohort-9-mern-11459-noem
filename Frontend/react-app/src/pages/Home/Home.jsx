import Header from "../../components/Header/Header";
import About from "../../components/About/About";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <div id="home">
      <Header />
      <main>
        <About />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
