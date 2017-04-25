const appRoot = require('app-root-path');
const db = require(`${appRoot}/server/config/db`);
//---------------------------------------------------------------
exports.search = (name) => db.queryAsync(`select distinct pitcherId, pitcher from data
  where pitcher like ? order by pitcher`, [`%${name}%`]);
//---------------------------------------------------------------
exports.getData = (playerID, yr) => db.queryAsync(`select * from data where pitcherId = ?
    and seasonyear = ? order by gameDate`, [playerID, yr]);
//---------------------------------------------------------------
