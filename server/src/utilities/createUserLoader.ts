import DataLoader from "dataloader"
import { User } from "../entities/User"

export const CreateUserLoader = () => {
    return new DataLoader<number, User>(async (userIds) => {
        const users = await User.findByIds(userIds as number[]);
        // console.log("usersbefore:",users)
        // const userIdToUser : Record<number, User> = {};
        // users.forEach(u=> {
        //     userIdToUser[u.id] = u;
        // })
       // console.log(userIdToUser);
        //return userIds.map(id => userIdToUser[id]);
        return users
    })
}
