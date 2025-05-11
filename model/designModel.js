const { model, Schema } = require('mongoose');

const user_schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",  // Make sure you have a "users" model referenced here
  },
  components: {
    type: Array,
    default: [],
  },
  image_url: {
    type: String,
    required: true,  // This makes it a required field
  }
}, { timestamps: true });

module.exports = model('designs', user_schema);
