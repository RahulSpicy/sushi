from django.urls import path
from projects.views import (
    ProjectList,
    ProjectDetail,
    ProjectMemberList,
    ProjectMemberDetail,
)

urlpatterns = [
    path("", ProjectList.as_view()),
    path("<int:pk>", ProjectDetail.as_view()),
    path("<int:pk>/members", ProjectMemberList.as_view()),
    path("<int:pk1>/members/<int:pk2>", ProjectMemberDetail.as_view()),
]
