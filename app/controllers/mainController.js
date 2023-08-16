require("dotenv").config();
const { Pokemon,Type, Users } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
    loginPage:async(req,res,next)=>{
        try {
            if(!req.session.user)
            {res.render("login")}
            else
            {res.redirect("/");}
        } catch (e) {
            console.trace(e);next();
        }
    },
    async signup(req,res,next){
        try {
            res.render("signup");
        } catch (error) {
            console.trace(error);next()
        }
    },
    async postSignup(req, res,next) {
        try {
            const login = req.body.login;
            let password = req.body.password;
            if(!login || password == ""){throw new Error("Tous les champs doivent &ecirc;tre remplis")}
            if(await Users.findOne({where:{"login":login}})){throw new Error("Utilisateur existant avec ce login.")}
            password = await bcrypt.hash(password,10);
            const user = await Users.create({login,password});
            console.log(user);
            req.session.user = user;
            res.redirect('/login');
        } catch (error) {
            console.trace(error);
            next();
        }
    },
    logUser:async(req,res,next)=>{
        try {
            const userlogin = req.body.login;
            if(!userlogin || req.body.password == ""){throw new Error("Tous les champs doivent &ecirc;tre remplis")}
            const user = await Users.findOne({where:{"login":userlogin}});
            const pwCompared = await bcrypt.compare(req.body.password,user.password);
            if (user && pwCompared){
                req.session.user = user.login;
                delete req.session.password;
                res.redirect("/");
            }else{
                res.redirect("/login");
            }
        } catch (e) {
            console.trace(e);next();
        }
    },
    getListPage:async(req,res,next)=>{
        try
        {
            if(req.session.user)
            {
            const pokemons = await Pokemon.findAll({order:[["numero","ASC"]]})
            res.render("index",{pokemons});}
            else{res.redirect("/login");}
        }
        catch(e)
        {console.trace(e);next();}
    },
    getPokemonDetail:async(req,res,next)=>{
        try
        {
            if(req.session.user)
            {const id_pokemon = req.params.id;
            const pokemon = await Pokemon.findByPk(id_pokemon,{include:"types"})
            console.log(pokemon);
            pokemon?res.render("detail",{pokemon}):next();
            }else{res.redirect("/login");}
        }
        catch(e)
        {console.trace(e);next();}
    },
    getTypes:async(req,res,next)=>{
        try
        {
            if(req.session.user){
            const types = await Type.findAll({order:[["name","ASC"]]})
            types?res.render("types",{types}):next();
            }else{res.redirect("/login");}
        }
        catch(e)
        {console.trace(e);next();}
    },
    getPokemonByType:async(req,res,next)=>{
        try
        {
            if(req.session.user){
            const id_type = req.params.id_type;
            const pokemons = await Type.findByPk(id_type,{include:"pokemonList"})
            pokemons?res.render("index",{pokemons:pokemons.pokemonList}):next();
            }else{res.redirect("/login");}
        }
        catch(e)
        {console.trace(e);next();}
    }
}