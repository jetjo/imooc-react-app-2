// shopping-car.tsx
import React, { Component } from 'react';
import { Button } from '@nextui-org/react';
import style from './shopping-car.module.css';

interface Prop
{
    items: any[];
}
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
            expand: false,
            // items: []
        };
    }

    showCar()
    {
        this.setState({ expand: !this.state.expand });
    }

    render(): React.ReactNode
    {
        const carClass = this.state.expand ?
            [style.itemList, style.itemListActive].join(' ') :
            style.itemList;
        return (
            <div className={style.shoppingCar}>
                <Button onPress={() => this.showCar()} auto>我的购物车</Button>
                <ul className={carClass}>
                    {
                        this.props.items.map(({ item, index: id }, index) => (
                            <li key={index}>{item.name}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default ShoppingCar;
