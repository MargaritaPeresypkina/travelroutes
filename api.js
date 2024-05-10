const express = require("express");
const router = express.Router();
const Route = require("./schemas/route");
const Companion = require("./schemas/companion");
const User = require("./schemas/user");
const UserRoute = require("./schemas/userRoute");
const CompanionRoute = require("./schemas/companionOfRouteOfUser");

/*----------Route-----------------*/

router.get("/routes", (req, res) => {
  Route.find({}).then((route) => {
    res.send(route);
  });
});

router.post("/routes", (req, res) => {
  Route.create(req.body).then((route) => {
    res.send(route);
  });
});

router.put("/routes/:id", (req, res) => {
  Route.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Route.findOne({ _id: req.params.id }).then((route) => {
      res.send(route);
    });
  });
});

router.delete("/routes/:id", (req, res) => {
  Route.deleteOne({ _id: req.params.id }).then((route) => {
    res.send(route);
  });
});

/*----------Companion---------- */

router.get("/companions", (req, res) => {
  Companion.find({}).then((companion) => {
    res.send(companion);
  });
});

router.post("/companions", (req, res) => {
  Companion.create(req.body).then((companion) => {
    res.send(companion);
  });
});

router.put("/companions/:id", (req, res) => {
  Companion.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Companion.findOne({ _id: req.params.id }).then((companion) => {
      res.send(companion);
    });
  });
});

router.delete("/companions/:id", (req, res) => {
  Companion.deleteOne({ _id: req.params.id }).then((companion) => {
    res.send(companion);
  });
});

/*----------User-----------------*/

router.get("/users", (req, res) => {
  User.find({}).then((user) => {
    res.send(user);
  });
});

router.post("/users", (req, res) => {
  User.create(req.body).then((user) => {
    res.send(user);
  });
});

router.put("/users/:id", (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    User.findOne({ _id: req.params.id }).then((user) => {
      res.send(user);
    });
  });
});

router.delete("/users/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then((user) => {
    res.send(user);
  });
});

/*----------userRoute-----------------*/

router.get("/userroutes", (req, res) => {
  UserRoute.find({}).then((userRoute) => {
    res.send(userRoute);
  });
});

router.post("/userroutes", (req, res) => {
  UserRoute.create(req.body).then((userRoute) => {
    res.send(userRoute);
  });
});

router.put("/userroutes/:id", (req, res) => {
  UserRoute.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    UserRoute.findOne({ _id: req.params.id }).then((userRoute) => {
      res.send(userRoute);
    });
  });
});

router.delete("/userroutes/:id", (req, res) => {
  UserRoute.deleteOne({ _id: req.params.id }).then((userRoute) => {
    res.send(userRoute);
  });
});

/*----------companionRoute-----------------*/

router.get("/companionroutes", (req, res) => {
  CompanionRoute.find({}).then((compRoute) => {
    res.send(compRoute);
  });
});

router.post("/companionroutes", (req, res) => {
  CompanionRoute.create(req.body).then((compRoute) => {
    res.send(compRoute);
  });
});

router.put("/companionroutes/:id", (req, res) => {
  CompanionRoute.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    () => {
      CompanionRoute.findOne({ _id: req.params.id }).then((compRoute) => {
        res.send(compRoute);
      });
    }
  );
});

router.delete("/companionroutes/:id", (req, res) => {
  CompanionRoute.deleteOne({ _id: req.params.id }).then((compRoute) => {
    res.send(compRoute);
  });
});

module.exports = router;
