var AbstractDAO = require('./AbstractDAO');

var CompanyDAO = AbstractDAO.extend({

    /** Statics Section **/
    static: {

        /**
         * Initialize DAO
         * @param db
         */
        Initialize: function (db) {
            console.log('Initializing Company');
            /** Initialize User Schema **/
            this.$modelSchema = new db.Schema({
                legalname: { type: String },
                displayname: { type: String, required: true }
            });
            this.$modelDBObject = db.model('Companies', this.$modelSchema);
        },


        /**
         * @return {null}
         */
        GetModelSchema: function () {
            return this.$modelSchema;
        }
    },

    instance: {

        /**
         * Constructor
         * @param daoFactory
         */
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
                callback(err, userObject);
            });
        },

        /**
         * Find Organization by legal name
         * @param legalName - legal name
         * @param callback - callback
         */
        findOrgByLegalName : function(legalName, callback) {
            var self = this;
            var Organization = self._static.$modelDBObject;
            var query = Organization.findOne({ legalname: legalName });
            var runQuery = self.findByQuery(query);
            runQuery.then(function(err, orgObject) {
                callback(err, orgObject);
            });
        },

        findUserByLegalName : function(legalName, callback) {
            var self = this;
            var Organization = self._static.$modelDBObject;
            var query = Organization.findOne({ legalname: legalName });
            // selecting the `name` and `occupation` fields
            query.select('user');
            var runQuery = self.findByQuery(query);
            runQuery.then(function(err, orgObject) {
                callback(err, orgObject);
            });
        }
    }
});


/** Export the public objects **/
module.exports = CompanyDAO;
module.exports.Initialize = CompanyDAO.Initialize;
module.exports.GetModelSchema = CompanyDAO.GetModelSchema;

