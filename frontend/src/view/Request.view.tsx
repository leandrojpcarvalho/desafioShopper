import React, { useContext, useEffect, useState } from "react";
import FieldsAndLablesFactory from "../components/FieldsAndLables";
import global, { initialContext } from "../app/context";
import ButtonFactory from "../components/Button";
import MapGenerator, { MapProps } from "../components/Map";
import { RequestFactory } from "../Utils";
import { EstimateResponse } from "../components/types";
import CardsDrivers from "./CardsDrivers.view";
import { useNavigate } from "react-router-dom";
import { Poi } from "../components/types";
import './RequestView.css'

export interface RequestViewFields {
    customer_id: string;
    origin: string;
    destination: string;
}

type Buttons = {
    Estimar: void;
    Alterar: void;
    Limpar: void;
    Confirmar: void;
}

export default function RequestView() {
    const { tab, error } = useContext(global)
    const [errors, setErrors] = useState(error);
    const [customer_id, setCustomer_id] = useState<RequestViewFields['customer_id']>('');
    const [origin, setOrigin] = useState<RequestViewFields['origin']>('');
    const [destination, setDestination] = useState<RequestViewFields['destination']>('');
    const [data, setData] = useState<EstimateResponse>();
    const [locations, setLocations] = useState<MapProps>({ locations: new Array<Poi>() });
    const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);
    const [showClean, setShowClean] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deactivadeButtons, setDeactivadeButtons] = useState(initialContext.deactivadeButtons);
    const [showForm, setShowForm] = useState(true);
    const nav = useNavigate();

    useEffect(() => {
        if (customer_id || origin || destination) {
            setShowClean(true)
        } else {
            setShowClean(false)
        }

        if (customer_id !== '' && origin !== '' && destination !== '') {
            setDeactivadeButtons(deactivadeButtons.filter(button => button !== 'Estimar'))
        } else {
            setDeactivadeButtons(['Estimar'])
        }
    }, [customer_id, origin, destination]);

    useEffect(() => {
        setTimeout(() => {
            setErrors([])
        }, 5000);
    }, [errors]);

    useEffect(() => {
        if (selectedDriverId) {
            setDeactivadeButtons(deactivadeButtons.filter(button => button !== 'Confirmar'))
        } else {
            setDeactivadeButtons([...deactivadeButtons, 'Confirmar'])
        }
    }, [selectedDriverId])

    useEffect(() => {
        if (data && data.options) {
            setShowConfirm(true)
        }
    }, [data])

    const getDrivers = () => {
        try {
            fetch(RequestFactory.getRideEstimate({ customer_id: parseInt(customer_id), origin, destination }))
                .then(response => response.json())
                .then(data => {
                    setData(data)
                    setLocations({
                        locations: [
                            { key: 'A', location: { lat: data.origin.latitude, lng: data.origin.longitude }, background: 'green' },
                            { key: 'B', location: { lat: data.destination.latitude, lng: data.destination.longitude }, background: 'blue' }
                        ]
                    })
                })
                .catch(err => setErrors([...errors, err]))
        } catch (err) {
            if (err instanceof Error) {
                setErrors([...errors, err.message])
            }
        }
    }

    const requestRide = () => {
        try {
            if (!data) {
                throw new Error('Estime o valor da corrida')
            }
            if (!selectedDriverId) {
                throw new Error('Selecione um motorista')
            }
            console.log(data.options, selectedDriverId)
            const driver = data.options.find(driver => driver.id === selectedDriverId)
            if (!driver) {
                throw new Error('Motorista não encontrado')
            }
            fetch(RequestFactory.confirmRide({ customer_id: parseInt(customer_id), origin, destination, driver, distance: data.distance, duration: data.duration, value: parseFloat(driver.value.toFixed(2)) }))
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        nav(`/history/${customer_id}`)
                        return
                    }
                    throw new Error(data.error_description)
                })
                .catch(err => setErrors([...errors, err]))
        } catch (err) {
            if (err instanceof Error) {
                setErrors([...errors, err.message])
            }
        }
    }


    const selectDriver = (event: React.MouseEvent<HTMLElement>) => {
        const position = parseInt(event.currentTarget.id)
        if (selectedDriverId === position) {
            setSelectedDriverId(null)
            return
        }
        setSelectedDriverId(position)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case 'customer_id':
                setCustomer_id(value);
                break;
            case 'origin':
                setOrigin(value);
                break;
            case 'destination':
                setDestination(value);
                break;
            default:
                break;
        }
    }

    const handleClear = () => {
        setCustomer_id('');
        setOrigin('');
        setDestination('');
    }

    const elementsField = FieldsAndLablesFactory.createFieldsAndLables<RequestViewFields>([
        {
            handleChange,
            name: 'customer_id',
            label: 'Id',
            value: customer_id,
            placeholder: 'digite o seu Id',
            tab: tab + 1
        }, {
            handleChange,
            label: 'Ponto de partida',
            name: 'origin',
            value: origin,
            placeholder: 'digite o endereço',
            tab: tab + 2
        }, {
            handleChange,
            label: 'Ponto de destino',
            name: 'destination',
            value: destination,
            placeholder: 'digite o endereço',
            tab: tab + 3
        }
    ]);

    const elementsButton = ButtonFactory.createButtons<Buttons>([
        {
            label: 'Estimar',
            tab: tab + 4,
            onClick: getDrivers,
            type: 'submit'
        },
        {
            label: 'Limpar',
            tab: tab + 5,
            onClick: handleClear,
            type: 'clean'
        },
        {
            label: 'Confirmar',
            tab: tab + 6,
            onClick: requestRide,
            type: 'submit'
        },
        {
            label: 'Alterar',
            tab: tab + 7,
            onClick: () => setShowForm(!showForm),
            type: 'submit'
        }
    ])

    const confirm = () => {

        if (showConfirm && data) {
            return (
                <section className="confirm">
                    <h1>Opções de viagem </h1>
                    <MapGenerator locations={locations.locations} />
                    <h2>Escolha seu motorista</h2>
                    <CardsDrivers {...{ drivers: data.options, onClick: selectDriver }} />
                </section>
            )
        }
    }
    return (
        <global.Provider value={{ ...initialContext, deactivadeButtons, selectedDriverId }}>
            <section className="request">
                <h1>Solicitação de viagem</h1>
                <form action="" className="fields">
                    {elementsField['customer_id']}
                    {elementsField['origin']}
                    {elementsField['destination']}
                </form>
                <div className="buttons">
                    {showClean && elementsButton['Limpar']}
                    {elementsButton['Estimar']}
                </div>
                {confirm()}
                {errors.length > 0 && <p>{errors.join(', ')}</p>}
                {showConfirm && elementsButton['Confirmar']}
            </section>
        </global.Provider>

    );
}


