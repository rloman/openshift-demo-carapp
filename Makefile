.PHONY: api all test
kubectl := minikube kubectl --

deploy:	api
	@$(kubectl) apply -f mysecret.yaml
	@$(kubectl) apply -f h2-pv.yaml
	@$(kubectl) apply -f h2-deployment.yaml
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
	@$(kubectl) delete deployment person
	@$(kubectl) delete deployment h2
	@$(kubectl) delete pvc h2-pv-claim
	@$(kubectl) delete pv h2-pv-volume
	@$(kubectl) delete secret mysecret
	@docker container exec -it minikube docker volume rm h2-data

delete_volume:
	echo Warning!!! If you invoke this the h2-DB will be deleted !!! 'docker container exec -it minikube docker volume rm h2-data'
