"use client";

import { FC } from "react";
import ImageComponent from "../image";
import TextBlock from "../text-block";
import { usePages } from "@/store";
import { CustomComponentTypes } from "@/types";

interface PageData {
  title: string;
  description: string;
  placement: string[];
  view: Record<string, any>;
}

interface Props {
  pageData?: PageData;
  title: string;
}

const CustomComponents: FC<Props> = ({ title }) => {
  const pageData = usePages((state) => state.getPageData(title));

  function renderComponents() {
    const isImageBlock = (widget: string) =>
      pageData?.view?.[widget]?.type === CustomComponentTypes.Image;
    const components = pageData?.placement.map((widget, indexx) => {
      console.log(widget, "widget", isImageBlock(widget));
      if (isImageBlock(widget)) {
        return <ImageComponent key={indexx} title={title} component={widget} />;
      }
      return <TextBlock title={title} key={indexx} component={widget} />;
    });
    return components;
  }

  const isValidPage = !!pageData;
  if (!isValidPage) return null;

  return <div>{renderComponents()}</div>;
};

export default CustomComponents;
