import React from "react";
import "./Lists.css";
import { useEffect, useState } from "react";
import { instance } from "../../../api/axios";

function Lists(props) {
  const handleDelete = async (id) => {
    // delete the list item from the database

    try {
      props.setLists(props.lists.filter((list) => list._id !== id));
      await instance.delete("/api/task/delete", {
        data: { _id: id },
        headers: {
          ContentType: "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
    props.setUpdate(!props.update);
  };

  return (
    <div className="list-container overflow-auto">
      <ul className="list-group text-bg-dark ">
        {props.lists.length > 0 ? (
          props.lists
            .slice(0)
            .reverse()
            .map((list) => (
              <li
                key={list._id}
                className="list-group-item text-bg-dark d-flex justify-content-between align-items-center"
              >
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  onChange={() => {
                    handleDelete(list._id);
                  }}
                />

                {list.task}
              </li>
            ))
        ) : (
          <h1 className="text-center">No Tasks</h1>
        )}
      </ul>
    </div>
  );
}

export default Lists;
