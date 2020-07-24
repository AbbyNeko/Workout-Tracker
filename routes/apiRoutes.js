const db = require("../models");

module.exports = function(app) {

        //get all workouts
        app.get('/api/workouts/range', (req, res) => {

            db.Workout.find({})
                        .then(dbWorkout => {
                            res.json(dbWorkout);
                        }).catch(err => {
                            res.json(err);
                        });

        });

        //get last workout
        app.get('/api/workouts', (req, res) => {
             db.Workout.find({})
                        .then(dbWorkout => {
                            res.json(dbWorkout);
                        }).catch(err => {
                            res.json(err);
                        });
        });

        //post request to create a workout
        app.post('/api/workouts', ({body}, res) => {
            db.Workout.create(body)
                    .then(dbWorkout =>{
                        res.json(dbWorkout);
                    }).catch(err => {
                        res.json(err);
                    });
        });


        //put request to add exercise to workout
        app.put('/api/workouts/:id', ({params, body}, res) => {

            db.Workout.findOneAndUpdate({_id: params.id}, {$push: body}, {new: true})
                                        .then(dbWorkout => {
                                            res.json(dbWorkout);
                                        })
                                        .catch(err => {
                                            res.json(err);
                                        });

        });


};