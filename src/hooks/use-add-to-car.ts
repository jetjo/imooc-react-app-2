import { useCallback, useContext } from "react";
import { appSetterContext } from "@/app.context";

import handleAddToCar from "@/model/shopping-car/controllers/add";

function useAddToCar(item: Parameters<typeof handleAddToCar>[0]) {
  const dispatch = useContext( appSetterContext );
  return useCallback(() => {
    if (!dispatch)
      throw Error("dispatch is not defined", { cause: appSetterContext });
    handleAddToCar(item, dispatch);
  }, [item, dispatch]);
}

export default useAddToCar;
