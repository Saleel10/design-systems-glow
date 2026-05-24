import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import https from "https";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      {
        name: "api-middleware",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url?.startsWith("/api/send-email")) {
              if (req.method !== "POST") {
                res.statusCode = 405;
                res.end(JSON.stringify({ error: "Method not allowed" }));
                return;
              }

              let body = "";
              req.on("data", (chunk) => {
                body += chunk;
              });

              req.on("end", async () => {
                try {
                  const { name, email, subject, message } = JSON.parse(body);

                  if (!name || !email || !subject || !message) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: "Missing required fields" }));
                    return;
                  }

                  const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
                  if (!apiKey || apiKey === "re_your_api_key_here") {
                    console.warn("[Vite API Mock] RESEND_API_KEY is not configured in .env. Simulating mock success response...");
                    setTimeout(() => {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.end(JSON.stringify({ success: true, mock: true }));
                    }, 1000);
                    return;
                  }

                  const responseBody = await new Promise<string>((resolve, reject) => {
                    const reqOpts = {
                      hostname: "api.resend.com",
                      path: "/emails",
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`,
                      },
                    };

                    const emailReq = https.request(reqOpts, (emailRes) => {
                      let data = "";
                      emailRes.on("data", (chunk) => {
                        data += chunk;
                      });
                      emailRes.on("end", () => {
                        if (emailRes.statusCode && emailRes.statusCode >= 200 && emailRes.statusCode < 300) {
                          resolve(data);
                        } else {
                          reject(new Error(`Status: ${emailRes.statusCode} - ${data}`));
                        }
                      });
                    });

                    emailReq.on("error", (err) => {
                      reject(err);
                    });

                    emailReq.write(
                      JSON.stringify({
                        from: "Contact Form <onboarding@resend.dev>",
                        to: "workwithsaleel@gmail.com",
                        subject: `Contact Form: ${subject}`,
                        html: `
                          <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #6366f1; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                            <p><strong>Subject:</strong> ${subject}</p>
                            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; border-left: 4px solid #6366f1;">
                              <p style="margin: 0; white-space: pre-wrap;"><strong>Message:</strong><br/>${message}</p>
                            </div>
                          </div>
                        `,
                      })
                    );
                    emailReq.end();
                  });

                  const parsedData = JSON.parse(responseBody);
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ success: true, data: parsedData }));
                } catch (err: any) {
                  console.error("Vite Dev Server API proxy error:", err.message);
                  res.statusCode = 500;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: err.message || "Internal server error" }));
                }
              });
              return;
            }
            next();
          });
        },
      },
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
