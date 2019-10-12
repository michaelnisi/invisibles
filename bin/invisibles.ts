#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { InvisiblesStack } from '../lib/invisibles-stack';

const app = new cdk.App();
new InvisiblesStack(app, 'InvisiblesStack');
