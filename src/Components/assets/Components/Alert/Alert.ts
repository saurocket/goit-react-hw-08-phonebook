import Swal from "sweetalert2";
import {InformationType} from "../../../../redux/authReducer/authTypes";



export const alertMessage = (typeAlert: 'error'|'success',
                             message: string, info = false,
                             payload = null as null | InformationType) => {
   if (!info){
       if(typeAlert === 'error'){
           Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: `${message}`,

           })
       }
       if(typeAlert === "success" ){
           Swal.fire({
               icon: 'success',
               title: 'Success :)',
               text: `${message}`,
               showConfirmButton: false,
               timer: 1000
           })
       }
   }
   if (info && payload){
       Swal.fire({
           icon: 'success',
           title: 'User information',
           html: `
                    <strong>User: </strong><span>${payload.name}</span>
                    <br/>
                    <strong>Email: </strong><span>${payload.email}</span>
           `,
           showConfirmButton: true,

       })
   }


}