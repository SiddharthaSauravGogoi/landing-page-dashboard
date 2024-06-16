"use client";

import { useSearchParams } from "next/navigation";
import React, { FC } from "react";
import InfoBar from "../info-bar";
import Editor from "../editor";
import { usePages } from "@/store";
import cn from "classnames";

interface Props {
  title: string;
  component: string;
}

const ImageComponent: FC<Props> = ({ title, component }) => {
  console.log(component, "xyz");
  const pageData = usePages((state) => state.getPageData(title));
  const setComponentView = usePages((state) => state.setComponentView);
  const setComponentPlacement = usePages(
    (state) => state.setComponentPlacement
  );

  const img = usePages((state) => state.getImageSrc(title, component)) || "";
  const searchParams = useSearchParams();

  const removeComponent = () => {
    const { [component]: _, ...view } = pageData.view;
    const newPlacement = pageData.placement.filter((x) => x !== component);
    setComponentView(title, view);
    setComponentPlacement(title, newPlacement);
  };

  function createMarkup() {
    return { __html: img };
  }

  const params = searchParams.get("edit");
  const isEditable = !!params;

  if (img === "" && !isEditable) return null;

  const wrapperStyles = "flex justify-between p-4 w-full";
  const wrapper = cn(wrapperStyles, {
    "mb-6 bg-gray-100": isEditable,
    "bg-blue-100": !isEditable,
  });

  return (
    <div className={wrapper}>
      {isEditable ? (
        <div className="flex flex-col w-full">
          <InfoBar
            componentName={component}
            pageData={pageData}
            removeComponent={removeComponent}
          />
          <Editor
            title={title}
            value={img}
            component={component}
            type={pageData.view?.[component]?.type}
          />
        </div>
      ) : (
        <div dangerouslySetInnerHTML={createMarkup()} />
      )}
    </div>
  );
};

export default ImageComponent;
