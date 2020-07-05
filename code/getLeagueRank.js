module.exports.function = function getLeagueRank (LeagueName, SeasonOneDepth, SeasonTwoDepth) {
  const myUtil = require('/utils/requestUtils.js');
  const console = require('console');
  const http = require('http');
  const fail = require('fail'); 
  let season;
  console.log(LeagueName);
  const GCPURL = "https://my-soccer-project-271006.appspot.com/rank";
  const BaseBallURL = "https://my-soccer-project-271006.appspot.com/baseBallRank"
  var SoccerRankJSON;
  var BaseBallRankJSON;
  const leagueArray = myUtil.getLeagueName(LeagueName);
  const league = leagueArray[0]; //mlb , epl
  const category = leagueArray[1]; //야구, 축구

  if(league == 'facup' || league == 'epl_cup'){
    throw fail.checkedError('FA 컵, EFL 컵은 리그가 아니여서 순위표가 없습니다. 시즌 검색을 통하여 경기를 확인하세요.', 'noSupportCup', {});
  }
  console.log(league);
  console.log(category);

  if(category == '축구'){
    console.log('축구입니다.');
    if(SeasonOneDepth == null || SeasonTwoDepth == null){
      throw fail.checkedError('시즌 입력이 잘못되었습니다. 이렇게 말해보세요. 2018 2019 시즌 프리미어리그 순위표 알려줘.', 'soccerSeasonError', {});
    }
    season = String(myUtil.getSeason(SeasonOneDepth, SeasonTwoDepth));
    
    var leagueName = season.substr(0,4) + ' ~ ' + season.substr(4,4) + ' 시즌 ' +LeagueName;
    SoccerRankJSON = http.getUrl(myUtil.requestUrlCreator2(GCPURL, league, season));
    return myUtil.getLeagueRankJSON(SoccerRankJSON, leagueName, league, category);

  }else if(category == '야구'){
    console.log('야구입니다.');
    if(SeasonOneDepth != null && SeasonTwoDepth != null){
      throw fail.checkedError('시즌 입력이 잘못되었습니다. 이렇게 말해보세요. 2018 시즌 메이저리그 순위표 알려줘.', 'BaseBallSeasonError', {});
    }
    if(myUtil.getDigit(SeasonOneDepth) == 2){
      SeasonOneDepth = '20'+String(SeasonOneDepth);
    }

    var leagueName = String(SeasonOneDepth) + ' 시즌 ' + LeagueName
    BaseBallRankJSON = http.getUrl(myUtil.requestUrlCreator2(BaseBallURL, league, SeasonOneDepth));
    return myUtil.getLeagueRankBaseBallJSON(BaseBallRankJSON, leagueName, league, category);
    
  }else{
    throw fail.checkedError('리그 이름을 다시 확인해주세요.', 'WrongLeagueName', {});
  }
  
}
