const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
// Update user

router.put("/:id", async(req, res)=> {
    //params refers to the /:id in url
    if (req.body.userId == req.params.id || req.body.isAdmin) {
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

router.delete("/:id", async(req, res)=> {
    //params refers to the /:id in url
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("acc has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("you can only update your account...")
    }
});


// Follow user

router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {

        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push: {followers:req.body.userId}});
                await currentUser.updateOne({$push: {followings: req.body.userId}});
                res.status(200).json("user has been followed");
            }
            else {
                res.status(403).json("already follow")

            }
        }
        catch(err) {
            res.status(500).json(err);
        }

    }
    else {
        res.status(403).json("can't follow yourself");
    }
});

module.exports = router;
