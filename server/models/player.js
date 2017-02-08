var appRoot = require('app-root-path');
var db = require(appRoot + '/server/config/db');
//---------------------------------------------------------------
exports.search = (name) => {
  return db.queryAsync('select distinct pitcherId, pitcher from data where pitcher like ? order by pitcher',
    [`%${name}%`]);
};
//---------------------------------------------------------------
exports.getData = (playerID, yr) => {
  console.log(playerID);
  return db.queryAsync(`select * from data where pitcherId = ?
    and seasonyear = ?
    order by gameDate`, [playerID, yr]);
};
//---------------------------------------------------------------
