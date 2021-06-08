import DataLoader from "dataloader"
import { Updoot } from "../entities/Updoot";
import { User } from "../entities/User"

export const CreateUpdootLoader = () => {
    return new DataLoader<{postId:number, userId:number}, Updoot | null>(async (keys) => {
        const updoots = await Updoot.find(keys as any);
        const keyToUpdoot : Record<string, Updoot> = {}; //for sorting the return arr but cant understand
        updoots.forEach(u=> {
            keyToUpdoot[`${u.postId}|${u.userId}`] = u;
        })
        return keys.map(key =>  keyToUpdoot[`${key.postId}|${key.userId}`]);
    })
}