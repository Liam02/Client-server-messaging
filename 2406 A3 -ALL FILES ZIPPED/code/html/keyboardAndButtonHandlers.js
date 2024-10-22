//KEY CODES
const ENTER = 13
const RIGHT_ARROW = 39
const LEFT_ARROW = 37
const UP_ARROW = 38
const DOWN_ARROW = 40


function handleKeyDown(e) {

  let keyCode = e.which
  if (keyCode == UP_ARROW | keyCode == DOWN_ARROW) {
    //prevent browser from using these with text input drop downs
    e.stopPropagation()
    e.preventDefault()
  }
}

function handleKeyUp(e) {

  if (e.which == ENTER) {
    handleSendButton() //treat ENTER key like you would a submit
    document.getElementById('userTextFieldSend').value = ''
  }
  e.stopPropagation()
  e.preventDefault()
}

let connected = false;
var valid_username;

function handleConnectButton(){

  let userText = document.getElementById('userTextFieldConnect').value

  //if (userText[0] != [a-zA-Z]){
    if (!/^[a-zA-Z]/.test(userText)){
    let textDiv = document.getElementById("text-areaConnect")
    textDiv.innerHTML = 'The following input is not a valid username since it does not start with a letter';
	  textDiv.innerHTML = textDiv.innerHTML + `<span class="own_message"> ${userText}</span>`
  }
  else{
    let check_for_extra_character = false;
    for(let i = 1; i<userText.length; ++i){
      //if(userText[i] != [a-zA-Z0-9]){
      if(!/[a-zA-Z0-9]/.test(userText[i])){
        check_for_extra_character = true;
        break;
      }
    }
    if(check_for_extra_character==true){
      let textDiv = document.getElementById("text-areaConnect")
      textDiv.innerHTML = 'The following input is not a valid username since it uses one or more characters other than numbers and letters';
	    textDiv.innerHTML = textDiv.innerHTML + `<span class="own_message"> ${userText}</span>`
    }

    else{
      connected = true;
      valid_username = userText;
      joinChat(valid_username);
      console.log(valid_username + " has successfuly connected");
      //if (userText && userText != '') {
      let textDiv = document.getElementById("text-areaConnect")
      textDiv.innerHTML = 'Success your username is: ';
      textDiv.innerHTML = textDiv.innerHTML + `<span class="own_message"> ${userText}</span>`

      let userRequestObj = {text: userText}
      let userRequestJSON = JSON.stringify(userRequestObj)
      document.getElementById('userTextFieldConnect').value = ''

      let xhttp = new XMLHttpRequest()
      
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        }
      }
      xhttp.open("POST", "userText") //API .open(METHOD, URL)
      xhttp.send(userRequestJSON) //API .send(BODY)
    }
  }
}

function handleSendButton(){
  if (connected == false){
    let textDiv = document.getElementById("text-areaSend")
    textDiv.innerHTML = 'You must enter a valid username before being able to send messages';
  }
  else{
    let userText = valid_username+": "+document.getElementById('userTextFieldSend').value
    sendMessage(userText);
    socket.emit('Message', Message);
    document.getElementById('userTextFieldSend').value = '';
  }
}

function handleClearButton(){
  clearMessages();
}
