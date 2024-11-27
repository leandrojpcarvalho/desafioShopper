import CardFactory from "../components/Card";
import CardBodyDriver from "../components/Card/CardBody/Driver/index.component";
import { Driver } from "../components/types";
import './CardsDrivers.css'

interface CardsDriversProps {
    drivers: Driver[];
    onClick: (e: any) => void;
}

export default function CardsDrivers({ drivers, onClick }: CardsDriversProps) {
    const cards = drivers.map((driver, index) => CardFactory.createCard({
        header: driver.name,
        button: [{ label: 'Escolher', type: 'menu', onClick, tab: index }],
        children: CardBodyDriver(driver),
        id: driver.id.toString(),
    }, index + driver.name))

    return (
        <div className="container drivers" >
            {cards}
        </div>
    )
}