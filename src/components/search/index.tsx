import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  blogSelector,
  projectSelector,
  sessionSelector,
} from "src/redux/selectors";
import { SearchFilters, SearchItem } from "./types";
import "./styles.css";
import { Button, Modal, Tag } from "rsuite";
import NotFound from "../404";
import { useNavigate } from "react-router-dom";
import { GlobalHelpers } from "src/helpers/global-helpers";
import { fetchSessions } from "src/redux/slices/session";

type Props = {
  getCloserFunc?: (func: () => void) => void;
};

const Search = (props: Props) => {
  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    GlobalHelpers.closeSidebar();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //redux
  const projects = useSelector(projectSelector);
  const { blogs } = useSelector(blogSelector);
  const sessions = useSelector(sessionSelector);
  const dispatch = useDispatch();

  //input
  const [userInput, setUserInput] = useState("");
  const [allItems, setAllItems] = useState<SearchItem[]>([]);
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<SearchFilters[]>([
    "project",
    "blog",
    "session",
  ]);

  //navigate
  const navigate = useNavigate();

  const handleNavigation = (id: string, type: SearchItem["type"]) => {
    navigate(`/${type}/${id}`);
    handleClose();
  };

  useEffect(() => {
    const projectItems: SearchItem[] = projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      type: "project",
      imageUrl: project.imageUrl,
      views: project.views,
    }));

    const blogItems: SearchItem[] = blogs.map((blog) => ({
      id: blog.id,
      name: blog.name,
      description: blog.description,
      type: "blog",
      imageUrl: blog.imageUrl,
      views: blog.views,
    }));

    const sessionItems: SearchItem[] = (sessions.allSessions || []).map(
      (session) => ({
        id: session.id,
        name: session.name,
        description: session.description,
        type: "session",
        imageUrl: session.imageUrl,
        views: session.views,
      })
    );

    setAllItems([...projectItems, ...blogItems, ...sessionItems]);
  }, [projects, blogs, sessions]);

  const handleUserInput = (e) => {
    const input = e.target.value;
    setUserInput(input);
  };

  useEffect(() => {
    if (userInput && userInput !== "") {
      const res = allItems
        .filter((item) => selectedFilters.includes(item.type))
        .filter((obj) =>
          Object.values(obj).some((val) => {
            if (typeof val === "string") {
              const v = val.toLowerCase();
              const u = userInput.toLowerCase();
              return v.includes(u);
            }
          })
        );

      setSearchItems(res);
    } else {
      setSearchItems([]);
    }
  }, [userInput, selectedFilters]);

  useEffect(() => {
    dispatch(fetchSessions() as any);
  }, [dispatch, open]);

  const handleCheckboxChange = (
    isChecked: boolean,
    selectedFilter: SearchFilters
  ) => {
    if (!isChecked) {
      setSelectedFilters(selectedFilters.filter((f) => f !== selectedFilter));
    } else {
      setSelectedFilters([...selectedFilters, selectedFilter]);
    }
  };

  const getTagColor = (type: SearchFilters) => {
    switch(type) {
      case 'blog':
        return 'cyan';
      case 'project':
        return 'green';
      case 'session':
        return 'red'
    }
  }

  const renderSearchResults = () => {
    return (
      <div className="searchbox">
        {searchItems.length !== 0 && (
          <>
            <div className="text-primary mb-2">
              ({searchItems.length}) Result found
            </div>
          </>
        )}
        <ul>
          {searchItems.length > 0 ? (
            searchItems.map((item) => (
              <li onClick={() => handleNavigation(item.id, item.type)}>
                <div className="row">
                  <div className="col-md-4">
                    <img src={item.imageUrl} className="img-fluid" />
                  </div>
                  <div className="col">
                    <p className="lead tem1">{item.name}</p>
                    <Tag color={getTagColor(item.type)}>
                      {item.type.toUpperCase()}
                    </Tag>
                    <p className="tem">{item.description}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <>
              <NotFound
                text={
                  userInput === ""
                    ? "Type something to search"
                    : "No result found!"
                }
              />
            </>
          )}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="input-main">
        <input
          className="input"
          type="text"
          placeholder="Search"
          readOnly
          onClick={handleOpen}
        />

        <svg
          className="search-icon"
          width={18}
          height={18}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 15A7 7 0 108 1a7 7 0 000 14zM12.95 12.95L17 17"
            stroke="#999"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input
              className="input w-100 bg-dark text-white"
              type="text"
              placeholder="Search here..."
              value={userInput}
              onChange={handleUserInput}
            />
            <div className="d-flex mt-3 justify-content-around">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  defaultChecked={selectedFilters.includes("project")}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.checked, "project")
                  }
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Projects
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  defaultChecked={selectedFilters.includes("blog")}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.checked, "blog")
                  }
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Blogs
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  defaultChecked={selectedFilters.includes("session")}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.checked, "session")
                  }
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Session
                </label>
              </div>
            </div>
          </div>
          <hr />
          {renderSearchResults()}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Search;
