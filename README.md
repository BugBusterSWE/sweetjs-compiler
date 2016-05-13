# sweetjs-compiler
Compiler for sweet.js macro

## Summary
The sweetjs-compiler is a simple wrapper to the exist `compile` method in the [sweet.js](http://sweetjs.org/) module.
It is usefull when you want compile your macro but this is not necessarily in a file.

## Use
Sweetjs-compiler is a npm module therefore is enought to make:

```npm install --save sweetjs-compiler```

And in the your code: 

```javascript
const SweetCompiler = require('sweetjs-compiler')
```

## Options
The constructur require an object with the follow params:

```javascript
new SweetCompiler({
  ambient: { type: String, default: process.cwd() },
  noBabel: { type: Boolean, default: false },
  resolver: { type: Function, default: node_module_resolver },
  loader: { type: Function, default: node_module_loader }
});
```

#### ambient
Directory where start the search of the require macro. Any import in the souce code is relative at the path set here.
#### noBabel
Set if using Babel for the back-end or not
#### resolver
The function to get the path of the macro included in the source.
#### loader
The function to read the content of the macro included in the source.

## Compile
The only method of sweetjs-compiler is `compile`. It take in input the source and return an object with:
* `code` - The expended code
* `sourceMap` - The source map

If some errors is occurred, a exception is throw.

Example:
```javascript
const SweetCompiler = require('sweetjs-compiler');

var compiler = new SweetCompiler({
  // So, everywhere you run the script, the path to include 
  // the macro in the source files is fixed
  ambient: __dirname 
});

// The example in the home of sweet.js
var source = "syntax hi = function (ctx) {return #`console.log('hello, world!')`;} hi";

try {
  var out = compiler.compile(source);
  console.log(out.code) // Print: console.log('hello, world!')
  
} catch (err) {
  /*
  ...
  */
}
```

## Note
This project is make to use the method compile in a javascript file. Please, if this is a unneccessary solution, open a issue so I will delete this garbage.
