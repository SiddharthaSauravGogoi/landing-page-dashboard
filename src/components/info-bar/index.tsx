import { DashboardEntry } from "@/types";
import { FC } from "react";
import { FaTrash } from "react-icons/fa";

interface Props {
  componentName: string;
  pageData: DashboardEntry;
  removeComponent: () => void;
}

const InfoBar: FC<Props> = ({ componentName, pageData, removeComponent }) => {
  if (!pageData) return null;

  return (
    <div className="flex justify-between items-center">
      <h1 className="mb-4">{pageData?.view?.[componentName]?.name || ""}</h1>
      <button
        onClick={removeComponent}
        className="text-white bg-red-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm p-2 me-2 mb-2 "
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default InfoBar;
