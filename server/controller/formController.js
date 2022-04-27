const Form = require("../model/form");
const FormInput = require("../model/formInput");

// create form
exports.createForm = async (req, res, next) => {
  try {
    const newForm = await Form.create(req.body);

    res.status(200).json({ newForm });
  } catch (err) {
    res.status(400).json(err);
  }
};

// get all forms
exports.getForm = async (req, res, next) => {
  try {
    const forms = await Form.find().sort("-createdAt");

    res.status(200).json({ forms });
  } catch (error) {
    res.status(400).json(error);
  }
};

// get single form details
exports.getSingleForm = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id).populate(
      "forminputs",
      "_id inputTitle placeholder inputType createdAt"
    );

    if (!form) {
      return res.status(400).json({ msg: "form doen't exits" });
    }

    res.status(200).json({ form });
  } catch (error) {
    res.status(400).json(error);
  }
};

// edit details of form
exports.editForm = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(400).json({
        msg: "form doesn't exist",
      });
    }

    const newForm = req.body;

    const updateForm = await Form.findByIdAndUpdate(req.params.id, newForm, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({ updateForm });
  } catch (error) {
    res.status(400).json(error);
  }
};

// delete form
exports.deleteForm = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(400).json({
        msg: "form doesn't exist",
      });
    }

    await form.remove();

    res.status(200).json({ msg: "form deleted" });
  } catch (error) {
    res.status(400).json(error);
  }
};

// form input

// create input
exports.createFormInput = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.formid);

    const newFormInput = await FormInput.create(req.body);

    form.forminputs.push(newFormInput);

    await form.save();

    res.status(200).json(form);
  } catch (error) {
    res.status(400).json(error);
  }
};

// read form input by form id
exports.getFormInputs = async (req, res, next) => {
  try {
    const form = await Form.findById(req.params.formid).populate(
      "forminputs",
      "_id inputTitle placeholder inputType createdAt"
    );

    res.status(200).json(form);
  } catch (error) {
    res.status(400).json(error);
  }
};

// update form input
exports.updateFormInput = async (req, res, next) => {
  try {
    const formInput = await FormInput.findById(req.params.id);

    if (!formInput) {
      return res.status(400).json({ msg: "Form input is not valid" });
    }

    const newFormInputForUpdate = req.body;
    const updateFormInput = await FormInput.findByIdAndUpdate(
      req.params.id,
      newFormInputForUpdate,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({ updateFormInput });
  } catch (error) {
    res.status(400).json(error);
  }
};

// delete form input
exports.deleteFormInput = async (req, res, next) => {
  try {
    const formInput = await FormInput.findById(req.params.id);

    if (!formInput) {
      return res.status(400).json("form input isn't valid");
    }

    await formInput.remove();

    res.status(200).json({ msg: "form input deleted" });
  } catch (error) {
    res.status(400).json(error);
  }
};

// answer of user in forminput
exports.formInputAnswer = async (req, res, next) => {
  try {
    const formInput = await FormInput.findById(req.params.id);

    if (!formInput) {
      return res.status(400).json("form input isn't available");
    }

    const newUpdate = {
      placeholder: req.body.placeholder,
    };
    const updatedFormInput = await FormInput.findByIdAndUpdate(
      req.params.id,
      newUpdate,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json(updatedFormInput);
  } catch (error) {
    res.status(400).json(error);
  }
};
