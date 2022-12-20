import React from "react";
import Skeleton from "react-loading-skeleton";

const paginateStyle: React.CSSProperties = {
  fontSize: "40px",
};

const colorProps = {
  baseColor: "#181818",
  highlightColor: "#1c1c1c",
};
const textPropsStyle: React.CSSProperties = {
  marginTop: "20px",
  height: "20px",
};

const InitialPlaceHolder = () => {
  const renderTextPlaceholder = (
    <>
      <Skeleton width={500} {...colorProps} style={textPropsStyle} />
      <Skeleton width={600} {...colorProps} style={textPropsStyle} />
      <Skeleton width={650} {...colorProps} style={textPropsStyle} />
      
      <Skeleton width={400} {...colorProps} style={textPropsStyle} />
      <Skeleton width={450} {...colorProps} style={textPropsStyle} />
      <Skeleton width={300} {...colorProps} style={textPropsStyle} />
      <Skeleton width={700} {...colorProps} style={textPropsStyle} />
      
      <Skeleton width={650} {...colorProps} style={textPropsStyle} />
      <Skeleton width={450} {...colorProps} style={textPropsStyle} />
      <Skeleton width={500} {...colorProps} style={textPropsStyle} />
      <Skeleton width={550} {...colorProps} style={textPropsStyle} />
      <Skeleton width={600} {...colorProps} style={textPropsStyle} />
      <Skeleton width={400} {...colorProps} style={textPropsStyle} />
      <Skeleton width={500} {...colorProps} style={textPropsStyle} />
    </>
  );

  const renderCardGrid = (
    <div className="row">
        <div className="col-md-4">
        <Skeleton
          containerClassName="avatar-skeleton"
          className="mx-auto d-block"
          style={{ height: "300px", width: "100%" }}
          {...colorProps}
        />
        </div>
        <div className="col-md-4">
        <Skeleton
          containerClassName="avatar-skeleton"
          className="mx-auto d-block"
          style={{ height: "300px", width: "100%" }}
          {...colorProps}
        />
        </div>
        <div className="col-md-4">
        <Skeleton
          containerClassName="avatar-skeleton"
          className="mx-auto d-block"
          style={{ height: "300px", width: "100%" }}
          {...colorProps}
        />
        </div>

    </div>
  )
  return (
   <div className="container-fluid">
     <div className="row">
      <div className="col-md-6">
        <div className="mt-5">
            <div className="mt-5">
            {renderTextPlaceholder}
            </div>
        </div>
      </div>
      <div className="col-md-6">
        <Skeleton
          containerClassName="avatar-skeleton"
          className="mx-auto d-block"
          style={{ height: "80vh", width: "75%" }}
          {...colorProps}
        />
      </div>
      <div className="col-12 mt-5">
        <div className="container-fluid">
        {renderCardGrid}
        {renderCardGrid}
        {renderCardGrid}
        </div>
      </div>
    </div>
   </div>
  );
};

export default InitialPlaceHolder;
