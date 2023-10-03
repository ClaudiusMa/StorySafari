"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/call-gpt";
exports.ids = ["pages/api/call-gpt"];
exports.modules = {

/***/ "metaphor-node":
/*!********************************!*\
  !*** external "metaphor-node" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("metaphor-node");

/***/ }),

/***/ "(api)/./src/pages/api/call-gpt.ts":
/*!***********************************!*\
  !*** ./src/pages/api/call-gpt.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var metaphor_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! metaphor-node */ \"metaphor-node\");\n/* harmony import */ var metaphor_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(metaphor_node__WEBPACK_IMPORTED_MODULE_0__);\n\nconst metaphor = new (metaphor_node__WEBPACK_IMPORTED_MODULE_0___default())(\"3ffeaa1e-c0dd-4a9f-a86a-25a9dbfac823\");\nasync function handler(req, res) {\n    try {\n        const { companyName  } = req.body;\n        const response = await metaphor.search(`Here is a portfolio of a designer who works at ${companyName}`, {\n            numResults: 10\n        });\n        res.status(200).json(response);\n    } catch (error) {\n        console.error(error);\n        res.status(500).json({\n            message: error.message\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2NhbGwtZ3B0LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUNvQztBQUVwQyxNQUFNQyxXQUFXLElBQUlELHNEQUFRQSxDQUFDO0FBRWYsZUFBZUUsUUFBUUMsR0FBbUIsRUFBRUMsR0FBb0IsRUFBRTtJQUMvRSxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxZQUFXLEVBQUUsR0FBR0YsSUFBSUcsSUFBSTtRQUNoQyxNQUFNQyxXQUFXLE1BQU1OLFNBQVNPLE1BQU0sQ0FBQyxDQUFDLCtDQUErQyxFQUFFSCxZQUFZLENBQUMsRUFBRTtZQUN0R0ksWUFBWTtRQUNkO1FBRUFMLElBQUlNLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUNKO0lBQ3ZCLEVBQUUsT0FBT0ssT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUNBO1FBQ2RSLElBQUlNLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUcsU0FBU0YsTUFBTUUsT0FBTztRQUFDO0lBQ2hEO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL215LW5ldy1wcm9qZWN0Ly4vc3JjL3BhZ2VzL2FwaS9jYWxsLWdwdC50cz8xZGM3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCI7XG5pbXBvcnQgTWV0YXBob3IgZnJvbSBcIm1ldGFwaG9yLW5vZGVcIlxuXG5jb25zdCBtZXRhcGhvciA9IG5ldyBNZXRhcGhvcihcIjNmZmVhYTFlLWMwZGQtNGE5Zi1hODZhLTI1YTlkYmZhYzgyM1wiKVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBjb21wYW55TmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBtZXRhcGhvci5zZWFyY2goYEhlcmUgaXMgYSBwb3J0Zm9saW8gb2YgYSBkZXNpZ25lciB3aG8gd29ya3MgYXQgJHtjb21wYW55TmFtZX1gLCB7XG4gICAgICBudW1SZXN1bHRzOiAxMCxcbiAgICB9KTtcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3BvbnNlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn0iXSwibmFtZXMiOlsiTWV0YXBob3IiLCJtZXRhcGhvciIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJjb21wYW55TmFtZSIsImJvZHkiLCJyZXNwb25zZSIsInNlYXJjaCIsIm51bVJlc3VsdHMiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/call-gpt.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/call-gpt.ts"));
module.exports = __webpack_exports__;

})();