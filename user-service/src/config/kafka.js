import { config } from 'dotenv';
import { Kafka } from 'kafkajs';

config();
const kafkaBroker = process.env.KAFKA_BROKER;

const kafka = new Kafka({
	clientId: 'user-service',
	brokers: [kafkaBroker],
});

export const kafkConsumer = kafka.consumer({ groupId: 'user-service-group' });
