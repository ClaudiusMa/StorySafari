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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var metaphor_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! metaphor-node */ \"metaphor-node\");\n/* harmony import */ var metaphor_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(metaphor_node__WEBPACK_IMPORTED_MODULE_0__);\n\nconst metaphor = new (metaphor_node__WEBPACK_IMPORTED_MODULE_0___default())(process.env.METAPHOR_API_KEY);\nasync function handler(req, res) {\n    if (req.method === \"POST\") {\n        // Handle POST request\n        try {\n            const { companyName  } = req.body;\n            const response = await metaphor.search(`Here is a portfolio of a designer who works at ${companyName}`, {\n                numResults: 10\n            });\n            res.status(200).json(response);\n        } catch (error) {\n            console.error(error);\n            res.status(500).json({\n                message: error.message\n            });\n        }\n    } else {\n        // Handle other methods or return an error\n        res.status(405).json({\n            message: \"Method Not Allowed\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2NhbGwtZ3B0LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUNvQztBQUVwQyxNQUFNQyxXQUFXLElBQUlELHNEQUFRQSxDQUFDRSxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQjtBQUUzQyxlQUFlQyxRQUFRQyxHQUFtQixFQUFFQyxHQUFvQixFQUFFO0lBQy9FLElBQUlELElBQUlFLE1BQU0sS0FBSyxRQUFRO1FBQ3pCLHNCQUFzQjtRQUN0QixJQUFJO1lBQ0YsTUFBTSxFQUFFQyxZQUFXLEVBQUUsR0FBR0gsSUFBSUksSUFBSTtZQUNoQyxNQUFNQyxXQUFXLE1BQU1WLFNBQVNXLE1BQU0sQ0FBQyxDQUFDLCtDQUErQyxFQUFFSCxZQUFZLENBQUMsRUFBRTtnQkFDdEdJLFlBQVk7WUFDZDtZQUVBTixJQUFJTyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDSjtRQUN2QixFQUFFLE9BQU9LLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDQTtZQUNkVCxJQUFJTyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFRyxTQUFTRixNQUFNRSxPQUFPO1lBQUM7UUFDaEQ7SUFDRixPQUFPO1FBQ0wsMENBQTBDO1FBQzFDWCxJQUFJTyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVHLFNBQVM7UUFBcUI7SUFDdkQsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1uZXctcHJvamVjdC8uL3NyYy9wYWdlcy9hcGkvY2FsbC1ncHQudHM/MWRjNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xuaW1wb3J0IE1ldGFwaG9yIGZyb20gXCJtZXRhcGhvci1ub2RlXCJcblxuY29uc3QgbWV0YXBob3IgPSBuZXcgTWV0YXBob3IocHJvY2Vzcy5lbnYuTUVUQVBIT1JfQVBJX0tFWSlcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkge1xuICBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgLy8gSGFuZGxlIFBPU1QgcmVxdWVzdFxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGNvbXBhbnlOYW1lIH0gPSByZXEuYm9keTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbWV0YXBob3Iuc2VhcmNoKGBIZXJlIGlzIGEgcG9ydGZvbGlvIG9mIGEgZGVzaWduZXIgd2hvIHdvcmtzIGF0ICR7Y29tcGFueU5hbWV9YCwge1xuICAgICAgICBudW1SZXN1bHRzOiAxMCxcbiAgICAgIH0pO1xuXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNwb25zZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBIYW5kbGUgb3RoZXIgbWV0aG9kcyBvciByZXR1cm4gYW4gZXJyb3JcbiAgICByZXMuc3RhdHVzKDQwNSkuanNvbih7IG1lc3NhZ2U6ICdNZXRob2QgTm90IEFsbG93ZWQnIH0pO1xuICB9XG59Il0sIm5hbWVzIjpbIk1ldGFwaG9yIiwibWV0YXBob3IiLCJwcm9jZXNzIiwiZW52IiwiTUVUQVBIT1JfQVBJX0tFWSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJjb21wYW55TmFtZSIsImJvZHkiLCJyZXNwb25zZSIsInNlYXJjaCIsIm51bVJlc3VsdHMiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/call-gpt.ts\n");

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