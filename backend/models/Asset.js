const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: ["Available", "In Use", "Maintenance", "Retired"],
      default: "Available",
    },
    value: { type: Number, required: true },
    serialNumber: { type: String, required: true, unique: true },
    assignedTo: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asset", assetSchema);
