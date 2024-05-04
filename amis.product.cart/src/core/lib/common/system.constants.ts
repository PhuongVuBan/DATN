import config from '../../../assets/config.prod.json';

/**
 * Lấy ra thông tin config trong file config.prod.json
 * HAN - 08.03.2023
 */
export class SystemConstants {
    [key: string]: any;
    public static config: any = {};
    public static get(name: string): any {
        if (!this.config || Object.keys(this.config).length == 0) {
            this.config = config;
        }
        return this.config[name];
    }
}
