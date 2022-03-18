namespace ha.sl {
    class Login {

        constructor() {
            this.form.onsubmit = () => {
                try {
                    //TODO: kumpulin data
                    let data: string = '';

                    ha.comp.Util.Ajax('post', RouterKOns.gp_auth_login, data)
                        .then((x: XMLHttpRequest) => {

                        })
                        .catch((e) => {
                            ha.comp.Util.error(e);
                        })
                }
                catch (e) {
                    ha.comp.Util.error(e);
                }
                return false;
            }
        }

        get form(): HTMLFormElement {
            return document.forms[0] as HTMLFormElement;
        }
    }

    export var login: Login = new Login();
}