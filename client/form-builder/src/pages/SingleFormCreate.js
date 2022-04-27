import React, { useEffect, useState } from "react";
import FormInputItem from "../components/FormInputItem";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  createFormInputAction,
  getSingleFormAction,
  updateFormAction,
} from "../store/app/form/form-action";
import { useParams } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/solid";

function SingleFormCreate() {
  const [showModal, setShowModal] = React.useState(false);
  const [showFormModal, setShowFormModal] = React.useState(false);
  const [inputTitle, setInputTitle] = useState();
  const [inputType, setInputType] = useState();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { singleFormData } = useSelector((state) => state.form);
  const [title, setTitle] = useState(singleFormData?.form?.title);
  const [description, setDescription] = useState(
    singleFormData?.form?.description
  );
  const [isUpdate, setisUpdate] = useState(false);
  const [isFormInputCreated, setIsFormInputCreated] = useState(false);
  const [isFormInputDelete, setisFormInputDelete] = useState(false);

  const UpdateFormHandler = (e) => {
    e.preventDefault();
    const updateData = {
      title,
      description,
    };
    dispatch(updateFormAction(id, updateData));
    setisUpdate(true);
    setShowFormModal(false);
  };

  const formInputCreateHandler = () => {
    const formInputBody = {
      inputTitle: inputTitle,
      inputType: inputType,
    };

    dispatch(createFormInputAction(id, formInputBody));
    setShowModal(false);
    setIsFormInputCreated(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getSingleFormAction(id));
      if (isUpdate || isFormInputCreated || isFormInputDelete) {
        dispatch(getSingleFormAction(id));
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, id, isUpdate, isFormInputCreated, isFormInputDelete]);

  const onFormInputDelete = () => {
    setisFormInputDelete(true);
  };

  return (
    <div className="h-screen w-screen  fixed">
      <Navbar />
      <div className="">
        <div className=" my-2 mx-20">
          <div className="flex space-x-14 items-center justify-between">
            <div className="text-3xl flex items-center space-x-14 font-semibold font-serif">
              <div>{singleFormData?.form?.title}</div>
              <div>
                <PencilIcon
                  className="h-7 w-7 cursor-pointer"
                  onClick={() => setShowFormModal(true)}
                />
              </div>
            </div>
            <div>
              <div className="text-gray-400 font-semibold font-serif">
                Copy and Share link
              </div>
              <div className="text-gray-800 font-semibold font-serif">
                http://localhost:3000/a/{id}
              </div>
            </div>
          </div>
          {showFormModal ? (
            <>
              <div className="ease-in justify-center bg-gray-500 bg-opacity-50 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Update</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowFormModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto space-y-2">
                      <div>
                        <div className="text-lg font-medium text-gray-400">
                          Form Title:{" "}
                        </div>
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          type="text"
                          className="px-2 rounded-md bg-gray-100 border-b-2 font-medium focus:outline-none"
                        />
                      </div>
                      <div>
                        <div className="text-lg font-medium text-gray-400">
                          Description:{" "}
                        </div>
                        <input
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          type="text"
                          className="px-2 rounded-md bg-gray-100 border-b-2 font-medium focus:outline-none"
                        />
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowFormModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={UpdateFormHandler}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          <div className="text-xl font-semibold font-serif">
            {singleFormData?.form?.description}
          </div>
        </div>
        <div>
          <div className="flex items-center mx-16 justify-around">
            <div className="text-2xl underline underline-offset-4 font-serif">
              Added inputs
            </div>
            <div
              onClick={() => setShowModal(true)}
              className="text-right cursor-pointer mx-10 text-white font-semibold bg-purple-600 hover:bg-purple-700 rounded-lg px-5 py-2 w-min justify-end"
            >
              Add&nbsp;new&nbsp;input
            </div>
            {showModal ? (
              <>
                <div className="ease-in justify-center bg-gray-500 bg-opacity-50 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Create New Input
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto space-y-2">
                        <div>
                          <div className="text-lg font-medium text-gray-400">
                            Form Title:{" "}
                          </div>
                          <input
                            onChange={(e) => setInputTitle(e.target.value)}
                            type="text"
                            className="px-2 rounded-md bg-gray-100 border-b-2 font-medium focus:outline-none"
                          />
                        </div>
                        <div>
                          <div className="text-lg font-medium text-gray-400">
                            Choose input type:{" "}
                          </div>
                          <select
                            name="currentStatus"
                            id="currentStatus"
                            onChange={(e) => setInputType(e.target.value)}
                            className="px-10 rounded-md bg-gray-50 cursor-pointer font-medium focus:outline-none"
                          >
                            <option value="">Selete</option>
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="password">Password</option>
                            <option value="number">Number</option>
                            <option value="date">Date</option>
                          </select>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={formInputCreateHandler}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="h-screen overflow-y-auto space-y-3 ">
        <div className="grid grid-rows-2  gap-2">
          <div className="grid grid-cols-2 gap-10  ">
            {singleFormData?.form?.forminputs?.map((formInput) => (
              <>
                <FormInputItem
                  key={formInput?._id}
                  id={formInput?._id}
                  inputTitle={formInput?.inputTitle}
                  inputType={formInput?.inputType}
                  onDelete={onFormInputDelete}
                  isAnswer={false}
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SingleFormCreate);
