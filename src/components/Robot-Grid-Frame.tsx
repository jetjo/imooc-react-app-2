import React from "react";
import robots from '@/mock-data/robots.json';
import Robot from "./Robot";
import { v4 as uuidv4 } from 'uuid';

const groupId = uuidv4();

const RobotGridFrame = () => (<>{
    robots.map((r, i) =>
        <Robot
            key={i}
            {...r}
            id={parseInt((Math.random() * 1000000).toString())}
            groupId={groupId}
        />
    )
}</>);

export default RobotGridFrame;
