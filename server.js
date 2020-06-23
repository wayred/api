require('dotenv').config();
let express = require('express');
let app = express();
let router = express.Router();
let bodyParser = require('body-parser');
let port = process.env.PORT || 13579;
let applications = require('./applications');
let cors = require('cors');

router.get('/applications', applications.getAll);
router.post('/applications', applications.create);
router.get('/applications/:id', applications.get);
router.put('/applications/:id', applications.update);
router.delete('/applications/:id', applications.delete);

app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use('/api', router);

app.listen(port);
console.log('Listening on port: ' + port);