import pytest
from mixer.backend.django import mixer
from projects.models import Project, ProjectMembership
from rest_framework.test import APIClient
from users.models import User

from .. import views
from ..models import Board, Item, List

pytestmark = pytest.mark.django_db


class TestBoardListView:
    def test_get(self):
        user = mixer.blend(User)
        client = APIClient()
        client.force_authenticate(user)
        project = mixer.blend(Project, owner=user)
        board1 = mixer.blend(Board, owner=project)
        board2 = mixer.blend(Board, owner=user)
        response = client.get("/boards/")
        assert response.status_code == 200
        assert board1.owner.title == project.title
        assert board2.owner.username == user.username

    def test_post(self):
        user = mixer.blend(User)
        client = APIClient()
        client.force_authenticate(user)
        response = client.post("/boards/", {"title": "Vik", "description": "Small"})
        assert response.status_code == 201, "Should be created"
        proj = mixer.blend(Project, owner=user)
        response = client.post(
            "/boards/", {"title": "Small", "description": "Vik", "project": proj.id}
        )
        assert response.status_code == 201, "Should be created(Project)"


class TestBoardDetailView:
    @pytest.fixture
    def make_board(self):
        user = mixer.blend(User)
        project = mixer.blend(Project, owner=user)
        board1 = mixer.blend(Board, owner=project)
        board2 = mixer.blend(Board, owner=user)
        return (user, project, board1, board2)

    def test_get(self, make_board):
        (user, project, board1, board2) = make_board
        client = APIClient()
        client.force_authenticate(user)
        response = client.get("/boards/1/")
        assert response.status_code == 200, "Should be accessible"
        user1 = mixer.blend(User)
        client.force_authenticate(user1)
        response = client.get("/boards/1/")
        assert response.status_code == 404, "Should be inaccessible"
        response = client.get("/boards/2/")
        assert response.status_code == 404, "Should be inaccessible"

    def test_put(self, make_board):
        (user, project, board1, board2) = make_board
        client = APIClient()
        client.force_authenticate(user)
        response = client.put("/boards/1/", {"title": "Vs", "description": "Test"})
        assert response.status_code == 200
        assert (
            response.data["title"] == "Vs" and response.data["description"] == "Test"
        ), "Should be edited"
        user1 = mixer.blend(User)
        client.force_authenticate(user1)
        response = client.put("/boards/1/", {"title": "Vs", "description": "Test"})
        assert response.status_code == 404, "Should be inaccessible"

    def test_delete(self, make_board):
        (user, project, board1, board2) = make_board
        client = APIClient()
        client.force_authenticate(user)
        response = client.delete("/boards/1/")
        assert response.status_code == 204, "Should be deleted"
        response = client.get("/boards/1/")
        assert response.status_code == 404, "Should be invalid"
        user1 = mixer.blend(User)
        client.force_authenticate(user1)
        response = client.delete("/boards/2/")
        assert response.status_code == 404, "Should be inaccessible"


class TestBoardStarView:
    def test_can_favorite(self):
        user = mixer.blend(User)
        board = mixer.blend(Board, owner=user)

        client = APIClient()
        client.force_authenticate(user)
        response = client.post("/boards/star/", {"board": 1})
        assert response.status_code == 204

        assert user.starred_boards.filter(pk=board.pk).exists()

        response = client.post("/boards/star/", {"board": 1})
        assert user.starred_boards.filter(pk=board.pk).exists() == False


class TestListShowView:
    @pytest.fixture
    def make_list(self):
        user = mixer.blend(User)
        proj = mixer.blend(Project, owner=user)
        board = mixer.blend(Board, owner=proj)
        list = mixer.blend(List, board=board)
        user1 = mixer.blend(User)
        user2 = mixer.blend(User)
        pmem = mixer.blend(
            ProjectMembership, access_level=1, project=proj, member=user1
        )
        return (user, proj, board, list, user1, user2, pmem)

    def test_get(self, make_list):
        (user, proj, board, list, user1, user2, pmem) = make_list
        client = APIClient()
        client.force_authenticate(user)
        response = client.get("/boards/lists/?board=1")
        assert response.status_code == 200
        client.force_authenticate(user1)
        response = client.get("/boards/lists/?board=1")
        assert response.status_code == 200
        client.force_authenticate(user2)
        response = client.get("/boards/lists/?board=1")
        assert response.status_code == 403

    def test_post(self, make_list):
        (user, proj, board, list, user1, user2, pmem) = make_list
        client = APIClient()
        client.force_authenticate(user)
        response = client.post("/boards/lists/", {"title": "FPL", "board": 1})
        assert response.status_code == 201
        client.force_authenticate(user1)
        response = client.post("/boards/lists/", {"title": "Rodriguez", "board": 1})
        assert response.status_code == 201
        client.force_authenticate(user2)
        response = client.post("/boards/lists/", {"title": "Salah", "board": 1})
        assert response.status_code == 403


