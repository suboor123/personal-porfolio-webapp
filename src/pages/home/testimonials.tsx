import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Tag } from "rsuite";
import Figure from "src/components/figure";
import Jumbotron from "src/components/jumbotron";
import { handleTagColor } from "src/components/tags";
import { ResponseParser } from "src/core/lib/parsers/response-parser";
import Tooltip from "react-simple-tooltip";
import { BsStar, BsStarFill } from "react-icons/bs";
import GradientHeading from "src/components/heading/gradient-heading";
import Button from "src/components/button/user-button";

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showAllTestimonials, setShowAllTestimonials] =
    useState<boolean>(false);

  const handleShowAllTestimonials = () => setShowAllTestimonials(true);
  const handleHideAllTestimonials = () => setShowAllTestimonials(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("assets/reviews.json");
      const data = await res.json();
      const { reviews } = data;
      const parsed = new ResponseParser(reviews).parse();
      setTestimonials(parsed.filter((r) => r.allowed).slice(0, 8));
    })();
  }, []);

  const renderTag = (tag: string) => (
    <>
      <Tag color={handleTagColor()}>
        <p style={{ fontSize: "16px" }}>{tag}</p>
      </Tag>
    </>
  );

  const generateStars = (quanity: number) => {
    if (typeof quanity !== "number") return;
    const arr = [];
    for (let x = 0; x < quanity; x++) {
      arr.push(x);
    }
    return arr.map((a, i) => <BsStarFill className="text-warning" key={i} />);
  };

  const renderTestimonials = useMemo(() => {
    return (
      <div className="row mt-3">
        {testimonials.map((t, index) => (
          <div className="col-md-3 zoomer mb-5" key={index + 'test'}>
            <Jumbotron
              style={{
                height: "300px",
                overflow: "visible",
              }}
            >
              <div className="p-3">
                <div className="text-center h4 text-white  ">{t.name}</div>
                <div className="text-center">{renderTag(t.project)}</div>
                <hr />
                <div className="text-center lead">
                  {generateStars(t.rating || 0)}
                </div>
                <Tooltip content={t.comment} radius={5} zIndex={9}>
                  <p className="text-light mt-1 lead desc">{t.comment}</p>
                </Tooltip>
              </div>
            </Jumbotron>
          </div>
        ))}
      </div>
    );
  }, [testimonials]);

  return (
    <>
      <Figure
        heading={"What people say about me"}
        withIcon={<BsStar />}
        onViewAllClick={handleShowAllTestimonials}
      >
        <>{renderTestimonials}</>
      </Figure>
      <TestimonialDrawer
        show={showAllTestimonials}
        handleClose={handleHideAllTestimonials}
      />
    </>
  );
};

// TESTIMONIAL DRAWER
type TestimonialDrawerProps = {
  show: boolean;
  handleClose: () => void;
};

export const TestimonialDrawer: React.FC<TestimonialDrawerProps> = ({
  show,
  handleClose,
}) => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("assets/reviews.json");
      const data = await res.json();
      const { reviews } = data;
      const parsed = new ResponseParser(reviews).parse();
      setTestimonials(parsed.filter((r) => r.allowed));
    })();
  }, []);

  const renderTag = (tag: string) => (
    <>
      <Tag color={handleTagColor()}>
        <p style={{ fontSize: "16px" }}>{tag}</p>
      </Tag>
    </>
  );

  const generateStars = (quanity: number) => {
    if (typeof quanity !== "number") return;
    const arr = [];
    for (let x = 0; x < quanity; x++) {
      arr.push(x);
    }
    return arr.map((a, i) => <BsStarFill className="text-warning" key={i}/>);
  };

  const renderDrawerBody = useMemo(() => {
    return (
      <div className="row">
        {testimonials.map((t, i) => (
          <div className="col-md-4 mt-5 zoomer" key={i + 'p'}>
            <Jumbotron
              style={{
                height: "300px",
                overflow: "visible",
              }}
            >
              <div className="p-3">
                <div className="text-center h4 text-white  ">{t.name}</div>
                <div className="text-center">{renderTag(t.project)}</div>
                <hr />
                <div className="text-center lead">
                  {generateStars(t.rating || 0)}
                </div>
                <Tooltip content={t.comment} radius={5} zIndex={9}>
                  <p className="text-light mt-1 lead desc">{t.comment}</p>
                </Tooltip>
              </div>
            </Jumbotron>
          </div>
        ))}
      </div>
    )
  }, [testimonials])

  return (
    <Drawer open={show} onClose={handleClose} size="full" placement="bottom">
      <Drawer.Header>
        <Drawer.Title>
          <GradientHeading>All Reviews</GradientHeading>
        </Drawer.Title>
        <Drawer.Actions>
          <Button type="primary" onClick={handleClose}>
            Close
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>{renderDrawerBody}</Drawer.Body>
    </Drawer>
  );
};
