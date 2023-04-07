import redis from "redis";
import { promisify } from 'util';

class RedisClient{
    constructor() {
        this.myClient = redis.createClient();
        this.myClient.on('error', (error) => console.log(error));
    }

    isAlive() {
        return this.myClient.connected;
    }

    async get(key) {
        const asyncGet = promisify(this.myClient.GET).bind(this.myClient);
        return asyncGet(key);
    }

    async set(key, val, time) {
        const setAsync = promisify(this.myClient.SET).bind(this.myClient);
        return setAsync(key, val, 'EX', time);
    }

    async del(key) {
        const asyncDel = promisify(this.myClient.DEL).bind(this.myClient);
        return asyncDel(key);
    }
}

const redisClient = new RedisClient();
export default redisClient;