import ButtonGradient from "./assets/svg/ButtonGradient";
import About from "./components/About";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-5.25 overflow-hidden">
        <Header />
        <About />
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
