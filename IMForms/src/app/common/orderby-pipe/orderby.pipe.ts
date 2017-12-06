import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderbyPipe implements PipeTransform {
    private static simpleSort(a: any, b: any) {
        return typeof a === 'string' && typeof b === 'string'
            ? a.toLowerCase().localeCompare(b.toLowerCase())
            : a - b;
    }

    private static orderCompare(prop: string, asc: boolean, a: any, b: any) {
        const first = OrderbyPipe.extractDeepPropertyByMapKey(a, prop),
            second = OrderbyPipe.extractDeepPropertyByMapKey(b, prop);

        if (first === second) {
            return 0;
        }

        if (typeof first === 'undefined' || first === '') {
            return 1;
        }

        if (typeof second === 'undefined' || second === '') {
            return -1;
        }

        if (typeof first === 'string' && typeof second === 'string') {
            const pos = first.toLowerCase().localeCompare(second.toLowerCase());
            return asc ? pos : -pos;
        }

        return asc
            ? first - second
            : second - first;
    }

    private static extractFromConfig(config: any) {
        const sign = config.substr(0, 1);
        const prop = config.replace(/^[-+]/, '');
        const asc = sign !== '-';

        return [prop, asc, sign];
    }

    private static extractDeepPropertyByMapKey(obj: any, map: string): any {
        const keys = map.split('.');
        const key = keys.shift();

        return keys.reduce((prop: any, onekey: string) => {
            return (typeof prop !== 'undefined' && typeof prop[onekey] !== 'undefined')
                ? prop[onekey]
                : undefined;
        }, obj[key || '']);
    }

    transform(input: any, config?: any): any[] {
        if (!Array.isArray(input)) {
            return input;
        }

        const out = [...input];

        if (Array.isArray(config)) {
            return out.sort((a, b) => {
                for (let i = 0, l = config.length; i < l; ++i) {
                    const [prop, asc] = OrderbyPipe.extractFromConfig(config[i]);
                    const pos = OrderbyPipe.orderCompare(prop, asc, a, b);
                    if (pos !== 0) {
                        return pos;
                    }
                }
                return 0;
            });
        }

        if (typeof config === 'string') {
            const [prop, asc, sign] = OrderbyPipe.extractFromConfig(config);

            if (config.length === 1) {
                switch (sign) {
                    case '+': return out.sort(OrderbyPipe.simpleSort.bind(this));
                    case '-': return out.sort(OrderbyPipe.simpleSort.bind(this)).reverse();
                }
            }

            return out.sort(OrderbyPipe.orderCompare.bind(this, prop, asc));
        }

        return out.sort(OrderbyPipe.simpleSort.bind(this));
    }

}
