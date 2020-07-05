module.exports.function = function getTeamNameSeason (LeagueName, SeasonOneDepth, SeasonTwoDepth, SoccerTeamName) {
  const myUtil = require('/utils/requestUtils.js');
  const console = require('console');
  const http = require('http');
  const fail = require('fail'); 
  var resultArr = [];
  var SoccerInfoJSON;
  var jsonObj;
  var leagueArr;
  var season;

  const SOCCERGCPURL = "https://my-soccer-project-271006.appspot.com/soccerTeamSearchSeason";

  season = myUtil.getSeason(SeasonOneDepth, SeasonTwoDepth);
    
  if(Number(String(season).substr(0,4)) < 2010){
    throw fail.checkedError('2010년 이후의 경기 정보만 제공합니다.', 'notSupportYear', {})
  }

  SoccerInfoJSON = http.getUrl(myUtil.requestUrlCreator10(SOCCERGCPURL, season, SoccerTeamName));
  leagueArr = myUtil.getSoccerTeamLeagueName(SoccerInfoJSON);

  if(LeagueName == null && SoccerTeamName != null){
    for(var i = 0 ; i < leagueArr.length ; i++){
      var eachObj = {};
      eachObj['SeasonOneDepth'] = SeasonOneDepth;
      eachObj['SeasonTwoDepth'] = SeasonTwoDepth;
      eachObj['LeagueName'] = leagueArr[i];
      eachObj['SoccerTeamName'] = SoccerTeamName;
      resultArr.push(eachObj);
    }
  }
  return resultArr;
}
