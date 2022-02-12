"use strict";
var ha;
(function (ha) {
    class Contact {
        data;
        frame;
        constructor() {
        }
        init() {
            console.log('contact init');
            let tbl = document.body.querySelector('button.test');
            window.addEventListener("message", (e) => {
                console.group("client receive message:");
                console.log("event:");
                console.log(e);
                let msg = JSON.parse(e.data);
                if (msg.to == 'client') {
                    //TODO: process the contact obj
                    console.log('message is for client');
                }
                else {
                    console.log('the message is not for me');
                }
                console.groupEnd();
            });
            tbl.onclick = () => {
                // let random: number = Math.floor(Math.random() * 1000);
                console.log('tombol on click');
                let data = {
                    to: 'server',
                    data: 'test data from iframe'
                };
                window.parent.postMessage(JSON.stringify(data), "*");
                // window.location.href = "http://localhost:3000/#" + random;
            };
        }
        //this is for component
        component2() {
            let frame;
            frame;
            window.addEventListener("message", (e) => {
                console.group("component receive message:");
                console.log("event:");
                console.log(e);
                let msg = JSON.parse(e.data);
                if (msg.to == 'server') {
                    console.log("the message is for server");
                    this.data.data = msg.data;
                    this.postUpdate();
                }
                else if (msg.to == "client") {
                    console.log('the message is for client');
                    this.frame.contentWindow.postMessage(msg.data, '*');
                }
                console.groupEnd();
            });
        }
        postUpdate() {
        }
    }
    ha.Contact = Contact;
})(ha || (ha = {}));
window.onload = () => {
    var contact = new ha.Contact();
    contact.init();
};
