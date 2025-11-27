import { useParams } from "react-router-dom";
import { souceData } from "./SoucePage.data";

const SoucePage = () => {
  const { id } = useParams();
};

const souce = souceData.find((el) => el.id === Number(id));

return (
  <div>
    <div>
      <img></img>
    </div>
    <div>
      <h2>{souce.title}</h2>
      <div>{souce.price}</div>
    </div>
  </div>
);
