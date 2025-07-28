import httpInstance from "../../shared/services/http.instance.js";
/**
 * @class SubscriptionPlanService
 * @description Class for managing subscription plan resources through API calls.
 * this service provides methods to interact with the subscription plans endpoint, allowing for CRUD operations.
 * @author u20231c426 Baca Camargo, Vitaly Arturo
 */

export class SubscriptionPlanService{
    /**
     * @property {string} resourceEnpoint - the API endpoint for subscription plans.
     * @description this endpoint is used to perform CRUD operations on subscription plans.
     * @author u20231c426 Baca Camargo, Vitaly Arturo
     * */
    resourceEndpoint = import.meta.env.VITE_SUBSCRIPTION_ENDPOINT_PATH;

    /**
     * @summary Fetches all subscription plan resources
     * @description this method retrieves all subscription plan resources from the API endpoint.
     * It sends a GET request to the specified endpoint and returns the response.
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u20231c426 Baca Camargo Vitaly Arturo
     * */
    getAll(){
        return httpInstance.get(this.resourceEndpoint)
    }
}