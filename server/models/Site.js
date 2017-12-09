const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const siteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Please enter a Title'
    },
    url: {
        type: String,
        trim: true,
        required: 'Please enter a url'
    },
    description: {
        type: String,
        trim: true,
        required: 'Please enter a description'
    },
    _links: {
        self: {
            href: { },
        },
        collection: {
            href: { },
        }
    },
});
module.exports = mongoose.model('Site', siteSchema);
