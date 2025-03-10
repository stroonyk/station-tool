// @ts-nocheck
const runScriptUnless = (middleware, ...paths) => {
  return function (req, res, next) {
    const pathCheck = paths.some((path) => {
      if (path.includes('/*')) {
        const newPath = path.replace(/\/\*$/, '');
        return req.path.includes(newPath);
      }
      return path === req.path;
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    pathCheck ? next() : middleware(req, res, next);
  };
};

export default runScriptUnless;
