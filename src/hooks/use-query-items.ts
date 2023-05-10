import { useEffect, useReducer } from "react";
import _robots from "@/mocks/robots.json";
import reducer from "@/model/robots";

import getItems from "@/model/robots/controllers/query";

type Item = Parameters<typeof reducer>[0][0];

type Dispatch = Parameters<typeof getItems>[0];

const useQueryItems = (): [Item[], Dispatch] => {
  const [robots, dispatch] = useReducer(reducer, [..._robots]);
  useEffect(() => {
    getItems(dispatch);
  }, []);
  return [robots, dispatch];
};

export default useQueryItems;
