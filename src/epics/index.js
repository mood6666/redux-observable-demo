import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { push, replace } from 'react-router-redux';
import axios from 'axios';
import { tableData } from '../reducers';
import { ajax } from 'rxjs/observable/dom/ajax';
import { message } from 'antd';

function objToUrl(obj) {
    return Object.keys(obj).filter((x) => {
        if (typeof obj[x] === 'object') {
            console.warn(`objToUrl出现了object,key为（${x}）`);
            return false;
        }
        return obj[x];
    }).map(x => `${x}=${obj[x]}`).join('&');
}

const Axios = axios.create({
    baseURL: 'http://dmcdev.dz11.com',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

Axios.interceptors.response.use(function (response) {
    if (response.data.error !== 0) {
        message.error(response.data.msg);
        return Promise.reject(response.data.msg);
    } else {
        return Promise.resolve(response);
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

function getData(action$) {
    return action$.ofType('getData').pluck('data').switchMap(aaa =>
        Observable.timer(100).flatMap(() => {
                return Observable.merge(
                    Observable.of({
                        type: 'tableDating',
                    }),
                    Observable.of({
                        type: 'saveSearchdata',
                        data: aaa,
                    }),
                    Observable.of(replace(`?${objToUrl(aaa)}`)),
                    Observable.fromPromise(
                        Axios.get('/apps/userdata/userlist/index', {
                            params: aaa,
                        })
                    ).do(x => console.log(x)).pluck('data').map(x => {
                        return {
                            type: 'tableData',
                            data: {
                                list: x.data.list,
                                count: x.data.recordCount,
                                page: x.data.pageCount,
                                currentPage: parseInt(aaa.page, 10),
                            }
                        }
                    }).catch((x) => {
                        console.log('cuowu', x);
                        return Observable.of({
                            type: 'tableDataError'
                        });
                    })
                )
            }
        )
    )
}

export default combineEpics(
    getData
);
