import mineflayer from 'mineflayer';
import prismarine from 'prismarine-viewer';

const bot = mineflayer.createBot({
    version: "1.20.1",
    username: "Albatross_",
    auth: "microsoft",
    host: "play.wildwoodsmp.com",
})

bot.once('spawn', () => {
    prismarine.mineflayer(bot, {port: 8080})
    bot.chat('/server smp')
})

var lastSpawn = null
var spawns = 0
var totalElapsed = 0;

bot.on('entitySpawn', (entity) => {
    if (entity.name === 'iron_golem') {
        const now = new Date()
        var elapsed = 0;
        if (lastSpawn) {
            elapsed = (now - lastSpawn) / 1000;
        }
        lastSpawn = now
        console.log(`${now.toUTCString()}: Iron golem spawned. Time since last spawn: ${Math.round(elapsed)}s`)
        totalElapsed += elapsed
        spawns++

        console.log(`Average spawn period: ${totalElapsed / spawns}s`)
    } 
})

setInterval(() => {
    bot.swingArm()
}, 5000)

setInterval(() => {
    console.log(`Server time: ${bot.time.timeOfDay}`)
}, 5000)