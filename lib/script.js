/**
 * Create Flight Transaction
 * @param {mx.itesm.gradeexchanger.courses.createCourseS} courseData
 * @transaction
 */

function    createCourseS(courseData) {
    // 1. Get the asset registry
    return getAssetRegistry('mx.itesm.gradeexchanger.courses.Course')
        .then(function(courseRegistry){
            // Now add the Flight

            // 2. Get resource factory
            var  factory = getFactory();
            var  NS =  'mx.itesm.gradeexchanger.courses';

            // 3. Create the Resource instance
            var  courseId = 'CCM56';  /// <<<< THIS IS HARD CODED - FIX IT as an exercise
            
            var  courseSt = factory.newResource(NS,'Course',courseData.courseId);
            
            // 4. Set the relationship
            courseSt.name = courseData.name;
            courseSt.units = courseData.units;
            
            // 5. Create a new concept using the factory & set the data in it
            var group = factory.newConcept(NS,"Group");

            group.period= courseData.period;
            group.professorId = courseData.professorId;
          
            //courseSt.gr = route;
           

            // 6. Emit the event FlightCreated
            var event = factory.newEvent(NS, 'CourseCreated');
            event.courseId = courseSt.courseId;
            emit(event);

            return courseRegistry.addAll([courseSt]);
        });
}

/**
 * Create Flight Transaction
 * @param {mx.itesm.gradeexchanger.students.AssignCourse} studentCourseData
 * @transaction
 * 
 * **/

function    AssignCourse(studentCourseData){
    var courseRegistry={}
    return getAssetRegistry('mx.itesm.gradeexchanger.students.Student').then(function(registry){
        courseRegistry = registry
        return courseRegistry.get(studentCourseData.studentId);
    }).then(function(student){
        if(!student) throw new Error("Course : "+studentCourseData.studentId," Not Found!!!");
        var   factory = getFactory();
        var   relationship = factory.newRelationship('mx.itesm.gradeexchanger.courses','Course',studentCourseData.courseId);
        student.courseAverage.push(studentCourseData.courseAverage)
        student.course.push(relationship);
        return courseRegistry.update(student);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('mx.itesm.gradeexchanger.students', 'CourseAssigned');
        event.courseId = studentCourseData.courseId;
        event.studentId = studentCourseData.studentId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });

}

/**
 * Create Flight Transaction
 * @param {mx.itesm.gradeexchanger.carrer.AddGroupNew} groupNewData
 * @transaction
 * 
 * **/

function    AddGroupNew(groupNewData){
    var careerRegistry={}
    return getAssetRegistry('mx.itesm.gradeexchanger.carrer.Career').then(function(registry){
        careerRegistry = registry
        return careerRegistry.get(groupNewData.careerId);
    }).then(function(career){
        if(!career) throw new Error("Career : "+groupNewData.careerId," Not Found!!!");
        var   factory = getFactory();
        var   relationship2 = factory.newRelationship('mx.itesm.gradeexchanger.areas','Area',groupNewData.AreaId);
        var   relationship = factory.newRelationship('mx.itesm.gradeexchanger.courses','Course',studentCourseData.courseId);
        var group = factory.newConcept(NS,"GroupNew");
        group.courses.push(relationship);
        group.area.push(relationship2);
        carrer.groupNew.push(group);
        return careeeRegistry.update(career);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('mx.itesm.gradeexchanger.career', 'AddedGroupNew');
       
        event.carrerId = studentCourseData.careerId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });

}

/**
 * Create Flight Transaction
 * @param {mx.itesm.gradeexchanger.career.CreateCareer} careerData
 * @transaction
 * 
 * **/
