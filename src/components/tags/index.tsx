import React from "react";
import { TagGroup, Tag } from "rsuite";

type TagGroupProps = {
  tags: string[];
};

const tagColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "violet",
];

export const handleTagColor = (): any => {
  return tagColors[Math.floor(Math.random() * tagColors.length)];
};

const TechTag: React.FC<TagGroupProps> = ({ tags }) => {
  return (
    <TagGroup>
      {tags.map((tag, id) => (
        <Tag color={handleTagColor()} key={id}>
          <p className="lead">#{tag}</p>
        </Tag>
      ))}
    </TagGroup>
  );
};

export default TechTag;
