.PHONY: api all test
kubectl := minikube kubectl --

deploy:	api
	@$(kubectl) apply -f mysecret.yaml
	@$(kubectl) apply -f postgres-pv.yaml
	@$(kubectl) apply -f postgres-deployment.yaml
	@$(kubectl) apply -f openshift_carapp-app-deployment.yaml

api:
	@docker image build -t openshift_carapp_api:latest .
	@docker image tag openshift_carapp_api:latest rloman/openshift_carapp_api:latest
	@docker login
	@docker image push rloman/openshift_carapp_api:latest

openport:
	@$(kubectl) port-forward service/openshift_carapp 8081:8080 &

test:
	@watch -n 3 curl http://localhost:8081/api/cars

teardown:
	@killall kubectl
	@$(kubectl) delete deployment openshift_carapp
	@$(kubectl) delete deployment postgres
	@$(kubectl) delete pvc postgres-pv-claim
	@$(kubectl) delete pv postgres-pv-volume
	@$(kubectl) delete secret mysecret
	@docker container exec -it minikube docker volume rm postgres-data

delete_volume:
	echo Warning!!! If you invoke this the postgres-DB will be deleted !!! 'docker container exec -it minikube docker volume rm postgres-data'
