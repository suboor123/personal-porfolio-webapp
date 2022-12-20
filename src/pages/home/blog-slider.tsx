import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Card from "src/components/card";
import Figure from "src/components/figure";
import { selectBlogsByLimit } from "src/redux/selectors";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsNewspaper } from "react-icons/bs";
import BlogDrawer from "../blogs/blog-drawer";
import { Link } from "react-router-dom";

const BlogSlider: React.FC = () => {
  const blogs = useSelector(selectBlogsByLimit(6));

  const [showAllBlogs, setShowAllBlogs] = useState<boolean>(false);

  const handleShowAllBlogs = () => setShowAllBlogs(true);
  const handleHideAllBlogs = () => setShowAllBlogs(false);

  const renderBlogs = useMemo(() => {
    return blogs.map((blog) => (
      <SwiperSlide key={blog.id + "pro"} className="mt-3">
        <Link to={`/blog/${blog.id}`}>
        <Card
          heading={blog.name}
          imageUrl={blog.imageUrl}
          description={blog.description}
          date={blog.createdAt}
          views={blog.views || 0}
          tags={blog.tags.map((tag: any) => tag.name)}
        />
        </Link>
      </SwiperSlide>
    ));
  }, [blogs.length]);

  return (
    <>
      <Figure
        hasDot={false}
        heading={"Recent Blogs"}
        withIcon={<BsNewspaper />}
        onViewAllClick={handleShowAllBlogs}
      >
        <Swiper
          className="letest-blog-dark"
          slidesPerView={1}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          autoplay={{
            delay: 7000,
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
          {renderBlogs}
          <div></div>
        </Swiper>
      </Figure>
      <BlogDrawer show={showAllBlogs} handleClose={handleHideAllBlogs} />
    </>
  );
};

export default BlogSlider;
