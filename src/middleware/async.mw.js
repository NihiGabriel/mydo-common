exports.asyncHandler = (fn) => (req, result, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}