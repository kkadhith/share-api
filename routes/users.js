const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
// Update user

router.put("/:id", async(req, res)=> {
    //params refers to the /:id in url
    if (req.body.userId == req.params.id || req.user.isAdmin) {
        if(req.body.password) {
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("acc has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("you can only update your account...")
    }
});

// Delete user


// Follow user

router.get("/", (req, res) => {
    res.send("users");
});

module.exports = router;
