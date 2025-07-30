import {SubscriptionPlan} from "../models/subscription-plan.entity.js";

/**
 * @class SubscriptionPlanAssembler
 * @description Class for assembling SubscriptionPlan entities from various data sources (fake API).
 * Follow the assembler pattern
 * @autor Baca Camargo Vitaly, u20231c426
 */
export class SubscriptionPlanAssembler {
    /**
     * Converts a subscription resource to a subscription entity
     * this method is used to transform the raw data from the API into a subscription entity
     * @author Baca Camargo Vitaly Arturo, u20231c426
     * @param resource
     * @return {SubscriptionPlan} Object of type SubscriptionPlan
     */
    static  toEntityFromResource(resource){
        return new SubscriptionPlan(resource);
    }

    /**
     * Converts a response containing subscription resource to an array of SubscriptionPlan entities.
     * this method is used to transform the raw data from the API into an array of SubscriptionPlan entities.
     * @param response
     * @return {SubscriptionPlan[]}
     * @author Baca Camargo Vitaly Arturo, u20231c426
     */
    static toEntitiesFromResponse(response){
        if(!response || !response.data || !Array.isArray(response.data)){
            console.error(`invalid resource: `, response);
            return [];
        }
        return response.data.map(subscriptionPlanResource => this.toEntityFromResource(subscriptionPlanResource));
    }
}