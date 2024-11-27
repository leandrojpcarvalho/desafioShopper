import { useContext } from 'react';
import ButtonFactory, { ButtonProps } from '../Button';
import global from '../../app/context';
import './style.css'
import { Ride } from '../types';
import CardBodyRide from './CardBody/Ride/index.component';

function Card<T>({ header, children, className, button, id }: CardProps<T>) {
    const { selectedDriverId } = useContext(global)
    const tab = 0 + (Array.isArray(children) ? children.length : 1);
    const buttons = button ? button.map((button, index) => ButtonFactory.createButton({ ...button, tab: index + tab, id }, index.toString())) : []
    return (
        <div className={`card ${className}${selectedDriverId?.toString() === id ? ' selected-driver' : ''}`} >
            <div className="card-header">
                {header}
            </div>
            <div className="card-body">
                {children}
            </div>
            {button ? (
                <div className="buttons">
                    {buttons}
                </div>
            ) : ''}
        </div>
    )
}

export interface CardProps<T> {
    header: string;
    children?: JSX.Element | JSX.Element[];
    className?: string;
    button?: ButtonProps<T>[];
    id?: string;
}

export default class CardFactory {
    public static createCard<T>(props: CardProps<T>, key: string) {
        return <Card key={key}{...props} />
    }
    public static createCards<T extends Object>(cards: CardProps<T>[]) {
        return cards.reduce((acc, card, index) => {
            acc[card.header as keyof T] = CardFactory.createCard(card, index.toString())
            return acc
        }, {} as { [K in keyof T]: React.ReactNode })
    }

    public static createCardsRide(data: Ride[]) {
        return data.map((item) => {
            return CardFactory.createCard({
                header: `Viagem para ${item.destination}`,
                children: <CardBodyRide key={item.id} ride={item} />,
                className: 'ride',
            }, item.id.toString())
        })
    }
}