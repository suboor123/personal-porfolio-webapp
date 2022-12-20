import { BsCodeSlash, BsNewspaper } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  blogSelector,
  projectSelector,
  tagSelector,
} from "src/redux/selectors";
import { BiCategoryAlt } from "react-icons/bi";

const CompletedStuff = () => {
  const projects = useSelector(projectSelector);
  const {blogs} = useSelector(blogSelector);
  const skills = useSelector(tagSelector);

  return (
    <div className="auction-main">
      {/* <p className="body-mb acution text-center text-white h2">Auction Ending</p> */}
      <div id="clock" className="timer">
        <div className="hours-main main">
          <BiCategoryAlt className="h1" />
          <p className="heading-h3 time-inr">{projects.length} +</p>
          <p className="hours-p body-mb">Projects</p>
        </div>

        <div className="hours-main main ">
          <BsNewspaper className="h1" />
          <p className="heading-h3 time-inr">{blogs.length} +</p>
          <p className="hours-p body-mb">Blogs</p>
        </div>

        <div className="hours-main main ">
          <BsCodeSlash className="h1" />
          <p className="heading-h3 time-inr">{skills.length} +</p>
          <p className="hours-p body-mb">Skills</p>
        </div>
      </div>
    </div>
  );
};

export default CompletedStuff;
