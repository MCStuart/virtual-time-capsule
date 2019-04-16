var firebaseConfig = {
  apiKey: "AIzaSyDNwXooTh0URLihSpXCaJKG52riq3PYwqo",
  authDomain: "time-capsule-12424.firebaseapp.com",
  databaseURL: "https://time-capsule-12424.firebaseio.com",
  projectId: "time-capsule-12424",
  storageBucket: "time-capsule-12424.appspot.com",
  messagingSenderId: "914523788031"
};

var timeCapsule = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore(timeCapsule);
var storage = firebase.storage();


function Capsule(name, timeCreated, duration) {
  this.name = name;
  this.uid = uuidv4();
  this.media = ["document1", "document2", "document3"];
  this.timeCreated = timeCreated;
  this.duration = duration;
}

var d = new Date();
var n = d.getTime();
var firstCapsule = new Capsule("Capsule#2318", d.getTime(), 0);

db.collection("capsules").doc(firstCapsule.uid).set({
  name: firstCapsule.name,
  timeCreated: firstCapsule.timeCreated,
  duration: firstCapsule.duration,
  media: firstCapsule.media
});

var storageRef = firebase.storage().ref();

var metadata = {
  contentType: 'image/jpeg'
};


var fileList = [];


function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


function updateFileList() {
  var output = [];
  for (var i = 0, f; f = fileList[i]; i++) {
    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                '</li>');
  }
  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}


function uploadFiles() {
  for (var i = 0, f; f = fileList[i]; i++) {
    storageRef.child(firstCapsule.uid + "/" + f.name).put(f);
  }
}



function addEventHandlers() {
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
  $('#upload').on('click', function () {
    uploadFiles();

  });
}

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  for (var i = 0; i < evt.target.files.length; i++) {
    fileList.push(evt.target.files[i])
  }
  //mountainsRef.put(evt.target.files[0]);
  updateFileList();
}


$(function() {
  addEventHandlers()

});

ko.bindingHandlers.dateTimePicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        //initialize datepicker with some optional options
        var options = allBindingsAccessor().dateTimePickerOptions || {};
        $(element).datetimepicker(options);

        //when a user changes the date, update the view model
        ko.utils.registerEventHandler(element, "dp.change", function (event) {
            var value = valueAccessor();
            if (ko.isObservable(value)) {
                if (event.date != null && !(event.date instanceof Date)) {
                    value(event.date.toDate());
                } else {
                    value(event.date);
                }
            }
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            var picker = $(element).data("DateTimePicker");
            if (picker) {
                picker.destroy();
            }
        });
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

        var picker = $(element).data("DateTimePicker");
        //when the view model is updated, update the widget
        if (picker) {
            var koDate = ko.utils.unwrapObservable(valueAccessor());

            //in case return from server datetime i am get in this form for example /Date(93989393)/ then fomat this
            koDate = (typeof (koDate) !== 'object') ? new Date(parseFloat(koDate.replace(/[^0-9]/g, ''))) : koDate;

            picker.date(koDate);
        }
    }
};
