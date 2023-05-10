import Robot from "./Robot";
import { v4 as uuidv4 } from 'uuid';

import useItems from "@/hooks/use-query-items";
import { useCallback } from "react";

const groupId = uuidv4();

type Item = ReturnType<typeof useItems>[0][0];

const RobotGridFrame = () =>
{
    const [items, dispatch] = useItems();

    // NOTE: 如下使用方式：会使useCallback所做的努力白费，因为每次渲染都会生成一个新的函数
    // NOTE: <Element onChange={(id) => handleChange(id)} />
    const handleChange = useCallback(
        function (id: Item["id"])
        {
            const item = items.find(e => e.id === id);
            if (!item) return;
            dispatch({ type: 'Update', id, data: { id: parseInt((Math.random() * 10000) + '') } });
        }
        , [items, dispatch]);
    return (<>{
        items.map((r, i) =>
            <Robot
                key={r.id}
                item={r}
                groupId={groupId}
                onChange={handleChange}
            />
        )
    }</>);
};

export default RobotGridFrame;
