let store = { drivers: [], passengers: [], trips: [] };

const makeDriver = () => {
  let id = 1;

  return class {
    constructor(name) {
      this.name = name;
      this.id = id;
      id++;
      store.drivers.push(this);
    }

    // filter to return join table results
    trips() {
      return store.trips.filter(trip => trip.driverId === this.id);
    }
    // use those results to map through to the has-many relationship
    passengers() {
      return this.trips().map(trip => trip.passenger);
    }
  };
};

const makePassenger = () => {
  let id = 1;

  return class {
    constructor(name) {
      this.name = name;
      this.id = id;
      id++;
      store.passengers.push(this);
    }

    // filter to return join table results
    trips() {
      return store.trips.filter(trip => trip.passengerId === this.id);
    }

    // use those results to map through to the has-many relationship
    drivers() {
      return this.trips().map(trip => trip.driver());
    }
  };
};

const makeTrip = () => {
  let id = 1;

  return class {
    constructor(driver, passenger) {
      this.id = id;
      id++;
      this.driverId = driver.id;
      this.passengerId = passenger.id;
      store.trips.push(this);
    }

    driver() {
      return store.drivers.find(driver => driver.id === this.driverId);
    }

    passenger() {
      return store.passengers.find(
        passenger => passenger.id === this.passengerId
      );
    }
  };
};

// invoking the functions to make the actual classes

const Driver = makeDriver();
const Passenger = makePassenger();
const Trip = makeTrip();

// you can create a new instance afterward with
// const someDriver = new Driver("name")
// must invoke methods as well eg someDriver.trips()
