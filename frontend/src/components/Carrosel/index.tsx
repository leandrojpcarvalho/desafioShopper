import { useState } from "react";
import ButtonFactory from "../Button";
import './style.css'

type Buttons = {
    left: string;
    right: string;
}

interface CarroselProps {
    cards: JSX.Element[]
}

export function Carrosel({ cards }: CarroselProps) {
    const [position, setPosition] = useState(0);

    const handleClick = (number: number) => {
        if (position >= cards.length - 1 && number > 0) {
            setPosition(0)
        } else if (position <= 0 && number < 0) {
            setPosition(cards.length - 1)
        } else {
            setPosition(position + number)
        }
    }


    const buttons = ButtonFactory.createButtons<Buttons>([
        {
            label: 'left',
            onClick: () => handleClick(-1),
            tab: 0,
            type: 'submit'
        },
        {
            label: 'right',
            onClick: () => handleClick(1),
            tab: 0,
            type: 'submit'
        }
    ]);
    return (
        <div className="carrosel-container">
            {buttons['left']}
            <div className="card-container">
                {cards[position]}
            </div>
            {buttons['right']}
        </div>
    )
}
