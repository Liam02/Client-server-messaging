
let Message = '';
var sent = false;
var socket;
var username;

function sendMessage(m){
  Message = m;
  sent = true;
}

function joinChat(valid_username){
  socket = io('http://' + window.document.location.host);
  username = valid_username;

  socket.on('Message', function(Message) {
    //console.log(" has successfuly connected");
    console.log("data: " + Message)
    console.log("typeof: " + typeof Message)
    let textDiv = document.getElementById("text-areaSend");

    let isPrivateMessage = false;
    //If this client is the sender
    if (sent == true){
      for (let i=username.length+2; i<Message.length; ++i){
        if (Message[i]==":"){
          isPrivateMessage = true;
          break;
        }
        // if (Message[i]==" "){
        //   break;
        // }
      }
      if (isPrivateMessage == true){
        textDiv.innerHTML = textDiv.innerHTML + `<br><span class="private_message"> ${Message}</span>`;
        isPrivateMessage = false;
      }
      else{
        textDiv.innerHTML = textDiv.innerHTML + `<br><span class="own_message"> ${Message}</span>`;
      }
      sent = false;
    }

    //If this client is the receiver
    else{
      let checkForSpace = false;
      //Check if the message could be private
      for (let i=0; i<Message.length; ++i){
        
        if(Message[i]==":" && checkForSpace == true){
          isPrivateMessage = true;
          break;
        }
        // if(Message[i]==" " && checkForSpace == true){
        //   break;
        // }
        if(Message[i]==" "){
          checkForSpace = true;
        }
      }
      checkForSpace = false;
      //if the message is private, check if the message belongs to this client
      if(isPrivateMessage == true){
        let username_check = 0;
        let usernameIndex = 0;
        for (let i=0; i<Message.length; ++i){
          if(Message[i]==":" && checkForSpace == true){
            isPrivateMessage = false;
            break;
          }
          if(Message[i]==username[usernameIndex] && checkForSpace == true){
            ++usernameIndex;
            ++username_check;
            if(username_check==username.length){
              break;
            }
          }
          else{
            username_check = 0;
            usernameIndex = 0;
          }
          if (Message[i]==" "){
            checkForSpace = true;
          }
        }
        //if the message does belong to this client we can output it to the html of the client
        if(isPrivateMessage == true){
          textDiv.innerHTML = textDiv.innerHTML + "   " + `<br><span class="private_message"> ${Message}</span>`;
          isPrivateMessage = false;
        }
      }
      else{
        textDiv.innerHTML = textDiv.innerHTML + "   " + `<br><span class="public_message"> ${Message}</span>`;
      }
    }
  })
}

function clearMessages(){
  let textDiv = document.getElementById("text-areaSend");
  textDiv.innerHTML = '';
  Message = '';
}
