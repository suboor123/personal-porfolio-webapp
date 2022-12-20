import {
  BsCardText,
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Button, Container, Placeholder } from "rsuite";
import Skeleton from "react-loading-skeleton";

const paginateStyle: React.CSSProperties = {
  fontSize: "40px",
};

const colorProps = {
  baseColor: "#101010",
  highlightColor: "#1c1c1c",
};
const textPropsStyle: React.CSSProperties = {
  marginTop: "16px",
  height: "20px",
};

interface Props {
  withoutPagination?: boolean;
}

export const DetailPlaceholder = ({ withoutPagination }: Props) => {
  const renderTextPlaceholder = (
    <>
      <Skeleton width={500} {...colorProps} style={textPropsStyle} />
      <Skeleton width={400} {...colorProps} style={textPropsStyle} />
      <Skeleton width={550} {...colorProps} style={textPropsStyle} />
      <Skeleton width={300} {...colorProps} style={textPropsStyle} />
      <Skeleton width={200} {...colorProps} style={textPropsStyle} />
      <Skeleton width={100} {...colorProps} style={textPropsStyle} />
      <Skeleton width={600} {...colorProps} style={textPropsStyle} />
    </>
  );

  return (
    <div className="hero-single-artwork-dark" id="detail-head">
      <div className="container-fluid">
        <div className="hero-inr p-0  mt-5">
          {!withoutPagination && (
            <div className="row mb-5 text-center">
              <div className="col">
                <BsFillArrowLeftCircleFill
                  className="paginate-btn"
                  style={paginateStyle}
                />
              </div>
              <div className="col">
                <div className="d-none d-md-block">
                  <Button appearance="primary" size="lg">
                    <BsCardText /> Select from list
                  </Button>
                </div>
              </div>
              <div className="col">
                <BsFillArrowRightCircleFill
                  className="paginate-btn"
                  style={paginateStyle}
                />
              </div>
            </div>
          )}

          <Container>
            <Skeleton
              containerClassName="avatar-skeleton"
              className="mx-auto d-block"
              style={{ height: "80vh", width: "75%", borderRadius: "40px" }}
              {...colorProps}
            />
            <div className="row mt-5">
              <div className="col-md-6">
                {renderTextPlaceholder}
                {renderTextPlaceholder}
              </div>
              <div className="col-md-6">
                <Skeleton
                  containerClassName="avatar-skeleton"
                  className="mx-auto d-block"
                  style={{ height: "20vh", width: "75%" }}
                  {...colorProps}
                />
                <div className="mt-4">
                  <Skeleton
                    containerClassName="avatar-skeleton"
                    className="mx-auto d-block"
                    style={{ height: "50vh", width: "75%" }}
                    {...colorProps}
                  />
                </div>
              </div>
            </div>
          </Container>

          {/* img */}
        </div>
      </div>
    </div>
  );
};
