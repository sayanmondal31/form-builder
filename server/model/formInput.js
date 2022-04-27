const { model, Schema } = require("mongoose");

const FormInputSchema = new Schema({
  form: {
    type: Schema.ObjectId,
    ref: "form",
  },
  inputTitle: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  inputType: {
    type: String,
    enum: ["email", "password", "text", "number", "date"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("forminput", FormInputSchema);
