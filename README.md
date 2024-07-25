# SvelteKit Auth Example

![image](https://user-images.githubusercontent.com/157695/190524032-cc22bf37-de46-4d9b-aa05-1c2ef7fca60f.png)


## Setup

```shell
npm install
```

## Development

```shell
npm run dev

# Run with debug logging:
DEBUG="app:*" npm run dev
```

To debug in the browser, open up the `Console` in DevTools and type:

```js
localStorage.debug = "app:*";
```

### Using auth adapters

This project is built in a way to abstract the authentication layer so that you can pick and choose which type of auth you want to use.

Right now, we support the following auth adapters:

- `cookie` - Stores users and the auth token in a cookie. The is purely for demo purposes as it means we don't need any backend. You should NOT use this in production.

## License

MIT

## Credits

Copyright Dana Woodman 2022
