'use strict';

var utils = require('../utils/writer.js');
var File = require('../service/FileService');

module.exports.postFile = function postFile (req, res, next) {
  var file = req.swagger.params['file'].value;
  var fileName = req.swagger.params['fileName'].value;
  var delimiter = req.swagger.params['delimiter'].value;
  File.postFile(file,fileName,delimiter)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
