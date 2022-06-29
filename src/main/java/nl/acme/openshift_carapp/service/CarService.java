package nl.acme.openshift_carapp.service;

import nl.acme.openshift_carapp.domain.Car;
import nl.acme.openshift_carapp.persistence.CarRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Service
// rloman later import and add to POST and PUT @Transactional
public class CarService {

	@Autowired
	private CarRepository carRepository;

	public Iterable<Car> findAll() {
		return carRepository.findAll();
	}

	public Car save(Car car) {
		return carRepository.save(car);
	}

	public Optional<Car> findById(long id) {
		return carRepository.findById(id);
	}

	public void deleteById(long id) {
		carRepository.deleteById(id);
	}
}
