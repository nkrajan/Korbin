var comb = require('comb');
var bcrypt = require('bcrypt');
var AbstractDAO = require('./AbstractDAO');
var promise = require('../utils/promise').promise;

var UserDAO = AbstractDAO.extend({
    /** Static Section **/
    static: {
        /**
         * Initialize DAO
         * @param db
         */
        Initialize: function (db) {
            /** Initialize User Schema **/
            this.$modelSchema = new db.Schema({
                email : { type: String },
                salt  : { type: String, required: true },
                hash  : { type: String, required: true }
            });
            /**
             * override password retrieval method
             **/
            this.$modelSchema.virtual('password')
                .set(function (password) {
                    var salt = this.salt = bcrypt.genSaltSync(10);
                    this.hash = bcrypt.hashSync(password, salt);
                }
            );
            /**
             * Verify password inherently calls the compare method
             */
            this.$modelSchema.method('verifyPassword', function (password, callback) {
                bcrypt.compare(password, this.hash, callback);
            });
            /** Create the mongoose model **/
            this.$modelDBObject = db.model('Users', this.$modelSchema);
        },

        /**
         * @return {null}
         */
        GetModelSchema: function () {
            return this.$modelSchema;
        }
    },

    instance: {
        constructor: function (daoFactory) {
            this._super(arguments);
        },

        /**
         * Save the user
         * @param user
         * @param callback
         */
        create: function (user, callback) {
            var self = this;
            self._super(arguments).then(function(err, userObject){
                var organization = user.getOrganization();
                if(organization){
                    var orgDAO = self.getDAOFactory().getOrganizationDAO();
                    organization.setUser(userObject);
                    orgDAO.create(organization, function(err, orgObject){
                        if(err){
                            callback(err, userObject);
                        }else{
                            callback(err, userObject);
                        }
                    })
                }else{
                    callback(err, userObject);
                }
            });
        },

        /**
         * Verify the password
         * @param userDoc  - user document
         * @param password - password to be verified
         * @param callback - callback function
         */
        verifyPassword : function(userDoc, password, callback){
            userDoc.verifyPassword(password, function (err, passwordCorrect) {
                if (err) {
                    return callback(err, false);
                }
                if (!passwordCorrect) {
                    return callback(null, false);
                }
                return callback(null, true);
            });
        }
    }
});


/** Export the public objects **/
module.exports = UserDAO;
module.exports.Initialize = UserDAO.Initialize;
module.exports.GetModelSchema = UserDAO.GetModelSchema;

