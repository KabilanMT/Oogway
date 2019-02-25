const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = "NTQ5MjEzMTU4MDk1NzE2MzUy.D1QqXw.Y5CSUlvK2XsJh76LnptQmO9oVmo";
var id = null;
var participants = {};
const channelID = "549221648780492821";

client.login(TOKEN);

client.on('message', function(message){
  if(message.content == "!roll"){
    rollWinner.winner();
  }
});

client.on("ready", function(){
  client.channels.get(channelID).send("Hello young one, my name is Oogway. I\'m here to make your lives easier. \n React to my message with a: \n:whale: if you\'ve participated in Whale Hunting,  \n:fish: if you\'ve participated in sea Monster Hunting \n:whale2: if you\'ve participated in Hunting Vell").then(sent =>{
    id = sent.id;
  })
})

client.on('raw', event => {
  const eventName = event.t;
  if(eventName === "MESSAGE_REACTION_ADD"){
    if(event.d.message_id === id)
    {
      var reactionChannel = client.channels.get(event.d.channel_id);
      if(reactionChannel.messages.has(event.d.message_id))
        return;
      else{
        reactionChannel.fetchMessage(event.d.message_id)
        .then(msg=>{
          var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
          var user = client.users.get(event.d.user_id);
          client.emit('messageReactionAdd', msgReaction, user);
        })
        .catch(err => console.log(err));
      }
    }
  }
  else if(eventName === "MESSAGE_REACTION_REMOVE"){
    if(event.d.message_id === id){
      var reactionChannel = client.channels.get(event.d.channel_id);
      if(reactionChannel.messages.has(event.d.message_id))
        return;
      else{
        reactionChannel.fetchMessage(event.d.message_id)
        .then(msg => {
          var msgReaction = msg.reaction.get(event.d.emoji.name + ":" + event.d.emoji.id);
          var user = client.users.get(event.d.user_id);
          client.emit('messageReactionRemove', msgReaction, user);
        })
        .catch(err => console.log(err));
      }
    }
  }
})

client.on('messageReactionAdd', (msgReaction, user) => {
    userid = user.id;
    if(participants[userid] == null){
      participants[userid] = [];
    }

    if(participants[userid][0] !== user.username){
        participants[userid][0] = [user.username];
    }

    if (msgReaction.emoji.name === '🐳') {
      if(!participants[userid].includes('🐳'))
      {
        participants[userid].push('🐳');
      }
    }

    else if (msgReaction.emoji.name === '🐋') {
      if(!participants[userid].includes('🐋'))
      {
        participants[userid].push('🐋');
      }
    }

    else if (msgReaction.emoji.name === '🐟') {
      if(!participants[userid].includes('🐟'))
      {
        participants[userid].push('🐟');
      }
    }
})

client.on('messageReactionRemove', (msgReaction, user) => {
  userid = user.id;
  if (msgReaction.emoji.name === '🐳') {
    if(participants[userid].includes('🐳'))
    {
      var index = participants[userid].indexOf('🐳');
      if (index !== -1) participants[userid].splice(index, 1);
    }
  }

  else if (msgReaction.emoji.name === '🐋') {
    if(participants[userid].includes('🐋'))
    {
      var index = participants[userid].indexOf('🐋');
      if (index !== -1) participants[userid].splice(index, 1);
    }
  }

  else if (msgReaction.emoji.name === '🐟') {
    if(participants[userid].includes('🐟'))
    {
      var index = participants[userid].indexOf('🐟');
      if (index !== -1) participants[userid].splice(index, 1);
    }
  }
});

var rollWinner = {
  winner: function() {
  possiblewinners = [];
  for (var key in participants){
    for(i = 1; i < participants[key].length; i++){
      possiblewinners.push(key);
    }
  }

  var winner = possiblewinners[Math.floor(Math.random() * possiblewinners.length)];

  client.channels.get(channelID).send("The hat has " + possiblewinners.length + " entrees");
  client.channels.get(channelID).send("You must believe!");
  performFunctionXAfterDelay();
  function performFunctionXAfterDelay() {
  // 1000 ms delay
  setTimeout(callWinner,1000)
  }

  function callWinner() {
    client.channels.get(channelID).send("The winner is... \n");
    client.channels.get(channelID).send("There are no coincidences in this world");
    client.channels.get(channelID).send(participants[winner][0]);
    setTimeout(cheerUp,500)
  }

  function cheerUp() {
    client.channels.get(channelID).send("Didn\'t win? That\'s okay. Don\'t dwell on the past, look towards the future.");
  }
}
};


//Quotes
//There are no coincidences in this world
//“You must believe!”
//“If you only do what you can do, you will never be more than you are now.”
//“Yesterday is history, tomorrow is a mystery, and today is a gift... that's why they call it present”

//1074211904
//549213158095716352
//https://discordapp.com/api/oauth2/authorize?client_id=549213158095716352&scope=bot&permissions=8
