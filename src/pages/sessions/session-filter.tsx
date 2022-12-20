import React from "react";
import { GlobalHelpers } from "src/helpers/global-helpers";

type FilterType = 'upcoming' | 'past';

type Props ={
    selectFilter: (type: FilterType) => void;
    selectedFilter: FilterType
}

const SessionFilter = (props: Props) => {
    const {selectFilter, selectedFilter} = props;
  return (
    <div className="col-lg-4 filter-otr">
      <div className="filter-inr">
        <h4 className="head-filter heading-h4">Apply Filters</h4>
        <ul className="filter">
          <li className={"filter-btn btn-1 "}>
            <button className={`button filter-2 body-sb ${selectedFilter === 'upcoming' ? 'filter-active' : ''}`} onClick={() => selectFilter('upcoming')}>Upcoming</button>
          </li>
          <li className="filter-btn btn-2">
            <button className={`button filter-2 body-sb ${selectedFilter === 'past' ? 'filter-active' : ''}`} onClick={() => selectFilter('past')}>Past</button>
          </li>
        </ul>
        <a onClick={GlobalHelpers.openContactForm} className="lead pointer mt-5 text-primary">Request for a LIVE session</a>
      </div>
    </div>
  );
};

export default SessionFilter;
