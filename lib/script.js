/**
 * Create Flight Transaction
 * @param {mx.itesm.gradeexchanger.courses.createCourseS} courseData
 * @transaction
 */

function    createCourseS(courseData) {
    // 1. Get the asset registry
    return getAssetRegistry('mx.itesm.gradeexchanger.courses.Course')
        .then(function(flightRegistry){
            // Now add the Flight

            // 2. Get resource factory
            var  factory = getFactory();
            var  NS =  'mx.itesm.gradeexchanger.courses';

            // 3. Create the Resource instance
            var  courseId = 'CCM56';  /// <<<< THIS IS HARD CODED - FIX IT as an exercise
            
            var  courseSt = factory.newResource(NS,'Course',courseId);
            
            // 4. Set the relationship
            courseSt.name = courseData.name;
            courseSt.units = courseData.units;
            
            // 5. Create a new concept using the factory & set the data in it
            var group = factory.newConcept(NS,"Group");

            group.period= courseData.period;
            group.professorId = courseData.professorId;
          
            courseSt.route = route;
           

            // 6. Emit the event FlightCreated
            var event = factory.newEvent(NS, 'CourseCreated');
            event.courseId = courseId;
            emit(event);

            return courseRegistry.addAll([course]);
        });
}

/**
 * Create Flight Transaction
 * @param {mx.itesm.gradeexchanger.courses.AssignCourse} studentCourseData
 * @transaction
 * 
 * **/
/** 
function    AssignCourse(studentCourseData){
    var courseRegistry={}
    return getAssetRegistry('mx.itesm.gradeexchanger.courses.Course').then(function(registry){
        courseRegistry = registry
        return courseRegistry.get(studentCourseData.courseId);
    }).then(function(course){
        if(!course) throw new Error("Course : "+studentCourseData.courseId," Not Found!!!");
        var   factory = getFactory();
        var   relationship = factory.newRelationship('mx.itesm.gradeexchanger.courses','Course',studentCourseData.studentId);
        course.student = relationship;
        return courseRegistry.update(course);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('org.acme.airline.flight', 'AircraftAssigned');
        event.flightId = flightAircraftData.flightId;
        event.aircraftId = flightAircraftData.aircraftId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });

}*/

