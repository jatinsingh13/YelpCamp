//we wrap the function into another function
//the function accepts the function and thenn calls the function that catches any error and passes it to next.


module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}