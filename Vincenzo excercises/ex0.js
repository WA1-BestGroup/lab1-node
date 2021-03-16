"use strict";

function modifyArrays ( list ) {

    list.forEach( (array) => {
        let temp = array.split("");

        if( temp.length <= 2 )
            array = "";
        else
        {
            array = temp.splice(2,temp.length-4);
            array = temp.join("");
        }

        console.log(array);
    });
}