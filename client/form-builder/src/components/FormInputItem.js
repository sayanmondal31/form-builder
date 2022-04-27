import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { deleteFormInputAction } from "../store/app/form/form-action";

function FormInputItem({ inputTitle, inputType, id, onDelete, isAnswer }) {
  const dispatch = useDispatch();
  const [inputValidate, setinputValidate] = useState();
  const [errMsg, setErrMsg] = useState();

  const deleteHandler = () => {
    dispatch(deleteFormInputAction(id));
    onDelete();
  };

  const isEmail = (email) => {
    const re =
      // eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return (
    <div className="bg-white shadow-md mx-10 max-w-full p-2 rounded-lg cursor-pointer">
      {/* upper */}
      <div className="flex items-center justify-between">
        <div className="text-2xl text-teal-800 font-bold font-serif">
          {inputTitle}
        </div>
        {!isAnswer && (
          <TrashIcon className="h-5 w-5 text-red-500" onClick={deleteHandler} />
        )}
      </div>
      {/* middle */}
      <div className="grid gap-1 grid-cols-2 ">
        <div className="flex space-x-2 items-center">
          <div className="text-sm text-gray-600 font-serif ">Input type </div>
          <div className="text-lg font-serif ">{inputType}</div>
        </div>
      </div>
      {/* bottom */}
      <div className="flex justify-between px-2 items-center ">
        <div className="flex space-x-2 items-center py-2">
          {isAnswer && (
            <input
              type={inputType}
              value={inputValidate}
              className="focus:outline-none px-2 py-2 bg-slate-50 border shadow-md  rounded-lg"
              placeholder="your response here"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(FormInputItem);
