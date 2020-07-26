const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
    type: String,
    name: String,
    duration: { 
        type: Number,
        default: 0
    },
    weight: { 
        type: Number,
        default: 0
    },
    reps: { 
        type: Number,
        default: 0
    },
    sets: { 
        type: Number,
        default: 0
    },
    distance: { 
        type: Number,
        default: 0
    }
  });

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        required: "Date is required",
        default: Date.now()
    },
    totalDuration: {
        type: Number
    },
    exercises: [ExerciseSchema]
});

WorkoutSchema.methods.calculateTotalDuration = function() {
    let totalDuration = 0;

    this.exercises.forEach(exercise => {
        totalDuration += exercise.duration;
    });

    this.totalDuration = totalDuration;

  };

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;