import { sauceData } from "../../pages/SaucePage/SaucePage.data";
import SauceCard from "./SauceCard";
import styles from "./SauceList.module.scss";

const SauceList = (props) => {
  return (
    <div className={styles.sauceList}>
      {sauceData.map((sauce) => (
        <SauceCard key={sauce.id} sauce={sauce} {...props} />
      ))}
    </div>
  );
};

export default SauceList;