function createCareer(careerData) {
    // 1. Get the asset registry
    return getAssetRegistry('mx.itesm.gradeexchanger.career.Career')
        .then(function(careerRegistry){
            // Now add the Flight

            // 2. Get resource factory
            var  factory = getFactory();
            var  NS =  'mx.itesm.gradeexchanger.career';

            // 3. Create the Resource instance
            /// <<<< THIS IS HARD CODED - FIX IT as an exercise
            
            var  careerN = factory.newResource(NS,'Career',careerData.careerId);
           
            // 4. Set the relationship
            
  
            careerN.name = careerData.name;
            careerN.units = careerData.units;
            
            // 5. Create a new concept using the factory & set the data in it
           
            
            // 6. Emit the event FlightCreated
            var event = factory.newEvent(NS, 'CareerCreated');
            event.careerId = careerN.careerId;
            emit(event);

            return careerRegistry.addAll([careerN]);
        });
}

/**
 * Create Flight Transaction
 * @param {mx.itesm.gradeexchanger.areas.CreateArea} areaData
 * @transaction
 * 
 * **/
function createCareer(areaData) {
    // 1. Get the asset registry
    return getAssetRegistry('mx.itesm.gradeexchanger.areas.Area')
        .then(function(areaRegistry){
            // Now add the Flight

            // 2. Get resource factory
            var  factory = getFactory();
            var  NS =  'mx.itesm.gradeexchanger.areas';

            // 3. Create the Resource instance
            /// <<<< THIS IS HARD CODED - FIX IT as an exercise
            
            var  areaN = factory.newResource(NS,'Area',areaData.areaId);
           
            // 4. Set the relationship
            
  
            areaN.name = areaData.name;
            
            
            // 5. Create a new concept using the factory & set the data in it
           
            
            // 6. Emit the event FlightCreated
            var event = factory.newEvent(NS, 'AreaCreated');
            event.areaId = areaN.areaId;
            emit(event);

            return areaRegistry.addAll([careerN]);
        });
}

/**
 * Create Flight Transaction
 * @param {mx.itesm.gradeexchanger.tema.CreateTema} temaData
 * @transaction
 * 
 * **/
function createCareer(temaData) {
    // 1. Get the asset registry
    return getAssetRegistry('mx.itesm.gradeexchanger.tema.Tema')
        .then(function(temaRegistry){
            // Now add the Flight

            // 2. Get resource factory
            var  factory = getFactory();
            var  NS =  'mx.itesm.gradeexchanger.tema';

            // 3. Create the Resource instance
            /// <<<< THIS IS HARD CODED - FIX IT as an exercise
            
            var  temaN = factory.newResource(NS,'Tema',temaData.temaId);
           
            // 4. Set the relationship
            
  
            temaN.name = temaData.name;
            
            
            // 5. Create a new concept using the factory & set the data in it
           
            
            // 6. Emit the event FlightCreated
            var event = factory.newEvent(NS, 'TemaCreated');
            event.temaId = temaN.temaId;
            emit(event);

            return temaRegistry.addAll([temaN]);
        });
}

/**
 * Create Flight Transaction
 * @param {mx.itesm.gradeexchanger.students.CreateStudent} studentData
 * @transaction
 * 
 * **/
function    createStudent(studentData) {
    // 1. Get the asset registry
    return getAssetRegistry('mx.itesm.gradeexchanger.students.Student')
        .then(function(studentRegistry){
            // Now add the Flight

            // 2. Get resource factory
            var  factory = getFactory();
            var  NS =  'mx.itesm.gradeexchanger.students';

            // 3. Create the Resource instance
             /// <<<< THIS IS HARD CODED - FIX IT as an exercise
            
            var  studentSt = factory.newResource(NS,'Student',studentData.studentId);
           
            // 4. Set the relationship
            
  
            studentSt.firstName = studentData.firstName;
            studentSt.lastName = studentData.lastName;
            
            // 5. Create a new concept using the factory & set the data in it
           
            
            var   relationship = factory.newRelationship('mx.itesm.gradeexchanger.career','Career',studentData.careerId);
            studentSt.career = relationship;
            // 6. Emit the event FlightCreated
            var event = factory.newEvent(NS, 'StudentCreated');
            event.studentId = studentSt.studentId;
            emit(event);

            return studentRegistry.addAll([studentSt]);
        });
}
