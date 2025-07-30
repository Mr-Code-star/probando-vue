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
     * @summary Fetches all subscription plan resources.
     * @description this method retrieves all subscription plan resources from the API endpoint.
     * It sends a GET request to the specified endpoint and returns the response.
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u20231c426 Baca Camargo, Vitaly Arturo
     */
    getAll(){
        return httpInstance.get(this.resourceEndpoint);
    }

    /**
     * @summary Fetches a subscription plan resource by its ID.
     * @description this method retrieves a specific subscription plan resource from the API endpoint using the provided ID.
     * It sends a GET request to the endpoint with the ID appended to the URL.
     * @param id
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u20231c426 Baca Camargo, Vitaly Arturo
     */
    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }
    /**
     * @summary Creates a new subscription plan resource.
     * @description This method sends a POST request to the API endpoint to create a new subscription plan resource with the provided data.
     * @param resource - The data for the new subscription plan.
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u20231c426 Baca Camargo, Vitaly Arturo
     */
    create(resource) {
        return httpInstance.post(this.resourceEndpoint, resource);
    }

    /**
     * @summary Updates an existing subscription plan resource.
     * @description This method sends a PUT request to the API endpoint to update an existing subscription
     * plan resource identified by the provided ID with the new data.
     * @param id - The ID of the subscription plan to update.
     * @param resource - The updated data for the subscription plan.
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u20231c426 Baca Camargo, Vitaly Arturo
     */
    update(id, resource) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}`, resource);
    }
    /**
     * @summary Deletes a subscription plan resource by its ID.
     * @description This method sends a DELETE request to the API endpoint to remove a subscription plan resource identified by the provided ID.
     * @param id - The ID of the subscription plan to delete.
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author u20231c426 Baca Camargo, Vitaly Arturo
     */
    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }

}