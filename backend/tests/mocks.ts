import { QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";
import { IDriverDB, IReviewDB, IRideDB } from "../src/interface/database.interface";
import { GetRidesBy, GoogleResponse, HistoryRide } from "../src/utils/types";
import IEstimateRequest, { IEstimateResponse } from "../src/interface/estimate.interface";
import { EstimateResponseClass } from "../src/entities/EstimateFactory";

export const mockModelSql = [[{ id: 1 }, { id: 2 }]] as RowDataPacket[][];
export const mockById = [{ id: 1 }] as RowDataPacket[];
export const mockByIdNotFound = [] as RowDataPacket[];
export const mockInsertData = { insertId: 1 } as ResultSetHeader;
export const affectedRows = { affectedRows: 1 } as ResultSetHeader;
export const driverMock: IDriverDB = {
    id: 1,
    name: "Teste",
    description: "Teste",
    min_order: 1,
    tax: 10,
    vehicle: "Carro",
}
export const rideMock: IRideDB = {
    id: 1,
    customer_id: "1",
    driver_id: 1,
    origin: "Teste",
    destination: "Teste",
    distance: 10,
    duration: "10",
    value: 10,
    date: new Date(),
}

export const getRidesMock: GetRidesBy = {
    customer_id: "1",
    driver_id: 1,
    name: "Teste",
    date: new Date("20241127T22:18:34.587Z"),
    description: "Teste",
    destination: "Teste",
    distance: 10,
    duration: "10s",
    id: 1,
    origin: "Teste",
    value: 10,
}

export const getRidesResponseMock: HistoryRide = {
    customer_id: "1",
    rides: [
        {
            date: new Date("20241127T22:18:34.587Z"),
            destination: "Teste",
            distance: 10,
            driver: {
                id: 1,
                name: "Teste",
            },
            duration: "10s",
            id: 1,
            origin: "Teste",
            value: 10
        }
    ]

}

export const ridesMock: IRideDB[] = [
    {
        id: 1,
        customer_id: "1",
        driver_id: 1,
        origin: "Teste",
        destination: "Teste",
        distance: 10,
        duration: "10",
        value: 10,
        date: new Date(),
    },
    {
        id: 2,
        customer_id: "1",
        driver_id: 1,
        origin: "Teste",
        destination: "Teste",
        distance: 10,
        duration: "10",
        value: 10,
        date: new Date(),
    },
    {
        id: 3,
        customer_id: "2",
        driver_id: 1,
        origin: "Teste",
        destination: "Teste",
        distance: 10,
        duration: "10",
        value: 10,
        date: new Date(),
    }
]

export const reviewMock: IReviewDB = {
    id: 1,
    customer_id: "1",
    driver_id: 1,
    comment: "5",
    rating: 5,
    ride_id: 1,
}

export const responseGoogleMock: GoogleResponse = {
    "routes": [
        {
            "legs": [
                {
                    "startLocation": {
                        "latLng": {
                            "latitude": 7.196893299999998,
                            "longitude": 34.8577867
                        }
                    },
                    "endLocation": {
                        "latLng": {
                            "latitude": 7.1197696,
                            "longitude": 34.8569801
                        }
                    }
                }
            ],
            "distanceMeters": 12629,
            "duration": "1300s",
            "polyline": {
                "encodedPolyline": "ps|j@ddwsEE|FnF@jFFNmKCiAFiGD_EDyAFe@DKGKM?EBg@Gg@?_@IG@qAGeBCsE?e@PyIE_@TKBABc@DEDeDAo@LIFY`@GLM|AK|BIp@I^OT]`@c@Xa@LYDs@?gAOm@QYQqAiAw@a@mCu@s@IWAoBFwC`@e@LeAn@eFpDa@RcAXmEj@u@Te@XwDrFaAnA_C~BcBfAaCnAq@^yBxAqBxAyA~@wCfCsA~Ao@|@_AbAs@f@e@VQD]NWCQHMXWRcDbB_@ViB~@g@T_B`A_Ap@gDvCIL}EnD_DvBQJI?UPUW@}@EmAS{ASs@Oe@m@wAk@_A}@mAi@c@kBoAQQiDaB{@Gg@KQ?}PkIwJiF_a@gSmCqA_FkCu@e@eAy@cCuBiH_GsFwEsB}Ay@w@yHkGuAaAiAg@qA[oAMsAAuAH_i@rHkB\\i@N{Aj@s@\\iChBuCpBe@GMGGQ@g@x@kB\\UNGTBHBTPFxA?tAIb@Yz@cDjGiBdEqAhDSNmArDiAdEO\\QVc@b@s@h@WNUD[BSA]MUMcBuBe@Uc@MyI`BsARo@XSVMd@BhA?bAUxAQp@[~@uHsCk@QmCiAqBo@}CmAiBu@w@UaG{BgDmAgAe@iFoBo@WEaDuGA?e@"
            }
        }
    ]
}

export const initialRequestMock: IEstimateRequest = {
    customer_id: "1",
    origin: "Teste",
    destination: "Teste1",
}

export const estimateResponseMock: IEstimateResponse = {
    "customer_id": "1",
    "destination": {
        "latitude": 7.1197696,
        "longitude": 34.8569801,
    },
    "distance": 12629,
    "duration": "1300s",
    "options": [
        {
            "description": "Teste",
            "id": 1,
            "name": "Teste",
            "review": {
                "comment": "",
                "rating": 0,
            },
            "value": 126.29,
            "vehicle": "Carro",
        }
    ],
    "origin": {
        "latitude": 7.196893299999998,
        "longitude": 34.8577867,
    },
    "routeResponse": {
        "routes": [
            {
                "distanceMeters": 12629,
                "duration": "1300s",
                "legs": [
                    {
                        "endLocation": {
                            "latLng": {
                                "latitude": 7.1197696,
                                "longitude": 34.8569801,
                            }
                        },
                        "startLocation": {
                            "latLng": {
                                "latitude": 7.196893299999998,
                                "longitude": 34.8577867,
                            },
                        },
                    },
                ],
                "polyline": {
                    "encodedPolyline": "ps|j@ddwsEE|FnF@jFFNmKCiAFiGD_EDyAFe@DKGKM?EBg@Gg@?_@IG@qAGeBCsE?e@PyIE_@TKBABc@DEDeDAo@LIFY`@GLM|AK|BIp@I^OT]`@c@Xa@LYDs@?gAOm@QYQqAiAw@a@mCu@s@IWAoBFwC`@e@LeAn@eFpDa@RcAXmEj@u@Te@XwDrFaAnA_C~BcBfAaCnAq@^yBxAqBxAyA~@wCfCsA~Ao@|@_AbAs@f@e@VQD]NWCQHMXWRcDbB_@ViB~@g@T_B`A_Ap@gDvCIL}EnD_DvBQJI?UPUW@}@EmAS{ASs@Oe@m@wAk@_A}@mAi@c@kBoAQQiDaB{@Gg@KQ?}PkIwJiF_a@gSmCqA_FkCu@e@eAy@cCuBiH_GsFwEsB}Ay@w@yHkGuAaAiAg@qA[oAMsAAuAH_i@rHkB\\i@N{Aj@s@\\iChBuCpBe@GMGGQ@g@x@kB\\UNGTBHBTPFxA?tAIb@Yz@cDjGiBdEqAhDSNmArDiAdEO\\QVc@b@s@h@WNUD[BSA]MUMcBuBe@Uc@MyI`BsARo@XSVMd@BhA?bAUxAQp@[~@uHsCk@QmCiAqBo@}CmAiBu@w@UaG{BgDmAgAe@iFoBo@WEaDuGA?e@"
                }
            }
        ]
    }
}