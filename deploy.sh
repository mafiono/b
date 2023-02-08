
set -xeu

npm install
npm run build:client
scp -i  ./betnomi_private_key.pem  -r ./packages/client/build/* root@3.139.104.166:/var/www/html/betnomi-frontend/client/build