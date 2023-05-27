import { handleSubmit } from './js/formHandler'
import { checkDate } from './js/dateChecker';
import { showSlides } from './js/slideShow';

import './styles/resets.scss'
import './styles/style.scss'
import './styles/slideshow.scss'

console.log(process.env.API_KEY_GEO);
console.log(process.env.API_KEY_WEA);
console.log(process.env.API_KEY_PIX);
console.log(document.getElementById("inputPlace").value);
 

export {
    handleSubmit, checkDate, showSlides  
}
