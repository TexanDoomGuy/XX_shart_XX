cd "~/Desktop/VS Shit/bots/The fuunyer JS"
clear
echo "Starting command reloads"

node deploy-commands.js
echo ""
echo "reload done"
echo ""
sleep 1
echo ""
echo "Running the bot"
echo ""
sleep 0.5
node index.js