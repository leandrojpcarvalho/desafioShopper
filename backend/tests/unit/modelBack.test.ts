import { expect } from "chai";
import sinon from "sinon";
import ModelSql from "../../src/db/model";
import DriverModel from "../../src/layers/model/driver.model";
import RideModel from "../../src/layers/model/ride.model";
import CustomerModel from "../../src/layers/model/customer.model";
import { driverMock, reviewMock, rideMock, ridesMock } from "../mocks";
import ReviewModel from "../../src/layers/model/review.model";

beforeEach(() => {
    sinon.restore();
});

const driverModel = new DriverModel();
describe("driver model", function () {
    it('testa se o metodo retorna um objeto do tipo DriverModel', async function () {
        sinon.stub(ModelSql.prototype, 'findById').resolves(driverMock);
        const driver = await driverModel.findById("1");
        expect(driver).to.be.an('object');
        expect(driver).to.have.property('id');
        expect(driver).to.have.property('name');
        expect(driver).to.have.property('description');
        expect(driver).to.have.property('min_order');
        expect(driver).to.have.property('tax');
        expect(driver).to.have.property('vehicle');
    });
    it('testa se ao requisitar um driver inexistente, o metodo retorna null', async function () {
        sinon.stub(ModelSql.prototype, 'findById').resolves(null);
        const driver = await driverModel.findById("1");
        expect(driver).to.be.null;
    });

    it('testa se a custom query retorna um array de objetos', async function () {
        sinon.stub(ModelSql.prototype, 'customQuery').resolves([driverMock, driverMock]);
        const drivers = await driverModel.findByCustomQuery({});
        expect(drivers).to.be.an('array');
        expect(drivers).to.have.length(2);
    })
});

const reviewModel = new ReviewModel();
describe("review model", function () {
    it('testa se o metodo retorna um objeto do tipo ReviewModel', async function () {
        sinon.stub(ModelSql.prototype, 'findById').resolves(reviewMock);
        const review = await driverModel.findById("1");
        expect(review).to.be.an('object');
        expect(review).to.have.property('id');
        expect(review).to.have.property('customer_id');
        expect(review).to.have.property('driver_id');
        expect(review).to.have.property('comment');
        expect(review).to.have.property('rating');
        expect(review).to.have.property('ride_id');
    });

    it('testa se ao requisitar um review inexistente, o metodo retorna null', async function () {
        sinon.stub(ModelSql.prototype, 'findById').resolves(null);
        const review = await driverModel.findById("1");
        expect(review).to.be.null;
    });
    it('testa se a custom query retorna um array de objetos', async function () {
        sinon.stub(ModelSql.prototype, 'customQuery').resolves([reviewMock, reviewMock]);
        const reviews = await reviewModel.findByCustomQuery({});
        expect(reviews).to.be.an('array');
        expect(reviews).to.have.length(2);
    })

    it('testa se ao requisitar um review por driver id, o metodo retorna um array de objetos', async function () {
        sinon.stub(ModelSql.prototype, 'customQuery').resolves([reviewMock, reviewMock]);
        const reviews = await reviewModel.findReviewByDriverId(1);
        expect(reviews).to.be.an('array');
        expect(reviews).to.have.length(2);
    });
});

const customerModel = new CustomerModel();
describe("customer model", function () {
    it('testa se o metodo retorna um objeto do tipo CustomerModel', async function () {
        sinon.stub(ModelSql.prototype, 'findById').resolves(driverMock);
        const customer = await customerModel.findById("1");
        expect(customer).to.be.an('object');
        expect(customer).to.have.property('id');
    });

    it('testa se ao requisitar um customer inexistente, o metodo retorna null', async function () {
        sinon.stub(ModelSql.prototype, 'findById').resolves(null);
        const customer = await customerModel.findById("1");
        expect(customer).to.be.null;
    });
});

const rideModel = new RideModel();
describe("ride model", function () {
    it('testa se o metodo retorna um objeto do tipo RideModel', async function () {
        sinon.stub(ModelSql.prototype, 'findById').resolves(rideMock);
        const ride = await rideModel.findById("1");
        expect(ride).to.be.an('object');
        expect(ride).to.have.property('id');
        expect(ride).to.have.property('customer_id');
        expect(ride).to.have.property('driver_id');
        expect(ride).to.have.property('origin');
        expect(ride).to.have.property('destination');
        expect(ride).to.have.property('distance');
        expect(ride).to.have.property('duration');
        expect(ride).to.have.property('value');
        expect(ride).to.have.property('date');
    });

    it('testa se ao requisitar um ride inexistente, o metodo retorna null', async function () {
        sinon.stub(ModelSql.prototype, 'findById').resolves(null);
        const ride = await rideModel.findById("1");
        expect(ride).to.be.null;
    }
    );
    it('testa se a geAllRidesById retorna todos os que tem o mesmo id', async function () {
        sinon.stub(ModelSql.prototype, 'customQuery').resolves([ridesMock, driverMock]);
        const rides = await rideModel.getAllRidesById(1);
        expect(rides).to.be.an('array');
        expect(rides).to.have.length(2);
    });

    it('testa se a custom query retorna um array de objetos', async function () {
        sinon.stub(ModelSql.prototype, 'customQuery').resolves([ridesMock, rideMock]);
        const rides = await rideModel.findRidesByCustomerAndDriver(String(1), 1);
        expect(rides).to.be.an('array');
        expect(rides).to.have.length(2);
    });
});