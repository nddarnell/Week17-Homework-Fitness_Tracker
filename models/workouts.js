const {Schema, model} = require("mongoose")

var workoutSchema = new Schema({
    type: {
        type: String,
        required: "Enter Resitance or Cardio"
    },
    name: {
        type: String,
        required: "Enter name of workout"
    },
    duration: {
        type: Number,
        required: "Enter a value"
    },
    distance: {
        type: Number,
        required: "Enter a value"
    },
    weight: {
        type: Number,
        required: false
    },
    reps: {
        type: Number,
        required: false
    },
    sets: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Workout = model("Workout", workoutSchema);
module.exports = Workout;