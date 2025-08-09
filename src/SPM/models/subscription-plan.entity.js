/**
 * @class SubscriptionPlan
 * @description Represents a Subscription Plan
 * with the details of the plan
 * @author Bacc Camargo Vitaly Arturo, u20231c426
 */

export class SubscriptionPlan {
    constructor({
                    id = 0,
                    name = '',
                    price = 0.00,
                    stripe_price_id = ''
                }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stripe_price_id = stripe_price_id;
    }
}