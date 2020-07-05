module.exports.function = function getTeamName (LeagueName, SoccerTeamName, FromYear, FromMonth, FromDay, ToYear, ToMonth, ToDay) {
  const myUtil = require('/utils/requestUtils.js');
  const console = require('console');
  const http = require('http');
  const fail = require('fail'); 
  var resultArr = [];
  var SoccerInfoJSON;
  var jsonObj;
  var leagueArr;

  const SOCCERGCPURL = "https://my-soccer-project-271006.appspot.com/soccerTeamSearch";

  if(myUtil.getDigit(FromYear) == 2){
    FromYear = "20"+String(FromYear);
  }
  if(myUtil.getDigit(ToYear) == 2){
    ToYear = "20"+String(ToYear);
  }
  const DateArray = myUtil.checkDate(FromYear, FromMonth, FromDay, ToYear, ToMonth, ToDay);
  const fromDate = DateArray[0];
  const ToDate = DateArray[1];
  SoccerInfoJSON = http.getUrl(myUtil.requestUrlCreator9(SOCCERGCPURL, SoccerTeamName, fromDate, ToDate));
  leagueArr = myUtil.getSoccerTeamLeagueName(SoccerInfoJSON);

  if(LeagueName == null && SoccerTeamName != null){
    for(var i = 0 ; i < leagueArr.length ; i++){
      var eachObj = {};
      eachObj['FromYear'] = FromYear;
      eachObj['FromMonth'] = FromMonth;
      eachObj['FromDay'] = FromDay;
      eachObj['ToYear'] = ToYear;
      eachObj['ToMonth'] = ToMonth;
      eachObj['ToDay'] = ToDay;
      eachObj['LeagueName'] = leagueArr[i];
      eachObj['SoccerTeamName'] = SoccerTeamName;
      resultArr.push(eachObj);
    }
  }
  return resultArr;
}

