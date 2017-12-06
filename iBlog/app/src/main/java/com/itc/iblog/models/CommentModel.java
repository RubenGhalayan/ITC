package com.itc.iblog.models;

import java.util.Date;

public class CommentModel {
    private String userImage;
    private String userName;
    private String userEmail;
    private String commentText;
    private Date commentTime;

    public CommentModel() {}

    public CommentModel(String userName, String userEmail,String userImage,
                     Date postTime, String postText) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.commentTime = postTime;
        this.userImage = userImage;
        this.commentText = postText;

    }

    public String getUserName() {
        return this.userName;
    }

    public String getUserEmail() {
        return this.userEmail;
    }

    public String getUserImage() {
        return this.userImage;
    }

    public String getCommentText() {
        return this.commentText;
    }


    public Date getCommentTime() {
        return this.commentTime;
    }

}
