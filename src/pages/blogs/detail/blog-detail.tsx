import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DetailBody from "src/components/detail/detail-body";
import DetailHead from "src/components/detail/detail-head";
import SideContent from "src/components/detail/side-content";
import { echo } from "src/core/lib/echo";
import { BlogModel } from "src/core/models/blogs";
import { Blog } from "src/core/models/blogs/types";
import { FirebaseHelper } from "src/helpers/firebase-helpers";
import { blogSelector, tagSelector } from "src/redux/selectors";
import { fetchBlogs } from "src/redux/slices/blogs";
import { DetailPlaceholder } from "../../../components/detail/placeholder";
import BlogDrawer from "../blog-drawer";

const BlogDetail = () => {
  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const tags = useSelector(tagSelector);
  const { blogs } = useSelector(blogSelector);
  const blogIds = blogs.map((blog) => blog.id);

  const [showBlogDrawer, setShowBlogDrawer] = useState<boolean>(false);
  const handleCloseDrawer = () => setShowBlogDrawer(false);
  const handleOpenDrawer = () => setShowBlogDrawer(true);

  const fetchBlog = async () => {
    const blog = await BlogModel.syncById(id);
    echo('blog', [blog])
    if (blog) {
      const blogDetail = blog.pluckAll();
      blogDetail.tags = (blogDetail.tags || []).map((tagId) => {
        return tags.find((tag) => tag.id === tagId);
      });
      setBlog(blogDetail);

      const firebaseHelper = new FirebaseHelper('blogs');
      firebaseHelper.increaseViews(id);
    }
  };

  useLayoutEffect(() => {
    setTimeout(() => fetchBlog(), 1000)
  }, [id]);

  useEffect(() => {
    dispatch(fetchBlogs() as any);
  }, []);

  const renderPlaceholder = (() => {
    return <DetailPlaceholder />;
  })();

  const handleNextClick = () => {
    setBlog(undefined);
    const index = blogIds.indexOf(id);
    let nextProjectId: string | undefined = undefined;
    if (index === blogIds.length - 1) {
      nextProjectId = blogIds[0];
    } else {
      nextProjectId = blogIds[index + 1];
    }
    navigate("/blog/" + nextProjectId);
  };

  const handlePrevlick = () => {
    setBlog(undefined);
    const index = blogIds.indexOf(id);
    let prevProjectId: string | undefined = undefined;
    if (index === 0) {
      prevProjectId = blogIds[blogIds.length - 1];
    } else {
      prevProjectId = blogIds[index - 1];
    }
    navigate("/blog/" + prevProjectId);
  };

  const renderBlogDetail = useMemo(() => {
    return (
      <React.Fragment>
        
        {blog && (
          <React.Fragment>
            <DetailHead
              includePagination={{
                enable: true,
                onNext: handleNextClick,
                onPrev: handlePrevlick,
                onViewAll: handleOpenDrawer,
              }}
              imageUrl={blog.imageUrl}
              views={blog.views}
              tags={blog.tags.map((tag) => tag.name)}
              name={blog.name}
            />
            <DetailBody
              imageUrl={blog.imageUrl}
              views={blog.views}
              tags={blog.tags.map((tag) => tag.name)}
              name={blog.name}
              content={blog.content}
            >
              <SideContent>
                <></>
              </SideContent>
            </DetailBody>
          </React.Fragment>
        )}
        <BlogDrawer
          show={showBlogDrawer}
          handleClose={handleCloseDrawer}
          selectedBlogId={id}
        />
      </React.Fragment>
    );
  }, [blog, showBlogDrawer, id]);

  return <>{blog ? renderBlogDetail : renderPlaceholder}</>;
};

export default BlogDetail;
