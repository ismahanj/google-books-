import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Save from "./pages/Save";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";


function App() {
  document.title = "Google Books Search";
  return (
    <Router>
      <div>
        <Navbar />
        <Wrapper>
          <Route exact path="/" component={Search} />
          <Route exact path="/Save" component={Save} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/NotFound" component={NotFound} />
        </Wrapper>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
