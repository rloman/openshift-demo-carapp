package nl.acme.openshift_carapp.persistence;

import nl.acme.openshift_carapp.domain.Car;
import org.springframework.data.repository.CrudRepository;

public interface CarRepository extends CrudRepository<Car, Long> {

}