class TestListDetailView:
    @pytest.fixture
    def make_list(self):
        user = mixer.blend(User)
        proj = mixer.blend(Project, owner=user)
        board = mixer.blend(Board, owner=proj)
        list = mixer.blend(List, board=board)
        user1 = mixer.blend(User)
        user2 = mixer.blend(User)
        pmem = mixer.blend(
            ProjectMembership, access_level=1, project=proj, member=user1
        )
        return (user, proj, board, list, user1, user2, pmem)

    def test_get(self, make_list):
        (user, proj, board, list, user1, user2, pmem) = make_list
        client = APIClient()
        client.force_authenticate(user)
        response = client.get("/boards/lists/1/?board=1")
        assert response.status_code == 200
        client.force_authenticate(user1)
        response = client.get("/boards/lists/1/?board=1")
        assert response.status_code == 200
        client.force_authenticate(user2)
        response = client.get("/boards/lists/1/?board=1")
        assert response.status_code == 403

    def test_put(self, make_list):
        (user, proj, board, list, user1, user2, pmem) = make_list
        client = APIClient()
        client.force_authenticate(user)
        response = client.put("/boards/lists/1/", {"title": "Check"})
        assert response.status_code == 200 and response.data["title"] == "Check"
        client.force_authenticate(user1)
        response = client.put("/boards/lists/1/", {"title": "Checkmate"})
        assert response.status_code == 200 and response.data["title"] == "Checkmate"
        client.force_authenticate(user2)
        response = client.put("/boards/lists/1/", {"title": "Chess"})
        assert response.status_code == 403

    def test_delete(self, make_list):
        (user, proj, board, list, user1, user2, pmem) = make_list
        list1 = mixer.blend(List, board=board)
        list2 = mixer.blend(List, board=board)
        client = APIClient()
        client.force_authenticate(user)
        response = client.delete("/boards/lists/1/")
        assert response.status_code == 204
        client.force_authenticate(user1)
        response = client.delete("/boards/lists/2/")
        assert response.status_code == 204
        client.force_authenticate(user2)
        response = client.delete("/boards/lists/3/")
        assert response.status_code == 403


class TestItemListView:
    @pytest.fixture
    def make_item(self):
        user = mixer.blend(User)
        proj = mixer.blend(Project, owner=user)
        board1 = mixer.blend(Board, owner=user)
        board2 = mixer.blend(Board, owner=proj)
        list1 = mixer.blend(List, board=board1)
        list2 = mixer.blend(List, board=board2)
        user1 = mixer.blend(User)
        user2 = mixer.blend(User)
        pmem = mixer.blend(
            ProjectMembership, access_level=1, project=proj, member=user1
        )
        item1 = mixer.blend(Item, list=list1)
        item2 = mixer.blend(Item, list=list2)
        return (user, user1, user2, proj, board1, board2, list1, list2, item1, item2)

    def test_get(self, make_item):
        (
            user_admin,
            user_member,
            user2,
            proj,
            personal_board,
            board,
            personal_list,
            list,
            personal_item,
            item,
        ) = make_item
        client = APIClient()
        client.force_authenticate(user_admin)
        response = client.get("/boards/items/?list=1")
        assert response.status_code == 200
        response = client.get("/boards/items/?list=2")
        assert response.status_code == 200
        client.force_authenticate(user_member)
        response = client.get("/boards/items/?list=1")
        assert response.status_code == 403
        response = client.get("/boards/items/?list=2")
        assert response.status_code == 200
        client.force_authenticate(user2)
        response = client.get("/boards/items/?list=1")
        assert response.status_code == 403
        response = client.get("/boards/items/?list=2")
        assert response.status_code == 403

    def test_post(self, make_item):
        (
            user_admin,
            user_member,
            user2,
            proj,
            personal_board,
            board,
            personal_list,
            list,
            personal_item,
            item,
        ) = make_item
        client = APIClient()
        client.force_authenticate(user_admin)
        response = client.post("/boards/items/", {"title": "Post", "list": 1})
        assert response.status_code == 201
        response = client.post("/boards/items/", {"title": "Post", "list": 2})
        assert response.status_code == 201
        client.force_authenticate(user_member)
        response = client.post("/boards/items/", {"title": "Post", "list": 1})
        assert response.status_code == 403
        response = client.post("/boards/items/", {"title": "Member", "list": 2})
        assert response.status_code == 201
        client.force_authenticate(user2)
        response = client.post("/boards/items/", {"title": "Post", "list": 1})
        assert response.status_code == 403
        response = client.post("/boards/items/", {"title": "Post", "list": 2})
        assert response.status_code == 403


