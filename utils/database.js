const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
        .then(connection => {
            console.log(`Connected to ${connection.connections[0].name} database`);
        }).catch(error => {
            console.log(`DB connection failed, Details: ${error}`);
        });
    mongoose.set('useFindAndModify', false);
};