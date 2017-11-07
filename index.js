let store = { drivers: [], passengers: [], trips: [] };

const Driver = (() => {
  let id = 1;

  return class Driver {
    constructor(name) {
      this.name = name;
      this.id = id;
      id++;
      store.drivers.push(this);
    }

    static all() {
      return store.drivers;
    }
    // filter to return join table results
    trips() {
      return store.trips.filter(trip => trip.driverId === this.id);
    }
    // use those results to map through to the has-many relationship
    passengers() {
      return this.trips().map(trip => trip.passenger());
    }
  };
})();

const Passenger = (() => {
  let id = 1;

  return class Passenger {
    constructor(name) {
      this.name = name;
      this.id = id;
      id++;
      store.passengers.push(this);
    }

    static all() {
      return store.passengers;
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
})();

const Trip = (() => {
  let id = 1;

  return class Trip {
    constructor(driver, passenger) {
      this.driverId = driver.id;
      this.passengerId = passenger.id;
      this.id = id;
      id++;
      store.trips.push(this);
    }

    static all() {
      return store.trips;
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
})();