class TestItemDetailView:
    @pytest.fixture
    def make_item(self):
        user = mixer.blend(User)
        proj = mixer.blend(Project, owner=user)
        board1 = mixer.blend(Board, owner=user)
        board2 = mixer.blend(Board, owner=proj)
        list1 = mixer.blend(List, board=board1)
        list2 = mixer.blend(List, board=board2)
        list3 = mixer.blend(List, board=board2)
        user1 = mixer.blend(User)
        user2 = mixer.blend(User)
        pmem = mixer.blend(
            ProjectMembership, access_level=1, project=proj, member=user1
        )
        item1 = mixer.blend(Item, list=list1)
        item2 = mixer.blend(Item, list=list2)
        item3 = mixer.blend(Item, list=list3)
        return (
            user,
            user1,
            user2,
            proj,
            board1,
            board2,
            list1,
            list2,
            list3,
            item1,
            item2,
            item3,
        )

    def test_get(self, make_item):
        (
            user_admin,
            user_member,
            user2,
            proj,
            personal_board,
            board,
            personal_list,
            list1,
            list2,
            personal_item,
            item1,
            item2,
        ) = make_item
        client = APIClient()
        client.force_authenticate(user_admin)
        response = client.get("/boards/items/1/")
        assert response.status_code == 200
        response = client.get("/boards/items/2/")
        assert response.status_code == 200
        client.force_authenticate(user_member)
        response = client.get("/boards/items/1/")
        assert response.status_code == 403
        response = client.get("/boards/items/2/")
        assert response.status_code == 200
        client.force_authenticate(user2)
        response = client.get("/boards/items/1/")
        assert response.status_code == 403
        response = client.get("/boards/items/2/")
        assert response.status_code == 403

    def test_put(self, make_item):
        (
            user_admin,
            user_member,
            user2,
            proj,
            personal_board,
            board,
            personal_list,
            list1,
            list2,
            personal_item,
            item1,
            item2,
        ) = make_item
        client = APIClient()
        client.force_authenticate(user_admin)
        response = client.put("/boards/items/1/", {"title": "Put"})
        assert response.status_code == 200 and response.data["title"] == "Put"
        response = client.put("/boards/items/2/", {"title": "Put"})
        assert response.status_code == 200 and response.data["title"] == "Put"
        client.force_authenticate(user_member)
        response = client.put("/boards/items/1/", {"title": "Put"})
        assert response.status_code == 403
        response = client.put("/boards/items/2/", {"title": "Put back"})
        assert response.status_code == 200 and response.data["title"] == "Put back"
        client.force_authenticate(user2)
        response = client.put("/boards/items/1/", {"title": "Put"})
        assert response.status_code == 403
        response = client.put("/boards/items/2/", {"title": "Put"})
        assert response.status_code == 403

    def test_delete(self, make_item):
        (
            user_admin,
            user_member,
            user2,
            proj,
            personal_board,
            board,
            personal_list,
            list1,
            list2,
            personal_item,
            item1,
            item2,
        ) = make_item
        client = APIClient()
        client.force_authenticate(user2)
        response = client.delete("/boards/items/1/")
        assert response.status_code == 403
        response = client.delete("/boards/items/2/")
        assert response.status_code == 403
        client.force_authenticate(user_member)
        response = client.delete("/boards/items/1/")
        assert response.status_code == 403
        response = client.delete("/boards/items/2/")
        assert response.status_code == 204
        client.force_authenticate(user_admin)
        response = client.delete("/boards/items/1/")
        assert response.status_code == 204
        response = client.delete("/boards/items/3/")
        assert response.status_code == 204


