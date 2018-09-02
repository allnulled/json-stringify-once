// >> export module to StringifyOnce

// 
// From awesome answer at: 
// https://stackoverflow.com/questions/11616630/json-stringify-avoid-typeerror-converting-circular-structure-to-json

/**
 *
 * # stringify-once
 * 
 * JSON stringify without `Converting circular structure to JSON` error.
 * 
 * Note: this snippet was extracted from an awesome answer at StakOverflow, from [here](https://stackoverflow.com/questions/11616630/json-stringify-avoid-typeerror-converting-circular-structure-to-json) to be honest. Thanks to the users that posted, edited and helped to give this answer ([1](https://stackoverflow.com/users/1068746/guy-mograbi), [2](https://stackoverflow.com/users/912236/orwellophile) and [3](https://stackoverflow.com/users/371698/isak)).*
 * 
 * ## 1. Installation
 * 
 * ~$ `npm install --save stringify-once`
 * 
 * ## 2. Usage
 * 
 * First, you need to import the module from your code:
 * 
 * ```js
 * const stringify = require("stringify-once");
 * ```
 * 
 * Once you have added the code into your project, you will be able to:
 * 
 * ```js
 * JSON.stringifyOnce(window); // not formatted
 * JSON.stringifyOnce(window, null, 4); // formatted
 * stringify(window); // not formatted
 * stringify(window, null, 4); // formatted
 * ```
 * 
 * Notice that the method used is not `JSON.stringify`, but `JSON.stringifyOnce`.
 * 
 * ## 3. Conclusion
 * 
 * There are lots of awesome codes in StackOverflow. Lots of them.
 * 
 */

JSON.stringifyOnce = function(obj, replacer, indent){
    var printedObjects = [];
    var printedObjectKeys = [];

    function printOnceReplacer(key, value){
        if (typeof value === 'function') {
          return value + ''; // implicitly `toString` it
        }
        if ( printedObjects.length > 2000){ // browsers will not print more than 20K, I don't see the point to allow 2K.. algorithm will not be fast anyway if we have too many objects
        return 'object too long';
        }
        var printedObjIndex = false;
        printedObjects.forEach(function(obj, index){
            if(obj===value){
                printedObjIndex = index;
            }
        });

        if ( key == ''){ //root element
             printedObjects.push(obj);
            printedObjectKeys.push("root");
             return value;
        }

        else if(printedObjIndex+"" != "false" && typeof(value)=="object"){
            if ( printedObjectKeys[printedObjIndex] == "root"){
                return "(pointer to root)";
            }else{
                return "(see " + ((!!value && !!value.constructor) ? value.constructor.name.toLowerCase()  : typeof(value)) + " with key " + printedObjectKeys[printedObjIndex] + ")";
            }
        } else {

            var qualifiedKey = key || "(empty key)";
            printedObjects.push(value);
            printedObjectKeys.push(qualifiedKey);
            if(replacer){
                return replacer(key, value);
            }else{
                return value;
            }
        }
    }
    return JSON.stringify(obj, printOnceReplacer, indent);
};


// >> export module
module.exports = JSON.stringifyOnce;
