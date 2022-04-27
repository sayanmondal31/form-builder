import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormInputItem from "../components/FormInputItem";
import Navbar from "../components/Navbar";
import { getSingleFormAction } from "../store/app/form/form-action";

function SingleForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleFormData } = useSelector((state) => state.form);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getSingleFormAction(id));
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, id]);

  return (
    <div className="h-screen w-screen  fixed">
      <Navbar />
      <div className="">
        <div className=" my-2 mx-20">
          <div className="flex space-x-14 items-center">
            <div className="text-3xl font-semibold font-serif">
              {singleFormData?.form?.title}
            </div>
            <div></div>
          </div>

          <div className="text-xl font-semibold font-serif">
            {singleFormData?.form?.description}
          </div>
        </div>
        <div>
          <div className="flex items-center mx-16 justify-around">
            <div className="text-2xl underline underline-offset-4 font-serif">
              Your Response
            </div>
            <div
              //   onClick={}
              className="text-right cursor-pointer mx-10 text-white font-semibold bg-purple-600 hover:bg-purple-700 rounded-lg px-5 py-2 w-min justify-end"
            >
              Submit
            </div>
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
                  isAnswer={true}
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleForm;
