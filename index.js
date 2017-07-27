
// Setup Firebase
let config = {
    apiKey: "AIzaSyC425MfvWlBO8pdL7r9tGaaN9SEBzWJntA",
    authDomain: "eatice-11d93.firebaseapp.com",
    databaseURL: "https://eatice-11d93.firebaseio.com",
    projectId: "eatice-11d93",
    storageBucket: "eatice-11d93.appspot.com",
    messagingSenderId: "1093935381697"
};
firebase.initializeApp(config);

var usersRef = firebase.database().ref('users')


var app = new Vue({
    el: '#ice',
    data: {
        msg: "甲冰啦還不快下單",
        alllist: {
            name: "",
            lists: [],
            cost:""
        }
    },

    firebase: {
        orders: usersRef
    },
    methods: {
        onSubmit: function() {
          let money = this.alllist.lists
          if(money.length<5){
            this.alllist.cost = 45
          }
          else{
            this.alllist.cost= 45+(money.length-5)*5
          }
                usersRef.push(this.alllist)
                this.alllist.name = ''
                this.alllist.lists = []
        },
        removeUser: function(order) {
            usersRef.child(order['.key']).remove()
        },

    },


})
