var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        var isInit = true;
        isBreak = false;
        switch(cmd) {
            // !begin
            case 'begin':
                isInit = false;
                var pomcount = 0;
                var i = 1;
                function counterFun(){
                    setTimeout(function(){
                        bot.sendMessage({
                            to: channelID,
                            message: `Session complete! @here`

                        });
                        isBreak = true;
                    }, 1500000)
                    setInterval(function(){
                        timeRemaining = 1500000 - i * 1000;
                        cleanTimeRemaining = (timeRemaining / 60000);
                        cleanTimeRemaining = Math.round(cleanTimeRemaining) + " working";
                        i++;
                    }, 1000)
                    
                    /*while(n != n2){
                        pomcount = pomcount + 1;
                        bot.sendMessage({
                            to: channelID,
                            message: pomcount
                        });
                    }*/
                }
                bot.sendMessage({
                    to: channelID,
                    message: "25 minute work session started!"
                });
                bot.sendMessage({
                    to: channelID,
                    message: isInit
                });
                /*pomcount = 1;
                bot.sendMessage({
                     to: channelID,
                     message: "Started counting! Pom count = " + pomcount + "."
                });*/
                counterFun()
            break;
            // !raid
            case 'gettime':
                bot.sendMessage({
                    to: channelID,
                    message: timeRemaining / 60000 + " and " + cleanTimeRemaining
                });
            break;
            case 'help':
            bot.sendMessage({
                to: channelID,
                message: `**COMMANDS:**
Timer:
    *!raid* - Gets the cuckoo link and shows time remaining.
    *!begin* - Starts a session manually so the time remaining can be displayed here. Can also be used as reset or restart timer after break ends.

Maintenance:
    *!gettime* - Gets the raw time data`
            });
            break;
            case 'raid':
            if(!isBreak){
                bot.sendMessage({
                    to: channelID,
                    message: `**RAAAAAAAAAAAID!**  
                    
@here  

Approx. ` + cleanTimeRemaining + ` minutes remaining!

:crossed_swords: http://cuckoo.team/koa/ :crossed_swords:  

**Before you Join, Please review the rules!**  

:point_right: https://goo.gl/HAED66 :point_left:`
                }); 
            }else{
                bot.sendMessage({
                    to: channelID,
                    message: `**RAAAAAAAAAAAID!**  
                    
@here  

Break time! Make sure to start the next session manually with the begin command!

:crossed_swords: http://cuckoo.team/koa/ :crossed_swords:  

**Before you Join, Please review the rules!**  

:point_right: https://goo.gl/HAED66 :point_left:`
                });
            }
                
            break;
         }
     }
});