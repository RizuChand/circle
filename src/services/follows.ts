import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Follows } from "../entities/Follows";

class FollowsService {
    private readonly followRepository: Repository<Follows> =
        AppDataSource.getRepository(Follows);

    private readonly userRepository: Repository<User> =
        AppDataSource.getRepository(User);

    async find(
        loginSession: any,
        queryType?: string,
        queryLimit?: number
    ): Promise<any> {
        try {
            let follows: Follows[];

            if (queryType === "followings") {
                follows = await this.followRepository.find({
                    take: queryLimit,
                    where: {
                        follower: {
                            id: loginSession.user.id,
                        },
                    },
                    relations: ["followed", "follower"],
                });

                return follows.map((follow) => ({
                    id: follow.id,
                    user_id: follow.followed.id,
                    username: follow.followed.username,
                    name: follow.followed.name,
                    email: follow.followed.email,
                    description: follow.followed.description,
                    is_followed: true,
                }));
            } else if (queryType === "followers") {
                follows = await this.followRepository.find({
                    take: queryLimit,
                    where: {
                        followed: {
                            id: loginSession.user.id,
                        },
                    },
                    relations: ["followed", "follower"],
                });

                return await Promise.all(
                    follows.map(async (follow) => {
                        const isFollowed = await this.followRepository.count({
                            where: {
                                follower: {
                                    id: loginSession.user.id,
                                },
                                followed: {
                                    id: follow.follower.id,
                                },
                            },
                        });

                        return {
                            id: follow.id,
                            user_id: follow.follower.id,
                            username: follow.follower.username,
                            name: follow.follower.name,
                            email: follow.follower.email,
                            description: follow.follower.description,
                            is_followed: isFollowed > 0,
                        };
                    })
                );
            }

            return {
                message: `Please specify valid query "type" (followers / followings)`,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(reqBody: any, loginSession: any): Promise<any> {
        try {
            const isFollowExist = await this.followRepository.count({
                where: {
                    follower: {
                        id: loginSession.user.id,
                    },
                    followed: {
                        id: reqBody.followed_user_id,
                    },
                },
            });

            if (isFollowExist > 0) {
                throw new Error("You already follow this user!");
            }

            if (reqBody.followed_user_id === loginSession.user.id) {
                throw new Error("You can't follow yourself!");
            }

            const isUserExist = await this.userRepository.count({
                where: {
                    id: reqBody.followed_user_id,
                },
            });

            if (isUserExist <= 0) {
                throw new Error("This user doesn't exist!");
            }

            const follow = this.followRepository.create({
                follower: {
                    id: loginSession.user.id,
                },
                followed: {
                    id: reqBody.followed_user_id,
                },
            });

            await this.followRepository.save(follow);

            return {
                message: "You follow this user!",
                follow: follow,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(followedUserId: number, loginSession: any): Promise<any> {
        try {
            const follow = await this.followRepository.findOne({
                where: {
                    follower: {
                        id: loginSession.user.id,
                    },
                    followed: {
                        id: followedUserId,
                    },
                },
            });

            if (!follow) {
                throw new Error("You didn't follow this user!");
            }

            await this.followRepository.delete({
                id: follow.id,
            });

            return {
                message: "You unfollow this user!",
                follow: follow,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new FollowsService();
