1.這就是good idea好想工作室無聊吃冰用的訂單啦

2.ui死掉惹

2017.5.11

甲冰啦

Demo https://yulymoon.github.io/eatice/eatice.html
github https://github.com/Yulymoon/eatice

這是vue+firebase的小專案 搭配vuefire

1.開ㄍ html
2.引入vue+firebase+vuefire

        <script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="stylesheets/eat.css">
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
        <!-- Firebase -->
        <script src="https://gstatic.com/firebasejs/3.5.2/firebase.js"></script>
        <!-- VueFire -->
        <script src="https://unpkg.com/vuefire/dist/vuefire.js"></script>   

3.為了版面乾淨以及修改方便，js部分寫成一隻index.js在body下另外引入

    <script src="index.js"></script>

4.到firebase新增專案https://console.firebase.google.com/
   4-1 我們是web要用所以選擇 ”將 Firebase 加入您的網路應用程式“ 然後會拿到一串像是下面的東西

    <script src="https://www.gstatic.com/firebasejs/4.1.2/firebase.js"></script>
    <script>
      // Initialize Firebase
      var config = {
        apiKey: "",
        authDomain: "eatice-11d93.firebaseapp.com",
        databaseURL: "https://eatice-11d93.firebaseio.com",
        projectId: "eatice-11d93",
        storageBucket: "eatice-11d93.appspot.com",
        messagingSenderId: "1093935381697"
      };
      firebase.initializeApp(config);
    </script>       

  這一串直接貼到index.js最上面就可以惹

  4-2 資料庫如果沒改規則的話會沒辦法寫入，在firebase選擇左邊的database>規則 改成

    {
      "rules": {
        ".read": true,   //讀取寫入都開放惹
        ".write": true
      }
    }

 4-3 回index.js  var一個變數可以傳到firebase database裡面的’users’(隨便定）

    var usersRef = firebase.database().ref('users')

5.開始來html挖洞

        <div id="ice">
            <h1>{{msg}}</h1>
          <div><span>{{alllist.name}}總共點惹{{alllist.lists}}</span></div>
          <div class="">
                                <span>5樣料$35 超過一樣+5塊</span>
          </div>
            <div class="content">
                <form class="left">
                    <div>
                        <input type="text" v-model="alllist.name" placeholder="還不說你叫什麼名字">
                    </div>
                        <div class="sele">
                            <input id="麵茶" type="checkbox" value="麵茶" v-model="alllist.lists"><label for="麵茶"><img src="img/1.png" alt="">麵茶</label>
                        </div>
                    <input type="submit" value="偶好想ㄘ" @click.prevent="onSubmit">
                </form>

                <div class="right">
                    <h1>快熱死的</h1>
                    <div v-for="order in orders">
                        <h2>  {{order.name}} </h2>
                        <span>已點{{order.lists}} 總共{{order.cost}}元 快付錢不找零</span>
                        <button @click="removeUser(order)">我好後悔我好胖</button>
                    </div>
                </div>
            </div>
        </div>     

vue

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
                this.alllist.cost = 35
              }
              else{
                this.alllist.cost= 35+(money.length-5)*5
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

5-1 el: ‘#id’ 會綁定你所指定的id內容
      我想知道 “誰” 點了 “什麼料” 總共 “花費多少”
      所以我的data樣子應該是一個object
      在index.js
            alllist: {
                name: "",
                lists: [],
                cost:""
            }      

使用v-model將對應的值綁上去

                      <input type="text" v-model="alllist.name" placeholder="還不說你叫什麼名字">
                    </div>
                        <div class="sele">
                            <input id="麵茶" type="checkbox" value="麵茶" v-model="alllist.lists"><label for="麵茶"><img src="img/1.png" alt="">麵茶</label>
                        </div>

回到index.js 在methods下寫個送出function 讓輸入的選項能傳到firebase
onSubmit: function() {
        usersRef.push(this.alllist)
        this.alllist.name = ''
        this.alllist.lists = []
}
這邊使用的是push方式
其他還有
set() 給指定的路徑，直接寫或覆蓋資料。例如: users/<user-id>/<username>

push() 加入 list Data，每一次呼叫 push()，都會產生  unique ID
    例如: user-posts/<user-id>/<unique-post-id>

update() 給一個 key，並更新此 key 的資料，不會覆蓋全部的資料

transaction()

5-2回到html將onSubmit綁到          
  <input type="submit" value="偶好想ㄘ" @click.prevent="onSubmit">

就完成送出惹


6.
6-1 用vuefire將傳
    firebase: {
        orders: usersRef
    },
6-2要看總共點了什麼，一樣先在html挖顯示的洞 然後綁定v-for
<div v-for="order in orders">
    <h2>  {{order.name}} </h2>
    <span>已點{{order.lists}} 總共{{order.cost}}元 快付錢不找零</span>
    <button @click="removeUser(order)">我好後悔我好胖</button>
</div>

可以開vue-tool看看目前傳回來的資料形式
