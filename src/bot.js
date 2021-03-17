require('dotenv').config();
const { Client, MessageAttachment, MessageEmbed, DiscordAPIError } = require('discord.js');
const client = new Client();
const PREFIX = '$';
const api = require('./api') //Grabs api from api.js

console.log('Starting bot...')

client.login(process.env.GLANCE_BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});

//Array for all cryptos
//available_cryptos = ['btc', 'eth', 'aave']
const available_cryptos = {
    btc: 'Bitcoin',
    eth: 'Ethereum',
    xrp: 'Ripple',
    bch: 'Bitcoin Cash',
    ada: 'Cardano',
    ltc: 'Lightcoin',
    xlm: 'Stellar Lumens',
    dot: 'Polkadot',
    uni: 'Uniswap',
    link: 'Chainlink',
    doge: 'Dogecoin',
    xem: 'NEM',
    wbtc: 'Wrapped Bitcoin',
    aave: 'AAVE',
    theta: 'THETA',
    atom: 'Cosmos',
    xmr: 'Monero',
    grt: 'The Graph',
    lrc: 'Loopring',
    nu: 'NuCypher',
    eos: 'EOS',
    vet: 'VeChain',
    mkr: 'Maker'
}



client.on('message', (message) => {
    console.log(`[${message.author.username}] ${message.content}`);
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        if (CMD_NAME === 'list') {
            const embedcrypto = new MessageEmbed()
                .setTitle('Cryptos Available')
                .setDescription(`
                btc: Bitcoin
                eth: Ethereum
                xrp: Ripple
                bch: Bitcoin Cash
                ada: Cardano
                ltc: Lightcoin
                xlm: Stellar Lumens
                dot: Polkadot
                uni: Uniswap
                link: Chainlink
                doge: Dogecoin
                xem: NEM
                wbtc: Wrapped Bitcoin
                aave: AAVE
                theta: THETA
                atom: Cosmos
                xmr: Monero
                grt: The Graph
                lrc: Loopring
                nu: NuCypher
                eos: EOS
                vet: VeChain
                mkr: Maker 
                `)
            message.channel.send(embedcrypto)
        }
        if (CMD_NAME in available_cryptos) {
            api.callAPI('USD', CMD_NAME).then(result => {
                const embedcrypto = new MessageEmbed()
                    .setTitle(available_cryptos[CMD_NAME])
                    .setURL(`https://coinmarketcap.com/currencies/${available_cryptos[CMD_NAME]}/`)
                    .setDescription(`$${result}`)
                    .setThumbnail(`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@9ab8d6934b83a4aa8ae5e8711609a70ca0ab1b2b/128/white/${CMD_NAME}.png`);
                message.channel.send(embedcrypto)
            });
        }
    }
});

