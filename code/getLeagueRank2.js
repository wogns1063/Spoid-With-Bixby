module.exports.function = function getLeagueRank2 (LeagueName, Round, SeasonOneDepth, SeasonTwoDepth) {
  const myUtil = require('/utils/requestUtils.js');
  const console = require('console');
  const http = require('http');
  const fail = require('fail'); 
  let season;
  
  const GCPURL = "https://my-soccer-project-271006.appspot.com/rankDetail";
  var SoccerRankJSON;
  const leagueArray = myUtil.getLeagueName(LeagueName);
  const league = leagueArray[0]; //mlb , epl
  const category = leagueArray[1]; //야구, 축구
  var roundName;
  switch(String(Round)){
    case '32강':
      roundName = 32;
      break;
    case '16강':
      roundName = 16;
      break;
    case '8강':
      roundName = 8;
      break;
    case '4강':
      roundName = 4;
      break;
    case '준결승':
      roundName = 4;
      break;
    case '결승전':
      roundName = 1;
      break;
    case '결승':
      roundName = 1;
      break;
  }

  if(category == '축구'){
    console.log('축구입니다.');
    season = String(myUtil.getSeason(SeasonOneDepth, SeasonTwoDepth));

    var leagueName = season.substr(0,4) + ' ~ ' + season.substr(4,4) + ' 시즌 ' + LeagueName;
    SoccerRankJSON = http.getUrl(myUtil.requestUrlCreator4(GCPURL, league, season, roundName));
    return myUtil.getLeagueRankJSON2(SoccerRankJSON, leagueName, league, roundName, Round);
    
  }else if(category == '야구'){
    console.log('야구입니다.');
    throw fail.checkedError('야구에는 32강, 16강, 8강 등이 없습니다.', 'notSupportBaseball', {});
  }else{
    throw fail.checkedError('리그 이름을 다시 확인해주세요. 유로파리그, 챔피언스리그만 32강, 16강, 8강 4강이 있습니다.', 'WrongLeagueName2', {});
  }
}
