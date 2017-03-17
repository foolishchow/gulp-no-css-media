var gutil = require('gulp-util'),
    through = require('through2'),
    mediaquery = require('css');
 
Array.prototype.contains = function(str){
    if ((typeof str).toLowerCase() != "string") return false;
    str = str.replace(/^\s*|\s*$/,'');
    var contains = false;
    for( var i = 0 ; i < this.length ; i++ ){
        if( this[i] == str ) {
            contains = true;
        } 
    }
    return contains;
}
module.exports = function(options) {

    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }
        var css = file.contents.toString();
        var ast = mediaquery.parse(css);
        var ast_back = mediaquery.parse('');

        ast.stylesheet.rules.forEach(function(obj){
            if( obj.type=='media' ){
                if ( options.contains( obj.media ) ) {
                    obj.rules.forEach(function(rule){
                        ast_back.stylesheet.rules.push(rule);
                    });
                };
            }else{
                ast_back.stylesheet.rules.push(obj);
            }

        });
        var string = mediaquery.stringify(ast_back,{'indent':'    '});
        file.contents = new Buffer(string);
        this.push(file);
        cb();
        
    });
};
