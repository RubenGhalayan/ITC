"use strict";

function foo(first, second, third) {
    for (var i = 2, len = arguments.length; i < len; i++) {
        document.write(arguments[i] + ", ");
  }
}
