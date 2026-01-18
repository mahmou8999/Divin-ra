import "./App.css";
import NavBar from "./components/navbar&footer/NavBar";
import Section1 from "./components/section/Section1";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <div className="App ">
      <NavBar />
      <Section1 />
      {/* <Booking /> */}
      {/* <Register /> */}
      {/* <LogIn /> */}
    </div>
  );
}

export default App;
