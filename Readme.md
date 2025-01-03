 
## Get started

Prerequisites:
- Node.js >= 20.17.0

```bash
npm install http-server -g
http-server -o ./
```

or the alias using `npm run`:

```bash
npm install http-server -g
npm run start
```

Your web browser should open at [localhost:8080](http://localhost:8080) and display the game.

## Roadmap

- [x] Display tiles and buttons only when they are unlocked
- [ ] Improve display by block elements
- [ ] Add upgrades
- [ ] Add features


## Snippets

### Push source code on remote repository

```bash
git push origin main
```

or the alias using `npm run`:

```bash
npm run push
```

### Build and push container (static file server)

```bash
docker build -t idlestry-server .
docker tag idlestry-server:latest rg.fr-par.scw.cloud/idlestry/idlestry-server:latest
docker push rg.fr-par.scw.cloud/idlestry/idlestry-server:latest
scw container container deploy 43337443-67ec-4e4d-b997-83992c8d6dfc
```

or the alias using `npm run`:

```bash
npm run deploy
```

### Run container

```bash
docker run -p 8080:80 idlestry-server
```

where `8080` can be any port number you want to use on your local system. You should then be able to access game at [localhost:8080](http://localhost:8080)

### Connect to container registry

If credentials are already configured in Docker Desktop:
```bash
docker login rg.fr-par.scw.cloud/idlestry
```

If you are using an external container registry:
```bash
docker login rg.fr-par.scw.cloud/idlestry -u nologin --password-stdin <<< "$SCW_SECRET_KEY"
```
where `SCW_SECRET_KEY` is the environment variable storing your password to the container registry.