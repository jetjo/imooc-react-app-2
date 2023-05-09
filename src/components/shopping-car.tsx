// shopping-car.tsx
import React, { Component } from 'react';
import { Button } from '@nextui-org/react';
import style from './shopping-car.module.css';
import flexStyle from '../assets/styles/css/flex-row.module.css';
import { FiShoppingCart } from "react-icons/fi";
import { appContext } from '@/App.context';

interface State
{
    expand: boolean;
}

interface Item
{
    item: {
        id: number;
        name: string;
    };
    count: number;
}

class ShoppingCar extends Component<{}, State>
{
    constructor(props)
    {
        super(props);
        this.state = {
            expand: false
        };
    }

    showCar()
    {
        this.setState({ expand: !this.state.expand });
    }

    createItemNode(items: Item[])
    {
        return items.map(({ item, count }, index) => (
            <li key={index}>
                <span>{item.name}</span>
                <span>({count})</span>
            </li>
        ));
    }

    render(): React.ReactNode
    {
        const carClass = this.state.expand ?
            [style.itemList, style.itemListActive].join(' ') :
            style.itemList;

        return (
            <appContext.Consumer>
                {
                    ({ userName, shoppingCar: { items } }) => (
                        <div className={style.shoppingCar}>
                            <div className={flexStyle.flexRow}>
                                <FiShoppingCart className={style.icon} />
                                <Button onPress={() => this.showCar()} auto>我的购物车</Button>
                            </div>
                            <ul className={carClass}>
                                {
                                    this.createItemNode(items)
                                }
                            </ul>
                        </div>
                    )
                }
            </appContext.Consumer>
        );
    }
}

export default ShoppingCar;
