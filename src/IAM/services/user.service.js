import httpInstance from "../../shared/services/http.instance.js";

/**
 * @summary UsersApiService is a service class for managing user-related operations.
 * @description this class provides methods to interact with the user API endpoint, allowing for CRUD on user resources.
 * @author Baca Camargo Vitaly Arturo, u20231c426
 */

export class UserService{
    /**
     * @summary the endpoint path for user resources.
     * @description this property defines the API endpoint for user-related operations, sourced from environment variables.
     * @type {string}
     * @author Baca Camargo Vitaly Arturo, u20231c426
     */
    resourceEndpoint = import.meta.env.VITE_USERS_ENDPOINT_PATH;

    /**
     * @summary Fetches all user resources
     * @description this method retrieves all user resources from the API endpoint defined in `resourceEndpoint`.
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author Baca Camargo Vitaly Arturo, u20231c426
     */
    getAll() {
        return httpInstance.get(this.resourceEndpoint);
    }

    /**
     * @summary Fetches a user resource by its ID
     * @description this method retrieves a specific user resource from the API endpoint using the provided ID.
     * @param id
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author Baca Camargo Vitaly Arturo, u20231c426
     */
    getById(id){
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * @summary Creates a new user resource
     * @description This method sends a POST request to the API endpoint to create a new user resource with the provided data.
     * @param resource
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author Baca Camargo Vitaly Arturo, u20231c426
     */
    create(resource){
        return httpInstance.post(this.resourceEndpoint,resource);
    }

    /**
     * @summary Deletes a user resource by its ID
     * @description This method sends a DELETE request to the API endpoint to remove a user resource identified by the provided ID.
     * @param id
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author Baca Camargo Vitaly Arturo, u20231c426
     */
    delete(id){
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * @summary Fetches a user resource by its email or phone contact
     * @description this method retrieves a specific user resource from the API endpoint using the provided email or phone contact.
     * @param contact
     * @return {Promise<axios.AxiosResponse<any>>}
     * @author Baca Camargo Vitaly Arturo, u20231c426
     */
    getByContactInfo (contact) {
        return httpInstance.get(`${this.resourceEndpoint}?contact_info=${contact}`);
    }

    /**
     * @summary Updates a user's subscription plan
     * @description This method updates the subscription plan of a user
     * @param {string} userId - The ID of the user to update
     * @param {string} planId - The ID of the new subscription plan
     * @return {Promise<axios.AxiosResponse<any>>}
     */
    updateSubscriptionPlan(userId, planId) {
        return httpInstance.patch(`${this.resourceEndpoint}/${userId}`, {
            subscription_plan: planId
        });
    }
}