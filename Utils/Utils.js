
module.exports.getCurrentOrFutureTimeInMS = function(seconds = 0, miliseconds = 0){
    const d = new Date();
    const s = Math.round(d.getTime() + ( seconds * 1000) + miliseconds);

    return s;
}