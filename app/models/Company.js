var Model = require('./Model');
/**
 *
 * @type {*|Object|Object}
 */
var Company = Model.extend({

    static: {
        $modelName: "Company",
        $schemaMap :  {legalname: 'legalname', displayname: 'displayname', user : "user"}
    },

    instance: {

        /** Association to the Organization  **/
        $organizationType : null,

        /** @One-To-Many - Array of Addresses for the Organization **/
        _addressArray: [],

        constructor: function (options) {
            this._super(arguments);
        },
        setUser : function(user){
            var property = this.getProperty();
            property['user'] = user;
        }
    }
});

module.exports = Company;
