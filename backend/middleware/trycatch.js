import ErrorHandler from "../utils/utilsErrorHandler.js";

export const asyncTryCatch = func => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
}