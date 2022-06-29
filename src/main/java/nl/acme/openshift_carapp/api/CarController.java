package nl.acme.openshift_carapp.api;

import nl.acme.openshift_carapp.domain.Car;
import nl.acme.openshift_carapp.service.CarService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("api/cars")
public class CarController {

	@Autowired
	private CarService carService;

	@GetMapping
	public ResponseEntity<Iterable<Car>> list() {
		return ResponseEntity.ok(carService.findAll());
	}

	@PostMapping
	public ResponseEntity<Car> create(@RequestBody Car car) {
		return ResponseEntity.ok(this.carService.save(car));
	}

	@GetMapping("{id}")
	public ResponseEntity<Car> findById(@PathVariable long id) {
		Optional<Car> optionalCar = this.carService.findById(id);
		if(optionalCar.isPresent()) {
			return ResponseEntity.ok(optionalCar.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}

	@PutMapping("{id}")
	public ResponseEntity<Car> updateById(@PathVariable long id, @RequestBody Car source) {
		Optional<Car> optionalCar = this.carService.findById(id);
		if(optionalCar.isPresent()) {
			Car target = optionalCar.get();
			target.setBrand(source.getBrand());
			target.setLicensePlate(source.getLicensePlate());
			target.setMileage(source.getMileage());

			return ResponseEntity.ok(this.carService.save(target));
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("{id}")
	public ResponseEntity<Void> deleteById(@PathVariable long id) {
		Optional<Car> optionalCar = this.carService.findById(id);
		if(optionalCar.isPresent()) {
			this.carService.deleteById(id);

			return ResponseEntity.noContent().build();
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
}
