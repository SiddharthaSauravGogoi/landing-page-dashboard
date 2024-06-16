"use client";

import { FC } from "react";
import cn from "classnames";
import Editor from "../editor";
import InfoBar from "../info-bar";
import { useSearchParams } from "next/navigation";
import { usePages } from "@/store";
import { CustomComponentTypes } from "@/types";

interface Props {
  title: string;
  component: string;
}

const GenericComponent: FC<Props> = ({ title, component }) => {
  const searchParams = useSearchParams();

  const pageData = usePages((state) => state.getPageData(title));
  const setComponentView = usePages((state) => state.setComponentView);
  const setComponentPlacement = usePages(
    (state) => state.setComponentPlacement
  );
  const text = usePages(
    (state) => state.getComponentText(title, component) || ""
  );
  const imgSrc = usePages((state) => state.getImageSrc(title, component) || "");
  const isImageComponent =
    pageData.view?.[component]?.type === CustomComponentTypes.Image;

  const params = searchParams.get("edit");
  const isEditable = !!params;

  const removeComponent = () => {
    const { [component]: _, ...view } = pageData.view;
    const newPlacement = pageData.placement.filter((x) => x !== component);
    setComponentView(title, view);
    setComponentPlacement(title, newPlacement);
  };

  function createMarkup() {
    return {
      __html: isImageComponent ? imgSrc : text,
    };
  }

  const wrapperStyles = "flex justify-between p-4 w-full";
  const wrapper = cn(wrapperStyles, {
    "mb-6 bg-gray-300": isEditable,
    "bg-blue-100": !isEditable,
  });

  const isValidPage = !!pageData;

  if (!isValidPage) return null;

  const isComponentVisible = !!pageData.view?.[component] || "";
  if (!isComponentVisible) return null;

  const value = isImageComponent ? imgSrc : text;
  if (isImageComponent && imgSrc === "" && !isEditable) return null;

  return (
    <section className={wrapper}>
      {isEditable ? (
        <>
          <div className="flex flex-col w-full">
            <InfoBar
              componentName={component}
              pageData={pageData}
              removeComponent={removeComponent}
            />
            <Editor
              title={title}
              value={value}
              component={component}
              type={pageData.view?.[component]?.type}
            />
          </div>
          <hr />
        </>
      ) : (
        <div dangerouslySetInnerHTML={createMarkup()} />
      )}
    </section>
  );
};

export default GenericComponent;
