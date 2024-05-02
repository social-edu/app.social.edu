# shinier-gold

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# variáveis de ambiente

```
$env:NODE_ENV="development"; npm run serve # ou NODE_ENV=development seguido do run
```

# Deploy configuration

cd /var/www/ema
sudo su
cd web/
rm -f -R css/ fonts/ js/ img/ index.html logo-ema.png
cd ..
mv /home/ubuntu/temp_frontend_ema/*/var/www/ema/web/
chown www-data:www-data /var/www/ema/web/*
ls -la web/
