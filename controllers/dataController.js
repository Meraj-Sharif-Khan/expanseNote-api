const Data = require("../models/Data");

// Create new data
exports.createData = async (req, res) => {
  try {
    const { expenseTitle, cost, date } = req.body;

    if (!Number(cost)) {
      return res.status(400).json({ error: "Cost Must be Number" });
    }
    console.log(typeof cost);

    const newData = new Data({
      user: req.user.id,
      expenseTitle,
      cost,
      date,
    });

    const data = await newData.save();
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message, "Server error");
  }
};

// Get all user's data
exports.getAllData = async (req, res) => {
  try {
    const data = await Data.find({ user: req.user.id }).sort({ date: -1 });
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update data
exports.updateData = async (req, res) => {
  try {
    const { expenseTitle, cost } = req.body;

    let data = await Data.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ msg: "Data not found" });
    }

    // Make sure user owns the data
    if (data.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    data = await Data.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content } },
      { new: true }
    );

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete data
exports.deleteData = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    console.log(data);
    if (!data) {
      return res.status(404).json({ msg: "Data not found" });
    }

    // Make sure user owns the data
    if (data.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // await Data.findByIdAndRemove(req.params.id);
    await Data.deleteOne(data);
    res.json({ msg: "Data removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
