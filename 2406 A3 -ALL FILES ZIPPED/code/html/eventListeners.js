document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('connect_as').addEventListener('click', handleConnectButton);
  document.getElementById('send_button').addEventListener('click', handleSendButton);
  document.getElementById('clear_button').addEventListener('click', handleClearButton);

  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
})
