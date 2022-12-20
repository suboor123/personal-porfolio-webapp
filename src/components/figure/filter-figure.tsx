import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { tagSelector } from "src/redux/selectors";
import GradientHeading from "../heading/gradient-heading";
import './styles.css'

type FilterFigureProps = {
  children: JSX.Element | JSX.Element[];
  heading: string;
  onChooseTag: (tag: string) => void;
  selectedTag: string;
  tags?: string[]
};

const FilterFigure: React.FC<FilterFigureProps> = ({ children, heading, onChooseTag, selectedTag, tags }) => {
  const renderTagOptions = useMemo(() => {
    return (tags || []).map((tag) => (
      <li className={"tab-link tab-2 " + `${selectedTag === tag ? 'active' : ''}`} key={tag} onClick={() => onChooseTag(tag)}>
        <p className="tab-p body-sb">#{tag}</p>
      </li>
    ));
  }, [tags.length, selectedTag]);

  return (
    <div className="explore-artwork-dark" id="filter-fig">
      <div className="container-fluid">
        <div className="explore-artwork-inr">
          <div className="heading-otr">
            <div className="head-otr">
              <GradientHeading>{heading}</GradientHeading>
            </div>
          </div>
          <div className="teb-main">
            <div className="tab-otr">
              <div className="tab-inr">
                <ul className="tabs">
                  <li className={"tab-link tab-1 " + `${selectedTag === '' ? 'active' : ''}`} onClick={() => onChooseTag('')}>
                    <p className="tab-p body-sb">All</p>
                  </li>
                  {renderTagOptions}
                </ul>
              </div>
         
            </div>
          </div>
          <span className="line" />
          <div className="row row-custom-main">
            <div className="col-lg-12 col-btn-otr">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterFigure;
