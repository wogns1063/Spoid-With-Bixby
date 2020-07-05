module.exports.function = function getPitcherBatRank (LeagueName, Position, SeasonOneDepth, SeasonTwoDepth) {
  const myUtil = require('/utils/requestUtils.js');
  const console = require('console');
  const http = require('http');
  const fail = require('fail'); 

  const BaseBallPlayerRankURL = "https://my-soccer-project-271006.appspot.com/baseBallPitcherRank";
  const SoccerPlayerRankURL = "https://my-soccer-project-271006.appspot.com/soccerPlayerRank";
  var soccerPlayerRankJSON;
  var pitBatRankJSON;
  const leagueArray = myUtil.getLeagueName(LeagueName);
  const league = leagueArray[0]; //mlb , epl
  const category = leagueArray[1]; //야구, 축구
  console.log(league);
  console.log(category);
  if(league == 'facup' || league == 'epl_cup'){
    throw fail.checkedError('FA 컵, EFL 컵은 리그가 아니여서 선수 순위표가 없습니다. 시즌 검색을 통하여 경기를 확인하세요.', 'noSupportCup', {});
  }
  if(category == '축구'){
    if(SeasonOneDepth == null || SeasonTwoDepth == null){
      throw fail.checkedError('시즌 입력이 잘못되었습니다. 이렇게 말해보세요. 2018 2019 시즌 프리미어리그 선수 순위표 알려줘.', 'soccerSeasonError', {});
    }

    season = myUtil.getSeason(SeasonOneDepth, SeasonTwoDepth);

    var text =  String(season).substr(0,4) + ' ~ ' +String(season).substr(4,4) + ' 시즌 ' + LeagueName + ' 선수 순위표 입니다.';
    soccerPlayerRankJSON = http.getUrl(myUtil.requestUrlCreator2(SoccerPlayerRankURL, league, season)); 
    return myUtil.getSoccerPlayerRankJSON(soccerPlayerRankJSON, text, Position);
  }else if(category == '야구'){
    if(myUtil.getDigit(SeasonOneDepth) == 2){
      SeasonOneDepth = "20"+String(SeasonOneDepth);
    }
    var text =  SeasonOneDepth + ' 시즌 ' + LeagueName + ' '+ Position + ' 순위표 입니다.';
    pitBatRankJSON = http.getUrl(myUtil.requestUrlCreator2(BaseBallPlayerRankURL, league, SeasonOneDepth)); 
    return myUtil.getPitBatRankJSON(pitBatRankJSON, league, text, Position);
  }else{
    console.log('리그 이름이 이상해')
  }
  
}
