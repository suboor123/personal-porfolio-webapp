import { useState } from "react";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async (text) => {
    console.log(navigator.clipboard);
    // Try to save to clipboard then save it in the state if worked
    try {
      const textField = document.createElement("textarea");
      textField.innerText = text;
      textField.style.opacity = "0";
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
      setCopiedText(text);
      return true;
    } catch (error) {
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}

export default useCopyToClipboard;
