namespace ha {
    export class Contact {
        private data: Idata;
        private frame: HTMLIFrameElement;

        constructor() {
        }

        init(): void {
            console.log('contact init');
            let tbl: HTMLButtonElement = document.body.querySelector('button.test') as HTMLButtonElement;

            window.addEventListener("message", (e: MessageEvent) => {
                console.group("client receive message:");

                console.log("event:");
                console.log(e);

                let msg: IMessage = JSON.parse(e.data);
                if (msg.to == 'client') {
                    //TODO: process the contact obj
                    console.log('message is for client');
                }
                else {
                    console.log('the message is not for me')
                }

                console.groupEnd();
            });

            tbl.onclick = () => {
                // let random: number = Math.floor(Math.random() * 1000);
                console.log('tombol on click');
                let data: IMessage = {
                    to: 'server',
                    data: 'test data from iframe'
                }

                window.parent.postMessage(JSON.stringify(data), "*");

                // window.location.href = "http://localhost:3000/#" + random;
            }
        }

        //this is for component
        component2(): void {
            let frame: HTMLIFrameElement;
            frame;
            window.addEventListener("message", (e: MessageEvent) => {
                console.group("component receive message:");

                console.log("event:");
                console.log(e);

                let msg: IMessage = JSON.parse(e.data);
                if (msg.to == 'server') {
                    console.log("the message is for server");
                    this.data.data = msg.data
                    this.postUpdate();
                }
                else if (msg.to == "client") {
                    console.log('the message is for client');
                    this.frame.contentWindow.postMessage(msg.data, '*');
                }

                console.groupEnd();
            });
        }

        postUpdate(): void {

        }
    }

}

window.onload = () => {
    var contact: ha.Contact = new ha.Contact();
    contact.init();
}

interface IMessage {
    to: string,
    data: string
}

interface Idata {
    data: string;
}

