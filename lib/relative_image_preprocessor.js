// Make image URLs relative to github

var split = require('split');
var through = require('through');
var duplexer = require('duplexer');

var REGEX = {
  image: /\[\[([^\|]+)\]\]/g
};

/**
 * {object} options
 *   options.baseUrl relative URL for images
 */
module.exports = {
  REGEX: REGEX,
  build: function(options) {
    return function() {
      // Split the input stream by lines
      var splitter = split();

      var anchorReplacer = through(function (data) {
        // var anchorsWithoutUrls = data.match(REGEX.anchors.withoutUrl);
        // if(anchorsWithoutUrls.length) {
        //   for(var i=0; i<anchorsWithoutUrls.length; i++) {
        //     var anchor = anchorsWithoutUrls[i];
        //     var href = anchor.replace(' ', '-');
        //     this.queue( data.replace(REGEX.anchors.withoutUrl, '$1') );
        //   }
        // }
        // data = data.replace(REGEX.anchors.withoutUrl, '$1');
        // data = data.replace(REGEX.anchors.withUrl, '$1');
        this.queue(data + '\n');
      });

      splitter.pipe(anchorReplacer);

      return duplexer(splitter, anchorReplacer);
    }
  }
}