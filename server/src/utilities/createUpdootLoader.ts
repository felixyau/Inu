import DataLoader from "dataloader"
import { Updoot } from "../entities/Updoot";
import { User } from "../entities/User"

export const CreateUpdootLoader = () => {
    return new DataLoader<{postId:number, userId:number}, Updoot | null>(async (keys) => {
        const updoots = await Updoot.find(keys as any);
        console.log("up:",updoots)
        const keyToUpdoot : Record<string, Updoot> = {}; //for sorting the return arr but cant understand
        updoots.forEach(u=> {
            keyToUpdoot[`${u.postId}|${u.userId}`] = u;
        })
        console.log(keyToUpdoot);
        return keys.map(key =>  keyToUpdoot[`${key.postId}|${key.userId}`]);
    })
}