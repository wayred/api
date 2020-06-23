let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const applicationSchema = new Schema({
    views: Schema.Types.Mixed,
    name: String,
    type: String,
    createdOn: Date,
    modifiedOn: Date,
    mainView: String,
    themes: Schema.Types.Mixed,
    defaultTheme: String
}, { minimize: false });
let Application = mongoose.model('Application', applicationSchema);

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

exports.create = async (req, res) => {
    let app = new Application(req.body);
    app.createdOn = new Date(new Date().toUTCString());
    app.modifiedOn = app.createdOn;
    let result = await app.save();
    res.json(result);
}
exports.getAll = async (req, res) => {
    let result = await Application.find({}, {
        name: 1,
        type: 1,
        createdOn: 1,
        modifiedOn: 1
    });
    res.json(result);
}
exports.get = async (req, res) => {
    let result = await Application.findById(req.params.id);
    res.json(result);
}
exports.update = async (req, res) => {
    let result = await Application.findByIdAndUpdate(req.params.id, req.body);
    res.json(result);
}
exports.delete = async (req, res) => {
    let result = await Application.findByIdAndDelete(req.params.id)
    res.json(result);
}