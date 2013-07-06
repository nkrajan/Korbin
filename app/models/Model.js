var comb = require('comb');

/**
 * Model Class Definition
 * @type {*}
 */
var Model = comb.define({

    static: {
        $modelName: "Model",
        $schemaMap : null,

        /**
         * @return {string}
         */
        GetModelName: function () {
            return this.$modelName;
        },

        /**
         * @return {null}
         */
        GetSchemaMap : function() {
            return this.$schemaMap;
        }
    },

    instance: {
        /** Property members **/
        _propMembers: {},
        /**
         * Constructor
         * @param options - parameters
         */
        constructor: function (options) {
            options = options || {};
            var values = {};
            /** Get the keys **/
            var keys = (Object.keys(options));
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                values[key] = options[key];
            }
            this._propMembers = values;
        },

        /**
         *
         * @param options
         */
        setProperty: function (options) {
            options = options || {};
            var values = {};
            /** Get the keys **/
            var keys = (Object.keys(options));
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                values[key] = options[key];
            }
            this._propMembers = values;
            console.log(values);
        },

        /**
         * GetProperty
         * @returns {*}
         */
        getProperty: function () {
            return this._propMembers;
        },

        /**
         * Get the Value for the key
         * @param key
         * @returns value
         */
        getValue: function (key) {
            return this._propMembers[key];
        },

        /**
         * Set the Value
         * @param key
         * @param value
         */
        setValue: function (key, value) {
            this._propMembers[key] = value;
        },

        /**
         * toString
         * @returns {*}
         */
        toString : function() {
            return JSON.stringify(this._propMembers);
        }
    }
});
module.exports = Model;