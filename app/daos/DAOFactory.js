/**
 * DBSession Class Declaration
 */
var DAOFactory = (function () {

    var UserDAO = require('./UserDAO');
    var OrganizationDAO = require('./CompanyDAO');

    /**
     * Instance Constructor
     */
    var createInstance = function (dbSchema) {
        /** Reference to DB Schema**/
        var _dbSchema = dbSchema;
        /** DAO References **/
        var _userDAO = null;
        var _orgDAO = null;

        /** Initialize the DAO Objects **/
        var _init = function () {
            var self = this;
            _initModels(self);
        };

        /**
         * Initialize the Model DAOs
         * @param self
         * @private
         */
        var _initModels = function(self) {
            _userDAO = new UserDAO(self);
             UserDAO.Initialize(_getDBSchema());
            _orgDAO = new OrganizationDAO(self);
            OrganizationDAO.Initialize(_getDBSchema());
            _setAssociations();
        };

        var _setAssociations = function() {
            var UserSchema = UserDAO.GetModelSchema();
            var OrganizationSchema = OrganizationDAO.GetModelSchema();
            OrganizationSchema.add({user : [UserSchema._id]});
        };

        /** Return the DBSchema **/
        var _getDBSchema = function() {
            return _dbSchema;
        };

        /** Return UserDAO Object**/
        var _getUserDAO = function(){
            return _userDAO;
        };

        /** Return UserDAO Object**/
        var _getOrganizationDAO = function(){
            return _orgDAO;
        };

        /** Expose the public method  **/
        return {
            init : _init,
            getDBSchema: _getDBSchema,
            /** Expose the DAO Sections **/
            getUserDAO: _getUserDAO,
            /** Expose the DAO Sections **/
            getOrganizationDAO: _getOrganizationDAO
        }
    };

    return {
        /** Get Instance **/
        GetInstance: function (dbSchema) {
            if (!this.Instance) {
                this.Instance = createInstance(dbSchema);
            }
            return this.Instance;
        }
    }
})();

module.exports = DAOFactory;
