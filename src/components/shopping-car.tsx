// shopping-car.tsx
import React, { Component } from 'react';

interface Prop { }
interface State
{
    expand: boolean;
}

class ShoppingCar extends Component<Prop, State>
{

    constructor(props)
    {
        super(props);
        this.state = {
            expand: false
        };
    }

    render(): React.ReactNode
    {
        return (
            <div>
                
            </div>
        );
    }

}

export default ShoppingCar;
