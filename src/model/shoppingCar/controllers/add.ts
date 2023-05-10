// controller.ts
import React from "react";
import { ShoppingCarActionType } from "@/App.context";

interface Item {
  [k: string]: any;
  id: number;
}

type Dispatch = React.Dispatch<{
  shoppingCar: {
    type: ShoppingCarActionType;
    count?: number;
    which?: (data: unknown) => boolean;
    what?: () => unknown;
  };
}>;

function handlePress(item: Item, dispatch?: Dispatch) {
  if (dispatch) {
    dispatch({
      shoppingCar: {
        type: ShoppingCarActionType.Add,
        what: () => ({ ...item }),
      },
    });
  }
}

export default handlePress;
