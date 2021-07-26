/**
 *redis 的使用场景
        1： 验证码处理逻辑
        2： 用户信息的查询
  怎样才能启动Redis服务器

        1： 本地安装Redis
        2： 安装Redis cli
        3： npm ioredis
 */

const redius = require('ioredis');
const rediusKeyUserPrefix = 'myRedis:info:user:';

class UserRedis {
    getRediusConnection () {
        return new redius({
            port: 6379,
            host:'localhost'
        })
    }
    async storeUserId (userSessionId, userId) {
        const redis = this.getRediusConnection();
        redis.set(rediusKeyUserPrefix + userSessionId, userId, 'ex', 1800, (error, result) => {
            redis.quit();
        })
    }
    async getUserIdFromUserSessionId (userSessionId) {
        const redis = this.getRediusConnection();
         return redis.get(rediusKeyUserPrefix + userSessionId, (err, result) => {
             redis.quit();
             return result
        })
    }
    async resetUserLoginTime (userSessionId) {
        const redius = this.getRediusConnection();
        redis.expire(rediusKeyUserPrefix + userSessionId, (err, result) => {
            redis.quit();
        })
    }
    async cleanUserInfo (userSessionId) {
        const redis = this.getRediusConnection();
        redis.del(rediusKeyUserPrefix + userSessionId, (err, result) => {
            redis.quit();
        })
    }
}
module.exports = new UserRedis();