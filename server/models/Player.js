const carodb = require('./carodb');

module.exports = {
    findByEmail: async ( Email) => {
        const result  = await carodb.get('user',{Email})
        return result[0];
    }, 
    findById: async (playerId) => {
        const results = await carodb.get('user', { playerId });
        return results[0];
    },

    create: async (player) => {
        const result = await carodb.add('user', player);
        return result.insertId;
    },

    getAllPlayers: async () => {
        return carodb.getAll('user');
    },

    delete: async (playerId) => {
        return carodb.delete('user', {ID: playerId})
    },

    update: (entity, condition) => db.update('user',entity, condition),
    findBySearchText: async (searchText) => {
        return carodb.load(
            `SELECT * FROM player WHERE MATCH (fullname) against ('${searchText}' IN NATURAL LANGUAGE MODE)
      UNION
      SELECT * FROM player WHERE Name like '%${searchText}%' OR Email like '%${searchText}%'`,
        );
    },
    getTop10: async() => {
        return carodb.load(
            `SELECT TOP(10) * FROM user ORDER BY Score DESC`
        )
    }

}