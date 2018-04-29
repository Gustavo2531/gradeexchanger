


/**
 * Create Flight Transaction
 * @param {mx.itesm.gradeexchanger.students.RevalidateCourse} studentCourseData
 * @transaction
 *
 * **/

function    RevalidateCourse(studentCourseData){

   
    var studentRegistry={}
    return getAssetRegistry('mx.itesm.gradeexchanger.students.Student').then(function(registry){
        studentRegistry = registry
        return studentRegistry.get(studentCourseData.studentId);
    }).then(function(student){
        var minGrade1 = 70;
        var minGrade2 = 70; 
         if(!student) throw new Error("Course : "+studentCourseData.studentId," Not Found!!!");
        var   factory = getFactory();
        var  NS =  'mx.itesm.gradeexchanger.students';
        var   relationship = factory.newRelationship('mx.itesm.gradeexchanger.courses','Course',studentCourseData.courseIdNuevo);
        var relationship2 = factory.newRelationship('mx.itesm.gradeexchanger.schools','School',studentCourseData.newSchool);
        var schoolIde = student.school.toString();
       var aux = schoolIde.substring(56, schoolIde.length-1);
       var arrayCursos = student.coursesApproved;
       var arrayTemasName =[];
       var arrayTemasName2 =[];
       var count=0;
       
        var cursosGrade=0;
      // var lengthArryCursos = student.coursesApproved.length;
        for (var index = 0; index < arrayCursos.length; ++index){
        var cursoIde = arrayCursos[index].courseId.toString();
        var auxCursoTemp=cursoIde.substring(56, cursoIde.length-1);
        
        if(auxCursoTemp==studentCourseData.courseId){
            cursosGrade=arrayCursos[index].grade;
           
            
            }
        }
       // var auxCurso =cursoIde.substring(56, cursoIde.length-1);
        var courseRegistry={}
        return getAssetRegistry('mx.itesm.gradeexchanger.courses.Course').then(function(registry2){
        courseRegistry = registry2
        
        return courseRegistry.get(studentCourseData.courseId);
        }).then(function(curso){
            for (var index = 0; index < curso.tema.length; ++index){
            var temaIde = curso.tema[index].toString();
            var auxTema=temaIde.substring(51, temaIde.length-1);
            arrayTemasName.push(auxTema);
            }
            return getAssetRegistry('mx.itesm.gradeexchanger.courses.Course').then(function(registry4){
                courseRegistry2 = registry4
                
                return courseRegistry2.get(studentCourseData.courseIdNuevo);
                }).then(function(curso2){
                    for (var index = 0; index < curso2.tema.length; ++index){
                        var temaIde = curso2.tema[index].toString();
                        var auxTema=temaIde.substring(51, temaIde.length-1);
                        arrayTemasName2.push(auxTema);
                        
                        }
                        var auxarrayTemasName=arrayTemasName.sort();
                        var auxarrayTemasName2=arrayTemasName2.sort();
                        for (var index = 0; index < curso.tema.length; ++index){
                            for (var indexN = 0; indexN < curso2.tema.length; ++indexN){
                                if(auxarrayTemasName[index]==auxarrayTemasName2[indexN]){
                                    count=count+1;
                                }
                        
                            }
                        
                        }
                        var m = arrayTemasName2.length*.65;
                        //if(count>m) throw new Error("a "+count);


       var schoolRegistry={}
       return getAssetRegistry('mx.itesm.gradeexchanger.schools.School').then(function(registrySchool2){
        schoolRegistry = registrySchool2
           return schoolRegistry.get(aux);
       }).then(function(school){
        minGrade1 = school.minApprovedGrade;
        var schoolRegistry2={}
       return getAssetRegistry('mx.itesm.gradeexchanger.schools.School').then(function(registrySchool3){
        schoolRegistry2= registrySchool3
        return schoolRegistry2.get(studentCourseData.newSchool);
       }).then(function(school2){
      
        minGrade2 = school2.minApprovedGrade;
        var finalGrade = (cursosGrade*minGrade2)/minGrade1; 
        if(finalGrade>100){
            finalGrade=100;
        }
       // i
        if(finalGrade>=minGrade2 && count>m){
            var group2 = factory.newConcept(NS,"CoursesApproved");
            group2.courseId = relationship;
            //if(true) throw new Error("Aqui");
            group2.escuela = studentCourseData.newSchool;
            group2.period = "Revalidado";
            group2.grade = finalGrade;
            group2.done = true
            
            if(student.coursesApproved==undefined){
                student.coursesApproved=[];
                student.coursesApproved.push(group2);
            }else{
                student.coursesApproved.push(group2);
            }
            }
        
        student.school = relationship2;
        return studentRegistry.update(student);
        })
    })
                })
        })
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
 * @param {mx.itesm.gradeexchanger.students.AssignCourseCurrent} studentCourseData
 * @transaction
 *
 * **/

function    AssignCourseCurrent(studentCourseData){
    var studentRegistry={}
    return getAssetRegistry('mx.itesm.gradeexchanger.students.Student').then(function(registry){
        studentRegistry = registry
        return studentRegistry.get(studentCourseData.studentId);
    }).then(function(student){
       
        if(!student) throw new Error("Course : "+studentCourseData.studentId," Not Found!!!");
        var   factory = getFactory();
        var  NS =  'mx.itesm.gradeexchanger.students';
        var   relationship = factory.newRelationship('mx.itesm.gradeexchanger.courses','Course',studentCourseData.courseId);
        var   relationship2 = factory.newRelationship('mx.itesm.gradeexchanger.schools','School',studentCourseData.escuelaExterna);
        var schoolIde = student.school.toString();
       var aux = schoolIde.substring(56, schoolIde.length-1);
       var minGrade1 = 70;
       var minGrade2 = 70 
        var temas1 = [];
        var temas2=[];
       
       var schoolRegistry={}
       return getAssetRegistry('mx.itesm.gradeexchanger.schools.School').then(function(registry2){
        schoolRegistry = registry2
           return schoolRegistry.get(aux);
       }).then(function(school){
        minGrade1 = school.minApprovedGrade;
        var schoolRegistry2={}
       return getAssetRegistry('mx.itesm.gradeexchanger.schools.School').then(function(registry3){
        schoolRegistry2= registry3
        return schoolRegistry2.get(studentCourseData.escuelaExterna);
       }).then(function(school2){
        var group = factory.newConcept(NS,"CurrentCourses");
        group.courseId = relationship;
        group.period = studentCourseData.period;
        group.grade = studentCourseData.grade;
        group.schoolId = relationship2;
        if(student.currentCourses==undefined){
            student.currentCourses=[];
            student.currentCourses.push(group);
        }else{
            student.currentCourses.push(group);
        }
        minGrade2 = school2.minApprovedGrade;
        var finalGrade = (studentCourseData.grade*minGrade1)/minGrade2; 
        if(finalGrade>100){
            finalGrade=100;
        }
        if(finalGrade>=minGrade1){
            var group2 = factory.newConcept(NS,"CoursesApproved");
            group2.courseId = relationship;
            //if( studentCourseData.grade == 71) throw new Error("Ahuevo Not Found!!!" +aux);
            group2.escuela = aux;
            group2.period = studentCourseData.period;
            group2.grade = finalGrade;
            group2.done = true
            
            if(student.coursesApproved==undefined){
                student.coursesApproved=[];
                student.coursesApproved.push(group2);
            }else{
                student.coursesApproved.push(group2);
            }
            }else{
                var group3 = factory.newConcept(NS,"CoursesFailed");
            group3.courseId = relationship;
            group3.period = studentCourseData.period;
            group3.grade = finalGrade;
                if(student.coursesFailed==undefined){
                    student.coursesFailed=[];
                    student.coursesFailed.push(group3);
                }else{
                    student.coursesFailed.push(group3);
                }
            
            }
        return studentRegistry.update(student);
        
       })})}).then(function(){
        // Successful update
        var event = getFactory().newEvent('mx.itesm.gradeexchanger.students', 'CourseAssignedCurrent');
        event.courseId = studentCourseData.courseId;
        event.studentId = studentCourseData.studentId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });

}

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
        var minGrade=60;
        if(!student) throw new Error("Course : "+studentCourseData.studentId," Not Found!!!");
        var   factory = getFactory();
        var  NS =  'mx.itesm.gradeexchanger.students';
        var   relationship = factory.newRelationship('mx.itesm.gradeexchanger.courses','Course',studentCourseData.courseId);
        var schoolIde = student.school.toString();
       var aux = schoolIde.substring(56, schoolIde.length-1);
       
        
       
       var schoolRegistry={}
       return getAssetRegistry('mx.itesm.gradeexchanger.schools.School').then(function(registry2){
        schoolRegistry = registry2
           return schoolRegistry.get(aux);
       }).then(function(school){
           minGrade = school.minApprovedGrade;
           //if(minGrade ==70) throw new Error("Ahuevo Not Found!!!" +aux);
           if(studentCourseData.grade >= minGrade){
            
            var group = factory.newConcept(NS,"CoursesApproved");
            group.courseId = relationship;
            //if( studentCourseData.grade == 71) throw new Error("Ahuevo Not Found!!!" +aux);
            group.escuela = aux;
            group.period = studentCourseData.period;
            group.grade = studentCourseData.grade;
            group.done = true;
            
            if(student.coursesApproved==undefined){
                student.coursesApproved=[];
                student.coursesApproved.push(group);
            }else{
                student.coursesApproved.push(group);
            }
            }else{
                var group = factory.newConcept(NS,"CoursesFailed");
            group.courseId = relationship;
            group.period = studentCourseData.period;
            group.grade = studentCourseData.grade;
                if(student.coursesFailed==undefined){
                    student.coursesFailed=[];
                    student.coursesFailed.push(group);
                }else{
                    student.coursesFailed.push(group);
                }
            
            }
            return studentRegistry.update(student);
       })}).then(function(){
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
 * @param {mx.itesm.gradeexchanger.students.AssignSchool} schoolAssignData
 * @transaction
 * 
 * **/
function AssignSchool(schoolAssignData){
    var studentRegistry={}
    return getAssetRegistry('mx.itesm.gradeexchanger.students.Student').then(function(registry){
        studentRegistry = registry
        return studentRegistry.get(schoolAssignData.studentId);
    }).then(function(student){
        if(!student) throw new Error("Student : "+schoolAssignData.studentId," Not Found!!!");
        var   factory = getFactory();
        
        var   relationship2 = factory.newRelationship('mx.itesm.gradeexchanger.schools','School',schoolAssignData.schoolId);
        //var group = factory.newConcept(NS,"GroupNew");
        
        //group.area.push(relationship2);
        student.school = relationship2;
        return studentRegistry.update(student);
    }).then(function(){
        // Successful updateSubje
        var event = getFactory().newEvent('mx.itesm.gradeexchanger.students', 'SchoolAssigned');
        event.studentId = schoolAssignData.studentId;
        event.schoolId = schoolAssignData.schoolId;
        emit(event);
    }).catch(function(error){
        throw new Error(error);
    });

}

/**
 * Create Flight Transaction
 * @param {mx.itesm.gradeexchanger.schools.CreateSchool} schoolData
 * @transaction
 * 
 * **/
function    createSchool(schoolData) {
    // 1. Get the asset registry
    return getAssetRegistry('mx.itesm.gradeexchanger.schools.School')
        .then(function(schoolRegistry){
            // Now add the Flight

            // 2. Get resource factory
            var  factory = getFactory();
            var  NS =  'mx.itesm.gradeexchanger.schools';

            // 3. Create the Resource instance
             /// <<<< THIS IS HARD CODED - FIX IT as an exercise
            
            var  schoolSt = factory.newResource(NS,'School',schoolData.schoolId);
           
            // 4. Set the relationship
            
  
            schoolSt.name = schoolData.name;
            schoolSt.minApprovedGrade = schoolData.minApprovedGrade;
            schoolSt.maxApprovedGrade= schoolData.maxApprovedGrade;
          
            // 5. Create a new concept using the factory & set the data in it
           
            // 6. Emit the event FlightCreated
            var event = factory.newEvent(NS, 'SchoolCreated');
            event.schoolId = schoolSt.schoolId;
            emit(event);

            return schoolRegistry.addAll([schoolSt]);
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

            var   relationship2 = factory.newRelationship('mx.itesm.gradeexchanger.schools','School',studentData.schoolId);
            studentSt.school = relationship2;
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
           // var  courseId = 'CCM56';  /// <<<< THIS IS HARD CODED - FIX IT as an exercise
            
            var  courseSt = factory.newResource(NS,'Course',courseData.courseId);
            
            // 4. Set the relationship
            courseSt.name = courseData.name;
            courseSt.units = courseData.units;
            courseSt.period = courseData.period;
            
            
            // 5. Create a new concept using the factory & set the data in it
            var   factory = getFactory();
            var   relationship2 = factory.newRelationship('mx.itesm.gradeexchanger.areas','Area',courseData.areaId);
            courseSt.area = relationship2;
            //var   relationship3 = factory.newRelationship('mx.itesm.gradeexchanger.career','Career',courseData.careerId);
            var   relationship4 = factory.newRelationship('mx.itesm.gradeexchanger.schools','School',courseData.schoolId);
           courseSt.school = relationship4;
           //courseSt.career = relationship3;
            
            print("Aqui llegue")
            for (var i = 0; i < courseData.temaId.length; i++) {
                var   relationship = factory.newRelationship('mx.itesm.gradeexchanger.tema','Tema',courseData.temaId[i]);
                print("Aqui Tambien")
                if(courseSt.tema == undefined){
                courseSt.tema = [];
                courseSt.tema.push(relationship);
                }else{
                    courseSt.tema.push(relationship);
                }
                //courseSt.temaN.push(relationship);
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
        event.courseId= courseTemaData.courseId;
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