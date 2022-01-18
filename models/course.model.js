const mogoose = require('mongoose');
const Schema = mogoose.Schema;
const slug = require('mongoose-slug-generator');

const Course = new Schema(
  {
    name: { type: String, require: true, unique: true },
    description: { type: String },
    img: { type: String },
    slug: { type: String, slug: 'name', unique: true }
  },
  {
    timestamps: true,
  },
  );
  
  //add plugin 
mogoose.plugin(slug);

module.exports = mogoose.model('Course1', Course, "Courses");