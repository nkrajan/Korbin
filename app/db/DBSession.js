/**
 * DBSession Class Declaration
 */
var DBSession = (function () {

    /** handle to YAML **/
    var yaml = require("js-yaml");
    /** Handle to DBConfig **/
    var DbConfig = require("../configs/database.yml");
    var DAOFactory = require('../daos/DAOFactory');

    /**
     * Create the DBSession Context
     * @param dbSchema
     * @returns {{Sync: Function}}
     */
    var createInstance = function (dbSchema) {
        /** DBSchema Object **/
        var _dbSchema = dbSchema;
        /** DAOFactory **/
        var _daoFactory = null;

        /** Initialize the models **/
        var _init = function () {
            _daoFactory = DAOFactory.GetInstance(dbSchema);
            _daoFactory.init();
        };

        /** Return the DAO Factory **/
        var _getDAOFactory = function () {
            return _daoFactory;
        };

        /**
         * Synchronize the database
         * @param callback
         */
        var _sync = function (callback) {
            _init();
            var database = DbConfig.default.database.name;
            var host = DbConfig.default.database.host;
            var port = DbConfig.default.database.port;
            var url = "mongodb://" + host + ":" + port + '/' + database;
            console.log(url);
            _dbSchema.connect(url, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        };
        /** Expose the public method  **/
        return {
            Sync: _sync,
            GetDAOFactory: _getDAOFactory
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

module.exports = DBSession;