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

export const reduceData = (data, threshold) => {

    const reducer = (accumulator, currentValue) => accumulator + currentValue.value_count;
    let other_key = data.findIndex(it => it.value == 'Other');
    let other_count = data[other_key].value_count;

    threshold = (other_key <= threshold) ? threshold + 1 : threshold;

    let spare_data = data.slice(threshold);
    let reduced_data = data.slice(0,threshold);
    reduced_data[other_key] = {value:'Other', value_count: other_count};

    let other_accumulator = spare_data.reduce(reducer,0) + reduced_data[other_key].value_count;
    reduced_data[other_key].value_count = Math.round(other_accumulator,2);

    if (other_key < reduced_data.length) {
        let last_key = reduced_data.length - 1;
        [reduced_data[other_key], reduced_data[last_key]] = [reduced_data[last_key], reduced_data[other_key]];
    }

    return reduced_data;
}
