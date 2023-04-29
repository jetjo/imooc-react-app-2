import React from "react";
import robots from '@/mock-data/robots.json';
import Robot from "./Robot";

const RobotGridFrame = () => (<>{
    robots.map((r, i) =>
        <Robot key={i} {...r} />
    )
}</>);

export default RobotGridFrame;
