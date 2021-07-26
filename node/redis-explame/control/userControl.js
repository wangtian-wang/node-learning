const userService = require('../service/userService');
const uuid = require('uuid');
class UserControl {
    async userLogin (username, password) {
        const userId = username;
        const sessionId = uuid.v1();
        await userService(sessionId, userId);
    }
    async userLoginOut (sessionId) {
        await userService.cleanUserInfo(sessionId);
    }
    async userOprations (sessionId) {
        const userId = await userService.getUserIdFromSessionId(sessionId);
        await userService.resetUserLoginTime(sessionId)
    }
}
module.exports  = new UserControl()