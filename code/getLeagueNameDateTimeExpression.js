module.exports.function = function getLeagueNameDateTimeExpression (dateTimeExpression, BaseballTeamName, SoccerTeamName ,LeagueName) {
  const myUtil = require('/utils/requestUtils.js');
  const console = require('console');
  const http = require('http');
  const fail = require('fail');
  var dates = require('dates');
  if(LeagueName == null && BaseballTeamName != null && SoccerTeamName == null){
    LeagueName = myUtil.getBaseBallLeagueName(BaseballTeamName);
  }
  const leagueArray = myUtil.getLeagueName(LeagueName);
  const league = leagueArray[0]; //mlb , epl
  const category = leagueArray[1]; //야구, 축구
  const GCPURL = "https://my-soccer-project-271006.appspot.com/soccerDate";
  const BASEBALLGCPURL = "https://my-soccer-project-271006.appspot.com/baseBallDate";
  var BasseBallInfoJSON;
  var SoccerInfoJSON;
  var whenStart;
  var whenEnd;
  let season;
  
  
  if (dateTimeExpression.date) {
    console.log('1');
    whenStart = dates.ZonedDateTime.fromDate(dateTimeExpression.date);
    whenEnd = whenStart.withHour(23).withMinute(59).withSecond(59);
  }
  else if (dateTimeExpression.dateInterval) {
    console.log('2');
    whenStart = dates.ZonedDateTime.of(
      dateTimeExpression.dateInterval.start.year,
      dateTimeExpression.dateInterval.start.month,
      dateTimeExpression.dateInterval.start.day);
    whenEnd = dates.ZonedDateTime.of(
      dateTimeExpression.dateInterval.end.year,
      dateTimeExpression.dateInterval.end.month,
      dateTimeExpression.dateInterval.end.day,
      23, 59, 59);
  }
  else if (dateTimeExpression.dateTimeInterval) {
    console.log('3');
    whenStart = dates.ZonedDateTime.of(
      dateTimeExpression.dateTimeInterval.start.date.year,
      dateTimeExpression.dateTimeInterval.start.date.month,
      dateTimeExpression.dateTimeInterval.start.date.day,
      dateTimeExpression.dateTimeInterval.start.time.hour,
      dateTimeExpression.dateTimeInterval.start.time.minute,
      dateTimeExpression.dateTimeInterval.start.time.second);
    whenEnd = dates.ZonedDateTime.of(
      dateTimeExpression.dateTimeInterval.end.date.year,
      dateTimeExpression.dateTimeInterval.end.date.month,
      dateTimeExpression.dateTimeInterval.end.date.day,
      dateTimeExpression.dateTimeInterval.end.time.hour,
      dateTimeExpression.dateTimeInterval.end.time.minute,
      dateTimeExpression.dateTimeInterval.end.time.second);
  }

  var start = whenStart.toIsoString();
  var end = whenEnd.toIsoString();
  console.log(start);
  console.log(end)

  var startYear = whenStart.getYear();
  var startMonth = myUtil.handlingGetDate(whenStart.getMonth(), 2);
  var startDay = myUtil.handlingGetDate(whenStart.getDay(), 2);
  var endYear = whenEnd.getYear();
  var endMonth = myUtil.handlingGetDate(whenEnd.getMonth(), 2);
  var endDay = myUtil.handlingGetDate(whenEnd.getDay(), 2);
  var startDate = String(startYear)+String(startMonth)+String(startDay);
  var endDate = String(endYear)+String(endMonth)+String(endDay);
  console.log(startDate); 
  console.log(endDate); 

  if(category == '축구'){
    season = myUtil.getLeagueSeason(league, whenStart.getYear(), whenStart.getMonth());

    // SoccerInfoJSON = http.getUrl(myUtil.requestUrlCreator(GCPURL, league, startDate, endDate)); //(url, leagueName, season, fromDate, toDate)
    // return myUtil.getJSONData(SoccerInfoJSON, category);
    if(SoccerTeamName == null){
      var answer = '요청하신 날짜의 ' + LeagueName + ' 경기 결과입니다.';
      SoccerInfoJSON = http.getUrl(myUtil.requestUrlCreator(GCPURL, league, startDate, endDate)); 
      return myUtil.getJSONData(SoccerInfoJSON, category, answer);
    }else{
      var answer = '요청하신 날짜의 ' + LeagueName + ' ' + SoccerTeamName + ' 경기 결과입니다.';
      SoccerInfoJSON = http.getUrl(myUtil.requestUrlCreator6(GCPURL, SoccerTeamName,league, startDate, endDate)); 
      return myUtil.getJSONData(SoccerInfoJSON, category, answer);
    }
  }else if(category == '야구'){
    // BasseBallInfoJSON = http.getUrl(myUtil.requestUrlCreator3(BASEBALLGCPURL, league, startYear ,startDate, endDate)); 
    // return myUtil.getBaseBallJSONData(BasseBallInfoJSON, category);
    if(LeagueName != null && BaseballTeamName == null){
      var answer = '요청하신 날짜의 ' + LeagueName + ' 경기 결과입니다.';
      BasseBallInfoJSON = http.getUrl(myUtil.requestUrlCreator3(BASEBALLGCPURL, league, startYear ,startDate, endDate)); 
      return myUtil.getBaseBallJSONData(BasseBallInfoJSON, category, answer);
    }else if(LeagueName != null && BaseballTeamName != null){
      var answer = '요청하신 날짜의 ' + LeagueName + ' ' + BaseballTeamName + ' 경기 결과입니다.';
      BasseBallInfoJSON = http.getUrl(myUtil.requestUrlCreator8(BASEBALLGCPURL,BaseballTeamName, league, startYear ,startDate, endDate)); 
      return myUtil.getBaseBallJSONData(BasseBallInfoJSON, category, answer);
    }else if(LeagueName == null && BaseballTeamName != null){
      var answer = '요청하신 날짜의 ' + LeagueName + ' ' + BaseballTeamName + ' 경기 결과입니다.';
      BasseBallInfoJSON = http.getUrl(myUtil.requestUrlCreator8(BASEBALLGCPURL,BaseballTeamName, league, startYear ,startDate, endDate)); 
      return myUtil.getBaseBallJSONData(BasseBallInfoJSON, category, answer);
    }
  }else{
    throw fail.checkedError('리그 이름을 다시 확인해주세요.', 'WrongLeagueName', {});
  }
  
}
