 


# stringify-once

JSON stringify without `Converting circular structure to JSON` error.

Note: this snippet was extracted from an awesome answer at StakOverflow, from [here](https://stackoverflow.com/questions/11616630/json-stringify-avoid-typeerror-converting-circular-structure-to-json) to be honest. Thanks to the users that posted, edited and helped to give this answer ([1](https://stackoverflow.com/users/1068746/guy-mograbi), [2](https://stackoverflow.com/users/912236/orwellophile) and [3](https://stackoverflow.com/users/371698/isak)).*

## 1. Installation

~$ `npm install --save stringify-once`

## 2. Usage

First, you need to import the module from your code:

```js
const stringify = require("stringify-once");
```

Once you have added the code into your project, you will be able to:

```js
JSON.stringifyOnce(window); // not formatted
JSON.stringifyOnce(window, null, 4); // formatted
stringify(window); // not formatted
stringify(window, null, 4); // formatted
```

Notice that the method used is not `JSON.stringify`, but `JSON.stringifyOnce`.

## 3. Conclusion

There are lots of awesome codes in StackOverflow. Lots of them.




