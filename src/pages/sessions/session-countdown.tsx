import React from "react";
import { useTimer } from "react-timer-hook";
import { Button, Tag, Badge } from "rsuite";
import { SessionModel } from "src/core/models/sessions";
import { Session } from "src/core/models/sessions/types";
import Tooltip from "react-simple-tooltip";
import { BsClockHistory, BsPlay } from "react-icons/bs";
import { FirebaseHelper } from "src/helpers/firebase-helpers";

type Props = {
  session: Session;
};

type TagColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "cyan"
  | "blue"
  | "violet";

const SessionCountdown: React.FC<Props> = ({ session }) => {
  const sessionModel = SessionModel.make(session);
  const isPastSession = sessionModel.isPastSession;
  const exposeUrl = sessionModel.canExposeStreamUrl;
  const sessionStartDate = session.date + " " + session.sessionTiming.start;
  const sessionEndDate = session.date + " " + session.sessionTiming.end;

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: new Date(sessionStartDate),
    onExpire: () => console.warn("onExpire called"),
  });

  const renderTime = () => {
    let rendered = "";
    if (days > 0) {
      rendered += `${days} day(s)`;
    }
    if (hours > 0) {
      rendered += ` ${hours} hour(s)`;
    }
    if (minutes > 0) {
      rendered += ` ${minutes} minute(s)`;
    }
    rendered += `  ${seconds} seconds`;
    return rendered;
  };

  const renderStreamUrl = () => {
    return minutes === 0 && seconds === 0 && hours === 0 && days === 0;
  };

  const getCountdownColor = (): TagColor => {
    if (hours === 0 && minutes === 0 && days === 0) {
      return "red";
    }
    return "blue";
  };

  return (
    <div>
      {!renderStreamUrl() && (
        <Tooltip content={renderTime()} radius={5} zIndex={9}>
          <div className="my-3">
            <Tag color={getCountdownColor()}>
              <p className="lead">
                <BsClockHistory /> {renderTime()}
              </p>
            </Tag>
          </div>
        </Tooltip>
      )}
      {renderStreamUrl() && <Tag color="green"><p><BsPlay /> Streaming LIVE</p></Tag>}
      {renderStreamUrl() && (
        <>
          <Tooltip content="Join LIVE stream" radius={5} zIndex={8}>
            <Badge className='ml-3'>
              <Button appearance="primary" onClick={() => {
                const firebaseHelper = new FirebaseHelper('sessions');
                firebaseHelper.increaseViews(session.id)
              }}>
                <a target="_blank" href={session.url}>
                  Join stream
                </a>
              </Button>
            </Badge>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default SessionCountdown;
