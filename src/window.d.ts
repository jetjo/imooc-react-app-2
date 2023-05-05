declare global
{
    interface Window {
      h1_id: string;
      logo_id: string;
      nodeResourceLazyLoadQueue: ((MutationRecord) => void)[]
    }
}
export { };
