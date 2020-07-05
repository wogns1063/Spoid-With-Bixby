module.exports.function = function getBaseBallGameDetail (Category, GameId) {
  const myUtil = require('/utils/requestUtils.js');
  const console = require('console');
  const http = require('http');
  const fail = require('fail'); 

  console.log(GameId);

  const BaseBallURL = "https://my-soccer-project-271006.appspot.com/baseBallDetail"
  var BaseBallDetail;

  if(Category == '축구'){
    console.log('축구입니다.')
  }else if(Category == '야구'){
    console.log('야구입니다.')
    BaseBallDetail = http.getUrl(myUtil.requestUrlCreator5(BaseBallURL, GameId));
    return myUtil.getBaseBallDetail(BaseBallDetail, GameId);
  }
}
