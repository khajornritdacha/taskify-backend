const router = require("express").Router();


router.use(mid1, mid2);

// localhost:3000/api
router.get("/", (req, res) => {
    res.send("API Home page");
});

router.route("/todos")
    .get()
    .post()
    .put()

module.exports = router;
