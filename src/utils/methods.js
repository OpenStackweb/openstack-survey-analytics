/**
 * Copyright 2019 OpenStack Foundation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

export const reduceData = (data, limit) => {

    let other_key = data.findIndex(it => it.value == 'Other');
    if (other_key < 0) {
        other_key = data.push({value: 'Other', value_count: 0}) - 1;
    }

    if(data.length <= limit) {
        [data[other_key], data[data.length-1]] = [data[data.length-1], data[other_key]];
        return data;
    } else {
        [data[other_key], data[limit-1]] = [data[limit-1], data[other_key]];
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue.value_count;


    let spare_data = data.slice(limit);
    let reduced_data = data.slice(0,limit).map(it => ({value: it.value, value_count: it.value_count})); // clone array

    let other_accumulator = spare_data.reduce(reducer,0) + reduced_data[reduced_data.length - 1].value_count;
    reduced_data[limit-1].value_count = Math.round(other_accumulator,2);

    return reduced_data;
}

export const reduceDataByKeys = (data, keys) => {

    const reducer = (accumulator, currentValue) => accumulator + currentValue.value_count;

    let reduced_data = keys.map(k => ({value: k, value_count: 0}));

    let spare_data = data.filter(it => !keys.includes(it.value));
    let useful_data = data.filter(it => keys.includes(it.value));

    reduced_data.forEach(it => {
        let data_value = useful_data.find(val => val.value == it.value)
        it.value_count = data_value.value_count;
    });

    let other_key = reduced_data.findIndex(it => it.value == 'Other');
    let other_accumulator = spare_data.reduce(reducer,0) + reduced_data[other_key].value_count;
    reduced_data[other_key].value_count = Math.round(other_accumulator,2);

    return reduced_data;
}
