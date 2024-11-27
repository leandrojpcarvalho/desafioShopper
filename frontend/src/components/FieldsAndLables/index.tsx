import { useContext } from "react";
import global from "../../app/context";
import './style.css'


function FieldsAndLables<T>({ handleChange, label, value, className, type, name }: FieldsAndLablesProps<T>) {
    const { error } = useContext(global)
    const labelName = label ? label : name.toString();
    const classNameMaker = () => {
        let classN = 'input';
        if (className) {
            classN += ` ${className}`;
        }
        if (error.includes(classN)) {
            classN += ' error';
        }
        return classN;
    }

    return (
        <div className={classNameMaker()}>
            <label htmlFor={name.toString()} >
                {labelName}
            </label>
            <input type={type ? type : 'text'} value={value} name={name.toString()} onChange={handleChange} />
        </div>
    );
}

export interface FieldsAndLablesProps<T> {
    tab: number;
    name: keyof T;
    value: string;
    placeholder?: string;
    label?: string;
    className?: string;
    type?: "text" | "password" | "email";
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class FieldsAndLablesFactory {
    public static create<T>(props: FieldsAndLablesProps<T>) {
        return <FieldsAndLables {...props} />;
    }
    public static createFieldsAndLables<T>(props: FieldsAndLablesProps<T>[]) {
        return props.reduce((acc, props) => {
            acc[props.name as keyof T] = this.create(props);
            return acc;
        }, {} as { [K in keyof T]: JSX.Element });
    }
}