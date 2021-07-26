const userRedis = require('../db/redis/redis');
class userService {
    async storeUserId (userSessionId, userId) {
        await userRedis.storeUserId(userSessionId, userId)
    }
    async getUserIdFromSessionId (sessionId) {
       return await userRedis.getUserIdFromUserSessionId(sessionId);
        
    }
    async resetUserLoginTime (sessionId) {
        await userRedis.resetUserLoginTime(sessionId);
    }
    async cleanUserInfo (sessionId) {
        await userRedis.removeUserSessionId(sessionId)
    }
}
modules.exports = new userService()