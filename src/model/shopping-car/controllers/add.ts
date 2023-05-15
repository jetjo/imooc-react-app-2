// controller.ts
import React from "react";
import { ShoppingCarActionType, shoppingCarReducer } from "..";

interface Item {
  [k: string]: any;
  id: number;
}

type Dispatch = React.Dispatch<{
  shoppingCar: Parameters<typeof shoppingCarReducer>[1];
}>;

function handleAddToCar(item: Item, dispatch?: Dispatch) {
  if (dispatch) {
    dispatch({
      shoppingCar: {
        type: ShoppingCarActionType.Add,
        what: () => ({ ...item }),
      },
    });
  }
}

export default handleAddToCar;
