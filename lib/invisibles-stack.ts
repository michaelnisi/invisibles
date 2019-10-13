import cdk = require('@aws-cdk/core')
import ecs = require("@aws-cdk/aws-ecs")
import ecsPatterns = require("@aws-cdk/aws-ecs-patterns")
import { Repository } from '@aws-cdk/aws-ecr'

function importMangerImage(scope: cdk.Construct): ecs.ContainerImage {
  return ecs.ContainerImage.fromEcrRepository(
    Repository.fromRepositoryName(scope, 'MangerRepo', 'manger'), 
    '0.1.0'
  )
}

function importFanboyImage(scope: cdk.Construct): ecs.ContainerImage {
  return ecs.ContainerImage.fromEcrRepository(
    Repository.fromRepositoryName(scope, 'FanboyRepo', 'fanboy'), 
    '0.1.0'
  )
}

export class InvisiblesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
      publicLoadBalancer: true,
      memoryLimitMiB: 1024,
      cpu: 512,
      taskImageOptions: {
        image: importMangerImage(this),
        containerPort: 3000
      }
    })
  }
}
