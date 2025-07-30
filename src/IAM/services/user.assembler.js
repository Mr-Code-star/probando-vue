import {User} from "../model/user.entity.js"

export class UserAssembler{
    /**
     * Convert a user resource to a user entity
     * this method is used to transform the new data from API into User entity.
     * @author Baca Camargo Vitaly Arturo, u20231c426
     * @param resource
     * @return {User} Object of type User
     * */
    static toEntityFromResource(resource){
        return new User(resource)
    }
    /**
     * Converts a response containing user resource to an array of User entities.
     * this method is used to transform the raw data from the API into an array of User entities.
     * @author Baca Camargo Vitaly Arturo, u20231c426
     * @param response
     * @return {User[]} Array of User entities
     **/
    static toEntitiesFromResponse(response) {
        if(!response || !response.data || !Array.isArray(response.data)){
            console.error('Invalid response format:', response);
            return [];
        }
        return response.data.map(userResource => this.toEntityFromResource(userResource))
    }
}