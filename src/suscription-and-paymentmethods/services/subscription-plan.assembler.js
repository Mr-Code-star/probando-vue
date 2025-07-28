import {SubscriptionPlan} from "../models/subscription-plan.entity.js";

/**
 * @Class SubscriptionPlan
 * @description Convert dates of JSON to objects SubscriptionPlan
 * @author Baca Camargo, Vitaly Arturo U20231c426
 * */
export class SubscriptionPlanAssembler {
    /**
     * Convert an Object JSON to SubscriptionPLan
     * @param {Object} jsonData - Dates of plan in format JSON
     * @return {SubscriptionPlan} - Instance of SubscriptionPlan
     * @author Baca Camargo, Vitaly Arturo (U20231C426)
     * */
    static toEntity(jsonData){
        return new SubscriptionPlan(({
            id: jsonData.id,
            name: jsonData.name,
            price: jsonData.price,
            features: jsonData.features || []
        }))
    }

    /**
     * Convert an entity SubscriptionPlan a format JSON
     * @param {SubscriptionPlan} entity - Instance of SubscriptionPlan
     * @return {Object} - Dates of plan in format JSON
     * autor Baca Camargo, Vitaly Arturo (U20231C426)
     */
    static toJson(entity){
        return {
            id: entity.id,
            name: entity.name,
            price: entity.price,
            features: entity.features || []
        };
    }

    /**
     * Convert an array of JSON to array SubscriptionPlan
     * @param {Array} jsonArray - Array of dates in format JSON
     * @return {Array<SubscriptionPlan>} - Array of SubscriptionPlan
     * */
    static toEntityList(jsonArray){
        return jsonArray.map(json => this.toEntity(json));
    }
}