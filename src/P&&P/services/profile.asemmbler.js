import {Profile} from "../model/profile.entity.js";

export class ProfileAsemmbler{
    /**
     * @summary Converts a profile resource to a profile entity.
     */
    static toEntityFromResource(resource){
        return new Profile(resource)
    }

    /**
     *  Converts a response containing profile resources to an array of Profile entities.
     *  @param response
     *  @return {Profile[]} Array of Profile entities
     */
    static toEntitiesFromResource(response){
        if(!response || !response.data || !Array.isArray(response.data)){
           console.error('Invalid response format:', response);
            return [];
        }
        return response.data.map(userResource => this.toEntityFromResource(userResource));
    }
}