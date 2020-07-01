const {Schema, model} = require("mongoose")

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises:[
        {
            type: {
                type: String,
                trim: true,
                required: true
            },
            name: {
                type: String,
                trim: true,
                required: true
            },
            duration: Number,
            weight: Number,
            reps: Number,
            sets: Number,
            distance: {
                type: Number,
                required: true
            },
        }
    ]
});
const Workout = model("Workout", workoutSchema);
module.exports = Workout;