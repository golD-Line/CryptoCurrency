var Discord = require('discord.js')
var client = new Discord.Client()
const moment = require('moment')
const fetch = require('node-fetch')
const jsonfile = require('jsonfile')
const config = require("./settings.json")

const requestMap = () => config.currencies.map(currency => {
    const requestString = `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=${config.translatedInto.join(',')}`;
    return fetch(requestString);
});

client.on('message', msg => {
    if (msg.author.bot) return;
    if(msg.content.indexOf(config.prefix) !== 0) return;
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === "cc"){
      const translatedInto = config.translatedInto;
        Promise.all(requestMap())
        .then(e => Promise.all(e.map(single => single.json())))
        .then(e => {
            const resolvedCurrencies = e.map((single, index) => ({
                from: config.currencies[index],
                resp: single
            }))
            // ALRIGHT! Now it's gettin' tricky. Just leave everything below this point if you don't 100% know what you're doing.
            const firstExchange = "**" + resolvedCurrencies[0].resp[config.translatedInto[0]] + " " + config.translatedInto[0] + "** or **" + resolvedCurrencies[0].resp[config.translatedInto[1]] + " " + config.translatedInto[1] + "**"
            const secondExchange = "**" + resolvedCurrencies[1].resp[config.translatedInto[0]] + " " + config.translatedInto[0] + "** or **" + resolvedCurrencies[1].resp[config.translatedInto[1]] + " " + config.translatedInto[1] + "**"
            const thirdExchange = "**" + resolvedCurrencies[2].resp[config.translatedInto[0]] + " " + config.translatedInto[0] + "** or **" + resolvedCurrencies[2].resp[config.translatedInto[1]] + " " + config.translatedInto[1] + "**"
            const fourthExchange = "**" + resolvedCurrencies[3].resp[config.translatedInto[0]] + " " + config.translatedInto[0] + "** or **" + resolvedCurrencies[3].resp[config.translatedInto[1]] + " " + config.translatedInto[1] + "**"
            const fifthExchange = "**" + resolvedCurrencies[4].resp[config.translatedInto[0]] + " " + config.translatedInto[0] + "** or **" + resolvedCurrencies[4].resp[config.translatedInto[1]] + " " + config.translatedInto[1] + "**"
            const sixthExchange = "**" + resolvedCurrencies[5].resp[config.translatedInto[0]] + " " + config.translatedInto[0] + "** or **" + resolvedCurrencies[5].resp[config.translatedInto[1]] + " " + config.translatedInto[1] + "**"
            const seventhExchange = "**" + resolvedCurrencies[6].resp[config.translatedInto[0]] + " " + config.translatedInto[0] + "** or **" + resolvedCurrencies[6].resp[config.translatedInto[1]] + " " + config.translatedInto[1] + "**"
            const eighthExchange = "**" + resolvedCurrencies[7].resp[config.translatedInto[0]] + " " + config.translatedInto[0] + "** or **" + resolvedCurrencies[7].resp[config.translatedInto[1]] + " " + config.translatedInto[1] + "**"
            const ninthExchange = "**" + resolvedCurrencies[8].resp[config.translatedInto[0]] + " " + config.translatedInto[0] + "** or **" + resolvedCurrencies[8].resp[config.translatedInto[1]] + " " + config.translatedInto[1] + "**"

            let embed = {
                color: 0x7289DA,
                description: ":money_with_wings: __***Current Crypto Currency Exchange***__\n***Note**: Every data you see below is the exchange rate for **one coin** of each currency.*\n ",
                footer: {
                    text: `Last update: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`
                },
                fields: [{
                        name: ":chart_with_upwards_trend: __Bitcoin:__",
                        value: `Current exchange for ${resolvedCurrencies[0].from}\n` + firstExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __Ethereum:__",
                        value: `Current exchange for ${resolvedCurrencies[1].from}\n` + secondExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __Ripple:__",
                        value: `Current exchange for ${resolvedCurrencies[2].from}\n` + thirdExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __Litecoin:__",
                        value: `Current exchange for ${resolvedCurrencies[3].from}\n` + fourthExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __Dash:__",
                        value: `Current exchange for ${resolvedCurrencies[4].from}\n` + fifthExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __Ethereum Classic:__",
                        value: `Current exchange for ${resolvedCurrencies[5].from}\n` + sixthExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __Monero:__",
                        value: `Current exchange for ${resolvedCurrencies[6].from}\n` + seventhExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __MaidSafeCoin:__",
                        value: `Current exchange for ${resolvedCurrencies[7].from}\n` + eighthExchange,
                        inline: false
                    },
                    {
                        name: ":chart_with_upwards_trend: __Stratis:__",
                        value: `Current exchange for ${resolvedCurrencies[8].from}\n` + ninthExchange,
                        inline: false
                    },
                ],
            }
            console.log('Crypto Currency Stats requested.')
            msg.channel.send('', {
                embed
            })
        })
        .catch(error => {
            console.log(error);
        });
    }else if (command === "status") {
        if (checkArmed(config.armed, msg.author.id)){
        Promise.all(requestMap())
            .then(e => Promise.all(e.map(single => single.json())))
            .then(e => {
                const resolvedCurrencies = e.map((single, index) => ({
                    from: config.currencies[index],
                    resp: single
                }))
                let status = resolvedCurrencies[0].resp[config.translatedInto[0]] + config.translatedInto[0]

                msg.channel.send(`Bot up and running! :blush:`);
                msg.channel.send(`By the way, did you know that one Bitcoin is worth **` + status + `** right now? :fire:`)
            })
            .catch(error => {
                console.log(error);
            });
        }

    }else if (command === "say") {
        // makes the bot say something and delete the message. As an example, it's open to anyone to use.
        // To get the "message" itself we join the `args` back into a string with spaces:
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        msg.delete().catch(O_o=>{});
        // And we get the bot to say the thing:
        msg.channel.send(sayMessage);
    }
});

function checkArmed(arr, val) {
    return arr.some(arrVal => val === arrVal);
  }

// Every time "gameupdate()" is called, the bot will update its status and display the current Bitcoin exchange!

function gameupdate() {
    Promise.all(requestMap())
        .then(e => Promise.all(e.map(single => single.json())))
        .then(e => {
            const resolvedCurrencies = e.map((single, index) => ({
                from: config.currencies[index],
                resp: single
            }))
            const status = resolvedCurrencies[0].resp[config.translatedInto[0]] + config.translatedInto[0]//"â‚¬"
            client.user.setGame("BTC @ " + status);
        })
};





client.on('ready', function() {
    gameupdate(); // Sets the bot status
    console.log('|----------------------------------------------------|');
    console.log('|                                                    |');
    console.log('|   CryptoCurrency(-Bot) online and ready to use!    |');
    console.log('|         - Current Verison: 2.6 by 4dams -          |');
    console.log('|                Contact: 4dams#0001                 |');
    console.log('|           Revision by scott Green#8976             |');
    console.log('|        some code stolen from eslachance#4611       |');
    console.log('|                                                    |');
    console.log('|----------------------------------------------------|');
    setInterval(function() { // Starts the status autoupdate of the bot
        gameupdate();
    }, config.status_delay) // Searches for the delay of the autoupdate in the bot settings
    console.log('| Autoupdate requested.                             |');
    console.log('|----------------------------------------------------|')

});

client.login(config.token);
