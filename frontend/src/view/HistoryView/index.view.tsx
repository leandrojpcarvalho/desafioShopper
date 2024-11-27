import { useEffect, useState } from "react";
import { HistoryRide, Ride } from "../../components/types";
import FilterFieldComponent, { FieldsFilterComponentsTyps, FilterFieldComponentProps } from "./FilterField/index.component";
import { RequestFactory } from "../../Utils";
import { useParams } from "react-router-dom";
import CardFactory from "../../components/Card";
import './style.css'

const init: HistoryRide = {
    customer_id: '',
    rides: []
}


const elements: FilterFieldComponentProps = {
    buttons: [
        {
            onClick: () => { },
            label: 'Remover',
            tab: 4,
            type: 'clean'
        }, {
            onClick: () => { },
            label: 'Filtrar',
            tab: 2,
            type: 'submit'
        }
    ],
    fields: [{
        handleChange: () => { },
        label: 'Id do cliente',
        name: 'customer_id',
        tab: 0,
        value: ''
    }, {
        handleChange: () => { },
        label: 'Id do motorista',
        name: 'driver_id',
        tab: 1,
        value: ''
    }]
}

export default function HistoryView() {
    const [data, setData] = useState<HistoryRide>(init);
    const [filter, setFilter] = useState({ customer_id: data.customer_id, driver_id: '' });
    const [filteredRides, setFilteredRides] = useState<Ride[]>(new Array<Ride>());
    const [fields, setFields] = useState<FieldsFilterComponentsTyps>({ customer_id: data.customer_id, driver_id: '' });
    const { customer_id } = useParams();

    useEffect(() => {
        if (customer_id) {
            handleFetchData(parseInt(customer_id)).then((res) => {
                res?.json().then((data) => {
                    setData(data);
                })
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [])

    useEffect(() => {
        filterRides()
    }, [data])

    useEffect(() => {
        if (filter.customer_id !== data.customer_id) {
            console.log('useEffect');
            handleFetchData(parseInt(filter.customer_id)).then((res) => {
                res?.json().then((data) => {
                    setData(data);
                })
            }).catch((err) => {
                console.error(err);
            });
        }
        filterRides()
    }, [filter])

    const handleRemoveFilter = () => {
        setFilter({ customer_id: '', driver_id: '' });
        setFilteredRides(data.rides);
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({ ...filter, [e.target.name]: e.target.value });
    }

    const filterRides = () => {
        if (filter.driver_id === '') {
            setFilteredRides(data.rides);
            return;
        }
        const rides = data.rides.filter((ride) => ride.driver.id.toString() === filter.driver_id);
        setFilteredRides(rides);
    }

    const handleSetFilters = () => {
        setFilter(fields);
    }

    const handleFetchData = async (id: number) => {
        try {
            const resquest = RequestFactory.findHistory(id);
            return fetch(resquest);
        } catch (err) {
            console.error(err);
        }
    }

    elements.buttons[0].onClick = handleRemoveFilter;
    elements.buttons[1].onClick = handleSetFilters;
    elements.fields[0].handleChange = handleOnChange;
    elements.fields[0].value = fields.customer_id;
    elements.fields[1].handleChange = handleOnChange;
    elements.fields[1].value = fields.driver_id;

    return (
        <>
            <div className="header">
                <h1>Historico de Viagens</h1>
                <FilterFieldComponent {...elements} />
            </div>
            <section className="rides container">
                {CardFactory.createCardsRide(filteredRides)}

            </section>
        </>
    );
}

