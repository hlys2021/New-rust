const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Event } = require('@polkadot/types');

async function subscribeToEvent () {
  // 创建一个 WebSocket 提供程序
  const provider = new WsProvider('wss://rpc.polkadot.io');

  // 创建一个 API 实例
  const api = await ApiPromise.create({ provider });

  // 订阅事件
  api.query.system.events((events) => {
    events.forEach((record) => {
      const { event, phase } = record;

      // 检查事件是否为 ExtrinsicSuccess 事件
      if (event.section === 'system' && event.method === 'ExtrinsicSuccess') {
        // 解析事件数据
        const eventData = event.data[0] instanceof Event ? event.data[0].toHuman() : event.data[0];

        // 打印事件数据
        console.log(`\n${event.section}.${event.method}:\n`, eventData);
      }
    });
  });
}

subscribeToEvent();
