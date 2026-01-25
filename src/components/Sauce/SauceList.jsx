import { sauceData } from "../../pages/SaucePage/SaucePage.data";
import SauceCard from "./SauceCard";
import styles from "./SauceList.module.scss"

const SauceList = () => {
    return (
        <div className={styles.sauceList}>
            {sauceData.map(s => (<SauceCard key={s.id} sauce={s}/>))}
        </div>
    )
}

export default SauceList;