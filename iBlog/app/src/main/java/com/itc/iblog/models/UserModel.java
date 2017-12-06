package com.itc.iblog.models;

import java.util.HashMap;


public class UserModel {
    public int age;
    public String userName;
    public String email;
    public String url;
    public String bgUrl;
    public HashMap<String, Boolean> followers = new HashMap<>();
    public HashMap<String, Boolean> following = new HashMap<>();
    private int imageID;
    private String UID;

    //required default constructor

    public UserModel() {
    }

    public UserModel(String userName, String email, int age) {
        this.age = age;
        this.userName = userName;
        this.email = email;
        this.url = "images/avatar.png";
        this.bgUrl = "null";
    }

    public UserModel(String userName, String email, int age, String url ) {
        this.age = age;
        this.userName = userName;
        this.email = email;
        this.url = url;
    }

    public UserModel(String userName, int imageId, String email) {
        this.userName = userName;
        this.imageID = imageId;
        this.email = email;
    }

    public UserModel(String userName, String email, int age, String url, HashMap<String, Boolean> followers, HashMap<String, Boolean> following) {
        this.age = age;
        this.userName = userName;
        this.email = email;
        this.url = url;
        this.followers = followers;
        this.following = following;
    };

    public int getAge() {
        return age;
    }

    public String getUserName() {
        return userName;
    }

    public String getEmail() {
        return email;
    }

    public int getImageID() { return imageID; }

    public String getUrl() {return url; }

    public void setUID (String UID) { this.UID = UID; }

    public String getUID() { return UID; }

    public void setImageID(int imageID) { this.imageID = imageID; }

    public HashMap getFollowers() { return  followers; }

    public HashMap getFollowings() { return following; }

}
