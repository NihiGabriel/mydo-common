const { asyncHandler } = require('./middleware/async.mw');
const { protect, authorize } = require('./middleware/auth.mw')   

const {
    isObject,
    isString,
    isArray,
    strToArray,                                                         // we bring in all functions here so as to be able to publish on NPM
    strToArrayEs6,                                                      
    strIncludes,
    strIncludesEs6,
    dateToWord,
    dateToWordRaw,
    writeToFile,
    isEmptyObject,
    convertUrlToBase64
} = require('./utils/functions.util');

module.exports = {
    
    asyncHandler,
    protect,
    authorize,
    isObject,
    isString,
    isArray,
    strToArray,
    strToArrayEs6,
    strIncludes,
    strIncludesEs6,
    dateToWord,
    dateToWordRaw,
    writeToFile,
    isEmptyObject,
    convertUrlToBase64
}