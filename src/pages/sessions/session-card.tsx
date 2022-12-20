import { format } from "date-fns";
import React, { useMemo } from "react";
import { BsArrowClockwise, BsAspectRatio, BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Tag } from "rsuite";
import TechTag from "src/components/tags";
import { SessionModel } from "src/core/models/sessions";
import { Session } from "src/core/models/sessions/types";
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
} from "src/helpers/constants";
import AttachedFileButton from "./attached-file-btn";
import SessionCountdown from "./session-countdown";
import Tooltip from "react-simple-tooltip";

type Props = {
  session: Session;
};

const imageStyle: React.CSSProperties = {
  height: "200px",
  width: "200px",
  objectFit: "contain",
};

const SessionCard: React.FC<Props> = ({ session }) => {
  const sessionModel = SessionModel.make(session);
  const isPastSession = sessionModel.isPastSession;
  const exposeUrl = sessionModel.canExposeStreamUrl;
  const sessionStartDate = session.date + " " + session.sessionTiming.start;
  const sessionEndDate = session.date + " " + session.sessionTiming.end;

  const renderDate = (
    <p className="text-white font-weight-bold body-s lead">
      <BsAspectRatio className="text-danger" />{" "}
      {isPastSession ? "Streamed" : "Streaming"} on{" "}
      {format(new Date(sessionStartDate), DEFAULT_DATE_FORMAT)} -{" "}
      {format(new Date(sessionEndDate), DEFAULT_TIME_FORMAT)} (IST)
    </p>
  );

  const renderSessionImage = (
    <div className="col-md-4">
      <img
        className="img mx-auto d-block"
        src={session.imageUrl}
        alt={session.name}
        style={imageStyle}
      />
    </div>
  );
  const renderTags = useMemo(() => {
    return <TechTag tags={session.tags.map((tag) => tag.name)}></TechTag>;
  }, [session]);

  return (
    <div className="box-1 box">
      <div className="row">
        {renderSessionImage}
        <div className="col">
          <div className="content-otr">
            <p className="head body-mb "> <span className="lead">{session.name} </span>
            <div className="float-right"><AttachedFileButton session={session} />
              <h6 className="d-inline">
              <Tooltip
              content={"View"}
              placement="top"
            >
              <Link to={`/session/${session.id}`} className="btn ml-2 p btn-success">
                <BsEye />
              </Link>
              </Tooltip>
              </h6>
            </div>
            </p>
            {!isPastSession && <SessionCountdown session={session} />}
            {isPastSession && (
              <div className="my-3">
                <Tag color="red">
                  <div className="lead">
                    <BsArrowClockwise /> Session Over
                  </div>
                </Tag>
              </div>
            )}
            <p className="linkk body-mb ellip-text-2">{session.description}</p>
            <hr />
            {renderTags}
            <br />
            {renderDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
