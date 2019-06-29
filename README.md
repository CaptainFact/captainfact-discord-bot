<p align="center"><img src="https://raw.githubusercontent.com/CaptainFact/captain-fact-frontend/staging/app/static/assets/img/logo.png" height="100"/></p>
<h1 align="center"><a href="https://captainfact.io">CaptainFact.io</a></h1>
<p align="center"><a href="https://discord.gg/2Qd7hMz" title="Discord"><img src="https://discordapp.com/api/guilds/416782744748687361/widget.png" alt="Discord"></a>
<a href="https://twitter.com/CaptainFact_io" title="Twitter"><img src="https://img.shields.io/twitter/follow/CaptainFact_io.svg?style=social&label=Follow"></a>
<a href="https://opencollective.com/captainfact_io" title="Backers on Open Collective"><img src="https://opencollective.com/captainfact_io/backers/badge.svg"></a>
<a href="./LICENSE"><img src="https://img.shields.io/github/license/CaptainFact/captain-fact-frontend.svg" alt="AGPL3"></a>
</p>
<hr/>
<p align="center">
<a href="https://opencollective.com/captainfact_io/donate" target="_blank">
  <img src="https://opencollective.com/captainfact_io/donate/button@2x.png?color=white" width=300 />
</a>
</p>
<hr/>

> The purpose of this bot is to welcome new users on Discord.
> We may also implement userful commands in the future to interact with it.

## Usage

Use `!CF help` in production or `!CFD help` in development to see a list of
available commands.

## Dev

You must create a `.env` file at the root with the following content:

```env
DISCORD_BOT_TOKEN=YOUR-DISCORD-BOT-TOKEN
NODE_ENV=development
PREFIX=!CFD
```

Then run:

```bash
npm install
npm run dev
```

## Deploy

Zeit Now is used to deploy this bot. Use the `./deploy.sh` script to do so as
it will automatically shut down old deployment(s) when it succeeds.
