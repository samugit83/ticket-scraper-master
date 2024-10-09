
'use server'


export const SearchArtistEventTicketOne = async (search_term: string) => {

    search_term = search_term.replace(/\s+/g, '+');

    const url = `http://localhost:5000/get_search_results/${search_term}`;

    const response = await fetch(url, {
        method: 'GET'
    });

    
    const respJSON = await response.json();

    return respJSON

};
 

export const SubSearchEventTicketOne = async (event_url: string) => {


    const url = `http://localhost:5000/get_subsearch_results/${event_url}`;

    const response = await fetch(url, {
        method: 'GET'
    });

    
    const respJSON = await response.json();

    return respJSON

};


export const getUserData = async (userName: string) => {

    
    const url = `http://localhost:5000/get_user_data/${userName}`;

    const response = await fetch(url, {
        method: 'GET'
    });

    
    const respJSON = await response.json();

    return respJSON

};


export const getQueueInfo = async () => {

    
    const url = `http://localhost:5000/get_queue_info`;

    const response = await fetch(url, {
        method: 'GET'
    });

    
    const respJSON = await response.json();

    return respJSON

};


export const getParameter = async (parameter_name: string) => {

    
    const url = `http://localhost:5000/get_parameter/${parameter_name}`;

    const response = await fetch(url, {
        method: 'GET'
    });

    const respJSON = await response.json();

    return respJSON

};




