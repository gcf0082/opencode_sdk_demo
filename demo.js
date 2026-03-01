import { createOpencode } from "@opencode-ai/sdk";

console.log("正在初始化 Opencode SDK...\n");

const { client, server } = await createOpencode();

console.log(`✓ 服务器已启动：${server.url}\n`);

// 创建新 session
console.log("正在创建 session...");
const session = await client.session.create({
  body: {}
});
console.log(`✓ Session ID: ${session.data.id}\n`);

// 发送 prompt
console.log("正在发送请求...\n");

const result = await client.session.prompt({
  path: { id: session.data.id },
  body: {
    parts: [{ type: "text", text: "Hi" }]
  }
});

console.log("响应结果:");
console.log("====================");
console.log(result.data);
console.log("====================\n");

// 清理资源
await server.close();
console.log("✓ 完成!");
