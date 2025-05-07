import "./App.css";
import Header from "./components/templates/header/Header";
import Footer from "./components/templates/footer/Footer";
import { Provider } from "react-redux";
import store from "./app/store";
import RouteComp from "./route";
import DataProvider from "./contexts/ContextData";
import AuthProvider from "./contexts/AuthContext";
import StaticDataProvider from "./contexts/StaticDataContext";
import Navbar from "./components/templates/navbar/Navbar";

function App() {
  return (
    <Provider store={store}>
      <DataProvider>
        <StaticDataProvider>
          <AuthProvider>
            <Header />
            <Navbar />
            <RouteComp />
            <Footer />
          </AuthProvider>
        </StaticDataProvider>
      </DataProvider>
    </Provider>
  );
}

export default App;
