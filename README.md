### Betnomi frontend

This is a betnomi app frontend, made in react, using redux and redux-saga.

#### How to start

```bash
# install dependencies
yarn

# start dev server
yarn start:client

# run storybook to view components
yarn storybook
```

#### Project structure

Project separated into packages: `client` and `lib`. Lib is for common components, that's
not depend on `client`. We will use them in admin someday.

- `components` - contains react components. They can't have own state and business logic. Should be developed in storybook.
- `containers` - containers use components, adding business logic for them
- `store` - all data and global business logic placed here. Separate folder for each reducer
- `utils` - common functions for project
- `hooks` - common business logic, that can be reused between containers.
- `hooks/formik` - form hooks, used to manage form states

#### Configuring project

See `/packages/client/.env` file for configuration:

```dotenv
# Websocket url for chats
REACT_APP_WEBSOCKET_URL=wss://centrifugo.betnomi.me/connection/websocket
# Backend URL
REACT_APP_API_URL=https://envoy.betnomi.me/
# Betconstruct api (now used as CMS for games list)
REACT_APP_BETCONSTRUCT_API_URL=https://www.cmsbetconstruct.com/
# Telegram bot for login
REACT_APP_TELEGRAM_LOGIN_BOT=SFXDX_login_bot
# Terms and conditions URL
REACT_APP_TERMS_URL=/#
```
