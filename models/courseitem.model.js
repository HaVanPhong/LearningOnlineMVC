const mogoose = require('mongoose');
const Schema = mogoose.Schema;
const ItemSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String },
    img: { type: String },
    videoId: { type: String },
    course: {
      type: mogoose.Types.ObjectId,
      ref: "Course1"
    }
  },
  {
    timestamps: true,
  },
  );
  

module.exports = mogoose.model('CourseItem', ItemSchema, "CourseItems");