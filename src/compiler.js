/**
 * Class to perform the compilation of the sweet.js macro defined.
 * @history
 * | Name | Action perfomed | Date |
 * | ---  | ---             |      |
 * | Andrea Mantovani | Create class | 2016-05-13 |
 *
 * @author Andrea Mantovani
 * @license BSD-2-Clause
 */

var fs = require("fs");
var sweetjs = require("sweet.js");
var transform = require("babel-core").transform;
var resolve = require("resolve");


var node_module_resolver = function (path, cwd) {
    // Is not need using the prefix './' in the path of the macro
    return resolve.sync("./"+path, { basedir: cwd });
};

var node_module_loader = function (path) {
    try {
	return fs.readFileSync(path, "utf-8");
    } catch (err) {
	return "";
    }
};

/**
 * @description
 * Default constructor.
 * @param options {Object}
 * Compiler options. Object with the follow params:
 * * `ambient`: 
 *    description:
 *    Directory where start the search of the require macro. 
 *    Any import in the souce code is relative at the path set here.
 *    default: The value of `process.cwd()`
 * * `noBabel`:
 *    description: Set if using babel for the back-end or not.
 *    default: `false`
 * * `resolver`:
 *    description: 
 *    The function to get the path of the macro included in the source.
 *    default: `node_module_resolver`
 * * `loader`:
 *    description: 
 *    The function to read the content of the macro included in the source.
 *    default: `node_module_loader`
 * @return {Compiler}
 * This.
 */
var Compiler = function (options) {
    options = (options || {});
    this.cwd = (options.ambient || process.cwd());
    this.noBabel = (options.noBabel || false);
    this.resolver = (options.resolver || node_module_resolver);
    this.loader = (options.loader || node_module_loader);
};

/**
 * @description
 * Compile the source with the require macros loaded from the ambient select.
 * @param code {string}
 * Source code
 * @return {Object}
 * The object store:
 * * `code` - The expended code
 * * `sourceMap` - The source map
 * @throws {Error}
 */
Compiler.prototype.compile = function (code) {
    return sweetjs.compile(code, {
	cwd: this.cwd,
	noBabel: this.noBabel,
	transform: transform,
	moduleResolver: this.resolver,
	moduleLoader: this.loader
    });
}

module.exports = Compiler;
