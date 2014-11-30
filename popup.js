// Uses local storage to add a note
function storeToLocalStorage(note){
    localStorage.setItem(note.storageKey, JSON.stringify(note));
    PinPoint.NoteController.storeNote(note);
}

// Array of notes in string format
var notes = [];

// Array of note objects to pass to controller
var noteObjects = [];

// Parses all strigified objects into JSON objects
function parseLocalStorage(){
    for (i in notes) {
        var key = notes[i]
        var retrievedObject = localStorage.getItem(key);
        noteObjects.push(JSON.parse(retrievedObject));
    }
}

// Searches the keys in LocalStorage and returns an array of matches
function searchLocalStorage(url){
    var key = url + "/";
    for (i in localStorage) {
        if (i.match(/^\w+\:\/\/www.youtube.com\/watch\?v=.+\//) == key) {
            notes.push(i);
        }
    }
    parseLocalStorage();
}


var createButton = document.getElementById("create");
var form = document.getElementById("add-note");
createButton.addEventListener('click', function(){
  createButton.style.display = "none";
  form.style.display = "inline";
  chrome.runtime.getBackgroundPage(function(eventPage) {
    eventPage.getPageDetails(PinPoint.NoteController.getTime);
    });
});

// Event listener for the create note button
var saveButton = document.getElementById("save");
saveButton.addEventListener('click', function(){
  saveButton.style.display = "none";
  note = new PinPoint.Note();
  PinPoint.NoteController.run(note);
});

document.addEventListener('DOMContentLoaded', function(){
  var link = document.getElementById("time_link");
  console.log(link)

  link.addEventListener('click', function(){
    chrome.tabs.update(null, {url: "http://www.google.com"});
  });
});


window.addEventListener('load', function() {
  PinPoint.NoteController.getUrl();
  searchLocalStorage(localStorage["url"]);
  controller = new PinPoint.NoteController(noteObjects);
  controller.defineView(new PinPoint.View());
  controller.redraw();
});
