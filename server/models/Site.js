const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const siteSchema = new mongoose.Schema({
    url: {
        type: String,
        trim: true,
        required: 'Please enter a Url'
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

module.exports = mongoose.model('Site', siteSchema);
