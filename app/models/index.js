const Pokemon = require('./pokemon');
const Type = require('./type');
const Users = require('./users')

// Quiz <> Tags, via la table de liaison
// "Un Quiz possède plusieurs tags"
Pokemon.belongsToMany(Type, {
    as: "types", // alias de l'association 
    through: 'pokemon_type', // "via la table de liaison qui s'appelle ..."
    sourceKey: 'numero', // le nom de la clef de Quiz dans la table de liaison
    foreignKey:"pokemon_numero",
    otherKey: 'type_id', // le nom de la clef de "l'autre" (donc Tag)
});
// ... et la réciproque !
Type.belongsToMany(Pokemon, {
    as: "pokemonList",
    through: 'pokemon_type',
    foreignKey: 'type_id',
});

module.exports = { Pokemon, Type, Users };