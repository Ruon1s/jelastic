const mongoose = require('mongoose');

(async () => {
    try {
        let url = process.env.DB_URL;
        console.log(url);
         await mongoose.connect(process.env.DB_URL ,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log('DB connected successfully');
    } catch (err) {
        console.error('Connection to db failed', err);
    }
})();

module.exports = mongoose.connection;
