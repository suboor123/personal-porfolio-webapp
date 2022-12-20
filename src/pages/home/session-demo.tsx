import React, { useLayoutEffect, useState } from "react";
import { BsCollectionPlay, BsNewspaper, BsWhatsapp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Button from "src/components/button/user-button";
import Figure from "src/components/figure";
import { FirebaseHelper } from "src/helpers/firebase-helpers";

type VideoContent = {
  description: string;
  joinUrl: string;
  title: string;
  videoUrl: string;
};

const SessionDemo: React.FC<{}> = () => {
  const [content, setContent] = useState<undefined | VideoContent>(undefined);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const fetch = async () => {
      const c = await FirebaseHelper.fetchYoutubeVideoContent();
      setContent(c as unknown as VideoContent);
    };
    setTimeout(() => fetch(), 2000)
  }, []);

  const handleNavigation = () => {
    navigate(`/live-sessions`)
  };

  return (
    <Figure
      hasDot={false}
      heading={"Recent LIVE Session"}
      withIcon={<BsNewspaper />}
      onViewAllClick={handleNavigation}
    >
      {content && (
        <>
          <div className="p-3">
            <div className="row">
              <div className="col-md-4 mb-5">
                <h3
                  className="text-white h1"
                  style={{ fontWeight: 900 }}
                >
                  {content.title}
                </h3>
                <hr />
                <p className=" text-white h5 ">
                  {content.description}
                </p>
                <br />
                <div className="text-center mt-2">
                  <Button type="outline" onClick={() => {
                    window.location.href = content.joinUrl;
                  }}>
                    <div>
                      <span className="mr-2">
                        {" "}
                        <BsWhatsapp />
                      </span>
                      Join today
                    </div>
                  </Button>
                  <Button type="primary" routerLink="live-sessions">
                    <div className="mx-2">
                      <span className="mr-2 mx-3">
                        {" "}
                        <BsCollectionPlay />
                      </span>
                      View Sessions
                    </div>
                  </Button>

                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col">
                <iframe
                  width="100%"
                  height="500px"
                  src={content.videoUrl}
                ></iframe>
              </div>
            </div>
          </div>
        </>
      )}
    </Figure>
  );
};

export default SessionDemo;
