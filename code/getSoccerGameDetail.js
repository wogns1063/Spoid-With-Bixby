module.exports.function = function getSoccerGameDetail (GameId, Category) {
  const myUtil = require('/utils/requestUtils.js');
  const console = require('console');
  const http = require('http');
  const fail = require('fail'); 

  console.log(GameId);

  const SoccerURL = "https://my-soccer-project-271006.appspot.com/gameDetail"
  var SoccerGameDetail;

  if(Category == '축구'){
    
    console.log('축구입니다.')
    SoccerGameDetail = http.getUrl(myUtil.requestUrlCreator5(SoccerURL, GameId));
    return myUtil.getSoccerGameDetail(SoccerGameDetail);

  }else if(Category == '야구'){
    console.log('야구입니다.')
  }
}
