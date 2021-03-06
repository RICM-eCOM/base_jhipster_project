#!/usr/bin/env bash
# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

configure_aws_cli(){
	aws --version
	aws configure set default.region eu-central-1
	aws configure set default.output json
}

deploy_cluster() {

    family="MesCourses-microservice2"
    cluster="arn:aws:ecs:eu-central-1:142221551378:cluster/test3"
    service="MesCourses-microservice2"

    make_task_def
    register_definition
   if [[ $(aws ecs update-service --cluster $cluster --service $service --task-definition $revision | \
                  $JQ '.service.taskDefinition') != $revision ]]; then
       echo "Error updating service."
       return 1
   fi


   echo "Service update "${service}"successful."
   return 0
}

make_task_def(){
	task_template='[
    {
            "entryPoint": [],
            "portMappings": [
                {
                    "hostPort": 8080,
                    "protocol": "tcp",
                    "containerPort": 8080
                }
            ],
            "command": [],

            "cpu": 0,
            "environment": [
                {
                    "name": "EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE",
                    "value": "http://admin:$${jhipster.registry.password}@jhipster-registry:8761/eureka"
                },
                {
                    "name": "JHIPSTER_REGISTRY_PASSWORD",
                    "value": "%s"
                },
                {
                    "name": "JHIPSTER_SLEEP",
                    "value": "20"
                },
                {
                    "name": "SPRING_CLOUD_CONFIG_URI",
                    "value": "http://admin:$${jhipster.registry.password}@jhipster-registry:8761/config"
                },
                {
                    "name": "SPRING_DATASOURCE_URL",
                    "value": "jdbc:mysql://microservice2-mysql:3306/microservice2?useUnicode=true&characterEncoding=utf8&useSSL=false"
                },
                {
                    "name": "SPRING_PROFILES_ACTIVE",
                    "value": "prod,swagger"
                }
            ],
            "dnsServers": [],
            "dockerSecurityOptions": [],
            "memory": 950,
            "image": "142221551378.dkr.ecr.eu-central-1.amazonaws.com/microservice2",
            "essential": true,
            "links": [],
            "extraHosts": [
                {
                    "ipAddress": "10.0.0.20",
                    "hostname": "jhipster-registry"
                },
                {
                    "ipAddress": "10.0.0.41",
                    "hostname": "microservice2-mysql"
                }
            ],
            "readonlyRootFilesystem": false,
            "privileged": true,
            "name": "microservice2-app"
        }
]'



placementConstraints='
{
      "type": "memberOf",
      "expression": "attribute:Name=~Microservice2"
}'

	task_def=$(printf "$task_template" $JHIPSTER_REGISTRY_PASSWORD)
	echo task_def
}

push_ecr_image(){
	eval $(aws ecr get-login --no-include-email --region eu-central-1)
	docker tag microservice2:latest 142221551378.dkr.ecr.eu-central-1.amazonaws.com/microservice2:latest
	docker push 142221551378.dkr.ecr.eu-central-1.amazonaws.com/microservice2:latest
}

register_definition() {

    if revision=$(aws ecs register-task-definition --family $family --container-definitions "$task_template" --placement-constraints "$placementConstraints" | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Failed to register task definition"
        return 1
    fi

}

configure_aws_cli
push_ecr_image
deploy_cluster
