import React, { useEffect, useLayoutEffect, useState } from "react";
import { BsArrowClockwise } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Tag } from "rsuite";
import DetailHead from "src/components/detail/detail-head";
import { DetailPlaceholder } from "src/components/detail/placeholder";
import { SessionModel } from "src/core/models/sessions";
import { Session } from "src/core/models/sessions/types";
import { FirebaseHelper } from "src/helpers/firebase-helpers";
import { tagSelector } from "src/redux/selectors";
import AttachedFileButton from "./attached-file-btn";
import SessionCountdown from "./session-countdown";

type Props = {};

const SessionDetail: React.FC<Props> = ({}) => {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [isPastSession, setIsPastSession] = useState<boolean>(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const tags = useSelector(tagSelector);

  const fetchSession = async () => {
    const session = await SessionModel.syncById(id);

    if (session) {
      const sessionDetail = session.pluckAll();
      sessionDetail.tags = (sessionDetail.tags || []).map((tagId) => {
        return tags.find((tag) => tag.id === tagId);
      });
      setSession(sessionDetail);
      setIsPastSession(SessionModel.make(sessionDetail).isPastSession);

      const firebaseHelper = new FirebaseHelper('sessions');
      firebaseHelper.increaseViews(id);
    }
  };

  const renderPlaceholder = (() => {
    return <DetailPlaceholder withoutPagination={true} />;
  })();

  useLayoutEffect(() => {
    setTimeout(() => fetchSession(), 1000)
  }, [id]);

  return (
    <React.Fragment>
      {session && (
        <>
          <DetailHead
            imageUrl={session.imageUrl}
            views={session.views}
            tags={session.tags.map((tag) => tag.name)}
            name={session.name}
            description={session.description}
          >
            <div className="text-center mt-5">
              {!isPastSession && <SessionCountdown session={session} />}
              {isPastSession && (
                <div className="my-3">
                  <Tag color="red">
                    <div className="lead">
                      <BsArrowClockwise /> Session Over
                    </div>
                  </Tag>
 
                  <div className="mt-5">
                    <p className="text-white mb-2 lead">Download the source file of the session</p>
                    <AttachedFileButton session={session} size="lg" />
                  </div>
                </div>
              )}
            </div>
          </DetailHead>
        </>
      )}
      {!session && renderPlaceholder}
    </React.Fragment>
  );
};

export default SessionDetail;
