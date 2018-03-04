/**
 * This is the event processing function that can be coded to carry out any action
 * that the subscriber intends to take. E.g., when the flight is scheduled the travel
 * agent will open it up on their site for ticket sale.
 * @param {*} fqn 
 * @param {*} event 
 */
function processCareerCreatedEvent(fqn, event){
    // For demo purpose the information is getting printed on the console
    console.log(fqn, ' ', event.careerId, ' ', event.timestamp, ' ', event.eventId);
    //console.log();
}  