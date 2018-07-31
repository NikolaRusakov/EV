import * as express from 'express'
import * as multer from 'multer'
import * as cors from 'cors'
import * as formidable from 'formidable'
// import {lookup} from './lib';

const thesaurus = require('./lib');
const googleThesaurus= require('./lib').googleLookup;
const translate = require('google-translate-api');
// setup
const UPLOAD_PATH = 'uploads';
const upload = multer({dest: `${UPLOAD_PATH}/`}); // multer configuration
import {findDocument, MongoClient, url, saveParsedFile} from '../database';
// app
const app = express();
app.use(cors());
app.get('/getWord/:word', async (req, res) => {
    console.log(req.params.word);
    translate(req.params.word, {to: 'cs'}).then(re => {
        const response = {
            text: re.text
        }

        res.send(response);
    }).catch(err => {
        console.error(err);
    });
});

app.get('/getGoogleThesaurus/:browser/:word', async (req, res) => {
    console.log(req.params.word);
    googleThesaurus(req.params.browser,req.params.word)
        .then(results => {
            console.log(results)
            res.send(results)
        })

});
app.get('/getPowerThesaurus/:browser/:word', async (req, res) => {

    await translate(req.params.word, {to: 'cs'}).then(re => {
        const response = {
            text: re.text
        }

        res.send(response);
    }).catch(err => {
        console.error(err);
    });

    await thesaurus(req.params.browser,req.params.word)
        .then(results => {
            console.log(results)
            res.send(results)
        })
    // return thesaurus.lookup(req.params.word)
    //     .then(results => {
    //         return results
    //     }).catch(e => {
    //         console.log(e);
    //     })
});

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
                    const delimitedItems = [];
                    let delimit = splitting[i].split(';');
                    for (let y = 0; y < delimit.length; y++) {
                        delimitedItems.push(delimit[y])
                    }
                    delimitedItems.map((value, index) => {
                        if (index === 0) {
                            parsedObject.data = [
                                ...parsedObject.data,
                                {
                                    id: i,
                                    title: value,
                                    name: value,
                                    parent: null
                                }
                            ];
                        } else {
                            parsedObject.data = [
                                ...parsedObject.data,
                                {
                                    id: i,
                                    title: value,
                                    name: value,
                                    parent: i
                                }
                            ];
                        }
                    });

                }
            }
        );
        saveParsedFile(req, res, parsedObject);
    });

});

app.post('/parseFileForTree/:fileName', async (req, res) => {
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
                let textId = 0;
                tempArr.push(fields[key]);
                let splitting = tempArr[0].split('\r\n');
                for (let i = 0; i < splitting.length; i++) {
                    const delimitedItems = [];
                    let parent;
                    let parentId;
                    let delimit = splitting[i].split(';');
                    for (let y = 0; y < delimit.length; y++) {
                        textId++;
                        if (y !== 0) {
                            const delimitedItem = {
                                id: i,
                                title: delimit[y],
                                key: textId,
                            }
                            delimitedItems.push(delimitedItem)
                        } else {
                            parent = delimit[y];
                            parentId = textId;

                        }
                    }


                    let index = delimitedItems.length;
                    // delimitedItems.map((value, index)=> {
                    if (index < 2) {
                        parsedObject.data = [
                            ...parsedObject.data,
                            {
                                id: i,
                                title: parent,
                                key: parentId,
                            }
                        ];
                    } else {
                        parsedObject.data = [
                            ...parsedObject.data,
                            {
                                id: i,
                                title: parent,
                                key: parentId,
                                children: delimitedItems,
                                childrenLength: index
                            }
                        ];
                    }
                    // });


                }
            }
        );
        res.send(parsedObject);
        // saveParsedFile(req, res, parsedObject);
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