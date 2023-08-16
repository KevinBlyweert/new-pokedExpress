const database = require("./db/database")

module.exports = {
    getPokeList:async()=>{
        const query = "SELECT * FROM pokemon ORDER BY numero;";
        const result = await database.query(query);
        return result.rows;
    },
    getPokemonDetail:async(id_pokemon)=>{
        const query = "SELECT * FROM pokemon WHERE pokemon.id = $1;";
        const result = await database.query(query,[id_pokemon]);
        return result.rows[0];
    },
    getPokemonTypes:async(numero_pokemon)=>{
        const query = "SELECT * FROM type JOIN pokemon_type on type.id = pokemon_type.type_id WHERE pokemon_type.pokemon_numero = $1;";
        const result = await database.query(query,[numero_pokemon]);
        return result.rows;
    },
    getTypes:async()=>{
        const query = "SELECT * FROM type ORDER BY type.id;";
        const result = await database.query(query);
        return result[0];
    },
    getPokemonByType:async(id_type)=>{
        const query = "SELECT pokemon.id,pokemon.nom,pokemon.numero FROM pokemon JOIN pokemon_type ON pokemon.numero = pokemon_type.pokemon_numero WHERE pokemon_type.type_id = $1;";
        const result = await database.query(query,[id_type]);
        return result.rows;
    }
}