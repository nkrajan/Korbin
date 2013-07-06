/**
 * DBContext Class Declaration
 */
var DBContext = (function () {

    /** Instance of the Object **/
    var Instance = null;
    /** DBSession **/
    var DBSession = require('./DBSession');
    /** Require mongoose **/
    var mongoose = require('mongoose');

    /**
     * Create Instance
     * @returns {{InitDBContext: Function, GetDBContext: Function}}
     */
    var createInstance = function ()  {
        /** DB Schema **/
        var _dbSchema = null;
        /** DBSession **/
        var _dbSession = null;
        /** Init DB Context **/
        var _initDBContext  = function() {
            console.log('Initializing Database Connectivity ');
            _dbSchema = mongoose;
        };

        /**
         * Return the DBContext
         * @returns {_dbSchema}
         * @private
         */
        var _getDBContext = function(){
            if(!_dbSchema){
                _initDBContext();
            }
            return _dbSchema;
        };

        /**
         * Get DBSession
         * @returns {DBSession}
         * @private
         */
        var _getDBSession = function() {
            if(!_dbSession){
                _dbSession = DBSession.GetInstance(_dbSchema);
            }
            return _dbSession;
        };

        /** Expose the public method  **/
        return {
            InitDBContext : _initDBContext,
            GetDBContext : _getDBContext,
            GetDBSession : _getDBSession
        }
    };
    /** Export as public **/
    return {
        /** Get Instance **/
        GetInstance : function () {
            if (!this.Instance) {
                this.Instance = createInstance();
            }
            return this.Instance;
        }
    }
})();

module.exports = DBContext;
module.exports.GetInstance = DBContext.GetInstance;