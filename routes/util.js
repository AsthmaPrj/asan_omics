var util = {};

util.isAuthenticated = function(req, res, next){
    if(req.session.passport){
      var id = req.session.passport.user;
      if(req.isAuthenticated()){
        // return next();
        if(id == 'asthma_omics' || id == 'asthma_user'){
          return next();
        }
        res.redirect("/");
      }
    }
    res.redirect("/users/login");
};

util.isAuthenticatedForClinicalInformationKR = function(req, res, next){
    if(req.session.passport){
      var id = req.session.passport.user;
      if(req.isAuthenticated()){
        if(id == 'asthma_omics'){
          return next();
        }
        res.redirect("/")
      }
    }
    res.redirect("/users/login")
};
  
module.exports = util;