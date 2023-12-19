

export const initialBI={
    fecha:new Date(),
    periodo : "Peripdp"
}


export const biReducer = (state = {}, action) =>{

    switch(action.type){
        case '[BI] Change Periodo':
            return {...state,periodo: action.payload}
    }
}