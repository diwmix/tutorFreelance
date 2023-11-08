const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  value: { type: String, default: "STUDENT" },
}, {collection: 'roles'});

module.exports = mongoose.model("Role", roleSchema);