import React from 'react';

export class CustomLabel extends React.Component {
    render () {
        let {x, y, dx, dy, fill, value, width, height, textAnchor, offset, char, rounded, position} = this.props;


        if (rounded) {
            value = Math.round(value);
        }

        if (position == 'right') {
            x = x + width + offset;
            y = y + (height / 2) + 2;
            textAnchor = 'start';
        } else {
            textAnchor = 'middle';
            dy = -6;
            x = x + width / 2;
        }

        return <text x={x} y={y} dy={dy} fill={fill} textAnchor={textAnchor} fontSize={13} fontFamily='sans-serif'>{value} {char}</text>
    }
};
