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
                            dbWorkout[dbWorkout.length - 1].calculateTotalDuration();
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

            //console.log(`exercise body - ${JSON.stringify(body)}`);

            db.Workout.findOneAndUpdate({_id: params.id}, {$push: {exercises: body}}, {new: true})
                                        .then(dbWorkout => {
                                            //console.log(`added - ${JSON.stringify(dbWorkout)}`);
                                            dbWorkout.calculateTotalDuration();
                                            res.json(dbWorkout);
                                        })
                                        .catch(err => {
                                            res.json(err);
                                        });

        });


};