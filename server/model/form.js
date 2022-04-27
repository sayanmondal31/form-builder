const { model, Schema } = require("mongoose");

const FormSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  forminputs: [
    {
      type: Schema.ObjectId,
      ref: "forminput",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("form", FormSchema);
