const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expenseTitle: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },

  date: {
    type: String,
  },
});

module.exports = mongoose.model("Data", DataSchema);
