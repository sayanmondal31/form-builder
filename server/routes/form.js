const {
  createForm,
  getForm,
  getSingleForm,
  editForm,
  deleteForm,
  createFormInput,
  getFormInputs,
  updateFormInput,
  deleteFormInput,
  formInputAnswer,
} = require("../controller/formController");

const router = require("express").Router();

// form
router.route("/form/create").post(createForm);
router.route("/").get(getForm);
router.route("/:id").get(getSingleForm).patch(editForm).delete(deleteForm);

// form input
router.route("/:formid/forminput/create").post(createFormInput);
router.route("/:formid/forminput").get(getFormInputs);
router
  .route("/forminput/:id")
  .patch(updateFormInput)
  .patch(formInputAnswer)
  .delete(deleteFormInput);

module.exports = router;
