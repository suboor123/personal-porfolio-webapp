import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/home";
import { useSelector } from "react-redux";
import { fetchProfile } from "./redux/slices/profile";
import { useAppDispatch } from "./redux/store";
import {
  profileSelector,
  projectSelector,
  tagSelector,
} from "./redux/selectors";
import { fetchProjects } from "./redux/slices/project";
import { FirebaseSdk } from "./core/api";
import { fetchTags } from "./redux/slices/tags";
import { HashRouter, Route, Routes } from "react-router-dom";
import { fetchBlogs } from "./redux/slices/blogs";
import "react-loading-skeleton/dist/skeleton.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import About from "./pages/about";
import Projects from "./pages/projects";
import Blogs from "./pages/blogs";
import Sessions from "./pages/sessions";
import ProjectDetail from "./pages/projects/detail/project-detail";
import BlogDetail from "./pages/blogs/detail/blog-detail";
import { useScroll, useSpring, motion } from "framer-motion";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import InitialPlaceHolder from "./components/placeholder/initial-placeholder";
import { FirebaseHelper } from "./helpers/firebase-helpers";
import { echo } from "./core/lib/echo";
import HowDidIMakeIt from "./pages/tutorial";
import SessionDetail from "./pages/sessions/session-detail";

function App() {
  const dispatch = useAppDispatch();
  const { userProfileModel } = useSelector(profileSelector);
  const projectModels = useSelector(projectSelector);
  const tags = useSelector(tagSelector);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    echo("Suboor Khan", [
      "Hi there!",
      "welcome to my website",
      "I have created my own framework to create it",
      `isn't it cool?`,
    ]);
    FirebaseSdk.init();
    FirebaseHelper.createVisitor();
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(fetchTags());
      await dispatch(fetchProfile());
      await dispatch(fetchProjects());
      await dispatch(fetchBlogs());
    })();
  }, [dispatch]);

  const canRender = () => {
    return projectModels.length && userProfileModel && tags.length;
  };

  const render = (application: React.ReactNode) => {
    return canRender() ? application : <InitialPlaceHolder />;
  };

  return (
    <HashRouter>
      <React.Fragment>
        <motion.div className="progress-bar" style={{ scaleX }} />
        <Navbar />
        {render(
          <div style={{ minHeight: "90vh" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/live-sessions" element={<Sessions />} />
              <Route path="/live-sessions/:type" element={<Sessions />} />
              <Route path="/session/:id" element={<SessionDetail />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/how-did-i-make-it" element={<HowDidIMakeIt />} />
            </Routes>
          </div>
        )}
        <Footer />
      </React.Fragment>
    </HashRouter>
  );
}

export default App;
