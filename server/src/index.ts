import * as express from 'express'
import * as multer from 'multer'
import * as cors from 'cors'
import * as formidable from 'formidable'

// setup
const UPLOAD_PATH = 'uploads';
const upload = multer({dest: `${UPLOAD_PATH}/`}); // multer configuration
import {findDocument, MongoClient, url, saveParsedFile} from '../database';
// app
const app = express();
app.use(cors());

app.post('/parseFile/:fileName', async (req, res) => {
    // console.log(req.param('fileName'));
    let form = new formidable.IncomingForm();
    form.multiples = true;
    form.keepExtensions = true;
    const parsedObject = {
        data: []
    };
    form.parse(req, (err, fields) => {
        Object.keys(fields).map((key,) => {
                let tempArr = [];
                tempArr.push(fields[key]);
                let splitting = tempArr[0].split('\r\n');
                for (let i = 0; i < splitting.length; i++) {
                    const tempDelimited = [];
                    let delimit = splitting[i].split(';');
                    for (let y = 0; y < delimit.length; y++) {
                        tempDelimited.push(delimit[y])
                    }
                    parsedObject.data = [
                        ...parsedObject.data,
                        {
                            id: i,
                            items: tempDelimited
                        }
                    ];
                }

            }
        );
        saveParsedFile(req, res, parsedObject);
    });

});

app.get('/getFile/:fileName', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        findDocument(req.params.fileName, db, (data) => {
            db.close();
            res.send(data);
        });
    })
});

app.get('/getFiles', async (req, res) => {
    MongoClient.connect(url, (err, db) => {
        findDocument("vocabulary", db, () => {
            db.close();
        });
    });
});

app.listen(3000, function () {
    console.log('listening on port 3000!');
});