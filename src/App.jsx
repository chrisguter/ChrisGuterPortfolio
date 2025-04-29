import ButtonGradient from "./assets/svg/ButtonGradient";
import Expertise from "./components/Expertise";
import Header from "./components/Header";
import RecentWork from "./components/RecentWork";
import Knowledge from "./components/Knowledge";
import Footer from "./components/Footer";
import Career from "./components/Career";
import Home from "./components/Home";
import About from "./components/About";
const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-5.25 overflow-hidden">
        <Header />
        <Home />
        <RecentWork />
        <Expertise />
        <Knowledge />
        <Career />
        <About />
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
