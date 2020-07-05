module.exports.function = function getPitcherDetail (GameId) {
  const myUtil = require('/utils/requestUtils.js');
  const console = require('console');
  const http = require('http');
  const fail = require('fail'); 

  console.log(GameId);

  const BaseBallURL = "https://my-soccer-project-271006.appspot.com/baseBallDetail"
  var BaseBallDetail;


  BaseBallDetail = http.getUrl(myUtil.requestUrlCreator5(BaseBallURL, GameId));
  return myUtil.getBaseBallDetail(BaseBallDetail, GameId);
}
