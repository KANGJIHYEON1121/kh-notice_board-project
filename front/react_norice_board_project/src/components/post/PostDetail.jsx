import Profile from "../Profile";
import LikeButton from "../LikeButton";
import SettingButton from "../SettingButton";
import Input from "../Input";
import {
  DetailPostContainer,
  RightHeader,
  RightMain,
  RightSection,
  LeftSection,
  RightFooter,
  CommentBtn,
  CommentBox,
} from "./PostDetailStyle";
import Content from "../Content";
import Button from "../Button";
import DetailCarousel from "./DetailCarousel";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../../api/commentApi";
import { userId } from "../../api/HostUrl";

const PostDetail = ({ post, comments, setComments }) => {
  const { pno } = useParams();
  const [editCommentId, setEditCommentId] = useState(null); // 현재 수정 중인 댓글 ID
  const [editContent, setEditContent] = useState(""); // 수정 중인 내용
  const [newComment, setNewComment] = useState("");

  const onAddComment = async () => {
    if (!newComment.trim()) return alert("댓글을 입력하세요.");

    const commentdata = {
      pno: Number(pno),
      writer: userId,
      content: newComment,
    };

    try {
      await addComment(commentdata); // 등록
      const updatedComments = await getComments(pno); // 갱신
      setComments(updatedComments); // 상태 업데이트
      setNewComment(""); // 입력창 초기화
    } catch (e) {
      console.error("댓글 등록 중 오류 발생:", e);
    }
  };

  const onEditClick = (comment) => {
    setEditCommentId(comment.cno); // 어떤 댓글을 수정할건지
    setEditContent(comment.content); // 기존 내용 세팅
  };

  const onEditSubmit = async () => {
    await updateComment(editCommentId, { content: editContent });
    setEditCommentId(null); // 편집 종료
    setEditContent(""); // 초기화

    await getComments(pno).then((data) => {
      setComments(data);
    });
  };

  const onDeleteSubmit = async (cno) => {
    const result = confirm("댓글을 삭제 하시겠습니까?");

    if (result) {
      try {
        await deleteComment(cno);
        const updated = await getComments(pno);
        setComments(updated);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <DetailPostContainer>
      <LeftSection>
        <DetailCarousel uploadFileNames={post?.uploadFileNames ?? []} />
      </LeftSection>
      <RightSection>
        <RightHeader>
          <Profile writer={post?.writer} />
          <div>
            <LikeButton count={post?.likeCount} />
            <SettingButton pno={pno} />
          </div>
        </RightHeader>
        <RightMain>
          <div>
            <Profile writer={post?.writer} />
            <Content content={post?.content} regDate={post?.regDate} />
          </div>
          {(Array.isArray(comments) ? comments : []).map((comment) => {
            const isEditing = editCommentId === comment.cno;

            return (
              <CommentBox key={comment?.cno}>
                <div>
                  <Profile writer={comment?.writer} />
                  {isEditing ? (
                    <input
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                  ) : (
                    <Content
                      content={comment?.content}
                      regDate={
                        comment?.createdDate
                          ? comment.createdDate
                              .split("-")
                              .join(".")
                              .slice(0, 10)
                          : "날짜 없음"
                      }
                    />
                  )}
                </div>
                <CommentBtn>
                  {isEditing ? (
                    <>
                      <p onClick={onEditSubmit}>완료</p>
                      <p onClick={() => setEditCommentId(null)}>취소</p>
                    </>
                  ) : (
                    <>
                      <p onClick={() => onEditClick(comment)}>수정</p>
                      <p onClick={() => onDeleteSubmit(comment.cno)}>삭제</p>
                    </>
                  )}
                </CommentBtn>
              </CommentBox>
            );
          })}
        </RightMain>
        <RightFooter>
          <Input
            newComment={newComment}
            setNewComment={setNewComment}
            placeholder={"댓글 입력"}
          />
          <Button onClick={onAddComment} text={"등록"} />
        </RightFooter>
      </RightSection>
    </DetailPostContainer>
  );
};

export default PostDetail;
