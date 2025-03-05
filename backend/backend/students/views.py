from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Student
from .serializers import StudentSerializer

@api_view(['GET', 'POST'])
def student_api(request):
    if request.method == 'GET':
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_student(request, roll_num):
    try:
        student = get_object_or_404(Student, roll_num=roll_num)
        student.delete()
        return Response(status=204)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['PUT'])
def edit_student(request, roll_num):
    print(f"🔍 Received PUT request for roll_num: {roll_num}")  

    student = Student.objects.filter(roll_num=roll_num).first()
    if not student:
        print("❌ Student not found!")  
        return Response({"error": "Student not found"}, status=404)

    print(f"📌 Existing student data: {student}")  
    print(f"📤 Request data: {request.data}")  

    serializer = StudentSerializer(student, data=request.data, partial=True)  
    if serializer.is_valid():
        serializer.save()
        print(f"✅ Student updated: {serializer.data}") 
        return Response(serializer.data)

    print(f"⚠️ Validation errors: {serializer.errors}") 
    return Response(serializer.errors, status=400)


class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    lookup_field = 'roll_num'