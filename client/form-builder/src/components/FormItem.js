import React from "react";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { deleteFormAction } from "../store/app/form/form-action";

function FormItem({ title, description, id, deleteHandler }) {
  const dispatch = useDispatch();
  return (
    <Link to={`${id}/create`}>
      <div className="bg-gray-50 flex justify-between hover:shadow-lg cursor-pointer shadow-sm h-min py-3 px-5 rounded-md ">
        <div className="">
          <div>{title}</div>
          <div>{description}</div>
        </div>
        <TrashIcon
          className="h-5 w-5 text-red-500"
          onClick={() => {
            dispatch(deleteFormAction(id));
            deleteHandler();
          }}
        />
      </div>
    </Link>
  );
}

export default React.memo(FormItem);
