'use strict';


/**
 *
 * returns VocabularyObject
 **/
exports.getFile = function() {
  return new Promise(function(resolve, reject) {
      console.log("works");
      var examples = {};
    examples['application/json'] = {
  "data" : {
    "-key" : "-key",
    "-title" : "-title",
    "-id" : 0,
    "-children" : null
  },
  "_id" : "_id"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

