import { souceData } from "../../pages/SoucePage/SoucePage.data";
import SouceCard from "./SouceCard";
import styles from "./SouceList.module.scss"

const SouceList = () => {
    return (
        <div className={styles.souceList}>
            {souceData.map(s => (<SouceCard key={s.id} souce={s}/>))}
        </div>
    )
}

export default SouceList;