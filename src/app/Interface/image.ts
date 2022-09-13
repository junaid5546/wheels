/**
 * (Type docs)
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

export class Image {
    name:number;
    format:string;
    webPath:string;
    path:string;
    /**
     * @param path
     * @param format 
     * @param webPath 
     */
    constructor(path:string, format:string, webPath:string) {
        this.makeImageName();
        this.path = path;
        this.format = format;
        this.webPath = webPath;
    }

    makeImageName(){
         this.name = new Date().getTime();
    }

}