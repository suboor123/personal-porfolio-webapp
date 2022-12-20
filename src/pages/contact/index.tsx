import React, { useMemo, useState, useEffect } from "react";
import { Drawer } from "rsuite";
import Button from "src/components/button/user-button";
import GradientHeading from "src/components/heading/gradient-heading";
import { motion, AnimatePresence } from "framer-motion";
import { checkErrors } from "./utils";
import Notification from "src/components/notification";
import { FirebaseHelper } from "src/helpers/firebase-helpers";

type ContactDrawerProps = {
  show: boolean;
  handleClose: () => void;
  selectedBlogId?: string;
};

type NotificationType = {
  title: string;
  description: string;
  type: "error" | "success";
};

const ContactDrawer: React.FC<ContactDrawerProps> = ({ show, handleClose }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = (
    title: string,
    description: string,
    type: "success" | "error"
  ) => {
    setNotifications((prev) => [
      ...prev,
      {
        title: title,
        description,
        type,
      },
    ]);
  };

  useEffect(() => {
    setNotifications([]);
  }, [show]);

  const renderDrawerBody = useMemo(() => {
    return (
      <div className="contact-main-dark p-0">
        <div className="container-fluid">
          <div className="row row-contact">
            <div className="col-lg-12 d-block mx-auto text-center col-message-otr">
              <div className="col-message-inr">
                <h3 className="head heading-h3">Drop a Message</h3>
                <p className="lead mb-3 body-m text-center">
                  Feel free to contact
                </p>
                <form className="form-main w-100 mt-5" method="post">
                  <div className="input-otr">
                    <input
                      className="input"
                      type="text"
                      name="fname"
                      placeholder="Your Full Name"
                      required
                      id="uname"
                    />
                  </div>
                  <div className="input-otr">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      required
                      id="uemail"
                    />
                  </div>

                  <div className="input-otr">
                    <textarea
                      className="textarea input"
                      name="message"
                      placeholder="Type your message"
                      required
                      defaultValue={""}
                      id="umessage"
                    />
                  </div>
                  <div className="action-otr"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  const isValid = (): boolean => {
    const name = (document.getElementById("uname") as any)?.value;
    const email = (document.getElementById("uemail") as any)?.value;
    const message = (document.getElementById("umessage") as any)?.value;

    const { hasErrors, errors } = checkErrors(name, email, message);

    if (hasErrors) {
      setTimeout(() => {
        addNotification(
          `${errors[0]} is invalid`,
          `Please type a valid ${errors[0]}`,
          "error"
        );
      }, 80);
      return false;
    }
    return true;
  };

  const handleSend = () => {
    if (isValid()) {
      const name = (document.getElementById("uname") as any)?.value;
      const email = (document.getElementById("uemail") as any)?.value;
      const message = (document.getElementById("umessage") as any)?.value;

      FirebaseHelper.sendMessage(name, email, message);
      addNotification(
        `Message sent successfully`,
        `Thanks for your interest, I will contact you soon!`,
        "success"
      );
      //reset form
      const name_: any = (document.getElementById("uname") as any);
      name_.value = "";
      const email_: any = (document.getElementById("uemail") as any);
      email_.value = "";
      const message_: any = (document.getElementById("umessage") as any);
      message_.value = "";
    }
  };

  return (
    <Drawer open={show} onClose={handleClose} size="full" placement="bottom">
      <Drawer.Header>
        <Drawer.Title>
          <div className="d-none d-md-block"><GradientHeading>Let's talk</GradientHeading></div>
        </Drawer.Title>
        <Drawer.Actions>
          <span className="mr-3">
            <Button type="primary" onClick={handleSend}>
              Send
            </Button>
          </span>
          <Button type="outline" onClick={handleClose}>
            Close
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body style={{padding: '10px'}} onClick={() => setNotifications([])}>
        {renderDrawerBody}
        <div
          className="notifiation-wrapper"
          onClick={() => setNotifications([])}
        >
          <AnimatePresence initial={false}>
            {notifications.map((notif, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              >
                <Notification
                  title={notif.title}
                  description={notif.description}
                  type={notif.type}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </div>
      </Drawer.Body>
    </Drawer>
  );
};

export default ContactDrawer;
