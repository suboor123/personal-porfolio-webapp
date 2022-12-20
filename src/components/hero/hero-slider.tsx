// Import styles
import "./styles.css";

import { useSelector } from "react-redux";
import { profileSelector, tagSelector } from "src/redux/selectors";

const HeroSlider = () => {
  const tagModels = useSelector(tagSelector);
  const { userProfileModel } = useSelector(profileSelector);
  const { coverImageUrl } = userProfileModel?.pluckAll();

  const renderList = () => {
    return (tagModels || []).map((pm, i) => (
      <li className="marq-li" key={i + "marque"}>
        <img className="tag-img-slider" src={pm.imageUrl}></img> {pm.name}
      </li>
    ));
  };

  return (
    <div className="bg-gradient">
      <div className="bg-gradient-inr" style={{}}>
        <marquee className="marq1" amount={2} direction="left">
          <ul className="marq-ul">{renderList()}</ul>
        </marquee>
        <marquee className="marq2" amount={2} direction="right">
          <ul className="marq-ul">{renderList()}</ul>
        </marquee>
      </div>
    </div>
  );
};

export default HeroSlider;
