/**
 * ArionLib
 *
 * This file was automatically generated by APIMATIC v2.0 ( https://apimatic.io ).
 */

;(function (angular) {
'use strict';

/**
 * Creates a instance of ActorRequest
 *
 * @constructor
 */
angular.module('ArionLib')
    .factory('ActorRequest', ['BaseModel', ActorRequestModel]);

    function ActorRequestModel(BaseModel) {
        var ActorRequest = function (obj) {
            if (obj === undefined || obj === null) {
                return;
            }
            this.actorID = this.getValue(obj.actorID);
            this.assetID = this.getValue(obj.assetID);
            this.actorType = this.getValue(obj.actorType);
            this.actorName = this.getValue(obj.actorName);
            this.aditionalInfoMap = this.getValue(obj.aditionalInfoMap);
        };

        ActorRequest.prototype = new BaseModel();
        ActorRequest.prototype.constructor = ActorRequest;
    
        /**
         * Function containing information about the fields of this model
         * @return   {array}   Array of objects containing information about the fields
         */
        ActorRequest.prototype.mappingInfo = function() {
            return BaseModel.prototype.mappingInfo.call(this).concat([
                { name: 'actorID', realName: 'actorID' },
                { name: 'assetID', realName: 'assetID' },
                { name: 'actorType', realName: 'actorType' },
                { name: 'actorName', realName: 'actorName' },
                { name: 'aditionalInfoMap', realName: 'aditionalInfoMap' }
            ]);
        };
    
        /**
         * Function containing information about discriminator values
         * mapped with their corresponding model class names
         *
         * @return   {object}  Object containing Key-Value pairs mapping discriminator
         *                     values with their corresponding model classes
         */
        ActorRequest.prototype.discriminatorMap = function() {
            return {};
        };
    
        /**
         * TODO: Write general description for this method
         *
         * @return {string}
         */
        ActorRequest.prototype.getActorID = function () {
            return this.actorID;
        };
    
        /**
         * Setter for ActorID
         * 
         * @param {string} value 
         */
        ActorRequest.prototype.setActorID = function (value) {
            this.actorID = value;
        };
    
        /**
         * TODO: Write general description for this method
         *
         * @return {string}
         */
        ActorRequest.prototype.getAssetID = function () {
            return this.assetID;
        };
    
        /**
         * Setter for AssetID
         * 
         * @param {string} value 
         */
        ActorRequest.prototype.setAssetID = function (value) {
            this.assetID = value;
        };
    
        /**
         * TODO: Write general description for this method
         *
         * @return {string}
         */
        ActorRequest.prototype.getActorType = function () {
            return this.actorType;
        };
    
        /**
         * Setter for ActorType
         * 
         * @param {string} value 
         */
        ActorRequest.prototype.setActorType = function (value) {
            this.actorType = value;
        };
    
        /**
         * TODO: Write general description for this method
         *
         * @return {string}
         */
        ActorRequest.prototype.getActorName = function () {
            return this.actorName;
        };
    
        /**
         * Setter for ActorName
         * 
         * @param {string} value 
         */
        ActorRequest.prototype.setActorName = function (value) {
            this.actorName = value;
        };
    
        /**
         * TODO: Write general description for this method
         *
         * @return {string}
         */
        ActorRequest.prototype.getAditionalInfoMap = function () {
            return this.aditionalInfoMap;
        };
    
        /**
         * Setter for AditionalInfoMap
         * 
         * @param {string} value 
         */
        ActorRequest.prototype.setAditionalInfoMap = function (value) {
            this.aditionalInfoMap = value;
        };
    
        return ActorRequest;
    }

}(angular));
