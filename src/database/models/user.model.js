const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true, minlength: 5, maxlength: 8 },
    email: { type: String, required: true },
    gender: {
      type: String,
      required: true,
      enum: Object.values(["MALE", "FEMALE"]),
    },
    userType: {
      type: String,
      required: true,
      enum: Object.values(["SUPERADMIN", "ADMIN"]),
    },
    policies: [{ type: mongoose.Types.ObjectId, ref: "Policy" }],
  },
  {
    collection: "users",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("userName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model("User", userSchema);
