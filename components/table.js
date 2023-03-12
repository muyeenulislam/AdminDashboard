"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";

import Pagination from "./pagination";

function TableElement(props) {
  const { columns, data, rowSelection, onRow, width } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const pages = props.page?.pages;

  useEffect(() => {
    setPageSize(props.page.pageSize);
  }, [props]);

  const getData = (current, pageSize) => {
    return props.data;
  };

  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return (
        <input type="button" className="ant_pagin_prev" value="Previous" />
      );
    }
    if (type === "next") {
      return <input type="button" className="ant_pagin_prev" value="Next" />;
    }
    return originalElement;
  }

  return (
    <React.Fragment>
      <Table
        rowKey={props.id}
        columns={columns}
        dataSource={getData(current, pageSize)}
        rowSelection={rowSelection}
        onRow={onRow}
        pagination={false}
        scroll={{
          x: width,
          y: 550,
        }}
      />

      {props.pagination === true ? (
        <Pagination
          prevPage={props.prevPage}
          pageNumber={props.pageNumber}
          nextPage={props.nextPage}
          changePage={props.changePage}
          changeLimit={props.changeLimit}
          pageLimit={props.pageLimit}
          page={props.page}
          pages={pages}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

export default TableElement;
