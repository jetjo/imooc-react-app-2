//index.ts

interface State {
  items: { item: any; count: number }[];
}

type Action = {
  type: ShoppingCarActionType;
  count?: number;
  which?: {
    (data: unknown): boolean;
  };
  what?: {
    (): unknown;
  };
};

const shoppingCar: State = {
  items: [],
};

/* const */
enum ShoppingCarActionType {
  Add = 1,
  Clear = -2,
  Remove = -1,
  SetItemCount = 0,
}

// business logic composed by reducer
function shoppingCarReducer(draft: State, action: Action) {
  requireSupportType();
  function requireSupportType() {
    const ts = Object.keys(ShoppingCarActionType);
    for (const t of ts) {
      if (action.type === ShoppingCarActionType[t]) return;
    }
    throw Error(`不支持${action.type}操作！`, { cause: action });
  }
  function requireWhich() {
    if (!action.which)
      throw Error(`action type: ${action.type}时, 参数action.which不呢为空！`, {
        cause: action,
      });
  }
  function requireWhat() {
    if (!action.what)
      throw Error(`action type: ${action.type}时, 参数action.what不呢为空！`, {
        cause: action,
      });
  }
  function requireCount() {
    // (count: number | undefined): count is number// | never
    if (!(action.count! > 0))
      throw Error(`action type: ${action.type}时, 参数action.count必须大于0`, {
        cause: action,
      });
    // return true;
  }
  const items = draft.items;
  let _items: any = [];
  if (action.type === ShoppingCarActionType.Remove) {
    requireWhich();
    _items = items.filter((e) => !action.which!(e.item));
  } else if (action.type === ShoppingCarActionType.Add) {
    requireWhat();
    _items = [...items, { item: action.what!(), count: 1 }];
  } else if (action.type === ShoppingCarActionType.SetItemCount) {
    requireWhich();
    requireCount();
    _items = items.map((e) => {
      if (action.which!(e.item)) return { ...e, count: action.count! };
      else return e;
    });
  }
  return { ...draft, items: _items };
}

export { shoppingCarReducer, ShoppingCarActionType, shoppingCar };
