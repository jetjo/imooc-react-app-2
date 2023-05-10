interface Item {
  // [key: string]: unknown;
  id: number;
}

type DispatchType = "Assign" | "Remove" | "Update";

function reducer(
  state: Item[],
  action: { type: DispatchType; id?: number; data?: Item[] | Item }
): Item[] {
  function isItems(data): data is Item[] {
    if (!Array.isArray(data))
      throw Error(
        `action type: ${action.type}时, 参数action.data必须是数组！`,
        { cause: action }
      );
    return true;
  }
  function isItem(data): data is Item {
    if (Array.isArray(data) || data === undefined)
      throw Error(
        `action type: ${action.type}时, 参数action.data必须兼容Item类型！`,
        { cause: action }
      );
    return true;
  }
  if (action.type === "Assign" && isItems(action.data)) return action.data;
  else if (action.type === "Remove")
    return state.filter((e) => e.id !== action.id);
  else if (action.type === "Update" && isItem(action.data)) {
    const data = action.data;
    return state.map((e) => {
      if (e.id === action.id) {
        return { ...e, ...data };
      }
      return e;
    });
  } else return state;
}

export default reducer;
