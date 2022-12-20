import React, { useState } from "react";
import useCopyToClipboard from "src/hooks/useCopy";
import Tooltip from "react-simple-tooltip";
import { BsFillCheckCircleFill } from "react-icons/bs";

interface Props {
  text: string;
}

const CopyInput = (props: Props) => {
  const { text } = props;
  const [val, copy] = useCopyToClipboard();

  const [tooltipContent, setTooltipContent] = useState(<>Copy</>);

  const handleCopy = () => {
    copy(text);
    setTooltipContent(
      <>
        {" "}
        <BsFillCheckCircleFill
        className="mr-2"
          style={{ color: "teal"}}
        />
        Copied
      </>
    );
    setTimeout(() => {
      setTooltipContent(<>Copy</>);
    }, 2000);
  };

  return (
    <Tooltip content={tooltipContent}>
      <a className="address-main pointer " onClick={handleCopy}>
        <p className="address body-s w-75 mr-2  "  style={{ overflow: "hidden" }}>
          {text}
        </p>
        <svg
          className="copy-icon"
          width={18}
          height={18}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.636 12.636H15a2 2 0 002-2V3a2 2 0 00-2-2H7.364a2 2 0 00-2 2v2.364"
            stroke="#CFCFCF"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.636 5.364H3a2 2 0 00-2 2V15a2 2 0 002 2h7.636a2 2 0 002-2V7.364a2 2 0 00-2-2z"
            stroke="#CFCFCF"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </Tooltip>
  );
};

export default CopyInput;
