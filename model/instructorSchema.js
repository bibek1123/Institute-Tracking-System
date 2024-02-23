const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const { MONGOOSE_PAGINATE_CUSTOM_LABELS } = require('../config/constants/common')
const Schema = mongoose.Schema;
mongoosePaginate.paginate.options = { customLabels: MONGOOSE_PAGINATE_CUSTOM_LABELS };
const instructorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  instructorId: { type: String, required: true },
  checkIns: [{ type: Date }],
  checkOuts: [{ type: Date }],
  createdBy: {
    type: mongoose.Types.ObjectId, ref: 'instructor'
  },
  createdAt:
    { type: Date },
  updatedBy: {
    type: mongoose.Types.ObjectId, ref: 'instructor'
  },
  updatedAt:
    { type: Date },
  deletedAt: { type: Date },
  deletedBy: {
    type: Schema.Types.ObjectId, ref: 'instructor'
  },
  canNotDel: { type: Boolean }, // can not delete
  failed_attempts: {
    type: Number,
    default: 0
  },
  last_attempts: {
    type: Date
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
}, { timestamps: true });

instructorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

instructorSchema.pre(['find', 'findOne', 'findById', 'updateOne'], function (next) {
  this.getQuery().deletedAt = { $exists: false };
  next();
});

instructorSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

instructorSchema.plugin(mongoosePaginate);
instructorSchema.plugin(idValidator);

const instructor = mongoose.model("instructor", instructorSchema);

module.exports = instructor;
