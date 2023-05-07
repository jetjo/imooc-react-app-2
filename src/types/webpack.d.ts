declare namespace NodeJS {
  interface WebpackRequireResult {
    exports: {
      [key: string]: any;
      default: unknown|any;
    };
  }
  interface Module {
    (
      module: WebpackRequireResult,
      __webpack_exports_: WebpackRequireResult["exports"],
      __webpack_require_: typeof __webpack_require__
    );
  }
}
