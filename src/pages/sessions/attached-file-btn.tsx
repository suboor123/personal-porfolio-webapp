import React from "react";
import { BsFileEarmarkZip } from "react-icons/bs";
import { Button, Modal, Placeholder } from "rsuite";
import { SessionModel } from "src/core/models/sessions";
import { Session } from "src/core/models/sessions/types";

type Props = {
  session: Session;
  size?: 'lg' | 'md' | 'sm'
};

const AttachedFileButton = (props: Props) => {
  const { session } = props;
  const sessionModel = SessionModel.make(session);
  const isPastSession = sessionModel.isPastSession;
  const hasFiles = session.attachedFiles && session.attachedFiles.length;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const canDisplay = () => {
    return isPastSession && hasFiles;
  };

  const renderAttachedFiles = () => {
    return session.attachedFiles.map((file) => (
      <div className="col-md-3 text-center" key={file.url}>
        <div className="border border-dark rounded p-3">
          <div className="text-center">
            <BsFileEarmarkZip style={{ fontSize: "30px" }} />
          </div>
          {file.name}
          <a
            href={file.url}
            download
            className={`btn btn-primary btn-${'sm'} rounded mt-3`}
          >
            Download
          </a>
        </div>
      </div>
    ));
  };

  const handleDownloadAll = () => {
    session.attachedFiles.forEach((file) => {
      window.open(file.url);
    });
  };

  return (
    <React.Fragment>
      {canDisplay() ? (
        <>
          <Button appearance="primary" onClick={handleOpen} size={props.size || 'md'} color="yellow">
            <BsFileEarmarkZip /> Attached Files ({session.attachedFiles.length})
          </Button>

          <Modal open={open} onClose={handleClose}>
            <Modal.Header>
              <Modal.Title>{session.name} attached files</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row my-5">{renderAttachedFiles()}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleDownloadAll} appearance="primary">
                Download All
              </Button>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default AttachedFileButton;
