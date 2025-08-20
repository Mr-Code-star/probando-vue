export class Profile {
    constructor({
                    id_user = 0,
                    user_name = '',
                    bio = '',
                    avatarUrl = '',               // camelCase
                    birthDate = null,             // camelCase
                    gender = '',
                    pronoun = null,
                    subscriptionPlanId = null,    // camelCase
                    followersCount = 0,           // camelCase
                    followingCount = 0,           // camelCase
                    postsCount = 0,               // camelCase
                    createdAt = new Date().toISOString(),
                    updatedAt = new Date().toISOString(),
                } = {}) {
        this.id_user = id_user,
        this.user_name = user_name,
        this.bio = bio;
        this.avatarUrl = avatarUrl;
        this.birthDate = birthDate;
        this.gender = gender;
        this.pronoun = pronoun;
        this.subscriptionPlanId = subscriptionPlanId;
        this.followersCount = Number(followersCount) || 0;
        this.followingCount = Number(followingCount) || 0;
        this.postsCount = Number(postsCount) || 0;
        this.createdAt = createdAt || new Date().toISOString();
        this.updatedAt = updatedAt || new Date().toISOString();
    }
}
