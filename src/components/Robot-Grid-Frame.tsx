import React from "react";
import robots from '@/mock-data/robots.json';
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
        (item: Item | (typeof robots)[0]): void;
    };
}

const RobotGridFrame: React.FC<Prop> = ({ addToCar }) => (<>{
    robots.map((r, i) =>
        <Robot
            key={i}
            {...r}
            groupId={groupId}

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

export default RobotGridFrame;
