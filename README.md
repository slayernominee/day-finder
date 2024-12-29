# Day Finder

A simple calendar to find a day where everyone from your friend group has time

![showcase calendar](.showcase/c.webp "Showcase Calendar")
![showcase configuration](.showcase/b.webp "Showcase Configuration")

### Usage

#### Directly

```bash
npm install
npm run build
node .output/server/index.mjs
```

#### Docker

```bash
./docker_run.sh
```

or with compose

```bash
docker build -t day-finder .
docker-compose up -d
```

if you want you can use sth like nginx proxy manager as a reverse proxy to get it behind a domain and with ssl

#### Attention

data is saved only in memory and will on restart be lost, but that is wanted to keep it minimal and simple
