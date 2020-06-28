var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var workoutSchema = new Schema({
    // update this what do you think should go in there?
//   image: { type: String, required: true },
//   description: { type: String, required: true },
//   rating: Number,
//   date: { type: Date, default: Date.now }

});

var Workout = mongoose.model("Workouts", workoutSchema);

module.exports = Workout;