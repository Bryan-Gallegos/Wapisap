const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const express = require("express");
const axios = require("axios");
const qrcode = require("qrcode-terminal");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let sock;

const connectToWhatsApp = async () => {
    const { state, saveCreds } = await useMultiFileAuthState("baileys_auth");

    sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "open") {
            console.log("✅ Conectado a WhatsApp");
        } else if (connection === "close") {
            console.log("⚠️ Conexión cerrada, intentando reconectar...");
            connectToWhatsApp();
        }
    });

    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        if (!msg.key.fromMe) {  // Evita procesar los mensajes enviados por el bot
            console.log(`📩 Nuevo mensaje de ${msg.key.remoteJid}: ${msg.message.conversation}`);
    
            // Obtener el número del bot (el número vinculado con Baileys)
            const botNumber = sock.user.id.split(":")[0] + "@s.whatsapp.net";
    
            try {
                // Guardar el mensaje en Django con el número correcto en receiver
                await axios.post("http://localhost:8000/api/messages/", {
                    sender: msg.key.remoteJid,
                    receiver: botNumber,  // Ahora tomamos el número real del bot
                    message: msg.message.conversation,
                    message_type: "text",
                    status: "received"
                });
    
                console.log("✅ Mensaje guardado en Django correctamente");
            } catch (error) {
                console.error("❌ Error al enviar mensaje al backend:", error.message);
            }
        }
    });
};

// Endpoint para enviar mensajes desde Django
app.post("/send-message", async (req, res) => {
    const { number, message } = req.body;
    if (!sock) return res.status(500).json({ error: "No hay conexión con WhatsApp" });

    try {
        await sock.sendMessage(`${number}@s.whatsapp.net`, { text: message });
        res.json({ success: true, message: "Mensaje enviado con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al enviar el mensaje" });
    }
});

app.listen(3001, () => {
    console.log("🚀 Servidor de Baileys corriendo en http://localhost:3001");
    connectToWhatsApp();
});
