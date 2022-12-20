import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { Container } from "rsuite";
import NotFound from "src/components/404";
import Figure from "src/components/figure";
import Pagination from "src/components/pagination";
import { Session } from "src/core/models/sessions/types";
import {
  selectPastSessions,
  selectUpcomingSessions,
} from "src/redux/selectors";
import { fetchSessions } from "src/redux/slices/session";
import { useAppDispatch } from "src/redux/store";
import SessionCard from "./session-card";
import SessionFilter from "./session-filter";

const Sessions = () => {
  const dispatch = useAppDispatch();
  const upcomingSessions = useSelector(selectUpcomingSessions);
  const pastSessions = useSelector(selectPastSessions);
  const { type } = useParams();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<"upcoming" | "past">(
    (type as "upcoming" | "past") || "upcoming"
  );
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const handleSelectFilter = (type: "upcoming" | "past") => {
    dispatch(fetchSessions());
    setSelectedType(type);
    setCurrentPage(1);
    navigate('/live-sessions/' + type)
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentSessions = sessions.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scroll(0, 0)
  }

  useEffect(() => {
    dispatch(fetchSessions() as any);
  }, [dispatch]);

  useEffect(() => {
    if (selectedType === "past") {
      setSessions(pastSessions);
    } else {
      setSessions(upcomingSessions);
    }
  }, [selectedType]);

  const renderSession = useMemo(() => {
    return (currentSessions || []).map((session) => (
      <SessionCard session={session} key={session.id} />
    ));
  }, [sessions.length, selectedType, dispatch, currentSessions, sessions]);

  useEffect(() => {
    if (selectedType === "past") {
      setSessions(pastSessions);
    } else {
      setSessions(upcomingSessions);
    }
  }, [upcomingSessions.length, pastSessions.length]);

  const renderNothingHere = () => {
    return <NotFound text="No LIVE Session is scheduled!" />;
  };

  return (
    <Container className="mt-0 activity-main-dark">
      <Figure
        heading={"LIVE Sessions"}
        withText="I believe in that the best way to practice something is to teach it to others"
      >
        <div className="row row-activity">
          <div className="col-lg-8 col-box-otr">
            <div className="col-box-inr">
              {sessions.length ? (
                <>
                  {renderSession}
                  <Pagination
                    recordsPerPage={postsPerPage}
                    totalRecords={sessions.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </>
              ) : (
                renderNothingHere()
              )}
            </div>
          </div>
          <SessionFilter
            selectFilter={handleSelectFilter}
            selectedFilter={selectedType}
          />
        </div>
      </Figure>
    </Container>
  );
};

export default Sessions;
