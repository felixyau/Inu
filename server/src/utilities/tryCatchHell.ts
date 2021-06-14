export async function tryCatchHell<type>(p:type):Promise<(type|null)[]> {
    try {
      const data = await p;
      return [data,null];
    } catch (error) {
      return [null, error];
    }
}