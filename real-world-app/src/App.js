import Router from "router";
import "./App.css";
import Footer from "./layouts/footer/Footer";
import Header from "./layouts/header/Header";
import Home from "./pages/home/Home";
import { useStore } from "./store";

function App() {
  const [state, dispatch] = useStore();
  console.log("state", state);
  return (
    <div className="App">
      <Header />
      <Router />
      {/* {/* <Home /> */}
      <Footer />
    </div>
  );
}

export default App;
