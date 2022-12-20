import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Card from "src/components/card";
import Figure from "src/components/figure";
import { selectProjectByLimit } from "src/redux/selectors";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsTv } from "react-icons/bs";
import ProjectDrawer from "../projects/project-drawer";
import { Link } from "react-router-dom";

const ProjectSlider: React.FC = () => {
  const projects = useSelector(selectProjectByLimit(6));
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);

  const handleShowAllProjects = () => setShowAllProjects(true);
  const handleHideAllProjects = () => setShowAllProjects(false);

  const renderProjects = useMemo(() => {
    return projects.map((project) => (
      <SwiperSlide key={project.id + "pro"} className="mt-3">
        <Link to={`/project/${project.id}`}>
        <Card
          heading={project.name}
          imageUrl={project.imageUrl}
          description={project.description}
          date={project.createdAt}
          views={project.views || 0}
          tags={project.tags.map((tag: any) => tag.name)}
        /></Link>
      </SwiperSlide>
    ));
  }, [projects.length]);

  return (
    <>
      <Figure
        hasDot={false}
        heading={"My Work"}
        withIcon={<BsTv />}
        onViewAllClick={handleShowAllProjects}
      >
        <Swiper
          className="letest-blog-dark"
          slidesPerView={1}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          spaceBetween={30}
        >
          {renderProjects}
          
        </Swiper>
      </Figure>

      <ProjectDrawer
        show={showAllProjects}
        handleClose={handleHideAllProjects}
      />
    </>
  );
};

export default ProjectSlider;
