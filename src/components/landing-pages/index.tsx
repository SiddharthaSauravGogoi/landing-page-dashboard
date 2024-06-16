"use client";

import { usePages } from "@/store";
import Link from "next/link";
import { FaEye, FaTrash } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";

const AllPages = () => {
  const pages = usePages((state) => state.data);
  const setPages = usePages((state) => state.setPages);

  const handlePageDelete = (page: string) => {
    const { [page]: _, ...restOfThePages } = pages;
    setPages(restOfThePages);
  };

  return (
    <div className="w-full">
      <h1 className="mb-4"> All Landing Pages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[10px]">
        {Object.keys(pages).map((page: string) => (
          <div key={page}>
            <div className="bg-gray-100 p-4 rounded-[5px] font-bold">
              {page}
            </div>
            <div className="py-2 flex gap-[8px]">
              <Link href={`landing-pages/${page}`}>
                <button className="py-2 px-4 bg-gray-100 rounded-[5px]">
                  <FaEye />
                </button>
              </Link>
              <Link href={`landing-pages/${page}?edit=true`}>
                <button className="py-2 px-4 bg-gray-100 rounded-[5px]">
                  <TiEdit />
                </button>
              </Link>
              <button
                className="py-2 px-4 bg-gray-100 rounded-[5px]"
                data-id="delete"
                onClick={() => handlePageDelete(page)}
                // @todo event delegation
              >
                <FaTrash data-id="delete" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {Object.keys(pages).length === 0 && (
        <div className="bg-gray-300 text-xs px-2 py-4">
          {" "}
          You have no landing pages. Create a few and get started.
        </div>
      )}
    </div>
  );
};

export default AllPages;
