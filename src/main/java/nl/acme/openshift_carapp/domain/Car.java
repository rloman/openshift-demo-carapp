package nl.acme.openshift_carapp.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
public class Car implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String brand;
	private String licensePlate;
	private int mileage;


	public long getId(){ 
		return this.id;
	}

	public void setId(long id){ 
		this.id=id;
	}

	public String getBrand(){ 
		return this.brand;
	}

	public void setBrand(String brand){ 
		this.brand=brand;
	}

	public String getLicensePlate(){ 
		return this.licensePlate;
	}

	public void setLicensePlate(String licensePlate){ 
		this.licensePlate=licensePlate;
	}

	public int getMileage(){ 
		return this.mileage;
	}

	public void setMileage(int mileage){ 
		this.mileage=mileage;
	}

}
