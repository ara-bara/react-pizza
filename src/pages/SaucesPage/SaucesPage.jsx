import Header from "../../components/Header/Header";
import SauceList from "../../components/Sauce/SauceList";
import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";

const SaucesPage = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="wrapper">
      <Header {...props} />

      <div className={props.cartOpen ? "blur" : ""}>
        <h2
          style={{
            textAlign: "center",
            color: "white",
            marginTop: "40px",
            marginBottom: "10px",
            fontSize: "34px",
            fontWeight: 700,
          }}
        >
          Соуси
        </h2>

        <SauceList />

        <Footer />
      </div>
    </div>
  );
};

export default SaucesPage;
