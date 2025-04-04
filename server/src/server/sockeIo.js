const { Server } = require("socket.io");
const jwt = require('jsonwebtoken');
const { logerror } = require("../helpers/logger");

class WebSocketService {
    constructor() {
        this.io = null;
    }

    initializeWebSocket(server) {
        this.io = new Server(server, {
            cors: {
                origin: process.env.FRONTEND_URL || "http://localhost:3000",
                methods: ["GET", "POST"],
                credentials: true
            }
        });

        this.io.use((socket, next) => {
            try {
                const token = socket.handshake.auth.token;
                
                if (!token) {
                    return next(new Error('Authentication error: No token provided'));
                }
                
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                socket.user = decoded;
                
                socket.join(decoded.id.toString());
                
                next();
            } catch (error) {
                logerror.error(`Socket authentication error: ${error.message}`);
                next(new Error('Authentication error'));
            }
        });

        this.io.on("connection", (socket) => {
            const userId = socket.user?.id || 'anonymous';
            console.log(`New WebSocket connection: ${socket.id} for user ${userId}`);

            socket.on("disconnect", () => {
                console.log(`WebSocket disconnected: ${socket.id} for user ${userId}`);
            });
        });
    }

    getIo() {
        if (!this.io) {
            throw new Error("Socket.io is not initialized!");
        }
        return this.io;
    }

    // Method to emit profile update notifications
    emitProfileUpdate(userId, data) {
        if (!this.io) {
            throw new Error("Socket.io is not initialized!");
        }
        this.io.to(userId.toString()).emit('profile-updated', {
            message: 'Your profile has been updated',
            data: data,
            timestamp: new Date()
        });
    }
}

// Create singleton instance
const webSocketService = new WebSocketService();
module.exports = webSocketService;
