const router = require("express").Router();
const mainController = require("./controllers/mainController");

router.get("/",mainController.getListPage);
router.get("/login",mainController.loginPage);
router.post("/login",mainController.logUser);
router.get("/signup",mainController.signup);
router.post("/signup",mainController.postSignup);
router.get("/detail/:id",mainController.getPokemonDetail);
router.get("/types",mainController.getTypes);
router.get("/types/:id_type",mainController.getPokemonByType);
router.get("/logout",(req,res,next)=>{req.session.destroy();res.redirect("/");});

router.use((req, res) => {
    res.locals.error = true;
    res.status(404).render('error404');
});

module.exports = router;
