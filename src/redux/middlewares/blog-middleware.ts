import { Blog } from "src/core/models/blogs/types";
import { Tag } from "src/core/models/tags/types";
import store from "../store";

export class BlogMiddleware {
  public static attachTags = (projects: Blog[]) => {
    projects.forEach((project) => {
      const projectTagIds = project.tags as string[];
      const tags = store.getState().tags.tags;
      project.tags = tags.filter((tag) => projectTagIds.includes(tag.id));
    });
  };

  public static getBlogByTagName = (blogs: Blog[]) => {
    const tags = store.getState().tags.tags;
    const tagMap: Record<string, Blog[]> = {};
    tags.forEach((tag) => {
      tagMap[tag.name] = [];
    });

    blogs.forEach((blog) => {
      const blogTags = blog.tags as Tag[];
      Object.keys(tagMap).forEach((tagName: any) => {
        if (blogTags.find((tag) => tag.name === tagName)) {
          tagMap[tagName].push(blog);
        }
      });
    });

    return tagMap;
  };
}
