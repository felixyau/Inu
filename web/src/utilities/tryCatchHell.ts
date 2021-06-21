export async function tryCatchHell<type>(p:Promise<type>):Promise<(type|null)[]> {
    try {
      const data = await p;
      return [data,null];
    } catch (error) {
      console.log(error);
      return [null, error];
    }
}