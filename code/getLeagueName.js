module.exports.function = function getLeagueNames (LeagueName, BaseballTeamName,SoccerTeamName, FromYear, FromMonth, FromDay, ToYear, ToMonth, ToDay) {
  
  const myUtil = require('/utils/requestUtils.js')
  return myUtil.handlingGetData(LeagueName, SoccerTeamName, BaseballTeamName,FromYear, FromMonth, FromDay, ToYear, ToMonth, ToDay)
}