class TestCommentListView:
    @pytest.fixture
    def make_comment(self):
        user = mixer.blend(User)
        proj = mixer.blend(Project, owner=user)
        board1 = mixer.blend(Board, owner=user)
        board2 = mixer.blend(Board, owner=proj)
        list1 = mixer.blend(List, board=board1)
        list2 = mixer.blend(List, board=board2)
        list3 = mixer.blend(List, board=board2)
        user1 = mixer.blend(User)
        user2 = mixer.blend(User)
        pmem = mixer.blend(
            ProjectMembership, access_level=1, project=proj, member=user1
        )
        item1 = mixer.blend(Item, list=list1)
        item2 = mixer.blend(Item, list=list2)
        item3 = mixer.blend(Item, list=list3)
        comment1 = mixer.blend(Comment, item=item1)
        comment2 = mixer.blend(Comment, item=item2)
        comment3 = mixer.blend(Comment, item=item2)
        return (
            user,
            user1,
            user2,
            proj,
            board1,
            board2,
            list1,
            list2,
            list3,
            item1,
            item2,
            item3,
            comment1,
            comment2,
            comment3,
        )

    def test_get(self, make_comment):
        (
            user_admin,
            user_member,
            user2,
            proj,
            personal_board,
            board,
            personal_list,
            list1,
            list2,
            personal_item,
            item1,
            item2,
            personal_comment,
            comment1,
            comment2,
        ) = make_comment
        client = APIClient()
        client.force_authenticate(user_admin)
        response = client.get("/boards/comments/?item=1")
        assert response.status_code == 200
        client.force_authenticate(user_member)
        response = client.get("/boards/comments/?item=1")
        assert response.status_code == 403
        response = client.get("/boards/comments/?item=2")
        assert response.status_code == 200
        client.force_authenticate(user2)
        response = client.get("/boards/comments/?item=1")
        assert response.status_code == 403
        response = client.get("/boards/comments/?item=2")
        assert response.status_code == 403

    def test_post(self, make_comment):
        (
            user_admin,
            user_member,
            user2,
            proj,
            personal_board,
            board,
            personal_list,
            list1,
            list2,
            personal_item,
            item1,
            item2,
            personal_comment,
            comment1,
            comment2,
        ) = make_comment
        client = APIClient()
        client.force_authenticate(user_admin)
        response = client.post(
            "/boards/comments/", {"item": 1, "body": "personal comment attached"}
        )
        assert (
            response.status_code == 201
            and response.data["body"] == "personal comment attached"
        )
        response = client.post(
            "/boards/comments/", {"item": 2, "body": "comment attached to board item"}
        )
        assert (
            response.status_code == 201
            and response.data["body"] == "comment attached to board item"
        )
        client.force_authenticate(user_member)
        response = client.post(
            "/boards/comments/", {"item": 1, "body": "personal comment attached"}
        )
        assert response.status_code == 403
        response = client.post(
            "/boards/comments/",
            {"item": 2, "body": "comment attached to board item by member"},
        )
        assert (
            response.status_code == 201
            and response.data["body"] == "comment attached to board item by member"
        )
        client.force_authenticate(user2)
        response = client.post(
            "/boards/comments/", {"item": 1, "body": "personal comment attached"}
        )
        assert response.status_code == 403
        response = client.post(
            "/boards/comments/", {"item": 2, "body": "comment attached to board item"}
        )
        assert response.status_code == 403


