import { formatLanguage } from "./formatLanguage";

export const getDataAgent = (agent, type) => {
    let result = ''
    switch(type){
        case 'lang':            
            if(agent.registrations.length > 0){
                result = agent.registrations[0].preferredLanguages.map(it=>formatLanguage(it)).join(", ") 
            }
            return result;
        case 'role':
            if(agent.registrations.length > 0){
                result = agent.registrations[0].roles.join(", ") 
            }
            return result;
        default:
            return result;
    }
}