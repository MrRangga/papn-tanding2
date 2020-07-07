import idb from 'idb'
var dbPromised = idb.open("papan-tanding-v1", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("team",{
  	keyPath: 'id'
  });

});

// notifications

function showAddNotification() {
    const title = 'data ditambahkan';
    const options = {
        'body': 'anda bisa melihat data ini di didalam saved menu',
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('FItur notifikasi tidak diijinkan.');
    }
}

function showDeleteNotification() {
    const title = 'data terhapus';
    const options = {
        'body': 'data tim anda terhapus anda bisa menyimpan nya lagi melalui klassmen menu.',
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}
  

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("team", "readwrite");
      var store = tx.objectStore("team")
      store.put(team)
      return tx.complete;
    })
    .then(function() {
      console.log("team berhasil di simpan")
      showAddNotification()
    })
    .catch(error => {
    	console.log(error)
    })
}

function getAll() {
	return new Promise((resolve,reject) => {

		dbPromised.then(function(db) {
		  var tx = db.transaction('team', 'readonly');
		  var store = tx.objectStore('team');
		  
		  return store.getAll(); 
		}).then(function(val) {
		  resolve(val)
		});
	})
}

function deleteData(id) {
	return new Promise((resolve,reject) => {

		dbPromised.then(function(db) {
		  var tx = db.transaction('team', 'readwrite');
		  var store = tx.objectStore('team');
		  
		  return store.delete(id); 
		}).then(function(val) {
		console.log(val)
		  showDeleteNotification()
		  window.location.reload()
		});
	})
}

export {getAll} 