import { createOpencode } from "@opencode-ai/sdk";
console.log("正在初始化 Opencode SDK...\n");
const { client, server } = await createOpencode();
console.log(`✓ 服务器已启动：${server.url}\n`);

console.log("正在创建 session...");
const session = await client.session.create({ body: {} });
console.log(`✓ Session ID: ${session.data.id}\n`);

console.log("正在发送请求...\n");
const result = await client.session.prompt({
	  path: { id: session.data.id },
	  body: { parts: [{ type: "text", text: "Hi" }] }
});

console.log("响应结果:");
console.log("====================");
console.log(result.data);
console.log("====================\n");

// 关键：先关闭 session
await client.session.delete({ path: { id: session.data.id } })
  .catch(() => {});

await server.close();
console.log("✓ 完成!");
process.exit(0);
