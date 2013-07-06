var Model = require('./Model');
/**
 *
 * @type {*|Object|Object}
 */
var User = Model.extend({
    static: {
        $modelName: "User",
        $schemaMap :  {id: 'id', email: 'email', salt: 'salt', hash : 'hash'}
    },

    instance: {
        /** Association to the Organization  **/
        $organization : null,

        /**
         * Constructor
          * @param options - parameters
         */
        constructor: function (options) {
            this._super(arguments);
        },

        setOrganization: function (organization) {
            this.$organization = organization
        },

        getOrganization: function () {
            return this.$organization;
        }
    }
});

module.exports = User;
