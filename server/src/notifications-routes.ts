import WebPush from "web-push";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const publicKey =
  "BHALOJLinePp33_OYzlcgFahsJH7Bs2tOpcY0r058kvit9WYY1nNuRRkvWU44JE8NGjx44kSgPYFB-96vJJrXNs";
const privateKey = "4F_RQC1_niVSgK43sYcJ8TS5I0QVj-P9nywwVCs9QwU";

WebPush.setVapidDetails("http://localhost:3333", publicKey, privateKey);

export async function notificationsRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return {
      publicKey,
    };
  });

  app.post("/push/register", (request, response) => {
    return response.status(201).send();
  });

  app.post("/push/send", (request, response) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(request.body);

    setTimeout(() => {
      WebPush.sendNotification(subscription, "Comunicação com o backend");
    }, 5000);

    return response.status(201).send();
  });
}
