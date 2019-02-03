// Create Socket Instance
const socket = io.connect("http://localhost:9000");

//Get Reference of DOM Elements
const output = document.getElementById('output');
const handle = document.getElementById('handle');
const message = document.getElementById('message');
const submit = document.getElementById('submitBtn');
const feedback = document.getElementById('feedback');
//Emit chat message to be read by server
submit.addEventListener('click', ()=>{
    socket.emit('chat', {
        message : message.value,
        handle : handle.value
    })
    /*
    *   Clear Message Body After sending
    */
    message.value = '';
    /*
    *   If handler name is present, make it non-editable
    */
    if(handle.value)
        handle.disabled = true;
})
//Emit a typing event to server
message.addEventListener('keypress', ()=>{
    socket.emit('typing', handle.value);
})
// Listen to server for messages and display in chat window
socket.on('chat', (data)=>{
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
})
//Listen to the server for typing event & dispay in UI
socket.on('typing', (handler)=>{
    if(!handler)
        handler ='Someone';

    feedback.innerHTML = `<p><em>${handler} is typing...</em></p>`;
})