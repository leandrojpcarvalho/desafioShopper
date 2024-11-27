import React from "react";

interface States {
    error: string[];
    deactivadeButtons: string[]
    tab: number;
    menuSelected: string;
    selectedDriverId: number | null;
}

export const initialContext: States = {
    tab: 0,
    deactivadeButtons: [],
    error: [],
    menuSelected: "",
    selectedDriverId: null
};

const global = React.createContext<States>(initialContext);

export default global;