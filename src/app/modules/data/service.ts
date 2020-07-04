const mysql = require('mysql');
const config = process.env.NODE_ENV === 'production' ? require('../../../config/proConf').devConfig.mysql : require('../../../config/devconfig');
const connection = mysql.createConnection(config);

export const getData: any = (params: any) => {
    const promise = new Promise((resolve, reject) => {
        const _year = params.Year_item.replace('-', '_');
        const table: string = `data_${params.type}_${_year}`;
        const getColumnsSql = `select COLUMN_NAME from information_schema.COLUMNS where table_name = '${table}'`;
        connection.query(getColumnsSql, (err: any, result: any) => {
            if (err) {
                console.log('outside:' + err.message);
            } else {
                const lastKey: string = Object.keys(params)[Object.keys(params).length - 1];
                const lastData: string = params[lastKey];
                let whereSql: string = "";
                let getDataSql: string = "";
                for (let i in params) {
                    if (i !== 'Year_item' && i !== 'type' && i !== lastKey) {
                        whereSql += `and ${i}='${params[i]}'`;
                    }
                }
                if (lastData === 'all') {
                    getDataSql = `select * from ${table} where Year_item='${params.Year_item}' ${whereSql}`;
                } else {
                    let selectSql: string = "";
                    result.forEach((item: any) => {
                        if (item.COLUMN_NAME.indexOf(lastData) === 0) {
                            selectSql += `,${item.COLUMN_NAME}`;
                        }
                    })
                    getDataSql = `select Year_item${selectSql} from ${table} where Year_item='${params.Year_item}' ${whereSql}`;
                }
                console.log('getDataSql' + getDataSql);
                connection.query(getDataSql, (err: any, res: any) => {
                    if (err) {
                        console.log('inside' + err.message);
                    } else {
                        resolve(res);
                    }
                })
            }
        })
    })
    // 异步返回查询结果
    promise.then(function (value) {
        console.log(value);
        return value;
        // success
    }, function (value) {
        // failure
    });
    return promise;
}
