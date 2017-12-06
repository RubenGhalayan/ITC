package com.itc.iblog.models;


import java.util.ArrayList;
import java.util.Date;

public class PostModel {
    private String userImage;
    private String userName;
    private String userEmail;
    private String postImagePath;
    private String postId;
    private String postTitle;
    private String postText;
    private String uuid;

    private Date postTime;
    private Integer likeCount;
    private Integer commentCount;
    private Integer favCount;
    ArrayList<String> users;
    ArrayList<CommentModel> comments;

    public PostModel() {}

    public PostModel(String userName, String userEmail,String userImage, String postImagePath,
                     Date postTime,  String postId, String postTitle, String postText,
                     Integer likeCount, Integer favCount,Integer commentCount,
                     ArrayList<String> users,ArrayList<CommentModel> comments, String uuid) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.postImagePath = postImagePath;
        this.postTime = postTime;
        this.userImage = userImage;
        this.postId = postId;
        this.postTitle = postTitle;
        this.postText = postText;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
        this.users = users;
        this.favCount = favCount;
        this.comments = comments;
        this.uuid = uuid;
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

    public String getPostId() {
        return this.postId;
    }

    public String getPostTitle() {
        return this.postTitle;
    }

    public String getPostText() {
        return this.postText;
    }

    public Integer getLikeCount() {
        return this.likeCount;
    }

    public Integer getCommentCount() {
        return commentCount;
    }

    public Date getPostTime() {
        return this.postTime;
    }

    public ArrayList<String> getUsers() {
        return this.users;
    }

    public String getPostImagePath() {
        return postImagePath;
    }

    public Integer getFavCount() {
        return favCount;
    }

    public ArrayList<CommentModel> getComments() {
        return comments;
    }

    public String getUuid() {
        return uuid;
    }
}