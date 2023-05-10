import { useContext } from "react";
import { appSetterContext } from "@/App.context";

import handleAddToCar from "@/model/shoppingCar/controllers/add";

function useAddToCar(item: Parameters<typeof handleAddToCar>[0]) {
  const dispatch = useContext(appSetterContext);
  return () => {
    if (!dispatch)
      throw Error("dispatch is not defined", { cause: appSetterContext });
    handleAddToCar(item, dispatch);
  };
}

export default useAddToCar;
