import { db } from "./db";
import { getSelf } from "./auth-service";

export const getStreams = async () => {
    let userId;

    try {
        const self = await getSelf();

        userId = self.id;
        
    } catch (error) {
        userId = null;
    }

    let streams = [];

    if(userId) {
        // load by userId
        streams = await db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId 
                            }
                        }
                    }
                }
            },
            select: {
                user: true,
                thumbnailUrl: true,
                isLive: true,
                name: true,
                id: true
            },
            orderBy: [
                {
                    isLive: "desc"
                },
                {
                    updatedAt: 'desc'
                }
            ]
        });
    } else {
        streams = await db.stream.findMany({
            select: {
                id: true,
                user: true,
                thumbnailUrl: true,
                isLive: true,
                name: true 
            },
            orderBy: [
                {
                    isLive: "desc"
                },
                {
                    updatedAt: 'desc'
                }
            ]
        });
    }


    return streams

}