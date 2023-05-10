import React, { useEffect, useReducer } from "react";
import _robots from '@/mocks/robots.json';
import Robot from "./Robot";
import { v4 as uuidv4 } from 'uuid';
import { list } from '@/api/user';
import reducer from "@/model/robots";

const groupId = uuidv4();

type Item = Parameters<typeof reducer>[0][0];

type Dispatch = (value: {
    type: Parameters<typeof reducer>[1]["type"];
    id?: number ;
    data?: Item | Item[] ;
}) => void;

async function getUsers(dispatch: Dispatch)
{
    const data = await list();
    Array.isArray(data?.data) && dispatch({ type: 'Assign', data: data.data });
};

function handleChange(id: Item["id"], robots: Item[], dispatch: Dispatch)
{
    const item = robots.find(e => e.id === id);
    if (!item) return;
    dispatch({ type: 'Update', id, data: { id: parseInt((Math.random() * 10000) + '') } });
}

const RobotGridFrame = () =>
{
    const [robots, dispatch] = useReducer(reducer, [..._robots]);
    useEffect(() =>
    {
        getUsers(dispatch);
    }, []);
    return (<>{
        robots.map((r, i) =>
            <Robot
                key={r.id}
                item={r}
                groupId={groupId}
                onChange={(id) => handleChange(id, robots, dispatch)}
            />
        )
    }</>);
};

export default RobotGridFrame;
