import React, { useEffect, useState } from "react";
import FormItem from "../components/FormItem";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getFormAction } from "../store/app/form/form-action";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();
  const { allForms } = useSelector((state) => state.form);
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();

  // formData.append("title", title);
  // formData.append("description", description);

  const formCreateHandler = async (e) => {
    e.preventDefault();

    const data = await createForm();
    navigate(`${data.newForm._id}/create`);
  };

  const createForm = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/form/create`,
      {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Untitled",
          description: "no descriptions",
        }),
      }
    );

    if (!response.ok) {
      throw Error("Error occured in form fetch");
    }

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getFormAction());
      if (isDelete) {
        dispatch(getFormAction());
        setIsDelete(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, isDelete]);

  const onDelete = () => {
    setIsDelete(true);
  };

  return (
    <div className="h-screen w-screen  fixed">
      <Navbar />
      <div>
        <div className="flex  justify-around py-10 ">
          <div className="flex space-x-2 items-center">
            <div className="text-2xl font-serif font-medium text-black">
              Total Forms created&nbsp;:{" "}
            </div>
            <div className="text-3xl font-serif font-semibold text-black">
              {allForms?.forms?.length}
            </div>
          </div>
          <div
            // onClick={() => setShowModal(true)}
            onClick={formCreateHandler}
            className="bg-purple-600 hover:bg-purple-800 cursor-pointer w-min px-2 py-4 text-xl font-semibold text-white rounded-lg"
          >
            Create&nbsp;New&nbsp;Form
          </div>
        </div>
        <div className=" h-screen overflow-y-auto space-y-3 px-96 ">
          {allForms?.forms?.map((form) => (
            <>
              <div>
                <FormItem
                  key={form?._id}
                  id={form?._id}
                  title={form?.title}
                  description={form?.description}
                  createdAt={form?.createdAt}
                  deleteHandler={onDelete}
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Home);
