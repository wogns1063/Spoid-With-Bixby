module.exports.function = function getLeagueNameSeason (LeagueName, BaseballTeamName, SoccerTeamName ,SeasonOneDepth, SeasonTwoDepth) {
  const myUtil = require('/utils/requestUtils.js');
  const console = require('console');
  const http = require('http');
  const fail = require('fail'); 
  let season;
  
  const GCPURL = "https://my-soccer-project-271006.appspot.com/soccerSeason";
  var SoccerInfoJSON;
  var BasseBallInfoJSON;

  if(LeagueName == null && BaseballTeamName != null && SoccerTeamName == null){
    LeagueName = myUtil.getBaseBallLeagueName(BaseballTeamName);
  }
  const leagueArray = myUtil.getLeagueName(LeagueName);
  const league = leagueArray[0]; //mlb , epl
  const category = leagueArray[1]; //야구, 축구
  
  console.log(league);
  console.log(category);



  if(category == '축구'){
    console.log('축구입니다.');
    if(SeasonOneDepth == null || SeasonTwoDepth == null){
      throw fail.checkedError('시즌 입력이 잘못되었습니다. 이렇게 말해보세요. 2018 2019 시즌 프리미어리그 순위표 알려줘.', 'soccerSeasonError', {});
    }
      
    season = myUtil.getSeason(SeasonOneDepth, SeasonTwoDepth);
    
    if(Number(String(season).substr(0,4)) < 2010){
      throw fail.checkedError('2010년 이후의 경기 정보만 제공합니다.', 'notSupportYear', {})
    }
    // SoccerInfoJSON = http.getUrl(myUtil.requestUrlCreator2(GCPURL, league, season));
    // return myUtil.getJSONData(SoccerInfoJSON, category);
    if(SoccerTeamName == null){
      var answer = SeasonOneDepth + ' ~ ' + SeasonTwoDepth + ' 시즌 ' + LeagueName + ' 경기 결과입니다.';
      SoccerInfoJSON = http.getUrl(myUtil.requestUrlCreator2(GCPURL, league, season)); 
      return myUtil.getJSONData(SoccerInfoJSON, category, answer);
    }else{
      var answer = SeasonOneDepth + ' ~ ' + SeasonTwoDepth + ' 시즌 ' + LeagueName + ' ' + SoccerTeamName +' 경기 결과입니다.';
    
      SoccerInfoJSON = http.getUrl(myUtil.requestUrlCreator7(GCPURL, league, SoccerTeamName,season)); 
      return myUtil.getJSONData(SoccerInfoJSON, category, answer);
    }
  }else if(category == '야구'){
    if(SeasonOneDepth != null && SeasonTwoDepth != null){
      throw fail.checkedError('시즌 입력이 잘못되었습니다. 이렇게 말해보세요. 2018 시즌 메이저리그 순위표 알려줘.', 'BaseBallSeasonError', {});
    }
    var season = "";
    if(myUtil.getDigit(SeasonOneDepth) == 2){
      // 16 시즌
      season = "20" + String(SeasonOneDepth);
    }else if(myUtil.getDigit(SeasonOneDepth) == 4){
      // 2016 시즌
      season = String(SeasonOneDepth);
    }else if(myUtil.getDigit(SeasonOneDepth) == 1){
      // 09 시즌
      season = "200" + String(SeasonOneDepth);
    }else{
      throw fail.checkedError('년도를 다시 확인해주세요.', 'WrongYear', {});
    }
    if(Number(season) < 2010){
      throw fail.checkedError('2010년 이후의 경기 정보만 제공합니다.', 'notSupportYear', {})
    }
    // BasseBallInfoJSON = http.getUrl(myUtil.requestUrlCreator2(GCPURL, league, season));
    // return myUtil.getBaseBallJSONData(BasseBallInfoJSON, category);
    if(LeagueName != null && BaseballTeamName == null){
      var answer = SeasonOneDepth + ' 시즌 ' + LeagueName + ' 경기 결과입니다.';
      BasseBallInfoJSON = http.getUrl(myUtil.requestUrlCreator2(GCPURL, league, season)); 
      return myUtil.getBaseBallJSONData(BasseBallInfoJSON, category, answer);
    }else if(LeagueName != null && BaseballTeamName != null){
      var answer = SeasonOneDepth + ' 시즌 ' + LeagueName + ' ' + BaseballTeamName + ' 경기 결과입니다.';
      BasseBallInfoJSON = http.getUrl(myUtil.requestUrlCreator7(GCPURL, league, BaseballTeamName, season)); 
      return myUtil.getBaseBallJSONData(BasseBallInfoJSON, category, answer);
    }else if(LeagueName == null && BaseballTeamName != null){
      var answer = SeasonOneDepth + ' 시즌 ' + LeagueName + ' ' + BaseballTeamName + ' 경기 결과입니다.';
      BasseBallInfoJSON = http.getUrl(myUtil.requestUrlCreator7(GCPURL, league, BaseballTeamName, season)); 
      return myUtil.getBaseBallJSONData(BasseBallInfoJSON, category, answer);
    }
  }else{
    throw fail.checkedError('리그 이름을 다시 확인해주세요.', 'WrongLeagueName', {});
  }
  
}
