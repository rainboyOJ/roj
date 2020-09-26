
module.exports = function(object){
  return new URLSearchParams(object).toString();
}
