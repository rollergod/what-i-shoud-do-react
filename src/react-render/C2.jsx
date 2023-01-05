import React from 'react';

const C2 = () => {

    console.log(3); //2

    React.useEffect(() => {
        console.log(4); //3
    });

    return (
        <div>
            YOWZA
        </div>
    )

};

export default C2;