"use client";

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons";

export default function Pagination(props) {
  const pageSizing = [25, 50, 100, 200, 500];
  let array = [];
  useEffect(() => {}, []);

  const next = async () => {
    props.nextPage();
  };
  const prev = () => {
    props.prevPage();
  };

  const getPage = () => {
    array = [];
    let i = 1;

    while (i <= props.page.totalPages) {
      if (
        i <= 3 ||
        i >= props.page.totalPages - 2 ||
        (i >= props.page.currentPage - 1 && i <= props.page.currentPage + 1)
      ) {
        array.push(i);
        i++;
      } else {
        array.push("...");

        i =
          i < props.page.currentPage
            ? props.page.currentPage - 1
            : props.page.totalPages - 2;
      }
    }
    return array;
  };

  return (
    <div>
      <div className=" m-4 text-center">
        <div className=" p-2">
          <select
            className="w-[150px] text-center rounded-lg"
            placeholder="select the limit"
            onChange={(e) => {
              props.changeLimit(e.target.value);
            }}
          >
            <option className="w-50">{props.pageLimit}</option>
            {pageSizing.map((pageNo) => {
              return (
                <>
                  {props.pageLimit.toString() !== pageNo.toString() ? (
                    <option
                      key={pageNo}
                      className={`btn btn-outline-primary w-50  `}
                    >
                      {pageNo}
                    </option>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </select>
        </div>

        <div className="flex justify-center">
          <button
            className="border border-solid border-blue-500 m-2 px-3 py-2 rounded-full text-[#0d6efd] hover:text-white hover:bg-[#0d6efd]  transition-all"
            disabled={props.pageNumber === 1 ? true : false}
            onClick={prev}
          >
            <FontAwesomeIcon icon={faLessThan} />
          </button>

          <div className="max-w-[800px] m-2 flex flex-wrap items-center justify-center">
            {getPage().map((pageNo) => {
              return pageNo === "..." ? (
                <button
                  key={pageNo}
                  className={`border border-solid border-blue-500 hover:bg-[#0d6efd] hover:text-white transition-all px-3 py-2 rounded-full ${
                    props.pageNumber === pageNo ? "selectPage" : ""
                  } `}
                  // onClick={() => {
                  //   props.changePage(pageNo);
                  // }}
                  disabled
                >
                  {pageNo}
                </button>
              ) : (
                <button
                  key={pageNo}
                  className={`border border-solid border-blue-500 hover:bg-[#0d6efd] hover:text-white transition-all px-3 py-2 rounded-full ${
                    props.pageNumber === pageNo ? "selectPage" : ""
                  } `}
                  onClick={() => {
                    props.changePage(pageNo);
                  }}
                >
                  {pageNo}
                </button>
              );
            })}
          </div>

          <button
            className="border border-solid border-blue-500 m-2 px-3 py-2 rounded-full text-[#0d6efd] hover:text-white hover:bg-[#0d6efd]  transition-all"
            disabled={
              props.page.totalPages === props.pageNumber ||
              props.page["totaPages"] === props.pageNumber
                ? true
                : false
            }
            onClick={next}
          >
            <FontAwesomeIcon icon={faGreaterThan} />
          </button>
        </div>
      </div>
    </div>
  );
}
