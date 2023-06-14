const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Calendar = new Schema({
   user_id: {
      type: String,
      required: false,
   },
   start: {
      type: String
   },
   end: {
      type: String
   },
   title: {
      type: String
   }
});


module.exports = mongoose.model("Calendar", Calendar);
