import httpInstance from "../../shared/services/http.instance.js";

/**
 * @summary ProfileService is a service class for managing profile-related operations.
 * @description This class provides methods to interact with the profile API endpoint, allowing for CRUD operations on profile resources.
 */
export class ProfileService {
    /**
     * @summary The endpoint path for profile resources.
     * @description This property defines the API endpoint for profile-related operations, sourced from environment variables.
     * @type {string}
     */
    resourceEndpoint = import.meta.env.VITE_PROFILE_ENDPOINT_PATH || '/profile';

    /**
     * @summary Fetches all profile resources
     * @description This method retrieves all profile resources from the API endpoint.
     * @return {Promise<axios.AxiosResponse<any>>} Axios response containing profiles data
     */
    getAll() {
        return httpInstance.get(this.resourceEndpoint);
    }

    /**
     * @summary Fetches a profile resource by user ID
     * @description This method retrieves a specific profile resource using the user ID.
     * @param {number} userId - The ID of the user
     * @return {Promise<axios.AxiosResponse<any>>} Axios response containing profile data
     */
    getByUserId(userId) {
        return httpInstance.get(`${this.resourceEndpoint}?id_user=${userId}`);
    }

    /**
     * @summary Creates a new profile resource
     * @description This method sends a POST request to create a new profile.
     * @param {Object} profileData - The profile data to create
     * @return {Promise<axios.AxiosResponse<any>>} Axios response containing the created profile
     */
    create(profileData) {
        return httpInstance.post(this.resourceEndpoint, profileData);
    }

    /**
     * @summary Updates a profile resource
     * @description This method updates an existing profile.
     * @param {number} userId - The ID of the user whose profile to update
     * @param {Object} profileData - The updated profile data
     * @return {Promise<axios.AxiosResponse<any>>} Axios response containing the updated profile
     */
    update(userId, profileData) {
        return httpInstance.put(`${this.resourceEndpoint}/${userId}`, profileData);
    }

    /**
     * @summary Partially updates a profile resource
     * @description This method performs a partial update on a profile.
     * @param {number} userId - The ID of the user whose profile to update
     * @param {Object} partialData - The fields to update
     * @return {Promise<axios.AxiosResponse<any>>} Axios response containing the updated profile
     */
    patch(userId, partialData) {
        return httpInstance.patch(`${this.resourceEndpoint}/${userId}`, partialData);
    }

    /**
     * @summary Deletes a profile resource
     * @description This method deletes a profile by user ID.
     * @param {number} userId - The ID of the user whose profile to delete
     * @return {Promise<axios.AxiosResponse<any>>} Axios response
     */
    delete(userId) {
        return httpInstance.delete(`${this.resourceEndpoint}/${userId}`);
    }

    /**
     * @summary Updates the avatar URL of a profile
     * @description This method updates only the avatar URL of a profile.
     * @param {number} userId - The ID of the user
     * @param {string} avatarUrl - The new avatar URL
     * @return {Promise<axios.AxiosResponse<any>>} Axios response
     */
    updateAvatar(userId, avatarUrl) {
        return this.patch(userId, { avatarUrl });
    }

    /**
     * @summary Updates the bio of a profile
     * @description This method updates only the bio of a profile.
     * @param {number} userId - The ID of the user
     * @param {string} bio - The new bio text
     * @return {Promise<axios.AxiosResponse<any>>} Axios response
     */
    updateBio(userId, bio) {
        return this.patch(userId, { bio });
    }
}