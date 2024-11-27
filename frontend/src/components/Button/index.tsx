import React, { useContext } from "react";
import global from "../../app/context";
import './style.css';
import { ElementsFactory } from "../types";


function Button<T>({ label, onClick, type, tab, id }: ButtonProps<T>) {
    const { deactivadeButtons, menuSelected } = useContext(global)
    const buttonType = (base: string) => {
        switch (type) {
            case 'clean':
                return base + ' clean'
            case 'close':
                return base + 'close'
            default:
                return ''
        }
    }
    const className = () => {
        let name = 'basic-button button'
        if (menuSelected === label.toString() && type === 'menu') {
            name += ' selected'
        } else if (deactivadeButtons.includes(label.toString())) {
            name = 'basic-button button-deactive'
        }
        buttonType(name)
        return name
    }
    return (
        <div
            aria-disabled={deactivadeButtons.includes(label.toString())}
            className={className()}
            onClick={deactivadeButtons.includes(label.toString()) ? () => { } : onClick}
            role="button"
            tabIndex={tab}
            id={id}
        >
            {label.toString()}
        </div>
    )
}

export interface ButtonProps<T> {
    label: keyof T;
    onClick: (e: React.MouseEvent<HTMLElement>) => void | (() => void);
    type: 'submit' | 'clean' | 'close' | 'menu';
    tab: number;
    id?: string;
}


export default class ButtonFactory {
    public static createButton<T>(props: ButtonProps<T>, key: string): JSX.Element {
        return <Button key={key} {...props} />
    }
    public static createButtons<T>(buttons: ButtonProps<T>[]): ElementsFactory<T> {
        return buttons.reduce((acc, button) => {
            acc[button.label as keyof T] = ButtonFactory.createButton(button, button.label.toString())
            return acc
        }, {} as { [K in keyof T]: JSX.Element })
    }
}