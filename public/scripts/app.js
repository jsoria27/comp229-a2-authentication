// IIFE -- immediately invoked funciton expression
/*
    file name: Assignment 2
    student name: Joshua Soriano
    student id: 301 154 852
    date: Friday, October 18, 2021
*/

(function() {
    function Start()
    {
        console.log("App started...");

        let deleteButtons = document.querySelectorAll('.btn-danger')

        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                    window.location.assign('/business-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);
})();