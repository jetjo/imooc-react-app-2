import React, { useState } from "react";
import _robots from '@/mock-data/robots.json';
import Robot from "./Robot";
import { v4 as uuidv4 } from 'uuid';

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
        (item: Item | (typeof _robots)[0]): void;
    };
}

const RobotGridFrame: React.FC<Prop> = ({ addToCar }) =>
{
    const [robots, setRobots] = useState<any[]>(_robots);
    return (<>{
        robots.map((r, i) =>
            <Robot
                key={r.id}
                {...r}
                groupId={groupId}

                addToCar={
                    (id) =>
                    {
                        const item = robots.find(e => e.id === id);
                        if (!item) return;
                        const i = robots.indexOf(item);
                        setRobots([...robots.slice(0, i), { ...item, id: parseInt((Math.random() * 10000) + '') }, ...robots.slice(i + 1)]);
                        // addToCar(item);
                    }
                }
            />
        )
    }</>);
};

export default RobotGridFrame;
