import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "src/components/card";
import FilterFigure from "src/components/figure/filter-figure";
import { Blog } from "src/core/models/blogs/types";
import { blogSelector, selectBlogByTagName } from "src/redux/selectors";
import { motion, Variants } from "framer-motion";
import { useAppDispatch } from "src/redux/store";
import { fetchBlogs } from "src/redux/slices/blogs";

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const Blogs = () => {
  const dispatch = useAppDispatch();
  const [selectedBlogs, setSelectedBlogs] = useState<Blog[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");

  const { blogs } = useSelector(blogSelector);
  const blogsBytagName = useSelector(selectBlogByTagName);

  useEffect(() => {
    setSelectedBlogs(blogs);
  }, [blogs.length]);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  const renderProjects = () => {
    return selectedBlogs.map((blog) => (
      <div className="col-md-4 mb-5" key={blog.id}>
        <Link to={`/blog/${blog.id}`}>
          <Card
            heading={blog.name}
            imageUrl={blog.imageUrl}
            description={blog.description}
            views={blog.views || 0}
            date={blog.createdAt}
            tags={blog.tags.map((tag) => tag.name)}
          ></Card>
        </Link>
      </div>
    ));
  };

  const handleSelectTag = (tagName: string) => {
    setSelectedTag(tagName);
    if (tagName === "") {
      setSelectedBlogs(blogs);
      return;
    }
    const blogByTag = blogsBytagName[tagName];
    setSelectedBlogs(blogByTag || []);
  };

  const getTags = useMemo(() => {
    return Object.keys(blogsBytagName).filter((t) => blogsBytagName[t].length);
  }, [blogsBytagName.length]);

  return (
    <>
      <FilterFigure
        heading={"Explore Blogs"}
        onChooseTag={handleSelectTag}
        selectedTag={selectedTag}
        tags={getTags}
      >
        <React.Fragment>
          <div className="row">{renderProjects()}</div>
        </React.Fragment>
      </FilterFigure>
    </>
  );
};

export default Blogs;