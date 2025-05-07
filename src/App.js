import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Provider } from "react-redux";
import store from "./app/store";
import RouteComp from "./route";
import DataProvider from "./contexts/ContextData";
import AuthProvider from "./contexts/AuthContext";
import StaticDataProvider from "./contexts/StaticDataContext";
import Navbar from "./components/navbar/Navbar";

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
