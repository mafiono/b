yarn fontello-cli install --config packages/libs/assets/fonts/fontello/config.json
find ./ -maxdepth 1 -name 'fontello-*' -exec mv {} fontello \;
rm -rf packages/libs/assets/fonts/fontello
mv fontello packages/libs/assets/fonts
rm .fontello-session
