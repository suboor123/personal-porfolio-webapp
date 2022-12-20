import React, { useEffect, useMemo } from "react";
import {
  BsCardText,
  BsEye,
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import TechTag from "../tags";
import "./styles.css";
import Tooltip from "react-simple-tooltip";
import { Affix, Button } from "rsuite";
import KeyboardButton from "../button/keyboard-button";
import { useLocation } from "react-router-dom";
import useCopyToClipboard from "src/hooks/useCopy";
import Notification from "../notification";
import { Notify } from "src/core/lib/alert";

const paginateStyle: React.CSSProperties = {
  fontSize: "40px",
};

type DetailHeadProps = {
  imageUrl: string;
  views: number;
  tags: string[];
  name: string;
  url?: string;
  includePagination?: {
    enable: boolean;
    onNext: () => void;
    onPrev: () => void;
    onViewAll?: () => void;
  };
  children?: any;
  description?: string;
};

const DetailHead: React.FC<DetailHeadProps> = ({
  imageUrl,
  views,
  tags,
  url,
  includePagination,
  ...props
}) => {

  const location = useLocation();
  const [val, copy] = useCopyToClipboard();
  const currentUrl = 'https://suboorkhan.com/#' + location.pathname;

  const handleCopyUrl = () => {
    copy(currentUrl);
    Notify.success('Link copied to clipboard', 'Copied')
  }



  const renderShareIcons = () => (
    <div className="icons-div mt-5">
      <div className="icons-div-inr">
        <div className="heart-main icon-div">
          <a className="heart-otr lead text-light">
            <BsEye />
          </a>
          <p className="body-sb num">{views} Views</p>
        </div>
        <div className="icon-otr icon-share icon-div" onClick={handleCopyUrl}>
          <svg
            className="icon"
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 15a3 3 0 100-6 3 3 0 000 6zM16.5 21.75a3 3 0 100-6 3 3 0 000 6zM16.5 8.25a3 3 0 100-6 3 3 0 000 6zM13.976 6.872l-5.453 3.506M8.523 13.622l5.454 3.506"
              stroke="#999"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="icon-otr icon-div" onClick={() => {
          Notify.info('I am working on this feature, will be available soon...', 'In Progress')
        }}>
          <svg
            className="icon"
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.75 20.25V4.5M3.75 15.75c6-4.5 10.5 4.5 16.5 0V4.5c-6 4.5-10.5-4.5-16.5 0"
              stroke="#999"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {props.children}
    </div>
  );

  const renderPagination = () => {
    return (
      <Affix top={100}>
        <div className="row mb-5 text-center sticky-top">
          <div className="col">
            <Tooltip
              content={"Previous"}
              radius={5}
              zIndex={9}
              placement="left"
            >
              <BsFillArrowLeftCircleFill
                onClick={includePagination.onPrev}
                className="paginate-btn"
                style={paginateStyle}
              />
            </Tooltip>
          </div>
          <div className="col">
            {includePagination.onViewAll && (
              <div className="d-none d-md-block">
                <Button
                  appearance="primary"
                  size="lg"
                  onClick={includePagination.onViewAll}
                >
                  <BsCardText /> Select from list
                </Button>
              </div>
            )}
          </div>
          <div className="col">
            <Tooltip content={"Next"} radius={5} zIndex={9} placement="right">
              <BsFillArrowRightCircleFill
                onClick={includePagination.onNext}
                className="paginate-btn"
                style={paginateStyle}
              />
            </Tooltip>
          </div>
        </div>
      </Affix>
    );
  };

  return (
    <div className="hero-single-artwork-dark" id="detail-head">
      <div className="container-fluid">
        <div className="hero-inr p-0  mt-5">
          {includePagination && renderPagination()}
          <img
            className="img-fluid wid-75  d-block mx-auto bg-dark"
            style={{
              minHeight: "70vh",
              objectFit: "cover",
              borderRadius: "40px",
            }}
            src={imageUrl}
          />

          <div className="row mt-5">
            {url && (
              <div className="col-md-12 text-center">
                <Tooltip content={url} radius={5} zIndex={9}>
                  <a
                    className="btn text-white btn-primary btn-lg ml-3"
                    href={url}
                    target="_blank"
                  >
                    LIVE Demo
                  </a>
                </Tooltip>
              </div>
            )}
            <div className="col-12 mt-3">
              <h1 className="text-white text-center">{props.name}</h1>
              {props.description && (
                <p className="text-center text-white lead mt-1 mb-4 px-5">
                  {props.description}
                </p>
              )}
            </div>
            <div className="col-md-12 mt-2 text-center">
              <TechTag tags={tags}></TechTag>
            </div>
            <div className="col-12 mb-0">{renderShareIcons()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHead;
