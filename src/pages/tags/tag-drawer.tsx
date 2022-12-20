import React from "react";
import { useSelector } from "react-redux";
import { Drawer, Tag as RsuiteTag } from "rsuite";
import Button from "src/components/button/user-button";
import GradientHeading from "src/components/heading/gradient-heading";
import Jumbotron from "src/components/jumbotron";
import { tagSelector } from "src/redux/selectors";
import { tagColorByLevel } from "./constants";
import Tooltip from "react-simple-tooltip";
import KeyboardButton from "src/components/button/keyboard-button";

type TagDrawerProps = {
  show: boolean;
  handleClose: () => void;
};

const TagDrawer: React.FC<TagDrawerProps> = ({ show, handleClose }) => {
  const tags = useSelector(tagSelector);

  const renderTag = (level) => {
    return (
      <>
        <RsuiteTag color={tagColorByLevel[level]} className="p-2">
          <p style={{ fontSize: "20px" }}>{level} Level</p>
        </RsuiteTag>
      </>
    );
  };

  const renderDrawerBody = () => {
    return (
      <div className="row">
        {tags.map((tag, i) => (
          <div className="col-md-12 mt-5 zoomer" key={i}>
            <Jumbotron
              style={{
                overflow: "visible",
              }}
            >
              <div className="row">
                <div className="col-md-5">
                  <img
                    src={tag.imageUrl}
                    style={{
                      height: "150px",
                      width: "150px",
                      objectFit: "contain",
                    }}
                    className="img-fluid mx-auto rounded"
                  />
                </div>
                <div className="col">
                  <div className="h3 text-white  ">{tag.name}</div>
                  <div className="">{renderTag(tag.level)}</div>
                  <Tooltip content={tag.description} radius={5} zIndex={9}>
                    <p className="mt-2 ellip-text ">{tag.description}</p>
                  </Tooltip>
                </div>
              </div>
            </Jumbotron>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Drawer open={show} onClose={handleClose} size="sm">
      <Drawer.Header>
        <Drawer.Title>
          <GradientHeading>My Skills</GradientHeading>
        </Drawer.Title>
        <Drawer.Actions>
          <KeyboardButton className="mt-2" onClick={handleClose}>
            esc
          </KeyboardButton>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>{renderDrawerBody()}</Drawer.Body>
    </Drawer>
  );
};

export default TagDrawer;
