/**
 * ArionLib
 *
 * This file was automatically generated by APIMATIC v2.0 ( https://apimatic.io ).
 */

;(function (angular) {
'use strict';

/**
 * Creates a instance of BaseModel
 *
 * @constructor
 */
angular.module('ArionLib')
    .factory('BaseModel', ['APIHelper', 'moment', function (APIHelper, moment) {
        var BaseModel = function () {

            this.toJSON = function () {
				var newDict = {};
				var props = Object.keys(this);
				for (var iter = 0; iter < props.length; iter += 1) {
					if (typeof this[props[iter]] !== 'function') {
						// the properties that already exist in the models
						var propsThatExist = this.mappingInfoContains(props[iter]);
						var value = propsThatExist !== null ? propsThatExist : props[iter];
						if (this[props[iter]] instanceof Object &&
							  this[props[iter]].constructor !== Array &&
                              !(this[props[iter]] instanceof moment) &&
                              !(this[props[iter]] instanceof Date)) {
							if (typeof this[props[iter]].toJSON === 'function') {
								this[props[iter]] = this[props[iter]].toJSON();
							}
						} else if (this[props[iter]] !== undefined &&
							  this[props[iter]] !== null &&
							  this[props[iter]].constructor === Array) {
							angular.forEach(this[props[iter]], function(item, index) {
								if (item !== undefined && typeof item.toJSON === 'function') {
									var serializedItem = item.toJSON();
									this[props[iter]][index] = serializedItem;
								}
							}, this);
						}  else {
		                    var dateTimeType = this.getDateTimeValueForField(value);
		                    if (dateTimeType !== null && dateTimeType !== undefined) {
		                        this[props[iter]] =
		                            APIHelper.stringifyDateTime(this[props[iter]], dateTimeType);
		                    }
		                }
						newDict[value] = this[props[iter]];
					}
				}
				return newDict;
            };
        };

        /**
         * Function containing information about the fields of this model
         * @returns   {array}   Empty array
         */
        BaseModel.prototype.mappingInfo = function() {
            return [];
        };

        /**
         * Returns value for the object called
         * @param  obj  {string}  The value to be assigned
         * @param  defaultValue  {string} The default value for the field
         * @returns  The correct value for the field
         */
        BaseModel.prototype.getValue = function(obj, defaultValue) {
            if (obj === undefined || obj === null) {
                return null;
            }
            var returnValue;
            if (obj !== undefined) {
                returnValue = obj;
            } else {
                returnValue = (defaultValue !== null || defaultValue !== undefined) ?
                    defaultValue : null;
            }
            return returnValue;
        };

        /**
         * Helper function to get the value (type) of datetime fields
         * @param  name  {string}  The (actual) name of the field
         * @returns  If field is not a date/datetime field, returns undefined.
         *           Otherwise, returns the value (type)
         */
        BaseModel.prototype.getDateTimeValueForField = function(name) {
            if (name === undefined || name === null) {
                return null;
            }
            var value;
            var fieldsInfo = this.mappingInfo();
            angular.forEach(fieldsInfo, function(field) {
                if (field.realName === name && field.isDateTime && value === undefined) {
                    value = (field.dateTimeValue !== undefined) ? field.dateTimeValue : 'date';
                }
            }, this);
            return value;
        };

		/**
		 * Helper function to check if value exists in the array of objects
		 * @param  val  {string}  The value to be checked in array
		 * @returns  If value doesn't exist in the array, returns null. Otherwise, returns the value
		 */
		BaseModel.prototype.mappingInfoContains = function(val) {
			var mapInfo = this.mappingInfo();
			var keys = Object.keys(mapInfo);
			var returnValue = null;
			for (var iter = 0; iter < keys.length; iter += 1) {
				if (val === mapInfo[iter].name) {
					returnValue = mapInfo[iter].realName;
					break;
				}
			}
			return returnValue;
		};

        return BaseModel;
    }]);

}(angular));
