function addNote(url, note) {
  var noteObjects = getNotes(url);
  noteObjects.push(note);
  saveNotes(url, noteObjects);
}

function getNotes(url){

  if (localStorage[url] == null){
    return []
  } else {
    var retrievedObject = localStorage.getItem(url)
    return JSON.parse(retrievedObject)
  }
}

function saveNotes(url, notes) {
  localStorage[url] = JSON.stringify(notes)
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if (message.method === "add note"){
    addNote(message.url, message.note)
  }
  sendResponse(getNotes(message.url))
})
