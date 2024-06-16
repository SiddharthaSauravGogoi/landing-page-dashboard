"use client";

import { FC, useState } from "react";
import { toast } from "react-toastify";
import ToastNotification from "../toast-notif";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "next/navigation";
import { usePages } from "@/store";
import { CustomComponentTypes, View } from "@/types";
import Link from "next/link";

interface Props {
  title: string;
}

const ActionBar: FC<Props> = ({ title }) => {
  const searchParams = useSearchParams();
  const [selectedOption, setSelectedOption] = useState<Record<
    string,
    string
  > | null>(null);
  const [componentName, setComponentName] = useState("");
  const params = searchParams.get("edit");
  const isEditable = !!params;

  const pageData = usePages((state) => state.getPageData(title));
  const setComponentData = usePages((state) => state.setComponentData);
  const setPageStatus = usePages((state) => state.setPageStatus);

  const addComponent = () => {
    if (!selectedOption?.label || !componentName) {
      toast(`Please both fields`);
      return;
    }
    const components = Object.keys(pageData.view);
    for (let component of components) {
      if (pageData.view[component].name === componentName) {
        toast("Name already exists. Please select a different one");
        return;
      }
    }

    const componentKey = uuidv4();
    const isImageComponent =
      selectedOption?.label.toLowerCase() === CustomComponentTypes.Image;

    pageData.view[componentKey] = {
      type: isImageComponent
        ? CustomComponentTypes.Image
        : CustomComponentTypes.TextBlock,
      src: "",
      name: componentName,
      text: isImageComponent ? "" : "Lorem Ipsum Dolor sit Amet...",
    } as View;
    pageData.placement.push(componentKey);

    setComponentData(title, pageData.placement, pageData.view);
    toast(`${selectedOption?.label} component added`);
  };

  const handleComponentName = (name: string) => {
    setComponentName(name);
  };

  const options = [
    { value: CustomComponentTypes.Image, label: "Image" },
    { value: CustomComponentTypes.TextBlock, label: "Text Block" },
  ];

  if (!isEditable)
    return (
      <div className="flex w-full justify-between items-center bg-gray-100 p-2 mb-2">
        <h1>This page is {pageData?.isPublished ? "Live" : "In Draft"}</h1>
        <Link href="?edit=true">
          <button className="bg-yellow-200 px-6 py-2 rounded-[5px]">
            Edit
          </button>
        </Link>
      </div>
    );

  return (
    <>
      <div className="flex flex-col w-full bg-gray-300 p-4 mb-6">
        <div className="flex flex-col flex-wrap justify-between h-[64px] mb-4">
          <span>Title: {pageData?.title}</span>
          <span>Description: {pageData?.description}</span>
        </div>

        <hr className="mb-4 bg-gray-400 h-[10px] w-full" />

        <div className="flex flex-wrap justify-between mb-4">
          <span>
            Page Status:{" "}
            {pageData?.isPublished ? (
              <span className="bg-green-100 px-2 py-1">Live</span>
            ) : (
              <span className="bg-yellow-100 px-2 py-1">Draft</span>
            )}
          </span>
          <button
            className="bg-gray-600 px-4 py-2 h-max text-white font-medium rounded-[5px]"
            onClick={() => setPageStatus(title)}
          >
            Publish
          </button>
        </div>
        <div className="flex flex-wrap items-center mb-4">
          <input
            type="text"
            placeholder="Component Name"
            className="flex flex-wrap h-[38px] rounded-[4px] bg-white border-gray-300 border-solid border mr-6 p-4"
            value={componentName}
            onChange={(e) => handleComponentName(e.target.value)}
          />
          <Select
            defaultValue={selectedOption}
            // @ts-ignore
            onChange={setSelectedOption}
            options={options}
            className="mr-6"
          />
          <button
            onClick={addComponent}
            className="w-max text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm p-2 me-2 xs:mt-2"
          >
            Add New Component
          </button>
        </div>
        <Link href={`/landing-pages/${title}`}>
          <button className="w-max text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm p-2 me-2">
            Preview
          </button>
        </Link>
        <ToastNotification />
      </div>

      <div className="flex flex-wrap justify-between mb-4 text-xs w-max bg-gray-300 text-center flex items-center justify-center p-4 ">
        Select the exisiting text to update the text content
      </div>
    </>
  );
};

export default ActionBar;
