import React from "react";
import { Timeline } from "rsuite";
import FilterFigure from "src/components/figure/filter-figure";
import { DiReact, DiAngularSimple, DiFirebase } from "react-icons/di";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FirebaseHelper } from "src/helpers/firebase-helpers";
import { GlobalHelpers } from "src/helpers/global-helpers";

const iconStyles = (size: number) => ({
  fontSize: size + "px",
});

const HowDidIMakeIt = () => {
  return (
    <FilterFigure
      heading={"How did I make it?"}
      onChooseTag={() => {}}
      selectedTag={""}
      tags={[
        "Core framework",
        "typescript",
        "Angular",
        "React",
        "Firebase",
        "CSS",
        "Sass",
        "Bootstrap",
        "HTML",
      ]}
    >
      <>
        <Timeline>
          <Timeline.Item>
            <div className="row">
              <div className="col-md-8">
                <h3 className="text-white">
                  <BsFillLightningChargeFill
                    style={iconStyles(25)}
                    className="text-warning"
                  />
                  Core framework
                </h3>

                <p className="lead">
                  I have created a typescipt based framework which work as an
                  interceptor between firebase and angular/react application and
                  manage the flow of data. It includes dozen of design patterns
                  to serialize/deserialize data. <br />
                  Core framework also have its own lifecycle methods `On` and
                  `Trigger` which help models to notify other models when
                  receiving or sending data.
                </p>
                <p className="lead">
                  It convert plain javascript response object to special model
                  classes which have inbuilt prototype methods which keeps the
                  complex stuff abstracted and help frontend application to
                  extract the data in useful form.
                </p>
              </div>
              <div className="col">
                <img
                  onClick={() => {
                    window.open("./assets/not.png");
                  }}
                  src="./assets/not.png"
                  alt=""
                  className="img-fluid d-block  rounded pointer "
                />
              </div>
            </div>
          </Timeline.Item>
          <hr />
          <Timeline.Item>
            <div className="row">
              <div className="col-md-8">
                <h3 className="text-white">
                  <DiAngularSimple
                    style={{ ...iconStyles(35), ...{ color: "#de3433" } }}
                  />{" "}
                  Angular + RxJS
                </h3>
                <p className="lead">
                  I choose Angular to make the admin panel of my website because
                  of angular's powerful form module and functionality which
                  makes really easy to handle the complex forms.
                </p>
                <p className="lead">
                  Of course I could use React JS with formik library but I like
                  the way angular reactive forms keep the code cleaner by making
                  custom validators and stuff.
                </p>
                <p className="lead">
                  I used Subjects from RxJS library as they work pretty well
                  with angular and also I was already using redux toolkit with
                  my react app so I choose RxJS for centeralized state
                  management.
                </p>
              </div>
              <div className="col">
                <img
                  src="./assets/admin.png"
                  alt=""
                  onClick={() => {
                    window.open("./assets/admin.png");
                  }}
                  className="img-fluid d-block  rounded pointer "
                />
              </div>
            </div>
          </Timeline.Item>
          <hr />
          <Timeline.Item>
            <div className="row">
              <div className="col-md-8">
                <h3 className="text-white">
                  <DiReact style={{ ...iconStyles(35), color: "#5ed3f2" }} />
                  React TS + Redux Toolkit
                </h3>
                <p className="lead">
                  Finally, for the main website I used React with typescript and
                  Redux toolkit for state management.
                  <br />
                  I love to write functional based component unlike in angular
                  where we have to write class based components. Also I can
                  decide the architecture of the application unlike in angular
                  we have to divide the application in form of components and
                  modules.
                  <br />
                  But yeah, indeed I hate to write `className` instead of class.
                </p>
              </div>
              <div className="col">
                <img
                  src="./assets/main.png"
                  alt=""
                  onClick={() => {
                    window.open("./assets/main.png");
                  }}
                  className="img-fluid d-block  rounded pointer "
                />
              </div>
            </div>
          </Timeline.Item>
          <hr />
          <Timeline.Item>
            <div className="row">
              <div className="col-md-8">
                <h3 className="text-white">
                  <DiFirebase style={{ ...iconStyles(35), color: "#f9cb48" }} />
                  Firebase
                </h3>
                <p className="lead">
                  For backend I choose firebase because of its powerful SDK and
                  realtime database support. I could write APIs by using node
                  with express but firebase make things really when it comes to
                  storing data. Firebase is one the best tool created by{" "}
                  <b>Google</b> I oftenly use it for my personal projects
                </p>
              </div>
              <div className="col">
                <img
                  src="./assets/fb.jpeg"
                  alt=""
                  onClick={() => {
                    window.open("./assets/fb.jpeg");
                  }}
                  className="img-fluid d-block  rounded pointer "
                />
              </div>
            </div>
          </Timeline.Item>
        </Timeline>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <h4 className="text-white">Download the source code</h4>
            <p className="lead mb-4 mt-2">
              Don't forget to change the firebase config
            </p>
            <pre>
              <code>code/config/firebase-config.ts</code>
            </pre>
          </div>
          <div className="col-12">
            <a
              href="https://firebasestorage.googleapis.com/v0/b/personal-36b0f.appspot.com/o/web-source%2Fadmin-source.zip?alt=media&token=4866b0ec-da90-483d-9dc1-4f5910a094ae"
              className="btn mb-3 border mr-5"
            >
              {" "}
              <DiAngularSimple
                style={{ ...iconStyles(35), ...{ color: "#de3433" } }}
              />{" "}
              Download Angular Project
            </a>
            <a
              href="https://firebasestorage.googleapis.com/v0/b/personal-36b0f.appspot.com/o/web-source%2Fapp-source.zip?alt=media&token=7f3d1594-6179-4f0b-bebd-5e433246420f"
              className="btn border mb-3 "
            >
              {" "}
              <DiReact
                style={{ ...iconStyles(35), ...{ color: "#5ed3f2" } }}
              />{" "}
              Download React Project
            </a>

            <a
              onClick={() => GlobalHelpers.openContactForm()}
              className="mt-4 lead text-primary"
            >
              Request for admin panel LIVE demo
            </a>
          </div>
        </div>
      </>
    </FilterFigure>
  );
};

export default HowDidIMakeIt;
