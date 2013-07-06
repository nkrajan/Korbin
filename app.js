var DBContext = require('./app/db/DBContext');
var User = require('./app/models/User');
var Organization = require('./app/models/Company');
var promise = require('./app/utils/promise').promise;

/** Get the DBContext Instance**/
var dbContext = DBContext.GetInstance();
/** Initialize DBContext **/
dbContext.InitDBContext();
/** Get the DBSession **/
var dbSession = dbContext.GetDBSession();

/** Chain of functions **/
promise.chain([
    /** First Sync the Database **/
    function() {
        var p = new promise.Promise();
        dbSession.Sync(function (err) {
            if(err){
                console.log('Could not load the database.', 'Please check if the mongod server is running');
            }else{
                console.log('Database loaded..');
            }
            p.done(err, null);
        });
        return p;
    },
    function() {
        var p = new promise.Promise();
        var userDao = dbSession.GetDAOFactory().getUserDAO();
        var user = new User({email : "nkrajan@gmail.com", password : "nkrajan"});
        var org = new Organization({legalname : "datonis", displayname : "datonis"});
        user.setOrganization(org);
        userDao.create(user, function(err, doc){
            if(err){
                console.log('Error while saving model ' + err);
                p.done(err, null);
            }else{
                console.log('User saved');
                userDao.verifyPassword(doc, "nkrajan", function(err, status){
                    if(err){
                        console.log('Error :', err);
                    }else{
                        console.log('Password verification status :', status);
                    }
                    p.done(null, status);
                });
            }
        });
        return p;
    },

    function() {
        var p = new promise.Promise();
        var orgDao = dbSession.GetDAOFactory().getOrganizationDAO();
        orgDao.findUserByLegalName('datonis', function(err, doc){
            if(err){
                console.log(err);
                p.done(err, null);
            }else{
                var tobj = null;
                doc._doc.user.forEach(function(obj){
                    console.log('User found >> ', obj);
                    tobj = obj;
                });
                p.done(null, tobj);
            }
        });
        return p;
    }

    ]).then(function(error, result){
        if(error){
            console.log('Error : ', error);
        }else if(result){
            console.log('Result : ', result);
        }
    }
);