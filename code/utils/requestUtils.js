module.exports = {
  handlingGetData: function(LeagueName,SoccerTeamName, BaseballTeamName,FromYear, FromMonth, FromDay, ToYear, ToMonth, ToDay){
    const http = require('http');
    const console = require('console');
    const fail = require('fail'); 
    const currentYear;
    const currentMonth;
    var SoccerInfoJSON;
    var BasseBallInfoJSON;
    console.log(BaseballTeamName);
    const SOCCERGCPURL = "https://my-soccer-project-271006.appspot.com/soccerDate";
    const BASEBALLGCPURL = "https://my-soccer-project-271006.appspot.com/baseBallDate";
    if(this.getDigit(FromYear) == 2){
      FromYear = "20"+String(FromYear);
    }
    if(this.getDigit(ToYear) == 2){
      ToYear = "20"+String(ToYear);
    }
    if(LeagueName == null && BaseballTeamName != null && SoccerTeamName == null){
      LeagueName = this.getBaseBallLeagueName(BaseballTeamName);
    }
    const leagueArray = this.getLeagueName(LeagueName);
    const league = leagueArray[0];
    const category = leagueArray[1];
    const DateArray = this.checkDate(FromYear, FromMonth, FromDay, ToYear, ToMonth, ToDay);
    console.log(DateArray);
    const fromDate = DateArray[0];
    const ToDate = DateArray[1];
    if(category == '축구'){
      // console.log('축구입니다.');
      // console.log(this.requestUrlCreator(SOCCERGCPURL, league, fromDate, ToDate));
      if(SoccerTeamName == null){
        var answer = '요청하신 날짜의 ' + LeagueName + ' 경기 결과입니다.';
        SoccerInfoJSON = http.getUrl(this.requestUrlCreator(SOCCERGCPURL, league, fromDate, ToDate)); 
        return this.getJSONData(SoccerInfoJSON, category, answer);
      }else{
        var answer = '요청하신 날짜의 ' + LeagueName + ' ' + SoccerTeamName + ' 경기 결과입니다.';
        SoccerInfoJSON = http.getUrl(this.requestUrlCreator6(SOCCERGCPURL, SoccerTeamName,league, fromDate, ToDate)); 
        return this.getJSONData(SoccerInfoJSON, category, answer);
      }
      
    }else if(category == '야구'){
      console.log('야구입니다.');
      var BaseBallSeason = fromDate.substr(0,4);
      console.log(this.requestUrlCreator3(BASEBALLGCPURL, league, BaseBallSeason ,fromDate, ToDate));
      if(LeagueName != null && BaseballTeamName == null){
        var answer = '요청하신 날짜의 ' + LeagueName + ' 경기 결과입니다.';
        BasseBallInfoJSON = http.getUrl(this.requestUrlCreator3(BASEBALLGCPURL, league, BaseBallSeason ,fromDate, ToDate)); 
        return this.getBaseBallJSONData(BasseBallInfoJSON, category, answer);
      }else if(LeagueName != null && BaseballTeamName != null){
        var answer = '요청하신 날짜의 ' + LeagueName + ' ' + BaseballTeamName + ' 경기 결과입니다.';
        BasseBallInfoJSON = http.getUrl(this.requestUrlCreator8(BASEBALLGCPURL,BaseballTeamName, league, BaseBallSeason ,fromDate, ToDate)); 
        return this.getBaseBallJSONData(BasseBallInfoJSON, category, answer);
      }else if(LeagueName == null && BaseballTeamName != null){
        var answer = '요청하신 날짜의 ' + LeagueName + ' ' + BaseballTeamName + ' 경기 결과입니다.';
        BasseBallInfoJSON = http.getUrl(this.requestUrlCreator8(BASEBALLGCPURL,BaseballTeamName, league, BaseBallSeason ,fromDate, ToDate)); 
        return this.getBaseBallJSONData(BasseBallInfoJSON, category, answer);
      }
      
    }else{
      throw fail.checkedError('리그 이름을 다시 확인해주세요.', 'WrongLeagueName', {});
    }
  },
  getLeagueName: function(LeagueName){
    var league;
    var category;
    var array = [];
    switch(String(LeagueName))
    { 
      case "프리미어리그":
        league = 'epl';
        category = '축구';
        break;
      case "라리가":
        league = 'primera'
        category = '축구';
        break;
      case "분데스리가":
        league = 'bundesliga';
        category = '축구';
        break;
      case "세리에 A":
        league = 'seriea';
        category = '축구';
        break;
      case "리그 원":
        league = 'ligue1';
        category = '축구';
        break;
      case "챔피언스리그":
        league = 'uefacl';
        category = '축구';
        break;
      case "유로파리그":
        league = 'uefacup'
        category = '축구';
        break;
      case "FA 컵":
        league = 'facup'
        category = '축구';
        break;
      case "EFL 컵":
        league = 'epl_cup'
        category = '축구';
        break;
      case "에레디비시":
        league = 'eredivisie'
        category = '축구';
        break;
      case '메이저리그':
        league = 'mlb';
        category = '야구';
        break;
      case '일본프로야구':
        league = 'npb';
        category = '야구';
        break;
    }
    array.push(league); 
    array.push(category);
    return array;
  },
  handlingGetDate: function(n, digits){
     var zero = '';
     n = String(n);

    if (n.length < digits) {
     for (var i = 0; i < digits - n.length; i++)
      zero += '0';
    }
    return zero + n;
  },
  requestUrlCreator: function(url, leagueName, fromDate, toDate) {
    const http = require('http')
    const query = http.makeQueryString({
      "leagueName": leagueName,
      "fromDate": fromDate,
      "toDate": toDate
    })
    return url+"?"+query;
  },
  requestUrlCreator2: function(url, leagueName, season) {
    const http = require('http')
    const query = http.makeQueryString({
      "leagueName": leagueName,
      "season": season,
    })
    return url+"?"+query;
  },
  requestUrlCreator3: function(url, leagueName, season, fromDate, toDate) {
    const http = require('http')
    const query = http.makeQueryString({
      "leagueName": leagueName,
      "season": season,
      "fromDate" : fromDate,
      "toDate" : toDate
    })
    return url+"?"+query;
  },
  requestUrlCreator4 : function(url, leagueName, season, roundName){
    const http = require('http')
    const query = http.makeQueryString({
      "leagueName": leagueName,
      "season": season,
      "roundName" : roundName
    })
    return url+"?"+query;
  },
  requestUrlCreator5 : function(url, gameId){
    const http = require('http')
    const query = http.makeQueryString({
      "gameId": gameId
    })
    return url+"?"+query;
  },
  requestUrlCreator6: function(url, teamName, leagueName, fromDate, toDate) {
    const http = require('http')
    const query = http.makeQueryString({
      "leagueName": leagueName,
      "teamName": teamName,
      "fromDate": fromDate,
      "toDate": toDate
    })
    return url+"?"+query;
  },
  requestUrlCreator7: function(url, leagueName,teamName, season) {
    const http = require('http')
    const query = http.makeQueryString({
      "leagueName": leagueName,
      "teamName": teamName,
      "season": season
    })
    return url+"?"+query;
  },
  requestUrlCreator8: function(url, teamName, leagueName, season,fromDate, toDate) {
    const http = require('http')
    const query = http.makeQueryString({
      "leagueName": leagueName,
      "teamName": teamName,
      "season": season,
      "fromDate": fromDate,
      "toDate": toDate
    })
    return url+"?"+query;
  },
  requestUrlCreator9: function(url, teamName, fromDate, toDate) {
    const http = require('http')
    const query = http.makeQueryString({
      "leagueName": "epl,primera,bundesliga,seriea,ligue1,eredivisie,uefacl,uefacup,epl_cup,facup",
      "teamName": teamName,
      "fromDate": fromDate,
      "toDate": toDate
    })
    return url+"?"+query;
  },
  requestUrlCreator10: function(url, season, teamName) {
    const http = require('http')
    const query = http.makeQueryString({
      "leagueName": "epl,primera,bundesliga,seriea,ligue1,eredivisie,uefacl,uefacup,epl_cup,facup",
      "teamName": teamName,
      "season": season
    })
    return url+"?"+query;
  },
  getSoccerTeamLeagueName: function(SoccerInfoJSON){
    const console = require('console');
    var jsonObj = JSON.parse(SoccerInfoJSON);

    var soccerLeagueArr = ['EPL', 'PRIMERA', 'BUNDESLIGA', 'SERIEA', 'LIGUE1', 'EREDIVISIE', 'UEFACL', 'UEFACUP', 'EPL_CUP', 'FACUP'];
    var matchDateArray = [];
    var resultArray = [];
    var finalResultArr = [];

    for(var i = 0 ; i < Object.keys(jsonObj['schedule']).length ; i++)
    {
        matchDateArray.push(Object.keys(jsonObj['schedule'])[i]);
    }

    matchDateArray = matchDateArray.reverse()

    for(var i = 0 ; i < matchDateArray.length; i++)
    {
      for(var j = 0 ; j < jsonObj['schedule'][matchDateArray[i]].length; j++)
      {
        for(var k = 0 ; k < soccerLeagueArr.length ; k++){
          if(jsonObj['schedule'][matchDateArray[i]][j]['leagueCode'] == soccerLeagueArr[k]){
            resultArray.push(soccerLeagueArr[k]);
            soccerLeagueArr.splice(k,1);
            break;
          }
        }
      }
    }
    
    for(var i = 0 ; i < resultArray.length ; i++){
      if(resultArray[i] == 'EPL'){
        finalResultArr.push('프리미어리그');
      }else if(resultArray[i] == 'PRIMERA'){
        finalResultArr.push('라리가');
      }else if(resultArray[i] == 'BUNDESLIGA'){
        finalResultArr.push('분데스리가');
      }else if(resultArray[i] == 'SERIEA'){
        finalResultArr.push('세리에 A');
      }else if(resultArray[i] == 'LIGUE1'){
        finalResultArr.push('리그 원');
      }else if(resultArray[i] == 'EREDIVISIE'){
        finalResultArr.push('에레디비시');
      }else if(resultArray[i] == 'UEFACL'){
        finalResultArr.push('챔피언스리그');
      }else if(resultArray[i] == 'UEFACUP'){
        finalResultArr.push('유로파리그');
      }else if(resultArray[i] == 'EPL_CUP'){
        finalResultArr.push('EFL 컵');
      }else if(resultArray[i] == 'FACUP'){
        finalResultArr.push('FA 컵');
      }
    }

    return finalResultArr;
  },
  getJSONData: function(SoccerInfoJSON, category, answer){
    const console = require('console');
    var jsonObj = JSON.parse(SoccerInfoJSON);
    console.log(jsonObj);
    const fail = require('fail'); 
    
    var matchDateArray = [];
    var resultArray = [];

    for(var i = 0 ; i < Object.keys(jsonObj['schedule']).length ; i++)
    {
        matchDateArray.push(Object.keys(jsonObj['schedule'])[i]);
    }

    matchDateArray = matchDateArray.reverse()

    for(var i = 0 ; i < matchDateArray.length; i++)
    {
        for(var j = 0 ; j < jsonObj['schedule'][matchDateArray[i]].length; j++)
        {
          var eachObj = {}
          eachObj['Check2'] = '축구';
          eachObj['Category'] = category;
          eachObj['Answer'] = answer;
          eachObj['HomeTeamName'] = jsonObj['schedule'][matchDateArray[i]][j]['homeTeamName'];
          eachObj['AwayTeamName'] = jsonObj['schedule'][matchDateArray[i]][j]['awayTeamName'];
          eachObj['HomeScore'] = jsonObj['schedule'][matchDateArray[i]][j]['homeResult'];
          eachObj['AwayScore'] = jsonObj['schedule'][matchDateArray[i]][j]['awayResult'];
          eachObj['FieldName'] = jsonObj['schedule'][matchDateArray[i]][j]['fieldName'];
          eachObj['HomeTeamImageUrl'] = jsonObj['schedule'][matchDateArray[i]][j]['homeTeamImageUrl'];
          eachObj['AwayTeamImageUrl'] = jsonObj['schedule'][matchDateArray[i]][j]['awayTeamImageUrl'];
          eachObj['HomeShootOut'] = jsonObj['schedule'][matchDateArray[i]][j]['homeShootout'];
          eachObj['AwayShootOut'] = jsonObj['schedule'][matchDateArray[i]][j]['awayShootout'];
          eachObj['SeasonName'] = jsonObj['schedule'][matchDateArray[i]][j]['seasonName'];
          if(jsonObj['schedule'][matchDateArray[i]][j]['gameDetailType'] != null){
            if(jsonObj['schedule'][matchDateArray[i]][j]['gameDetailType']['nameKo'] == '32강' || jsonObj['schedule'][matchDateArray[i]][j]['gameDetailType']['nameKo'] == '16강' || jsonObj['schedule'][matchDateArray[i]][j]['gameDetailType']['nameKo'] == '8강' || jsonObj['schedule'][matchDateArray[i]][j]['gameDetailType']['nameKo'] == '준결승' || jsonObj['schedule'][matchDateArray[i]][j]['gameDetailType']['nameKo'] == '결승'){
              eachObj['GameRound'] = jsonObj['schedule'][matchDateArray[i]][j]['gameDetailType']['nameKo'];
            }else{
              eachObj['GameRound'] = String(jsonObj['schedule'][matchDateArray[i]][j]['roundSeq']) + 'R';
            }
          }else{
            eachObj['GameRound'] = String(jsonObj['schedule'][matchDateArray[i]][j]['roundSeq']) + 'R';
          }
          eachObj['GameId'] = jsonObj['schedule'][matchDateArray[i]][j]['gameId'];
          eachObj['HomeTeamId'] = jsonObj['schedule'][matchDateArray[i]][j]['homeTeamId'];
          eachObj['AwayTeamId'] = jsonObj['schedule'][matchDateArray[i]][j]['awayTeamId'];
          if(jsonObj['schedule'][matchDateArray[i]][j]['gameStatus'] == 'CANCEL')
          {
            eachObj['GameStatus'] = '경기취소';
          }else if(jsonObj['schedule'][matchDateArray[i]][j]['gameStatus'] == 'END')
          {
            eachObj['Check'] = 'exists';
            eachObj['GameStatus'] = '종료';
          }else if(jsonObj['schedule'][matchDateArray[i]][j]['gameStatus'] == 'POSTPONE'){
            eachObj['GameStatus'] = '연기';
          }else if(jsonObj['schedule'][matchDateArray[i]][j]['gameStatus'] == 'BEFORE'){
            eachObj['GameStatus'] = '경기전';
          }else if(jsonObj['schedule'][matchDateArray[i]][j]['gameStatus'] == 'PLAY'){
            eachObj['Check'] = 'exists';
            eachObj['GameStatus'] = '경기중';
          }
          var tmp,tmp2="";
          var year = jsonObj['schedule'][matchDateArray[i]][j]['startDate'].substr(0,4)//20200301
          var month = jsonObj['schedule'][matchDateArray[i]][j]['startDate'].substr(4,2)//20200301
          var day = jsonObj['schedule'][matchDateArray[i]][j]['startDate'].substr(6,2)//20200301
          tmp = year + "년"+ " " + month + "월"+ " " + day + "일";
          eachObj['MatchDate'] = tmp;
          var hour = jsonObj['schedule'][matchDateArray[i]][j]['startTime'].substr(0,2); //0133
          var minute= jsonObj['schedule'][matchDateArray[i]][j]['startTime'].substr(2);
          tmp2 = hour + ":" + minute;
          eachObj['MatchTime'] = tmp2;
          resultArray.push(eachObj);
        }
      }
      console.log(resultArray)
      return resultArray;
    },
    getDigit: function(num) {
      num = String(num);
      var i=0;
      while(num[i]) { i++; };
      return i;
    },
    checkDate: function(FromYear, FromMonth, FromDay, ToYear, ToMonth, ToDay) {
      const fail = require('fail'); 
      const console = require('console');
      var dates = require('dates');
      var now = dates.ZonedDateTime.now();
      var whenStart = now.minusDays(7);
      var whenEnd = now.plusDays(7);
      if(FromYear == null && FromMonth == null && FromDay != null && ToYear == null && ToMonth == null && ToDay == null){
        // ex) 12일 프리미어리그 경기 알려줘.
        FromYear = now.getYear();
        FromMonth = this.handlingGetDate(now.getMonth(), 2);
        var fromDate = String(FromYear) + String(FromMonth) + this.handlingGetDate(FromDay,2);
        var ToDate = fromDate;
      }
      else if(FromYear != null && FromMonth != null && FromDay != null && ToYear == null && ToMonth == null && ToDay == null )
      {
        // ex) 2019년 3월 1일 프리미어리그 경기 보여줘.
        let fromDate = String(FromYear)+this.handlingGetDate(FromMonth,2)+this.handlingGetDate(FromDay,2);
        let ToDate = fromDate;
      }
      else if(FromYear != null && FromMonth != null && FromDay == null && ToYear == null && ToMonth == null && ToDay == null)
      {
        // ex) 2020년 3월 프리미어리그 경기 보여줘.
        FromDay = 1;
        ToYear = FromYear;
        ToMonth = FromMonth;
        var last = new Date(ToYear, ToMonth);
        last = new Date(last-1);
        ToDay = last.getDate();
        let fromDate = String(FromYear)+this.handlingGetDate(FromMonth,2)+this.handlingGetDate(FromDay,2);
        let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
      }
      else if(FromYear != null && FromMonth != null && ToYear != null && ToMonth != null && FromDay == null && ToDay == null)
      {
        // ex) 2019년 8월부터 2020년 3월까지 프리미어리그 경기 보여줘.
        FromDay = 1;
        // ToDay = 1;
        var last = new Date(ToYear, ToMonth);
        last = new Date(last-1);
        ToDay = last.getDate();
        let fromDate = String(FromYear)+this.handlingGetDate(FromMonth,2)+this.handlingGetDate(FromDay,2);
        let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
      }
      else if(FromYear != null && FromMonth != null && FromDay != null && ToYear != null && ToMonth != null && ToDay == null)
      {
        // ex) 2019년 8월 1일부터 2020년 3월까지 프리미어리그 경기 보여줘.
        var last = new Date(ToYear, ToMonth);
        last = new Date(last-1);
        ToDay = last.getDate();
        let fromDate = String(FromYear)+this.handlingGetDate(FromMonth,2)+this.handlingGetDate(FromDay,2);
        let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
      }
      else if(FromYear != null && FromMonth != null && FromDay == null && ToYear != null && ToMonth != null && ToDay != null)
      {
        // ex) 2019년 8월부터 2020년 3월 1일까지 프리미어리그 경기 보여줘.
        FromDay = 1;
        let fromDate = String(FromYear)+this.handlingGetDate(FromMonth,2)+this.handlingGetDate(FromDay,2);
        let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
      }
      else if(FromYear != null && FromMonth != null && FromDay != null && ToYear != null && ToMonth != null && ToDay != null)
      {
        // ex) 2018년 8월 1일부터 2019년 3월 1일까지 프리미어리그 경기 보여줘.
        let fromDate = String(FromYear)+this.handlingGetDate(FromMonth,2)+this.handlingGetDate(FromDay,2);
        let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
      }
      // 연도 생략 시 현재 연도로 자동 입력
      else if(FromYear == null && FromMonth != null && FromDay != null && ToYear == null && ToMonth == null && ToDay == null )
      {
        // ex) 3월 1일 프리미어리그 경기 보여줘.
        var CurrentYear = new Date();
        FromYear = CurrentYear.getFullYear();
        let fromDate = String(FromYear)+this.handlingGetDate(FromMonth,2)+this.handlingGetDate(FromDay,2);
        let ToDate = fromDate;
      }
      else if(FromYear == null && FromMonth != null && FromDay == null && ToYear == null && ToMonth == null && ToDay == null)
      {
        // ex) 3월 프리미어리그 경기 보여줘.
        var CurrentYear = new Date();
        FromYear = CurrentYear.getFullYear();
        FromDay = 1;
        ToYear = FromYear;
        ToMonth = FromMonth;
        var last = new Date(ToYear, ToMonth);
        last = new Date(last-1);
        ToDay = last.getDate();
        let fromDate = String(FromYear)+this.handlingGetDate(FromMonth,2)+this.handlingGetDate(FromDay,2);
        let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
      }
      else if(FromYear == null && FromMonth != null && ToYear == null && ToMonth != null && FromDay == null && ToDay == null)
      {
        // ex) 8월부터 3월까지 프리미어리그 경기 보여줘.
        var CurrentYear = new Date();
        FromYear = CurrentYear.getFullYear();
        FromDay = 1;
        // ToDay = 1;
        if(FromMonth <= ToMonth) {
          ToYear = FromYear;
        }else{
          ToYear = FromYear + 1;
        }
        var last = new Date(ToYear, ToMonth);
        last = new Date(last-1);
        ToDay = last.getDate();
        let fromDate = String(FromYear)+this.handlingGetDate(FromMonth,2)+this.handlingGetDate(FromDay,2);
        let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
      }
      else if(FromYear == null && FromMonth != null && FromDay != null && ToYear == null && ToMonth != null && ToDay == null)
      {
        // ex) 8월 1일부터 3월까지 프리미어리그 경기 보여줘.
        var CurrentYear = new Date();
        FromYear = CurrentYear.getFullYear();
        if(FromMonth <= ToMonth) {
          ToYear = FromYear;
        }else{
          ToYear = FromYear + 1;
        }
        var last = new Date(ToYear, ToMonth);
        last = new Date(last-1);
        ToDay = last.getDate();
        let fromDate = String(FromYear)+this.handlingGetDate(FromMonth,2)+this.handlingGetDate(FromDay,2);
        let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
      }
      else if(FromYear == null && FromMonth != null && FromDay == null && ToYear == null && ToMonth != null && ToDay != null)
      {
        // ex) 8월부터 3월 1일까지 프리미어리그 경기 보여줘.
        var CurrentYear = new Date();
        FromYear = CurrentYear.getFullYear();
        if(FromMonth <= ToMonth) {
          ToYear = FromYear;
        }else{
          ToYear = FromYear + 1;
        }
        FromDay = 1;
        let fromDate = String(FromYear)+this.handlingGetDate(FromMonth,2)+this.handlingGetDate(FromDay,2);
        let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
      }
      else if(FromYear == null && FromMonth != null && FromDay != null && ToYear == null && ToMonth != null && ToDay != null)
      {
        // ex) 8월 1일부터 3월 1일까지 프리미어리그 경기 보여줘.
        var CurrentYear = new Date();
        FromYear = CurrentYear.getFullYear();
        if(FromMonth <= ToMonth) {
          ToYear = FromYear;
        }else{
          ToYear = FromYear + 1;
        }
        let fromDate = String(FromYear)+this.handlingGetDate(FromMonth,2)+this.handlingGetDate(FromDay,2);
        let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
      }else if(FromYear != null && FromMonth != null && FromDay == null && ToYear == null && ToMonth != null && ToDay == null){
        if(FromMonth >= ToMonth){
          // ex) 18년 8월부터 1월까지 경기 알려줘.
          ToYear = Number(FromYear)+1;
          var last = new Date(ToYear, ToMonth);
          last = new Date(last-1);
          ToDay = last.getDate();
          let fromDate = String(FromYear) + this.handlingGetDate(FromMonth,2) + '01'
          let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);

        }else{
          // ex) 18년 8월부터 11월까지 경기 알려줘.
          ToYear = FromYear;
          var last = new Date(ToYear, ToMonth);
          last = new Date(last-1);
          ToDay = last.getDate();
          let fromDate = String(FromYear) + this.handlingGetDate(FromMonth,2) + '01'
          let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
        }
      }else if(FromYear != null && FromMonth != null && FromDay != null && ToYear == null && ToMonth != null && ToDay == null){
        if(FromMonth >= ToMonth){
          // ex) 18년 8월 1일부터 1월까지 경기 알려줘.
          ToYear = Number(FromYear)+1;
          var last = new Date(ToYear, ToMonth);
          last = new Date(last-1);
          ToDay = last.getDate();
          let fromDate = String(FromYear) + this.handlingGetDate(FromMonth,2) + this.handlingGetDate(FromDay,2)
          let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);

        }else{
          // ex) 18년 8월 1일부터 11월까지 경기 알려줘.
          ToYear = FromYear;
          var last = new Date(ToYear, ToMonth);
          last = new Date(last-1);
          ToDay = last.getDate();
          let fromDate = String(FromYear) + this.handlingGetDate(FromMonth,2) + this.handlingGetDate(FromDay,2)
          let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
        }
      }else if(FromYear != null && FromMonth != null && FromDay != null && ToYear == null && ToMonth != null && ToDay != null){
        if(FromMonth >= ToMonth){
          // ex) 18년 8월 1일부터 1월 2일까지 경기 알려줘.
          ToYear = Number(FromYear)+1;
          let fromDate = String(FromYear) + this.handlingGetDate(FromMonth,2) + this.handlingGetDate(FromDay,2)
          let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);

        }else{
          // ex) 18년 8월 1일부터 11월 3일까지 경기 알려줘.
          ToYear = FromYear;
          let fromDate = String(FromYear) + this.handlingGetDate(FromMonth,2) + this.handlingGetDate(FromDay,2)
          let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
        }
      }else if(FromYear != null && FromMonth != null && FromDay == null && ToYear == null && ToMonth != null && ToDay != null){
        if(FromMonth >= ToMonth){
          // ex) 18년 8월부터 1월 2일까지 경기 알려줘.
          ToYear = Number(FromYear)+1;
          let fromDate = String(FromYear) + this.handlingGetDate(FromMonth,2) + '01'
          let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);

        }else{
          // ex) 18년 8월부터 11월 3일까지 경기 알려줘.
          ToYear = FromYear;
          let fromDate = String(FromYear) + this.handlingGetDate(FromMonth,2) + '01'
          let ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
        }
      }else if(FromYear == null && FromMonth == null && FromDay == null && ToYear == null && ToMonth == null && ToDay == null){
        // 프리미어리그 경기 알려줘 ( 7일 전, 후 경기 )
        var startYear = whenStart.getYear();
        var startMonth = this.handlingGetDate(whenStart.getMonth(), 2);
        var startDay = this.handlingGetDate(whenStart.getDay(), 2);
        var endYear = whenEnd.getYear();
        var endMonth = this.handlingGetDate(whenEnd.getMonth(), 2);
        var endDay = this.handlingGetDate(whenEnd.getDay(), 2);
        var fromDate = String(startYear)+String(startMonth)+String(startDay);
        var ToDate = String(endYear)+String(endMonth)+String(endDay);
      }else if(FromYear != null && FromMonth == null && FromDay == null && ToYear == null && ToMonth == null && ToDay == null){
        // 19년 프리미어리그 경기 알려줘
        ToYear = FromYear;
        ToMonth = 12;
        var last = new Date(ToYear, ToMonth);
        last = new Date(last-1);
        ToDay = last.getDate();
        var fromDate = String(FromYear)+'0101';
        var ToDate = String(ToYear)+this.handlingGetDate(ToMonth,2)+this.handlingGetDate(ToDay,2);
      }else{
        throw fail.checkedError('년도 혹은 달을 확인해주세요.', 'SearchFail', {})
      }
      
      

      this.compareDate(fromDate, ToDate);
      
      if(Number(fromDate.substr(0,4)) < 2010){
        throw fail.checkedError('2010년 이후의 경기 정보만 제공합니다.', 'notSupportYear', {})
      }
      const array = [];
      array.push(fromDate); 
      array.push(ToDate); 

      console.log(fromDate);
      console.log(ToDate);

      return array;
    },
    getLeagueSeason: function(league, FromYear, FromMonth){
      const console = require('console');
      let season;
      let tmp;
      if(league == 'facup')
      {
        //매년 1월부터 5월까지 진행
        tmp = FromYear-1;
        season = String(tmp)+String(FromYear);
      }
      else if(league == 'epl' || league == 'primera' || league == 'bundesliga' || league == 'seriea' || league == 'ligue1' || league == 'uefacl' || league == 'uefacup' || league == 'eredivisie'|| league =='epl_cup')
      {
        if(FromMonth<8)
        {
          tmp = FromYear-1;
          season = String(tmp)+String(FromYear);
        }
        else if(FromMonth>=8)
        {
          tmp = FromYear+1;
          season = String(FromYear)+String(tmp);
        }
      }
      return season;
    },
    compareDate : function(fromDate, toDate){
      const fail = require('fail'); 
      const console = require('console');
      var start_date = new Date(fromDate.substr(0,4), Number(fromDate.substr(4,2))-1, fromDate.substr(6,2));
      var end_date = new Date(toDate.substr(0,4), Number(toDate.substr(4,2))-1, toDate.substr(6,2));
      var between_day = (end_date.getTime() - start_date.getTime())/1000/60/60/24;
      console.log(between_day + '차이 납니다.');

      
      if(between_day > 366){
        //1년이 넘어가면
        throw fail.checkedError('기간이 너무 길어 정보를 찾지 못했습니다. 찾으시려는 경기 일정 간격을 1년 사이로 맞춰주세요.', 'LongTerm', {})
      }else if(between_day < 0){
        throw fail.checkedError('기간 설정이 잘못되었습니다.', 'WrongTerm', {})
      }
    },
    getBaseBallJSONData : function(BaseBallInfoJSON, category, answer){
      const console = require('console');
      var jsonObj = JSON.parse(BaseBallInfoJSON);
      console.log(jsonObj);

      var matchDateArray = [];
      var resultArray = [];

      for(var i = 0 ; i < Object.keys(jsonObj['schedule']).length ; i++){
          matchDateArray.push(Object.keys(jsonObj['schedule'])[i]);
      }

      matchDateArray = matchDateArray.reverse();

      for(var i = 0 ; i < matchDateArray.length; i++)
      {
          for(var j = 0 ; j < jsonObj['schedule'][matchDateArray[i]].length; j++)
          {
            var eachObj = {}
            eachObj['Check3'] = true;
            eachObj['Category'] = category;
            eachObj['Answer'] = answer;
            eachObj['GameId'] = jsonObj['schedule'][matchDateArray[i]][j]['gameId'];
            eachObj['HomeTeamName'] = jsonObj['schedule'][matchDateArray[i]][j]['homeTeamName'];
            eachObj['AwayTeamName'] = jsonObj['schedule'][matchDateArray[i]][j]['awayTeamName'];
            eachObj['HomeScore'] = jsonObj['schedule'][matchDateArray[i]][j]['homeResult'];
            eachObj['AwayScore'] = jsonObj['schedule'][matchDateArray[i]][j]['awayResult'];
            eachObj['FieldName'] = jsonObj['schedule'][matchDateArray[i]][j]['fieldName'];
            eachObj['HomeTeamImageUrl'] = jsonObj['schedule'][matchDateArray[i]][j]['homeTeamImageUrl'];
            eachObj['AwayTeamImageUrl'] = jsonObj['schedule'][matchDateArray[i]][j]['awayTeamImageUrl'];
            eachObj['SeasonName'] = jsonObj['schedule'][matchDateArray[i]][j]['seasonName'];
            eachObj['GameRound'] = jsonObj['schedule'][matchDateArray[i]][j]['gameDetailType']['nameKo'];
            if(jsonObj['schedule'][matchDateArray[i]][j]['gameStatus'] == 'CANCEL')
            {
              eachObj['GameStatus'] = '경기취소'
            }else if(jsonObj['schedule'][matchDateArray[i]][j]['gameStatus'] == 'END')
            {
              eachObj['Check'] = 'exists';
              eachObj['GameStatus'] = '종료'
            }else if(jsonObj['schedule'][matchDateArray[i]][j]['gameStatus'] == 'POSTPONE'){
              eachObj['GameStatus'] = '연기'
            }else if(jsonObj['schedule'][matchDateArray[i]][j]['gameStatus'] == 'BEFORE'){
              eachObj['GameStatus'] = '경기전'
            }else if(jsonObj['schedule'][matchDateArray[i]][j]['gameStatus'] == 'PLAY'){
              eachObj['Check'] = 'exists';
              eachObj['GameStatus'] = '경기중'
            }
            var tmp,tmp2="";
            var year = jsonObj['schedule'][matchDateArray[i]][j]['startDate'].substr(0,4)//20200301
            var month = jsonObj['schedule'][matchDateArray[i]][j]['startDate'].substr(4,2)//20200301
            var day = jsonObj['schedule'][matchDateArray[i]][j]['startDate'].substr(6,2)//20200301
            tmp = year + "년"+ " " + month + "월"+ " " + day + "일";
            eachObj['MatchDate'] = tmp;
            var hour = jsonObj['schedule'][matchDateArray[i]][j]['startTime'].substr(0,2); //0133
            var minute= jsonObj['schedule'][matchDateArray[i]][j]['startTime'].substr(2);
            tmp2 = hour + ":" + minute;
            eachObj['MatchTime'] = tmp2;
            resultArray.push(eachObj);
          }
      }
      console.log(resultArray)
      return resultArray;
    },
    getSoccerPlayerRankJSON : function(soccerPlayerRankJSON, text, Position){
      const console = require('console');
      var jsonObj = JSON.parse(soccerPlayerRankJSON);
      if(Position == '선수'){
        var resultArray = [];  
        var sortField = ['gf', 'ast', 'opts', 'sht', 'gp']; // 순서대로(득점, 도움, 공격 포인트, 슈팅, 경기 수)
        var word = ['골', '개', 'P', '회', '경기'];
      }
      
      for(var i=0 ; i < sortField.length ; i++){
        if(sortField[i] == jsonObj['list'][i]['sortField']){
          for(var j=0 ; j < jsonObj['list'][i]['topPlayers'].length ; j++){
            var eachObj = {};
            eachObj['Dialog'] = text;
            eachObj['Category'] = '축구';
            if(j == 0){
              eachObj['Subject'] = this.getSubject(sortField[i]);
            }
            if(jsonObj['list'][i]['topPlayers'][j]['lastNameKo'] != null){
              eachObj['PlayerName'] = jsonObj['list'][i]['topPlayers'][j]['lastNameKo'];
            }else{
              eachObj['PlayerName'] = jsonObj['list'][i]['topPlayers'][j]['nameKo'];
            }
            
            eachObj['PlayerImg'] = jsonObj['list'][i]['topPlayers'][j]['imageUrl'];
            eachObj['PlayerTeam'] = jsonObj['list'][i]['topPlayers'][j]['statTeam']['shortNameKo'];
            eachObj['TeamImageUrl'] = jsonObj['list'][i]['topPlayers'][j]['statTeam']['imageUrl'];
            eachObj['Stat'] = jsonObj['list'][i]['topPlayers'][j]['stat'][sortField[i]] + word[i];
            eachObj['Rank'] = jsonObj['list'][i]['topPlayers'][j]['stat']['rank'];
            resultArray.push(eachObj);
          }
        }
      }
      console.log(resultArray)
      return resultArray;
    },
    getPitBatRankJSON : function(pitBatRankJSON, league, text, Position){
      const console = require('console');
      var jsonObj = JSON.parse(pitBatRankJSON);
      var sortField = [];
      var resultArray = [];
      var subLeagueName = [];
      var word = [];
      var count = 0;

      if(Position == '투수'){
        sortField.push('pitW'); // 다승
        sortField.push('pitEra'); // 평균 자책
        sortField.push('pitSo'); // 탈삼진
        sortField.push('pitSv'); // 세이브
        sortField.push('pitWhip'); // WHIP
        word.push('승');
        word.push('');
        word.push('개');
        word.push('');
        word.push('');
      }else if(Position == '타자'){
        sortField.push('batAvg'); // 타율 
        sortField.push('batRbi'); // 타점
        sortField.push('batHr'); // 홈런
        sortField.push('batSb'); // 도루
        sortField.push('batOps'); // OPS
        word.push('');
        word.push('');
        word.push('개');
        word.push('');
        word.push('');
      }

      if(league == 'mlb'){
        subLeagueName.push('AL'); // 아메리칸 리그
        subLeagueName.push('NL'); // 내셔널 리그
      }else if(league == 'npb'){
        subLeagueName.push('CL'); // 센트럴 리그
        subLeagueName.push('PL'); // 퍼시픽 리그       
      }
      console.log(sortField);
      console.log(subLeagueName)

      for(var i = 0 ; i < subLeagueName.length ; i++){
        for(var j=0 ; j < sortField.length ; j++){
          for(var k=0 ; k < jsonObj[subLeagueName[i]].length ; k++){
            if(sortField[j] == jsonObj[subLeagueName[i]][k]['sortField']){
              for(var m=0 ; m < jsonObj[subLeagueName[i]][k]['topPlayers'].length ; m++){
                var eachObj = {};
                eachObj['Dialog'] = text;
                eachObj['Category'] = '야구';
                if(m == 0){
                  eachObj['Subject'] = this.getSubject(sortField[j]);
                  if(count == 0){
                    count++;
                    eachObj['SubLeagueName'] = this.getSubLeagueName(subLeagueName[i]);
                  }
                }
                if(league == 'npb'){
                  if(jsonObj[subLeagueName[i]][k]['topPlayers'][m]['nameMain'] != null){
                    eachObj['PlayerName'] = jsonObj[subLeagueName[i]][k]['topPlayers'][m]['nameMain'];
                  }else{
                    eachObj['PlayerName'] = jsonObj[subLeagueName[i]][k]['topPlayers'][m]['nameKo'];
                  }
                }else if(league == 'mlb'){
                  if(jsonObj[subLeagueName[i]][k]['topPlayers'][m]['lastNameKo'] != null){
                    eachObj['PlayerName'] = jsonObj[subLeagueName[i]][k]['topPlayers'][m]['lastNameKo'];
                  }else{
                    eachObj['PlayerName'] = jsonObj[subLeagueName[i]][k]['topPlayers'][m]['nameKo'];
                  }
                }
                if(Number.isInteger(Number(jsonObj[subLeagueName[i]][k]['topPlayers'][m]['stat'][sortField[j]])) == true){
                  // 정수면 그대로
                  eachObj['Stat'] = jsonObj[subLeagueName[i]][k]['topPlayers'][m]['stat'][sortField[j]] + word[j];
                }else{
                  //소수면 3번째 자리에서 반올림
                  eachObj['Stat'] = Number(jsonObj[subLeagueName[i]][k]['topPlayers'][m]['stat'][sortField[j]]).toFixed(3) + word[j];
                }
                eachObj['PlayerImg'] = jsonObj[subLeagueName[i]][k]['topPlayers'][m]['imageUrl'];
                eachObj['PlayerTeam'] = jsonObj[subLeagueName[i]][k]['topPlayers'][m]['statTeam']['shortNameKo'];
                eachObj['TeamImageUrl'] = jsonObj[subLeagueName[i]][k]['topPlayers'][m]['statTeam']['imageUrl'];
                eachObj['Rank'] = jsonObj[subLeagueName[i]][k]['topPlayers'][m]['stat']['rank'];
                resultArray.push(eachObj);
              }
            }
          }
        }
        count = 0;
      }
      console.log(resultArray)
      return resultArray;
    },
    getLeagueRankBaseBallJSON : function(BaseBallRankJSON, leagueName, league, category){
      const console = require('console');
      var jsonObj = JSON.parse(BaseBallRankJSON);
      var resultArray = [];
      var subLeagueName = [];
      var tmp = 'list';
      var count = 0;
      var cnt=0;

      if(league == 'mlb'){
        // AL(아메리칸 리그), NL(내셔널 리그)
        subLeagueName.push('AL');
        subLeagueName.push('NL');
        for(var i=0 ; i < subLeagueName.length ; i++){
          for(var j=0 ; j < jsonObj[subLeagueName[i]][tmp].length ; j++){
            //아메리칸 리그
            var eachObj = {};
            if(subLeagueName[i] == 'NL' && count == 1){
              count++;
              j=-1;
              tmp = 'list';
              continue;
            }
            eachObj['EngLeagueName'] = league;
            eachObj['Name'] = leagueName;
            eachObj['Category'] = '야구';
          
            if(tmp != 'wildcard'){
              eachObj['District'] = jsonObj[subLeagueName[i]]['list'][j]['subLeague2depth']['nameKo'];
            }else if(tmp == 'wildcard'){
              eachObj['District'] = '와일드카드';
            }
            eachObj['TeamName'] = jsonObj[subLeagueName[i]][tmp][j]['shortNameKo'];
            eachObj['TeamImageUrl'] = jsonObj[subLeagueName[i]][tmp][j]['imageUrl'];
            eachObj['Rank'] = jsonObj[subLeagueName[i]][tmp][j]['rank']['rank'];
            eachObj['Game'] = jsonObj[subLeagueName[i]][tmp][j]['rank']['game'];
            eachObj['Win'] = jsonObj[subLeagueName[i]][tmp][j]['rank']['win'];
            eachObj['Draw'] = jsonObj[subLeagueName[i]][tmp][j]['rank']['draw'];
            eachObj['Loss'] = jsonObj[subLeagueName[i]][tmp][j]['rank']['loss'];
            eachObj['WinRate'] = Number(jsonObj[subLeagueName[i]][tmp][j]['rank']['wpct']).toFixed(3);
            eachObj['GB'] = jsonObj[subLeagueName[i]][tmp][j]['rank']['gb'];
            eachObj['Times'] = jsonObj[subLeagueName[i]][tmp][j]['rank']['streak'];
            if(eachObj['Rank'] == '1'){
              eachObj['Tmp'] = 1;
              if(subLeagueName[i] == 'AL' && cnt == 0){
                cnt++;
                eachObj['SubLeagueName'] ='아메리칸 리그';
              }else if(subLeagueName[i] == 'NL' && cnt == 1){
                cnt++;
                eachObj['SubLeagueName'] = '내셔널 리그';
              }
            }
            resultArray.push(eachObj);
            
            if(j == jsonObj[subLeagueName[i]][tmp].length-1 && eachObj['District'] != '와일드카드'){
              j = -1;
              tmp = 'wildcard';
              count++;
              continue;
            }
          }
        }
      }else if(league == 'npb'){
        // CL(센트럴 리그), PL(퍼시픽 리그)
        subLeagueName.push('CL');
        subLeagueName.push('PL');
        for(var i=0 ; i < subLeagueName.length ; i++){
          for(var j=0 ; j < jsonObj[subLeagueName[i]]['list'].length ; j++){
            var eachObj = {};
            eachObj['EngLeagueName'] = league;
            eachObj['Name'] = leagueName;
            eachObj['Category'] = '야구';

            eachObj['TeamName'] = jsonObj[subLeagueName[i]]['list'][j]['shortNameKo'];
            eachObj['TeamImageUrl'] = jsonObj[subLeagueName[i]]['list'][j]['imageUrl'];
            eachObj['Rank'] = jsonObj[subLeagueName[i]]['list'][j]['rank']['rank'];
            eachObj['Game'] = jsonObj[subLeagueName[i]]['list'][j]['rank']['game'];
            eachObj['Win'] = jsonObj[subLeagueName[i]]['list'][j]['rank']['win'];
            eachObj['Draw'] = jsonObj[subLeagueName[i]]['list'][j]['rank']['draw'];
            eachObj['Loss'] = jsonObj[subLeagueName[i]]['list'][j]['rank']['loss'];
            eachObj['WinRate'] = Number(jsonObj[subLeagueName[i]]['list'][j]['rank']['wpct']).toFixed(2);
            eachObj['GB'] = jsonObj[subLeagueName[i]]['list'][j]['rank']['gb'];
            eachObj['Times'] = jsonObj[subLeagueName[i]]['list'][j]['rank']['streak'];
            if(eachObj['Rank'] == '1'){
              eachObj['Tmp'] = 1;
              if(subLeagueName[i] == 'CL'){
                eachObj['SubLeagueName'] = '센트럴 리그';
              }else{
                eachObj['SubLeagueName'] = '퍼시픽 리그';
              }
            }
            resultArray.push(eachObj);
          }
        }
      }else{
        console.log('이럴 일은 없겠지만, 야구가 아님.')
      }
      console.log(resultArray)
      return resultArray;
    },
    getLeagueRankJSON : function(SoccerRankJSON, leagueName, league, category){
      const console = require('console');
      var jsonObj = JSON.parse(SoccerRankJSON);
      var resultArray = [];
      var tmp = 0;
      var groupBefore;
      var group;

      for(var i=0 ; i < jsonObj['list'].length ; i++){
        var eachObj = {};
        eachObj['Category'] = category;
        eachObj['Name'] = leagueName;
        eachObj['TeamName'] = jsonObj['list'][i]['shortName']; // 팀 이름
        eachObj['TeamImageUrl'] = jsonObj['list'][i]['imageUrl']; // 팀 마크
        eachObj['Rank'] = jsonObj['list'][i]['rank']['rank']; // 순위
        eachObj['Game'] = jsonObj['list'][i]['rank']['game']; // 경기수
        eachObj['Win'] = jsonObj['list'][i]['rank']['win']; // 승리수
        eachObj['Draw'] = jsonObj['list'][i]['rank']['draw']; // 무승부
        eachObj['Loss'] = jsonObj['list'][i]['rank']['loss']; // 패배수
        eachObj['GetScore'] = jsonObj['list'][i]['rank']['gf']; // 득점
        eachObj['LossScore'] = jsonObj['list'][i]['rank']['ga']; // 실점
        eachObj['GoalGap'] = jsonObj['list'][i]['rank']['gd']; // 득실차
        eachObj['VictoryPoint'] = jsonObj['list'][i]['rank']['pts']; // 승점
        eachObj['EngLeagueName'] = league;
        
        if(tmp == 0){
          eachObj['Tmp'] = tmp; 
          groupBefore = jsonObj['list'][i]['gameDetailType']['name'] // 유로파리그, 챔피언스리그 조별예선(A조, B조 등)
          if(league == 'uefacl' || league == 'uefacup'){
            eachObj['Group'] = groupBefore;
          }
        }
        tmp = 1;
        
        if(league == 'uefacl' || league == 'uefacup'){
          if(jsonObj['list'][i]['gameDetailType']['name'] != groupBefore){
            eachObj['Group'] = jsonObj['list'][i]['gameDetailType']['name'];
            groupBefore = jsonObj['list'][i]['gameDetailType']['name'];
            eachObj['Tmp'] = tmp; 
          }
        }

        resultArray.push(eachObj);
      }
      console.log(resultArray);
      return resultArray;
    },
    getBaseBallDetail : function(BaseBallDetail, GameId){
      const console = require('console');
      var jsonObj = JSON.parse(BaseBallDetail);
      console.log(jsonObj);
      var resultObj = {};
      var summaryObj = {};
      var homeObj = {};
      var awayObj = {};
      var losePitcher = {};
      var winPitcher = {};
      var savePitcher = {};
      var pitcherArr = [];
      var hrBatArr = [];
      var homeStat = {};
      var awayStat = {};
      var homePitcherArr = [];
      var awayPitcherArr = [];
      var homeBatArr = [];
      var awayBatArr = [];
      var homeScore = {};
      var awayScore = {};
      var awayScoreArr = [];
      var homeScoreArr = [];
      var awayStat = {};

      summaryObj['GameId'] = GameId;
      summaryObj['MatchDate'] = jsonObj['summary']['matchDate'];
      summaryObj['MatchTime'] = jsonObj['summary']['matchTime'];
      summaryObj['HomeScore'] = jsonObj['summary']['homeTotalScore'];
      summaryObj['AwayScore'] = jsonObj['summary']['awayTotalScore'];
      summaryObj['SeasonOneDepth'] = jsonObj['summary']['season'];
      summaryObj['EngLeagueName'] = jsonObj['summary']['leagueName'];
      summaryObj['HomeTeamName'] = jsonObj['summary']['homeTeamName'];
      summaryObj['AwayTeamName'] = jsonObj['summary']['awayTeamName'];
      summaryObj['HomeTeamImageUrl'] = jsonObj['summary']['homeTeamImageUrl'];
      summaryObj['AwayTeamImageUrl'] = jsonObj['summary']['awayTeamImageUrl'];
      if(jsonObj['summary']['status'] == 'CANCEL')
      {
        summaryObj['GameStatus'] = '경기취소';
      }else if(jsonObj['summary']['status'] == 'END')
      {
        summaryObj['GameStatus'] = '종료';
        summaryObj['Check'] = 'exists';
      }else if(jsonObj['summary']['status'] == 'POSTPONE'){
        summaryObj['GameStatus'] = '연기';
      }else if(jsonObj['summary']['status'] == 'BEFORE'){
        summaryObj['GameStatus'] = '경기전';
      }else if(jsonObj['summary']['status'] == 'PLAY'){
        summaryObj['GameStatus'] = '경기중';
        summaryObj['Check'] = 'exists';
      }
      summaryObj['FieldName'] = jsonObj['summary']['fieldName'];
      summaryObj['GameRound'] = jsonObj['summary']['gameRound'];

      if(jsonObj['summary']['winPitcher'] != null){
        // 승리 투수
        // winPitcher['PlayerName'] = jsonObj['summary']['winPitcher']['lastNameKo'];
        // winPitcher['PlayerImg'] = jsonObj['summary']['winPitcher']['imageUrl'];
        // winPitcher['PitIp'] = jsonObj['summary']['winPitcher']['pitIp']; // 이닝
        // winPitcher['PitR'] = jsonObj['summary']['winPitcher']['pitR']; // 실점
        // winPitcher['PitEr'] = jsonObj['summary']['winPitcher']['pitEr']; // 자책
        // summaryObj['WinPitcher'] = winPitcher;
        winPitcher['url'] = jsonObj['summary']['winPitcher']['imageUrl'];
        if(jsonObj['summary']['winPitcher']['lastNameKo'] != null){
          winPitcher['title'] = jsonObj['summary']['winPitcher']['lastNameKo'];
        }else{
          winPitcher['title'] = jsonObj['summary']['winPitcher']['nameKo'];
        }
        
        winPitcher['subtitle'] = '승리 투수';
        winPitcher['caption'] = String(jsonObj['summary']['winPitcher']['pitIp']) + '이닝 '+ String(jsonObj['summary']['winPitcher']['pitR']) + '실점 (' + String(jsonObj['summary']['winPitcher']['pitEr']) + '자책)';
        pitcherArr.push(winPitcher);
      }

      if(jsonObj['summary']['losePitcher'] != null){
        // 패배 투수
        // losePitcher['PlayerName'] = jsonObj['summary']['losePitcher']['lastNameKo'];
        // losePitcher['PlayerImg'] = jsonObj['summary']['losePitcher']['imageUrl'];
        // losePitcher['PitIp'] = jsonObj['summary']['losePitcher']['pitIp']; // 이닝
        // losePitcher['PitR'] = jsonObj['summary']['losePitcher']['pitR']; // 실점
        // losePitcher['PitEr'] = jsonObj['summary']['losePitcher']['pitEr']; // 자책
        // summaryObj['LosePitcher'] = losePitcher;
        losePitcher['url'] = jsonObj['summary']['losePitcher']['imageUrl'];
        if(jsonObj['summary']['losePitcher']['lastNameKo']!=null){
          losePitcher['title'] = jsonObj['summary']['losePitcher']['lastNameKo'];
        }else{
          losePitcher['title'] = jsonObj['summary']['losePitcher']['nameKo'];
        }
        
        losePitcher['subtitle'] = '패배 투수';
        losePitcher['caption'] = String(jsonObj['summary']['losePitcher']['pitIp']) + '이닝 '+ String(jsonObj['summary']['losePitcher']['pitR']) + '실점 (' + String(jsonObj['summary']['losePitcher']['pitEr']) + '자책)';
        pitcherArr.push(losePitcher);
      }
      
      if(jsonObj['summary']['savePitcher'] != null){
        // 구원 투수
        // savePitcher['PlayerName'] = jsonObj['summary']['savePitcher']['lastNameKo'];
        // savePitcher['PlayerImg'] = jsonObj['summary']['savePitcher']['imageUrl'];
        // savePitcher['PitIp'] = jsonObj['summary']['savePitcher']['pitIp']; // 이닝
        // savePitcher['PitR'] = jsonObj['summary']['savePitcher']['pitR']; // 실점
        // savePitcher['PitEr'] = jsonObj['summary']['savePitcher']['pitEr']; // 자책
        // summaryObj['SavePitcher'] = savePitcher;
        savePitcher['url'] = jsonObj['summary']['savePitcher']['imageUrl'];
        if(jsonObj['summary']['savePitcher']['lastNameKo'] != null){
          savePitcher['title'] = jsonObj['summary']['savePitcher']['lastNameKo'];
        }else{
          savePitcher['title'] = jsonObj['summary']['savePitcher']['nameKo'];
        }
        savePitcher['subtitle'] = '세이브 투수';
        savePitcher['caption'] = String(jsonObj['summary']['savePitcher']['pitIp']) + '이닝 '+ String(jsonObj['summary']['savePitcher']['pitR']) + '실점 (' + String(jsonObj['summary']['savePitcher']['pitEr']) + '자책)';
        pitcherArr.push(savePitcher);
      }
      var tmpObj = {};
      tmpObj['pitcher'] = pitcherArr;
      summaryObj['PitcherDetail'] = tmpObj;

      if(jsonObj['summary']['homeRunBat'] != null){
        for(var i = 0 ; i < jsonObj['summary']['homeRunBat'].length ; i++){
          var hrBatObj = {};
          // hrBatObj['PlayerName'] = jsonObj['summary']['homeRunBat'][i]['personName'];
          // hrBatObj['PlayerTeam'] = jsonObj['summary']['homeRunBat'][i]['teamName'];
          // hrBatObj['PlayerImg'] = jsonObj['summary']['homeRunBat'][i]['imageUrl'];
          hrBatObj['url'] = jsonObj['summary']['homeRunBat'][i]['imageUrl'];
          hrBatObj['title'] = jsonObj['summary']['homeRunBat'][i]['personName'];
          hrBatObj['subtitle'] = jsonObj['summary']['homeRunBat'][i]['teamName'];
          // hrBatObj['caption'] = jsonObj['summary']['homeRunBat'][i]['imageUrl'];
          hrBatArr.push(hrBatObj);
        }
        summaryObj['HrBat'] = hrBatArr;
      }

      homeObj['TeamName'] = jsonObj['home']['teamName'];
      homeObj['TeamRank'] = jsonObj['home']['homeRank'];
      homeObj['WinDrawLose'] = jsonObj['home']['homeWDL'];
      if(jsonObj['home']['homeTeamStat'] != null){
        homeStat['BatH'] = jsonObj['home']['homeTeamStat']['batH']; // 안타
        homeStat['BatHr'] = jsonObj['home']['homeTeamStat']['batHr']; // 홈런
        if(jsonObj['home']['homeTeamStat']['batAvg'] != null){
          homeStat['BatAvg'] = Number(jsonObj['home']['homeTeamStat']['batAvg']).toFixed(3); // 타율
        } else{
          homeStat['BatAvg'] = '-';
        }
        homeStat['PitSo'] = jsonObj['home']['homeTeamStat']['pitSo']; // 탈삼진
        homeStat['BatSb'] = jsonObj['home']['homeTeamStat']['batSb']; // 도루
        homeStat['FldErr'] = jsonObj['home']['homeTeamStat']['fldErr']; // 실책
        homeStat['BatGdp'] = jsonObj['home']['homeTeamStat']['batGdp']; // 병살
        homeStat['BatLob'] = jsonObj['home']['homeTeamStat']['batLob']; // 잔루
        homeStat['BatBbhp'] = jsonObj['home']['homeTeamStat']['batBbhp']; // 사사구
        homeObj['StatDetail'] = homeStat;
      }
      if(jsonObj['home']['homePersonStat'] != null){
        for(var i = 0 ; i < jsonObj['home']['homePersonStat'].length ; i++){
            if(jsonObj['home']['homePersonStat'][i]['positionNameKo'] == '투수' && (jsonObj['home']['homePersonStat'][i]['batAb'] == 0 || jsonObj['home']['homePersonStat'][i]['batAb'] == null)){
              // 투수
              var homePitcherObj = {};
              homePitcherObj['PitIp'] = jsonObj['home']['homePersonStat'][i]['pitIp']; // 이닝
              homePitcherObj['PitNp'] = jsonObj['home']['homePersonStat'][i]['pitNp']; // 투구수
              homePitcherObj['PitH'] = jsonObj['home']['homePersonStat'][i]['pitH']; // 피안타
              homePitcherObj['PitSo'] = jsonObj['home']['homePersonStat'][i]['pitSo']; // 탈삼진
              homePitcherObj['PitBbhp'] = jsonObj['home']['homePersonStat'][i]['pitBbhp']; // 사사구
              homePitcherObj['PitHr'] = jsonObj['home']['homePersonStat'][i]['pitHr']; // 피홈런
              homePitcherObj['PitR'] = jsonObj['home']['homePersonStat'][i]['pitR']; // 실점
              homePitcherObj['PitEr'] = jsonObj['home']['homePersonStat'][i]['pitEr']; // 자책
              if(jsonObj['home']['homePersonStat'][i]['pitEra'] != null){
                homePitcherObj['PitEra'] = Number(jsonObj['home']['homePersonStat'][i]['pitEra']).toFixed(3); // ERA
              }else{
                homePitcherObj['PitEra'] = '-';
              }
              if(jsonObj['home']['homePersonStat'][i]['pitWhip'] != null){
                homePitcherObj['PitWhip'] = Number(jsonObj['home']['homePersonStat'][i]['pitWhip']).toFixed(3); // WHIP
              }else{
                homePitcherObj['PitWhip'] = '-';
              }
              homePitcherObj['PositionName'] = jsonObj['home']['homePersonStat'][i]['positionNameKo'];
              homePitcherObj['PlayerName'] = jsonObj['home']['homePersonStat'][i]['personName'];
              homePitcherObj['PlayerImg'] = jsonObj['home']['homePersonStat'][i]['imageUrl'];
              homePitcherArr.push(homePitcherObj);
            }else if(jsonObj['home']['homePersonStat'][i]['positionNameKo'] == '투수' && jsonObj['home']['homePersonStat'][i]['batAb'] > 0){
              // 투수 겸 타자
              var homePitcherObj = {};
              var homeBatObj = {};
              homePitcherObj['PitIp'] = jsonObj['home']['homePersonStat'][i]['pitIp']; // 이닝
              homePitcherObj['PitNp'] = jsonObj['home']['homePersonStat'][i]['pitNp']; // 투구수
              homePitcherObj['PitH'] = jsonObj['home']['homePersonStat'][i]['pitH']; // 피안타
              homePitcherObj['PitSo'] = jsonObj['home']['homePersonStat'][i]['pitSo']; // 탈삼진
              homePitcherObj['PitBbhp'] = jsonObj['home']['homePersonStat'][i]['pitBbhp']; // 사사구
              homePitcherObj['PitHr'] = jsonObj['home']['homePersonStat'][i]['pitHr']; // 피홈런
              homePitcherObj['PitR'] = jsonObj['home']['homePersonStat'][i]['pitR']; // 실점
              homePitcherObj['PitEr'] = jsonObj['home']['homePersonStat'][i]['pitEr']; // 자책
              if(jsonObj['home']['homePersonStat'][i]['pitEra'] != null){
                homePitcherObj['PitEra'] = Number(jsonObj['home']['homePersonStat'][i]['pitEra']).toFixed(3); // ERA
              }else{
                homePitcherObj['PitEra'] = '-';
              }
              if(jsonObj['home']['homePersonStat'][i]['pitWhip'] != null){
                homePitcherObj['PitWhip'] = Number(jsonObj['home']['homePersonStat'][i]['pitWhip']).toFixed(3); // WHIP
              }else{
                homePitcherObj['PitWhip'] = '-';
              }
              homePitcherObj['PositionName'] = jsonObj['home']['homePersonStat'][i]['positionNameKo'];
              homePitcherObj['PlayerName'] = jsonObj['home']['homePersonStat'][i]['personName'];
              homePitcherObj['PlayerImg'] = jsonObj['home']['homePersonStat'][i]['imageUrl'];              
              homePitcherArr.push(homePitcherObj);
              homeBatObj['BatAb'] = jsonObj['home']['homePersonStat'][i]['batAb']; // 타수
              homeBatObj['BatH'] = jsonObj['home']['homePersonStat'][i]['batH']; // 안타
              homeBatObj['Bat2b'] = jsonObj['home']['homePersonStat'][i]['bat2b']; // 2타
              homeBatObj['Bat3b'] = jsonObj['home']['homePersonStat'][i]['bat3b']; // 3타
              homeBatObj['BatHr'] = jsonObj['home']['homePersonStat'][i]['batHr']; // 홈런
              homeBatObj['BatR'] = jsonObj['home']['homePersonStat'][i]['batR']; // 득점
              homeBatObj['BatRbi'] = jsonObj['home']['homePersonStat'][i]['batRbi']; // 타점
              homeBatObj['BatSo'] = jsonObj['home']['homePersonStat'][i]['batSo']; // 삼진
              homeBatObj['BatBb'] = jsonObj['home']['homePersonStat'][i]['batBb']; // 사사구
              if(jsonObj['home']['homePersonStat'][i]['batAvg'] != null){
                homeBatObj['BatAvg'] = Number(jsonObj['home']['homePersonStat'][i]['batAvg']).toFixed(3); // 타율
              }else{
                homeBatObj['BatAvg'] = '-';
              }
              homeBatObj['PositionName'] = jsonObj['home']['homePersonStat'][i]['positionNameKo'];
              homeBatObj['PlayerName'] = jsonObj['home']['homePersonStat'][i]['personName'];
              homeBatObj['PlayerImg'] = jsonObj['home']['homePersonStat'][i]['imageUrl'];
              homeBatArr.push(homeBatObj);
            }else{
              // 타자
              var homeBatObj = {};
              homeBatObj['BatAb'] = jsonObj['home']['homePersonStat'][i]['batAb']; // 타수
              homeBatObj['BatH'] = jsonObj['home']['homePersonStat'][i]['batH']; // 안타
              homeBatObj['Bat2b'] = jsonObj['home']['homePersonStat'][i]['bat2b']; // 2타
              homeBatObj['Bat3b'] = jsonObj['home']['homePersonStat'][i]['bat3b']; // 3타
              homeBatObj['BatHr'] = jsonObj['home']['homePersonStat'][i]['batHr']; // 홈런
              homeBatObj['BatR'] = jsonObj['home']['homePersonStat'][i]['batR']; // 득점
              homeBatObj['BatRbi'] = jsonObj['home']['homePersonStat'][i]['batRbi']; // 타점
              homeBatObj['BatSo'] = jsonObj['home']['homePersonStat'][i]['batSo']; // 삼진
              homeBatObj['BatBb'] = jsonObj['home']['homePersonStat'][i]['batBb']; // 사사구
              if(jsonObj['home']['homePersonStat'][i]['batAvg'] != null){
                homeBatObj['BatAvg'] = Number(jsonObj['home']['homePersonStat'][i]['batAvg']).toFixed(3); // 타율
              }else{
                homeBatObj['BatAvg'] = '-';
              }
              homeBatObj['PositionName'] = jsonObj['home']['homePersonStat'][i]['positionNameKo'];
              homeBatObj['PlayerName'] = jsonObj['home']['homePersonStat'][i]['personName'];
              homeBatObj['PlayerImg'] = jsonObj['home']['homePersonStat'][i]['imageUrl'];
              homeBatArr.push(homeBatObj);
            }
        }
        homeObj['Bat'] = homeBatArr;
        homeObj['Pitcher'] = homePitcherArr;
      }
      if(jsonObj['summary']['homeScore'] != null){
        var j = 1;
        for(var i = 0 ; i < String(jsonObj['summary']['homeScore']['inning']).length ; i++){
          if(jsonObj['summary']['homeScore']['inning'][i] != ','){
            var eachObj = {};
            eachObj['InningScore'] = jsonObj['summary']['homeScore']['inning'][i];
            eachObj['Check'] = j++;
            homeScoreArr.push(eachObj);
          }
        }
        j = 1;
        for(var i = 0 ; i < String(jsonObj['summary']['awayScore']['inning']).length ; i++){
          if(jsonObj['summary']['awayScore']['inning'][i] != ','){
            var eachObj = {};
            eachObj['InningScore'] = jsonObj['summary']['awayScore']['inning'][i];
            eachObj['Check'] = j++;
            awayScoreArr.push(eachObj);
          }
        }
        if(homeScoreArr.length != awayScoreArr.length){
          if(homeScoreArr.length > awayScoreArr.length){
            var eachObj = {};
            eachObj['InningScore'] = '-';
            eachObj['Check'] = awayScoreArr.length+1;
            awayScoreArr.push(eachObj);
          }else if(homeScoreArr.length < awayScoreArr.length){
            var eachObj = {};
            eachObj['InningScore'] = '-';
            eachObj['Check'] = homeScoreArr.length+1;
            homeScoreArr.push(eachObj);
          }
        }
        var totalArr = ['R', 'H', 'E', 'B']; //Run, Hit, Error, ballfour
        var homeTmpArr = [];
        var awayTmpArr = [];

        homeTmpArr.push(jsonObj['summary']['homeScore']['run']);
        homeTmpArr.push(jsonObj['summary']['homeScore']['hit']);
        homeTmpArr.push(jsonObj['summary']['homeScore']['error']);
        homeTmpArr.push(jsonObj['summary']['homeScore']['ballfour']);
        awayTmpArr.push(jsonObj['summary']['awayScore']['run']);
        awayTmpArr.push(jsonObj['summary']['awayScore']['hit']);
        awayTmpArr.push(jsonObj['summary']['awayScore']['error']);
        awayTmpArr.push(jsonObj['summary']['awayScore']['ballfour']);      
        for(var i = 0 ; i < homeTmpArr.length ; i++){
          var eachObj = {};
          eachObj['InningScore'] = homeTmpArr[i];
          eachObj['Check'] = totalArr[i];
          homeScoreArr.push(eachObj);
        }
        for(var i = 0 ; i < awayTmpArr.length ; i++){
          var eachObj = {};
          eachObj['InningScore'] = awayTmpArr[i];
          eachObj['Check'] = totalArr[i];
          awayScoreArr.push(eachObj);
        }

        awayObj['Score'] = awayScoreArr;
        homeObj['Score'] = homeScoreArr;
      }


      awayObj['TeamName'] = jsonObj['away']['teamName'];
      awayObj['TeamRank'] = jsonObj['away']['awayRank'];
      awayObj['WinDrawLose'] = jsonObj['away']['awayWDL'];
      if(jsonObj['away']['awayTeamStat'] != null){
        awayStat['BatH'] = jsonObj['away']['awayTeamStat']['batH']; // 안타
        awayStat['BatHr'] = jsonObj['away']['awayTeamStat']['batHr']; // 홈런
        if(jsonObj['away']['awayTeamStat']['batAvg'] != null){
          awayStat['BatAvg'] = Number(jsonObj['away']['awayTeamStat']['batAvg']).toFixed(3); // 타율 
        }else{
          awayStat['BatAvg'] = '-';
        }
        awayStat['PitSo'] = jsonObj['away']['awayTeamStat']['pitSo']; // 탈삼진
        awayStat['BatSb'] = jsonObj['away']['awayTeamStat']['batSb']; // 잔루
        awayStat['FldErr'] = jsonObj['away']['awayTeamStat']['fldErr']; // 실책
        awayStat['BatGdp'] = jsonObj['away']['awayTeamStat']['batGdp']; // 병살
        awayStat['BatLob'] = jsonObj['away']['awayTeamStat']['batLob']; // 잔루
        awayStat['BatBbhp'] = jsonObj['away']['awayTeamStat']['batBbhp']; // 사사구
        awayObj['StatDetail'] = awayStat;
      }
      if(jsonObj['away']['awayPersonStat'] != null){
        for(var i = 0 ; i < jsonObj['away']['awayPersonStat'].length ; i++){
            if(jsonObj['away']['awayPersonStat'][i]['positionNameKo'] == '투수' && (jsonObj['away']['awayPersonStat'][i]['batAb'] == 0 || jsonObj['away']['awayPersonStat'][i]['batAb'] == null)){
              // 투수
              var awayPitcherObj = {};
              awayPitcherObj['PitIp'] = jsonObj['away']['awayPersonStat'][i]['pitIp']; // 이닝
              awayPitcherObj['PitNp'] = jsonObj['away']['awayPersonStat'][i]['pitNp']; // 투구수
              awayPitcherObj['PitH'] = jsonObj['away']['awayPersonStat'][i]['pitH']; // 피안타
              awayPitcherObj['PitSo'] = jsonObj['away']['awayPersonStat'][i]['pitSo']; // 탈삼진
              awayPitcherObj['PitBbhp'] = jsonObj['away']['awayPersonStat'][i]['pitBbhp']; // 사사구
              awayPitcherObj['PitHr'] = jsonObj['away']['awayPersonStat'][i]['pitHr']; // 피홈런
              awayPitcherObj['PitR'] = jsonObj['away']['awayPersonStat'][i]['pitR']; // 실점
              awayPitcherObj['PitEr'] = jsonObj['away']['awayPersonStat'][i]['pitEr']; // 자책
              if(jsonObj['away']['awayPersonStat'][i]['pitEra'] != null){
                awayPitcherObj['PitEra'] = Number(jsonObj['away']['awayPersonStat'][i]['pitEra']).toFixed(3); // ERA
              }else{
                awayPitcherObj['PitEra'] = '-';
              }
              if(jsonObj['away']['awayPersonStat'][i]['pitWhip'] != null){
                awayPitcherObj['PitWhip'] = Number(jsonObj['away']['awayPersonStat'][i]['pitWhip']).toFixed(3); // WHIP
              }else{
                awayPitcherObj['PitWhip'] = '-';
              }
             
              awayPitcherObj['PositionName'] = jsonObj['away']['awayPersonStat'][i]['positionNameKo'];
              awayPitcherObj['PlayerName'] = jsonObj['away']['awayPersonStat'][i]['personName'];
              awayPitcherObj['PlayerImg'] = jsonObj['away']['awayPersonStat'][i]['imageUrl'];              
              awayPitcherArr.push(awayPitcherObj);
            }else if(jsonObj['away']['awayPersonStat'][i]['positionNameKo'] == '투수' && jsonObj['away']['awayPersonStat'][i]['batAb'] > 0){
              // 투수 겸 타자
              var awayPitcherObj = {};
              var awayBatObj = {};
              awayPitcherObj['PitIp'] = jsonObj['away']['awayPersonStat'][i]['pitIp']; // 이닝
              awayPitcherObj['PitNp'] = jsonObj['away']['awayPersonStat'][i]['pitNp']; // 투구수
              awayPitcherObj['PitH'] = jsonObj['away']['awayPersonStat'][i]['pitH']; // 피안타
              awayPitcherObj['PitSo'] = jsonObj['away']['awayPersonStat'][i]['pitSo']; // 탈삼진
              awayPitcherObj['PitBbhp'] = jsonObj['away']['awayPersonStat'][i]['pitBbhp']; // 사사구
              awayPitcherObj['PitHr'] = jsonObj['away']['awayPersonStat'][i]['pitHr']; // 피홈런
              awayPitcherObj['PitR'] = jsonObj['away']['awayPersonStat'][i]['pitR']; // 실점
              awayPitcherObj['PitEr'] = jsonObj['away']['awayPersonStat'][i]['pitEr']; // 자책
              if(jsonObj['away']['awayPersonStat'][i]['pitEra'] != null){
                awayPitcherObj['PitEra'] = Number(jsonObj['away']['awayPersonStat'][i]['pitEra']).toFixed(3); // ERA
              }else{
                awayPitcherObj['PitEra'] = '-';
              }
              if(jsonObj['away']['awayPersonStat'][i]['pitWhip'] != null){
                awayPitcherObj['PitWhip'] = Number(jsonObj['away']['awayPersonStat'][i]['pitWhip']).toFixed(3); // WHIP
              }else{
                awayPitcherObj['PitWhip'] = '-';
              }
              awayPitcherObj['PositionName'] = jsonObj['away']['awayPersonStat'][i]['positionNameKo'];
              awayPitcherObj['PlayerName'] = jsonObj['away']['awayPersonStat'][i]['personName'];
              awayPitcherObj['PlayerImg'] = jsonObj['away']['awayPersonStat'][i]['imageUrl'];                  
              awayPitcherArr.push(awayPitcherObj);
              awayBatObj['BatAb'] = jsonObj['away']['awayPersonStat'][i]['batAb']; // 타수
              awayBatObj['BatH'] = jsonObj['away']['awayPersonStat'][i]['batH']; // 안타
              awayBatObj['Bat2b'] = jsonObj['away']['awayPersonStat'][i]['bat2b']; // 2타
              awayBatObj['Bat3b'] = jsonObj['away']['awayPersonStat'][i]['bat3b']; // 3타
              awayBatObj['BatHr'] = jsonObj['away']['awayPersonStat'][i]['batHr']; // 홈런
              awayBatObj['BatR'] = jsonObj['away']['awayPersonStat'][i]['batR']; // 득점
              awayBatObj['BatRbi'] = jsonObj['away']['awayPersonStat'][i]['batRbi']; // 실점
              awayBatObj['BatSo'] = jsonObj['away']['awayPersonStat'][i]['batSo']; // 삼진
              awayBatObj['BatBb'] = jsonObj['away']['awayPersonStat'][i]['batBb']; // 사사구
              if(jsonObj['away']['awayPersonStat'][i]['batAvg'] != null){
                awayBatObj['BatAvg'] = Number(jsonObj['away']['awayPersonStat'][i]['batAvg']).toFixed(3); // 타율
              }else{
                awayBatObj['BatAvg'] = '-';
              }
              
              awayBatObj['PositionName'] = jsonObj['away']['awayPersonStat'][i]['positionNameKo'];
              awayBatObj['PlayerName'] = jsonObj['away']['awayPersonStat'][i]['personName'];
              awayBatObj['PlayerImg'] = jsonObj['away']['awayPersonStat'][i]['imageUrl'];                  
              awayBatArr.push(awayBatObj);
            }else{
              // 타자
              var awayBatObj = {};
              awayBatObj['BatAb'] = jsonObj['away']['awayPersonStat'][i]['batAb']; // 타수
              awayBatObj['BatH'] = jsonObj['away']['awayPersonStat'][i]['batH']; // 안타
              awayBatObj['Bat2b'] = jsonObj['away']['awayPersonStat'][i]['bat2b']; // 2타
              awayBatObj['Bat3b'] = jsonObj['away']['awayPersonStat'][i]['bat3b']; // 3타
              awayBatObj['BatHr'] = jsonObj['away']['awayPersonStat'][i]['batHr']; // 홈런
              awayBatObj['BatR'] = jsonObj['away']['awayPersonStat'][i]['batR']; // 득점
              awayBatObj['BatRbi'] = jsonObj['away']['awayPersonStat'][i]['batRbi']; // 타점
              awayBatObj['BatSo'] = jsonObj['away']['awayPersonStat'][i]['batSo']; // 삼진
              awayBatObj['BatBb'] = jsonObj['away']['awayPersonStat'][i]['batBb']; // 사사구
              if(jsonObj['away']['awayPersonStat'][i]['batAvg'] != null){
                awayBatObj['BatAvg'] = Number(jsonObj['away']['awayPersonStat'][i]['batAvg']).toFixed(3); // 타율
              }else{
                awayBatObj['BatAvg'] = '-';
              }
              
              awayBatObj['PositionName'] = jsonObj['away']['awayPersonStat'][i]['positionNameKo'];
              awayBatObj['PlayerName'] = jsonObj['away']['awayPersonStat'][i]['personName'];
              awayBatObj['PlayerImg'] = jsonObj['away']['awayPersonStat'][i]['imageUrl'];                   
              awayBatArr.push(awayBatObj);
            }
        }
        awayObj['Bat'] = awayBatArr;
        awayObj['Pitcher'] = awayPitcherArr;
      } 

      resultObj['BaseBallSummary'] = summaryObj;
      resultObj['HomeTeam'] = homeObj;
      resultObj['AwayTeam'] = awayObj;


      if(jsonObj['nextMatch'] != null){
        for(var i=0 ; i < jsonObj['nextMatch'].length ; i++){
          var eachObj = {};
          eachObj['HomeTeamName'] = jsonObj['nextMatch'][i]['home']['team']['shortNameKo'];
          eachObj['AwayTeamName'] = jsonObj['nextMatch'][i]['away']['team']['shortNameKo'];
          eachObj['HomeScore'] = jsonObj['nextMatch'][i]['home']['result'];
          eachObj['AwayScore'] = jsonObj['nextMatch'][i]['away']['result'];
          eachObj['FieldName'] = jsonObj['nextMatch'][i]['field']['shortNameKo'];
          eachObj['SeasonName'] = jsonObj['nextMatch'][i]['season']['name'];
          eachObj['MatchDate'] = jsonObj['nextMatch'][i]['startDate'].substr(0,4) + '년 ' + jsonObj['nextMatch'][i]['startDate'].substr(4,2) + '월 ' + jsonObj['nextMatch'][i]['startDate'].substr(6,2) +'일';
          eachObj['HomeTeamImageUrl'] = jsonObj['nextMatch'][i]['home']['team']['imageUrl'];
          eachObj['AwayTeamImageUrl'] = jsonObj['nextMatch'][i]['away']['team']['imageUrl'];
          eachObj['MatchTime'] = jsonObj['nextMatch'][i]['startTime'].substr(0,2) + ':' + jsonObj['nextMatch'][i]['startTime'].substr(2,2);
          if(jsonObj['nextMatch'][i]['gameStatus'] == 'CANCEL')
          {
            eachObj['GameStatus'] = '경기취소';
          }else if(jsonObj['nextMatch'][i]['gameStatus'] == 'END')
          {
            eachObj['Check'] = 'yes';
            eachObj['GameStatus'] = '종료';
          }else if(jsonObj['nextMatch'][i]['gameStatus'] == 'POSTPONE'){
            eachObj['GameStatus'] = '연기';
          }else if(jsonObj['nextMatch'][i]['gameStatus'] == 'BEFORE'){
            eachObj['GameStatus'] = '경기전'
          }else if(jsonObj['nextMatch'][i]['gameStatus'] == 'PLAY')
          {
            eachObj['Check'] = 'yes';
            eachObj['GameStatus'] = '경기중';
          }
          eachObj['GameRound'] = jsonObj['nextMatch'][i]['gameDetailType']['nameKo'];
          eachObj['Category'] = '야구';
          eachObj['GameId'] = jsonObj['nextMatch'][i]['gameId'];
          if(i == 0){
            resultObj['NextMatchHome'] = eachObj;
          }else if(i == 1){ 
            resultObj['NextMatchAway'] = eachObj;
          }
        }
      } 

      console.log(resultObj);
      return resultObj;

    },
    getSoccerGameDetail : function(SoccerGameDetail){
      const console = require('console');
      var jsonObj = JSON.parse(SoccerGameDetail);
      console.log(jsonObj);
      var resultObj = {};
      var homePersonArr = [];
      var awayPersonArr = [];
      
      var summaryObj = {};
      var homeGoalArr = [];
      var awayGoalArr = [];
      var homeObj = {};
      var awayObj = {};
      summaryObj['SeasonOneDepth'] = String(jsonObj['summary']['season']).substr(0,4);
      summaryObj['SeasonTwoDepth'] = String(jsonObj['summary']['season']).substr(4);
      summaryObj['EngLeagueName'] = jsonObj['summary']['leagueName'];
      summaryObj['MatchDate'] = jsonObj['summary']['matchDate'];
      summaryObj['MatchTime'] = jsonObj['summary']['matchTime'];
      summaryObj['GameRound'] = jsonObj['summary']['gameRound'];
      summaryObj['HomeTeamImageUrl'] = jsonObj['summary']['homeTeamImageUrl'];
      summaryObj['HomeTeamName'] = jsonObj['summary']['homeTeamName'];
      summaryObj['AwayTeamImageUrl'] = jsonObj['summary']['awayTeamImageUrl'];
      summaryObj['AwayTeamName'] = jsonObj['summary']['awayTeamName'];
      summaryObj['HomeScore'] = jsonObj['summary']['homeScore'];
      summaryObj['AwayScore'] = jsonObj['summary']['awayScore'];
      summaryObj['HomeShootOut'] = jsonObj['summary']['homeShootOut'];
      summaryObj['AwayShootOut'] = jsonObj['summary']['awayShootOut'];
      summaryObj['FieldName'] = jsonObj['summary']['fieldName'];
      if(summaryObj['EngLeagueName'] == '챔피언스리그' || summaryObj['EngLeagueName'] == '유로파리그'){
        summaryObj['LeagueCheck'] = 'exists';
      }
      if(jsonObj['summary']['status'] == 'CANCEL')
      {
        summaryObj['GameStatus'] = '경기취소';
      }else if(jsonObj['summary']['status'] == 'END')
      {
        summaryObj['GameStatus'] = '종료';
        summaryObj['Check'] = 'exists';
      }else if(jsonObj['summary']['status'] == 'POSTPONE'){
        summaryObj['GameStatus'] = '연기';
      }else if(jsonObj['summary']['status'] == 'BEFORE'){
        summaryObj['GameStatus'] = '경기전';
      }else if(jsonObj['summary']['status'] == 'PLAY'){
        summaryObj['GameStatus'] = '경기중';
        summaryObj['Check'] = 'exists';
      }

      resultObj['GameSummary'] = summaryObj;

      if(jsonObj['goal'] != null){
        // 0:0일때 에러 방지를 위해
        for(var i = 0 ; i < jsonObj['goal'].length ; i++){
          var goalObj = {};
          if(jsonObj['goal'][i]['goalType'] == 'OWN'){
            // 자책골 일 경우
            goalObj['GoalType'] = '자책골';
          }
          
          goalObj['Period'] = jsonObj['goal'][i]['periodType']; // FIRST_HALF , SECOND_HALF, EXTRA_FIRST_HALF, EXTRA_SECOND_HALF
          if(goalObj['Period'] == 'FIRST_HALF'){
            goalObj['ScoredTime'] = jsonObj['goal'][i]['timeMin'];
          }else if(goalObj['Period'] == 'SECOND_HALF'){
            goalObj['ScoredTime'] = String(Number(jsonObj['goal'][i]['timeMin']) + 45);
          }else if(goalObj['Period'] == 'EXTRA_FIRST_HALF'){
            goalObj['ScoredTime'] = String(Number(jsonObj['goal'][i]['timeMin']) + 90);
          }else if(goalObj['Period'] == 'EXTRA_SECOND_HALF'){
            goalObj['ScoredTime'] = String(Number(jsonObj['goal'][i]['timeMin']) + 105);
          }
          if(jsonObj['goal'][i]['person']['lastNameKo'] != null){
            goalObj['ScoredPlayerName'] = jsonObj['goal'][i]['person']['lastNameKo'];
          }else{
            goalObj['ScoredPlayerName'] = jsonObj['goal'][i]['person']['nameKo'];
          }
          
          if(jsonObj['goal'][i]['homeAway'] == 'HOME'){
            //Home
            homeGoalArr.push(goalObj);
          }else if(jsonObj['goal'][i]['homeAway'] == 'AWAY'){
            //Away
            awayGoalArr.push(goalObj);
          }
        }
        homeGoalArr.reverse();
        awayGoalArr.reverse();
        resultObj['HomeGoalPerson'] = homeGoalArr;
        resultObj['AwayGoalPerson'] = awayGoalArr;
      }
      

      homeObj['TeamName'] = jsonObj['home']['teamName'];
      awayObj['TeamName'] = jsonObj['away']['teamName'];
      
      // formation Data 불러올 때
      var tmp = ''; 
      var tmpArr = ['home', 'away'];
      if(jsonObj['home']['formation'] != null && jsonObj['away']['formation'] != null){
        for(var j = 0 ; j < tmpArr.length ; j++){
          for(var i = 0 ; i < jsonObj[tmpArr[j]]['formation']['nameMain'].length ; i++){
            tmp += jsonObj[tmpArr[j]]['formation']['nameMain'].charAt(i);
            if(i != jsonObj[tmpArr[j]]['formation']['nameMain'].length-1){
              tmp += '-'
            }
          }
          if(tmpArr[j] == 'home'){
            homeObj['Formation'] = tmp;
            tmp = '';
          }else if(tmpArr[j] == 'away'){
            awayObj['Formation'] = tmp;
            tmp = '';
          }
        }
      }
      

      var homeChangeCount = 0;
      var awayChangeCount = 0;
      if(jsonObj['home']['person'] && jsonObj['away']['person'] != null){
        for(var i = 0 ; i < tmpArr.length ; i++){
          for(var j = 0 ; j < jsonObj[tmpArr[i]]['person'].length ; j++){
            var eachObj = {};
            if(jsonObj[tmpArr[i]]['person'][j]['lastName'] != null){
              eachObj['LastName'] = jsonObj[tmpArr[i]]['person'][j]['lastName'];
            }else{
              eachObj['LastName'] = jsonObj[tmpArr[i]]['person'][j]['nameKo'];
            }
            eachObj['BackNumber'] = jsonObj[tmpArr[i]]['person'][j]['backNumber'];
            eachObj['IsChanged'] = jsonObj[tmpArr[i]]['person'][j]['isChanged'];
            eachObj['IsStarted'] = jsonObj[tmpArr[i]]['person'][j]['isStarted'];
            eachObj['PositionName'] = jsonObj[tmpArr[i]]['person'][j]['positionName'];
            eachObj['CardType'] = jsonObj[tmpArr[i]]['person'][j]['cardType'];
            if(tmpArr[i] == 'home' && eachObj['IsChanged'] == true && eachObj['IsStarted'] == true){
              homeChangeCount++;
            }else if(tmpArr[i] == 'away' && eachObj['IsChanged'] == true && eachObj['IsStarted'] == true){
              awayChangeCount++;
            }
            if(tmpArr[i]== 'home'){
              homePersonArr.push(eachObj);
            }else if(tmpArr[i] == 'away'){
              awayPersonArr.push(eachObj);
            }
          }
        }
      }


      homeObj['Person'] = homePersonArr;
      awayObj['Person'] = awayPersonArr;
      if(jsonObj['home']['stat'] != null){
        for(var i = 0 ; i < tmpArr.length ; i++){
          var eachObj = {};
          eachObj['Possession'] = jsonObj[tmpArr[i]]['stat']['possession'];// 볼 점유율
          eachObj['Sht'] = jsonObj[tmpArr[i]]['stat']['sht'];// 슈팅
          eachObj['Sog'] = jsonObj[tmpArr[i]]['stat']['sog'];// 유효슈팅
          eachObj['Ck'] = jsonObj[tmpArr[i]]['stat']['ck'];// 코너킥
          eachObj['Fo'] = jsonObj[tmpArr[i]]['stat']['fo'];// 파울
          eachObj['Off'] = jsonObj[tmpArr[i]]['stat']['off'];// 오프사이드
          eachObj['Yel'] = jsonObj[tmpArr[i]]['stat']['yel'];// 경고
          eachObj['Red'] = jsonObj[tmpArr[i]]['stat']['red'];// 퇴장
          if(tmpArr[i] == 'home'){
            eachObj['Chg'] = homeChangeCount;
            homeObj['TeamStat'] = eachObj;
          }else if(tmpArr[i] == 'away'){
            eachObj['Chg'] = awayChangeCount;
            awayObj['TeamStat'] = eachObj;
          }
        }
      }
      

      resultObj['Home'] = homeObj;
      resultObj['Away'] = awayObj;
      var sortPositionArr = ['GK', 'DF' ,'MF', 'FW', 'SUB'];
      var tmpARR = ['Home', 'Away'];
      var homePersonTmpArr = [];
      var awayPersonTmpArr = [];
      for(var k = 0 ; k < tmpARR.length ; k++){
        for(var i = 0 ; i < sortPositionArr.length ; i++){
          for(var j = 0 ; j < resultObj[tmpARR[k]]['Person'].length ; j++){
            if(sortPositionArr[i] == resultObj[tmpARR[k]]['Person'][j]['PositionName']){
              var obj = {};
              if(tmpARR[k] == 'Home'){
                homePersonTmpArr.push(resultObj[tmpARR[k]]['Person'][j]);
              }else if(tmpARR[k] == 'Away'){
                awayPersonTmpArr.push(resultObj[tmpARR[k]]['Person'][j]);
              }
              resultObj[tmpARR[k]]['Person'].splice(j,1)
              j= -1;
              continue;
            }
          }
        }
      }
      
      resultObj['Home']['Person'] = homePersonTmpArr;
      resultObj['Away']['Person'] = awayPersonTmpArr;

      if(jsonObj['nextMatch'] != null){
        for(var i=0 ; i < jsonObj['nextMatch'].length ; i++){
          var eachObj = {};
          eachObj['HomeTeamName'] = jsonObj['nextMatch'][i]['home']['team']['shortNameKo'];
          eachObj['AwayTeamName'] = jsonObj['nextMatch'][i]['away']['team']['shortNameKo'];
          eachObj['HomeScore'] = jsonObj['nextMatch'][i]['home']['result'];
          eachObj['AwayScore'] = jsonObj['nextMatch'][i]['away']['result'];
          eachObj['FieldName'] = jsonObj['nextMatch'][i]['field']['shortNameKo'];
          eachObj['SeasonName'] = jsonObj['nextMatch'][i]['season']['name'];
          eachObj['MatchDate'] = jsonObj['nextMatch'][i]['startDate'].substr(0,4) + '년 ' + jsonObj['nextMatch'][i]['startDate'].substr(4,2) + '월 ' + jsonObj['nextMatch'][i]['startDate'].substr(6,2) +'일';
          eachObj['HomeTeamImageUrl'] = jsonObj['nextMatch'][i]['home']['team']['imageUrl'];
          eachObj['AwayTeamImageUrl'] = jsonObj['nextMatch'][i]['away']['team']['imageUrl'];
          eachObj['MatchTime'] = jsonObj['nextMatch'][i]['startTime'].substr(0,2) + ':' + jsonObj['nextMatch'][i]['startTime'].substr(2,2);
          if(jsonObj['nextMatch'][i]['gameStatus'] == 'CANCEL')
          {
            eachObj['GameStatus'] = '경기취소';
          }else if(jsonObj['nextMatch'][i]['gameStatus'] == 'END')
          {
            eachObj['Check'] = 'yes';
            eachObj['GameStatus'] = '종료';
            eachObj['HomeShootOut'] = jsonObj['nextMatch'][i]['homeScore']['shootout'];
            eachObj['AwayShootOut'] = jsonObj['nextMatch'][i]['awayScore']['shootout'];
          }else if(jsonObj['nextMatch'][i]['gameStatus'] == 'POSTPONE'){
            eachObj['GameStatus'] = '연기';
          }else if(jsonObj['nextMatch'][i]['gameStatus'] == 'BEFORE'){
            eachObj['GameStatus'] = '경기전'
          }else if(jsonObj['nextMatch'][i]['gameStatus'] == 'PLAY')
          {
            eachObj['Check'] = 'yes';
            eachObj['GameStatus'] = '경기중';
            eachObj['HomeShootOut'] = jsonObj['nextMatch'][i]['homeScore']['shootout'];
            eachObj['AwayShootOut'] = jsonObj['nextMatch'][i]['awayScore']['shootout'];
          }
          
          if(jsonObj['nextMatch'][i]['gameDetailType'] != null){
            if(jsonObj['nextMatch'][i]['gameDetailType']['nameKo'] == '32강' || jsonObj['nextMatch'][i]['gameDetailType']['nameKo'] == '16강' || jsonObj['nextMatch'][i]['gameDetailType']['nameKo'] == '8강' || jsonObj['nextMatch'][i]['gameDetailType']['nameKo'] == '준결승' || jsonObj['nextMatch'][i]['gameDetailType']['nameKo'] == '결승'){
              eachObj['GameRound'] = jsonObj['nextMatch'][i]['gameDetailType']['nameKo'];
            }else{
              eachObj['GameRound'] = String(jsonObj['nextMatch'][i]['roundSeq']) + 'R';
            }
          }else{
            eachObj['GameRound'] = String(jsonObj['nextMatch'][i]['roundSeq']) + 'R';
          }
          eachObj['Category'] = '축구';
          eachObj['GameId'] = jsonObj['nextMatch'][i]['gameId'];
          if(i == 0){
            resultObj['NextMatchHome'] = eachObj;
          }else if(i ==1){
            resultObj['NextMatchAway'] = eachObj;
          }
        }
      } 
      if(jsonObj['highlight'] != null){
        resultObj['HighLightURL'] = jsonObj['highlight']['etcInfo']['videoUrl'];
        resultObj['HighLightImageURL'] = jsonObj['highlight']['image'][0];
      }
      
      console.log(resultObj);
      return resultObj;
    },
    getLeagueRankJSON2 : function(SoccerRankJSON, leagueName, league, Round, roundName){
      const console = require('console');
      var jsonObj = JSON.parse(SoccerRankJSON);
      var matchDateArray = [];
      var resultArray = [];
      var searchTeam;
      var fail = require('fail');
      var totalMatch = jsonObj['schedule'].length;
      var count = 0;
      if(totalMatch == 0){
        throw fail.checkedError('경기 일정이 아직 없습니다.', 'empty', {});
      }

      if(league == 'uefacl' || league == 'uefacup'){
        if(String(Round) == '1'){
          // 결승 일 때
          var eachObj = {};
          var round1Obj = {};
          eachObj['EngLeagueName'] = league;
          eachObj['GameRound'] = roundName;
          eachObj['HomeTeamName'] = jsonObj['schedule'][0]['homeTeamName'];
          eachObj['AwayTeamName'] = jsonObj['schedule'][0]['awayTeamName'];
          eachObj['HomeTeamImageUrl'] = jsonObj['schedule'][0]['homeTeamImageUrl'];
          eachObj['AwayTeamImageUrl'] = jsonObj['schedule'][0]['awayTeamImageUrl'];
          round1Obj['HomeScore'] = jsonObj['schedule'][0]['homeResult'];
          round1Obj['AwayScore'] = jsonObj['schedule'][0]['awayResult'];
          round1Obj['HomeShootOut'] = jsonObj['schedule'][0]['homeShootout'];
          round1Obj['AwayShootOut'] = jsonObj['schedule'][0]['awayShootout'];
          round1Obj['MatchDate'] = jsonObj['schedule'][0]['startDate'].substr(4,2) + '.' + jsonObj['schedule'][0]['startDate'].substr(6,2);
          if(jsonObj['schedule'][0]['gameStatus'] == 'END'){
            round1Obj['GameStatus'] = '종료';
          }else if(jsonObj['schedule'][0]['gameStatus'] == 'CANCEL'){
            round1Obj['GameStatus'] = '경기취소';
          }else if(jsonObj['schedule'][0]['gameStatus'] == 'POSTPONE'){
            round1Obj['GameStatus'] = '연기';
          }else if(jsonObj['schedule'][0]['gameStatus'] == 'BEFORE'){
            round1Obj['GameStatus'] = '경기전';
          }else if(jsonObj['schedule'][0]['gameStatus'] == 'PLAY'){
            round1Obj['GameStatus'] = '경기중';
          }
          eachObj['Round1'] = round1Obj;
          eachObj['HomeTotalScore'] = round1Obj['HomeScore'];
          eachObj['AwayTotalScore'] = round1Obj['AwayScore'];
          eachObj['HomeShootOut'] = round1Obj['HomeShootOut'];
          eachObj['AwayShootOut'] = round1Obj['AwayShootOut'];
          resultArray.push(eachObj);
        }else{
          // 32강, 16강, 8강, 4강 고려하기 
          for(var i=0 ; i < totalMatch ; i++){
            var eachObj = {};
            var round1Obj = {};
            var round2Obj = {};
            eachObj['EngLeagueName'] = league;
            eachObj['GameRound'] = roundName;
            eachObj['HomeTeamName'] = jsonObj['schedule'][i]['homeTeamName'];
            eachObj['AwayTeamName'] = jsonObj['schedule'][i]['awayTeamName'];
            eachObj['HomeTeamImageUrl'] = jsonObj['schedule'][i]['homeTeamImageUrl'];
            eachObj['AwayTeamImageUrl'] = jsonObj['schedule'][i]['awayTeamImageUrl'];
            round1Obj['HomeScore'] = jsonObj['schedule'][i]['homeResult'];
            round1Obj['AwayScore'] = jsonObj['schedule'][i]['awayResult'];
            round1Obj['HomeShootOut'] = jsonObj['schedule'][i]['homeShootout'];
            round1Obj['AwayShootOut'] = jsonObj['schedule'][i]['awayShootout'];
            round1Obj['MatchTime'] = jsonObj['schedule'][i]['startTime'].substr(0,2) + ":" + jsonObj['schedule'][i]['startTime'].substr(2,2);
            round1Obj['MatchDate'] = jsonObj['schedule'][i]['startDate'].substr(4,2) + '.' + jsonObj['schedule'][i]['startDate'].substr(6,2);
            if(jsonObj['schedule'][i]['gameStatus'] == 'END'){
              round1Obj['GameStatus'] = '종료';
            }else if(jsonObj['schedule'][i]['gameStatus'] == 'CANCEL'){
              round1Obj['GameStatus'] = '경기취소';
            }else if(jsonObj['schedule'][i]['gameStatus'] == 'POSTPONE'){
              round1Obj['GameStatus'] = '연기';
            }else if(jsonObj['schedule'][i]['gameStatus'] == 'BEFORE'){
              round1Obj['GameStatus'] = '경기전';
            }else if(jsonObj['schedule'][i]['gameStatus'] == 'PLAY'){
              round1Obj['GameStatus'] = '경기중';
            }      
            searchTeam = jsonObj['schedule'][i]['homeTeamName'];
            
            for(var j=i+1 ; j < totalMatch ; j++){
              if(jsonObj['schedule'][j]['awayTeamName'] == searchTeam){
                round2Obj['HomeScore'] = jsonObj['schedule'][j]['awayResult'];
                round2Obj['AwayScore'] = jsonObj['schedule'][j]['homeResult'];
                round2Obj['HomeShootOut'] = jsonObj['schedule'][j]['awayShootout'];
                round2Obj['AwayShootOut'] = jsonObj['schedule'][j]['homeShootout'];
                round2Obj['MatchTime'] = jsonObj['schedule'][j]['startTime'].substr(0,2) + ":" + jsonObj['schedule'][j]['startTime'].substr(2,2);
                round2Obj['MatchDate'] = jsonObj['schedule'][j]['startDate'].substr(4,2) + '.' + jsonObj['schedule'][j]['startDate'].substr(6,2);
                if(jsonObj['schedule'][j]['gameStatus'] == 'END'){
                  round2Obj['GameStatus'] = '종료';
                }else if(jsonObj['schedule'][j]['gameStatus'] == 'CANCEL'){
                  round2Obj['GameStatus'] = '경기취소';
                }else if(jsonObj['schedule'][j]['gameStatus'] == 'POSTPONE'){
                  round2Obj['GameStatus'] = '연기';
                }else if(jsonObj['schedule'][j]['gameStatus'] == 'BEFORE'){
                  round2Obj['GameStatus'] = '경기전';
                }else if(jsonObj['schedule'][j]['gameStatus'] == 'PLAY'){
                  round2Obj['GameStatus'] = '경기중';
                }         
                eachObj['Round1'] = round1Obj;
                eachObj['Round2'] = round2Obj;
                eachObj['HomeTotalScore'] = Number(round1Obj['HomeScore']) + Number(round2Obj['HomeScore']);
                eachObj['AwayTotalScore'] = Number(round1Obj['AwayScore']) + Number(round2Obj['AwayScore']);
                if(round1Obj['HomeShootOut'] != null){
                  eachObj['HomeShootOut'] = round1Obj['HomeShootOut'];
                  eachObj['AwayShootOut'] = round1Obj['AwayShootOut'];
                }else if(round2Obj['HomeShootOut'] != null){
                  eachObj['HomeShootOut'] = round2Obj['HomeShootOut'];
                  eachObj['AwayShootOut'] = round2Obj['AwayShootOut'];
                }
                resultArray.push(eachObj);
                break;
              }
            }
          } 
        }
      }else{
        throw fail.checkedError('리그 이름을 다시 확인해주세요. 유로파리그, 챔피언스리그만 32강, 16강, 8강, 4강이 있습니다.', 'WrongLeagueName2', {});
      }
      console.log(resultArray);

      return resultArray;
    },
    getSeason : function(SeasonOneDepth, SeasonTwoDepth){
      var tmp, tmp1 = "";
      var season = "";
      var compareSeason;
      const fail = require('fail');
      const console = require('console');
      
      if(this.getDigit(SeasonOneDepth) == 2 && this.getDigit(SeasonTwoDepth) == 4){
        // ex)17-2018시즌
        tmp = "20"+String(SeasonOneDepth);
        season = tmp + String(SeasonTwoDepth);
        compareSeason = Number(SeasonTwoDepth) - Number(tmp);
      }else if(this.getDigit(SeasonOneDepth) == 4 && this.getDigit(SeasonTwoDepth) == 2){
        // ex)2017-18시즌
        tmp = "20"+String(SeasonTwoDepth);
        season = String(SeasonOneDepth) + tmp;
        compareSeason = Number(tmp) - Number(SeasonOneDepth);
      }else if(this.getDigit(SeasonOneDepth) == 2 && this.getDigit(SeasonTwoDepth) == 2){
        // ex)17-18시즌
        tmp = "20"+String(SeasonOneDepth);
        tmp1 = "20"+String(SeasonTwoDepth);
        season = tmp+tmp1;
        compareSeason = Number(tmp1) - Number(tmp);
      }else if(this.getDigit(SeasonOneDepth) == 4 && this.getDigit(SeasonTwoDepth) == 4){
        // ex)2017-2018시즌
        season = String(SeasonOneDepth)+String(SeasonTwoDepth);
        compareSeason = Number(SeasonTwoDepth) - Number(SeasonOneDepth);
      }else if(this.getDigit(SeasonOneDepth) == 1 && this.getDigit(SeasonTwoDepth) == 2){
        // ex)09-10시즌
        tmp = "200"+String(SeasonOneDepth);
        tmp1 = "20"+String(SeasonTwoDepth);
        season = tmp+tmp1;
        compareSeason = Number(tmp1) - Number(tmp);
      }else{
        throw fail.checkedError('한 시��씩 검색할 수 있습니다. 다시 설정해 주세요.', 'LongTearm', {});
      }

      if(compareSeason > 1 || compareSeason <= 0){
        throw fail.checkedError('한 시즌씩 검색할 수 있습니다. 다시 설정해 주세요.', 'LongTearm', {});
      }else{
        return season;
      }
    },
    getSubject : function(sortField){
      var subject;
      switch(String(sortField)){
        case 'pitW':
          subject = '다승'; 
          break;
        case 'pitEra':
          subject = '평균 자책';
          break;
        case 'pitSo':
          subject = '탈삼진';
          break;
        case 'pitSv':
          subject = '세이브';
          break;
        case 'pitWhip':
          subject = 'WHIP';
          break;
        case 'batAvg':
          subject = '타율';
          break;
        case 'batRbi':
          subject = '타점';
          break;
        case 'batHr':
          subject = '홈런';
          break;
        case 'batSb':
          subject = '도루';
          break;
        case 'batOps':
          subject = 'OPS';
          break;
        case 'gf':
          subject = '득점';
          break;
        case 'ast':
          subject = '도움';
          break;
        case 'opts':
          subject = '공격 포인트';
          break;
        case 'sht':
          subject = '슈팅';
          break;
        case 'gp':
          subject = '경기 수'
          break;
      }
      return subject;
    },
    getSubLeagueName : function(engName){
      var text;
      switch(engName){
        case 'AL':
          text = '아메리칸 리그';
          break;
        case 'NL':
          text = '내셔널 리그';
          break;
        case 'PL':
          text = '퍼시픽 리그';
          break;
        case 'CL':
          text = '센트럴 리그'
          break;
      }
      return text;
    },
    getBaseBallLeagueName : function(BaseballTeamName){
      var leagueName;
      if(BaseballTeamName == '애틀랜타' || BaseballTeamName == '워싱턴' || BaseballTeamName == '뉴욕 메츠' || BaseballTeamName == '필라델피아'|| BaseballTeamName == '마이애미' || BaseballTeamName == 'LA다저스' || BaseballTeamName == '애리조나'|| BaseballTeamName == '샌프란시스코'|| BaseballTeamName == '콜로라도'|| BaseballTeamName == '샌디에이고'|| BaseballTeamName == '세인트루이스'|| BaseballTeamName == '밀워키'|| BaseballTeamName == '시카고C'|| BaseballTeamName == '신시내티'|| BaseballTeamName == '피츠버그'|| BaseballTeamName == '뉴욕 양키스'|| BaseballTeamName == '탬파베이'|| BaseballTeamName == '보스턴'|| BaseballTeamName == '토론토'|| BaseballTeamName == '볼티모어'|| BaseballTeamName == '휴���턴'|| BaseballTeamName == '오클랜드'||BaseballTeamName == '텍사스'|| BaseballTeamName == 'LA에인절스'|| BaseballTeamName == '시애틀'|| BaseballTeamName == '미네소타'|| BaseballTeamName == '클리블랜드'|| BaseballTeamName == '시카고W'|| BaseballTeamName == '캔자스시티'|| BaseballTeamName == '디트로이트'){
        leagueName = '메이저리그';
      }else if(BaseballTeamName == '요미우리' || BaseballTeamName == '요코하마' || BaseballTeamName == '한신' || BaseballTeamName == '히로시마' || BaseballTeamName == '주니치' || BaseballTeamName == '야쿠르트'|| BaseballTeamName == '세이부' || BaseballTeamName == '소프트뱅크' || BaseballTeamName == '라쿠텐' || BaseballTeamName == '치바롯데' || BaseballTeamName == '닛폰햄'|| BaseballTeamName == '오릭스'){
        leagueName = '일본프로야구';
      }
      return leagueName;
    }
  }


