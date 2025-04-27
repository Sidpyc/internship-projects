from django.shortcuts import render , get_object_or_404 , redirect
from django.http import HttpResponse
from .models import Student  # Import the Student model

# R-> Read
def student_list(request):
    students = Student.objects.all()  # Fetch all students
    return render(request, 'student_list.html', {'students': students})


#C -> Create
def student_add(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        grade = request.POST.get('grade')
        dob = request.POST.get('dob')
        address = request.POST.get('address')

        Student.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            grade=grade,
            dob=dob,
            address=address
        )

        return redirect('student_list')
    elif request.method == 'GET':
        return render(request, 'student_form.html')



def student_edit(request, pk):
    student = get_object_or_404(Student, pk=pk)

    if request.method == 'POST':
        student.first_name = request.POST.get('first_name')
        student.last_name = request.POST.get('last_name')
        student.email = request.POST.get('email')
        student.grade = request.POST.get('grade')
        student.dob = request.POST.get('dob')
        student.address = request.POST.get('address')
        student.save()
        return redirect('student_list')
    
    return render(request, 'student_form.html', {'student': student})


def student_delete(request, pk):
    student = get_object_or_404(Student, pk=pk)
    if request.method == 'POST':
        student.delete()
        return redirect('student_list')
