import ButtonGradient from "./assets/svg/ButtonGradient";
import About from "./components/About";
import Expertise from "./components/Expertise";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-5.25 overflow-hidden">
        <Header />
        <About />
        <Expertise />
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
