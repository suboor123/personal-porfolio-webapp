import React, { useEffect } from "react";
import { BsArrowClockwise } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tag } from "rsuite";
import { SessionModel } from "src/core/models/sessions";
import SessionCard from "src/pages/sessions/session-card";
import SessionCountdown from "src/pages/sessions/session-countdown";
import { sessionSelector } from "src/redux/selectors";
import { fetchSessions } from "src/redux/slices/session";
import { useAppDispatch } from "src/redux/store";
import Jumbotron from "../jumbotron";
import TechTag from "../tags";
import SideContent from "./side-content";

type Props = {
  content: string;
  imageUrl: string;
  views: number;
  tags: string[];
  name: string;
  url?: string;
  children?: any;
};

const DetailBody = (props: Props) => {
  const { content, name, views, url, tags, children } = props;
  const { allSessions } = useSelector(sessionSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSessions());
  }, []);

  const renderSessionCard = () => {
    const sessions = (allSessions || []).slice(0, 6);
    return (sessions || []).map((session) => {
      const sessionModel = SessionModel.make(session);
      const { isPastSession } = sessionModel;
      return (
        <Link to={"/session/" + session.id}>
          <Jumbotron style={{ marginBottom: "20px" }}>
            <div className="row">
              <div className="col-md-3">
                <img
                  src={session.imageUrl}
                  className="img-fluid rounded side-session-img"
                  alt=""
                />
              </div>
              <div className="col">
                <p className="text-white lead">{session.name}</p>
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
              </div>
            </div>
          </Jumbotron>
        </Link>
      );
    });
  };
  return (
    <div className="artwork-body-dark">
      <div className="container-fluid">
        <div className="artwork-body-inr">
          <div className="row row-custom">
            <div className="col-lg-7 col-left-otr">
              <h1 className="text-white">{name}</h1>
              <hr />
              <div className="col-left-inr text-white lead">
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
              </div>
            </div>
            <SideContent>
              <>
                <h3 className="text-center mb-3">LIVE Sessions</h3>
                {renderSessionCard()}
              </>
            </SideContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBody;
