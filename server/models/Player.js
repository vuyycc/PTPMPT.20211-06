const carodb = require('./carodb');

module.exports = {
    findByEmail: async ( Email) => {
        const result  = await carodb.get('player',{Email})
        return result[0];
    },

    create: async (player) => {
        const result = await carodb.add('player', player);
        return result.insertId;
    },

    getAllPlayers: async () => {
        return carodb.getAll('player');
    },

    delete: async (playerId) => {
        return carodb.delete('player', {ID: playerId})
    },

    patch: (entity, condition) => db.update('player',entity, condition),
    findBySearchText: async (searchText) => {
        return carodb.load(
            `SELECT * FROM user WHERE MATCH (fullname) against ('${searchText}' IN NATURAL LANGUAGE MODE)
      UNION
      SELECT * FROM user WHERE username like '%${searchText}%' OR email like '%${searchText}%'`,
        );
    },

}