import { useNavigate } from "react-router-dom";
import { formSliceAction } from "./form-slice";

export const getFormAction = () => async (dispatch) => {
  const createForm = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw Error("Error occured in form fetch");
    }

    const data = await response.json();
    return data;
  };

  try {
    const allForms = await createForm();

    dispatch(
      formSliceAction.getForms({
        allForms,
      })
    );
  } catch (error) {}
};
export const getSingleFormAction = (id) => async (dispatch) => {
  const getSingleForm = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/${id}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw Error("Error occured in form fetch");
    }

    const data = await response.json();
    return data;
  };

  try {
    const singleFormData = await getSingleForm();

    dispatch(
      formSliceAction.getSingleFormDetails({
        singleFormData,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteFormAction = (id) => async (dispatch) => {
  const deleteForm = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw Error("Error occured in form fetch");
    }

    const data = await response.json();
    return data;
  };

  try {
    await deleteForm();
  } catch (error) {
    console.log(error);
  }
};
export const updateFormAction = (id, updateData) => async (dispatch) => {
  const updateForm = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      throw Error("Error occured in form update");
    }

    const data = await response.json();
    return data;
  };

  try {
    await updateForm();
  } catch (error) {
    console.log(error);
  }
};

export const createFormInputAction =
  (id, formInputBody) => async (dispatch) => {
    const createFormInput = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/${id}/forminput/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInputBody),
        }
      );

      if (!response.ok) {
        throw Error("Error occured in form input create");
      }

      const data = await response.json();
      return data;
    };

    try {
      await createFormInput();
    } catch (error) {}
  };

export const deleteFormInputAction = (id) => async (dispatch) => {
  const deleteFormInput = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/forminput/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw Error("Error occured in form fetch");
    }

    const data = await response.json();
    return data;
  };

  try {
    await deleteFormInput();
  } catch (error) {
    console.log(error);
  }
};
