import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Tag } from "rsuite";
import { dateDiff } from "src/helpers/date-diff";
import TagDrawer from "src/pages/tags/tag-drawer";
import { profileSelector, tagSelector } from "src/redux/selectors";
import Button from "../button/user-button";
import TechTag, { handleTagColor } from "../tags";
import "./styles.css";
import Tooltip from "react-simple-tooltip";

const SkillHero = () => {
  const skills = useSelector(tagSelector);
  const { userProfileModel } = useSelector(profileSelector);
  const { companies, aboutMe } = userProfileModel.pluckAll();
  const lastCompanyJoiningDate = companies[0].from;

  const [showAllSKills, setShowAllSkills] = useState<boolean>(false);

  const handleShowAllSkills = () => setShowAllSkills(true);
  const handleCloseSKillDrawer = () => setShowAllSkills(false);

  const d = new Date();

  const renderTotalExp = useMemo(() => {
    const difference = dateDiff(d, new Date(lastCompanyJoiningDate));
    return difference;
  }, [lastCompanyJoiningDate]);

  const renderYearOfExp = useMemo(() => {
    const difference = dateDiff(new Date(), new Date(lastCompanyJoiningDate), {
      onlyYear: true,
    });
    return difference;
  }, [lastCompanyJoiningDate]);

  const renderFirstCol = useMemo(() => {
    const tags = skills.slice(0, 3);
    return tags.map((t, i) => (
      <div className="col-img-inr" key={i}>
        <Tooltip content={t.description} radius={5} zIndex={9}>
          <img
            className="about-img scaleImg img-fluid"
            src={t.imageUrl}
            alt="img"
          />
        </Tooltip>
      </div>
    ));
  }, [skills.length]);

  const renderSecondCol = useMemo(() => {
    const tags = skills.slice(3, 6);
    return tags.map((t, i) => (
      <div className="col-img-inr" key={i}>
        <Tooltip content={t.description} radius={5} zIndex={9}>
          <img
            className="about-img scaleImg img-fluid"
            src={t.imageUrl}
            alt="img"
          />
        </Tooltip>
      </div>
    ));
  }, [skills.length]);

  const renderThirdCol = useMemo(() => {
    const tags = skills.slice(6, 9);
    return tags.map((t, i) => (
      <div className="col-img-inr" key={i}>
        <Tooltip content={t.description} radius={5} zIndex={9}>
          <img
            className="about-img scaleImg img-fluid"
            src={t.imageUrl}
            alt="img"
          />
        </Tooltip>
      </div>
    ));
  }, [skills.length]);

  const renderMarquee = useMemo(
    () => (
      <marquee>
        <TechTag tags={skills.map((skill) => skill.name)} />
      </marquee>
    ),
    [skills.length]
  );

  const renderSkillDrawer = () => {
    return (
      <TagDrawer show={showAllSKills} handleClose={handleCloseSKillDrawer} />
    );
  };

  return (
    <div className="container-fluid">
      {renderMarquee}
      <div className="call-to-action" style={{overflow: 'hidden'}}>
        <div className="wrapper">
          <h2 className="heading-h2 heading">
            Experience of <br />
            {renderTotalExp}
          </h2>
          <p className="des text-white mt-3 body-m h3">
            Ceative designer and devloper with {renderYearOfExp}+ of experience,{" "}
            <br />
            worked on {skills.length}+ different tech stacks.
          </p>
          <div className="mt-4">
            <span className="mr-2">
              <a className="btn btn-primary" href="./assets/resume.pdf">Download Resume</a>
            </span>
          </div>
        </div>
        <div className="img-otr" onClick={handleShowAllSkills}>
          <div className="img-inr">{renderFirstCol}</div>
          <div className="img-inr">{renderSecondCol}</div>
          <div className="img-inr">{renderThirdCol}</div>
        </div>
      </div>
      {renderSkillDrawer()}
    </div>
  );
};

export default SkillHero;
