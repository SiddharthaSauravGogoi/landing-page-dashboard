"use client";

import { usePages } from "@/store";
import { CustomComponentTypes } from "@/types";
import { FC } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

interface Props {
  value: string;
  title: string;
  component: string;
  type: string;
}

const Editor: FC<Props> = ({ value, title, component, type }) => {
  const setText = usePages((state) => state.setComponentText);
  const setComponentImage = usePages((state) => state.setComponentImage);

  const isImageComponent = CustomComponentTypes.Image === type;
  const modules = {
    toolbar: {
      container: [
        [{ font: [] }, { size: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }],
      ],
    },
  };

  const imageModules = {
    toolbar: {
      container: [["image"]],
    },
  };

  const handleOnChange = (e: any) => {
    if (isImageComponent) setComponentImage(title, component, e);
    setText(title, component, e);
  };

  return (
    <div className="bg-gray-200">
      <ReactQuill
        theme={isImageComponent ? "snow" : "bubble"}
        value={value}
        onChange={(e) => handleOnChange(e)}
        modules={isImageComponent ? imageModules : modules}
      />
    </div>
  );
};

export default Editor;
