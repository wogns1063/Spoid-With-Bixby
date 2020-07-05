module.exports.function = function getTeamNameDateTimeExpression (dateTimeExpression, SoccerTeamName ,LeagueName) {
  const myUtil = require('/utils/requestUtils.js');
  const console = require('console');
  const http = require('http');
  const fail = require('fail'); 
  var dates = require('dates');
  var resultArr = [];
  var SoccerInfoJSON;
  var jsonObj;
  var leagueArr;
  var whenStart;
  var whenEnd;


  const SOCCERGCPURL = "https://my-soccer-project-271006.appspot.com/soccerTeamSearch";

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

  SoccerInfoJSON = http.getUrl(myUtil.requestUrlCreator9(SOCCERGCPURL, SoccerTeamName, startDate, endDate));
  leagueArr = myUtil.getSoccerTeamLeagueName(SoccerInfoJSON);

  if(LeagueName == null && SoccerTeamName != null){
    for(var i = 0 ; i < leagueArr.length ; i++){
      var eachObj = {};
      eachObj['dateTimeExpression'] = dateTimeExpression;
      eachObj['LeagueName'] = leagueArr[i];
      eachObj['SoccerTeamName'] = SoccerTeamName;
      resultArr.push(eachObj);
    }
  }
  return resultArr;
}
