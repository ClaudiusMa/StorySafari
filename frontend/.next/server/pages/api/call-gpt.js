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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var metaphor_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! metaphor-node */ \"metaphor-node\");\n/* harmony import */ var metaphor_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(metaphor_node__WEBPACK_IMPORTED_MODULE_0__);\n\nconst metaphor = new (metaphor_node__WEBPACK_IMPORTED_MODULE_0___default())(process.env.METAPHOR_API_KEY);\nasync function handler(req, res) {\n    try {\n        const { companyName  } = req.body;\n        const response = await metaphor.search(`Here is a portfolio of a designer who works at ${companyName}`, {\n            numResults: 10\n        });\n        res.status(200).json(response);\n    } catch (error) {\n        console.error(error);\n        res.status(500).json({\n            message: error.message\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2NhbGwtZ3B0LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUNvQztBQUVwQyxNQUFNQyxXQUFXLElBQUlELHNEQUFRQSxDQUFDRSxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQjtBQUUzQyxlQUFlQyxRQUFRQyxHQUFtQixFQUFFQyxHQUFvQixFQUFFO0lBQy9FLElBQUk7UUFDRixNQUFNLEVBQUVDLFlBQVcsRUFBRSxHQUFHRixJQUFJRyxJQUFJO1FBQ2hDLE1BQU1DLFdBQVcsTUFBTVQsU0FBU1UsTUFBTSxDQUFDLENBQUMsK0NBQStDLEVBQUVILFlBQVksQ0FBQyxFQUFFO1lBQ3RHSSxZQUFZO1FBQ2Q7UUFFQUwsSUFBSU0sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQ0o7SUFDdkIsRUFBRSxPQUFPSyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQ0E7UUFDZFIsSUFBSU0sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFRyxTQUFTRixNQUFNRSxPQUFPO1FBQUM7SUFDaEQ7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktbmV3LXByb2plY3QvLi9zcmMvcGFnZXMvYXBpL2NhbGwtZ3B0LnRzPzFkYzciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCBNZXRhcGhvciBmcm9tIFwibWV0YXBob3Itbm9kZVwiXG5cbmNvbnN0IG1ldGFwaG9yID0gbmV3IE1ldGFwaG9yKHByb2Nlc3MuZW52Lk1FVEFQSE9SX0FQSV9LRVkpXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxOiBOZXh0QXBpUmVxdWVzdCwgcmVzOiBOZXh0QXBpUmVzcG9uc2UpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGNvbXBhbnlOYW1lIH0gPSByZXEuYm9keTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1ldGFwaG9yLnNlYXJjaChgSGVyZSBpcyBhIHBvcnRmb2xpbyBvZiBhIGRlc2lnbmVyIHdobyB3b3JrcyBhdCAke2NvbXBhbnlOYW1lfWAsIHtcbiAgICAgIG51bVJlc3VsdHM6IDEwLFxuICAgIH0pO1xuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzcG9uc2UpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufSJdLCJuYW1lcyI6WyJNZXRhcGhvciIsIm1ldGFwaG9yIiwicHJvY2VzcyIsImVudiIsIk1FVEFQSE9SX0FQSV9LRVkiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiY29tcGFueU5hbWUiLCJib2R5IiwicmVzcG9uc2UiLCJzZWFyY2giLCJudW1SZXN1bHRzIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/call-gpt.ts\n");

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