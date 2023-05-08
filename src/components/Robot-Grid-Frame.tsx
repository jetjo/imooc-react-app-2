import React, { useEffect, useState } from "react";
// import _robots from '@/mock-data/robots.json';
import Robot from "./Robot";
import { v4 as uuidv4 } from 'uuid';
import { list } from '@/api/user';

const groupId = uuidv4();

interface Item
{
    name: string;
    email: string;
    id: number;
    groupId: string;
}

interface Prop
{
    addToCar: {
        (id: number): void;
        (item: Item | any): void;
    };
}

const RobotGridFrame: React.FC<Prop> = ({ addToCar }) =>
{
    const [robots, setRobots] = useState<any[]>([]);
    useEffect(() =>
    {
        const getUsers = async () =>
        {
            const data = await list();
            data && setRobots([...data.data]);
        };
        getUsers();
    }, []);
    return (<>{
        robots.map((r, i) =>
            <Robot
                item={{ item: r, index: i }}
                key={r.id}
                {...r}
                groupId={groupId}

                onChange={
                    (id) =>
                    {
                        const item = robots.find(e => e.id === id);
                        if (!item) return;
                        const i = robots.indexOf(item);
                        setRobots([...robots.slice(0, i), { ...item, id: parseInt((Math.random() * 10000) + '') }, ...robots.slice(i + 1)]);
                    }
                }

                addToCar={
                    (id) =>
                    {
                        const item = robots.find(e => e.id === id);
                        if (!item) return;
                        addToCar(item);
                    }
                }
            />
        )
    }</>);
};

export default RobotGridFrame;
