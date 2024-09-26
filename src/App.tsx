import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "components/Header/Header";
import { Provider } from "react-redux";
import store from "app/store";
import Footer from "components/Footer/Footer";
const Dashboard = React.lazy(() => import("pages/Dashboard"));
const NoPage = React.lazy(() => import("pages/NoPage"));
const Contact = React.lazy(() => import("pages/Contact"));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Suspense fallback={<p>Loading...</p>}>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
            <Footer />
          </Router>
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
