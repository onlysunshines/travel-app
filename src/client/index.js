import { handleSubmit } from './js/formHandler'

import './styles/resets.scss'
import './styles/style.scss'

console.log(process.env.API_KEY_GEO);
console.log(process.env.API_KEY_WEA);
console.log(process.env.API_KEY_PIX);
console.log(document.getElementById("inputPlace").value);
 

export {
    handleSubmit   
}