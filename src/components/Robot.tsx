import React from 'react';

interface RobotProps
{
    name: string;
    email: string;
    id: number;
}


const Robot: React.FC<RobotProps> = ({id, name, email}) => (
    <li>
        <img src={`https://robohash.org/${ id }`} alt={name} />
        <h2>{name}</h2>
        <p>{email}</p>
    </li>
)

export default Robot;
 
