namespace ha.sl {
    export class Data {
        private _iframe: string = '';
        private bindList: IBindObj[];

        reg(bindObj: IBindObj): void {
            this.bindList.push(bindObj);

            let data: any = bindObj.getter();
            bindObj.data = this.serialize(data);
        }

        serialize(data: any): string {
            try {
                return JSON.stringify(data);
            }
            catch (e) {
                return data + '';
            }
        }

        update(): void {
            this.bindList.forEach((item: IBindObj) => {
                let data: any = item.getter();
                data = this.serialize(data);
                if (item.data != data) {
                    item.setter();
                    item.data = data;
                }
                else {
                    //debug
                }
            })
        }


        public get iframe(): string {
            return this._iframe;
        }

        public set iframe(value: string) {
            this._iframe = value;
            this.update();
        }
    }
}