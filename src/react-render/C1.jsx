import React from 'react';

const C1 = ({ children }) => {
    console.log(1); //1

    React.useEffect(() => {
        console.log(2); //4 зависит от того, есть ли в нас элемент
    });

    return (
        <div ref={console.log(5)}>
            {children}
        </div>
    )
};

export default C1;