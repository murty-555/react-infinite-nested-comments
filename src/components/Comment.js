import React, { useEffect, useRef, useState } from "react";
import Action from "./Action";
import { ReactComponent as DownArrow } from "../assets/caret-down-fill.svg";
import { ReactComponent as UpArrow } from "../assets/caret-up-fill.svg";

const Comment = ({
  comment,
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }
    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  }

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  return (
    <div>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        {comment.id === 1 ? (
          <>
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              placeholder="Add Comment"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Action
              className="reply comment"
              type="Comment"
              handleClick={onAddComment}
            />
          </>
        ) : (
          <>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              style={{ wordWrap: "break-word" }}
              ref={inputRef}
            >
              {comment.name}
            </span>
            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="Save"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="Cancel"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type={
                      <>
                        {expand ? (
                          <UpArrow width="10px" height="10px" />
                        ) : (
                          <DownArrow width="10px" height="10px" />
                        )}{" "}
                        Reply
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  <Action
                    className="reply"
                    type="Edit"
                    handleClick={() => setEditMode(true)}
                  />
                  <Action className="reply" type="Delete" handleClick={handleDelete}/>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            <input
              className="inputContainer__input"
              type="text"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action className="reply" type="Reply" handleClick={onAddComment} />
            <Action
              className="reply"
              type="cancel"
              handleClick={() => {
                setShowInput(false)
                if(!comment?.items?.length) setExpand(false)
              }}
            />
          </div>
        )}
        {comment?.items?.map((cmt) => {
          return (
            <Comment
              key={cmt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
