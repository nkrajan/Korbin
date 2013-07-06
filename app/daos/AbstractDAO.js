var comb = require('comb');
var User = require('../models/User');
var promise = require('../utils/promise').promise;

/**
 * Model Class Definition
 * @type {*}
 */
var AbstractDAO = comb.define({

    static : {
        /** DB Object **/
        $modelDBObject: null,
        /** DB Schema **/
        $modelSchema: null,
        /**
         * Return the DBObject
         * @returns {string}
         */
        GetDBObject: function () {
            return this.$modelDBObject;
        }
    },

    instance : {
        /** Reference to DAOFactory **/
        $daoFactory : null,

        constructor : function(daoFactory) {
            this.$daoFactory = daoFactory;
        },

        /**
         * Get the Reference to DAOFactory
         * @returns {null}
         */
        getDAOFactory : function() {
            return this.$daoFactory;
        },


        /**
         *  Save the Model and its associated models
         **/
        create: function (modelObj) {
            var ret = new comb.Promise();
            /** Get the property as JSON Object **/
            var property = modelObj.getProperty();
            var Model = this._static.$modelDBObject;
            Model.create(property, function(err, doc){
                ret.callback(err, doc);
            });
            return ret.promise();
        },

        /**
         *  Execute the query
         **/
        findByQuery : function(query){
            var ret = new comb.Promise();
            query.exec(function (err, results) {
                ret.callback(err, results);
            });
            return ret.promise();
        }
    }
});


/** Module as Exports **/
module.exports = AbstractDAO;
module.exports.Init = AbstractDAO.Init;
module.exports.GetDBObject = AbstractDAO.GetDBObject;