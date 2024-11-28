import Sinon from "sinon";
import CustomerService from "../../src/layers/service/customer.service";
import CustomerModel from "../../src/layers/model/customer.model";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import DriverService from "../../src/layers/service/driver.service";
import RideService from "../../src/layers/service/ride.service";
import RideModel from "../../src/layers/model/ride.model";
import DriverModel from "../../src/layers/model/driver.model";
import { driverMock, estimateResponseMock, getRidesMock, getRidesResponseMock, responseGoogleMock, rideMock } from "../mocks";
import EstimateResponseFactory, { EstimateResponseClass } from "../../src/entities/EstimateFactory";
import ReviewModel from "../../src/layers/model/review.model";
import { GoogleService } from "../../src/APIGoogle/service/index.service";


use(chaiAsPromised);

beforeEach(() => {
    Sinon.restore();
});

const instanceServiceCustomer = new CustomerService();
describe('Service customer', () => {
    it('devem retornar um objeto com o id do cliente e status 200', async () => {
        Sinon.stub(CustomerModel.prototype, 'findById').resolves({ id: "1" });
        const { status, data } = await instanceServiceCustomer.findById("1");
        expect(status).to.be.equal(200);
        expect(data).to.be.deep.equal({ id: "1" });
    });

    it('deve retornar um objeto com o id do cliente e status 404', async () => {
        Sinon.stub(CustomerModel.prototype, 'findById').resolves(null);
        await expect(instanceServiceCustomer.findById("1")).to.be.rejectedWith('Customer not found');
    });
});

const driverService = new DriverService();
describe('Service driver', () => {
    it('deve retornar um objeto com o id do motorista e status 200', async () => {
        Sinon.stub(DriverModel.prototype, 'findById').resolves(driverMock);
        const { status, data } = await driverService.findById("1");
        expect(status).to.be.equal(200);
        expect(data).to.be.deep.equal(driverMock);
    });

    it('deve retornar um objeto com o id do motorista e status 404', async () => {
        Sinon.stub(DriverModel.prototype, 'findById').resolves(null);
        await expect(driverService.findById("1")).to.be.rejectedWith('Driver not found');
    });
});

const rideService = new RideService();
describe('Service ride', () => {
    it('deve retornar um objeto com o id da corrida e status 200', async () => {
        Sinon.stub(RideModel.prototype, 'findById').resolves(rideMock);
        const { status, data } = await rideService.findById("1");
        expect(status).to.be.equal(200);
        expect(data).to.be.deep.equal(rideMock);
    });

    it('deve retornar um objeto com o id da corrida e status 404', async () => {
        Sinon.stub(RideModel.prototype, 'findById').resolves(null);
        await expect(rideService.findById("1")).to.be.rejectedWith('Ride not found');
    });

    it('getRidesByCustomerAndDriver deve retornar um objeto com o id da corrida e status 200', async () => {
        Sinon.stub(CustomerService.prototype, 'findById').resolves({ status: 200, data: { id: "1" } });
        Sinon.stub(DriverService.prototype, 'findById').resolves({ status: 200, data: driverMock });
        Sinon.stub(RideModel.prototype, 'findRidesByCustomerAndDriver').resolves([getRidesMock]);
        const { status, data } = await rideService.getRidesByCustomerAndDriver("1", 1);
        expect(status).to.be.equal(200);
        expect(data).to.be.deep.equal(getRidesResponseMock);
    });

    it('getRidesByCustomerAndDriver deve retornar um objeto com o id da corrida e status 404', async () => {
        Sinon.stub(CustomerService.prototype, 'findById').resolves({ status: 200, data: { id: "1" } });
        Sinon.stub(DriverService.prototype, 'findById').resolves({ status: 200, data: driverMock });
        Sinon.stub(RideModel.prototype, 'findRidesByCustomerAndDriver').resolves([]);
        await expect(rideService.getRidesByCustomerAndDriver("1", 1)).to.be.rejectedWith('Ride not found');
    });
    it('getRidesByCustomer deve retornar um objeto com o id da corrida e status 200', async () => {
        Sinon.stub(RideModel.prototype, 'getAllRidesById').resolves([getRidesMock]);
        const { status, data } = await rideService.getRidesByCustomer("1");
        expect(status).to.be.equal(200);
        expect(data).to.be.deep.equal(getRidesResponseMock);
    });

    it('getRidesByCustomer deve retornar um objeto com o id da corrida e status 404', async () => {
        Sinon.stub(RideModel.prototype, 'getAllRidesById').resolves([]);
        await expect(rideService.getRidesByCustomer("1")).to.be.rejectedWith('Ride not found');
    });

    it('create deve retornar um objeto com o id da corrida e status 200', async () => {
        Sinon.stub(RideModel.prototype, 'create').resolves(true);
        Sinon.stub(EstimateResponseFactory, 'confirmEstimateResponse').returns(true);
        const { status, data } = await rideService.create({
            customer_id: "1",
            driver: driverMock,
            origin: "Teste",
            destination: "Teste",
            distance: 10,
            duration: "10",
            value: 10,
        });
        expect(status).to.be.equal(200);
        expect(data).to.be.deep.equal({ success: true });
    });

    it('create deve retornar um objeto com o id da corrida e status 404', async () => {
        Sinon.stub(RideModel.prototype, 'create').resolves(false);
        Sinon.stub(EstimateResponseFactory, 'confirmEstimateResponse').returns(false);
        await expect(rideService.create({
            customer_id: "1",
            driver: driverMock,
            origin: "Teste",
            destination: "Teste",
            distance: 10,
            duration: "10",
            value: 10,
        })).to.be.rejectedWith('Estimate not found');
    });

    it('estimate deve retornar um objeto com o id da corrida e status 200', async () => {
        Sinon.stub(CustomerService.prototype, 'findById').resolves({ status: 200, data: { id: "1" } });
        Sinon.stub(GoogleService.prototype, 'getRoutes').resolves(responseGoogleMock);
        Sinon.stub(DriverService.prototype, 'getAllDriversByMinOrder').resolves({ status: 200, data: [driverMock] });

        Sinon.stub(ReviewModel.prototype, 'findReviewByDriverId').resolves([]);
        const { status, data } = await rideService.estimate({
            customer_id: "1",
            origin: "Teste",
            destination: "Teste1",
        });
        expect(status).to.be.equal(200);
        expect(data).to.be.deep.equal(estimateResponseMock);
    });

}); 