class TestCommentDetailView:
    @pytest.fixture
    def make_comment(self):
        user = mixer.blend(User)
        proj = mixer.blend(Project, owner=user)
        board1 = mixer.blend(Board, owner=user)
        board2 = mixer.blend(Board, owner=proj)
        list1 = mixer.blend(List, board=board1)
        list2 = mixer.blend(List, board=board2)
        list3 = mixer.blend(List, board=board2)
        user1 = mixer.blend(User)
        user2 = mixer.blend(User)
        pmem = mixer.blend(
            ProjectMembership, access_level=1, project=proj, member=user1
        )
        item1 = mixer.blend(Item, list=list1)
        item2 = mixer.blend(Item, list=list2)
        item3 = mixer.blend(Item, list=list3)
        comment1 = mixer.blend(Comment, item=item1, author=user)
        comment2 = mixer.blend(Comment, item=item2, author=user1)
        comment3 = mixer.blend(Comment, item=item2, author=user)
        return (
            user,
            user1,
            user2,
            proj,
            board1,
            board2,
            list1,
            list2,
            list3,
            item1,
            item2,
            item3,
            comment1,
            comment2,
            comment3,
        )

    def test_get(self, make_comment):
        (
            user_admin,
            user_member,
            user2,
            proj,
            personal_board,
            board,
            personal_list,
            list1,
            list2,
            personal_item,
            item1,
            item2,
            personal_comment,
            comment1,
            comment2,
        ) = make_comment
        client = APIClient()
        client.force_authenticate(user_admin)
        response = client.get("/boards/comments/1/")
        assert (
            response.status_code == 200
            and response.data["body"] == personal_comment.body
        )
        response = client.get("/boards/comments/2/")
        assert response.status_code == 200 and response.data["body"] == comment1.body
        client.force_authenticate(user_member)
        response = client.get("/boards/comments/1/")
        assert response.status_code == 403
        response = client.get("/boards/comments/2/")
        assert response.status_code == 200 and response.data["body"] == comment1.body
        client.force_authenticate(user2)
        response = client.get("/boards/comments/1/")
        assert response.status_code == 403
        response = client.get("/boards/comments/2/")
        assert response.status_code == 403

    def test_put(self, make_comment):
        (
            user_admin,
            user_member,
            user2,
            proj,
            personal_board,
            board,
            personal_list,
            list1,
            list2,
            personal_item,
            item1,
            item2,
            personal_comment,
            comment1,
            comment2,
        ) = make_comment
        client = APIClient()
        client.force_authenticate(user_admin)
        response = client.put(
            "/boards/comments/1/", {"body": "Personal comment was edited"}
        )
        assert (
            response.status_code == 200
            and response.data["body"] == "Personal comment was edited"
        )
        response = client.put(
            "/boards/comments/2/", {"body": "Board comment was edited"}
        )
        assert response.status_code == 403
        response = client.put(
            "/boards/comments/3/", {"body": "Board comment was edited"}
        )
        assert (
            response.status_code == 200
            and response.data["body"] == "Board comment was edited"
        )
        client.force_authenticate(user_member)
        response = client.put(
            "/boards/comments/1/", {"body": "Personal comment was edited"}
        )
        assert response.status_code == 403
        response = client.put(
            "/boards/comments/2/", {"body": "Board comment was edited by a member"}
        )
        assert (
            response.status_code == 200
            and response.data["body"] == "Board comment was edited by a member"
        )
        response = client.put(
            "/boards/comments/3/", {"body": "Board comment was edited"}
        )
        assert response.status_code == 403
        client.force_authenticate(user2)
        response = client.put(
            "/boards/comments/1/", {"body": "Personal comment was edited"}
        )
        assert response.status_code == 403
        response = client.put(
            "/boards/comments/2/", {"body": "Board comment was edited"}
        )
        assert response.status_code == 403
        response = client.put(
            "/boards/comments/3/", {"body": "Board comment was edited"}
        )
        assert response.status_code == 403

    def test_delete(self, make_comment):
        (
            user_admin,
            user_member,
            user2,
            proj,
            personal_board,
            board,
            personal_list,
            list1,
            list2,
            personal_item,
            item1,
            item2,
            personal_comment,
            comment1,
            comment2,
        ) = make_comment
        client = APIClient()
        client.force_authenticate(user2)
        response = client.delete("/boards/comments/1/")
        assert response.status_code == 403
        response = client.delete("/boards/comments/2/")
        assert response.status_code == 403
        response = client.delete("/boards/comments/3/")
        assert response.status_code == 403
        client.force_authenticate(user_member)
        response = client.delete("/boards/comments/1/")
        assert response.status_code == 403
        response = client.delete("/boards/comments/2/")
        assert response.status_code == 204
        response = client.delete("/boards/comments/3/")
        assert response.status_code == 403
        client.force_authenticate(user_admin)
        response = client.delete("/boards/comments/1/")
        assert response.status_code == 204
        response = client.delete("/boards/comments/3/")
        assert response.status_code == 204
