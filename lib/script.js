


/**
 * Create Flight Transaction
 * @param {mx.itesm.gradeexchanger.students.AssignCourse} studentCourseData
 * @transaction
 *
 * **/

function    AssignCourse(studentCourseData){
    var studentRegistry={}
    return getAssetRegistry('mx.itesm.gradeexchanger.students.Student').then(function(registry){
        studentRegistry = registry
        return studentRegistry.get(studentCourseData.studentId);
    }).then(function(student){
       
        if(!student) throw new Error("Course : "+studentCourseData.studentId," Not Found!!!");
        var   factory = getFactory();
        var   relationship = factory.newRelationship('mx.itesm.gradeexchanger.courses','Course',studentCourseData.courseId);
        var group = factory.newConcept(NS,"CoursesApproved");
        group.courseId = relationship;
        group.period = studentCourseData.period;
        group.grade = studentCourseData.grade;
        student.coursesApproved.push(group);
        return studentRegistry.update(student);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('mx.itesm.gradeexchanger.students', 'CourseAssignedApproved');
        event.courseId = studentCourseData.courseId;
        event.studentId = studentCourseData.studentId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });

}


/**
 * Create Flight Transaction
 * @param {mx.itesm.gradeexchanger.students.AssignCareer} careerAssignData
 * @transaction
 * 
 * **/
function AssignCareer(careerAssignData){
    var studentRegistry={}
    return getAssetRegistry('mx.itesm.gradeexchanger.students.Student').then(function(registry){
        studentRegistry = registry
        return studentRegistry.get(careerAssignData.studentId);
    }).then(function(student){
        if(!student) throw new Error("Student : "+careerAssignData.studentId," Not Found!!!");
        var   factory = getFactory();
        
        var   relationship2 = factory.newRelationship('mx.itesm.gradeexchanger.career','Career',careerAssignData.careerId);
        //var group = factory.newConcept(NS,"GroupNew");
        
        //group.area.push(relationship2);
        student.career = relationship2;
        return studentRegistry.update(student);
    }).then(function(){
        // Successful updateSubje
        var event = getFactory().newEvent('mx.itesm.gradeexchanger.students', 'CareerAssigned');
        event.studentId = careerAssignData.studentId;
        event.careerId = careerAssignData.careerId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
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
            courseSt.perioid = courseData.period;
            
            
            // 5. Create a new concept using the factory & set the data in it
            var   factory = getFactory();
            var   relationship2 = factory.newRelationship('mx.itesm.gradeexchanger.areas','Area',courseData.areaId);
            courseSt.area = relationship2
            for (var i = 0; i < courseData.temaId.length; i++) {
                var   relationship = factory.newRelationship('mx.itesm.gradeexchanger.tema','Tema',courseData.temaId[i]);
                courseSt.tema.push(relationship);
            }
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
 * @param {mx.itesm.gradeexchanger.courses.addSubject} courseTemaData
 * @transaction
 * 
 * **/
function AddSubject(courseTemaData){
    var courseRegistry={}
    return getAssetRegistry('mx.itesm.gradeexchanger.courses.Course').then(function(registry){
        courseRegistry = registry
        return courseRegistry.get(courseTemaData.courseId);
    }).then(function(course){
        if(!course) throw new Error("Course : "+courseTemaData.courseId," Not Found!!!");
        var   factory = getFactory();
        var   relationship2 = factory.newRelationship('mx.itesm.gradeexchanger.tema','Tema',courseTemaData.temaId);
        //var group = factory.newConcept(NS,"GroupNew");
        
        //group.area.push(relationship2);
        course.tema.push(relationship2);
        return courseRegistry.update(course);
    }).then(function(){
        // Successful updateSubje
        var event = getFactory().newEvent('mx.itesm.gradeexchanger.courses', 'AddedSubject');
        event.carrerId = groupNewData.careerId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });

}


/**
 * Create Flight Transaction
 * @param {mx.itesm.gradeexchanger.tema.CreateTema} temaData
 * @transaction
 * 
 * **/
function createTema(temaData) {
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
 * @param {mx.itesm.gradeexchanger.areas.CreateArea} areaData
 * @transaction
 * 
 * **/
function createArea(areaData) {
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

            return areaRegistry.addAll([areaN]);
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
 * @param {mx.itesm.gradeexchanger.career.AddGroupNew} groupNewData
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
        var   relationship2 = factory.newRelationship('mx.itesm.gradeexchanger.areas','Area',groupNewData.areaId);
        var group = factory.newConcept(NS,"GroupNew");
        for (var i = 0; i < groupNewData.courseId.length; i++) {
            var   relationship = factory.newRelationship('mx.itesm.gradeexchanger.courses','Course',groupNewData.courseId[i]);
            group.courses.push(relationship);
        }
        group.area = relationship2;
        carrer.groupNew.push(group);
        return careerRegistry.update(career);
    }).then(function(){
        // Successful update
        var event = getFactory().newEvent('mx.itesm.gradeexchanger.career', 'AddedGroupNew');
        event.carrerId = groupNewData.careerId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });

}