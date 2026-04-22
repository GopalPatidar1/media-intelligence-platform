import amqp from 'amqplib';
import config from '../config';

const RABBITMQ_USER = 'admin';
const RABBITMQ_PASS = 'Mq@321$#@';
const RABBIT_URL = `amqp://${RABBITMQ_USER}:${encodeURIComponent(RABBITMQ_PASS!)}@rabbitmq:5672`;
const EXCHANGE = 'asset.exchange';

// COMMON CONNECTIONS
let connection: amqp.Connection;
let aiChannel: amqp.Channel;
let approvalChannel: amqp.Channel;

// INIT CONNECTION
const initRabbit = async () => {
  connection = await amqp.connect(RABBIT_URL);

  aiChannel = await connection.createChannel();
  approvalChannel = await connection.createChannel();

  await aiChannel.assertExchange(EXCHANGE, 'topic', { durable: true });
};

// AI WORKER
const startAIWorker = async () => {
  const { Files } = config.sequelize.models;

  const q = await aiChannel.assertQueue('ai.queue', { durable: true });

  await aiChannel.bindQueue(q.queue, EXCHANGE, 'asset.uploaded');

  aiChannel.prefetch(5);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  aiChannel.consume(q.queue, async (msg: any) => {
    if (!msg) return;

    const asset = JSON.parse(msg.content.toString());

    // fake AI processing
    const analysis = {
      tags: ['image', 'product'],
      nsfw: false,
      duplicateScore: Math.random(),
      confidence: 0.9,
    };

    await Files.update({ status: 'ai_done' }, { where: { uid: asset.id } });

    // publish AI result
    aiChannel.publish(
      EXCHANGE,
      'asset.ai.done',
      Buffer.from(
        JSON.stringify({
          assetId: asset.id,
          analysis,
        })
      )
    );

    aiChannel.ack(msg);
  });
};

// APPROVAL WORKER
const startApprovalWorker = async () => {
  const { Files } = config.sequelize.models;
  const q = await approvalChannel.assertQueue('approval.queue', {
    durable: true,
  });
  await approvalChannel.bindQueue(q.queue, EXCHANGE, 'asset.ai.done');

  approvalChannel.prefetch(5);

  approvalChannel.consume(q.queue, async (msg: any) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());
    const analysis = data.analysis;

    let status = 'approved';

    if (analysis.nsfw || analysis.duplicateScore > 0.8) {
      status = 'rejected';
    }

    await Files.update({ status }, { where: { uid: data.assetId } });

    approvalChannel.ack(msg);
  });
};

// START SYSTEM (UPLOAD TRIGGER)
export const startSystem = async (asset: any) => {
  await aiChannel.assertExchange(EXCHANGE, 'topic', { durable: true });

  aiChannel.publish(
    EXCHANGE,
    'asset.uploaded',
    Buffer.from(JSON.stringify(asset))
  );
};

// BOOTSTRAP (RUN ON SERVER START)
export const bootstrapRabbit = async () => {
  await initRabbit();
  await startAIWorker();
  await startApprovalWorker();
};
