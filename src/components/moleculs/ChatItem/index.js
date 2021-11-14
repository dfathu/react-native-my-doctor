import React from 'react';
import Other from './Other';
import IsMe from './IsMe';

export default function ChatItem({type, text, date, photo}) {
    if(type) {
        return <IsMe text={text} date={date}/>
    }
    return <Other text={text} date={date} photo={photo}/>
}
