const moviesreducer = (state = {films : [] , members : [], subs : []},action) =>
{

    switch (action.type)
     {
        case "LOAD":
        return {...state, films : action.payload}    
        
        case "LOAD2":
          return {...state, members : action.payload}
          
          case "LOAD3":
            return {...state, subs : action.payload}

            case "ADD":
              return {...state, films : [...state.films, action.payload ]}

            case "ADD2":
              return {...state, members : [...state.members, action.payload ]}

              case "ADD3":
                return {...state, subs : [...state.subs, action.payload ]}
  

        case "UPDATE":
         let arr = [...state.films]
       let index = arr.findIndex(x=>x.snumber==action.payload.snumber)

         if (index>=0) 
         {
            arr[index] = action.payload
         }
    
         return arr

         case "UPDATE2":
          let arr2 = [...state.members]
        let index2 = arr2.findIndex(x=>x.id==action.payload.id)
 
          if (index2>=0) 
          {
             arr2[index2] = action.payload
          }
     
          return arr2

          case "UPDATE3":
            let arr3 = [...state.subs]
          let index3 = arr3.findIndex(x=>x.memberkey==action.payload.keynumber)
   
            if (index3>=0) 
            {
               arr3[index3] = action.payload
            }
       
            return arr3
  


          case "DELETE":
            let arrdelete = state.films
            let idelete = arrdelete.findIndex(x => x.snumber == action.payload);
            if(idelete >= 0)
            {
              arrdelete.splice(idelete,1);
            }
    
            return {...state,films : arrdelete}

            case "DELETE2":
            let arrdelete2 = state.members
            let idelete2 = arrdelete2.findIndex(x => x.keynumber == action.payload);
            if(idelete2 >= 0)
            {
              arrdelete2.splice(idelete2,1);
            }
    
            return {...state,members : arrdelete2}


        default:
            return state;
    }


}

export default moviesreducer;