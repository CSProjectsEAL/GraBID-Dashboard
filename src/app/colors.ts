export abstract class Colours {
    static colors: string[] = [
        '#1c629e',
        '#a2acbd',
        '#eee8a9',
        '#75fac8',
        '#33c192',
        '#008a5f',
        '#bea5a8',
        '#1e857e',
        '#d17691',
        '#52a388',
        '#008ea5',
        '#cafbe8',
        '#737497',
        '#deb887',
        '#a1b455',
        '#99b0a7',
        '#a188d1',
        '#a4d589',
        '#77bd8a',
        '#d37f5b',
        '#00a87a',
        '#5a9acb',
        '#b5e1f7',
        '#bfff99',
        '#9886b4',
        '#a3c4e6',
        '#ffeace',
        '#98afba',
        '#00a4ea',
        '#e96666'
    ];

    public static GenerateColors(amount: number): string[] {
        let pickedColours = [];
        let counter = 0;

        if(amount > this.colors.length)
            amount = this.colors.length;

        while (counter < amount) {
            let random = Math.floor(Math.random() * this.colors.length);
            if(!pickedColours.includes(this.colors[random])){
                pickedColours.push(this.colors[random]);
                counter++;
            }
        }
        return pickedColours;
    }
}