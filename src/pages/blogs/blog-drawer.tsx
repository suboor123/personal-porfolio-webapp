import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Drawer } from "rsuite";
import KeyboardButton from "src/components/button/keyboard-button";
import MotionCard from "src/components/card/motion-card";
import { blogSelector } from "src/redux/selectors";

type BlogDrawerProps = {
  show: boolean;
  handleClose: () => void;
  selectedBlogId?: string;
};

const BlogDrawer: React.FC<BlogDrawerProps> = ({
  show,
  handleClose,
  selectedBlogId,
}) => {
  const { blogs } = useSelector(blogSelector);

  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(`/blog/${id}`);
    handleClose();
  };

  const renderDrawerBody = useMemo(() => {
    return (
      <div className="row">
        {blogs
          .filter((blog) => blog.id === selectedBlogId)
          .concat(blogs.filter((blog) => blog.id !== selectedBlogId))
          .map((blog) => (
            <div
              key={blog.id}
              className="col-md-12 mt-5"
              onClick={() => handleNavigation(blog.id)}
            >
              <MotionCard
                heading={blog.name}
                imageUrl={blog.imageUrl}
                description={blog.description}
                views={blog.views}
                isActive={blog.id === selectedBlogId}
                tags={blog.tags.map((tag) => tag.name)}
              ></MotionCard>
            </div>
          ))}
      </div>
    );
  }, [blogs.length, selectedBlogId]);

  return (
    <Drawer open={show} onClose={handleClose} size="sm">
      <Drawer.Header>
        <Drawer.Title>
          <h3 className="text-white">Explore Blogs</h3>
        </Drawer.Title>
        <Drawer.Actions>
          <KeyboardButton className="mt-2" onClick={handleClose}>
            esc
          </KeyboardButton>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>{renderDrawerBody}</Drawer.Body>
    </Drawer>
  );
};

export default BlogDrawer;
