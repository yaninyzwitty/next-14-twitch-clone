import { db } from "./db";
import { getSelf } from "./auth-service";
export const getRecommended = async () => {
    let userId;

    try {
        const self = await getSelf();
        userId = self.id;

    

        
    } catch (error) {
        userId = null;
        
    }



   let users = [];
// follower in this case means followedBy check schema prisma

   if(userId) {
    users = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        },
        where: {
            AND: [{
                NOT: {
                    id: userId
                }

            },
            {
                NOT: {
                    follower: {
                        some: {
                            followerId: userId
                        }
                    }
                }
            },
            {
                NOT: {
                    blocking: {
                        some: {
                            blockedId: userId
                        }
                    }
                }
            }
        ],
        
           
        }, 
        include: {
            stream: {
                select: {
                    isLive: true 
                }
            }
        }
        
        
        
    });


   }else {
     users = await db.user.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            stream: {
                select: {
                    isLive: true 
                }
            }
        }
    });

   }


    return users;

  

    
}