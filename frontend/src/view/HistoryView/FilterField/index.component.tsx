import ButtonFactory, { ButtonProps } from "../../../components/Button";
import FieldsAndLablesFactory, { FieldsAndLablesProps } from "../../../components/FieldsAndLables";

export type FieldsFilterComponentsTyps = {
    customer_id: string;
    driver_id: string;
}

export type ButtonFilterComponentsTyps = {
    Remover: void;
    Filtrar: void;
}

export interface FilterFieldComponentProps {
    fields: FieldsAndLablesProps<FieldsFilterComponentsTyps>[];
    buttons: ButtonProps<ButtonFilterComponentsTyps>[];
}

export default function FilterFieldComponent({ fields, buttons }: FilterFieldComponentProps) {
    const elementsField = FieldsAndLablesFactory.createFieldsAndLables<FieldsFilterComponentsTyps>(fields)
    const elementButton = ButtonFactory.createButtons<ButtonFilterComponentsTyps>(buttons)
    return (
        <div className="filter container column">
            <h2>Filtros</h2>
            <div className="flex">
                {elementsField.customer_id}
                {elementsField.driver_id}
            </div>
            <div className="flex">
                {elementButton.Remover}
                {elementButton.Filtrar}
            </div>
        </div>
    )

}